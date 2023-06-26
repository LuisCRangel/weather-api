import { useEffect, useState } from "react";
import "./App.css";
import axios from "axios";
import getApiKey from './utils/getApiKey'
import WeatherCard from "./components/WeatherCard";
import ScreenLoader from "./components/ScreenLoader";
import WeatherInfo from "./components/WeatherInfo";
import WeatherSearch from "./components/WeatherSearch";

function App() {
  const [coords, setCoords] = useState();
  const [weather, setWeather] = useState()
  const [isCelsius, setIsCelsius] = useState(true)
  const [isLoading, setIsLoading] = useState(true)
  const [location, setLocation] = useState('')
  
  const url = `https://api.openweathermap.org/data/2.5/weather?q=${location}&appid=11f454bba8d12a609037a9df59b0478f`

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
      })
      .catch(err => console.log(err))
      .finally(setIsLoading(false))
    }
  },[coords])


  const handelChangeTemp = () => setIsCelsius(!isCelsius)
  

  const searchLocation = (event) => {
    if (event.key === 'Enter') {
      axios.get(url)
      .then((res) => {setWeather(res.data)    
      })
      .catch(err => {
        console.log(err)})
      setLocation('')
    }
  }

  console.log(weather)

  return (
    <div className={`app weather-${weather?.weather[0].main}`}>     
      {
        isLoading
        ? <ScreenLoader />
        : 
        <>
        <WeatherSearch 
       location={location}
        setLocation={setLocation}
        searchLocation={searchLocation}
        />
        <WeatherCard 
        weather={weather}
        handelChangeTemp={handelChangeTemp}    
        isCelsius={isCelsius}  
        />
         <WeatherInfo 
      weather={weather} 
      />
        </>
      }
      
    </div>
  );
}

export default App;
