const express = require("express");
const router = express.Router();
const { clienteController } = require("../controllers/clienteController");

//GET /clientes = pq precisa dizer para o programador para ele listar todos os clientes
router.get("/clientes", clienteController.listarClientes);

//Post /clientes ->cria um novo cliente no caso
router.post("/clientes", clienteController.criarCliente);

module.exports = { clienteRoutes: router }; 