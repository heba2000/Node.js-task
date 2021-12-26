const express = require ('express');
const router = express.Router();
const {middleWare} = require ('../middleWares/validateMiddleWare');
const {patchMiddleWare} = require('../middleWares/tokenMiddleWare');

const ToDo = require('../models/toDoModel')

router.get('/',async (req, res, next) => {
    var userId = req.user._id
    const document = await ToDo.find({user:userId}).populate( {path: 'user', select: 'userName -_id'})
    res.json(document);    
});

router.get('/:id',async (req, res, next) => {
    const { id } = req.params;
    var userId = req.user._id
    const userTodo = ToDo.findOne({user:userId , _id:id })
    .then (data => res.json(data)) 
    .catch(err => next("Id not found"))
});

router.post('/',async(req, res, next) => {
    const todo = req.body;
    try{ 
        const document = await ToDo.create(todo)
        res.json(document);
    }
    catch(error){
        next(error.message);
    } 
});
router.delete('/:id' , async (req,res,next) => {
    const { id } = req.params;
    var userId = req.user._id;
    let todoDoc = ToDo.findOne({_id:id})
    .then(data => { if(data.user.equals(userId)) { 
            const deleted = ToDo.deleteOne({_id:id})
            res.json("deleted successfully") 
        } 
    })
    .catch(err => next("Id not found") )  
  
})

router.patch('/:id' , async (req,res,next) => {
    const { id } = req.params;
    var userId = req.user._id
    const { title , status,tags  } = req.body;
    const todoDoc = ToDo.findById(id)
    .then(data => { if(data.user.equals(userId)) {  
        const updateDoc = ToDo.findByIdAndUpdate(id ,{title , status , tags}).exec()
        .then(newData => res.json(newData) )    
        } 
    })
    .catch(err => next("Id not found") )  
   

})

module.exports = router;
