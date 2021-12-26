const webtoken = require('jsonwebtoken');
const User = require('../models/userModel');

const authorize = (req , res , next) => {
        const { authorization } = req.headers;
        // console.log(authorization);
        const payload = webtoken.verify(authorization,'hf5246748sjnjdhdhhddnn')
        // console.log(payload);
       User.findOne({ userName:payload.userName })
       .then(user => {
           req.user = user ;
           console.log(user)
           next(); })
}
module.exports = authorize;


// eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJ1c2VyTmFtZSI6Im1vc3RhZmFfbSIsIl9pZCI6IjYxYzczZmUyNTU1ZGVkZGZhNzZmYmFkYSIsIm1heEFnZSI6IjFkIiwiaWF0IjoxNjQwNDQ4MDM5fQ.zirxvd5uQ7hMIeZxepbZDx5gPEQZagwJYOsVo1gwWts
//eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJ1c2VyTmFtZSI6Im1vc3RhZmFfbSIsIl9pZCI6IjYxYzczZmUyNTU1ZGVkZGZhNzZmYmFkYSIsIm1heEFnZSI6IjFkIiwiaWF0IjoxNjQwNDQ5MTYyfQ.2QRom2U8qtbTInl6oShA3QCW2ywBlvZeUOpj5EXejfo
