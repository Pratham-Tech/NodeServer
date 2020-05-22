const http = require('http');
const hostname = 'localhost';
const fs = require('fs');
const path = require('path');
const port = 3000;

const server = http.createServer((req,res) =>{

console.log("Request for "+req.url+' by method '+req.method);

if(req.method == 'GET'){

var fileurl;
if(req.url == '/') fileurl = '/homepage.html';
else fileurl = req.url;

var filepath = path.resolve('./public'+fileurl);
const fileext = path.extname(filepath);
if(fileext == '.html'){
	fs.exists(filepath, (exists) => {
	 if(!exists){
	 	res.statusCode = 404;
	 	res.setHeader('Content-Type','text/html');
	 	res.end('<html><body><h1>file not found: '+fileurl+'</h1></body></html>');
	 	return;
	 }
	 res.statusCode = 200;
	 res.setHeader('Content-Type','text/html');
	 fs.createReadStream(filepath).pipe(res);	
	});
}
else
{
	res.statusCode = 404;
	 	res.setHeader('Content-Type','text/html');
	 	res.end('<html><body><h1>Not a HTML file '+fileurl+'</h1></body></html>');
	 	return;
}
}

else
{
	res.statusCode = 404;
	 	res.setHeader('Content-Type','text/html');
	 	res.end('<html><body><h1>Request method not supported: '+req.method+'</h1></body></html>');
	 	return;
}	
});

server.listen(port,hostname,() => {
	console.log(`Server Running at https://${hostname}:${port}`);
});