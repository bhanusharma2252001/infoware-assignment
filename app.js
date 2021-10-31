const express=require('express');
const app=express();
const bodyParser=require('body-parser');
const ejs = require("ejs");
app.set('view engine', 'ejs');
app.use(express.static("public"));
app.use(bodyParser.urlencoded({extended:true}));
app.use(express.json());

const mongoose=require('mongoose');
require('dotenv').config();

//All Routes
const authRoute=require('./routes/auth');
const productRoute=require('./routes/product');
const orderRoute=require('./routes/order');

mongoose.connect(process.env.db_url)
.then(()=>{
    console.log("DB connected!!")
})
.catch((err)=>{
    console.log(err);
})

app.use("/api/v1/auth",authRoute);
app.use("/api/v1/product",productRoute);
app.use("/api/v1/order",orderRoute);

/* GET home page. */
app.get("/", function(req, res) {
    const homeTitle="RESTful API for Ecommerce Applicaton!!";
	res.render("index",{title:homeTitle});
});

// throw 404 if URL not found
app.all("*", function(req, res) {
	res.send("Error:404  Page not found!!")
});


app.listen(3000,(err)=>
{
    if(!err)
    console.log('server is listening on port 3000');
})
