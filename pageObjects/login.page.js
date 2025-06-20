import { By, until } from "selenium-webdriver"

class LoginPage {
    constructor(driver){
        this.driver=driver;
        this.url = 'https://the-internet.herokuapp.com/login';
    }

    async open(){
        await this.driver.get(this.url);
    }

    async enterUsername(username){
        await this.driver.findElement(By.id('username')).sendKeys(username)
    }

    async enterPassword(password){
        await this.driver.findElement(By.id('password')).sendKeys(password)
    }

    async clickLogin(){
        await this.driver.findElement(By.css('button[type="submit"]')).click()
    }

    async getMessage(){
        const el = await this.driver.wait(until.elementLocated(By.id('flash')),5000)
        return await el.getText()
    }

    async clickLogout(){
        await this.driver.findElement(By.className("button secondary radius")).click()
    }
}

export default LoginPage;