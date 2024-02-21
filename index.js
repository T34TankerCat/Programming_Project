var express = require("express");
var app = express();
var mysql = require('mysql');

app.use(express.static("views")); 
app.use(express.static("images")); 
app.use(express.static("style")); 

app.set('view engine', 'ejs'); // Set the template engine 

var bodyParser = require("body-parser") // call body parser module and make use of it
app.use(bodyParser.urlencoded({extended:true}));



// ******************************** Start of SQL **************************************** //
// First we need to tell the application where to find the database
const db = mysql.createConnection({
host: '127.0.0.1',
    user: 'root',
    port: '3306',
    password: 'root',
    database: 'computers'
 });

// Next we need to create a connection to the database

db.connect((err) =>{
     if(err){
        console.log("go back and check the connection details. Something is wrong.")
    } 
     else{
        console.log('Looking good the database connected')
    }
})


// **********************************  Code from here **************************
app.get('/', function(req,res){
    let sql = 'SELECT * FROM computers';
    let query = db.query(sql, (err,result) => {
        if(err) throw err;
        console.log(result);
        res.render('home', {result})   
    });
    
})


app.get('/add', function(req,res){

    res.render('add')


})


app.post('/add', function(req,res){
    let sql = 'insert into computers (title, price, memory, processor, image) values (?, ?, ?, ?, ?)';
    let query = db.query(sql,[req.body.title, req.body.price, req.body.memory, req.body.processor, req.body.image], (err,result) => {
        if(err) throw err;
        console.log(result);
        res.redirect( '/')   
    });
      
    
})

app.get('/title/:title', function(req,res){
    let sql = 'SELECT * FROM computers WHERE title = ?';
    let query = db.query(sql,[req.params.title], (err,result) => {
        if(err) throw err;
        console.log(result);
        res.render('title', {result})   
    });
    
})

app.get('/individual/:id', function(req,res){
    let sql = 'SELECT * FROM computers WHERE id = ?';
    let query = db.query(sql,[req.params.title], (err,result) => {
        if(err) throw err;
        console.log(result);
        res.render('title', {result})   
    });
    
})




// **********************************  Code to here **************************

app.listen(process.env.PORT || 3000, process.env.IP || "0.0.0.0" , function(){
  console.log("New Full Demo is Live")
});