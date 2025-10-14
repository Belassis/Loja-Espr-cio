## API Reference 

### Produtos 

#### GET /produtos 
- **Descrição**: Obtém uma lista de produtos 
- **Response**: Array de produtos

#### POST /produtos
- **Descrição**: Cria um novo produto
- **Body**: 
```
{
    "nomeProduto": "produtoExemplo",
    "precoProduto": 0.00
}
```
- **Response**: 
```
    "message": "Produto cadastrado com sucesso!"
```

### Clientes 

#### GET /clientes 
- **Descrição**: Obtém uma lista de clientes cadastrados 
- **Response**: 

#### POST /clientes
- **Descrição**: Cria um novo cliente
- **Body**: 
```
{
    "nomeCliente": "Mariazinha",
    "cpfCliente": 12345678901
}
```
- **Response**: 
```
    "message": "Cliente cadastrado com sucesso!"