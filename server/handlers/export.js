// const puppeteer = require('puppeteer');
// const chromeLambda = require("chrome-aws-lambda");

// const puppeteer = chromeLambda.puppeteer
const { saveExport } = require('@util');

module.exports = async event => {
  const {
    headers: {
      email,
    },
  } = event


  const browser = await puppeteer.launch()
  const page = await browser.newPage()
  const url = 'https://www.flightlogbox.com'
  // const url = 'http://localhost:8080'
  await page.goto(`${url}`)

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

  console.log('not navigating')
  await page.goto(`${url}`)
  await page.evaluate(event => {
    document.getElementById('past-flights').click()
  }, event)
  await page.waitFor( 2000 )

  await page.setViewport({
    width: 600,
    height: 230*event.recordsCount,
  })

  console.log('screenshot')


  const filePath = `${__dirname}${email}.png`

  await page.screenshot({path: filePath})

  await browser.close();

  await saveExport({filePath, email})
};
