

const validateMiddleWare = (req, res, next) => {
 const {title} = req.body;
 if(!title){
     next('Error , title not found');
 }
 next();
}

module.exports = { validateMiddleWare };