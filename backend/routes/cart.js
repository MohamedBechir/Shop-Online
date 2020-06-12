const Router = require("express").Router;
const checkAuth = require("../middleware/check-auth");
const Product = require("../models/book");
const Cart = require("../models/cart");
const User = require("../models/user");
let products = [];
let totalPrice = 0;


const router = Router({
    mergeParams: true
  });

router.get('/addToCart/:id', checkAuth, async(req, res, next) => {

      let found = false;
      let totalPrice = 0;
      const product = await Product.findById(req.params.id);
      const userId = req.userData.userId;
      const cart = await Cart.findOne({user: userId});
      //console.log(cart);

      if ( cart != undefined ){
        products = cart.products;
        totalPrice = cart.totalPrice;

        for(let addedProduct of cart.products){
          if(product.id == addedProduct){
            found = true;
          }
        }
        if(found != true){
          products.push(product);
          totalPrice = totalPrice + product.price;
          await Cart.findOneAndUpdate({user: userId}, {products: products, totalPrice: totalPrice});
        }

      }else{
        products.push(product);
        totalPrice = totalPrice + product.price;
        const cart = new Cart({
          user: userId,
          products: product,
          totalPrice: totalPrice
        });
        await cart.save();
      }
      res.status(200).send(
        {
          "Message" : "Object added to cart!"
        }
      )
       
})

router.get('/getFromCart', checkAuth, async(req, res, next) => {
  try {
    const cartProducts = [];
  const userId = req.userData.userId;
  const cart = await Cart.findOne({user: userId});
  for (let cartProduct of cart.products){
    let product = await Product.findById(cartProduct._id);
    cartProducts.push(product);
  }
  res.status(200).send(cartProducts);
  } catch (error) {
    res.send(error);
  }
})

router.delete('/deleteFromCart/:id', checkAuth, async(req, res, next) => {
     await Cart.updateOne(
      {user: req.userData.userId},
      {$pull: {products: req.params.id }})

});


module.exports = router;
