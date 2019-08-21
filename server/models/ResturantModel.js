const mongoose = require('mongoose');

const resturantSchema = mongoose.Schema({
    _id: mongoose.Schema.Types.ObjectId,
    firstName: {type:String, Required:true},
    lastName:{type:String, Required:true},
    guest:{type:String, Required:true},
    checkIn:{type:String, Required:true},
});

module.exports = mongoose.model('Resturant', resturantSchema);
