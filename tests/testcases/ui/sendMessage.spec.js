import {test,expect} from '@playwright/test'
import HomePage from '../../pages/homePage'
import messageUsForm from '../../fixtures/messageUsForm.json' assert { type: 'json' }
import messageUsFormInvalidInput from '../../fixtures/messageUsFormInvalidInput.json' assert { type: 'json' }
import messageUsFormErrorMessages from '../../fixtures/messageUsFormErrorMessages.json' assert { type: 'json' }

test('Send message on message form happy path', {
  tag: '@sanity',
}, async ({ page }) => {
    const home = new HomePage(page);
    await page.goto('https://automationintesting.online/')
    await home.fillContactForm(messageUsForm)
    await home.clickSubmitMessage()
    await expect(home.postMessageUs).toContainText(messageUsForm.subject)
    await expect(home.postMessageUs).toContainText(messageUsForm.name)
});
test('Validate error messages', {
  tag: '@negative',
}, async ({ page }) => {
    const home = new HomePage(page);
    await page.goto('https://automationintesting.online/')
    await home.fillContactForm(messageUsFormInvalidInput)
    await home.clickSubmitMessage()
    await expect(home.messageUsCard).toContainText(messageUsFormErrorMessages.blankErrors.name)
    await expect(home.messageUsCard).toContainText(messageUsFormErrorMessages.formatErrors.email)
    await expect(home.messageUsCard).toContainText(messageUsFormErrorMessages.lengthErrors.phone)
    await expect(home.messageUsCard).toContainText(messageUsFormErrorMessages.lengthErrors.subject)
    await expect(home.messageUsCard).toContainText(messageUsFormErrorMessages.lengthErrors.message)
});