const WeatherInfo = ({weather}) => {
  return (    
       <div className='weather__info'>    
    <ul className="card__weather-items">
      <li>Wind Speed: <span>{weather?.wind.speed} m/s</span><p><i className='bx bx-wind'></i></p></li>
      <li>Clouds: <span>{weather?.clouds.all}%</span><p><i className='bx bx-cloud'></i></p></li>
      <li>Pressure: <span>{weather?.main.pressure} hPa</span><p><i className='bx bx-trending-down'></i></p></li>
      <li>Humidity: <span>{weather?.main.humidity}%</span><p><i className='bx bx-droplet'></i></p></li>
      <li>Temp Min: <span>{(weather?.main.temp_min - 273.15).toFixed(1)} °C</span><p><i className='bx bxs-thermometer' ></i></p></li>
      <li>Temp Max: <span>{(weather?.main.temp_max - 273.15).toFixed(1)} °C</span><p><i className='bx bxs-thermometer' ></i></p></li>
    </ul>    
      </div> 
  )
}

export default WeatherInfo