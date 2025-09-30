const express = require("express");
const router = express.Router();
const { produtoController } = require("../controllers/produtoController"); 

//GET /produtos = pq precisa dizer para o programador para ele listar todos os produtos
router.get("/produtos", produtoController.listarProdutos); 

module.exports={produtosRoutes: router}; 