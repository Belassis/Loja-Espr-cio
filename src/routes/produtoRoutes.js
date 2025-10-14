const express = require("express");
const router = express.Router();
const { produtoController } = require("../controllers/produtoController");

//GET /produtos = pq precisa dizer para o programador para ele listar todos os produtos
router.get("/produtos", produtoController.listarProdutos);

//Post /produtos ->cria um nov produto
router.post("/produtos", produtoController.criarProduto);

module.exports = { produtosRoutes: router }; 