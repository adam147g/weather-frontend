// App.js
import React, { useState, useEffect } from 'react';
import { getWeatherForecast, getWeeklySummary } from './services/weatherService';
import ForecastWeather from './components/forecastWeather';
import WeeklySummary from './components/weeklySummary';
import ThemeToggle from './components/themeToggle';
import MapWithCoordinates from './components/mapComponent.js';
import './App.css'; 

const App = () => {
  const [coordinates, setCoordinates] = useState(null);
  const [forecastWeather, setForecastWeather] = useState(null);
  const [weeklySummary, setWeeklySummary] = useState(null);
  const [error, setError] = useState(null);
  const [isLightMode, setIsLightMode] = useState(true);
  const [locationMode, setLocationMode] = useState('manual');
  const [manualCoordinates, setManualCoordinates] = useState({ latitude: '', longitude: '' });
  const [showMap, setShowMap] = useState(false);

  useEffect(() => {
    document.body.classList.toggle('light', isLightMode);
    document.body.classList.toggle('dark', !isLightMode);
  }, [isLightMode]);


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

    if (locationMode === 'current') {
      getLocation();
    } else if (locationMode === 'manual' && manualCoordinates.latitude && manualCoordinates.longitude) {
      setCoordinates(manualCoordinates);
    }
  }, [locationMode, manualCoordinates]);

  useEffect(() => {
    if (coordinates) {
      const { latitude, longitude } = coordinates;

      const fetchWeather = async () => {
        try {
          const forecast = await getWeatherForecast(latitude, longitude);
          setForecastWeather(forecast);
          setError(null);
        } catch (error) {
          console.error('Błąd podczas pobierania pogody:', error.message);
          setError('Błąd podczas pobierania prognozy pogody.');
        }
        try {
          const summary = await getWeeklySummary(latitude, longitude);
          setWeeklySummary(summary)
          setError(null);
        } catch (error) {
          console.error('Błąd podczas pobierania podsumowania pogody:', error.message);
          setError('Błąd podczas pobierania podsumowania pogody.');
        }
      };

      fetchWeather();
    }
  }, [coordinates]);

  const handleThemeToggle = (isLightMode) => {
    setIsLightMode(isLightMode);
  };

  const handleManualCoordinatesChange = (e) => {
    const { name, value } = e.target;
    setManualCoordinates((prev) => ({
      ...prev,
      [name]: value,
    }));
  };

  const handleMapShowing = () => {
    setShowMap(!showMap);
  };

  
  return (
    
    <div>
      

      {/* Sekcja przełącznika trybu jasnego i ciemnego */}
      <div>
        <ThemeToggle onToggle={handleThemeToggle} />
      </div>
      
      <div className='choice'>
        <button onClick={() => setLocationMode('current')}>Obecna lokalizacja</button>
        <button onClick={() => setLocationMode('manual')}>Ręczne współrzędne</button>
        <button onClick={handleMapShowing}>Pokaż mapę</button>
      </div>
      {showMap ? 
      <div>
      <MapWithCoordinates setCoordinates={setCoordinates}/>
      </div> : ""
      }
      

      {/* Wybór lokalizacji */}
      {locationMode === 'manual' ? (
        <div>
          <div className="input-coordinates-container">
            <label>
              Wprowadź szerokość geograficzną (latitude):
              <input
                type="number"
                name="latitude"
                value={manualCoordinates.latitude}
                onChange={handleManualCoordinatesChange}
              />
            </label>
            
          </div>
          <div className="input-coordinates-container">
            <label>
            Wprowadź długość geograficzną (longitude):
            <input
              type="number"
              name="longitude"
              value={manualCoordinates.longitude}
              onChange={handleManualCoordinatesChange}
            />
          </label>
        </div>
      </div>
      ) : null}
      {error ? <p class="error-message">Podaj współrzędne w postaci liczb: szerokość geograficzna [-90, 90], długość geograficzna [-180, 180]</p> : ""}
      {coordinates ? (
        <div>
        <p id='coordinates-title'><strong>Współrzędne geograficzne:</strong></p>
        <p id='coordinates'>
          {coordinates.latitude !== 0 
            ? `${Math.abs(coordinates.latitude).toFixed(5)}° ${coordinates.latitude < 0 ? 'S' : 'N'}` 
            : '0°'} /  
          {coordinates.longitude !== 0 
            ? `${Math.abs(coordinates.longitude).toFixed(5)}° ${coordinates.longitude < 0 ? 'W' : 'E'}` 
            : '0°'}
        </p>
      </div>
      
      ) : (
        <p>Ładowanie współrzędnych...</p>
      )}

      

      <h1>Prognoza pogody</h1>
      {error && <p class="error-message">{error}</p>}


      {forecastWeather && !error ? (
        <ForecastWeather forecastWeather={forecastWeather} isLightMode={isLightMode} />
      ) : (
        coordinates && <p>Ładowanie prognozy pogody...</p>
      )}

      {weeklySummary&& !error ? (
        <WeeklySummary weeklySummary={weeklySummary} />
      ) : (
        coordinates && <p>Ładowanie podsumowania pogody...</p>
      )}
    </div>
  );
};
export default App;