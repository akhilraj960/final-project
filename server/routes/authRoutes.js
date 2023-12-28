const router = require("express").Router();

const {
  register,
  logout,
  login,
  getStatus,
} = require("../controllers/authController");

router.post("/register", register);
router.post("/login", login);
router.get("/logout", logout);
router.get("/getstatus", getStatus);

module.exports = router;
