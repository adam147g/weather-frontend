import React from 'react';

const WeatherIcon = ({ code }) => {
  let icon;

  switch (code) {
    case 0:
      icon = '☀️'; // Czyste niebo
      break;
    case 1:
    case 2:
      icon = '🌤️'; // Przeważnie bezchmurnie, częściowe zachmurzenie
      break;
    case 3:
      icon = '☁️'; // Zachmurzenie
      break;
    case 45:
    case 48:
      icon = '🌫️'; // Mgła i osadzająca się mgła
      break;
    case 51:
    case 53:
    case 55:
      icon = '🌦️'; // Mżawka (Lekka, Umiarkowana, Gęsta)
      break;
    case 56:
    case 57:
      icon = '🌧️'; // Mroźna mżawka (Lekka, Gęsta)
      break;
    case 61:
    case 63:
    case 65:
      icon = '🌧️'; // Deszcz (Lekki, Umiarkowany, Silny)
      break;
    case 66:
    case 67:
      icon = '🌧️'; // Marznący deszcz (Lekki, Silny)
      break;
    case 71:
    case 73:
    case 75:
      icon = '❄️'; // Opady śniegu (Niewielka, Umiarkowana, Duża intensywność)
      break;
    case 77:
      icon = '🌨️'; // Ziarna śniegu
      break;
    case 80:
    case 81:
    case 82:
      icon = '🌧️'; // Przelotne opady deszczu (Lekkie, Umiarkowane, Gwałtowne)
      break;
    case 85:
    case 86:
      icon = '❄️'; // Przelotne opady śniegu (Słabe, Obfite)
      break;
    case 95:
      icon = '⚡️'; // Burza z piorunami (Niewielka, Umiarkowana)
      break;
    case 96:
    case 99:
      icon = '⚡️'; // Burza z piorunami (Lekkie, Silne)
      break;
    default:
      icon = '🌍'; // Domyślny symbol Ziemi, jeśli kod jest nieznany
  }

  return <span>{icon}</span>;
};

export default WeatherIcon;