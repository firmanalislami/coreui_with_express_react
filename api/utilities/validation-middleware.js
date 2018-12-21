const validationMiddleware = (validate) => async (req, res, next) => {
  const errors = await validate(req.body);

  if (Object.keys(errors).length > 0) {
    res.status(400).send({
      status: 400,
      message: 'Data does not pass validation',
      errors,
    });
  } else {
    next();
  }
};

module.exports = validationMiddleware;
