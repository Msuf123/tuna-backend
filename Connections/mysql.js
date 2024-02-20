const sql=require('mysql2')
const con=sql.createPool({
    user:'admin',
    password:'admin@123',
    database:'fish',
    host:'localhost',
    waitForConnections:true,
    connectionLimit:10,
    connectTimeout:10000,
    maxIdle:3,
    idleTimeout:40000,
    queueLimit:20
})
module.exports=con