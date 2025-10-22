import db from "#db/client";
import { createEmployee } from "./queries/employees.js";

await db.connect();
await seedEmployees();
await db.end();
console.log("🌱 Database seeded.");

async function seedEmployees() {
  // TODO
  console.log("Seeding employees...")

  const employees = [
     { name: "Ashley Johnson", birthday: "1990-04-15", salary: 62000 },
    { name: "Brian Torres", birthday: "1985-04-20", salary: 72000 },
    { name: "Carla Nguyen", birthday: "1992-07-05", salary: 58000 },
    { name: "David Chen", birthday: "1988-09-12", salary: 80000 },
    { name: "Evan Sorgi", birthday: "1995-11-30", salary: 55000 },
    { name: "Frank White", birthday: "1982-03-02", salary: 90000 },
    { name: "Grace McCormick", birthday: "1993-05-22", salary: 62000 },
    { name: "Hector Diaz", birthday: "1991-10-10", salary: 61000 },
    { name: "Isabel Carter", birthday: "1987-08-17", salary: 77000 },
    { name: "Jack Patel", birthday: "1994-12-03", salary: 59000 },
  ];

  for (const emp of employees) {
    await createEmployee(emp);
  }
    console.log("Employees table seeded with 10 records.")
}
