const bcrypt = require("bcrypt");
const jwt = require("jsonwebtoken");

const User = require("../models/User");

const register = async (req, res) => {
  try {
    const { name, email, password, cPassword } = req.body;

    const isUser = await User.findOne({ email });

    if (isUser) {
      return res.json({ success: false, message: "Already have an account" });
    }

    const salt = bcrypt.genSaltSync(10);
    const hashedPassword = await bcrypt.hashSync(password, salt);

    const user = new User({
      name: name,
      email: email,
      password: hashedPassword,
    });

    await user.save();

    const { _id, role } = user;
    const userData = { _id, name, email, role };

    const token = jwt.sign(
      { id: _id, email: email },
      process.env.JWT_SECRET,
      { expiresIn: "1h" } // Token expires in 1 hour
    );

    return res.json({
      success: true,
      message: "Registration successful",
      userData,
      token,
    });
  } catch (error) {
    console.error("Error during registration:", error);
    return res
      .status(500)
      .json({ success: false, error: "Internal server error" });
  }
};

const login = async (req, res) => {
  try {
    const { email, password } = req.body;

    const user = await User.findOne({ email });

    if (!user) {
      return res.json({ success: false, message: "Account not found" });
    }

    const passwordMatch = await bcrypt.compareSync(password, user.password);

    if (!passwordMatch) {
      return res.json({ success: false, message: "Incorrect password" });
    }

    const { _id, role } = user;
    const userData = { _id, name: user.name, email, role };

    const token = jwt.sign(
      { id: _id, email: email },
      process.env.JWT_SECRET,
      { expiresIn: "1h" } // Token expires in 1 hour
    );

    return res.json({
      success: true,
      message: "Login successful",
      userData,
      token,
    });
  } catch (error) {
    console.error("Error during login:", error);
    return res
      .status(500)
      .json({ success: false, error: "Internal server error" });
  }
};

const getStatus = async (req, res) => {
  try {
    const authHeader = req.headers.authorization;
    const matches = authHeader && authHeader.match(/Bearer\s(\S+)/);
    const token = matches ? matches[1] : null;

    if (!token) {
      return res.json({ success: false, message: "login again" });
    }

    const isTrue = jwt.verify(token, process.env.JWT_SECRET);

    if (!isTrue) {
      return res.json({ success: false, message: "login again" });
    }

    return res.json({ success: true, message: "success" });
  } catch (error) {
    console.log(error);
    return res.json({ error });
  }
};

const logout = async (req, res) => {
  return res.json({ message: "Successfully Logged Out" });
};

module.exports = {
  register,
  login,
  getStatus,
  logout,
};
