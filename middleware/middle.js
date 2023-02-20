
require ("dotenv").config()
const jwt = require("jsonwebtoken")


async function verify(req,res,next){
    const token = req.headers.authorization
    console.log("yes in md")
    try{
        jwt.verify(token,"manish",(error,decode)=>{
            if(decode){
                req.body.user = decode.userid
                next()
            }else{
                res.send("jwt needed")
            }
        })
    }catch(error){
    res.send({msg:error.message})
    }
}

module.exports={
    verify
}