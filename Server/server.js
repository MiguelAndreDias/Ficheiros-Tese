
//Needed to have both import and requires in the same file
import {createRequire} from "module";
const require = createRequire(import.meta.url);

//to make requests
import fetch from 'node-fetch';

import xml2js from 'xml2js'
const bodyParser = require("body-parser");

const express = require('express')
const app = express()


//Convert base64 to utf8
function convert64(base64encoded){
    var utf8encoded = Buffer.from(base64encoded, 'base64').toString('utf8');
    return utf8encoded

}


//converter xml to json file
function jsonConverter(ficheiro){

    xml2js.parseString(ficheiro, (err, result) => {
        if(err) {
            throw err;
        }
    
        // `result` is a JavaScript object
        // convert it to a JSON string
        const json = JSON.stringify(result, null, 4);
    
        // log JSON string
        return json
        
    });
    }
    




app.use(bodyParser.urlencoded({extended: true}));


app.get("/getWeathertoronto", function(req,res){
    fetch('https://jsonplaceholder.typicode.com/users')
    .then(res => res.json())
    .then(json => {
        console.log("First user in the array:");
        console.log(json[0]);
        console.log("Name of the first user in the array:");
        var temp_c = json[0].address.geo.lat
        res.send({temp_c})
})
})



    
app.post("/search", function(req,res){
   
    console.log(req.body.testar)
    console.log("Ola")
  
const url = "https://api.github.com/"
const getRepoContent = "repos/gestaopedidosehr/CKM-mirror/contents/"
const path = req.body.testar

console.log(path)

fetch(url + getRepoContent + path , {

}).then(res => res.json() )

.then(json => {
    console.log(json)
for (var i = 0; i < json.length; i++){

    var obj = json[i];
    for (var key in obj){
        if(key == "name"){
          var value = obj[key];
  
      res.write('<div> <form action = "/results" method = "post">' + 
      '<button type = "submit" name = "testar2" value' + '=' + '"' + req.body.testar + value   + '"' + '>' + key + ": " + value  + '</form> </div>');
        }
      
    }
  }
  res.send()
}

)

})







app.post("/test", function(req,res){


console.log("Ola")
console.log(req.body.justTesting)
console.log("Adeus")
const url = "https://api.github.com/"
const getRepoContent = "repos/gestaopedidosehr/CKM-mirror/contents/"
const path = req.body.justTesting

console.log(path)
console.log("fixe")

fetch(url + getRepoContent + path)
    .then(res => res.json())    
    .then(json => {
        //console.log(json.content)
        var content = json.content
        res.send({content})
    })


})



//vai buscar o conteudo dos ficheiros

app.post("/results", function(req,res){

    var jsonfile = {}
    console.log(req.body.testar2)
    const url_github = "https://api.github.com/"
    const getRepoContent = "repos/gestaopedidosehr/CKM-mirror/contents/"
    const path = req.body.testar2
    
    
    fetch(url_github + getRepoContent + path, {
        
    }).then(res => res.json() )
    .then(json => {
        const data = json.content
        const data2 = convert64(data)
        const data3 = xml2js.parseString(data2, (err, result) => {
            if(err) {
                throw err;
            }
        
            // `result` is a JavaScript object
            // convert it to a JSON string
            const json = JSON.stringify(result, null, 4);
            var obj = JSON.parse(json)
            jsonfile = obj
            // log JSON string
            return obj;
            
            })
        
        console.log(data2)
        console.log()
        console.log()
        console.log(JSON.stringify(jsonfile))
       res.send('<p>' + JSON.stringify(jsonfile) + '</p>')
        
    })
})

app.listen(5000, () => console.log("Server started on port 5000"))

