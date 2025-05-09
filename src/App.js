import React, { useState } from 'react';
import Weather from './Weather';
import './App.css';

function App() {
  const [city, setCity] = useState('');
  const [weatherData, setWeatherData] = useState(null);
  const [unit, setUnit] = useState('metric'); // 'metric' or 'imperial'
  const [loading, setLoading] = useState(false);

  const apiKey = '0f391127a105f6dd8cf5981d1af37be0'; // Replace with your API key

  const fetchWeather = async () => {
    if (!city) return;
    setLoading(true);
    const url = `https://api.openweathermap.org/data/2.5/weather?q=${city}&appid=${apiKey}&units=${unit}`;

    try {
      const response = await fetch(url);
      if (!response.ok) throw new Error('City not found');
      const data = await response.json();
      setWeatherData(data);
    } catch (error) {
      alert(error.message);
    } finally {
      setLoading(false);
    }
  };

  const handleKeyPress = (e) => {
    if (e.key === 'Enter') {
      fetchWeather();
    }
  };

  const toggleUnit = () => {
    setUnit((prevUnit) => (prevUnit === 'metric' ? 'imperial' : 'metric'));
    setWeatherData(null); // Clear old data until refetch
  };

  return (
    <div className="app">
      <h1>🌤️ Robin's Weather App</h1>
      <div className="controls">
        <input
          type="text"
          placeholder="Enter city..."
          value={city}
          onChange={(e) => setCity(e.target.value)}
          onKeyPress={handleKeyPress}
        />
        <button onClick={fetchWeather}>Get Weather</button>
        <button onClick={toggleUnit}>
          Switch to {unit === 'metric' ? '°F' : '°C'}
        </button>
      </div>

      {loading && <p>Loading...</p>}
      {weatherData && <Weather data={weatherData} unit={unit} />}
    </div>
  );
}

export default App;