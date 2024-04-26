
const express  = require('express');
const app = express();
const path = require('path');
const fs = require('fs');


app.use(express.json());
app.use(express.urlencoded({ extended: true })); 
app.use(express.static(path.join(__dirname, 'public')));
app.set('view engine', 'ejs');


app.get('/', (req, res) => {
    fs.readdir(`./files`,(err,files) => {
        res.render("index", {files: files});

    })
  
});

app.get('/file/:filename', (req, res) => {
    fs.readFile(`./files/${req.params.filename}`,"utf-8",function(err,filedata){
    res.render("show",{filename: req.params.filename, filedata: filedata } );
   

    })
    })

app.get('/edit/:filename', (req, res) => {

    res.render("edit",{filename: req.params.filename});

       
    })
app.post('/edit', (req, res) => {
    fs.rename(`./files/${req.body.Previous}`,`./files/${req.body.new}`,function(err){
        res.redirect("/")
    })
        
    })
   
        
   
app.post('/create', (req, res) => {
    fs.writeFile(`./files/${req.body.tittle.split('').join('')}.tst`,req.body.details, (err)=>{
        res.redirect("/")

    })
        

    })
  


// app.get('/profile/:username', (req, res) => {
//     res.send(`welcom, ${req.params.username}`);    // dynamic route 
// });
// app.get('/author/:username/:age', (req, res) => {
//     res.send(`welcom, ${req.params.username} of age ${req.params.age}`);    // dynamic route 
// });
app.listen(3000, () => {
    console.log("Server is running on port 3000");
})