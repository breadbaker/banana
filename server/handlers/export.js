const puppeteer = require('puppeteer');
const { saveExport } = require('@util');

module.exports = async event => {
  const {
    headers: {
      email,
    },
  } = event
  console.log('event')
  console.log(event)


  const browser = await puppeteer.launch()
  const page = await browser.newPage()
  await page.goto('https://www.flightlogbox.com')

  await page.evaluate(event => {
    const {
      headers: {
        email,
        AccessToken,
        RefreshToken
      },
    } = event
    localStorage.setItem('auth', JSON.stringify({email, AccessToken, RefreshToken}))
  }, event)

  await page.goto('https://www.flightlogbox.com/flights')

  await page.waitFor( 2000 )

  await page.setViewport({
    width: 600,
    height: 5000,
    // deviceScaleFactor: 10
  })
  // await page.setContent(html)

  console.log('screenshot')


  const filePath = `${__dirname}${email}.png`

  await page.screenshot({path: filePath})

  await browser.close();

  await saveExport({filePath, email})
};
