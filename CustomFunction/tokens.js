const token=require('jsonwebtoken')
function createToken(payload){
    return token.sign(payload,'shh')
}
function verifyToken(tokens){
  return token.verify(tokens,'shh')
}
module.exports={createToken,verifyToken}