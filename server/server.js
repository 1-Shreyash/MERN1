require("dotenv").config();//to use .env files

const express = require("express");
const cors = require("cors");
const app = express();
const authRoute = require("./router/auth-router")
const contactRoute = require("./router/contact-router")
const serviceRoute = require("./router/service-router")
const connectDb = require("./utils/db");
const errorMiddleware = require("./middlewares/error-middleware");
//Handling CORS Policy issue
const corsOptions = {
    origin:"http://localhost:5173",
    methods:"GET, POST, PUT, DELETE, PATCH, HEAD",
    credentials: true,
}
app.use(cors(corsOptions));

app.use(express.json()); //This line of code adds Express middleware that parses incoming request bodies with JSON payloads. It's important to place this before any routes that need to handle JSON data in it the request body. This middleware is responsible for parsing JSON data from requests, and it should be applied at the beginning of you middleware stack to ensure it's available for all subsequent route handlers.

//MOUNT The Router : To user the router in your main Express app, you can "Mount" it at a specific URL prefix

app.use("/api/auth", authRoute);
app.use("/api/form", contactRoute);
app.use("/api/data", serviceRoute);

app.use(errorMiddleware); 

const PORT = 5001;

connectDb().then(()=>{ //if connection is successful then only add port
    app.listen(PORT, ()=>{
        console.log(`Server is running at port  : ${PORT}`); // the port to run
    })
})