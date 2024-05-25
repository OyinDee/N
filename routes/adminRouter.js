const { login, validate_token } = require("../controllers/studentControllers");

const adminRouter = require("express").Router();

adminRouter.post("/login", login)
adminRouter.post("/validate_token", validate_token)


module.exports = adminRouter;