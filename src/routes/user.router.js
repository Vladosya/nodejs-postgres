const Router = require('express');
const userController = require('../controller/user.controller.js');

const router = new Router();

router.post("/user", userController.createUser);

router.get("/user", userController.getUsers);

router.get("/user/:id", userController.getUserById);

router.put("/user", userController.updateUser);

router.delete("/user/:id", userController.deleteUserById);

module.exports = router;