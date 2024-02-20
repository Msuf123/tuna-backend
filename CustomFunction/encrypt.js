const bycrypt=require('bcrypt')
const token=require('jsonwebtoken')
const encrypt= async(password)=>{

const pass=await bycrypt.genSalt(12).catch(()=>{
    console.log('opps')
})
const hash=await bycrypt.hash(password,pass)
return hash

}
const verifyPass=async(plainText)=>{
    return await bycrypt.compare(plainText,hash)
}
module.exports={encrypt,verifyPass}