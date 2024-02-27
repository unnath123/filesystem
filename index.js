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
            // console.log(fields)
            // console.log(files)
            const oldPath = files.fileToUpload[0].filepath;
            const newPath = __dirname + "/uploads/" + files.fileToUpload[0].originalFilename

            fs.rename(oldPath, newPath, (err)=>{
                if(err) throw err
            })
            res.end("form read")
        })
    }
    else if(req.url === "/htmlform"){
        fs.readFile("form.html", (err, data)=>{
            if(err) throw err;
            res.end(data);
        } )
    }
    else if(req.url === "/fileRename" && req.method=== "GET"){
        fs.rename("demo.txt", "newDemo.txt", (err)=>{
            if(err) throw err;
            else{
              return res.end("rename successful")
            }
        })
    }
    else if(req.url === "/fileStream" && req.method === "GET"){
        const rstream = fs.createReadStream("newDemo.txt");
        rstream.on("data", (char)=>{
            res.write(char)
        })
        rstream.on("end", ()=>{
            return res.end()
        })
    }
    else if(req.url === "/readfile"){
        fs.readFile("newDemo.txt", (err, data)=>{
            if(err) throw err;
            else{
                return res.end(data)
            }
        })
    }
})

server.listen("8000", ()=>{
    console.log("http server is running");
})

