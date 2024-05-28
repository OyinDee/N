const { feedback } = require("../controllers/feedbackControllers");

const feedbackRouter = require("express").Router();

feedbackRouter.post("/", feedback)


module.exports = feedbackRouter;