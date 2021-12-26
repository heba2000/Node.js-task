const express = require('express');
const router = express.Router();
const User = require('../models/userModel');
const bcrypt = require('bcrypt');
const { hash } = require('bcrypt');
const {login} = require('../controllers/userController');
const req = require('express/lib/request');
const authMiddleWare = require('../middleWares/tokenMiddleWare');

router.get('/', authMiddleWare , async(req, res, next) => {
    const thisUser = req.user;
    res.json(thisUser);    
});

router.post('/login'  , async (req, res, next) => {
    const {userName , password} = req.body;
    const token = await login({userName,password})
    res.json({"userName": userName , "userToken":token});
    console.log(req.user);  
  
})

router.patch('/' , authMiddleWare ,async (req,res,next) => {
    const userID = req.user._id;
    const { firstName , userName , lastName} = req.body;
    const updateDoc = User.findByIdAndUpdate(userID,{ userName , firstName , lastName}).exec()
    .then (data => res.json(data)) 
    .catch(err => next("Error") )
//why work one time only???
//المشكلة حصلت لانه بعد ما عملت ابديت للusername بالتابعية الtoken 
// ف كان لازم اعمل لوجن تاني عشان اجيب التوكن الجديدة و احطها ف الauthorization و اشغتغل عادي
})

module.exports = router;

