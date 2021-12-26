const mongoose = require('mongoose');
const bcrypt = require('bcrypt');
const { hashSync } = require('bcrypt');

const userSchema = new mongoose.Schema ({
    userName: {
        type: String,
        index: true,
        unique: [true ,'this username already taken'],
        dropDups: true,
        required: [true ,'user name is required'],
        minlength: [5,'user name should be at least 5 charachters']
      },
      firstName : {
        type: String,
        minlength: [3,'First Name should be at least 3 charachters'],
        maxlength: [15,`First Name can't be more than 15 charachters`]
      },
      lastName: {
        type: String,
        minlength: [3,'Last Name should be at least 3 charachters'],
        maxlength: [15,`LAst Name can't be more than 15 charachters`],
      },
      password: {
        type: String,
        required: [true, "password is required"],
        minlength: [5,'password too short'],
        maxlength: [15,`password can't be more than 15 charachters`],
      },
      dob: {
        type: Date,
        required: false 
      },
    },
    {
        toJSON:{
          transform: (doc, ret, options) => {
              delete ret.password;
              return ret ;
          }
        }
      }
    ) 

//password middleware
userSchema.pre('save', function() {
  console.log(this); //user document
  const hash = bcrypt.hashSync(this.password,8)
  this.password = hash;
  // return this;
});
const User = mongoose.model('User', userSchema );
module.exports = User;