// utils/convertTime.js
export const convertSecondsToTime = (seconds) => {
    const hours = Math.floor(seconds / 3600);
    seconds %= 3600;
    const minutes = Math.floor(seconds / 60);
    const remainingSeconds = Math.round(seconds % 60);
  
    return `${hours}h ${minutes}m ${remainingSeconds}s`;
  };