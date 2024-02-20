const express=require('express')
const app=express()
const register=require('./Routes/Register')
const body=require('body-parser')
const con=require('./Connections/mysql')
const cros=require('cors')
const getFish = require('./Routes/getFish')

app.use(cros(
  {
    methods:['POST','GET'],
    origin:'http://localhost:3000',
    credentials:true
  }
))
app.use(body.json())
app.use('/register',register)
app.use('/fishData',getFish)
app.get('/img/:name',(req,res,next)=>{
    res.sendFile(`/home/king/Desktop/tuna/Images/${req.params.name}`)
})

app.listen(3003,()=>{
    console.log('Server up and running')
    // con.query('SELECT fish_details.fish_name,fish_details.fish_price,fish_images.image FROM fish_details INNER JOIN fish_images ON fish_details.fish_name=fish_images.name;',(err,data)=>{
    //   console.log(data)
    // })
})