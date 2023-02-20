const express = require("express")

const postRoutes = express.Router()

const {postModel} = require("../models/postmodel")

require("dotenv").config()

postRoutes.use(express.json())

postRoutes.post("/addpost", async(req,res)=>{
    console.log(req.body);
    try{
       const post = new postModel(req.body)
     await post.save()
     res.send({msg: "new post added"})
    }catch(error){
    res.send({msg:error.message})
    }
})

postRoutes.get("/", async(req,res)=>{
    console.log(req.body)
    try{
       if(req.query.device == "Mobile"){
        const post = await postModel.find({device:"Mobile"})
        res.send(post)
       }else if (req.query.device1 == "Mobile"|| req.query.device1 == "Tablet"){
        const post = await postModel.find({$and:[{device:"Mobile"},{device:"Tablet"}]})
        res.send(post)
       }else{ 
        const post = await postModel.find({user:req.body.user})
       res.send(post)}
     }catch(error){
     res.send({msg:error.message})
     }
})

postRoutes.patch("/update/:id", async(req,res)=>{
    try{
    await postModel.findByIdAndUpdate({_id:req.params.id},req.body)
    res.send({msg:"post edited"})
    }catch(error){
        res.send({msg:error.message})
    }
})

postRoutes.delete("/delete/:id", async(req,res)=>{
    try{
    await postModel.findByIdAndDelete({_id:req.params.id})
    res.send({msg:"post deleted"})
    }catch(error){
        res.send({msg:error.message})
    }
})


module.exports={
    postRoutes
}