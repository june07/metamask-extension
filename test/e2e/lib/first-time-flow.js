module.exports = {
  firstTimeFlow,
}
async function firstTimeFlow (browser) {

  const pages = await browser.pages()
  const page = pages[0]

  // Welcome Screen
  await page.waitFor('.welcome-page__header')
  await page.click('.first-time-flow__button')

  // Create Wallet Path
  const createWalletButton = `//button[contains(text(), 'Create a Wallet')]`
  await page.waitForXPath(createWalletButton)
  const button = await page.$x(createWalletButton)
  await button[0].click()

  // MetaMetrics
  await page.waitFor('.metametrics-opt-in')
  await page.click('button.btn-default.btn--large.page-container__footer-button')

  // Create Password
  const createPassword = `//div[contains(text(), 'Create Password')]`
  await page.waitForXPath(createPassword)

  const password = 'correct horse battery staple'
  await page.type('.first-time-flow__form #create-password', password)
  await page.type('.first-time-flow__form #confirm-password', password)

  await page.click('.first-time-flow__checkbox') // TOS Checkbox
  await page.click('.first-time-flow__form button')

  // Reveal Seed Phrase
  const seedPhraseBlocker = '.reveal-seed-phrase__secret-blocker'
  await page.waitFor(seedPhraseBlocker)
  await page.click(seedPhraseBlocker)

  const seedPhrase = await page.evaluate(() => document.querySelector('.reveal-seed-phrase__secret').innerText)
  const nextScreen = 'button.btn-primary.first-time-flow__button'
  await page.click(nextScreen)

  // Confirm Seed Phrase
  const confirmSeedPhrase = `//div[contains(text(), 'Confirm your Secret Backup Phrase')]`
  await page.waitForXPath(confirmSeedPhrase)

  const words = seedPhrase.split(' ')
  for (let i = 0; i < words.length; i++) {
    await clickWord(page, words[i])
  }

  await page.click('button.first-time-flow__button')

  // Success Screen
  await page.waitForXPath(`//div[contains(text(), 'Congratulations')]`)
  await page.click('button.first-time-flow__button')
}

async function clickWord (page, word) {
  const xpath = `//div[contains(@class, 'confirm-seed-phrase__seed-word--shuffled') and not(contains(@class, 'confirm-seed-phrase__seed-word--selected')) and contains(text(), '${word}')]`

  const wordButton = await page.$x(xpath)
  await wordButton[0].click('button.first-time-flow__button')
}
