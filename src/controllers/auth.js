const { users } = require("../../models");

const Joi = require("joi");

const bcrypt = require("bcrypt");

exports.register = async (req, res) => {
  const data = req.body;
  const schema = Joi.object({
    fullname: Joi.string().min(5).required(),
    email: Joi.string().min(6).email().required(),
    password: Joi.string().min(6).required(),
    status: Joi.string().required(),
  });

  const { error } = schema.validate(data);

  if (error) {
    return res.status(400).send({
      status: "error",
      message: error.details[0].message,
    });
  }

  try {
    const salt = await bcrypt.genSalt(10);
    const hashedPassword = await bcrypt.hash(req.body.password, salt);

    const newUser = await users.create({
      fullname: req.body.fullname,
      email: req.body.email,
      password: hashedPassword,
      status: req.body.status,
    });

    res.send({
      status: "success",
      data: {
        fullname: newUser.fullname,
        email: newUser.email,
      },
    });
  } catch (error) {
    console.log(error);
    res.send({
      status: "failed",
      message: "server error",
    });
  }
};

exports.login = async (req, res) => {
  const data = req.body;
  const schema = Joi.object({
    email: Joi.string().min(6).email().required(),
    password: Joi.string().min(6).required(),
  });

  const { error } = schema.validate(data);

  if (error) {
    return res.status(400).send({
      error: {
        message: error.details[0].message,
      },
    });
  }

  try {
    const userExist = await users.findOne({
      where: {
        email: req.body.email,
      },
      attributes: {
        exclude: ["createdAt", "updatedAt"],
      },
    });

    const isValid = await bcrypt.compare(req.body.password, userExist.password);

    if (!isValid) {
      return res.send({
        status: "failed",
        message: "email and password doesnt match",
      });
    }

    res.status(200).send({
      status: "success",
      data: {
        fullname: userExist.fullname,
        email: userExist.email,
      },
    });
  } catch (error) {
    console.log(error);
    res.send({
      status: "failed",
      message: "server error",
    });
  }
};
