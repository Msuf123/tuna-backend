const express=require('express')
const app=express()
const register=require('./Routes/Register')
const body=require('body-parser')
const con=require('./Connections/mysql')
const cros=require('cors')
const getFish = require('./Routes/getFish')
const passport = require('passport')
const session = require('express-session')
const { genSaltSync } = require('bcrypt')
const addCart = require('./Routes/addCart')
const LocalStrategy = require('passport-local').Strategy
const mysqlStore = require('express-mysql-session')(session);
const  sessionStore = new mysqlStore({
  connectionLimit:10,
  user:'admin',
  password:'admin@123',
  database:'fish',
  host:'localhost',
  createDatabaseTable:true
});
app.use(session({
  secret:'kk',
  saveUninitialized:true,
  resave:true,
  store:sessionStore
}))
app.use(cros(
  {
    methods:['POST','GET'],
    origin:'http://localhost:3000',
    credentials:true
  }
))
app.use(passport.initialize())
passport.use(new LocalStrategy({usernameField:'userName'},function(userName,password,done){
       console.log(userName,password,'ook')
       con.query('SELECT * FROM userData WHERE email=? OR userName=?;',[userName,userName],(err,data)=>{
        if(err){
          done(err)
        }
        if(!data){
         done(null,false)
        }
        if(data){
          console.log(data)
          done(null,data)
        }
       })
}))
passport.serializeUser((userObj,done)=>{
  console.log(userObj[0])
  done(null,userObj[0].userName)
})
passport.deserializeUser((use,done)=>{
  console.log(use,'Desarilzing')
done(null,use)
})
app.use(passport.session())
app.use(body.json())
app.use('/cart',addCart)
app.use('/register',register)
app.use('/fishData',getFish)
app.post('/login',passport.authenticate('local'),(req,res,next)=>{
  res.send({auth:true})
})
app.get('/img/:name',(req,res,next)=>{
    res.sendFile(`/home/king/Desktop/tuna/Images/${req.params.name}`)
})

app.listen(3003,()=>{
    console.log('Server up and running')
    // con.query('SELECT fish_details.fish_name,fish_details.fish_price,fish_images.image FROM fish_details INNER JOIN fish_images ON fish_details.fish_name=fish_images.name;',(err,data)=>{
    //   console.log(data)
    // })
})