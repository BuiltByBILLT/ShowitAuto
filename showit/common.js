// =============== Mobile and Desktop Tabs ===============
const getTabMenu = async (page) => {
    const tabPanel = await page.$(".properties-tabset")
    if (!tabPanel) return 0

    const mobileTab = (await tabPanel.$$('div'))[0]
    const desktopTab = (await tabPanel.$$('div'))[1]
    return { mobileTab, desktopTab }
}

export const clickMobileTab = async (page) => {
    const { mobileTab } = await getTabMenu(page)
    if (mobileTab) await mobileTab.click()
}
export const clickDesktopTab = async (page) => {
    const { desktopTab } = await getTabMenu(page)
    if (desktopTab) await desktopTab.click()
}

// =============== Mobile and Desktop Views ===============
export const clickMobileDesktopView = async (page) => {
    const mobileDesktopBtn = await page.waitForSelector('.icon-mobiledesktop')
    await mobileDesktopBtn.click()
}
export const clickDesktopView = async (page) => {
    const desktopBtn = await page.waitForSelector('.icon-desktop')
    await desktopBtn.click()
}
export const clickMobileView = async (page) => {
    const mobileBtn = await page.waitForSelector('.icon-mobile')
    await mobileBtn.click()
}

// =============== Site and Page Tabs ===============
const getSitePanelMenu = async (page) => {
    const tabPanel = await page.$(".site-panel-tabset")
    if (!tabPanel) return 0

    const siteTab = (await tabPanel.$$('div'))[0]
    const pageTab = (await tabPanel.$$('div'))[1]
    return { siteTab, pageTab }
}

export const clickSiteTab = async (page) => {
    const { siteTab } = await getSitePanelMenu(page)
    if (siteTab) await siteTab.click()
}

export const clickPageTab = async (page) => {
    const { pageTab } = await getSitePanelMenu(page)
    if (pageTab) await pageTab.click()
}

export const gotoPage = async (page, pageNumber = 3) => {
    await clickSiteTab(page)
    await page.waitForSelector('.listed-page')
    const pages = await page.$$('.listed-page')
    pages[Number(pageNumber)].click()
}

// =============== Inputs ===============
export const clearInput = async (handle) => {
    const length = await handle.evaluate(el => el.value.length)
    for (let i = 0; i < (length + 1); i++) {
        await handle.press('ArrowRight', { delay: 10 })
        await handle.press('Backspace', { delay: 10 })
    }
}

export const setInput = async (input, value) => {
    if (!value) return
    await input.click()
    await clearInput(input)
    await input.type(value, { delay: 30 })
}

export const setColor = async (page, colorPreview, value) => {
    if (!value) return
    await colorPreview.click()
    const hexInput = await page.waitForSelector('.sp-input')
    await setInput(hexInput, value)
    await page.keyboard.press('Enter')
    await page.keyboard.press('Escape')
}

export const setSelect = async (select, value) => {
    if (!value) return
    // Get Options
    // If no matching option 
    await select.select(value)
}


// =============== Panel ===============
export const getPanel = async (page, panelText) => {
    // Check For Size Menu
    const panelIndex = await page.$$eval(".panel-section", (el, panelText) =>
        Array.from(el).findIndex(panel => (panel.innerText.includes(panelText)))
        , panelText)
    if (panelIndex === -1) { console.log("Panel not found"); return 0 }
    // Enter SIZE Panel
    const panel = (await page.$$('.panel-section'))[panelIndex]
    await panel.click()
    // await new Promise(resolve => setTimeout(resolve, 500))
    return panel
}