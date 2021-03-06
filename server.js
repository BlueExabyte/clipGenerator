const request = require("request");
const async = require("async");
var express = require('express');
var app = express();
var fs = require("fs");
var http = require('http');
const cors = require('cors');
var accessToken = '';
let clipURL = 'test'
let sourcePre = 'https://clips.twitch.tv/embed?clip='
let sourceSuff = '&parent=www.blueexabyte.github.io&parent=blueexabyte.github.io'
let brodcasterID = '58115189';

app.use(cors())

function gameRequest(accessToken){
    setTimeout(() => {
    const gameOptions = {
        //'https://api.twitch.tv/helix/users?login=blueexabyte',
        url: 'https://api.twitch.tv/helix/clips?broadcaster_id=' + brodcasterID + '&first=100',
        method: 'GET',
        headers:{
            'Client-ID': '4z8jrmlca65cyeio9vvrsc99xe5c70',
            'Authorization': 'Bearer ' + accessToken
        }
    }
    if(!accessToken){
        console.log("No Token");
    }else{
        console.log(gameOptions);
    
    const gameRequest = request.get(gameOptions,(err,res,body) => {
        if(err){
            return console.log(err);
        }
        
        //console.log("API Response: ")
        //console.log(JSON.parse(body));
        let apiResult = JSON.parse(body);
        let clipsArray = [];
        for (let i = 0; i < (apiResult['data'].length); i++) {
            clipsArray.push(apiResult['data'][i]['id']);
        }

        clipURL = sourcePre + String(clipsArray[Math.floor(Math.random() * clipsArray.length)]) + sourceSuff;
        console.log(clipURL);
        //document.getElementById('displayFrame').src = clipURL;
    });
    
    };
    
    },2000)
}

const options = {
    url: 'https://id.twitch.tv/oauth2/token',
    json:true,
    body: {
    client_id: '4z8jrmlca65cyeio9vvrsc99xe5c70',
    client_secret: '5cdgh9tavfxzllf6h5rophgi580uo1',
    grant_type: 'client_credentials'
    }
};

request.post(options, (err,res,body)=>{
    if(err){
        return console.log(err);
    }
    console.log('Status: ${res.statusCode}');
    console.log(body.access_token);
    gameRequest(body.access_token);
    
});

const PORT=8080; 
const port=8090;

fs.readFile('./index.html', function (err, html) {

    if (err) throw err;    

    http.createServer(function(request, response) {  
        response.writeHeader(200, {"Content-Type": "text/html"});  
        response.write(html);  
        response.end();  
    }).listen(PORT);
});

app.get('/url',(req,res)=>{
    res.json({ url: String(clipURL) })
})

app.listen(port, () => {
    console.log(`Example app listening at http://localhost:${port}`)
})