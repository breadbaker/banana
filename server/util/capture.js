const puppeteer = require('puppeteer');
 
(async () => {
  const browser = await puppeteer.launch();
  const page = await browser.newPage();
  await page.goto('http://localhost:8080/');

  await page.waitFor( 1000 );
  await page.evaluate(() => {
    localStorage.setItem('auth', 'hellotherer');
  });
  const localStorageData = await page.evaluate(() => {
    let json = {};
    for (let i = 0; i < localStorage.length; i++) {
      const key = localStorage.key(i);
      json[key] = localStorage.getItem(key);
    }
    return json;
  });

  console.log(localStorageData)
  // await page.setCookie({
  //   name: 
  // })
  // await page.screenshot({path: 'example.png'});
 
  await browser.close();
})();


// const puppeteer = require('puppeteer');
 
//   let browser = {}
  
//   puppeteer.launch().then(b => {
//     browser = b
//   })
//   let page = null;
//   browser.newPage().then(p => {
//     page = p
//   })
//   await 
//   await page.goto('http://localhost:8080/');
//   await page.screenshot({path: 'example.png'});
 
//   await browser.close();
// })();