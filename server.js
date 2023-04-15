var express = require("express");
// var mysql = require("mysql");
var app = express();
var connection = require("./database");

app.get('/',function(req,res){
    query1 = "select * from customer where cust_id = 3";
    connection.query(query1,(err,results) => {
        if(err) throw err;
        console.log(results);
        // res.send(results);
    })
    res.send("Hello");
})

app.listen(3000,() => {
    console.log("Listening on port 3000");
    connection.commit(function(err){
        if(err) throw err;
        console.log("Database connected successfully");
    })
})

