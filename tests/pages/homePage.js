class HomePage{
    constructor(page){
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

    }

    async clickBookNowButton(){
        await this.bookNowButton.click()
    }
    //method to fill contact form at once
    async fillContactForm({name, email, phone, subject, message }) {
        await this.contactNameField.fill(name)
        await this.emailField.fill(email)
        await this.phoneField.fill(phone)
        await this.subjectField.fill(subject)
        await this.messageField.fill(message)
    }
    async clickSubmitMessage() {
        await this.submitMessage.click()
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