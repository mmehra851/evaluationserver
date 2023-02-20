const express = require("express")

const app = express()

const {connection} = require("./config/db")
require("dotenv").config()

const {userRoutes} = require("./routs/userRoute")
const {postRoutes} = require("./routs/postRoute")
const {verify} = require("./middleware/middle")
app.use(express.json())
app.get("/",(req,res)=>{
    res.send("This is Linkdin Home Page")
})



app.use("/users" , userRoutes)
app.use("/posts", verify)
app.use("/posts", postRoutes)



app.listen(process.env.PORT, async()=>{
    try{
     await connection
     console.log("Connected to mongo Atlas")
    }catch(error){
     console.log(error)
    }

    console.log(`Server is running at PORT ${process.env.PORT}`)
})