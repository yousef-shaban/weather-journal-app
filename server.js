// Setup empty JS object to act as endpoint for all routes
projectData = [
    
];


// Require Express to run server and routes
const express = require('express');
const bodyParser = require('body-parser')

// Start up an instance of app
const app = express()
const port = 3000;
/* Middleware*/
//Here we are configuring express to use body-parser as middle-ware.
app.use(bodyParser.urlencoded({ extended: false }));
app.use(bodyParser.json());

// Cors for cross origin allowance
const cors = require('cors');
app.use(cors());

// Initialize the main project folder
app.use(express.static('website'));

// listining function
const listining = ()=>{console.log("server lisining on port: " + port)}

// Setup Server
app.listen(port, listining)

// routes

app.get("/weatherData", (req, res)=>
{
    res.send(projectData)
});

app.post("/addData", (req, res)=>
{
    let data = req.body;

    projectData.push(data)

});


