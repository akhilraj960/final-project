const Product = require("../models/Product");

const addProduct = async (req, res) => {
  try {
    const image = req.files.image;

    const {
      name,
      category,
      brand,
      subCategory,
      price,
      stock,
      discountAmount,
      taxAmount,
    } = req.body;

    // Create a new Product instance
    const newProduct = new Product({
      name,
      category,
      brand,
      subCategory,
      price,
      stock,
      discountAmount,
      taxAmount,
    });

    // Save the new product to the database
    const savedProduct = await newProduct.save();

    // Move the image to the specified directory
    const imagePath = `./public/product-images/${savedProduct._id}.jpg`;
    image.mv(imagePath, (err) => {
      if (!err) {
        // Handle the success response
        console.log("Product added successfully:", savedProduct);
        res.status(201).json({ data: savedProduct });
      } else {
        // Handle the error response for image upload failure
        console.error("Error uploading image:", err);
        res.status(500).json({ error: "Image upload failed" });
      }
    });
  } catch (error) {
    // Handle the error response for other failures
    console.error("Error adding product:", error);
    res.status(500).json({ error: "Internal Server Error" });
  }
};

const allproduct = async (req, res) => {
  try {
    // Execute the query to get all products
    const products = await Product.find();

    // Send the products as JSON response
    res.json(products);
  } catch (error) {
    // Handle any errors that occur during the database query
    console.error("Error fetching products:", error);
    res.status(500).json({ error: "Internal Server Error" });
  }
};

module.exports = { addProduct, allproduct };
