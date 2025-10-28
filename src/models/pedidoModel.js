//conexão com o banco de dados:
const{sql, getConnection } = require("../config/db");

//preciso de um objeto que contenha as funções:

const pedidoModel = {
    /**
     * Busca todos os pedidos e seus respectivos itens no banco de dados.
     * 
     * @async 
     * @function buscarTodos
     * @returns {Promise<Array>} retorna uma lista com todos os pedidos e seus itens. 
     * @throws Mostra no console o erro e propaga o erro caso a busca falhe. 
     */
    buscarTodos: async () => {
        try {
            const pool = await getConnection(); 

                const querySQL = `
                select
                CL.nomeCliente,
                PD.dataPedido, 
                PD.statusPagamento,
                PT.nomeProduto,
                IT.qtdItem

                from Pedidos PD
                inner join ItemPedido IT
                on IT.idPedido = PD.idPedido
                inner join Produtos PT
                on PT.idProduto = IT.idProduto
                inner join Clientes CL
                on CL.idCliente = PD.idCliente
            `;

            const result = await pool.request()
            .query(querySQL); 

            return result.recordset;
        } catch (error) {
            console.error("Erro ao buscar pedidos:", error);
            throw error; 
        }
    },


    
    inserirPedido: async (idCliente, dataPedido, statusPagamento, { itens }) => { //{itens} realiza a desustruração do objeto itens
        const pool = await getConnection();

        const transaction = new sql.Transaction(pool);
        await transaction.begin(); //inicia a transação

        try {
            
            let querySQL= `
            insert into Pedidos (idCliente, dataPedido, statusPagamento)
            output inserted.idPedido
            values (@idCliente, @dataPedido, @statusPagamento)
            `
            const result = await transaction.request()
            .input("idCliente", sql.UniqueIdentifier, idCliente)
            .input("dataPedido", sql.Date, dataPedido)
            .input("statusPagamento", sql.Bit, statusPagamento)
            .query(querySQL);

            const idPedido = result.recordset[0].idPedido;

            for (const item of itens) {
                const {idProduto, qtdItem} = item; 

                querySQL = `
                insert into ItemPedido (idPedido, idProduto, qtdItem) 
                values (@idPedido, @idProduto, @qtdItem)
                `

                await transaction.request()
                .input("idPedido", sql.UniqueIdentifier, idPedido)
                .input ("idProduto", sql.UniqueIdentifier, idProduto)
                .input ("qtdItem", sql.Int, qtdItem,)
                .query(querySQL)
            }

            await transaction.commit(); //Vai confirmar as alterações(vai comitar as alterações)

        } catch (error) {
            await transaction.rollback(); //Desfaz tudo caso de erro
            console.error("Erro ao inserir pedido:", error);
            throw error; 
        }
    }
};

module.exports = {pedidoModel};