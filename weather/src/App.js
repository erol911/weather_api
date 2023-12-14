import React, { useState, useRef, useEffect } from 'react';
import axios from 'axios';
import './App.css';

const WeatherApp = () => {
  const [city, setCity] = useState('');
  const [weatherData, setWeatherData] = useState(null);
  const [error, setError] = useState('');
  const inputRef = useRef(null);

  const handleSubmit = () => {
    const cityValue = inputRef.current.value;
    if (cityValue) {
      setCity(cityValue);
      setError('')
    } else {
      setError('Lütfen geçerli bir şehir giriniz.')
    }
  };

  useEffect(() => {
    if (city) {
      const API_KEY = 'f6096e60c6a5b34f44c0a251cbd30900'; 
      const API_URL = `https://api.openweathermap.org/data/2.5/weather?q=${city}&appid=${API_KEY}&units=metric&lang=tr`;

      axios.get(API_URL)
        .then((response) => {
          setWeatherData(response.data);
          setError('')
          console.log(response.data)
        })
        .catch((error) => {
          console.error('Error fetching weather data:', error);
          setWeatherData(null);
          if (error.response) {
            // Serverden gelen hata durumu
            setError('Şehir bulunamadı. Lütfen geçerli bir şehir adı girin.');
          } else if (error.request) {
            // İstek yapılamadı
            setError('Hava durumu bilgilerini getirirken bir sorun oluştu. Lütfen daha sonra tekrar deneyin.');
          } else {
            // Diğer hatalar
            setError('Bir hata oluştu. Lütfen daha sonra tekrar deneyin.');
          }
        });
        
    }

  }, [city]);
  
  return (
    <div className="weather-container">
      <div className="input-container">
        <input
          type="text"
          placeholder="Şehir girin..."
          ref={inputRef}
        />
        <button onClick={handleSubmit}>Hava Durumu Getir</button>
      </div>

      {error && (
        <div className="error-message">
          {error}
        </div>
      )}

      {weatherData && !error && (
        <div className="weather-info">
          <h2>{weatherData.name} Hava Durumu</h2>
          <p>Sıcaklık: {weatherData.main.temp}°C</p>
          <p>Hissedilen Sıcaklık: {weatherData.main.feels_like}°C</p>
          <p>Hava Durumu: {weatherData.weather[0].description}</p>
          <p>Nem Oranı: % {weatherData.main.humidity}</p>                   
        </div>
      )}
    </div>
  );
};

export default WeatherApp;
