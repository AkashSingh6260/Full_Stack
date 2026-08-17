const express = require("express");
const cookieParser = require("cookie-parser")

const app = express();
app.use(express.json());
app.use(cookieParser())

/**
 * requie all the routers here and use them in the app
 */
const authRouter = require("./routers/auth.route.js");

/**
 * use the routers here in the app
 */
app.use("/api/auth", authRouter);

app.get('/get-me')

module.exports = app;
