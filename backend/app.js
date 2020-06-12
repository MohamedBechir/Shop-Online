const path = require("path");
const express = require('express');
const bodyParser = require("body-parser");
const mongoose = require("mongoose");

const userRoutes = require("./routes/user");
const productsRoutes = require ("./routes/books");
const ordersRoutes = require ("./routes/order");
const cartsRoutes = require ("./routes/cart");
const booksRoutes = require ("./routes/books");

const app = express();
  //password: kCsWkTrbzp7W4clS
mongoose
  .connect(
    //cyclic dependency detected remove from ?.......=true ?retryWrites=true&w=majority
    // Rulm84scvtmODf2e
    //mongodb+srv://oussema:kCsWkTrbzp7W4clS@cluster0-y6ior.mongodb.net/node-angular?retryWrites=true&w=majority
    "mongodb+srv://oussama:Rulm84scvtmODf2e@cluster0-bninb.mongodb.net/test?retryWrites=true&w=majority", { useUnifiedTopology: true, useNewUrlParser: true},)
  .then(() => {
    console.log("Connected to database!");
  })
  .catch(() => {
    console.log("Connection failed!");
  });

mongoose.set('useFindAndModify', false);
mongoose.set('useCreateIndex', true);
app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended: false }));
// app.use('/fileuploads', express.static(path.join(__dirname, '/fileuploads')));

 app.use("/images", express.static(path.join("backend/images")));

app.use((req, res, next) => {
  res.setHeader("Access-Control-Allow-Origin", "*");
  res.setHeader(
    "Access-Control-Allow-Headers",
    "Origin, X-Requested-With, Content-Type, Accept, Authorization"
  );
  res.setHeader(
    "Access-Control-Allow-Methods",
    "GET, POST, PATCH, PUT, DELETE, OPTIONS"
  );
  next();
});

// //useless just to test
// app.use((req, res, next) => {
//   console.log('First middleware');
//   next();
// });

 app.use("/api/user",userRoutes);
 app.use("/api/product",productsRoutes);
 app.use("/api/order",ordersRoutes);
 app.use("/api/cart",cartsRoutes);
 app.use("/api/books",booksRoutes);

module.exports = app;
