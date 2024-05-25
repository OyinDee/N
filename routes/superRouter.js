const { addSuper, addAdmin, addStudent, login } = require("../controllers/superControllers");

const superRouter = require("express").Router();
superRouter.post("/addadmin", addAdmin);
superRouter.post("/addsuper", addSuper);
superRouter.post("/addstudent", addStudent);
superRouter.post("/login", login);

module.exports = superRouter;