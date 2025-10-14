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
    }
}

module.exports = {produtoModel}

