import { test, expect } from '@playwright/test'
import HomePage from '../../pages/homePage'
import ReservationPage from '../../pages/reservationPage';
import customerInfo from '../../fixtures/customerInfo.json'
const { convertToISOFormat, getCheckinCheckoutDates } = require('../../utils/dateUtils');


test('book double room', {
    tag: '@sanity',
}, async ({ page }) => {
    await page.goto('/')
    const homePage = new HomePage(page)
    const reservationPage = new ReservationPage(page)
    //set days being booked
    const startDateFromToday = 5
    const daysOfStay = 3
    const { checkIn, checkOut } = getCheckinCheckoutDates(startDateFromToday, daysOfStay)
    //console.log({ checkIn, checkOut });
    const checkInISO = convertToISOFormat(checkIn)
    const checkOutISO = convertToISOFormat(checkOut)
    await homePage.selectCalendarDates(checkIn, checkOut)
    await homePage.clickFirstAvailableRoom()
    //await homePage.clickSingleRoomBookNow()
    const url = page.url();
    //check dates selected are correctly passed
    expect(url).toContain(checkInISO);
    expect(url).toContain(checkOutISO);
    //check selected days
    await reservationPage.assertSelectedDatesCount(1);
    //check price summary
    const pricePerNight = await reservationPage.getBookingCardPrice()
    await expect(reservationPage.priceSummary).toContainText(pricePerNight + ' x ' + daysOfStay + ' nights')
    const totalNightlyCharge = pricePerNight * daysOfStay;
    const totalNightlyChargeStr = totalNightlyCharge.toString();
    await expect(reservationPage.priceSummary).toContainText(totalNightlyChargeStr)
    await reservationPage.clickReserve()
    await reservationPage.fillReservationForm(customerInfo);



    //
});
/*
function formatDateToEuropean(date) {
  const dd = String(date.getDate()).padStart(2, '0');
  const mm = String(date.getMonth() + 1).padStart(2, '0'); // Month is 0-based
  const yyyy = date.getFullYear();
  return `${dd}/${mm}/${yyyy}`;
}

const today = new Date();
const todayPlus3 = new Date();
todayPlus3.setDate(today.getDate() + 3);

const formattedToday = formatDateToEuropean(today);
const formattedPlus3 = formatDateToEuropean(todayPlus3);

console.log('Today:', formattedToday);
console.log('Today + 3:', formattedPlus3);
*/