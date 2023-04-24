var express = require("express");
const cors = require("cors");
// var mysql = require("mysql");
var app = express();
var connection = require("./database");
var data

app.use(cors())
app.use(express.json())

app.get('/',function(req,res){
    query1 = "select * from rides where vehicle =" + data.vehicle + " and source = '" + data.src + "' and  destination = '" + data.dest +"'";
    
    connection.query(query1,(err,results) => { 
        if(err) throw err;
        console.log(results);
        // res.send(results);
        res.send(results);
    })
    
})



app.post('/getData',(req,res) => {
    data = req.body
    console.log(data.vehicle)
})



app.listen(8000,() => {
    query2 = "select * from providers";
    console.log("Listening on port 8000");
    connection.commit(function(err){
        if(err) throw err;
        console.log("Database connected successfully");
    })

    connection.query(query2,(err,results)=>{
        if(err) throw err;
        console.log(results);
    })
})


// function res(){
    
// }

