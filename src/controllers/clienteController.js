const { clienteModel } = require("../models/clienteModel");

const clienteController = {

    //LISTAR TODOS OS CLIENTES
    //GET /clientes

    listarClientes: async (req, res) => {
        try{
            const {idCliente} = req.query;
            
            if(idCliente) {
                if (idCliente.length !=36) {
                    return res.status(400).json({erro: 'ID inválido'});
                }

                const cliente = await clienteModel.buscarUm(idCliente)
                return res.status(200).json(cliente)
            }

            const clientes = await clienteModel.buscarTodos();

            res.status(200).json(clientes);

        } catch (error) {
            console.error('Erro ao listar cliente', error);
            res.status(500).json({message: 'Erro ao boscar clientes'});
        }
    },
        



//CRIAR UM NOVO CLIENTE
//POST /clientes
/*
{
"nomeCliente": "Mariazinha"
"cpfCliente": "12345678901"
}
*/


     criarCliente: async (req, res)=>{
        try {
            const {nomeCliente, cpfCliente} = req.body; 

            if (nomeCliente == undefined || cpfCliente ==undefined){
                return res.status(400).json({erro:'Campos obrigatórios não preenchidos!'
                });
            }

            await clienteModel.inserirCliente(nomeCliente, cpfCliente);
            res.status(201).json({message:"Cliente Cadastrado com sucesso!"});

        } catch (error) {
            console.error('Erro ao cadastrar cliente:', error);
            res.status(500).json({erro:'Erro no servidor ao cadastrar cliente'}); 
        }
    }
}

module.exports = {clienteController};