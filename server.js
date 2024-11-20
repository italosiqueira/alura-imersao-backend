import express from "express";

const app = express();

app.listen(3000, () => console.log("Servidor ouvindo na porta 3000..."));

app.get("/api", (req, res) => {
    res.status(200).send({ "name": "instalike", "version": "0.1" });
});