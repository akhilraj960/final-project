const { allUser } = require("../controllers/adminController");

const router = require("express").Router();

router.get('/allusers',allUser)

module.exports = router;
