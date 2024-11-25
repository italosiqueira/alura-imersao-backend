import 'dotenv/config';
import { ObjectId } from "mongodb";
import conectarAoBanco from "../config/dbconfig.js";
// Importa a função para conectar ao banco de dados, definida em dbconfig.js.

const conexao = await conectarAoBanco(process.env.STRING_CONEXAO);
// Conecta ao banco de dados utilizando a string de conexão fornecida pela variável de ambiente STRING_CONEXAO.
// O resultado da conexão é armazenado na variável conexao.

export async function getTodosPosts() {
    const db = conexao.db("imersao-instabyte");
    // Obtém o banco de dados 'imersao-instabyte' da conexão.
    const colecao = db.collection("posts");
    // Obtém a coleção 'posts' do banco de dados.
    return colecao.find().toArray();
    // Executa uma consulta para encontrar todos os documentos na coleção 'posts' e retorna um array com os resultados.
}


export async function criarPost(novoPost) {
    const db = conexao.db("imersao-instabyte");
    // Obtém o banco de dados 'imersao-instabyte' da conexão.
    const colecao = db.collection("posts");
    // Obtém a coleção 'posts' do banco de dados.
    return colecao.insertOne(novoPost);
}

export async function atualizarPost(id, post) {
    const db = conexao.db("imersao-instabyte");
    // Obtém o banco de dados 'imersao-instabyte' da conexão.
    const colecao = db.collection("posts");
    const objID = ObjectId.createFromHexString(id);
    // Obtém a coleção 'posts' do banco de dados.
    return colecao.updateOne({ _id: new ObjectId(objID) }, { $set: post });
}