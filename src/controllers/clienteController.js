const { clienteModel } = require("../models/clienteModel");

const clienteController = {

    //LISTAR TODOS OS CLIENTES
    //GET /clientes

    listarClientes: async (req, res) => {
        try {
            const clientes = await clienteModel.buscarTodos();

            res.status(200).json(clientes);
        } catch (error) {
            console.error('Erro ao listar os clientes:', error);
            res.status(500).json({ message: 'Erro ao buscar clientes.' });
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

            const result = await clienteModel.buscarCPF(cpfCliente); 
            if(result.length > 0) { //o lenght vai mostrar quantos números tem
                return res.status(409).json({message: 'Esse CPF já existe'}); 
            }

            await clienteModel.inserirCliente(nomeCliente, cpfCliente);
            res.status(201).json({message:"Cliente cadastrado com sucesso!"});

        } catch (error) {
            console.error('Erro ao cadastrar os clientes:', error);
            res.status(500).json({erro:'Erro no servidor ao cadastrar clientes'}); 
        }
    }
}


module.exports = {clienteController};