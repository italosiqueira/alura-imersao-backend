import express from "express";
import multer from "multer";
import { listarPosts, postarNovoPost, uploadImagem } from "../controller/postsController.js";

const storage = multer.diskStorage({
    destination: function (req, file, cb) {
        cb(null, 'uploads/');
    },
    filename: function (req, file, cb) {
        cb(null, file.originalname);
    }
});

const upload = multer({ storage });

const routes = (app) => {
    app.use(express.json());
    // Habilita o middleware para analisar o corpo das requisições JSON.

    app.get("/", (req, res) => {
        res.redirect('/api');
        // Redireciona todas as requisições para a raiz ('/') para a rota '/api'.
    });

    app.get("/api", (req, res) => {
        res.status(200).send({ "name": "instalike", "version": "0.1" });
        // Responde à requisição GET para '/api' com um objeto JSON contendo informações sobre a API.
    });

    app.get("/posts", listarPosts);

    app.post("/posts", postarNovoPost);
    
    app.post("/upload", upload.single("imagem"), uploadImagem);
};

export default routes;
