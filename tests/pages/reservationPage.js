import { expect } from "@playwright/test";

class ReservationPage {
    constructor(page) {
        //form ids
        this.reservationFormFirstName = page.getByRole('textbox', { name: 'Firstname' })
        this.reservationFormLastName = page.getByRole('textbox', { name: 'Lastname' })
        this.reservationFormEmail = page.getByRole('textbox', { name: 'Email' })
        this.reservationFormPhone = page.getByRole('textbox', { name: 'Phone' })
        // Booking card container
        this.bookingCard = page.locator('.booking-card');
        // Calendar elements
        this.calendar = this.bookingCard.locator('.rbc-calendar');
        this.todayButton = page.getByRole('button', { name: 'Today' });
        this.backButton = page.getByRole('button', { name: 'Back' });
        this.nextButton = page.getByRole('button', { name: 'Next' });
        this.currentMonthLabel = this.calendar.locator('.rbc-toolbar-label');
        // Dates (pass the date dynamically when needed)
        this.getDateButton = (day) => this.calendar.getByRole('button', { name: String(day) });
        // Selected/Highlighted dates
        this.selectedDates = page.locator('.rbc-event-content[title="Selected"]');
        // Price summary and total
        this.priceSummary = page.locator('.card.bg-light .card-body:has-text("Price Summary")');
        // Reserve button
        this.reserveButton = page.locator('#doReservation');
        //price per night
        this.bookingCardPrice = page.locator('span.fs-2.fw-bold.text-primary.me-2');
    }
    async clickDate(day) {
        await this.getDateButton(day).click()
    }
    //check if selected spans amount of days
    async assertSelectedDatesCount(expectedCount) {
        await expect(this.selectedDates).toHaveCount(expectedCount)
    }

    async clickReserve() {
        await this.reserveButton.click()
    }
    async getBookingCardPrice() {
        await expect(this.bookingCardPrice).toBeVisible()
        const priceText = await this.bookingCardPrice.textContent()
        // Extract the numeric value from the text (e.g., "£100 per night")
        const priceMatch = priceText?.match(/£\d+/)
        const price = priceMatch ? priceMatch[0] : null
        const numericPrice = price ? Number(price.replace('£', '')) : null
        return numericPrice
    }
    //fill out reservation customer info 
    async fillReservationForm({ firstName, lastName, email, phone }) {
        await this.reservationFormFirstName.fill(firstName);
        await this.reservationFormLastName.fill(lastName);
        await this.reservationFormEmail.fill(email);
        await this.reservationFormPhone.fill(phone);
    }


}
export default ReservationPage