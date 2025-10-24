import express from "express";
const router = express.Router();

import {
  getEmployees,
  getEmployee,
  createEmployee,
  updateEmployee,
  deleteEmployee,
} from "#db/queries/employees";

// GET /employees --> return all movies
router.get("/", async (req, res, next) => {
  try {
    const employees = await getEmployees();
    res.status(200).json(employees);
  } catch (error) {
    console.error("Error fetching employees", error)
    next(error);
  }
});

// GET /employees/:id --> return specific employee
router.get("/:id", async (req, res, next) => {
  try {
    const id = Number(req.params.id);
    if (!Number.isInteger(id) || id <= 0) {
        return res.status(400).json({error: "Invalid employee ID"});
    }

    const employee = await getEmployee(id);
    if (!employee) {
        return res.status(404).json({error: "Employee not found"});
    }
    res.status(200).json(employee);

  } catch (error) {
    console.error("Error finding employee", error);
    next(error);
  }
});

// POST /employees --> create new employee
router.post("/", async (req, res, next) => {
    try {
        if (!req.body || !Object.keys(req.body).length ===0) {
            return res.status(400).json({error: "Request body required"});
        }

        const { name, birthday, salary} = req.body;

        if (!name || !birthday || !salary) {
            return res.status(400).json({error: "Missing required fields"});
        }
        const newEmployee = await createEmployee({ name, birthday, salary});
        res.status(201).json(newEmployee);
        } 
        catch (error) {
            console.error("Could not create new employee");
            next(error);
    }
});

// PUT /employees/:id --> update an employee
router.put("/:id", async (req, res, next) => {
  try {
    if (!req.body) {
      return res.status(400).json({ error: "Request body required" });
    }
     const id = Number(req.params.id);
    if (!Number.isInteger(id) || id <= 0) {
      return res.status(400).json({ error: "Invalid employee ID" });
    }
  const { name, birthday, salary } = req.body;
    if (!name || !birthday || !salary) {
      return res.status(400).json({ error: "Missing required fields" });
    }

    const updatedEmployee = await updateEmployee({
      id,
      name,
      birthday,
      salary,
    });
    if (!updatedEmployee) {
      return res.status(404).json({ error: "Employee not found" });
    }

    res.status(200).json(updatedEmployee);
  } catch (error) {
    console.error(`Error updating employee ${req.params.id}`, error);
    next(error);
  }
});

// DELETE /employees/:id --> delete an employee
router.delete("/:id", async (req, res, next) => {
  try {
    const id = Number(req.params.id);

    if (!Number.isInteger(id) || id <= 0) {
      return res.status(400).json({ error: "Invalid employee ID" });
    }
    const deletedEmployee = await deleteEmployee(id);

      if (!deletedEmployee) {
      return res.status(404).json({ error: "Employee not found!" });
    }
    res.status(204).send();
  } catch (error) {
    console.error(`Error deleting employee ${req.params.id}`, error);
    next(error);
  }
});


export default router;
