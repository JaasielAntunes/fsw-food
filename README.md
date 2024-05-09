<h1 align="center">
  Aplicação Web Full Stack desenvolvida durante o evento FSW promovido pela <a href="https://lp.fullstackclub.com.br/">Full Stack Club</a>.
</h1>

<p align="center">
  <a href="LICENSE"><img  src="https://img.shields.io/github/license/Ileriayo/markdown-badges?style=for-the-badge" alt="License"></a>
</p>

---

## 📝 Sobre o projeto

O FSW Food é uma aplicação Web responsiva que simula o funcionamento do Ifood, mas com algumas limitações. A principal ideia do projeto foi pôr em prática o conhecimento prévio
nas tecnologias React utilizando o framework Next e assim elevar esse conhecimento ao próximo nível. A aplicação possui as funcionalidades de autenticação com Google, realizar 
login e logout, realizar pedido, marcar ou desmarcar restaurante como favorito e buscar por restaurantes.

---

## ✅ Melhorias implementadas

- Usuário só pode finalizar o pedido se estiver logado
- Limitação de itens na sacola
- Limitação do campo de busca por restaurante
- Inserir manualmente a quantidade de itens na sacola
- Redirecionamento de página em caso de realizar logout

---

## 🔗 Deploy
https://nlw-react-notes.netlify.app

---

## 📁 Requisitos

- Node.js versão 20 ou superior
- Docker

---

## 💻 Tecnologias

- React e React-DOM
- Prisma
- Next
- Google Oauth
- Docker
- Tailwind CSS
- JavaScript
- TypeScript
- PostCSS
- Radix UI
- Lucide-react
- Sonner

---

## 💡 Utilização
1. Clone o projeto:

```
$ git clone https://github.com/JaasielAntunes/fsw-food.git
```

2. Acesse a pasta do projeto:

```
$ cd fsw-food
```

3. Instale as dependências:

```
$ npm i
```

4. Execute:

```
$ docker compose up -d
```

5. Faça o seed do banco de dados:

```
$ prisma db seed
```

6. Inicie a aplicação:

```
$ npm run dev
```

---

<h4 align="center">
  Feito com ❤️ por Jaasiel Antunes - <a href="mailto:contato.jaasiel@gmail.com.com">Entre em contato</a>
</h4>

<p align="center">
  <a href="https://www.linkedin.com/in/jaasiel-antunes-1517b41bb">
    <img alt="Jaasiel Antunes" src="https://img.shields.io/badge/LinkedIn-Jaasiel-0e76a8?style=flat&logoColor=white&logo=linkedin">
  </a>
</p>
