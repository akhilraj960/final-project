const express = require("express");
const cookieParser = require("cookie-parser");

require("dotenv").config();
const cors = require("cors");

const connection = require("./db/connection");

const authRouter = require("./routes/authRoutes");

const app = express();

const PORT = process.env.PORT || 8080;

// DataBase connection
connection();

app.use(express.json());
app.use(express.urlencoded({ extended: true }));
app.use(cookieParser());
app.use(cors());

app.use("/api/auth/", authRouter);

app.listen(PORT, () => {
  console.log(`Server Running on port:${PORT}`);
});
