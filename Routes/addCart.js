const router=require('express')
const con = require('../Connections/mysql')
const passport=require('passport')
const addCart=router.Router()
addCart.get('/',(req,res,next)=>{
    console.log(req.user,'oop')
    if(req.user){

    
    con.query('SELECT userCart.fish_name,fish_details.fish_price,fish_images.image FROM userCart INNER JOIN fish_details ON userCart.fish_name=fish_details.fish_name INNER JOIN fish_images ON userCart.fish_name=fish_images.name WHERE userName=?;',[req.user],(err,data)=>{
        if(err){
            res.send([])
        }
        else{
            console.log(data)
            res.send(data)
        }
    })}
    else{
        res.send({authenticated:false})
    }
})
addCart.post('/',(req,res,next)=>{
    console.log('Imcoming')
    const {fish}=req.body
    if(req.user){
      con.query('INSERT INTO userCart(userName,fish_name) VALUES(?,?)',[req.user,fish],(err,data)=>{
        if(err){
            res.send({error:true})
        }
        else{
            res.send({completed:true})
        }
      })
    }
    else{
        res.send(({authenticated:false}))
    }
})
addCart.get('/remove',(req,res,next)=>{
    
})
module.exports=addCart
