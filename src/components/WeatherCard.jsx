const WeatherCard = ({ weather, isCelsius, handelChangeTemp }) => {
  return (
    <article className="card__weather">
      <header>
        <h1>Weather App</h1>
      </header>
      <section>
        <div>
          <h2 className="card__weather-temp">
            {isCelsius ? (weather?.main.temp - 273.15).toFixed(1) + " °C" : ((weather?.main.temp - 273.15) * 9/5 +32).toFixed(1) + " °F" }
          
          </h2>
          <img
            src={
              weather
                ? `https://openweathermap.org/img/wn/${weather?.weather[0].icon}@4x.png`
                : ""
            }
            alt=""
          />
          <h3 className="card__weather-condition">
            {weather?.weather[0].description}
          </h3>
          <h2 className="card__weather-city">
            {weather?.name}, {weather?.sys.country}
          </h2>
        </div>
        <button onClick={handelChangeTemp} className="card__weather-button">
          {isCelsius ? "Convert to F°" : "Convert to °C"}
        </button>
      </section>
    </article>
  );
};

export default WeatherCard;
