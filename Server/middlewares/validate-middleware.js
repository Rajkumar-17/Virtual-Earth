const validate = (schema) => async (req, res, next) => {
  try {
    const parseBody = await schema.parseAsync(req.body);
    req.body = parseBody;
    return next();
  } catch (err) {
    const status = 422;
    const message = "Fill the input properly";
    const extraDetails = err.errors ? err.errors[0].message : [];

    const errorObject = {
      status,
      message,
      extraDetails,
    };

    return next(errorObject); // Pass the error object to the next middleware
  }
};

module.exports = validate;
