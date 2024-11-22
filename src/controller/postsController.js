import getTodosPosts from "../models/postsModel.js";

export async function listarPosts (req, res) {
    const posts = await getTodosPosts();
    // Obtém todos os posts do banco de dados utilizando a função getTodosPosts().
    res.status(200).json(posts);
    // Envia os posts como resposta em formato JSON.
}