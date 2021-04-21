/**
 * refs: 
 * https://mongoosejs.com/docs/schematypes.html#numbers
 * https://stackoverflow.com/questions/52857105/how-to-post-data-to-json-file-using-postman-in-node-js
 * https://stackoverflow.com/questions/13304129/how-should-i-store-a-price-in-mongoose
 * https://stackoverflow.com/questions/13304129/how-should-i-store-a-price-in-mongoose/13305216#13305216
 * https://www.npmjs.com/package/mongoose-currency
 * https://stackoverflow.com/questions/50742268/why-mongoose-store-my-number-as-double
 */


var mongoose = require('mongoose');

//v3: all as each of single doc
var bookSchema = new mongoose.Schema({
  name: {
      type: String,
      unique: false,
      enum: ['FICTION', 'SF', 'IT']
  },
  title: {type: String},
  author: {type: String},
  price: { 
    type: Number, 
    required: true
    // get: getPrice, 
    // set: setPrice 
  }
}, { timestamps: true });

/*************************************
function getPrice(price) {
  return (price / 100).toFixed(2);
}

function setPrice(price) {
  return price * 100;
}
*************************************/

module.exports = mongoose.model('Book', bookSchema);