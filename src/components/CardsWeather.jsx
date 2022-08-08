import axios from "axios";
import React, { useEffect, useState } from "react";
import LoadingScreen from "./LoadingScreen";

const CardsWeather = ({ lat, lon }) => {
  const [weather, setWeather] = useState();
  const [temperture, setTemperture] = useState();
  const [IsCelsius, setIsCelsius] = useState(true);
  const [isLoading, setIsLoading] = useState(true);

  useEffect(() => {
    if (lat) {
      const APIKey = "dc426c411d63cb90905b6469d6ec4bb7";
      const URL = `https://api.openweathermap.org/data/2.5/weather?lat=${lat}&lon=${lon}&appid=${APIKey}`;

      axios
        .get(URL)
        .then((res) => {
          setWeather(res.data);
          const temp = {
            celsius: `${Math.round(res.data.main.temp - 273.15)} ºC`,
            farenheit: `${Math.round(
              ((res.data.main.temp - 273.15) * 9) / 5 + 32
            )} ºF`
          }

          setTemperture(temp)
          setIsLoading(false)
        })
        .catch((err) => console.log(err));
    }
  }, [lat, lon])

  //  console.log(weather);

  const handleClick = () => setIsCelsius(!IsCelsius);

  if (isLoading) {
    return <LoadingScreen />

  } else {
    return (
      <article className="container">
        <h1>Weather App</h1>
        <h2>{`${weather?.name}, ${weather?.sys.country}`} </h2>

        <div>
          <img
            src={
              weather &&
              `http://openweathermap.org/img/wn/${weather?.weather[0].icon}@4x.png`
            }
            alt=""
          />

          <div>
            <h3>&#34;{weather?.weather[0].description}&#34;</h3>

            <ul>
              <li>
                <span>Wind Speed: </span>
                {weather?.wind.speed} m/s
              </li>
              <li>
                <span>Clouds: </span>
                {weather?.clouds.all} %
              </li>
              <li>
                <span>Presure: </span>
                {weather?.main.pressure} hPa
              </li>
            </ul>
          </div>
        </div>

        <h2>{IsCelsius ? temperture?.celsius : temperture?.farenheit}</h2>
        <button onClick={handleClick}>
          {IsCelsius ? "Change to ºF" : "Change to ºC"}
        </button>
      </article>
    );
  }
};

export default CardsWeather;
