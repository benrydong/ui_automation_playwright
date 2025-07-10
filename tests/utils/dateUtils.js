function formatDateToEuropean(date) {
  const dd = String(date.getDate()).padStart(2, '0');
  const mm = String(date.getMonth() + 1).padStart(2, '0');
  const yyyy = date.getFullYear();
  return `${dd}/${mm}/${yyyy}`;
}

function getTodayAndPlusDays(days = 0) {
  const date = new Date();
  date.setDate(date.getDate() + days);
  return formatDateToEuropean(date);
}
//Returns an object with checkin and checkout dates in European format
function getCheckinCheckoutDates(daysFromToday = 0, nightsOfStay = 1) {
  const checkinDate = new Date();
  checkinDate.setDate(checkinDate.getDate() + daysFromToday);

  const checkoutDate = new Date(checkinDate);
  checkoutDate.setDate(checkinDate.getDate() + nightsOfStay);

  return {
    checkIn: formatDateToEuropean(checkinDate),
    checkOut: formatDateToEuropean(checkoutDate),
  };
}
function convertToISOFormat(euroDateString) {
  const [day, month, year] = euroDateString.split('/').map(Number);
  return `${year}-${String(month).padStart(2, '0')}-${String(day).padStart(2, '0')}`;
}

module.exports = {
  formatDateToEuropean,
  getTodayAndPlusDays,
  convertToISOFormat,
  getCheckinCheckoutDates,
};
