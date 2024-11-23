// ForecastWeather.js
import React from 'react';
import './forecastWeather.css';
import WeatherIcon from '../utils/weatherIcons';

const ForecastWeather = ({ forecastWeather }) => {
    return (
      <div className="forecast-container">
        <h2>Prognoza na 7 dni:</h2>
        <div className="forecast-table">
          {forecastWeather.days.map((day, index) => (
            <div key={index} className="forecast-cell">
              <p className='date'>{new Date(day.date).toLocaleDateString()}</p>
              <div className='icon'><WeatherIcon code={day.weatherCode} /></div>
              <div className="temperature">
                Temp: {day.minTemperature}{forecastWeather.daily_units.minTemperature} / {day.maxTemperature}{forecastWeather.daily_units.maxTemperature}
              </div>
              <div className="energy">
                Szacowana energia: {day.estimatedEnergy} {forecastWeather.daily_units.estimatedEnergy}
              </div>
            </div>
          ))}
        </div>
      </div>
    );
  };
  
  export default ForecastWeather;