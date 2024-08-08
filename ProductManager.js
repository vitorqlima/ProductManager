const fs = require('fs');

class productManager {
    constructor() {
        this.products = [];
        this.id = 1;
    }

    addProduct({ title, description, price, thumbnail, stock }) {
        if (!fs.existsSync("./products.txt")) {
            console.log("Criando arquivo...");
            fs.writeFileSync("./products.txt", "");
        } else {
            console.log("Arquivo encontrado, continuando...");
        }

        const product = {
            title,
            description,
            price,
            thumbnail,
            code: this.id++,
            stock
        };

        if (!title || !description || price == undefined || !thumbnail || stock == undefined) {
            console.log("Dados Incompletos.");
            return null;
        } else {
            fs.appendFileSync("./products.txt", JSON.stringify(product) + "\n");
            console.log("Produto adicionado!");
        }
    }

    getProductById(id) {
        if (fs.existsSync("./products.txt")) {
            const produtos = fs.readFileSync("./products.txt", "utf-8").trim().split('\n');
            const produtosObjetos = produtos.map(line => JSON.parse(line));
            const produto = produtosObjetos.find(prod => prod.code == id);

            if (produto == undefined) {
                return { error: "Produto não encontrado" };
            } else {
                return produto;
            }
        } else {
            return { error: "Arquivo não encontrado." };
        }
    }
}

module.exports = productManager;
