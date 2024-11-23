import express from "express";
import { listarPosts, postarNovoPost } from "../controller/postsController.js";

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

};

export default routes;
