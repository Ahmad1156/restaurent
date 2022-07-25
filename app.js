// create an express app
const express=require('express')
const excelToJson = require('convert-excel-to-json');
var cors = require('cors')
const app=express()
app.use(cors());
var bodyParser = require('body-parser')
app.use(bodyParser.urlencoded({ extended: false }))
const nodemailer=require('nodemailer')
require('dotenv').config();

// parse application/json
app.use(bodyParser.json())


// use the express-static middleware
//app.use(express.static("public"))(we will not use it till now)

// define the first route
app.get("/", function (req, res) {
  res.send("<h1>Hello World!</h1>")
})
//route to get the chefs
app.get("/chefs",(req,res)=>{
const result = excelToJson({
    sourceFile: './data.xlsx',
    header:{
        rows: 1
    },
    sheets: ['chefs'],
    columnToKey: {
        A: 'Name',
        B: 'Role',
        C: 'description',
        D: 'images'
        }
    });
    res.send(result);
})
app.get("/dishes",(req,res)=>{
    const result = excelToJson({
        sourceFile: './data.xlsx',
        header:{
            rows: 1
        },
        sheets: ['Dishes'],
        columnToKey: {
            A: 'Name',
            B: 'credentials',
            C: 'price',
            D: 'images',
            E: 'Title'
            }
        });
        res.send(result);
    })
    app.get("/Ratings",(req,res)=>{
        const result = excelToJson({
            sourceFile: './data.xlsx',
            header:{
                rows: 1
            },
            sheets: ['Testimonials'],
            columnToKey: {
                A: 'Name',
                B: 'rating',
                C: 'images',
                }
            });
            res.send(result);
        })
    app.post("/message",(req,res)=>{
        const output=`<p>HEY AHMAD,You have a new Contact message:</p>
                          <h3>Contact Details</h3>
                          <ul>
                          <li>Name:${req.body.name}</li>
                          <li>Email:${req.body.email}</li>
                          <li>Subject:${req.body.subject}</li>
                          </ul>
                          <h3>Message</h3>
                         <p> ${req.body.message}</p>`;
        
            let transporter = nodemailer.createTransport({
                service: 'gmail',
                auth: {
                  type: 'OAuth2',
                  user: process.env.MAIL_USERNAME,
                  pass: process.env.MAIL_PASSWORD,
                  clientId: process.env.OAUTH_CLIENTID,
                  clientSecret: process.env.OAUTH_CLIENT_SECRET,
                  refreshToken: process.env.OAUTH_REFRESH_TOKEN
                }
              });
              let mailOptions = {
                from:process.env.MAIL_USERNAME,
                to: process.env.MAIL_USERNAME,
                subject: 'Clients Rating',
                text: '',
                html:output
              };
              
              transporter.sendMail(mailOptions, function(err, data) {
                if (err) {
                  console.log("Error " + err);
                } else {
                  console.log("Email sent successfully");
                }
              });
        
              res.end();
        
        });
        
          




  
    

// start the server listening for requests
app.listen(process.env.PORT || 3000, 
	() => console.log("Server is running..."));

