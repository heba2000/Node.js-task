const express = require('express');
const router = express.Router();
const User = require('../models/userModel');
const bcrypt = require('bcrypt');
const { hash } = require('bcrypt');
const req = require('express/lib/request');
const ToDo = require('../models/toDoModel');

router.get('/',async (req, res, next) => {
    const todos = await ToDo.find().populate( {path: 'user', select: 'userName -_id'});
    res.json(todos); 
});

router.post('/user', async(req, res, next) => {
    const newUser = req.body;
    try{ 
        const userDoc = await User.create(newUser)
        res.json(userDoc);
    }
    catch(error)
     {
        next(error.message);
    } 
});

router.patch('/:id' , async (req,res,next) => {
    const { id } = req.params;
    const { title ,status , tags } = req.body;
    const updateDoc = ToDo.findByIdAndUpdate(id,{ title:title , status:status , tags:tags}).exec()
    .then (data => res.json(`Todo was edited successfully”`)) 
    .catch(err => next("Id not found") )

})

router.delete('/:id' , async (req,res,next) => {
    const { id } = req.params;
    const deleteDoc = ToDo.deleteOne({_id:id}).exec()
    .then (data => res.json(data)) 
    .catch(err => next("Id not found") )

})

module.exports = router;