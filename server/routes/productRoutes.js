const { addProduct, allproduct } = require("../controllers/productController");

const router = require("express").Router();

router.post("/addproduct", addProduct);
router.get("/allproduct", allproduct);

module.exports = router;
