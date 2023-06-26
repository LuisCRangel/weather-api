import React from "react";


const Input = ({location, setLocation,searchLocation}) => {

    const getlocation = (event) =>{
        setLocation(event.target.value)
    }
    
  return (
    <div className="search">
      <input
        value={location}
        onChange={getlocation}
        onKeyPress={searchLocation}
        placeholder="Enter Location 🔎"
        type="text"
      />  
      <img className="search__img" src="https://freepngimg.com/thumb/weather/23525-5-weather-free-download.png" alt="" />

    </div>
  );
};

export default Input;