import { test, expect } from '@playwright/test'
import HomePage from '../../pages/homePage'
import ReservationPage from '../../pages/reservationPage';
import customerInfo from '../../fixtures/customerInfo.json'
const { convertToISOFormat, getCheckinCheckoutDates } = require('../../utils/dateUtils');
const { getRandomInt } = require('../../utils/mathUtils.js')
const { generateBookingDates } = require('../../utils/testDataUtils.js')


test('book any available room', {
    tag: '@smoke',
}, async ({ page }) => {
    //set days being booked
    const {
        daysOfStay,
        checkIn,
        checkOut,
        checkInISO,
        checkOutISO
    } = generateBookingDates();
    await page.goto('/')
    const homePage = new HomePage(page)
    const reservationPage = new ReservationPage(page)
    await homePage.selectCalendarDates(checkIn, checkOut)
    await homePage.clickFirstAvailableRoom()
    //await homePage.clickSingleRoomBookNow()
    const url = page.url();
    //check dates selected are correctly passed
    expect(url).toContain(checkInISO);
    expect(url).toContain(checkOutISO);
    //check selected days
    //await reservationPage.assertSelectedDatesCount(1);
    //check price summary
    const pricePerNight = await reservationPage.getBookingCardPrice()
    await expect(reservationPage.priceSummary).toContainText(pricePerNight + ' x ' + daysOfStay + ' nights')
    const totalNightlyCharge = pricePerNight * daysOfStay;
    const totalNightlyChargeStr = totalNightlyCharge.toString();
    await expect(reservationPage.priceSummary).toContainText(totalNightlyChargeStr)
    //fill out reservation contact form
    await reservationPage.clickReserve()
    await reservationPage.fillReservationForm(customerInfo);
    //
});
test('book single room', {
    tag: '@sanity',
}, async ({ page }, testInfo) => {
    //set days being booked
    const {
        daysOfStay,
        checkIn,
        checkOut,
        checkInISO,
        checkOutISO
    } = generateBookingDates();
    await page.goto('/')
    const homePage = new HomePage(page)
    const reservationPage = new ReservationPage(page)
    await homePage.selectCalendarDates(checkIn, checkOut)
    //try to click book, if no rooms available then it will skip
    try {
        await homePage.clickSingleRoomBookNow();
    } catch (e) {
        if (e.message.includes('SKIP_TEST')) {
            testInfo.skip(e.message); // Skip with the custom message
        } else {
            throw e; // rethrow if it’s another error
        }
    }
    const url = page.url();
    //check dates selected are correctly passed
    expect(url).toContain(checkInISO);
    expect(url).toContain(checkOutISO);
    //check selected days
    //await reservationPage.assertSelectedDatesCount(1);
    //check price summary
    const pricePerNight = await reservationPage.getBookingCardPrice()
    await expect(reservationPage.priceSummary).toContainText(pricePerNight + ' x ' + daysOfStay + ' nights')
    const totalNightlyCharge = pricePerNight * daysOfStay;
    const totalNightlyChargeStr = totalNightlyCharge.toString();
    await expect(reservationPage.priceSummary).toContainText(totalNightlyChargeStr)
    //fill out reservation contact form
    await reservationPage.clickReserve()
    await reservationPage.fillReservationForm(customerInfo);
});

test('book double room', {
    tag: '@sanity',
}, async ({ page }, testInfo) => {
    //set days being booked
    const {
        daysOfStay,
        checkIn,
        checkOut,
        checkInISO,
        checkOutISO
    } = generateBookingDates();
    await page.goto('/')
    const homePage = new HomePage(page)
    const reservationPage = new ReservationPage(page)
    await homePage.selectCalendarDates(checkIn, checkOut)
    try {
        await homePage.clickDoubleRoomBookNow();
    } catch (e) {
        if (e.message.includes('SKIP_TEST')) {
            testInfo.skip(e.message); // Skip with the custom message
        } else {
            throw e; // rethrow if it’s another error
        }
    }
    const url = page.url();
    //check dates selected are correctly passed
    expect(url).toContain(checkInISO);
    expect(url).toContain(checkOutISO);
    //check selected days
    //await reservationPage.assertSelectedDatesCount(1);
    //check price summary
    const pricePerNight = await reservationPage.getBookingCardPrice()
    await expect(reservationPage.priceSummary).toContainText(pricePerNight + ' x ' + daysOfStay + ' nights')
    const totalNightlyCharge = pricePerNight * daysOfStay;
    const totalNightlyChargeStr = totalNightlyCharge.toString();
    await expect(reservationPage.priceSummary).toContainText(totalNightlyChargeStr)
    //fill out reservation contact form
    await reservationPage.clickReserve()
    await reservationPage.fillReservationForm(customerInfo);
});

test('book suite room', {
    tag: '@sanity',
}, async ({ page }, testInfo) => {
    //set days being booked
    const {
        daysOfStay,
        checkIn,
        checkOut,
        checkInISO,
        checkOutISO
    } = generateBookingDates();
    await page.goto('/')
    const homePage = new HomePage(page)
    const reservationPage = new ReservationPage(page)
    await homePage.selectCalendarDates(checkIn, checkOut)
    try {
        await homePage.clickSingleRoomBookNow();
    } catch (e) {
        if (e.message.includes('SKIP_TEST')) {
            testInfo.skip(e.message); // Skip with the custom message
        } else {
            throw e; // rethrow if it’s another error
        }
    }
    const url = page.url();
    //check dates selected are correctly passed
    expect(url).toContain(checkInISO);
    expect(url).toContain(checkOutISO);
    //check selected days
    //await reservationPage.assertSelectedDatesCount(1);
    //check price summary
    const pricePerNight = await reservationPage.getBookingCardPrice()
    await expect(reservationPage.priceSummary).toContainText(pricePerNight + ' x ' + daysOfStay + ' nights')
    const totalNightlyCharge = pricePerNight * daysOfStay;
    const totalNightlyChargeStr = totalNightlyCharge.toString();
    await expect(reservationPage.priceSummary).toContainText(totalNightlyChargeStr)
    //fill out reservation contact form
    await reservationPage.clickReserve()
    await reservationPage.fillReservationForm(customerInfo);
});