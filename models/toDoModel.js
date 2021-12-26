const mongoose = require ('mongoose');
var AutoIncrement = require('mongoose-sequence')(mongoose);
const todoSchema = new mongoose.Schema({
  todoId: { type: Number ,  default: 0},
    title: {
        type: String,
        required: [true ,'Title is required'],
        minlength: [5,'Title should be at least 5 charachters'],
        maxlength: [20,`Title can't be more than 20 charachters`],
      },
      status : {
        type: String,
        default:"to-do"
      },
      tags: {
        type: String,
        required: false,
        maxlength: 10
      },
      createAt: {
          type:Date,
          default:Date.now()
      },
      updateAt: {
        type:Date,
        default:Date.now()
    },
    user: {
        type: mongoose.SchemaTypes.ObjectId,
        ref:'User'
    }
})


todoSchema.plugin(AutoIncrement, {inc_field: 'todoId'});
const ToDo = mongoose.model('ToDo',todoSchema);
module.exports = ToDo;




