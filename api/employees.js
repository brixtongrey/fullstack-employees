import express from "express";
const router = express.Router();

import { getEmployees, getEmployee, createEmployee, updateEmployee, deleteEmployee } from "#db/queries/employees";

// GET /employees --> return all movies
router.get("/", async (req, res, next) => {
    try {
        const employees = await getEmployees();
        res.status(200).json(employees);
    } catch (error) {
        next(error);
    }
});

// GET /employees/:id --> return specific employee




// POST /employees --> create new employee




// PUT /employees/:id --> update an employee




// DELETE /employees/:id --> delete an employee










export default router;