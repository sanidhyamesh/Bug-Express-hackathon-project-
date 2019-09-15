//=====================REQUIRE STATEMENTS==================================

var express = require('express');                                             
var bodyParser = require('body-parser');                                           
var app = express();       
var User = require("./models/user"); 
var buyer = require("./models/buyer");       
var seller = require("./models/seller");                                            
const passport = require('passport');                                               
const LocalStrategy = require('passport-local'); 
var passportLocalMongoose = require('passport-local-mongoose');                                     
app.set("view engine","ejs");                                                 
var mongoose = require('mongoose'); 
mongoose.connect("mongodb://localhost/demobuyer",{useNewUrlParser: true});
app.use(bodyParser.urlencoded({extended: true}));

app.use(express.static('public'));

//=========================ROUTES STARTS HERE=============================
app.use(require('express-session')({
    secret:'services.html',
    resave:false,
    saveUninitialized:false
}));
app.use(passport.initialize());
app.use(passport.session());
passport.use(new LocalStrategy(User.authenticate()));
passport.serializeUser(User.serializeUser());
passport.deserializeUser(User.deserializeUser());   


app.get("/",function(req,res){
    res.send("index.html");
});

app.get("/signup",function(req,res){
    res.send("signup.html");
    });

    
app.get("/buyerreg",function(req,res){
    res.send("buyerreg.html");
});  
app.get("/sellerreg",function(req,res){
    res.send("sellerreg.html");
});     

app.post("/signup",function(req,res){
res.send("signup.html");
});

app.post("/buyerreg",function(req,res){
    
    var name = req.body.name;
var website = req.body.website;
var email = req.body.email;
var contact = req.body.contact;
var license = req.body.license;
var sector = req.body.sector;
var scale = req.body.scale;
var country = req.body.country;
var username = req.body.username;
var password = req.body.password;
var signupdata= {company_name:name,website:website,email:email,contact:contact,license_number:license,sector:sector,scale:scale,username:username,password:password,country:country}

    var credentials ={username:username,password:password}
    User.create(credentials,function(error,data){
        if(error)
        {
            console.log(error);
        }
    });    
    buyer.create(signupdata,function(error,data){
        if(error){
            console.log(error);
        }else{
        //  window.alert("your account is been created");   
        //  res.redirect('/login');
        console.log(buyer);
        }
    });

});


app.post("/sellerreg",function(req,res){
    

    var name = req.body.name;
var website = req.body.website;
var email = req.body.email;
var contact = req.body.contact;
var license = req.body.license;
// var role = req.body.role;
var sector = req.body.sector;
var scale = req.body.scale;
var username = req.body.username;
var password = req.body.password;
var signupdata= {company_name:name,website:website,email:email,contact:contact,license:license,sector:sector,scale:scale,username:username,password:password}

var credentials ={username:username,password:password}
    User.create(credentials,function(error,data){
        if(error)
        {
            console.log(error);
        }
    });  

    seller.create(signupdata,function(error,data){                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                 
        if(error){
            console.log(error);
        }else{
            // window.alert("your account is been created"); 
            console.log(seller);
        }
});
});

app.param('company_name',function(req,res,next,company_name){
    user.findById(company_name,function(error,docs){
        if(error){
            console.log(error);
        }
        else{
            req.userId = docs;
            next();
        }
    });
});
app.get('/user/:id',function(res,req){
    res.render('show',{user:req.userId});
});

app.post('/login',passport.authenticate('local',
{

    successRedirect : '/home.ejs',
    failureRedirect : '/index.html'
}),
function(req,res){
});



app.get("/services",function(req,res){
res.render("services.html");
});

app.get("/news_and_media",function(req,res){
res.render("news_and_media.html");
});

app.get("/faq",function(req,res){
res.render("faq.html");
});

app.get("/login",function(req,res){
res.render("login.html");
});


console.log("server has started");

app.listen(3000);