const { createQuiz, login, validate_token, deleteMaterial, sendNotif} = require("../controllers/adminControllers");

const adminRouter = require("express").Router();
//  @swagger
// /sample:
//   get:
//      summary: Returns a sample message
//          responses:
//         200:
//        description: A successful response
adminRouter.post("/login", login)
adminRouter.post("/validate_token", validate_token)
adminRouter.post("/delete", deleteMaterial)
adminRouter.post('/sendnotif', sendNotif)
adminRouter.post("/createquiz", createQuiz);




module.exports = adminRouter;