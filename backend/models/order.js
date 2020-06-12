const mongoose = require("mongoose");
var GoogleMapsAPI = require('googlemaps');

const orderSchema = new mongoose.Schema({
  _cart: {
    type: mongoose.Schema.Types.ObjectId,
    ref: "Cart"
  },
  _orderedBy: {
    type: mongoose.Schema.Types.ObjectId,
    ref: "User"
  },
  Day: {
  type: String,   // format : MM/DD/YYYY
  required: true
  },
  location :{
    type: {
      type: String,
      enum: ["Point"]
        },
    coordinates: {
      type: [Number],
      index: '2dsphere'
    },
  formattedAddress: String
  },
    address:{
      type: String,
      required: [true,'Please add an address']
    }
});

//Format the location of the order using geocoder
 orderSchema.pre('save',async function(next) {
  

  
});

module.exports = mongoose.model('Order', orderSchema);
