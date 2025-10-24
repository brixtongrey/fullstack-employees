import db from "#db/client";

/** @returns the employee created according to the provided details */
export async function createEmployee({ name, birthday, salary }) {
 try {
  const sql = `
  INSERT INTO employees (name, birthday, salary)
  VALUES ($1, $2, $3)
  RETURNING *;
  `;
  const values = [name, birthday, salary];
  const { rows } = await db.query(sql, values);
  console.log("New employee added");
  return rows[0];
 } catch(error) {
  console.error("Error creating employee", error)
  throw error;
 }
}

// === Part 2 ===

/** @returns all employees */
export async function getEmployees() {
  try {
    const sql = `
    SELECT * FROM employees
    `
    const { rows } = await db.query(sql);
    return rows;
  } catch (error) {
    console.error("Error fetching employees", error);
    throw error;
  }
}

/**
 * @returns the employee with the given id
 * @returns undefined if employee with the given id does not exist
 */
export async function getEmployee(id) {
  try {
    const sql = `
    SELECT * FROM employees
    WHERE id = $1
    `
    const { rows } = await db.query(sql, [id]);
    return rows[0];
  } catch (error) {
    console.error(`Error fetching employee id ${id}`, error);
    throw error;
  }
}

/**
 * @returns the updated employee with the given id
 * @returns undefined if employee with the given id does not exist
 */
export async function updateEmployee({ id, name, birthday, salary }) {
  try {
    const sql = `
    UPDATE employees
    SET name = $2,
    birthday = $3,
    salary = $4
    WHERE id = $1
    RETURNING *;
    `
    const values = [id, name, birthday, salary];
    const {rows} = await db.query(sql, values);
    return rows[0];
  } catch (error) {
    console.error("Error updating employee", error);
    throw error;
  }
}

/**
 * @returns the deleted employee with the given id
 * @returns undefined if employee with the given id does not exist
 */
export async function deleteEmployee(id) {
  try {
    const sql = `
    DELETE FROM employees
    WHERE id = $1
    RETURNING *;
    `
    const { rows } = await db.query(sql, [id]);
    return rows[0];
  } catch (error) {
    console.error("ERror deleting employee with id", id, error);
    throw error;
  }
}
