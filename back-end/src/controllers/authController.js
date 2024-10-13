const { json } = require('express');
const fs = require('fs')
const jwt = require('jsonwebtoken')
const SECRET_KEY = 'my_super_secret_key_12345';

const readData = ()=>{
    const data = fs.readFileSync('data.json')
    return JSON.parse(data)

}

const login = (req, res) =>{
    const {username, password} = req.body
    const data = readData();
    const user = data.users.find(u => u.username === username && u.password === password)

    if(user){
        const token = jwt.sign({ username }, SECRET_KEY, { expiresIn: '1h' });
        res.json({token})
    } else{
        res.status(401).json({ message: 'Invalid credentials' });
    }

}

module.exports = login