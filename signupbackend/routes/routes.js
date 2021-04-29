const { request, response } = require('express')
const express = require('express')
const router = express.Router()
const signnUpTemplateCopy=require('../models/SignUpModels')

router.post('/signup',(request,response)=>{
    const signedUpUser = new signnUpTemplateCopy({
        email:request.body.email,
        password:request.body.password
    })
    signedUpUser.save()
    .then(data=>{
        response.json(data)
    })
    .catch(error=>{
        response.json(error)
    })
})
router.get('/getdata',(request,response)=>{
    
    signnUpTemplateCopy.find()
    .then(data=>{
        response.json(data)
    })
    .catch(error=>{
        response.json(error)
    })
})


module.exports= router