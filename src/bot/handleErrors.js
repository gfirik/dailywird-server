const { deleteTelegramUser } = require("../services/deleteUser.js");

const handleErrors = (error, userId) => {
  console.log(error);
  if (error.response && error.response.error_code === 403) {
    console.log("delete started");
    deleteTelegramUser(userId);
    console.log(`delete finished`);
  }
};

module.exports = { handleErrors };
