const userModel = require("../models/user.model");

const toTitleCase = (str) => {
  return str.replace(/\w\S*/g, (txt) => {
    return txt.charAt(0).toUpperCase() + txt.substr(1).toLowerCase();
  });
};

const validateEmail = (mail) => {
  const emailRegex = /^\w+([\.-]?\w+)*@\w+([\.-]?\w+)*(\.\w{2,3})+$/;
  return emailRegex.test(mail);
};

const emailCheckInDatabase = async (email) => {
  try {
    const user = await userModel.findOne({ email });
    return !!user;
  } catch (error) {
    console.error(error);
    return false;
  }
};

const phoneNumberCheckInDatabase = async (phoneNumber) => {
  try {
    const user = await userModel.findOne({ phoneNumber });
    return !!user;
  } catch (error) {
    console.error(error);
    return false;
  }
};

module.exports = {
  toTitleCase,
  validateEmail,
  emailCheckInDatabase,
  phoneNumberCheckInDatabase,
};