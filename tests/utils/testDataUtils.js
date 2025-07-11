const { convertToISOFormat, getCheckinCheckoutDates } = require('./dateUtils');
const { getRandomInt } = require('./mathUtils');

function generateBookingDates() {
  const startDateFromToday = getRandomInt(1, 5);
  const daysOfStay = getRandomInt(1, 3);
  const { checkIn, checkOut } = getCheckinCheckoutDates(startDateFromToday, daysOfStay);
  const checkInISO = convertToISOFormat(checkIn);
  const checkOutISO = convertToISOFormat(checkOut);
  return {
    startDateFromToday,
    daysOfStay,
    checkIn,
    checkOut,
    checkInISO,
    checkOutISO,
  };
}

module.exports = { generateBookingDates };