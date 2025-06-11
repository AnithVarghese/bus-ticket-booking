const mongoose = require('mongoose');

const userSchema = new mongoose.Schema({
    name: {type:String,required:true},
    email: { type: String, unique: true },
    phone : { type: Number },
    password: {type:String},
    dateofbirth : {type:Date}
});

module.exports = mongoose.model('User', userSchema);
