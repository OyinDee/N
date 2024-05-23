const { login, register, logout, validate_token } = require("../controllers/studentControllers");

const studentRouter = require("express").Router();
studentRouter.post("/register", register);
studentRouter.post("/login", login)


module.exports = studentRouter;