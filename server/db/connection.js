const mongoose = require("mongoose");

const connection = () => {
  mongoose
    .connect(process.env.MONGO_URI)
    .then(() => {
      console.log("DB connected");
    })
    .catch((err) => {
      console.log("DB Connection Error:", err);
    });
};

module.exports = connection;
