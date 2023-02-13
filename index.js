const express=require("express")
const app=express()
const db=require("./model/connection")

app.listen(7000,()=>console.log("connected"))

app.use(express.json())   // midlleware 














