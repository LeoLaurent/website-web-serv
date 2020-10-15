
var fs = require('fs');

const url = 'https://www.google.com'



const {By, Key} = require('selenium-webdriver');

const webdriver = require('selenium-webdriver');


describe('Google renders', () => {

    beforeEach(() => {
        require('chromedriver');
        browser =  new webdriver.Builder().forBrowser('chrome').build()
    })

    // beforeEach(() => {
    //     require('geckodriver');
    //     browser =  new webdriver.Builder().forBrowser('firefox').build()
    // })


  test('it renders', async () => {
    await browser.get(url)
    const title = await browser.getTitle()
    expect(title).toContain('Google')
  })

  test('save a picture', async () => {
        // files saved in ./reports/screenshots by default
        await browser.get(url)
        const iframe = browser.findElement(By.css('iframe'));
        await browser.switchTo().frame(iframe);

        await browser.findElement(By.id("introAgreeButton")).click()

        await browser.switchTo().defaultContent();
        await browser.findElement(By.name("q")).sendKeys("Carole Deumié", Key.ENTER);


        browser.takeScreenshot().then((data) => {
          fs.writeFileSync('img.png', data, 'base64')
        })
    }, 10000)

    afterEach(async () => {
        await browser.quit()
    })
})
