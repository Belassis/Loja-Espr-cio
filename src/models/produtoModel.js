const {sql, getConnection} = require("../config/db");

const produtoModel={
    buscarTodos: async ()=>{
        try {
            
            const pool = await getConnection(); //cria um conjunto de conexão com o bd

            let sql ='SELECT * FROM PRODUTOS';

            const result = await pool.request().query(sql);

            return result.recordset; 

        } catch (error) {
            console.error('Erro ao buscar produtos', error);

            throw error; //passar o erro para controlar
        }
    },

    buscarUm: async (idProduto) => {
      try {
        const pool = await getConnection(); //conectar uma função
        const querySQL = 'SELECT * FROM Produtos WHERE idProduto = @idProduto'; 

        const result = await pool.request()
        .input('idProduto', sql.UniqueIdentifier, idProduto)
        .query(querySQL); 

        return result.recordset;

      } catch (error) {
        console.error('Erro ao buscar o produto:', error);
        throw error; 
      }  
    },

    inserirProduto: async (nomeProduto, precoProduto)=>{
        try {

            const pool = await getConnection();

            let querySQL= 'INSERT INTO Produtos(nomeProduto,precoProduto) VALUES(@nomeProduto, @precoProduto)'; //criar variável é assim @asdfgh

            await pool.request() //requisição que ele vai fazer ao banco de dados
            .input('nomeProduto', sql.VarChar(100), nomeProduto)
            .input('precoProduto', sql.Decimal(10,2), precoProduto) 
            .query(querySQL);
            
        } catch (error) {
            console.error('Erro ao inserir produto', error);
            throw error; //passar o erro para controlar
        }
    },
    //Atualizar os produtos 👇👇

    atualizarProduto: async (idProduto, nomeProduto, precoProduto) => {
        try {
             const pool = await getConnection();

             const querySQL = `
                UPDATE Produtos 
                SET nomeProduto = @nomeProduto, 
                 precoProduto = @precoProduto
                 WHERE idProduto = @idProduto 
            `;

            await pool.request()
            .input('idProduto', sql.UniqueIdentifier, idProduto)
            .input('nomeProduto', sql.VarChar(100), nomeProduto)
            .input('precoProduto', sql.Decimal(10,2), precoProduto)
            .query(querySQL);
            
        } catch (error) {
            console.log('Erro ao atualizar produto:', error);
            throw error;
        }
    },
    
    deletarProduto: async (idProduto) => {
        try {
            const pool = await getConnection();

            const querySQL = 'DELETE FROM Produtos WHERE idProduto = @idProduto'

            await pool.request() //senão tiver request ele não faz a requisição de dados
            .input('idProduto', sql.UniqueIdentifier, idProduto)
            .query(querySQL);

        } catch (error) {
            console.error('Erro ao deletar o produto:', error);
            throw error;
        }
    }
    
}

module.exports = {produtoModel}