const UserModel = require("../models/user.model");
const TokenBlackListModel = require("../models/blacklist.model");
const bcrypt = require("bcryptjs");
const jwt = require("jsonwebtoken");

async function registerUser(req, res) {
  const { name, email, password } = req.body;

  if (!name || !email || !password) {
    return res
      .status(400)
      .json({ message: "Name, email, and password are required" });
  }

  const existingUser = await UserModel.findOne({
    $or: [{ name }, { email }],
  });

  if (existingUser) {
    return res
      .status(400)
      .json({ message: "User with this name or email already exists" });
  }

  const hash = await bcrypt.hash(password, 10);

  const user = await UserModel.create({
    name,
    email,
    password: hash,
  });

  const token = jwt.sign(
    { id: user._id, name: user.name },
    process.env.JWT_SCRET,
    { expiresIn: "1d" },
  );

  res.cookie("token", token);

  res.status(201).json({
    message: "user register successfully",
    user: {
      id: user._id,
      name: user.name,
      email: user.email,
    },
    token,
  });
}

async function loginUserController(req, res) {
  const { email, password } = req.body;

  const user = await UserModel.findOne({
    email,
  });

  if (!user) {
    return res.status(400).json({
      message: "user not found",
    });
  }

  const ispasswordValid = await bcrypt.compare(password, user.password);

  if (!ispasswordValid) {
    return res.status(400).json({
      message: "user not valid",
    });
  }

  const token = jwt.sign(
    {
      id: user._id,
      name: user.name,
    },
    process.env.JWT_SCRET,
    {
      expiresIn: "1d",
    },
  );

  res.cookie("token", token);

  res.status(200).json({
    message: "login successfully",
    user: {
      id: user._id,
      name: user.name,
      email: user.email,
    },
    token,
  });
}

async function logoutController(req , res){
    const token = req.cookies.token;

    if(token){
        await TokenBlackListModel.create({
            token
        })
    }

    res.clearCookie("token")

    res.status(200).json({
        message:"user logout successfully"
    })
}

async function getMeController(req , res){
    const user = await UserModel.findById(req.user.id);

    res.status(200).json({
        message:"user detail fetched successfully",
        user: {
        id: user._id,
        name: user.name,
        email: user.email,
        }
    })
}



module.exports = { registerUser, loginUserController , logoutController , getMeController};
