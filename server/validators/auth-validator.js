const z = require("zod");

const loginschema = z.object();

//Creating an Object Schema
const signupschema = z.object({
  username: z
    .string({ required_error: "Name is required" })
    .trim()
    .min(3, { message: "Name must be atleast of 3 chars" })
    .max(255, { message: "Name must be more than 255 chars" }),

  email: z
    .string({ required_error: "Email is required" })
    .trim()
    .email({ message: "Invalid Email Address" })
    .min(3, { message: "Email must be atleast of 3 chars" })
    .max(255, { message: "Email must not be more than 255 chars" }),

  phone: z
    .string({ required_error: "Phone is required" })
    .trim()
    .min(10, { message: "Phone must be atleast of 10 chars" })
    .max(20, { message: "Phone must not be more than 20 chars" }),

  password: z
    .string({ required_error: "Password is required" })
    .min(8, { message: "Password must be atleast of 8 chars" })
    .max(1024, { message: "Password must not be more than 255 chars" }),
});

module.exports = signupschema;
