// WeeklySummary.js
import React from 'react';
import { convertSecondsToTime } from '../utils/convertTime';

const WeeklySummary = ({ weeklySummary }) => {
  return (
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
  );
};

export default WeeklySummary;
