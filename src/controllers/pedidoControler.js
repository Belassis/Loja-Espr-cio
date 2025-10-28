const {pedidoModel} = require("../models/pedidoModel"); 
const { clienteModel } = require ("../models/clienteModel");
const {produtoModel } = require ("../models/produtoModel");

const pedidoController = { //objeto em js
    /**
     * Controlador que lista todos os pedidos do banco de dados.
     * 
     * @async
     * @function listarPedidos
     * @param {object} req - Objeto da requisição (recebido do cliente HTTP)
     * @param {object} res - Objeto da resposta (enviado ao cliente HTTP)
     * @returns {Promise<void>} Retorna uma resposta JSON com a lista de produtos. 
     * @throws Mostra no console e retorna erro 500 se ocorrer falha ao buscar os pedidos. 
     */


    listarPedidos: async (req, res) => {
    try {
        const pedidos = await pedidoModel.buscarTodos(); 

        res.status(200).json(pedidos)
    } catch (error) {
        console.error("Erro ao listar pedido:", error);
        res.status(500).json({erro:"Erro interno no servidor ao listar produtos"}); //SEMPREEE QUE ABRIR CHAVE É UM 🚨OBJETO EM JAVA SCRIPT🚨!!!!!!
    }
},

    criarPedido: async (req, res) => {
        try {
            const {idCliente, dataPedido, statusPagamento, itens} = req.body; 

            if (idCliente == undefined || dataPedido== undefined || statusPagamento== undefined
                || itens.length <1) {
                    return res.status(400).json({erro: "Campos obrigatórios não preenchidos"});
                }

                if (idCliente.length !=36){
                    return res.status(400).json({erro: "Id do Cliente inválido"}); 
                }

                const cliente = await clienteModel.buscarUm(idCliente);
                if (!cliente || cliente.length !=1){
                    return res.status(404).json({erro:"Cliente não existe!"})
                }
                for (const item of itens){
                    const {idProduto, qtdItem} = item; 

                    if (idProduto == undefined || qtdItem == undefined){
                        return res.status(400).json({erro: "Campos obrigatórios não preenchidos"});
                    }

                    if(idProduto.length !=36) {
                        return res.status(400).json({erro: "Id dp produto inválido"})
                    }

                    const produto = await produtoModel.buscarUm(idProduto);
                    if (!produto || produto.length !=1) {
                        return res.status(400).json({erro: "Produto não encontrado"})
                    }
                }
                 await pedidoModel.inserirPedido(idCliente, dataPedido, statusPagamento, {itens});
                 res.status(201).json({message: "Pedido cadastrado com sucesso"})

        } catch (error) {
            console.error ("Erro ao cadastrar pedido:", error);
            res.status(500).json({erro: "Erro interno no servidor ao cadastrar pedido"})
        }
    }

}

module.exports = {pedidoController}; 