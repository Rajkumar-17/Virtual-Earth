const {z} = require("zod");

const loginSchema = z.object({
    email: z
    .string({ required_error: "Email is required"})
    .trim()
    .email({ message: "Invalid email address "})
    .min(3, {message: "Email must be atleast of 3 chars."})
    .max(255, {message: "Email must not be more than 255 charatecs"}),

    password: z
    .string({ required_error: "Password is required"})
    .trim()
    .min(7, {message: "Password must be atleast of 6 characters."})
    .max(1024, {message: "Password must not be more than 1024 charatecs"}),
});

const signupSchema = loginSchema.extend({
    username: z
    .string({ required_error: "username is required"})
    .trim()
    .min(3, {message: "Username must be atleast of 3 chars."})
    .max(255, {message: "Username must not be more than 255 charatecs"}),

    phone: z
    .string({ required_error: "Phone is required"})
    .trim()
    .min(10, {message: "Phone must be atleast of 10 charaters."})
    .max(20, {message: "Phone must not be more than 12 charatecs"}),

});



module.exports = {signupSchema, loginSchema};