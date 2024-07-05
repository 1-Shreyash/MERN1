const mongoose = require("mongoose");
const bcrypt = require("bcryptjs")
var jwt = require('jsonwebtoken');

const userSchema = new mongoose.Schema({
    username:{
        type:String,
        required : true,
    },
    email:{
        type:String,
        required : true,
    },
    phone:{
        type:String,
        required : true,
    },
    password:{
        type:String,
        required : true,
    },
    isAdmin:{
        type:String,
        default: false, 
    },
})

//hash the password 
userSchema.pre('save', async function(next){//before saving the data
    // console.log("PreMETHOD",this);
    const user = this;

    if(!user.isModified("password")){
        next(); //going to next if Password is not Modified, i.e. it is not created..!!
    }

    try {
        const saltRound = await bcrypt.genSalt(10);
        const hash_password = await bcrypt.hash(this.password, saltRound);
        user.password = hash_password
        
    } catch (error) {
        next(error);
    }
})

// - JSON Web Tokens (JWT) is an open standard (RFC 7519) that defines a compact and self-contained way for securely transmitting information between parties as a JSON object.
//? - JWTs are often used for authentication and authorization in web applications.
// 1. **Authentication:** Verifying the identity of a user or client.
// 2. **Authorization:** Determining what actions a user or client is allowed to perform.


// **Components of a JWT:**
// - Header: Contains metadata about the token, such as the type of token and the signing algorithm being used.
// - Payload: Contains claims or statements about an entity (typically, the user) and additional data. Common claims include user ID, username, and expiration time.
// - Signature: To verify that the sender of the JWT is who it says it is and to ensure that the message wasn't changed along the way, a signature is included.

//Json Web Token --> always stored as cookies or local storage
userSchema.methods.generateToken = async function () {
    try {
        return jwt.sign(
            {
                userId: this._id.toString(),
                email: this.email,
                isAdmin: this.isAdmin, 
            },
            process.env.JWT_SECRET_KEY,
            {
                expiresIn : "30d", // optional
            }
        )
    } catch (error) {
        console.error(error)
    }
} //methods create such functions accessible globally 


userSchema.methods.comparePasswords = async function(pass){
    return bcrypt.compare(pass, this.password);
}


//define the model/collection name 
const User = new mongoose.model("User", userSchema)//first attribute==> collection's name, second==> schema
module.exports = User;