const { User, Address } = require("../models");
const jwt = require("jsonwebtoken");
const { registerValidation } = require("../validations/register.validation");

const authenticate = async (req, res) => {
  const {
    isLogin,
    phone_number,
    fullname,
    city,
    district,
    sub_district,
    street,
  } = req.body;
  if (isLogin) {
    const user = await login(phone_number);
    res
      .status(200)
      .send({ success: true, message: "Login successfully!!!!", user });
  } else {
    const result = registerValidation(
      phone_number,
      fullname,
      city,
      district,
      sub_district,
      street
    );
    if(!result.success) {
      res.status(500).send(result);
      return;
    }
    const newUser = await register(
      phone_number,
      fullname,
      city,
      district,
      sub_district,
      street
    );

    if (newUser) {
      res
        .status(200)
        .send({ success: true, message: "Register successfully!!!!", newUser });
    } else {
      res
        .status(500)
        .send({ success: false, message: "Register fail!!!!", newUser });
    }
  }
};

const login = async (phone_number) => {
  try {
    let user = await User.findOne({
      where: { phone_number },
      include: [
        {
          model: Address,
        },
      ],
    });

    const token = await jwt.sign(
      {
        phone_number,
        user_id: user.id,
      },
      process.env.PRIVATE_KEY,
      { expiresIn: 60 * 60 }
    );
    const userTmp = { ...user.dataValues, token };
    return userTmp;
  } catch (error) {
    console.log(error);
  }
};

const register = async (
  phone_number,
  fullname,
  city,
  district,
  sub_district,
  street
) => {
  try {
    let newUser = await User.create({
      phone_number: phone_number,
      fullname: fullname,
    });
    if (newUser) {
      const newAddress = await Address.create({
        user_id: newUser.dataValues.id,
        city,
        district,
        sub_district,
        street,
        isDefault: true,
      });
      const token = await jwt.sign(
        {
          phone_number,
          user_id: newUser.dataValues.id,
        },
        process.env.PRIVATE_KEY,
        { expiresIn: 60 * 60 }
      );

      newUser = { ...newUser.dataValues, Addresses: newAddress, token };
      return newUser;
    }
    return null;
  } catch (error) {
    console.log(error);
  }
};

const test = async (req, res) => {
  const { fullname, phone_number } = req.body;
  const user = await User.create({
    phone_number,
    fullname,
  });
  res.send(user);
};
module.exports = {
  authenticate,
  test,
};
