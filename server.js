import express from "express";

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
app.use(express.json());

app.listen(3000, () => console.log("Servidor ouvindo na porta 3000..."));

app.get("/api", (req, res) => {
    res.status(200).send({ "name": "instalike", "version": "0.1" });
});

app.get("/posts", (req, res) => {
    res.status(200).json(posts);
});

app.get("/posts/:id", (req, res) => {
    const index = buscarPostPorID(req.params.id);
    res.status(200).json(posts[index]);
});

function buscarPostPorID(id) {
    return posts.findIndex((post) => {
        return post.id === Number(id);
    });
}