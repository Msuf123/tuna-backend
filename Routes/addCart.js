const router=require('express')
const con = require('../Connections/mysql')
const addCart=router.Router()
addCart.get('/',(req,res,next)=>{
    con.query('SELECT userCart.fish_name,fish_details.fish_price,fish_images.image FROM userCart INNER JOIN fish_details ON userCart.fish_name=fish_details.fish_name INNER JOIN fish_images ON userCart.fish_name=fish_images.name;',(err,data)=>{
        if(err){
            res.send([])
        }
        else{
            res.send(data)
        }
    })
})
