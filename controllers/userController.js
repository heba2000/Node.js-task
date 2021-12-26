const User = require('../models/userModel');
const bcrypt = require('bcrypt');
const { hash } = require('bcrypt');
const webtoken = require('jsonwebtoken'); 

const login = async ({userName,password}) => {
    const newUser = await User.findOne({userName}).exec();
    const validUser = bcrypt.compareSync(password, newUser.password); 
    if(!validUser){
        return "Unuathorized user" ;
    }
    else
    { 
       const token = webtoken.sign({userName, _id:newUser.id,
        maxAge:'1d'
    }, 'hf5246748sjnjdhdhhddnn')
    return token
    }
}

module.exports = {login};