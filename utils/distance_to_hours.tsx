const getTimeFromDistance = (distance: string) => {
  const distanceInKm = parseInt(distance, 10);
  const speedKmPerHour = 3;
  const timeInHours = distanceInKm / speedKmPerHour;
  const hours = Math.floor(timeInHours);
  const minutes = Math.round((timeInHours - hours) * 60);
  return `${hours > 0 ? hours + "h" : ""}${minutes > 0 ? minutes + "m" : ""}`.trim();
};

export default getTimeFromDistance;
