const express = require("express");
const app = express();
const cors = require('cors');
const cookieParser = require("cookie-parser");
const bodyParser = require('body-parser')
const mysql = require("mysql");
const bcrypt = require("bcrypt");
const session = require("express-session");
const saltRounds = 10;
const jwt = require('jsonwebtoken');



app.use(express.json());
app.use(bodyParser.urlencoded({ extended: true }));
app.use(
    cors({
        origin: ["http://localhost:3000"],
        methods: ["GET", "POST"],
        credentials: true,
    })
);
app.use(
    session({
        key: "userId",
        secret: "boeingmalezija",
        saveUninitialized: true,
        resave: true,
        rolling: false,
        cookie: {
            secure: false,
            path    : '/',
            expires: 60 * 60 * 1000,
        },
    })
);
const db = mysql.createConnection({
    host: 'localhost',
    user: 'root',
    password: 'printer12345678',
    database: 'gameshopdatabase',
});

app.use('/', (req,res,next)=>{
    console.log(req.session);
    next();
})

app.get('/api/get', (req, res) => {
    const sqlSelect =
        "SELECT * FROM user";
    db.query(sqlSelect, (err, result) => {
        res.send(result);
    });
});

app.post('/api/post', (req, res) => {
    email=req.body.email;
    username=req.body.username;
    console.log("primljeno" + email + " " + username);
    
    const sqlSelect =
        "SELECT * FROM user";
    db.query(sqlSelect, (err, result) => {
        var i=0;
        for(i=0;i<result.length;i++){           
            if(email===result[i].email){
             res.send({emailtaken:true});
             return;
            }
            if(username===result[i].username){
                res.send({usernametaken:true});
                return ;
               }
        }
        if(i===result.length){
            res.send({emailtaken:false,usernametaken:false});
            return;
        }
    });
});



app.post("/register", (req, res) => {
  
    const email= req.body.email;
    const username = req.body.username;
    const password = req.body.password;
    console.log("primljeno" + email + " " + username + " " + password);

    bcrypt.hash(password, saltRounds, (err, hash) => {
        if (err) {
            console.log(err);
        }

        db.query(
            "INSERT INTO user (email,username, password) VALUES(?,?,?)",
            [email,username, hash],
            (err, result) => {
                console.log(err);
            }
        );

    });
});

function verifiyJWT(req, res, next) {
    const token = req.headers["x-access-token"];
    if (!token) {
        res.send("We need a token");
    }
    else {
        jwt.verify(token, "arktickiocean", (err, decoded) => {
            if (err) {
                res.json({ auth: false, message: "Failed to authenticate" });
            }
            else {
                req.userId = decoded.user_id;
                next();
            }
        });
    }
}

app.get('/isUserAuth',verifiyJWT ,(req,res)=>{
    res.send("You are authetincated");
})

app.get("/login", (req,res)=>{
    console.log(req.session);
    if(req.session.user){
        res.send({loggedIn:true,user:req.session.user});
    }
    else{
        res.send({loggedIn:false});
    }
})


app.post("/login", (req, res) => {
    const username = req.body.username;
    const password = req.body.password;

    db.query(
        "SELECT * FROM user WHERE username= ?",
    username,
    (err, result) => {
        if (err) {
            res.send({ err: err });
        }
        if (result.length > 0) {
            bcrypt.compare(password, result[0].password, (error, response) => {
                if (response) {                  
                    const user_id = result[0].user_id;
                    const token =jwt.sign({user_id},"arktickiocean",{
                        expiresIn:500,
                    })
                    req.session.user = result;
                    console.log(result); 
                    console.log(req.session);
                    res.send({ auth:true , token: token, result: result }); 
                }               
                else {                  
                    res.send({ auth: false , message:"Wrong username/password combination lady/sir" }); 
            }
        });
    }
        else {
            res.send({ auth:true , message:"No user exists" }); 
        }
    }
    );
});






app.listen(3001, () => {
    console.log("running on port 3001");
});
