const router=require('express')
const con=require('../Connections/mysql')
const getFish=router.Router()
getFish.get('/',(req,res,next)=>{
    con.query('SELECT fish_details.fish_name,fish_details.fish_price,fish_images.image FROM fish_details INNER JOIN fish_images ON fish_details.fish_name=fish_images.name;',(err,data)=>{
        if(err){
            console.log(err)
        }
        else{
            res.send(data)
        }
      })
})
module.exports=getFish