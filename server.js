var express = require("express");
const cors = require("cors");
// var mysql = require("mysql");
var app = express();
var connection = require("./database");
var data ={'vehicle' : 2, 'dest' : 'charholi' , 'src' : 'kothrud'}
var providersData ;
var providerScores = new Map();
var finalData = {'providers' : [], 'queryRes' : []}

app.use(cors())
app.use(express.json())

// app.get('/',function(req,res){
//     // query1 = "select * from rides where vehicle =" + data.vehicle + " and source = '" + data.src + "' and  destination = '" + data.dest +"'";
    
//     // connection.query(query1,(err,results) => { 
//     //     if(err) throw err;
//     //     console.log(results);
//     //     // res.send(results);
//     //     res.send(results);
//     // })
    
// })

function getProvderNames(result,providersData){
    if(result.length == 0) return;
    for (let i = 0; i < result.length; i++) {
        for(let j = 0; j < providersData.length; j++){
            if(result[i]['provid_id'] == providersData[j]['provid_id']){
                // console.log("abwfkabfk");
                result[i]['rating'] = providersData[j]['Ratings'];
                result[i]['provid_name'] = providersData[j]['Name'];
            }
        }
    }

    function toSeconds(timeStr) {
        const [hours, minutes, seconds] = timeStr.split(':').map(Number);
        return hours * 3600 + minutes * 60 + seconds;
      }


    var optimum = result[0];
    for (let i = 0; i < result.length; i++) {
        if((result[i]['cost'] <= optimum['cost'] && result[i]['duration'] <= optimum['duration']) 
        || (result[i]['rating'] > optimum['rating'] && result[i]['duration'] <= optimum['duration'])
        || (result[i]['rating'] > optimum['rating'] && (result[i]['cost'] <= optimum['cost']))){
                optimum = result[i];
        }  
    }

    console.log("Most optimum is : ")
    console.log(optimum)

    
    providerScores.set(optimum['provid_name'],100);
    // console.log(providerScores)
    for(let i = 0; i < result.length;i++){
        if(!providerScores.has(result[i]['provid_name'])){
            var duration = toSeconds(result[i]['duration']);
            var weight  = - 0.33 * result[i]['cost'] - 0.33 * duration  + 0.33 * result[i]['rating'];
            providerScores.set(result[i]['provid_name'],weight);
        }
    }

    const myArray = Array.from(providerScores);

    // Sort the array based on the values
    myArray.sort(function(a, b) {
        return b[1] - a[1];
    });

    // Create a new Map object from the sorted array
    console.log(myArray);
    for (let index = 1; index < myArray.length; index++) {
        var score =  ((myArray.length - index) /myArray.length) * 100;
        myArray[index][1] = score;
    }

    providerScores = new Map(myArray);

    for(let i = 0; i < providersData.length;i++){
        if(!providerScores.has(providersData[i]['Name'])){
            providerScores.set(providersData[i]['Name'],0);
        }
    }
    console.log(providerScores);
}



app.get('/getData',async (req,res) => {
    // data = req.body
    query1 = "select * from rides where vehicle =" + data.vehicle + " and source = '" + data.src + "' and  destination = '" + data.dest +"'";
    
    connection.query(query1,(err,results) => { 
        if(err) throw err;
        getProvderNames(results,providersData);
        res.send(results);
    })

    // console.log(data.vehicle)
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
        providersData = results;
        console.log(results);
    })
})


// function res(){
    
// }

