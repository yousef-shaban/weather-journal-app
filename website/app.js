/* Global Variables */
const api = '760849b3c2e8c48e77e846d6f63b2be5'
const Gen = document.getElementById('generate');
const dateHolder = document.getElementById("date");
const tempHolder = document.getElementById("temp");
const contHolder = document.getElementById("content");
const nameHolder = document.getElementById("name");
const descHolder = document.getElementById("desc");


let WeatherData = {}

// Create a new date instance dynamically with JS
let d = new Date();
let newDate = d.getMonth()+'.'+ d.getDate()+'.'+ d.getFullYear();

// event listener for click on the generate 'button' to triger the 'preform' func
Gen.addEventListener('click', preform)



// the main function
function preform(){


    getData() // get the data from the api 

    .then((data)=>{ // after receving the data from the api run these functions

        postData("/addData", WeatherData) // pass the data receved from the api to the server to store them

        updataUI(); // get the data and the userInput from the server to use them to update the UI
    })
}


// get the data form the api
const getData = async ()=>
    {
        const zip = document.getElementById('zip').value;
        const text = document.getElementById("feelings").value;
        const url = `https://api.openweathermap.org/data/2.5/weather?zip=${zip}&appid=${api}`
        const Rowdata = await fetch(url);
    
        try{
            const data = await Rowdata.json();
            // store the data to the weatherdata object
            WeatherData = {
                name: data.name,
                desc: data.weather[0].description,
                temp: data.main.temp,
                date: newDate,
                userRes: text
            }
            return WeatherData;
        }
        catch(error){
            console.log(error)
        }
    }



// post the data to the server
const postData = async (url = '', data = {})=>
{
    const post = await fetch(url,
    
    {method: 'POST',credentials: "same-origin" ,headers: {'Content-Type': 'application/json',} ,
    body: JSON.stringify(data)});
    try{
        console.log("data posted")
    }
    catch(error)
    {
        console.log(error)
    }
}

// updata the UI function
const updataUI = async () => {
    
    const upData = await fetch("/weatherData");

    try{
        const FinalData = await upData.json();
        console.log(FinalData)
        let date = FinalData.date;
        let temp = FinalData.temp;
        let Userdesc = FinalData.userRes;
        let desc = FinalData.desc;
        let name = FinalData.name;
        nameHolder.innerHTML = `The country Name is ${name}`
        dateHolder.innerHTML = `The Date is: ${date}`
        tempHolder.innerHTML = `The Tempreture is ${temp}`
        descHolder.innerHTML = `Description: ${desc}`
        contHolder.innerHTML = Userdesc;
    }
    catch(error)
    {
        console.log(error)
    }
    
}