var querystring = require("querystring");
var fs = require("fs");

function getRandomInt(min, max)
{
  return Math.floor(Math.random() * (max - min + 1)) + min;
}

function start(response, postData) {
    console.log("Request handler 'start' was called.");
    var body = '<html>' +
        '<head>' +
        '<meta http-equiv="Content-Type" content="text/html; ' +
        'charset=UTF-8" />' +
        '</head>' +
        '<body>' +
        '<form action="/upload" method="post">' +
        '<input pattern="[a-zA-Z]{1,8}\\s?\\d?" name="text">' +
        '<input type="submit" value="Submit text" />' +
        '</form>' +
        '</body>' +
        '</html>';
    response.writeHead(200, { "Content-Type": "text/html" });
    response.write(body);
    response.end();
}

function upload(response, postData) {
    console.log("Request handler 'upload' was called.");
    var req = querystring.parse(postData).text.trim().split(' ');
    switch(req[0]) {
        case 'kaban':
            kaban(response, req)
            break;
        case 'kakadu':
            kakadu(response, req);
            break;
        case 'kalmar':
            kalmar(response, req);
            break;
        default:
            start(response, postData)
    }
}

function kaban(response, Data) {
    if (typeof Data[1] === 'undefined') {
        Data[1] = getRandomInt(0,9);
    }
    var i = Data[1];
    var image = fs.readFileSync('images/kaban/kaban_'+i+'.jpg');
    response.writeHead(200, { "Content-Type": "image/jpg" });
    response.write(image);
    response.end();
}

function kakadu(response, Data) {
    if (typeof Data[1] === 'undefined') {
        Data[1] = getRandomInt(0,9);
    }
    var i = Data[1];
    var image = fs.readFileSync('images/kakadu/kakadu_'+i+'.jpg');
    response.writeHead(200, { "Content-Type": "image/jpg" });
    response.write(image);
    response.end();
}

function kalmar(response, Data) {
    if (typeof Data[1] === 'undefined') {
        Data[1] = getRandomInt(0,9);
    }
    var i = Data[1];
    var image = fs.readFileSync('images/kalmar/kalmar_'+i+'.jpg');
    response.writeHead(200, { "Content-Type": "image/jpg" });
    response.write(image);
    response.end();
}

exports.start = start;
exports.upload = upload;