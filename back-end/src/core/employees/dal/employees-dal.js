require('dotenv').config();
const { MongoClient } = require('mongodb');
const client = new MongoClient(process.env.CONNECTION_STRING);

async function getAllEmployees() {
    try {
        await client.connect();
        const db = client.db(process.env.DATABASE_NAME);
        const collection = db.collection('employees');
        const employees = collection.find().toArray();
        return await employees;
    } catch (error) {
        throw new Error(error);
    }
    finally {
        client.close();
    }
}
async function getEmployeeDetails(employeeId) {
    try {
        await client.connect();
        const db = client.db(process.env.DATABASE_NAME);
        const collection = db.collection('employees');
        const employee = collection.findOne({ employeeId })
        return await employee;
    } catch (error) {
        throw new Error(error);
    }
    finally {
        client.close();
    }
}

module.exports = {
    getAllEmployees,
    getEmployeeDetails
}