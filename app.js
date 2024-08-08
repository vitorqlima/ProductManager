const express = require("express");
const productManager = require("./ProductManager");

const app = express();

const produto = new productManager();

app.use(express.json()); // Para garantir que req.body seja parseado como JSON

app.get("/produto/:id", async (req, res) => {
    const id = req.params.id;
    const produtoEncontrado = await produto.getProductById(id);
    res.json(produtoEncontrado);
});

const port = 3000;
app.listen(port, () => {
    console.log(`Servidor rodando em http://localhost:${port}`);
});

module.exports = app;
