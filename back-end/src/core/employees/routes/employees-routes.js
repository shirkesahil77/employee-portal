const express = require('express');
const { getAllEmployees, getEmployeeDetails } = require('../dal/employees-dal');
const employeesRoutes = express.Router();
const { tokenAuthorization } = require('../../../middleware/authorization');

// Apply token authorization middleware to all employee routes
employeesRoutes.use(tokenAuthorization);

// Route to get all employees
employeesRoutes.get('/', async (request, response) => {
    try {
        const employees = await getAllEmployees();
        response.status(200).json(employees);
    } catch (error) {
        response.status(500).json({
            success: false,
            message: error.message
        });
    }
});

// Route to get a specific employee by ID
employeesRoutes.get('/:employeeId', async (request, response) => {
    try {
        const employeeId = Number.parseInt(request.params.employeeId);
        const employee = await getEmployeeDetails(employeeId);
        if (employee) {
            response.status(200).json(employee);
        } else {
            response.status(404).json({
                success: false,
                message: 'Employee not found'
            });
        }
    } catch (error) {
        response.status(500).json({
            success: false,
            message: error.message
        });
    }
});

module.exports = employeesRoutes;
