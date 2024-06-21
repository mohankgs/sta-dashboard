export function timeString(dateTime){
  return dateTime.getHours() + ":" + dateTime.getMinutes() + ":" + dateTime.getSeconds();
}

export function convert24to12(timestring) {
  // Split the time string into hours and minutes
  const [hours, minutes] = timestring.split(':');

  // Convert hours to a number
  const hour = parseInt(hours);

  // Handle edge cases (midnight and noon)
  if (hour === 0) {
    return `12:00 AM`;
  } else if (hour === 12) {
    return `12:00 PM`;
  }

  // Convert to 12-hour format with AM/PM indicator
  const amPm = hour < 12 ? 'AM' : 'PM';
  const newHour = hour % 12 || 12; // Handle 0 hour as 12 PM
  console.log(padTo2Digits(newHour));
  return `${padTo2Digits(newHour)}:${padTo2Digits(minutes)} ${amPm}`;
}

export function padTo2Digits(num) {
  return num.toString().padStart(2, '0');
}

export function formatDate(date) {
  return [
    date.getFullYear(),
    padTo2Digits(date.getMonth() + 1),
    padTo2Digits(date.getDate()),
  ].join('-');
}