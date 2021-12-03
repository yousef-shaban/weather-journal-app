/* Global Variables */
const api = '760849b3c2e8c48e77e846d6f63b2be5'
const Gen = document.getElementById('generate');
let WeatherData = {}

// Create a new date instance dynamically with JS
let d = new Date();
let newDate = d.getMonth()+'.'+ d.getDate()+'.'+ d.getFullYear();

Gen.addEventListener('click', preform)



// the main function
function preform(){

    getData()
    .then((data)=>{

        postData("/addData", WeatherData)
        updataUI();
    })
}



const getData = async ()=>
    {
        const zip = document.getElementById('zip').value;
        const text = document.getElementById("feelings").value;
        const url = `https://api.openweathermap.org/data/2.5/weather?zip=${zip}&appid=${api}`
        const Rowdata = await fetch(url);
    
        try{
            const data = await Rowdata.json()
            WeatherData = {
                temp: data.main.temp,
                data: newDate,
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
    
    {method: 'POST',credentials: "same-origin" ,headers: {'Content-Type': 'application/json',} ,body: JSON.stringify(data)});
    try{
        console.log("data posted")
    }
    catch(error)
    {
        console.log(error)
    }
}

// updata the UI function
function updataUI(){
    
}