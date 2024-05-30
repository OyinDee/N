const { login, validate_token, deleteMaterial, sendNotif} = require("../controllers/adminControllers");

const adminRouter = require("express").Router();

adminRouter.post("/login", login)
adminRouter.post("/validate_token", validate_token)
adminRouter.post("/delete", deleteMaterial)
adminRouter.post('/notification/send', sendNotif)




module.exports = adminRouter;