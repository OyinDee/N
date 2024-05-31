const { login, register, verify, fetchNotif, validate_token } = require("../controllers/studentControllers");

const studentRouter = require("express").Router();
studentRouter.post("/register", register);
studentRouter.post("/login", login)
studentRouter.post("/validate_token", validate_token)
studentRouter.post("/verify", verify)
studentRouter.post("/fetchnotif", fetchNotif)



module.exports = studentRouter;