import "./Weather.css"
import search_icon from "../assets/Search.jpg"
import weather_icon from "../assets/sun.png"
import humidity_icon from "../assets/humidity.png"
import wind_icon from "../assets/wind.png"
import clear_icon from "../assets/cleaning.png"
import cloud_icon from "../assets/cloud.png"
import drizzle_icon from "../assets/cloudy.png"
import snow_icon from "../assets/stalactite.png"
import rain_icon from "../assets/rain.png"
import {useState,useEffect} from "react"

const Weather = () => {

    const [weatherData,setweatherData]=useState(false);
    const allIcons={
        "01d":clear_icon,
        "01n":clear_icon,
        "02d":cloud_icon,
        "02n":cloud_icon,
        "03d":cloud_icon,
        "03n":cloud_icon,
        "04d":drizzle_icon,
        "04n":drizzle_icon,
        "09d":rain_icon,
        "09n":rain_icon,
        "10d":rain_icon,
        "10n":rain_icon,
        "13d":snow_icon,
        "13n":snow_icon,

    }
    const search=async(city)=>{
        if(city === ""){
            alert("Enter City Name");
            return;
        }
        try {
            const url=`https://api.openweathermap.org/data/2.5/weather?q=${city}&units=metric&appid=cbf9cfb942c0b4c08b4e76b05a54b37f`;
            const response=await fetch(url);
            const data=await response.json();
            
            if(!response.ok){
                alert(data.message);
                return;
            }
            
            console.log(data);
            const icon=allIcons[data.weather[0].icon] || clear_icon;
            setweatherData({
                humidity:data.main.humidity,
                windSpeed:data.wind.speed,
                temperature:Math.floor(data.main.temp),
                location:data.name,
                icon: icon
            })
        } catch (error) {
            setweatherData(false);
            console.error("Error in fetching weather data");
        }
    }
    useEffect(()=>{
        search("London");
    },[])
    
  return (
    
    <div className="weather">
        <div className="search-bar">
            <input type="text" placeholder='Search'/>
            <img src={search_icon} alt="" onClick={(e)=>{
                search(e.target.previousSibling.value)
            }} />
        </div>
        {weatherData?<>
        <img src={weatherData.icon} alt=""  className="weather-icon"/>
        <p className="temperature">{weatherData.temperature}°C</p>
        <p className="location">{weatherData.location}</p>
        <div className="weather-data">
            <div className="col1">
                <img src={humidity_icon} alt="humidity" />
                <div>
                    <p>{weatherData.humidity}%</p>
                    <span>Humidity</span>
                </div>
            </div>

            <div className="col2">
                <img src={wind_icon} alt="wind speed" />
                <div>
                    <p>{weatherData.windSpeed} km/hr</p>
                    <span>Wind Speed</span>
                </div>
            </div>
        </div>
        </>:<></>}
    </div>
    
    
  )
}

export default Weather