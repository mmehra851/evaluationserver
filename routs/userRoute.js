const express = require("express")

const userRoutes = express.Router()

const {userModel} = require("../models/usermodel")

require("dotenv").config()

userRoutes.use(express.json())
const jwt = require("jsonwebtoken")

const bcrypt = require("bcrypt")

userRoutes.post("/register" , async(req,res)=>{
    const {name,email,gender,password,age,city} = req.body
    try{
        
     bcrypt.hash(password,5,async(error,hash)=>{
        if(error){
            res.send(error.message)
        }else{
            const user = new userModel({name,email,gender, password: hash,age,city})
            await user.save()
            res.send({msg: "New User Registered"})
        }
     })

    }catch(error){
      res.send({mag: error.message})
    }
})

userRoutes.post("/login", async(req,res)=>{
   
    try{
      const user = await userModel.findOne({email:req.body.email})
    
      if(user==null){
        res.send({msg:"user not found"})
      }
        if(await bcrypt.compare(req.body.password, user.password)){
            const token =  jwt.sign({userid:user._id},"manish")
            res.send({name:user.name,token:token})
        }else{
            res.send({msg:"wrong password"})
        }
      
    }catch(error){
     res.send({msg:`${error.message}`})
    }
})

module.exports= {
    userRoutes
}