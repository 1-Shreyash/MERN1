const jwt = require("jsonwebtoken");
const User = require("../models/user-model");

const authMiddleware = async (req, res, next) => {
  const token = req.header("Authorization");
  if (!token) {
    //// If you attempt to use an expired token, you'll receive a "401 Unauthorized HTTP" response.
    return res.status(401).json("Unauthorised HTTP, Token not!!!");
  }
  // Assuming token is in the format "Bearer <jwtToken>, Removing the "Bearer" prefix"
  const jwtToken = token.replace("Bearer", "").trim();
  // console.log("Token from auth middleware :", jwtToken);
  try {
    const isVerified = jwt.verify(jwtToken, process.env.JWT_SECRET_KEY);
    // console.log(isVerified);
    const userData = await User.findOne({ email: isVerified.email }).select({
      password: 0,
    }); //select use -> 0(exclude), 1(include)
    // console.log(userData);

    req.user = userData;
    req.token = token;
    req.userId = userData._id;

    next();
  } catch (error) {
    return res
      .status(401)
      .json({ message: "Unauthorised. INVALID TOKEN", erorr: error });
  }
};

module.exports = authMiddleware;
