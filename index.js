const express = require ('express');
const app = express();
const toDoRoute = require('./routes/routeTodo');
const UserRoute = require('./routes/routeUser');
const adminRoute = require('./routes/routeAdmin');
const authMiddleWare = require('./middleWares/authentication');


const mongoose = require('mongoose');
mongoose.connect('mongodb://localhost:27017/?readPreference=primary&appname=MongoDB%20Compass&ssl=false')


app.use(express.json());      
app.use('/admin' ,adminRoute);
   
app.use('/users' ,UserRoute);
app.use(authMiddleWare);        
app.use('/todos' ,toDoRoute);


app.use('*',(req,res,next) => { res.status(404).end() })
app.use((err,req,res,next) => { res.status(500).json({ err }) })

const {PORT = 3000 } = process.env;
app.listen(PORT,() => {console.log(`server ${PORT} is Up`)});
