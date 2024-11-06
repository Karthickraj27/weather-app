import { useEffect, useState } from 'react';

import './App.css';
import PropTypes  from "prop-types";
import searchIcon from "./assets/search.png";
import clearIcon from "./assets/clear.png";
import drizzleIcon from "./assets/drizzle.png";
import rainIcon from "./assets/rain.png";
import snowIcon from "./assets/snow.png";
import windIcon from "./assets/wind.png";
import humidityIcon from "./assets/humidity.png";
import cloudIcon from "./assets/clouds.png";
const WeatherDetails=({icon,temp,city,country,lat,log,humidity,wind})=>{
  return(
  <>
  <div className='image'> <img src={icon} alt="image"></img></div>
  <div className="temp">{temp}°C</div>
  <div className="location">{city}</div>
  <div className="country">{country}</div>
  <div className="cord">
    <div>
      <span className='lat'>Lattitude</span>
      <span>{lat}</span>
    </div>
  
  <div>
      <span className='log'>Longitude</span>
      <span>{log}</span>
    </div>
    </div>
    <div className="data_Container">
      <div className='element'>
        <img src={humidityIcon} alt="humidity"
        className='icon'></img>
        <div className="data">
          <div className="humidity_percent">{humidity}%</div>
          <div className="text">Humidity</div>
        </div>
      </div>
      <div className='element'>
        <img src={windIcon} alt="wind"
        className='icon'></img>
        <div className="data">
          <div className="wind_percent">{wind} km/h</div>
          <div className="text">wind speed</div>
        </div>
      </div>
    </div>
  
  </>);
}



WeatherDetails.propTypes={
  icon:PropTypes.string.isRequired,
  temp:PropTypes.number.isRequired,
  city:PropTypes.string.isRequired,
  country:PropTypes.string.isRequired,
  humidity:PropTypes.number.isRequired,
  wind:PropTypes.number.isRequired,
  lat:PropTypes.number.isRequired,
  log:PropTypes.number.isRequired,
}

function App() {
  let api_key= "90673d0f05ed96819cf07fd84848644d";
  const [text,setText]=useState("chennai")
  const [icon,setIcon] =useState(snowIcon);
  const [temp,setTemp] =useState(0);
  const [city,setCity] =useState("");
  const [country,setCountry] =useState("");
  const [lat,setLat] =useState(0);
  const [log,setLog] =useState(0);
  const [humidity,setHumidity] =useState(0);
  const [wind,setWind] =useState(0);
  const [cityNotFound,setcityNotFound]=useState(false);
  const [loading,setLoading]=useState(false);
  const[error,setError]= useState(null);
  const weatherIconMap ={
    "01d": clearIcon,
    "01n": clearIcon,
    "02n": cloudIcon,
    "02d":cloudIcon,
    "03d": drizzleIcon,
    "03n":drizzleIcon,
    "04d": drizzleIcon,
    "04n": drizzleIcon,
    "09d": rainIcon,
    "09n": rainIcon,
    "10d": rainIcon,
    "10n": rainIcon,
    "13d": snowIcon,
    "13n": snowIcon,

  };

  
  const search = async () => {
    let url = `https://api.openweathermap.org/data/2.5/weather?q=${text}&appid=${api_key}&units=Metric`;
    try {
      let res = await fetch(url);
      let data = await res.json();
      if (data.cod === "404") {
        console.error("city not found");
        setcityNotFound(true);
        setLoading(false);
        return;
      }
      setHumidity(data.main.humidity);
      setWind(data.wind.speed);
      setTemp(Math.floor(data.main.temp));
      setCity(data.name);
      setCountry(data.sys.country);
      setLat(data.coord.lat);
      setLog(data.coord.lon);
      const weatherIconCode = data.weather[0].icon;
      setIcon(weatherIconMap[weatherIconCode] || clearIcon);
      cityNotFound(false);
    } catch (error) 
    { console.error("city not found")
     setcityNotFound(false);
     
    } finally {
      setLoading(false);
    }
  };
  
  
  const handleCity=(e) => {
    setText(e.target.value);};
    
  const handleKeyDown=(e) =>{
    if (e.key =="Enter"){
    search();
    }
  

  }
  ;
  useEffect(function (){
    search();
  },[]);

  
  
  
    return (
    <>
      <div className='container'>
        <div className='input-container'>
          <input type="text"
          className="cityInput"
          placeholder='Search City' onChange={handleCity} value={text} onKeyDown={handleKeyDown}></input>
          <div className='search_icon' onClick={()=>search()}>
            <img src={searchIcon} alt="search"/>

          </div>

        </div>
        {loading && <div className="loading_message">Loading...</div>}
        {error && <div className='error_message'>{error}</div>}
        {cityNotFound && <div className="city_not_found">City Not Found</div>}
        { !loading && !cityNotFound && <WeatherDetails icon={icon} temp={temp} city={city} country={country} lat={lat} log={log} humidity={humidity} wind={wind}/>}

       
        <p className='copyright'>Designed by <span> Karthick </span></p>
        
        </div>
        
    </>
  )
}

export default App
