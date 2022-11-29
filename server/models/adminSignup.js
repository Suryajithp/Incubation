const mongoose = require('mongoose')

const adminSignupTemplate = new mongoose.Schema({
    username:{
        type:String,
        reuired:true
    },
    email:{
        type:String,
        required:true
    },
    password:{
        type:String,
        required:true
    },
    date:{
        type:Date,
        default:Date.now
    }
    
})

module.exports = mongoose.model('admin',adminSignupTemplate)