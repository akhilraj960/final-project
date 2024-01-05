const User = require("../models/User");

const allUser = (req, res) => {
  const users = User.find();

  res.json({ data: users });
};

module.exports = { allUser };
