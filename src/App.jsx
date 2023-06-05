import { useEffect, useState } from "react";
import "./App.css";
import axios from "axios";
import getApiKey from './utils/getApiKey'
import WeatherCard from "./components/WeatherCard";
import ScreenLoader from "./components/ScreenLoader";
import WeatherInfo from "./components/WeatherInfo";

function App() {
  const [coords, setCoords] = useState();
  const [weather, setWeather] = useState()
  const [temp, setTemp] = useState()
  const [isCelsius, setIsCelsius] = useState(true)
  const [isLoading, setIsLoading] = useState(true)

  useEffect(() => {
    const success = (pos) => {  
      const obj = {
        lat: pos.coords.latitude,
        lon: pos.coords.longitude
      };
      setCoords(obj);
    };
    navigator.geolocation.getCurrentPosition(success);
  }, []);

  useEffect(() => {
    if(coords){
      setIsLoading(true)
      const url = `https://api.openweathermap.org/data/2.5/weather?lat=${coords?.lat}&lon=${coords?.lon}&appid=${getApiKey()}`      
      axios.get(url)
      .then(res => {
        setWeather(res.data)
        const objTemp ={
          celcius: +(res.data.main.temp - 273.15).toFixed(0),
          farenheit: +( (res.data.main.temp - 273.15) * 9/5 +32).toFixed(0),
          min: +(res.data.main.temp_min -273.15).toFixed(0),
          max: +(res.data.main.temp_max -273.15).toFixed(0),
        }
        setTemp(objTemp)
      })
      .catch(err => console.log(err))
      .finally(setIsLoading(false))
    }
  },[coords])


  const handelChangeTemp = () => {
    setIsCelsius(!isCelsius)
  }

  return (
    <div className={`app weather-${weather?.weather[0].main}`}>     
      {
        isLoading
        ? <ScreenLoader />
        : 
        <WeatherCard 
        weather={weather}
        handelChangeTemp={handelChangeTemp}    
        isCelsius={isCelsius}
        temp={temp}s
        /> 
      }
      <WeatherInfo 
      weather={weather}
      temp={temp}
      />
    </div>
  );
}

export default App;
