// Khai báo thư viện
const express = require("express");
const mongoose = require("mongoose");

// khai báo các folder khác
const adminRouter = require("./routes/admin");
const authRouter = require("./routes/auth");
const productRouter = require("./routes/product");
const userRouter = require("./routes/user");
// khởi tạo
const app = express();
const DB =
  "mongodb+srv://nguy3ntanduc:nguy3ntanduc@cluster0.kwpcnfb.mongodb.net/?retryWrites=true&w=majority";

//middleware
app.use(function (req, res, next) {
  res.setHeader("x-auth-token", "*");
  res.setHeader("Access-Control-Allow-Credentials", true);
  res.setHeader("Access-Control-Allow-Origin", "*");
  res.setHeader("Access-Control-Allow-Credentials", "true");
  res.setHeader(
    "Access-Control-Allow-Methods",
    "GET,HEAD,OPTIONS,POST,PUT,DELETE,OPTIONS"
  );
  res.setHeader("Access-Control-Allow-Headers", "*");

  next();
});
app.use(express.json());
app.use(authRouter);
app.use(adminRouter);
app.use(productRouter);
app.use(userRouter);

//kết nối cơ sở dữ liệu
mongoose
  .connect(DB)
  .then(() => {
    console.log("kết nối DB thành công");
  })
  .catch((e) => {
    console.log("kết nối DB thất bại :" + e);
  });

const PORT = process.env.PORT || 3000;
app.listen(PORT, () => {
  console.log("kết nối thành công :" + PORT);
});
