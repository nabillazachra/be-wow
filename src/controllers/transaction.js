const { transaction, users } = require("../../models");
const Joi = require("joi");

exports.addTransaction = async (req, res) => {
  try {
    const data = req.body;

    const newTrans = await transaction.create({
      transferProof: req.file.filename,
      remainingActive: "30",
      userStatus: "Active",
      paymentStatus: "Pending",
      userId: req.users.id,
    });

    let transactionData = await transaction.findOne({
      where: {
        id: newTrans.id,
      },
      include: {
        model: users,
        as: "users",
        attributes: {
          exclude: ["email", "password", "role", "createdAt", "updatedAt"],
        },
      },
      attributes: {
        exclude: ["transId", "userId", "createdAt", "updatedAt"],
      },
    });

    res.send({
      status: "success",
      data: {
        transData: {
          ...transactionData.dataValues,
          transferProof: process.env.FILE_PATH + transactionData.transferProof,
        },
      },
    });
  } catch (error) {
    console.log(error);
    res.send({
      status: "failed",
      message: "Server error",
    });
  }
};

exports.getTransactions = async (req, res) => {
  try {
    let transactionData = await transaction.findAll({
      include: {
        model: users,
        as: "users",
        attributes: {
          exclude: ["email", "password", "role", "createdAt", "updatedAt"],
        },
      },
      attributes: {
        exclude: ["userId", "transId", "createdAt", "updatedAt"],
      },
    });

    transactionData = JSON.parse(JSON.stringify(transactionData));

    transactionData = transactionData.map((data) => {
      return {
        ...data,
        transferProof: process.env.FILE_PATH + data.transferProof,
      };
    });

    res.send({
      status: "success",
      transactionData,
    });
  } catch (error) {
    console.log(error);
    res.send({
      status: "failed",
      msg: "server error",
    });
  }
};

exports.getTransaction = async (req, res) => {
  try {
    const { id } = req.params;
    let transactionData = await transaction.findOne({
      where: {
        id,
      },
      include: {
        model: users,
        as: "users",
        attributes: {
          exclude: ["email", "password", "role", "createdAt", "updatedAt"],
        },
      },
      attributes: {
        exclude: ["transId", "createdAt", "updatedAt"],
      },
    });

    transactionData = JSON.parse(JSON.stringify(transactionData));

    transactionData = {
      ...transactionData,
      transferProof: process.env.FILE_PATH + transactionData.transferProof,
    };

    res.send({
      status: "success",
      transactionData,
    });
  } catch (error) {
    console.log(error);
    res.send({
      status: "failed",
      msg: "server error",
    });
  }
};

exports.updateTransaction = async (req, res) => {
  const { id } = req.params;
  const data = req.body;
  try {
    await transaction.update(data, { where: { id } });

    let transData = await transaction.findOne({
      where: { id },
      include: {
        model: users,
        as: "users",
        attributes: {
          exclude: ["email", "password", "role", "createdAt", "updatedAt"],
        },
      },
      attributes: {
        exclude: ["userId", "transId", "createdAt", "updatedAt"],
      },
    });

    transData = JSON.parse(JSON.stringify(transData));

    transData = {
      ...transData,
      transferProof: process.env.FILE_PATH + transData.transferProof,
    };

    res.send({
      status: "success",
      data: {
        transData,
      },
    });
  } catch (error) {
    console.log(error);
    res.send({
      status: "failed",
      msg: "server error",
    });
  }
};
