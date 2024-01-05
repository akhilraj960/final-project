const mongoose = require("mongoose");

const productSchema = new mongoose.Schema(
  {
    name: {
      type: String,
      required: true,
    },
    category: {
      type: String,
    },
    brand: {
      type: String,
    },
    subCategory: {
      type: String,
    },
    price: {
      type: Number,
      required: true,
    },
    stock: {
      type: Number,
      required: true,
    },
    discountAmount: {
      type: Number,
      default: 0,
    },
    taxAmount: {
      type: Number,
      required: true,
    },
  },
  {
    timestamps: true,
  }
);

// Corrected line: use mongoose.model to create the Product model
const Product = mongoose.model("Product", productSchema);

module.exports = Product;
