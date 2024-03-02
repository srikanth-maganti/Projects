const express=require("express");
const app=express();
const path=require("path");
const mysql=require("mysql2");



app.set("view engine","ejs");
app.set("views",path.join(__dirname,"/views"));
app.use(express.urlencoded({extended:true}));
app.use(express.json());

const connection=mysql.createConnection({
    host:"localhost",
    user:'root',
    database:"researchclub",
    password:"srikanth@143"
});

app.listen(3000,()=>{
    console.log("server started listening to port 3000");
});

app.get("/home/register",(req,res)=>{
    res.render("register.ejs");
});

app.post("/home",(req,res)=>{
    let {email,id,branch,username,phno}=req.body;
    
    let q='insert into studentdata values (?,?,?,?,?)';
    let data=[username,id,branch,email,phno];
    try{
        connection.query(q,data,(err,result)=>{
            if(err)
            {
                throw err;
            }
            res.send("success");
        })
    }
    catch(err)
    {
        res.send("error");
    }

})