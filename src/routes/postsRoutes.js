// Importa o framework Express para criar a aplicação web.
import express from "express";

// Importa o módulo Multer para lidar com o upload de arquivos.
import multer from "multer";

// Importa as funções do controlador que serão utilizadas para as rotas.
import { listarPosts, postarNovoPost, uploadImagem } from "../controller/postsController.js";

// Configura o armazenamento para os arquivos enviados.
const storage = multer.diskStorage({
    // Define o diretório de destino para os arquivos.
    destination: function (req, file, cb) {
        cb(null, 'uploads/');
    },
    // Define o nome do arquivo salvo, mantendo o nome original.
    filename: function (req, file, cb) {
        cb(null, file.originalname);
    }
});

// Cria uma instância do Multer com a configuração de armazenamento definida.
const upload = multer({ storage });

// Cria uma função que define as rotas da aplicação.
const routes = (app) => {
    // Habilita o middleware JSON para entender requisições com corpo em formato JSON.
    app.use(express.json());

    // Redireciona todas as requisições para a raiz ('/') para a rota '/api'.
    app.get("/", (req, res) => {
        res.redirect('/api');
    });

    // Define uma rota GET para '/api' que retorna informações básicas sobre a API.
    app.get("/api", (req, res) => {
        res.status(200).send({ "name": "instalike", "version": "0.1" });
    });

    // Define uma rota GET para '/posts' que lista todos os posts.
    app.get("/posts", listarPosts);

    // Define uma rota POST para '/posts' para criar um novo post.
    app.post("/posts", postarNovoPost);

    // Define uma rota POST para '/upload' para fazer upload de uma imagem.
    app.post("/upload", upload.single("imagem"), uploadImagem);
};

// Exporta a função 'routes' para ser utilizada em outros módulos.
export default routes;
