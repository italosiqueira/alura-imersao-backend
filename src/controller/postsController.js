import { getTodosPosts, criarPost }  from "../models/postsModel.js";

export async function listarPosts (req, res) {
    const posts = await getTodosPosts();
    // Obtém todos os posts do banco de dados utilizando a função getTodosPosts().
    res.status(200).json(posts);
    // Envia os posts como resposta em formato JSON.
}

export async function postarNovoPost(req, res) {
    const novoPost = req.body;

    try {
        const postCriado = await criarPost(novoPost);
        res.status(200).json(postCriado);
    } catch(erro) {
        console.error(erro.message);
        res.status(500).json({ "erro": "Falha na requisição" });
    }
}

export async function uploadImagem(req, res) {
    const novoPost = {
        descricao: "",
        imgUrl: req.file.originalname,
        alt: ""
    };

    try {
        const postCriado = await criarPost(novoPost);
        res.status(200).json(postCriado);
    } catch(erro) {
        console.error(erro.message);
        res.status(500).json({ "erro": "Falha na requisição" });
    }   
}