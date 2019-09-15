var mongoose = require('mongoose');
mongoose.connect("mongodb://localhost/demobuyer",{useNewUrlParser: true});
var express = require('express');                                             
var bodyParser = require('body-parser');                                           
var app = express();       
// var User = require("./models/user"); 
// var buyer = require("./models/buyer");       
var seller = require("./seller");       
mongoose.connect("mongodb://localhost/demobuyer",{useNewUrlParser: true});
app.use(bodyParser.urlencoded({extended: true}));


// var bid = 1000;
// var btype = [];
// var sector = document.querySelectorAll('input[type=checkbox]:checked');
// for(var i=0;i<sector.length;i++)
// {

// 		btype.push(sector[i].value);

// } 

//console.log(btype);
console.log(seller);
var cc_t = 0;
var cc_p = 0;
var sum_z_bar_p;
var re_bid;
var t_id = 0;


var one = seller.find({});
var Seller = [];
for(var i=0;i<=seller.length;i++){
	Seller.push(one[i]);
}

console.log(Seller);

