import {expect} from 'chai'
import buildDriver from '../utils/drivers.js'
import LoginPage  from '../pageObjects/login.page.js'

describe('Login page tests', function() {
    this.timeout(10000)
    let driver, loginPage;

    beforeEach(async()=>{
        driver = await buildDriver()
        loginPage = new LoginPage(driver)
        await loginPage.open()
    })

    afterEach(async () => {
        if (driver) {
            await driver.quit();
        }
    });

    it('should login with valid credentials', async()=>{
        await loginPage.enterUsername('tomsmith')
        await loginPage.enterPassword('SuperSecretPassword!')
        await loginPage.clickLogin()
        const message=await loginPage.getMessage()
        expect(message).to.include('You logged into a secure area!')
    })

    it('should fail with invalid credentials', async()=>{
        await loginPage.enterUsername('akaki')
        await loginPage.enterPassword('akaki!')
        await loginPage.clickLogin()
        const message=await loginPage.getMessage()
        expect(message).to.include('Your username is invalid!')
    })

    it('should logout from account', async()=>{
        await loginPage.enterUsername('tomsmith')
        await loginPage.enterPassword('SuperSecretPassword!')
        await loginPage.clickLogin()
        const loginMessage = await loginPage.getMessage();
        expect(loginMessage).to.include('You logged into a secure area!');

        await loginPage.clickLogout();

        const logoutMessage = await loginPage.getMessage();
        expect(logoutMessage).to.include('You logged out of the secure area!');
    })
})

 