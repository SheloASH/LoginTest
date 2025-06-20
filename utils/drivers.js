import { Builder } from 'selenium-webdriver';
import chrome from 'selenium-webdriver/chrome.js';

export default async function buildDriver() {
  const options = new chrome.Options();
  options.addArguments('--headless', '--no-sandbox', '--disable-dev-shm-usage'); 

  const service = new chrome.ServiceBuilder('/usr/bin/chromedriver');

  return new Builder()
    .forBrowser('chrome')
    .setChromeOptions(options)
    .setChromeService(service)
    .build();
}