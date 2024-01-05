const router = require("express").Router();
const protected = require("../middleware/protected");

const {
  register,
  logout,
  login,
  getStatus,
  profile,
} = require("../controllers/authController");

router.post("/register", register);
router.post("/login", login);
router.get("/logout", logout);
router.get("/getstatus", getStatus);
router.get("/profile", protected, profile);

module.exports = router;
