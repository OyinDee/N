const { addSuper, addAdmin, addStudent, login, setupCourse } = require("../controllers/superControllers");

const superRouter = require("express").Router();
superRouter.post("/addadmin", addAdmin);
superRouter.post("/addsuper", addSuper);
superRouter.post("/addstudent", addStudent);
superRouter.post("/login", login);
superRouter.post("/setup", setupCourse);


module.exports = superRouter;