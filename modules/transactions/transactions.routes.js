const express = require("express");
const auth = require("../../middleware/auth");
const addIncome = require("./controllers/addIncome");
const addExpense = require("./controllers/addExpense");
const getTransactions = require("./controllers/getTransactions");
const deleteTransaction = require("./controllers/deleteTransaction");
const editTransaction = require("./controllers/editTransaction");
const transactionRoutes = express.Router();

// Routes

transactionRoutes.use(auth);
// userRoutes.get("/dashboard", dashboard);

transactionRoutes.post("/addIncome", addIncome);
transactionRoutes.post("/addExpense", addExpense);
transactionRoutes.get("/", getTransactions);
transactionRoutes.patch("/", editTransaction);
transactionRoutes.delete("/:transaction_id", deleteTransaction);
module.exports = transactionRoutes;
