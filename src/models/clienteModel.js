const {sql, getConnection} = require("../config/db");

const clienteModel={
    buscarTodos: async ()=>{
        try {
            
            const pool = await getConnection(); //cria um conjunto de conexão com o bd

            let sql ='SELECT * FROM Clientes'; //select from a tabela que eu criei no sql

            const result = await pool.request().query(sql);

            return result.recordset; 

        } catch (error) {
            console.error('Erro ao buscar os clientes', error);

            throw error; //passar o erro para controlar
        }
    },

     buscarCPF: async (cpfCliente)=>{
        try {
            
            const pool = await getConnection(); //cria um conjunto de conexão com o bd

            let sql ='SELECT * FROM cpfCliente'; //select from a tabela que eu criei no sql

            const result = await pool.request().query(sql);
            input('cpfCliente', sql.VarChar(11), cpfCliente) 
            .query(querySQL);

            return result.recordset; 

        } catch (error) {
            console.error('Erro ao buscar o cpf do cliente', error);

            throw error; //passar o erro para controlar
        }
    },

    inserirCliente: async (nomeCliente, cpfCliente)=>{ //nomeCliente e cpfCliente pois nos produtos também não listamos os id dos produtos, então o cpf aqui faria mais sentido
        try {

            const pool = await getConnection();

            let querySQL= 'INSERT INTO Clientes(nomeCliente,cpfCliente) VALUES(@nomeCliente, @cpfCliente)'; //vai inserir esses valores na tabela que criei
            // //criar variável é assim @asdfgh

            await pool.request() //requisição que ele vai fazer ao banco de dados
            .input('nomeCliente', sql.VarChar(100), nomeCliente)
            .input('cpfCliente', sql.VarChar(11), cpfCliente) 
            .query(querySQL);
            
        } catch (error) {
            console.error('Erro ao inserir cliente', error);
            throw error; //passar o erro para controlar
        }
    }
}

module.exports = {clienteModel}

