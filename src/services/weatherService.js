
const getWeatherForecast = async (latitude, longitude) => {
  try {
    const url = `http://localhost:8080/api/weather/7-day-forecast?latitude=${latitude}&longitude=${longitude}`;
    const response = await fetch(url);

    if (!response.ok) {
      throw new Error(`Błąd odpowiedzi: ${response.status}`);
    }

    const data = await response.json();
    return data;
  } catch (error) {
    console.error('Błąd podczas pobierania prognozy:', error);
    throw error;
  }
};

export { getWeatherForecast };

const getWeeklySummary = async (latitude, longitude) => {
  try {
    const url = `http://localhost:8080/api/weather/weekly-summary?latitude=${latitude}&longitude=${longitude}`;
    const response = await fetch(url);

    if (!response.ok) {
      throw new Error(`Błąd odpowiedzi: ${response.status}`);
    }

    const data = await response.json();
    return data;
  } catch (error) {
    console.error('Błąd podczas pobierania podsumowania tygodnia:', error);
    throw error;
  }
};

export { getWeeklySummary };