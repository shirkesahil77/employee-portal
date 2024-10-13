const fs = require("fs");

const readData = () => {
    const data = fs.readFileSync('data.json')
    return JSON.parse(data)
};

const getProducts = (req, res) => {
    const data = readData()
    const products = data.products
    return res.json(products)
}

const addProduct = (product) => {
    const data = readData()
    const products = data.products
    products.push(product);
};

const createProduct = (req, res) => {
    const newProduct = req.body;

    if (!newProduct.name && !newProduct.product ) {
        return res.status(400).json({ error: 'Product name are required' });
    }

    addProduct(newProduct);
    return res.status(201).json(newProduct);
};



module.exports = {getProducts,createProduct}