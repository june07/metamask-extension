const {
  assertElementNotPresent,
  checkBrowserForConsoleErrors,
  closeAllWindowHandlesExcept,
  findElement,
  findElements,
  loadExtension,
  openNewPage,
  switchToWindowWithTitle,
  verboseReportOnFailure,
  waitUntilXWindowHandles,
  setupFetchMocking,
  prepareExtensionForTesting,
} = require('./lib/helpers')

const { firstTimeFlow } = require('./lib/first-time-flow')

describe('Puppeteer', function () {
  let browser, page

  this.timeout(0)
  this.bail(true)

  before(async () => {
    const result = await prepareExtensionForTesting({ responsive: true })
    browser = result.browser
    const pages = await browser.pages()
    page = pages[0]
    // await setupFetchMocking(driver)
  })

  afterEach(async function () {
    // TODO: checkBrowserForConsoleErrors find alternative to driver.manage().logs()
    // https://github.com/GoogleChrome/puppeteer/blob/v1.20.0/docs/api.md#class-consolemessage
  })

  // after(async () => {
  //   await browser.close()
  // })

  describe('Going through the first time flow', () => {

    it('', async () => {
      await firstTimeFlow(browser)
    })

  })

})
