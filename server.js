const request = require("request");
const async = require("async");
var accessToken = '';


function gameRequest(accessToken){
    setTimeout(() => {
    const gameOptions = {
        //'https://api.twitch.tv/helix/users?login=blueexabyte',
        url: 'https://api.twitch.tv/helix/clips?broadcaster_id=58115189&first=100',
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
        
        console.log('Status: ${res.statusCode}');
        console.log(JSON.parse(body));
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

var http = require('http');
var fs = require('fs');

const PORT=8080; 

fs.readFile('./index.html', function (err, html) {

    if (err) throw err;    

    http.createServer(function(request, response) {  
        response.writeHeader(200, {"Content-Type": "text/html"});  
        response.write(html);  
        response.end();  
    }).listen(PORT);
});