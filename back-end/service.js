const express = require('express');
const bodyParser = require('body-parser');
// const authRoutes = require('./src/routes/auth')
// const products = require('./src/routes/products')
const employeesRoutes = require('./src/core/employees/routes/employees-routes')
const securityRoutes = require('./src/core/security/routes/security-routes');
const cors = require("cors");
require('dotenv').config();

const app = express();
app.use(express.json());
app.use(express.urlencoded({ extended: false }));
app.use(cors());
const PORT = process.env.PORT || 9000;

app.use(bodyParser.json())

app.use('/api/employees', employeesRoutes);
// app.use('/api/auth', authRoutes)
// app.use('/api/auth', products)
app.use('/api/login', securityRoutes);
app.listen(PORT, ()=>{
    console.log(`Server is running on ${PORT}`)
})