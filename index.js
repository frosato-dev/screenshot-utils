const puppeteer = require("puppeteer")
const urls = require("./urls")

const run = async (url) => {
  const browser = await puppeteer.launch()
  const page = await browser.newPage()

  await page.goto(url)
  await page.setViewport({
    width: 1400,
    height: 1400,
  })
  await page.screenshot({
    path: "screenshots/" + url.replace("/", "___") + ".jpg",
    fullPage: true,
  })
  await browser.close()
  return Promise.resolve()
}

;(async () => {
  const errors = []
  for (let index = 0; index < urls.length; index++) {
    const url = urls[index]
    console.log("start : ", url)
    await run(url).catch((error) => {
      errors.push({ url, error })
      return Promise.resolve()
    })
    console.log("finish : ", url)
    console.log("----------------")
  }
})()
