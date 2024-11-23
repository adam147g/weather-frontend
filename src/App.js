// App.js
import React, { useState, useEffect } from 'react';
import { getWeatherForecast, getWeeklySummary } from './services/weatherService';
import ForecastWeather from './components/forecastWeather';
import WeeklySummary from './components/weeklySummary';

const App = () => {
  const [coordinates, setCoordinates] = useState(null);
  const [forecastWeather, setForecastWeather] = useState(null);
  const [weeklySummary, setWeeklySummary] = useState(null);
  const [error, setError] = useState(null);

  useEffect(() => {
    // Funkcja do uzyskania współrzędnych geograficznych
    const getLocation = () => {
      if (navigator.geolocation) {
        navigator.geolocation.getCurrentPosition(
          (position) => {
            const latitude = position.coords.latitude;
            const longitude = position.coords.longitude;
            setCoordinates({ latitude, longitude });
          },
          (error) => {
            console.error('Błąd podczas uzyskiwania lokalizacji:', error);
            setError('Nie udało się uzyskać lokalizacji.');
          }
        );
      } else {
        console.error('Geolokalizacja nie jest wspierana w tej przeglądarce.');
        setError('Geolokalizacja nie jest wspierana w tej przeglądarce.');
      }
    };

    getLocation();
  }, []);

  useEffect(() => {
    if (coordinates) {
      const { latitude, longitude } = coordinates;

      const fetchWeather = async () => {
        try {
          const forecast = await getWeatherForecast(latitude, longitude);
          setForecastWeather(forecast);
        } catch (error) {
          console.error('Błąd podczas pobierania pogody:', error.message);
          setError('Błąd podczas pobierania prognozy pogody.');
        }
        try {
          const summary = await getWeeklySummary(latitude, longitude);
          setWeeklySummary(summary)
        } catch (error) {
          console.error('Błąd podczas pobierania podsumowania pogody:', error.message);
          setError('Błąd podczas pobierania podsumowania pogody.');
        }
      };

      fetchWeather();
    }
  }, [coordinates]);
  


  return (
    <div>
      <h1>Prognoza pogody</h1>
      {error && <p style={{ color: 'red' }}>{error}</p>}

      {coordinates ? (
        <div>
          <p><strong>Współrzędne geograficzne:</strong></p>
          <p>{coordinates.latitude !== 0 ? `${Math.abs(coordinates.latitude)}°
          ${coordinates.latitude < 0 ? 'S' : 'N'}` : '0°'} /  
        {coordinates.longitude !== 0 ? `${Math.abs(coordinates.longitude)}°
          ${coordinates.longitude < 0 ? 'W' : 'E'}` : '0°'}</p>
        </div>
      ) : (
        <p>Ładowanie współrzędnych...</p>
      )}

      {forecastWeather ? (
        <ForecastWeather forecastWeather={forecastWeather} />
      ) : (
        coordinates && <p>Ładowanie prognozy pogody...</p>
      )}

      {weeklySummary ? (
        <WeeklySummary weeklySummary={weeklySummary} />
      ) : (
        coordinates && <p>Ładowanie podsumowania pogody...</p>
      )}
    </div>
  );
};
export default App;