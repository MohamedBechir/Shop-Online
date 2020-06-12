const mongoose = require("mongoose");


const cartSchema = new mongoose.Schema({
    user :{
        type: mongoose.Schema.Types.ObjectId,
        ref: "User"
    },
    products :[{
        type: mongoose.Schema.Types.ObjectId,
        ref: "Book"
    }],
    totalPrice :{
        type: Number,
        required: true
        },
    totalQuantity :{
        type: Number
        }
})

module.exports = mongoose.model('Cart', cartSchema);
