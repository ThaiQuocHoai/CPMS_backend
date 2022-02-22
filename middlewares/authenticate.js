const { Op } = require("sequelize");
const { User } = require("../models");

const checkLoginType = async (req, res, next) => {
  const { phone_number, isSuccess } = req.body;
  if (!isSuccess) {
    res
      .status(500)
      .send({ success: false, message: "Your number phone is not verified" });
    return;
  }
  try {
    const userIsExisted = await User.findOne({
      where: {
        phone_number
      },
    });
    if (!userIsExisted) {
      req.body.isLogin = false;
      next();
      return;
    }
    req.body.isLogin = true;
    next();
  } catch (error) {
    res.status(500).send({success: false, message: error})
  }
};

module.exports = {
  checkLoginType,
};
