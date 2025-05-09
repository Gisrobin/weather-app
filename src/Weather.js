import React from 'react';
import './App.css'; // Optional: Separate style file if needed

function Weather({ data, unit }) {
  const iconUrl = `https://openweathermap.org/img/wn/${data.weather[0].icon}@2x.png`;
  const tempUnit = unit === 'metric' ? '°C' : '°F';
  const weatherMain = data.weather[0].main.toLowerCase();

  return (
    <div className={`weather-card ${weatherMain}`}>
      <h2>{data.name}, {data.sys.country}</h2>
      <img src={iconUrl} alt={data.weather[0].description} />
      <h3>{data.weather[0].main} 🌤️</h3>
      <p>{data.weather[0].description}</p>
      <p>🌡️ Temp: {data.main.temp}{tempUnit}</p>
      <p>🤒 Feels Like: {data.main.feels_like}{tempUnit}</p>
      <p>💧 Humidity: {data.main.humidity}%</p>
      <p>🌬️ Wind: {data.wind.speed} {unit === 'metric' ? 'm/s' : 'mph'}</p>
    </div>
  );
}

export default Weather;