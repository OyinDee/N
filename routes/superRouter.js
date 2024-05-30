const { addSuper, addAdmin, addStudent, login, setupCourse, removeUser, addToCourse, getAllUsers, userInfo} = require("../controllers/superControllers");

const superRouter = require("express").Router();
superRouter.post("/addadmin", addAdmin);
superRouter.post("/addsuper", addSuper);
superRouter.post("/addstudent", addStudent);
superRouter.post("/login", login);
superRouter.post("/setup", setupCourse);
superRouter.post("/edit", addToCourse)
superRouter.get("/info", getAllUsers)
superRouter.get("/info/:ID", userInfo)
superRouter.get("/delete/:ID", removeUser)




module.exports = superRouter;