const express = require("express");
const cookieParser = require("cookie-parser");
const fileUpload = require("express-fileupload");
const path = require("path");
require("dotenv").config();
const cors = require("cors");

const connection = require("./db/connection");
const protected = require("./middleware/protected");

const authRouter = require("./routes/authRoutes");
const userRouter = require("./routes/userRoutes");
const productRouter = require("./routes/productRoutes");

const app = express();

const PORT = process.env.PORT || 8080;

// DataBase connection
connection();

app.use(express.json());
app.use(express.urlencoded({ extended: true }));
app.use(cookieParser());
app.use(cors({credentials:true,origin: 'http://localhost:5173'}));
app.use(fileUpload());

app.use("/api/auth/", authRouter);
app.use("/api/user/", userRouter);
app.use("/api/product", productRouter);

app.use("/public", express.static(path.resolve(__dirname, "public")));

app.listen(PORT, () => {
  console.log(`Server Running on port:${PORT}`);
});
