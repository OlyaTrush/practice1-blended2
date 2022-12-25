const http = require('http');
const fs = require('fs').promises;
const formidable = require('formidable');
const path = require('path');
const filePath = path.join(__dirname, './contacts.json');


http.createServer(async(req, res)=>{
    if (req.url === '/'){
        res.end('Hello world')
    } 
    if (req.url === '/home'){
        res.end('Hello home')
    }
    if (req.url === '/contact'){
        const data = JSON.parse(await fs.readFile(filePath, "utf-8"))
        const form = formidable({multiples:true});
        // if (req.method.toLowerCase()==='post'){
       
        // form.parse(req, async (error, fields, files)=>{
        //     const { name, email, phone} = fields;
        //     const newContact = {name, email, phone, id:data.length+1}
        //     data.push(newContact);
        //     await fs.writeFile(filePath, JSON.stringify(data), 'utf-8')
        //     res.end(JSON.stringify(data));
        //     return
        // })
        // }
        if (req.method.toLowerCase() === 'post'){
            form.parse(req, async (error, fields, files)=>{ 
            const {id} = fields;
            console.table(data);
            const delContact = data.find(item => item.id == id);
            
            // await fs.writeFile(filePath, JSON.stringify(delContact), 'utf-8')
            // res.end(JSON.stringify(delContact));
            res.end(JSON.stringify({files}));
            return
            }
            )
        }
        if (req.method.toLowerCase() === 'get')
        {res.end(await fs.readFile(filePath, "utf-8"))}
    }
    if (req.url === '/number'){
        res.end('Hello number')
    }
}).listen(3001,()=>{console.log("Server is running")});