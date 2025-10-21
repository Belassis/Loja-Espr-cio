const { produtoModel } = require("../models/produtoModel");

const produtoController = {
    
    //LISTAR TODOS OS PRODUTOS
    //GET /produtos

    // listarProdutos: async (req, res)=> {
    //     try {
    //         const produtos = await produtoModel.buscarTodos();

    //         res.status(200).json(produtos);
    //     } catch (error) {
    //         console.error('Erro ao listar produtos:', error); 
    //         res.status(500).json({message: 'Erro ao buscar produtos.'});
    //     }
    // },
     
    //CRIAR UM NOVO PRODUTO
    //POST /produtos
   /*
   {
   "nomeProduto": "valor"
   "precoProduto": "0.00"
   }
   */

   listarProdutos: async(req, res) => {
    try{
        const { idProduto } = req.query;
        if (idProduto) {
            if (idProduto.length!=36) {
                return res.status(400).json({erro: 'Id do produto não encontrado'})
            }
            const produto = await produtoModel.buscarUm(idProduto);
            res.status(200).json(produto);
        }
        const produtos = await produtoModel.buscarTodos();
        res.status(200).json(produtos);
    } catch (error) {
        console.error('Erro ao buscar produto:', error);
        res.status(500).json({message: 'Erro ao buscar produto'})
    }
   },


    criarProduto: async (req, res)=>{
        try {
            const {nomeProduto, precoProduto} = req.body; 

            if (nomeProduto == undefined || precoProduto ==undefined || isNaN(precoProduto)){
                return res.status(400).json({erro:'Campos obrigatórios não preenchidos!'
                });
            }

            await produtoModel.inserirProduto(nomeProduto, precoProduto);
            res.status(201).json({message:"Produto Cadastrado com sucesso!"});

        } catch (error) {
            console.error('Erro ao cadastrar os produtos:', error);
            res.status(500).json({erro:'Erro no servidor ao cadastrar produto'}); 
        }
    },

    //ATUALIZAR UM  PRODUTO
    //PUT /produtos/idProduto
    //nomeProduto e precoProduto são opcionais 
   /*
   {
   "nomeProduto": "valor"
   "precoProduto": "0.00"
   }
   */

    atualizarProduto: async (req,res) => {
        try {
            const{idProduto} = req.params; 
            const {nomeProduto, precoProduto} = req.body; //eles vão vir da requisição
            
            if(idProduto.length !=36){
                return res.status(400).json({erro: 'id do produto inválido!'});
            }
            
            
            const produto = await produtoModel.buscarUm(idProduto);
            //Ver se o produto existe👇
            if (!produto || produto.length !== 1) {
               return res.status(404).json({error:'Produto não encontrado!'}); 
            }

            const produtoAtual = produto[0];

            const nomeAtualizado = nomeProduto ?? produtoAtual.nomeProduto;
            const precoAtualizado = precoProduto ?? produtoAtual.precoProduto;

            await produtoModel.atualizarProduto(idProduto, nomeAtualizado, precoAtualizado);
            
            res.status(200).json({message: 'Produto atualizado com sucesso!'})
        } catch (error) {
            console.error('Erro ao atualizar produto:', error);
            res.status(500).json({erro: "Erro no servidor ao atualizar produto."})
        }
    },

    deletarProduto: async (req,res) => {
        try {
            const{idProduto} = req.params; 
            
            if(idProduto.length !=36){
                return res.status(400).json({erro: 'id do produto inválido!'});
            }
             const produto = await produtoModel.buscarUm(idProduto);
            //Ver se o produto existe👇
            if (!produto || produto.length !== 1) {
               return res.status(404).json({error:'Produto não encontrado!'}); 
            }

            await produtoModel.deletarProduto(idProduto); 
            res.status(200).json({message: 'Produto deletado com sucesso!'});
        } catch (error) {
            console.error('Erro ao deletar produto:', error);
            res.status(500).json({erro: 'Erro no servidor ao deletar o produto'}); 
        }
    }
}

module.exports = {produtoController};