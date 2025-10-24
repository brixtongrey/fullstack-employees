import router from "#api/employees";
import express from "express";
const app = express();

// middleware to parse request
app.use(express.json());

// TODO: route /employees to employee router
app.use("/employee", router);

// error middleware
app.use((err, req, res, next) => {
    console.error(err);
    res.status(500).send("Sorry! Something went wrong :(");
});

export default app;