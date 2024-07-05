//Controllers responsible for handling application logic. Helps organise your app according to the MVC model(Model-View-Controller)
const User = require("../models/user-model");
const bcrypt = require("bcryptjs");

const home = async (req, res) => {
  try {
    res.status(200).send({ message: "Welcome to Router11" }); // 200 --> success
  } catch (error) {
    res.status(500).json("internal server error1");
  }
};

//Steps : of user reg.

// 1. Get Registration Data: Retrieve user data (username, email, password).
// 2. Check Email Existence: Check if the email is already registered.
// 3. Hash Password:  Securely hash the password.
// 4. Create User: Create a new user with hashed password.
// 5. Save to DB: Save user data to the database.
// 6. Respond: Respond with "Registration Successful" or handle errors.

const register = async (req, res, next) => {
  try {
    // console.log(req.body);
    const { username, email, phone, password } = req.body;
    const userExist = await User.findOne({ email }); //find email1 in all emails
    if (userExist) {
      return res.status(400).json({ msg: "Email already exists" });
    }
    //hash the pass
    // const saltRound = 10;
    // const hash_password = await bcrypt.hash(password, saltRound);

    //create new user
    const userCreated = await User.create({ username, email, phone, password });
    res.status(201).json({
      msg: "Registration Successful",
      token: await userCreated.generateToken(),
      userId: userCreated._id.toString(),
    }); // 200 --> success
  } catch (error) {
    // res.status(500).json("internal server error2");
    next(error); // will pass to the error middleware
  }
};

const login = async (req, res, next) => {
  try {
    const { email, password } = req.body;

    const userExist = await User.findOne({ email });
    // console.log(userExist)

    if (!userExist) {
      return res.status(400).json({ msg: "INVALID CREDENTIALS" });
    }

    const user = await userExist.comparePasswords(password);

    if (user) {
      // console.log("HELLO");
      res.status(200).json({
        msg: "Login Successful..!!!",
        token: await userExist.generateToken(),
        userId: userExist._id.toString(),
      }); // 200 --> success
    } else {
      res.status(401).json({ msg: "Invalid email or password" });
    }
  } catch (error) {
    // res.status(500).json("internal server error3");
    const status = 500;
    const message = "internal server error3";
    const err = {
      status,
      message,
    };
    next(err);
  }
};

// * ------------------
// User Logic - to send user data
// * ------------------
const user = async (req, res) => {
  try {
    const userData = req.user; //to use user we define auth middleware
    // console.log("USER DATA --> ", userData);
    res.status(200).json({ userData });
  } catch (error) {
    console.log(`ERROR from user route : ${error}`);
  }
};

module.exports = { home, register, login, user };
