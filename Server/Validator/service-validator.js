const { z } = require("zod");


const serviceSchema = z.object({
  service: z
    .string({ required_error: "Service Required" })
    .trim()
    .min(1, { message: "Service at least contain a name" })
    .max(255, { message: "Service cannot be more than 255 characters" }),

  description: z
    .string({ required_error: "Description is required" })
    .trim()
    .min(3, { message: "Description is too short" })
    .max(2024, { message: "Description is too long" }),

  price: z
    .string({ required_error: "Price is required" })
    .trim()
    .min(1, { message: "Price not set" })
    .max(10, { message: "Price limit" }),

  provider: z
    .string({ required_error: "Provider is required" })
    .trim()
    .min(2, { message: "Provider should at least contain a name" })
    .max(512, { message: "Provider cannot be too long, maximum 250 words" }),
});

module.exports = { serviceSchema };
