import { clickMobileDesktopView, clickPageTab, gotoPage } from "./showit/common.js";

export const loginShowit = async (page) => {
    //Login
    await page.goto('https://app.showit.co/');

    var login = await page.$$('input');
    await login[0].type('teresa@sundaystoriesdesign.com');
    await login[1].type('yunho*86');
    // await login[0].type('rachel@thedimplelife.com');
    // await login[1].type('tH3d1mpLe45!23');
    await page.keyboard.type('\n')

    const thumb = await page.waitForSelector('.site-chooser-thumbnail')
    await thumb.click()
    const accountSelect = await page.waitForSelector('[data-intercom-target="design view footer"] > div > span ~ span')
    await accountSelect.click()
    await page.waitForSelector('.si-c-modal__dialog select')
    await Promise.all([
        page.waitForNavigation({ waitUntil: 'networkidle0' }),
        page.select('.si-c-modal__dialog select', '189910')
    ]);

    await page.waitForSelector(".layers-panel") // Showit Loaded

    await clickMobileDesktopView(page)
    await gotoPage(page, 9)
    await new Promise(resolve => setTimeout(resolve, 1000))
    await clickPageTab(page)

    console.log("Showit Ready")
}

export const goToXD = async (page) => {
    page.goto('https://xd.adobe.com/view/691155da-e06c-4e86-9407-57cb3cf87717-3c42/screen/73ae9be1-dafc-4375-92c3-00daf91101dd/specs/', {
        // page.goto('https://xd.adobe.com/view/691155da-e06c-4e86-9407-57cb3cf87717-3c42/specs/', {
        // page.goto('https://xd.adobe.com/view/8600f7dd-3e2a-4b84-b975-68119a507460-d353/specs/', {
        // page.goto('https://xd.adobe.com/view/04d02b95-676b-4c75-8891-3c8370e6ea06-5183/screen/ea09e7a1-6e5d-4f17-b41b-0a40be78ff3b/specs/', {
        waitUntil: 'networkidle0', timeout: 90000
    })
}

export const goToAmazon = async (page) => {
    page.goto('https://amzn.to/3fly8DY', { waitUntil: 'networkidle0', timeout: 90000 })
}