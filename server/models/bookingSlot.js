const mongoose = require('mongoose')

const bookingTemplate = new mongoose.Schema({
    name:{
        type:String,
        reuired:true
    },
    company:{
        type:String,
        required:true
    },
    status:{
        type:String,
        default: false
    },
    date:{
        type:Date,
        default:Date.now
    }
    
})

module.exports = mongoose.model('slot',bookingTemplate)