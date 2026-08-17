const express = require("express");
const authController = require("../controllers/auth.controller.js");
const authmiddleware = require('../middlewares/auth.middleware.js')

const authRouter = express.Router();

authRouter.post("/register", authController.registerUser);
authRouter.post("/login", authController.loginUserController);
authRouter.get('/logout' , authController.logoutController);
authRouter.get('/get-me' , authmiddleware.authUser , authController.getMeController);

module.exports = authRouter;
