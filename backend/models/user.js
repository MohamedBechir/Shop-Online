const mongoose = require("mongoose");
 const uniqueValidator = require("mongoose-unique-validator");

const userSchema = mongoose.Schema({
  name : {type: String , unique: false},
  email: { type: String, unique: true },
  password: { type: String },
  role: { type: String, require: true}
});

 userSchema.plugin(uniqueValidator);

module.exports = mongoose.model("User", userSchema);
