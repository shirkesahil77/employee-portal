const express = require('express');
const router = express.Router();
const {getProducts, createProduct} = require('../controllers/productController');
const jwt = require('jsonwebtoken');
const SECRET_KEY = 'my_super_secret_key_12345';

const authenticateToken = (req, res, next) => {
    const token = req.headers['authorization']?.split(' ')[1];
    if (!token) return res.sendStatus(401);

    jwt.verify(token, SECRET_KEY, (err, user) => {
        if (err) return res.sendStatus(403);
        req.user = user;
        next();
    });
};

router.get('/products', authenticateToken, getProducts);
router.post('/products', authenticateToken, createProduct);

module.exports = router