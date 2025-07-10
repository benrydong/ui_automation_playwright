import { expect } from '@playwright/test';

class HomePage {
    constructor(page) {
        this.page = page
        this.bookNowButton = page.getByRole('link', { name: 'Book Now', exact: true })
        this.titleLogo = page.getByRole('link', { name: 'Shady Meadows B&B' })
        this.welcomeText = page.getByRole('heading', { name: 'Welcome to Shady Meadows B&B' })
        this.checkInDateField = page.locator('div').filter({ hasText: /^Check In$/ })
        this.checkOutDateFeild = page.locator('div').filter({ hasText: /^Check Out$/ })
        this.contactInfoCard = page.getByText('Contact InformationAddressShady Meadows B&B, Shadows valley,')
        this.messageUsCard = page.getByText('Send Us a MessageNameEmailPhoneSubjectMessageSubmit')
        this.bookingCard = page.locator('#booking > div > div')
        this.roomsSection = page.locator('#rooms')
        this.contactNameField = page.locator('#name')
        this.emailField = page.locator('#email')
        this.phoneField = page.locator('#phone')
        this.subjectField = page.locator('#subject')
        this.messageField = page.locator('#description')
        this.postMessageUs = page.locator('#contact')
        this.submitMessage = page.getByRole('button', { name: 'Submit' })
        //related to booking
        this.checkInInput = page.locator('input[type="text"]').nth(0);
        this.checkOutInput = page.locator('input[type="text"]').nth(1);
        this.checkAvailabilityBtn = page.getByRole('button', { name: 'Check Availability' })
        this.singleRoomCard = page.locator('img[alt="Single Room"]')
        this.doubleRoomCard = page.locator('h5.card-title', { hasText: 'Double' })
        this.suiteRoomCard = page.locator('h5.card-title', { hasText: 'Suite' })
        this.singleRoomCardBtn = page.locator('div.room-card', { has: page.locator('img[alt="Single Room"]') }).getByRole('link', { name: 'Book now' })
        this.doubleRoomCardBtn = page.locator('div.room-card', { has: page.locator('h5.card-title', { hasText: 'Double' }) }).getByRole('link', { name: 'Book now' })
        this.suiteRoomCardBtn = page.locator('div.room-card', { has: page.locator('h5.card-title', { hasText: 'Suite' }) }).getByRole('link', { name: 'Book now' })
        this.roomCards = page.locator('.room-card');
        this.firstRoomBookButton = this.roomCards.first().locator('text=Book now');
    }

    async clickBookNowButton() {
        await this.bookNowButton.click()
    }
    //method to fill contact form at once
    async fillContactForm({ name, email, phone, subject, message }) {
        await this.contactNameField.fill(name)
        await this.emailField.fill(email)
        await this.phoneField.fill(phone)
        await this.subjectField.fill(subject)
        await this.messageField.fill(message)
    }
    async clickSubmitMessage() {
        await this.submitMessage.click()
    }
    //method to type into check in calendar 'DD/MM/YYYY'
    async selectCheckInDate(dateString) {
        await this.checkInInput.click()
        await this.checkInInput.fill(dateString)
        await this.page.keyboard.press('Enter')
    }
    //method to type into check out calendar 'DD/MM/YYYY'
    async selectCheckOutDate(dateString) {
        await this.checkOutInput.click()
        await this.checkOutInput.fill(dateString)
        await this.page.keyboard.press('Enter')
    }
    async clickCheckAvailabilityBtn() {
        await this.checkAvailabilityBtn.click()
    }
    async selectCalendarDates(checkInDay, checkOutDay) {
        await this.selectCheckInDate(checkInDay)
        await this.selectCheckOutDate(checkOutDay)
        await this.clickCheckAvailabilityBtn()
    }
    //
    async clickSingleRoomBookNow() {
        await expect(this.singleRoomBookBtn).toBeVisible();
        await this.singleRoomBookBtn.click();
    }

    async clickDoubleRoomBookNow() {
        await expect(this.doubleRoomCardBtn).toBeVisible();
        await this.doubleRoomCardBtn.click();
    }

    async clickSuiteRoomBookNow() {
        await expect(this.suiteRoomBookBtn).toBeVisible();
        await this.suiteRoomBookBtn.click();
    }

    async clickFirstAvailableRoom() {
        const count = await this.roomCards.count();

        if (count === 0) {
            throw new Error('No rooms are available');
        }

        await this.firstRoomBookButton.scrollIntoViewIfNeeded();
        await expect(this.firstRoomBookButton).toBeVisible();
        await this.firstRoomBookButton.click();
    }
}
export default HomePage

/*
  await page.goto('https://automationintesting.online/');
  await page.getByTestId('ContactName').click();
  await page.getByTestId('ContactName').fill('Benry Dong');
  await page.getByTestId('ContactEmail').fill('benry205@gmail.com');
  await page.getByTestId('ContactPhone').fill('480-466-3476');
  await page.getByTestId('ContactSubject').click();
  await page.getByTestId('ContactSubject').fill('Testing PW');
  await page.getByTestId('ContactDescription').click();
  await page.getByTestId('ContactDescription').fill('This is a test to demo my skills');
  await page.getByRole('button', { name: 'Submit' }).click();
  await expect(page.locator('#contact')).toContainText('Testing PW');
  await expect(page.locator('#contact')).toContainText('Benry Dong');
  */