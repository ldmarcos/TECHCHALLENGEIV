# 📚 TechChallengeIV - Aplicativo de Blogging Escolar

## 📝 Descrição

Este projeto é uma aplicação de blogging escolar criada para professores e alunos da rede pública de educação. A aplicação permite a criação, edição, visualização e exclusão de posts,e busca de posts por palavras-chave. Além disso permite a criação, edição, visualização e exclução de cadastros de professores e alunos.

## 🛠️ Tecnologias Utilizadas

- **FrontEnd:** React Native, Expo
- **Backend:** Node.js, Express
- **Banco de Dados:** PostgreSQL
- **Containerização:** Docker


## 📂 Estrutura de Diretórios

```plaintext
API/
├── src/
│   ├── config/
│   │   └── db.js
│   ├── controllers/
│   │   ├── usuarioController.js
│   │   └── postagemController.js
│   ├── middleware/
│   │   └── authMiddleware.js
│   ├── models/
│   │   ├── usuarioModel.js
│   │   └── postagemModel.js
│   ├── routes/
│   │   ├── usuarioRoutes.js
│   │   └── postagemRoutes.js
│   ├── test/
│   │   ├── controllers/
│   │   │   └── postagemController.test.js
│   │   ├── models/
│   │   │   ├── postagemModel.test.js
│   │   │   └── usuarioModel.test.js
│   └── server.js
├── Dockerfile
├── docker-compose.yml
├── .env
├── .dockerignore
├── .gitignore
├── jest.config.js
├── package.json
├── package-lock.json
└── wait-for-it.sh
mobile/
├── expo/
|    ├──devices.json
|    └──README.md
├── app/
│   ├── navigation/
│   │   ├──_layout.jsx
|   │   ├──home.jsx
|   │   ├──login.jsx
|   │   ├──perfil.jsx
|   │   ├──postagens.jsx
|   │   ├──usuarios.jsx
│   ├── screens/
│   │   ├──aluno.jsx
│   │   ├──EditAluno.jsx
│   │   ├──EditDocente.jsx
│   │   ├──EditPost.jsx
│   │   ├──NewAluno.jsx
│   │   ├──NewDocente.jsx
│   │   ├──NewPost.jsx
│   │   ├──Post.jsx
│   │   ├──professores.jsx
|   ├── index.jsx
├── assets/
│   ├── fonts/
│   │   ├──SpaceMono-Regular.ttf
│   ├── icons/
│   │   ├──addPost.png
│   │   ├──addUser.png
│   │   ├──aluno.png
│   │   ├──backArrow.png
│   │   ├──docente.png
│   │   ├──home.png
│   │   ├──login.png
│   │   ├──menu.png
│   │   ├──pencil.png
│   │   ├──posts.png
│   │   ├──profile.png
│   │   ├──search.png
│   │   ├──trash.png
│   │   ├──users.png
│   ├── images/
│   │   ├──adaptive-icon.png
│   │   ├──favicon.png
│   │   ├──icon.png
│   │   ├──logo.png
│   │   ├──splash.png
│   ├── components/
│   │   ├──Capa.jsx
│   │   ├──Header.jsx
│   │   ├──HeaderHome.jsx
│   │   ├──HeaderUsers.jsx
│   │   ├──ListagemPost.jsx
│   │   ├──Popup.jsx
│   │   ├──PopUser.jsx
│   │   ├──PostList.jsx
│   │   ├──TabIcon.jsx
│   │   ├──UserList.jsx
│   ├── context/
│   │   ├──AuthContext.js
├── .env
├── .gitignore
├── app.json
├── babel.config.json
├── package-lock.json
├── package.json
```

## 🚀 Configuração do Ambiente

### 📋 Pré-requisitos

- Expo 51 instalado
- Node.js e npm instalados
- Docker e Docker Compose instalados

### 🛠️ Passo a Passo

### API

1. **Clone o repositório do projeto:**
   ```bash
   git clone https://github.com/FellGMS/TechChallengeII.git
   cd API
   ```

2. **Configure as variáveis de ambiente no arquivo `.env`:**
   ```plaintext
   JWT_SECRET=seu-segredo-aqui
   ```

3. **Instale as dependências:**
   ```bash
   npm install
   ```

4. **Suba os contêineres Docker:**
   ```bash
   docker-compose up --build
   ```

5. **Execute as migrações do banco de dados:**
   ```bash
   npx sequelize-cli db:migrate
   ```

6. **Inicie a aplicação:**
   ```bash
   npm start
   ```

### APLICATIVO

1. **Intale o Expo em seu dispotivivo:**
   ```bash
   Em seu dispositivo android instale o Expo 51 com o link:
   https://expo.dev/go?sdkVersion=51&platform=android&device=true
   cd API
   ```

2. **Configure as variáveis de ambiente no arquivo `.env`:**
   ```plaintext
   BASE_URL=url-onde-esta-rodando-a-API
   ```

3. **Instale as dependências:**
   ```bash
   npm install
   ```

4. **Inicie a aplicação:**
   ```bash
   npm start
   ```
