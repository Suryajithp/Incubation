const express = require('express')
const router = express.Router()
const signUpTemplateCopy = require('../models/signUpModels')
const formTemplateCopy = require('../models/applicationForm')
const multer = require('multer');
const jwt = require('jsonwebtoken')


/////    REGISTER   -------->>>>>>>>>>>>>

router.post('/register', (req, res) => {

    const signedUpUser = new signUpTemplateCopy({
        username: req.body.name,
        email: req.body.email,
        password: req.body.password
    })
    signedUpUser.save()
        .then((data) => {
            res.json(data)
        })
        .catch(error => {
            res.json(error)
        })
})


//////   LOGIN  ---------->>>>>>>>>>>>

router.post('/login', async (req, res) => {
    let Email = req.body.email;
    let password = req.body.password;
    let error = "INVALID USER"
    let user = await signUpTemplateCopy.findOne({ email: Email }) 
    if (user) {
        if (user.password == password) {
            const payload = {
                id:user._id,
                name:user.username
            }

            const token = jwt.sign(payload,'secret',{expiresIn:'3d'})

            res.json({ msg: "login",token })
        } else {
            res.json({ msg: "fail" })
        }
    } else {
        res.json({ error })
    }
})


/// multer --->>>>> 

const fileStorageEngine = multer.diskStorage({
    destination: (req, file, cb) => {
        cb(null, "../client/public/image")
    },
    filename: (req, file, cb) => {
        cb(null,file.originalname)
    }
})

const upload = multer({ storage: fileStorageEngine })

/////    HOME ------  >>>>>>>>

router.post('/home/:id', upload.single("img"), async (req, res) => {
    req.body.file = req.file.originalname;
    let applicationSubmit = new formTemplateCopy({
        name: req.body.name,
        email: req.body.email,
        city: req.body.city,
        user: req.params.id,
        companyname: req.body.companyname,
        address: req.body.address,
        state: req.body.state,
        phone: req.body.phone,
        company: req.body.company,
        solution: req.body.solution,
        advantage: req.body.advantage,
        potential: req.body.potential,
        proposal: req.body.proposal,
        team: req.body.team,
        problem: req.body.problem,
        proposition: req.body.proposition,
        revenue: req.body.revenue,
        services: req.body.services,
        image: req.body.file
    })
    applicationSubmit.save()
        .then((data) => {
            res.json(data)
        })
        .catch(error => {
            res.json(error)
        })
})

////// STATUS -------->>>>>>>>>>>

router.get('/applist/:id', async (req, res) => {
try {
    userId=req.params.id
    let applist = await formTemplateCopy.find({ user: userId })
    if (applist) {
        res.json(applist)
    } else {
        res.json({ msg: "empty" })
    }
} catch (error) {
    console.log(error);
}
   
})
module.exports = router