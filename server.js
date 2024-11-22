import express from "express";
// Importa o framework Express para criar a aplicação web.

import conectarAoBanco from "./src/config/dbconfig.js";
// Importa a função para conectar ao banco de dados, definida em dbconfig.js.

const conexao = await conectarAoBanco(process.env.STRING_CONEXAO);
// Conecta ao banco de dados utilizando a string de conexão fornecida pela variável de ambiente STRING_CONEXAO.
// O resultado da conexão é armazenado na variável conexao.

// Array de posts hardcoded (para fins de demonstração)
const posts = [
    {
        id: 1,
        descricao: "Neo test image",
        imagem: "https://placecats.com/neo/200/300"
    },
    {
        id: 2,
        descricao: "Millie test image",
        imagem: "https://placecats.com/millie/200/300"
    },
    {
        id: 3,
        descricao: "Bella test image",
        imagem: "https://placecats.com/bella/200/400"
    },
    {
        id: 4,
        descricao: "Neo Banana test image",
        imagem: "https://placecats.com/neo_banana/150/300"
    },
    {
        id: 5,
        descricao: "General test image",
        imagem: "https://placecats.com/g/200/300"
    }
];

const app = express();
// Cria uma instância do aplicativo Express.

app.use(express.json());
// Habilita o middleware para analisar o corpo das requisições JSON.

app.listen(3000, () => console.log("Servidor ouvindo na porta 3000..."));
// Inicia o servidor na porta 3000 e exibe uma mensagem no console.

app.get("/", (req, res) => {
  res.redirect('/api');
  // Redireciona todas as requisições para a raiz ('/') para a rota '/api'.
});

app.get("/api", (req, res) => {
  res.status(200).send({ "name": "instalike", "version": "0.1" });
  // Responde à requisição GET para '/api' com um objeto JSON contendo informações sobre a API.
});

app.get("/posts", async (req, res) => {
  const posts = await getTodosPosts();
  // Obtém todos os posts do banco de dados utilizando a função getTodosPosts().
  res.status(200).json(posts);
  // Envia os posts como resposta em formato JSON.
});

async function getTodosPosts() {
  const db = conexao.db("imersao-instabyte");
  // Obtém o banco de dados 'imersao-instabyte' da conexão.
  const colecao = db.collection("posts");
  // Obtém a coleção 'posts' do banco de dados.
  return colecao.find().toArray();
  // Executa uma consulta para encontrar todos os documentos na coleção 'posts' e retorna um array com os resultados.
}

app.get("/posts/:id", (req, res) => {
    const index = buscarPostPorID(req.params.id);
    
    if (index === -1)
        res.status(404).send();
    else
        res.status(200).json(posts[index]);
});

function buscarPostPorID(id) {
    return posts.findIndex((post) => {
        return post.id === Number(id);
    });
}