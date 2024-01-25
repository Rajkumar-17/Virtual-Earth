const {z} = require("zod");

const contactSchema = z.object({
    username: z.string({ required_error: "Username Required"})
    .trim()
    .min(3, {message: "username must be atleast 3 character"})
    .max(255, {message: "username cannot be more than 255 characters"}),

    email: z
    .string({ required_error: "Email is required"})
    .trim()
    .email({ message: "Invalid email address "})
    .min(3, {message: "Email must be atleast of 3 chars."})
    .max(255, {message: "Email must not be more than 255 charatecs"}),

    message: z
    .string({ required_error: "Please fill the Message"})
    .trim()
    .min(2, {message: "Message should atleast contain a Hi!"})
    .max(5120, {message: "Message cannot be too long 250 words"}),
})

module.exports = {contactSchema};