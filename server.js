var http = require("http");
var path = require("path"); //requiring modules
var fs = require("fs");


http.createServer(function (req, res) {
    //HOST THE HTML FILES
    if (req.url === "/") {      
        fs.readFile("./public/index.html", "UTF-8", function (err, html) {
            res.writeHead(200, {"Content-Type" : "text/html"});
            res.end(html);
        });

    }
    //HOST THE CSS FILES
    else if (req.url.match("\.css$")) {
        var cssPath = path.join(__dirname, "public", req.url);
        var fileStream = fs.createReadStream(cssPath);
        res.writeHead(200, { "Content-Type":"text/css"});
        fileStream.pipe(res);

    }

    //HOST THE JAVASCRIPT FILES
    else if(req.url.match("\.js")) {
        var jsPath = path.join(__dirname, "public", req.url);
        var fileStream = fs.createReadStream(jsPath);
        res.writeHead(200, { "Content-Type":"application/js"});
        fileStream.pipe(res);
    }

    //HOST THE IMAGES(JPG ) FILES
    else if (req.url.match("\.jpg$")) {
        var imagePath = path.join(__dirname, "public", req.url);
        var fileStream = fs.createReadStream(imagePath);
        fileStream.pipe(res);

    }
      
    else{
        console.log("File not found");
        res.writeHead(404);
        res.end("No Page Found!");
    }
}).listen(3000);
