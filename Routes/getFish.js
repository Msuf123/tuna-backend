const router=require('express')
const getFish=router.Router()
const con=require('../Connections/mysql')
getFish.get('/',(req,res,next)=>{

    con.query('SELECT fish_details.fish_name,fish_details.fish_price,fish_images.image FROM fish_details INNER JOIN fish_images ON fish_details.fish_name=fish_images.name;',(err,data)=>{
        if(err){
            console.log(err)
            res.send([])
        }
        else{
            res.send(data)
        }
      })
})

getFish.get('/detail/:name',(req,res,next)=>{
    console.log('Imcomming requset')
    const name=req.params.name
    con.query(`SELECT fish_details.fish_name,fish_details.fish_desc,fish_details.fish_price,fish_images.image FROM fish_details INNER JOIN fish_images ON fish_details.fish_name=fish_images.name WHERE fish_name=?;`,[name],(err,data)=>{
        if(err){
            console.log(err)
            res.send([])
        }
        else{
            res.send(data)
        }
      })
})
module.exports=getFish