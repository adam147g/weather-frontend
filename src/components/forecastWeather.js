// ForecastWeather.js
import React from 'react';
import './forecastWeather.css';
import WeatherIcon from '../utils/weatherIcons';

const ForecastWeather = ({ forecastWeather , isLightMode}) => {
    return (
      <div className={`forecast-container ${isLightMode ? 'light' : 'dark'}`}>
        <h2>Prognoza na 7 dni:</h2>
        <div className="forecast-table">
          {forecastWeather.days.map((day, index) => (
            <div key={index} className="forecast-cell">
              <div className='icon'><WeatherIcon code={day.weatherCode} /></div>
              <p className='date'>{new Date(day.date).toLocaleDateString()}r.</p>
              <div className="temperature">
                Temp: {day.minTemperature}{forecastWeather.daily_units.minTemperature} / {day.maxTemperature}{forecastWeather.daily_units.maxTemperature}
              </div>
              <div className="energy">
                <span>Szacowana energia:</span>
                <span>
                  {day.estimatedEnergy} {forecastWeather.daily_units.estimatedEnergy}
                </span>
              </div>
            </div>
          ))}
        </div>
      </div>
    );
  };
  
  export default ForecastWeather;