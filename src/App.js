import React, { useState, useEffect } from 'react';
import { getWeatherForecast, getWeeklySummary } from './services/weatherService';

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
          console.log('STARTTTT1');
          const forecast = await getWeatherForecast(latitude, longitude);
          setForecastWeather(forecast);
        } catch (error) {
          console.error('Błąd podczas pobierania pogody:', error.message);
          setError('Błąd podczas pobierania prognozy pogody.');
        }
        try {
          console.log('STARTTTT2');
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
      <h1>Weather App</h1>
      {error && <p style={{ color: 'red' }}>{error}</p>}

      {coordinates ? (
        <div>
          <p><strong>Współrzędne:</strong></p>
          <p>Szerokość geograficzna: {coordinates.latitude}</p>
          <p>Długość geograficzna: {coordinates.longitude}</p>
        </div>
      ) : (
        <p>Ładowanie współrzędnych...</p>
      )}

      {forecastWeather ? (
        <div>
          <h2>Prognoza pogody:</h2>
          <pre>{JSON.stringify(forecastWeather, null, 2)}</pre>
        </div>
      ) : (
        coordinates && <p>Ładowanie prognozy pogody...</p>
      )}

      {weeklySummary ? (
        <div>
          <h2>Podsumowanie pogody:</h2>
          <pre>{JSON.stringify(weeklySummary, null, 2)}</pre>
        </div>
      ) : (
        coordinates && <p>Ładowanie podsumowania pogody...</p>
      )}
    </div>
  );
};

export default App;