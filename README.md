# 📦 Rastro Correios - v1.0.0

![Version](https://img.shields.io/badge/version-1.0.0-blue)
![License](https://img.shields.io/badge/license-APACHE--2.0-blue)
![Node.js](https://img.shields.io/badge/Node.js-18.x-blue)

![rastro-correios](https://i.postimg.cc/DZ4JsZ7S/rastro-correios.png)

**Rastro Correios** é uma API feita com [Node.js](https://nodejs.org) que permite rastrear objetos dos [Correios do Brasil](https://www.correios.com.br) de forma simples, rápida e sem autenticação.  
Ideal para integrar em sistemas logísticos, e-commerces, bots ou qualquer aplicação que precise acompanhar o status de entregas.

---

## ⚙️ Instalação

Antes de tudo, crie um arquivo `.env` na raiz do projeto com as variáveis do arquivo [`.env.example`](./.env.example).

```bash
# Clone o repositório
git clone https://github.com/josevitorsoares/rastro-correios.git

# Acesse a pasta
cd rastro-correios

# Instale as dependências
pnpm install

# Inicie o servidor em modo desenvolvimento
pnpm dev
```

---

## 🛠️ Como usar

Depois de rodar o projeto, basta fazer uma requisição GET para o endpoint:

```
GET http://localhost:3333/track/:trackingCode
```

Substitua `:trackingCode` por um código válido dos Correios, como por exemplo:

```
GET http://localhost:3333/track/PO123456789BR
```

---

## 🧪 Exemplo de resposta

```json
{
  "code": "PO123456789BR",
  "type": "ENCOMENDA PAC",
  "tracks": [
    {
      "description": "Objeto entregue ao destinatário",
      "status": "delivered",
      "origin": "Agência Dos Correios FORTALEZA, CE",
      "date": "25/02/25",
      "time": "10:02",
      "message": ""
    },
    {
      "description": "Objeto saiu para entrega ao destinatário",
      "status": "delivery_route",
      "origin": "Agência Dos Correios FORTALEZA, CE",
      "date": "25/02/25",
      "time": "09:34",
    },
    {
      "description": "Objeto em transferência - por favor aguarde",
      "status": "in_transit",
      "origin": "Unidade de Tratamento FORTALEZA, CE",
      "destination": "Agência Dos Correios FORTALEZA, CE",
      "date": "18/03/2025",
      "time": "13:43:20"
    },
    {
      "description": "Objeto em transferência - por favor aguarde",
      "status": "in_transit",
      "origin": "Agência Dos Correios SAO PAULO, SP",
      "destination": "Unidade Tratamento SAO PAULO, SP",
      "date": "21/02/25",
      "time": "16:25"
    },
    {
      "description": "Objeto postado",
      "status": "posted",
      "origin": "Agência Dos Correios São Paulo, SP",
      "date": "21/02/25",
      "time": "11:06"
    }
  ]
}
```

---

## 🚀 Tecnologias Utilizadas

- [Node.js](https://nodejs.org) — Servidor leve e eficiente
- [TypeScript](https://www.typescriptlang.org) — Tipagem estática para maior segurança
- [Fastify](https://www.fastify.io) — Framework rápido para APIs RESTful
- [dotenv](https://github.com/motdotla/dotenv) — Gerenciamento de variáveis de ambiente

---

## ✨ Funcionalidades

- 📮 Consulta de rastreamento por código dos Correios
- 🔒 Resposta estruturada em JSON
- ⚠️ Tratamento de erros e instabilidades

---

## 🤝 Contribuindo

Contribuições são super bem-vindas!  
Se quiser reportar um bug, sugerir uma melhoria ou abrir um pull request, é só seguir os passos:

1. Faça um fork do repositório
2. Crie uma branch: `git checkout -b minha-feature`
3. Faça suas alterações e commit: `git commit -m 'feat: minha nova feature'`
4. Envie a branch: `git push origin minha-feature`
5. Abra um Pull Request aqui no GitHub

---

## 📄 Licença

Este projeto está sob a licença [APACHE-2.0](LICENSE).

---

## 💡 Autor

Feito com 💜 por [José Vitor G. Soares](https://github.com/josevitorsoares)
