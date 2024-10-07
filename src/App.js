import React, { useEffect, useState } from "react";
import "./App.css";

const api = {
  key: "24a50225c459b3b6b8cafba62baedc58",
  base: "https://api.openweathermap.org/data/2.5/",
};

function App() {
  const [searchInput, setSearchInput] = useState("");
  const [searchCity, setSearchCity] = useState("");
  const [weatherInfo, setWeatherInfo] = useState("");
  const [loading, setLoading] = useState(false);
  const [errorMessage, setErrorMessage] = useState("");

  useEffect(() => {
    async function fetchWeatherData() {
      if (!searchCity) {
        return;
      }
      setLoading(true);
      // Process fetch data
      try {
        const URL = `${api.base}weather?q=${searchCity}&units=metric&APPID=${api.key}`;
        const response = await fetch(URL);
        const data = await response.json();
        if (response.ok) {
          //   setWeatherInfo(JSON.stringify(data));
          setWeatherInfo(
            `Location: ${data.name}, ${data.sys.country},
            Weather: ${data.weather[0].description},
            Degree: ${data.main.temp}`
          );
          setErrorMessage("");
        } else {
          setErrorMessage(data.message);
        }
      } catch (error) {
        setErrorMessage(error.mesage);
      }
      setLoading(false);
    }
    fetchWeatherData();
  }, [searchCity]);

  const handleSubmit = (event) => {
    event.preventDefault();
    setSearchCity(searchInput);
  };
  return (
    <div className="container">
      <h1>Weather App</h1>
      <form onSubmit={handleSubmit}>
        <input
          value={searchInput}
          onChange={(event) => setSearchInput(event.target.value)}
          type="text"
          placeholder="City name"
        />
        <button>Search</button>
      </form>
      {loading ? (
        <p>Loading ding ding....</p>
      ) : (
        <>
          {errorMessage ? (
            <p className="error">{errorMessage}</p>
          ) : (
            <p>{weatherInfo}</p>
          )}
        </>
      )}
    </div>
  );
}

export default App;
