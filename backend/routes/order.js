const Router = require("express").Router;
const Order = require("../models/order");
const Product = require("../models/book");
const User = require("../models/user");
const Cart = require("../models/cart");
const TravelSalesman = require ("../helpers/TravelSalesMan");
const checkAuth = require("../middleware/check-auth");
var GoogleMapsAPI = require('googlemaps');
var geocoding = new require('reverse-geocoding');


const router = Router({
    mergeParams: true
  });



  router.post('/makeorder', checkAuth,async (req, res, next) => {
  try{
    const userId = req.userData.userId;
    const orderedBy = await User.findById(userId);
    const cart = await Cart.findOne({user : userId});

      var publicConfig = {
        key: 'AIzaSyC4U_krAQ-l6tRS2UbZt24Aj2Vu93BiO6g',
        stagger_time:       1000, // for elevationPath
        encode_polylines:   false,
        secure:             true, // use https
      };
      var gmAPI = new GoogleMapsAPI(publicConfig);
      gmAPI.geocode({
        address: req.body.address
      }, async function(err, response) {
        if (!err) {
         // res.send(response.results[0].geometry.location.lng);
         location = {
            type : 'Point',
            coordinates: [response.results[0].geometry.location.lat 
            , response.results[0].geometry.location.lng],
            formattedAddress : response.results[0].formatted_address
          }  
          const order = new Order ({
              _cart: cart,
              _orderedBy: orderedBy,
              Day : req.body.Day,
              address : req.body.address,
              location : location
            })
          await order.save();
          return res.status(200).json({
          "data": order,
          success: true,
          })  
        }
      });
    }
     catch (err){
      res.status(400).send(
        {
          "message" : err.message
        }
      )
    }
})



router.post('/getOrdersByDay', async (req, res, next) => {
  try{
    let group = {
      $group: {
        _id: 0,
        _orderedBy: {"$push": {
          userid: "$_orderedBy",
          cart: "$_cart"
        }},
      },
    };
    let result = await Order.aggregate([{$match:{Day: req.body.Day}},group]);
    let arr = result[0]._orderedBy;
    let finalArr = [];
   
    for(let customer of arr) {
      let q1 = await Cart.find({ user: customer.userid })
        .select("-__v -_id")
        .populate({
          path: "user",
          select: "name -_id"
        })
        .populate({
          path: "products",
          select: "-__v -_id -owner",
        });
        // to fetch the address
        let q2 = await Order.findOne({ _orderedBy: customer.userid }).lean();
        let addr = {address : q2.address}
      let obj = JSON.parse(JSON.stringify(q1[0]));
      let finalRes = {...obj,...addr};
      finalRes.name = finalRes.user.name;
      delete finalRes.user;
      finalArr.push(finalRes)
    }
   
    res.status(200).send(finalArr);
  }catch(err){
    res.status(400).send({ message : "No deliveries for today, time to rest!"})
  }
  })
   
   
  router.get('/getStoreLocation', checkAuth, async (req, res, next) => {
    try {
      res.send([{ lat: 34.7615155, lng: 10.6630579 }]);
    } catch (error) {
      res.status(400).send(error);
    }
  })

  router.post('/getminimalpath', checkAuth, async (req, res, next) => {
    try{
      //console.log(req.body);
      var shuffledeliveriesPositions = [];
      var minDeliveries = [] ;
      const orders = await Order.find({Day: req.body.Day}).select("location.coordinates -_id").lean();
      let points = [];
     
     for (let order in orders){
       points.push(orders[order].location.coordinates);
    }
  
    shuffledeliveriesPositions = TravelSalesman.shuffledeliveriesPositions(points);
    minDeliveries = TravelSalesman.minDeliveriesArr(points, shuffledeliveriesPositions);
  
    const minDeliveriesFinal = [];
  
    for (const delivery of minDeliveries) {
      for(const location of delivery ){
        console.log(location);
        var config = {
          "key" : "AIzaSyC4U_krAQ-l6tRS2UbZt24Aj2Vu93BiO6g",
          "latitude" : location[0],
          "longitude" : location[1]
        };
        geocoding(config, async (err, data) => {
          //console.log(data.results[0].formatted_address);
        });
        minDeliveriesFinal.push({
          location: { lat: location[0],
           lng: location[1],
          formatted_address: location
          }
         });
      }
    }
    res.status(200).send(minDeliveriesFinal);
    }
    catch (err)
    {
      res.status(400).send({ message : err.message})
    }
    
  })

module.exports = router;