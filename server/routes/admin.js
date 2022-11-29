const express = require('express')
const router = express.Router()
const formTemplateCopy = require('../models/applicationForm')
const bookingTemplateCopy = require('../models/bookingSlot')
const adminSignupTemplate = require('../models/adminSignup')


///////    LOGIN  ------->>>>>>>>>

router.post('/adminsignup', async (req, res) => {
    let Email = req.body.email;
    let password = req.body.password;
    let error = "INVALID USER"
    let user = await adminSignupTemplate.findOne({ email: Email })
    console.log();
    if (user) {
        if (user.password == password) {
            res.json({ msg: "login" })
        } else {
            res.json({ msg: "setrdyfugiu" })
        }
    } else {
        res.json({ error })
    }
})

///// DECLINE LIST  ------>>>>>>>>>

router.get('/declinelist', async (req, res) => {

    let applist = await formTemplateCopy.find({ status: "decline" })
    if (applist) {
        res.json(applist)
    } else {
        res.json({ msg: "setrdyfugiu" })
    }
})

//// APPROVE LIST   --------->>>>>>

router.get('/approvelist', async (req, res) => {

    let approvelist = await formTemplateCopy.find({ status: "approve" })
    if (approvelist) {
        res.json(approvelist)
    } else {
        res.json({ msg: "setrdyfugiu" })
    }
})
/////    NEW APPLICATION   -------->>>>>>>

router.get('/newapplist', async (req, res) => {

    let applist = await formTemplateCopy.find({ status: "new" })
    if (applist) {
        res.json(applist)
    } else {
        res.json({ msg: "setrdyfugiu" })
    }
})

////   VIEW APPLICATION   ---------->>>>>>>>>>>

router.get('/application/:id', async (req, res) => {

    let itemId = req.params.id;
    console.log(itemId);
    let application = await formTemplateCopy.findById({ _id: itemId })
    if (application) {
        res.json(application)
    } else {
        res.json({ msg: "setrdyfugiu" })
    }
})

/////  APPROVE   --------->>>>>>>>

router.post('/approve/:id', async (req, res) => {

    let itemId = req.params.id;
    await formTemplateCopy.findByIdAndUpdate({ _id: itemId }, { $set: { status: 'approve' } })

    res.json(true)
})

////    DECLIEND  --------->>>>>>>>>>>

router.post('/decline/:id', async (req, res) => {

    let itemId = req.params.id;
    await formTemplateCopy.findByIdAndUpdate({ _id: itemId }, { $set: { status: 'decline' } })

    res.json(true)

})


////   RECORD LIST  -------->>>>>>>>>>

router.get('/record', async (req, res) => {

    let applist = await formTemplateCopy.find()
    if (applist) {
        res.json(applist)
    } else {
        res.json({ msg: "setrdyfugiu" })
    }
})

//////    GET SLOT  ---------->>>>>>>>>>>>>>

router.get('/slotbooking', async (req, res) => {

    let slotBooking = await bookingTemplateCopy.find()
    if (slotBooking) {
        res.json(slotBooking)
    } else {
        res.json({ msg: "slot" })
    }
})


// ///// CREATE  slot    --------->>>>>>>>>>>

router.post('/slotbooking', (req, res) => {

    const slotBooking = new bookingTemplateCopy({
        name: req.body.name,
        company: req.body.company
    })
    slotBooking.save()
        .then((data) => {
            res.json(data)
        })
        .catch(error => {
            res.json(error)
        })
})

///// boook slot   ---------->>>>>>>>>>

router.post('/booking', async (req, res) => {


    itemId = req.body.slotBooking
    divId = req.body.divid
    let application = await formTemplateCopy.findById({ _id: itemId })
    await bookingTemplateCopy.findByIdAndUpdate({ _id: divId }, { $set: { company: application.companyname ,status:'booked'} })
    await formTemplateCopy.findByIdAndUpdate({ _id: itemId }, { $set: { status: 'booked' } })
    
    res.json()

       
})
 




module.exports = router