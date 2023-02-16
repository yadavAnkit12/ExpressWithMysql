const express=require("express")
const app=express()
const engine = require('express-handlebars').engine
const db=require("./model/connection")


app.use(express.json())   // midlleware 
app.use(express.urlencoded({extended:true}))
app.engine('handlebars', engine());
app.set('view engine', 'handlebars');
app.set('views', './views');


//default Page
app.get("/",(req,res) =>{
    res.render('home')
})

//create user

app.post("/adduser",(req,res)=>{
    const details={Empid:req.body.id,Empname:req.body.name,Empsalary:req.body.salary,Empcity:req.body.city}
    const sql="insert into ems set ?"
    db.query(sql,details,(err,result)=>{
        if(err) throw err
        else {
            res.redirect("/getdata")
        }
    })

})

//retrive data
app.get("/getdata",(req,res)=>{
    const sql="select * from ems"
   db.query(sql,(err,result)=>{
   if(err) throw err
   else {
    res.render('show',{list:result})
   }
   })
   
   })


 

 //Delete User
app.get("/deleteUser/:name",(req,res) => {
    let sql = `DELETE FROM ems WHERE Empname ='${req.params.name}'`
    db.query(sql,(err,result) =>{
        if(err) throw err
        else{
            res.redirect("/getdata")
        }
    })
})

//Update User
app.get("/updateUser/:Empid",(req,res)=>{
    const sql=`select * from ems where Empid='${req.params.Empid}'`
    db.query(sql,(err,result)=>{
        if(err) throw err
        else{
            res.render('home',{list:result})
        }
    })
    

})

//updated
app.post("/newly",(req,res)=>{
    const empid=req.body.id
    const empname=req.body.name
    const empsalary=req.body.salary
    const empcity=req.body.city
    let sql=`update ems set Empid='${empid}',Empname='${empname}',Empsalary='${empsalary}',Empcity='${empcity}' where Empid='${empid}'`
    db.query(sql,(err,result)=>{
        if(err) throw err
        else{
            res.redirect('getdata')
        }
    })
})



app.listen(7001,()=>console.log("connected"))
