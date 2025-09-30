const {sql, getConnection} = require("../config/db");

const produtoModel={
    buscarTodos: async ()=>{
        try {
            
            const pool = await getConnection(); //cria conexão com o bd

            let sql ='SELECT * FROM PRODUTOS';

            const result = await pool.request().query(sql);

            return result.recordset; 

        } catch (error) {
            console.error('Erro ao buscar produtos', error);

            throw error; 
        }
    }
}

module.exports = {produtoModel}