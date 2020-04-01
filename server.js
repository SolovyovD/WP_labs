const fs = require("fs"); 
const http = require("http");
const url = require('url');
const querystring = require('querystring');

function start() {
    function onRequest(request, response) { 
        console.log("Request received"); 
        var sum = 0;
        var sp = url.parse(request.url).search;
        if (sp != null) {
            var parsed_sp = querystring.parse(sp.split('?')[1]);
            for (key in parsed_sp) {
                if (Number.isInteger(Number(parsed_sp[key]))) {
                    sum += Number(parsed_sp[key]);
                }
            }
            if(sum == 0){sum = "Error!";}
            console.log("Result = " + sum);
            response.write(sum.toString());
            response.end();
            return;
        }
        var page = fs.readFileSync('index.html'); 
        response.writeHead(200, { 'Content-Type': 'text/html' }); 
        response.write(page);
        response.end(); 
    }
    http.createServer(onRequest).listen(8888); 
    console.log("Server has started");
}

exports.start = start;