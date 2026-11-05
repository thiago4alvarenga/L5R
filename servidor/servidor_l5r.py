"""Família L5R: serve o app e guarda as famílias da mesa (2026-11-05).

Roda no container `l5r` da VPS, atrás do nginx (rota /l5r-.../). Os arquivos do app ficam
em /app (só leitura) e as famílias em /dados, uma por arquivo. Toda chamada à /api precisa
da senha da mesa no cabeçalho X-Senha; a senha vem da variável L5R_SENHA (arquivo
/opt/ogun/l5r.env na VPS). Só usa a biblioteca padrão do Python.
"""
import hmac, json, os, re, threading, time
from datetime import datetime, timezone
from http.server import ThreadingHTTPServer, BaseHTTPRequestHandler
from urllib.parse import urlparse, parse_qs

APP = os.environ.get("L5R_APP", "/app")
DADOS = os.environ.get("L5R_DADOS", "/dados")
SENHA = os.environ.get("L5R_SENHA", "")
PORTA = int(os.environ.get("L5R_PORTA", "8080"))
CODIGO = re.compile(r"^[a-z0-9-]{1,80}$")
CLIENTE = re.compile(r"^[a-z0-9]{1,40}$")
TIPOS = {".html": "text/html; charset=utf-8", ".js": "application/javascript; charset=utf-8",
         ".css": "text/css; charset=utf-8", ".json": "application/json; charset=utf-8",
         ".png": "image/png", ".jpg": "image/jpeg", ".jpeg": "image/jpeg", ".webp": "image/webp",
         ".svg": "image/svg+xml", ".ico": "image/x-icon", ".woff2": "font/woff2"}
trava = threading.Lock()
online = {}  # codigo -> {cliente: (papel, quando)}


def agora():
    return datetime.now(timezone.utc).strftime("%Y-%m-%dT%H:%M:%S.%f")[:-3] + "Z"


def grava(caminho, texto):
    tmp = caminho + ".tmp"
    with open(tmp, "w", encoding="utf-8") as f:
        f.write(texto)
    os.replace(tmp, caminho)


class Mesa(BaseHTTPRequestHandler):
    server_version = "l5r"
    sys_version = ""

    def log_message(self, fmt, *args):  # só o essencial no log do docker
        if not self.path.startswith("/api") or "versao" not in self.path:
            print("%s %s" % (self.address_string(), fmt % args), flush=True)

    def responde(self, codigo, corpo, tipo="application/json; charset=utf-8", cache="no-store"):
        dados = corpo if isinstance(corpo, bytes) else json.dumps(corpo, ensure_ascii=False).encode("utf-8")
        self.send_response(codigo)
        self.send_header("Content-Type", tipo)
        self.send_header("Content-Length", str(len(dados)))
        self.send_header("Cache-Control", cache)
        self.send_header("X-Robots-Tag", "noindex, nofollow")
        self.end_headers()
        if self.command != "HEAD":
            self.wfile.write(dados)

    # ---------- arquivos do app ----------
    def arquivo(self, caminho):
        rel = caminho.lstrip("/") or "index.html"
        alvo = os.path.realpath(os.path.join(APP, rel))
        base = os.path.realpath(APP)
        nome = os.path.basename(alvo)
        ext = os.path.splitext(nome)[1].lower()
        if not alvo.startswith(base + os.sep) or nome.startswith(".") or ext not in TIPOS or not os.path.isfile(alvo):
            return self.responde(404, {"erro": "não encontrado"})
        with open(alvo, "rb") as f:
            dados = f.read()
        cache = "no-cache" if ext in (".html", ".js") else "public, max-age=86400"
        self.responde(200, dados, TIPOS[ext], cache)

    # ---------- api ----------
    def autorizado(self):
        enviada = self.headers.get("X-Senha", "")
        if SENHA and hmac.compare_digest(SENHA.encode("utf-8"), enviada.encode("utf-8")):
            return True
        time.sleep(2)  # atrasa quem tenta adivinhar
        self.responde(401, {"erro": "senha"})
        return False

    def api(self, q, corpo=None):
        if not SENHA:
            return self.responde(500, {"erro": "senha da mesa não configurada"})
        if not self.autorizado():
            return
        acao = q.get("acao", [""])[0]
        codigo = q.get("codigo", [""])[0]
        if codigo and not CODIGO.match(codigo):
            return self.responde(400, {"erro": "código inválido"})
        arq = os.path.join(DADOS, codigo + ".json")
        if acao == "ping":
            return self.responde(200, {"ok": True})
        if acao == "lista":
            out = []
            for nome in os.listdir(DADOS):
                if not nome.endswith(".json"):
                    continue
                try:
                    with open(os.path.join(DADOS, nome), encoding="utf-8") as f:
                        j = json.load(f)
                except (OSError, ValueError):
                    continue
                d = j.get("data") or {}
                out.append({"codigo": j.get("codigo"), "updated_at": j.get("updated_at"),
                            "nome": d.get("nome"), "cla": d.get("cla"), "idade": d.get("idade")})
            out.sort(key=lambda x: x["updated_at"] or "", reverse=True)
            return self.responde(200, out)
        if not codigo:
            return self.responde(400, {"erro": "falta o código"})
        if acao == "pegar":
            if not os.path.exists(arq):
                return self.responde(200, {"data": None})
            with open(arq, "rb") as f:
                return self.responde(200, f.read())
        if acao == "versao":
            v = None
            if os.path.exists(arq):
                with open(arq, encoding="utf-8") as f:
                    v = json.load(f).get("updated_at")
            cli, papel, t = q.get("cliente", [""])[0], q.get("papel", [""])[0], time.time()
            with trava:
                p = online.setdefault(codigo, {})
                if CLIENTE.match(cli):
                    p[cli] = ("jogador" if papel == "jogador" else "mestre", t)
                for k in [k for k, (_, em) in p.items() if t - em > 20]:
                    del p[k]
                lista = [{"papel": pa, "em": int(em)} for pa, em in p.values()]
            return self.responde(200, {"updated_at": v, "online": lista})
        if acao == "salvar" and corpo is not None:
            try:
                d = json.loads(corpo.decode("utf-8"))
            except ValueError:
                return self.responde(400, {"erro": "JSON inválido"})
            if not isinstance(d, dict):
                return self.responde(400, {"erro": "JSON inválido"})
            t = agora()
            with trava:
                grava(arq, json.dumps({"codigo": codigo, "updated_at": t, "data": d}, ensure_ascii=False))
            return self.responde(200, {"updated_at": t})
        if acao == "apagar" and corpo is not None:
            with trava:
                if os.path.exists(arq):
                    os.remove(arq)
            return self.responde(200, {"ok": True})
        return self.responde(400, {"erro": "ação desconhecida"})

    def do_GET(self):
        u = urlparse(self.path)
        if u.path == "/api":
            return self.api(parse_qs(u.query))
        return self.arquivo(u.path)

    do_HEAD = do_GET

    def do_POST(self):
        u = urlparse(self.path)
        if u.path != "/api":
            return self.responde(404, {"erro": "não encontrado"})
        n = int(self.headers.get("Content-Length") or 0)
        if n > 5_000_000:
            return self.responde(413, {"erro": "ficha grande demais"})
        return self.api(parse_qs(u.query), self.rfile.read(n))


if __name__ == "__main__":
    os.makedirs(DADOS, exist_ok=True)
    print("Família L5R na porta %d; senha %s" % (PORTA, "configurada" if SENHA else "FALTANDO"), flush=True)
    ThreadingHTTPServer(("0.0.0.0", PORTA), Mesa).serve_forever()
