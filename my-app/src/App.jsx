import React, { useState } from "react";
import "./App.css";

function App() {
  const [weather, setWeather] = useState(null);
  const [city, setCity] = useState("");

  async function handleWeather() {
    const API_KEY = "f9e13555a1b8aa1604349bc7a8a0bef7";
    const url = `https://api.openweathermap.org/data/2.5/weather?q=${city}&appid=${API_KEY}`;

    try {
      const result = await fetch(url);
      const response = await result.json();

      if (response.cod === 200) {
        setWeather(response);
      } else {
        setWeather(null);
        alert("City not found");
      }
    } catch (error) {
      alert("Error fetching weather");
    }
  }

  return (
    <div className="app-container">
      <h1 className="title">🌤️ Weather Forecast</h1>

      <div className="input-section">
        <input
          type="text"
          value={city}
          onChange={(e) => setCity(e.target.value)}
          onKeyDown={(e) => e.key === 'Enter' && handleWeather()}
          placeholder="Enter city name"
          className="input"
        />
        <button onClick={handleWeather} className="button">
          Get Weather
        </button>
      </div>

      {weather && (
        <div className="card">
          <div className="top">
            <h2>{weather.name}</h2>
            <img
              src={`http://openweathermap.org/img/wn/${weather.weather[0].icon}@4x.png`}
              alt="weather icon"
              className="icon"
            />
          </div>
          <div className="details">
            <p><strong>Temperature:</strong> {(weather.main.temp - 273.15).toFixed(1)}°C</p>
            <p><strong>Condition:</strong> {weather.weather[0].main}</p>
            <p><strong>Description:</strong> {weather.weather[0].description}</p>
            <p><strong>Humidity:</strong> {weather.main.humidity}%</p>
            <p><strong>Wind Speed:</strong> {weather.wind.speed} m/s</p>
          </div>
        </div>
      )}
    </div>
  );
}

export default App;

