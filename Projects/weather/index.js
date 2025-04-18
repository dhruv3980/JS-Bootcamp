const yourWeatherTab = document.querySelector(".your-location-container");

const searchWeatherTab = document.querySelector(".search-weather-container");

// uper wale tab ha switch krne ke liye
const apiErrorContainer = document.querySelector(".api-error-container");
const apiErrorMessage = document.querySelector("[data-apiErrorText]");
const apiErrorBtn =document.querySelector("[data-apiErrorBtn]")

const showweather = document.querySelector(".show-weather");

const grantlocationcontainer= document.querySelector(".grant-location-container");

const formcontainer = document.querySelector(".form-container");
const loader = document.querySelector(".loading-conatiner");



let Apikey ="d1845658f92b31c64bd94f06f7188c9c";
let currenttab = yourWeatherTab;

currenttab.classList.add("currenttab");
// ek kaam orpending hai?
getfromSessionStorage();

function switchTab(clicked){
    if(clicked!=currenttab){
        currenttab.classList.remove('currenttab');
        currenttab =clicked;
        currenttab.classList.add('currenttab');

        if(!formcontainer.classList.contains("active"))
            {
                showweather.classList.remove("active");
                grantlocationcontainer.classList.remove("active");
                
                formcontainer.classList.add("active");
            }
        else
            {
                // main pahle search wale tab per tha ab weather tab visible kerna ha
                formcontainer.classList.remove("active");
                showweather.classList.remove("active");

                // ab main your weather tab me agaya hoon toh weather bhi display kerna padega so lets check out on local storage
                getfromSessionStorage();
                 

            }
    }

}

yourWeatherTab.addEventListener('click',()=>{
    switchTab(yourWeatherTab);
})
searchWeatherTab.addEventListener('click',()=>{
    switchTab(searchWeatherTab);
});

function getfromSessionStorage(){
    const localcoordinate = sessionStorage.getItem("user-coordinate");
    if(!localcoordinate){
        // agar local coordinate nahi mile 
        grantlocationcontainer.classList.add("active");
    }
    else{
        const coordinate = JSON.parse(localcoordinate);
         fetchuserweatherinfo(coordinate);
    }
}

async function fetchuserweatherinfo(coordinate){
    const{lat,lon}=coordinate;
    // make grant access invisible
    grantlocationcontainer.classList.remove("active");
    // make loader visible

    loader.classList.add("active");

    // Api call
    try{
       const response = await fetch(`https://api.openweathermap.org/data/2.5/weather?lat=${lat}&lon=${lon}&appid=${Apikey}&units=metric`);
       
       const data = await response.json();
       loader.classList.remove("active");
       showweather.classList.add("active");
      
        renderWeatherInfo(data);

    }

    catch(err)
    {
        loader.classList.remove("active");
        // Home Work

    }


}

function  renderWeatherInfo(data){
    // firstly we have to fetch the element
    

    let cityname = document.querySelector(".cityname");
    let countryflag = document.querySelector("[flag]");
    let currentWeather = document.querySelector(".current-weather");
    const weatherIcon = document.querySelector(".weather-icon");
    let currenttemp = document.querySelector(".current-temperature");
    let WindSpeed =document.querySelector(".WindSpeed");
    let humidityMeasure = document.querySelector(".humidity-measure");
    
    let cloudmeasurement = document.querySelector(".how-much-cloud");

    // fetch value from weatherInfo and put it ui element
    cityname.innerText=data?.name;
   
  
    
    countryflag.src =`https://flagcdn.com/144x108/${data?.sys?.country.toLowerCase()}.png`;
    
    

    currentWeather.innerText=data?.weather?.[0]?.description;
    
    
        weatherIcon.src = `http://openweathermap.org/img/w/${data?.weather?.[0]?.icon}.png`;
    
      
    
    currenttemp.innerText=`${data?.main?.temp } °C`;
    
    WindSpeed.innerText =`${data?.wind?.speed} m/s`;
    humidityMeasure.innerText = `${data?.main?.humidity} % `;
    cloudmeasurement.innerText=`${data?.clouds?.all} %`;


}

function getlocation(){
    if(navigator.geolocation){
        navigator.geolocation.getCurrentPosition(showPosition);
    }
    else{
        // homework show an alert for no gelocation support available
        
    }
}

function showPosition(position){
    const userCoordinate = {
        lat: position.coords.latitude,
        lon: position.coords.longitude,
    }
    sessionStorage.setItem("user-coordinate",JSON.stringify(userCoordinate));
    fetchuserweatherinfo(userCoordinate);
}

const GrantAcessbtn = document.querySelector(".grantAcess");
GrantAcessbtn.addEventListener('click',getlocation);
const Searchinput =document.querySelector("[entervalue]");

formcontainer.addEventListener("submit",(e)=>{
    e.preventDefault();
    
    let cityname = Searchinput.value;

    if(cityname===""){
        return;
    }
    else{
        fetchSearchWeatherInfo(cityname);
        console.log("successfully called");
        
    }
})

async function fetchSearchWeatherInfo(cityname){
    loader.classList.add("active");
    showweather.classList.remove("active");
    grantlocationcontainer.classList.remove("active");
    try{
       const response = await fetch(`https://api.openweathermap.org/data/2.5/weather?q=${cityname}&appid=${Apikey}&units=metric`);
       
       const data = await response.json();
       if (!data.sys) {
        throw data;
      }
      
    
       loader.classList.remove("active");
       showweather.classList.add("active");
       
       renderWeatherInfo(data);


    }
    catch (error){
        loader.classList.remove("active");
        apiErrorContainer.classList.add("active");
        apiErrorMessage.innerText = `${error?.message}`;
        apiErrorBtn.style.display = "none";
        console.log('cale');
       
        
    }

}




