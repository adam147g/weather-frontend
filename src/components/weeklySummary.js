// WeeklySummary.js
import React from 'react';
import { convertSecondsToTime } from '../utils/convertTime';
import './weeklySummary.css';

const WeeklySummary = ({ weeklySummary }) => {
  return (
    <div className="weekly-summary-container">
      <h2>Podsumowanie tygodnia:</h2>
        <div className="items-container">
          <div className="summary-item">
            <strong>Skrajne temperatury w tym tygodniu:</strong>
            <p>{weeklySummary.weekly_summary.minTemperature}{weeklySummary.weekly_summary_units.minTemperature} - {weeklySummary.weekly_summary.maxTemperature}{weeklySummary.weekly_summary_units.maxTemperature}</p>
          </div>
          <div className="summary-item">
            <strong>Średnie ciśnienie:</strong>
            <p>{weeklySummary.weekly_summary.averageSurfacePressure} {weeklySummary.weekly_summary_units.averageSurfacePressure}</p>
          </div>
          <div className="summary-item">
            <strong>Średni czas ekspozycji na słońce:</strong>
            <p>{ 
              weeklySummary.weekly_summary_units.averageSunshineDuration === "s" ? 
                convertSecondsToTime(weeklySummary.weekly_summary.averageSunshineDuration) : 
                `${weeklySummary.weekly_summary.averageSunshineDuration} ${weeklySummary.weekly_summary_units.averageSunshineDuration}`
            }</p>
          </div>
          <div className="summary-item">
            <strong>Podsumowanie pogody:</strong>
            <p>{weeklySummary.weekly_summary.weatherSummary}</p>
          </div>
      </div>
    </div>
  );
};

export default WeeklySummary;
