const express = require("express");
const mongoose = require("mongoose");
const dotenv = require("dotenv");
const authRoute = require("./router/auth");
const userRoute = require("./router/user");
const productRoute = require("./router/products");
const cors = require("cors");
dotenv.config();
// app must be declared on the top
app = express();
app.use(cors());
app.get("/", (req, res) => {
  res.json("welcome");
});
app.use(express.json());
app.use("/api/user", authRoute);
app.use("/api", userRoute);
app.use("/api/products", productRoute);
mongoose
  .connect(process.env.MONGO_URL)
  .then(() => {
    console.log("db connectd");
  })
  .catch((err) => {
    console.log(err, "error");
  });
const port = process.env.PORT;
app.listen(port || 3001, () => {
  console.log(`server running on port ${port}`);
});
