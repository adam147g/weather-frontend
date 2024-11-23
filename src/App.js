import React, { useState, useEffect } from 'react';
import { getWeatherForecast, getWeeklySummary } from './services/weatherService';
import WeatherIcon from './utils/weatherIcons';

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
  
  function convertSecondsToTime(seconds) {
    const hours = Math.floor(seconds / 3600);
    seconds %= 3600;
    const minutes = Math.floor(seconds / 60);
    const remainingSeconds = Math.round(seconds % 60);

    // Zwracamy wynik w formacie HH:MM:SS
    return `${hours}h ${minutes}m ${remainingSeconds}s`;
  }

  return (
    <div>
      <h1>Prognoza pogody</h1>
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
          <h2>Prognoza na 7 dni:</h2>
          <table>
            <thead>
              <tr>
                {forecastWeather.days.map((day, index) => (
                  <th key={index}>{new Date(day.date).toLocaleDateString()}</th>
                ))}
              </tr>
            </thead>
            <tbody>
              <tr>
                {forecastWeather.days.map((day, index) => (
                  <td key={index}>
                    <div> <WeatherIcon code={day.weatherCode} /></div>
                    <div>Temp: {day.minTemperature}{forecastWeather.daily_units.minTemperature} / {day.maxTemperature}{forecastWeather.daily_units.maxTemperature}</div>
                    <div>Szacowana energia: {day.estimatedEnergy} {forecastWeather.daily_units.estimatedEnergy}</div>
                  </td>
                ))}
              </tr>
            </tbody>
          </table>
        </div>
      ) : (
        coordinates && <p>Ładowanie prognozy pogody...</p>
      )}

      {weeklySummary ? (
        <div>
          <h2>Podsumowanie tygodnia:</h2>
          <p><strong>Skrajne temperatury w tym tygodniu:</strong> {weeklySummary.weekly_summary.minTemperature}{weeklySummary.weekly_summary_units.minTemperature} - {weeklySummary.weekly_summary.maxTemperature}{weeklySummary.weekly_summary_units.maxTemperature}</p>
          <p><strong>Średnie ciśnienie:</strong> {weeklySummary.weekly_summary.averageSurfacePressure} {weeklySummary.weekly_summary_units.averageSurfacePressure}</p>
          <p><strong>Średni czas ekspozycji na słońce:</strong> { 
            weeklySummary.weekly_summary_units.averageSunshineDuration === "s" ? 
              convertSecondsToTime(weeklySummary.weekly_summary.averageSunshineDuration) : 
              `${weeklySummary.weekly_summary.averageSunshineDuration} ${weeklySummary.weekly_summary_units.averageSunshineDuration}`
          }</p>
          <p><strong>Podsumowanie pogody:</strong> {weeklySummary.weekly_summary.weatherSummary}</p>
        </div>
      ) : (
        coordinates && <p>Ładowanie podsumowania pogody...</p>
      )}
    </div>
  );
};
export default App;