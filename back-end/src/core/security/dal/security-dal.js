const { MongoClient } = require('mongodb');
const jwt = require('jsonwebtoken');

const client = new MongoClient(process.env.CONNECTION_STRING);
client.connect();
        const db = client.db(process.env.DATABASE_NAME);
        const collection = db.collection('users');
        console.log('Coolection User:', collection)

async function authenticateUser(credentials) {
    try {
        await client.connect();
        const db = client.db(process.env.DATABASE_NAME);
        const collection = db.collection('users');
        console.log('Coolection User:', collection)
        const userDocument = collection.findOne({ "email": credentials.email, "password": credentials.password });
        const user = await userDocument;
        if (!user) {
            return {
                success: false,
                message: 'Your email Id or password is wrong!'
            }
        } else {
            const token = jwt.sign({
                email: user.email,
                role: user.role
            }, process.env.TOKEN_SECRET, {
                expiresIn: 2000
            });
            return {
                success: true,
                message: 'Your are successfully authenticated!',
                token,
                role: user.role
            }
        }
    } catch (error) {
        throw new Error(error);
    }
    finally {
        client.close();
    }
}

module.exports = {
    authenticateUser
}