const http = require("http");
const fs = require("fs");
const formidable = require("formidable")

const server = http.createServer();

// server.on("request", (req, res)=>{
//    const data = "I am learning file system";

//    if (req.method === "GET" && req.url === "/") {
//         return res.end("Server is up and running");
//       }
//    else if(req.url === "/write-file" && req.method=== "GET"){
//     fs.writeFile("demo.txt", data, (err)=>{
//         return res.end("write successful")
//     })
//    }
//    else if(req.url === "/readfile" && req.method === "GET"){
//     fs.readFile("demo.txt", (err, data)=>{
//         if (err) throw err;

//         return res.end(data) 
//     } )
//    }
//    else if(req.url === "/appendFile" && req.method === "GET"){
//     fs.appendFile("demo.txt", data, (err)=>{
//         if(err) throw err;

//         return res.end("append succesfull")
//     })
//    }

// })

server.on("request", (req, res)=>{
    if(req.url === "/fileupload" && req.method==="POST"){
        const form = new formidable.IncomingForm();
        form.parse(req, (err, fields, files)=>{
            console.log(fields)
            console.log(files)
            res.end("form read")
        })

        
    }
    else{
        fs.readFile("form.html", (err, data)=>{
            if(err) throw err;
            
            res.end(data);
        } )
    }
})

server.listen("8000", ()=>{
    console.log("http server is running");
})

