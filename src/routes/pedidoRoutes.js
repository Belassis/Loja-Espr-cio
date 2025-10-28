const express = require ("express");
const router = express.Router();
const {pedidoController} = require ("../controllers/pedidoControler")

router.get("/pedidos", pedidoController.listarPedidos);
router.post("/peidos", pedidoController.criarPedido);

module.exports = {pedidoRoutes: router}; 

/**
 * Define as rotas relacionadas aos pedidos
 * 
 * @module pedidoRoutes
 * @description
 * -> GET /pedidos -> Lista todos os pedidos do banco de dados.
 */
