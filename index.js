const express=require("express")
const app=express()
const db=require("./model/connection")

app.listen(7000,()=>console.log("connected"))

app.use(express.json())   // midlleware 

//create user
app.post("/adduser",(req,res)=>{
    const details={Empid:req.body.id,Empname:req.body.name,Empsalary:req.body.salary,Empcity:req.body.city}
    const sql="insert into ems set ?"
    db.query(sql,details,(err,result)=>{
        if(err) throw err
        else res.send(result)
    })

})













