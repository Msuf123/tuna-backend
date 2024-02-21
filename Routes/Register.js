const router=require('express')
const email=require('../CustomFunction/email')
const passwordFunction = require('../CustomFunction/encrypt')
const tokenFunction=require('../CustomFunction/tokens')
const con = require('../Connections/mysql')
const register=router.Router()
register.post('/',async (req,res,next)=>{
    console.log(req.body)
    const{userName,password,emailId}=req.body
    const hashPass=await passwordFunction.encrypt(password)
    const token=tokenFunction.createToken({userName,hashPass,emailId})
    email(emailId,token)
    
})
register.get('/',(req,res,next)=>{
    console.log(req.query)
    const destails=tokenFunction.verifyToken(req.query.token)
    con.query('INSERT INTO userData(email,userName,password) VALUES(?,?,?);',[destails.emailId,destails.userName,destails.hashPass],(err,data)=>{
        if(err){
            res.send([])
        }
        else{
            res.json(destails)
        
        }
    })
})
module.exports =register