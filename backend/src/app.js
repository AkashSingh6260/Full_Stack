const express = require("express");
const cookieParser = require("cookie-parser")
const cors = require("cors");


const app = express();
app.use(cors({
    origin: "http://localhost:5173",
    credentials: true
}));
app.use(express.json());
app.use(cookieParser())

/**
 * requie all the routers here and use them in the app
 */
const authRouter = require("./routers/auth.route.js");
const interviewRouter = require("./routers/interview.route.js");

/**
 * use the routers here in the app
 */
app.use("/api/auth", authRouter);
app.use("/api/interview", interviewRouter);

app.get('/get-me')

module.exports = app;
