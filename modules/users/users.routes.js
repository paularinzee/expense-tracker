const express = require("express");
const register = require("./controllers/register");
const login = require("./controllers/login");
const forgotPassword = require("./controllers/forgotPassword");
const resetPassword = require("./controllers/resetPassword");
const dashboard = require("./controllers/dashboard");
const auth = require("../../middleware/auth");

const userRoutes = express.Router();

// Routes
userRoutes.post("/register", register);
userRoutes.post("/login", login);
userRoutes.post("/forgotpassword", forgotPassword);
userRoutes.post("/resetpassword", resetPassword);


userRoutes.use(auth);
userRoutes.get("/dashboard", dashboard);

module.exports = userRoutes;
