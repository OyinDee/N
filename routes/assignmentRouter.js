const { submit } = require("../controllers/assignmentController");

const assignmentRouter = require("express").Router();

assignmentRouter.post("/", submit)


module.exports = assignmentRouter;