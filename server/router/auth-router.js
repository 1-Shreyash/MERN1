const express = require("express");
const router = express.Router();
const authcontrollers = require("../controllers/auth-controller");
const signupschema = require("../validators/auth-validator");
const validate = require("../middlewares/validate-middleware");
const { sign } = require("jsonwebtoken");
const authMiddleware = require("../middlewares/auth-middleware"); 
// router.get("/", (req, res) => {
//     res.status(200).send("Welcome to Router"); // 200 --> success
// } );

//either use this or use the above, prefer this as this method is helpful for chaining post methods directly in it.
router.route("/").get(authcontrollers.home); //logic==> controller
router.route("/register").post(validate(signupschema),authcontrollers.register) //first validate then only go there in controller
router.route("/login").post(authcontrollers.login)

router.route("/user").get(authMiddleware, authcontrollers.user);

module.exports = router;