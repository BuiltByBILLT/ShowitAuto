import puppeteer from 'puppeteer';
import { changeAll } from './inputs.js';
import { goToXD, loginShowit } from './login.js';
import { getDeets } from './scrapeXD.js';
import { clickMobileTab } from './showit/common.js';

const main = async () => {
    const xdBrowser = await puppeteer.launch({
        headless: false,
        defaultViewport: null,
        // args: ['--window-size=1024,868', '--window-position=-1366,112']
        args: ['--window-size=1480,1090', '--window-position=0,0']
    });
    const showitBrowser = await puppeteer.launch({
        headless: false,
        defaultViewport: null,
        args: ['--window-size=1480,1090', '--window-position=0,0']
    });
    const xdPage = (await xdBrowser.pages())[0]
    const showitPage = (await showitBrowser.pages())[0];

    await Promise.all([
        loginShowit(showitPage),
        goToXD(xdPage)
    ]);
    console.log("all loaded")

    try {
        await xdPage.evaluate(() => { document.myListener = e => { if (e.code === "Backquote") { keyKey = true } } });
        await showitPage.evaluate(() => { document.myListener = e => { if (e.code === "Backquote") { keyKey = true } } });

        for (let i = 0; i < 200; i++) {
            try {
                await xdPage.evaluate(() => {
                    keyKey = false;
                    document.addEventListener("keydown", document.myListener);
                });
                await xdPage.waitForFunction("keyKey", { timeout: 0 });
                await xdPage.evaluate(() => keyKey = false)
                const deets = await getDeets(xdPage)
                await xdPage.evaluate(() => {
                    document.removeEventListener("keydown", document.myListener);
                });

                await showitPage.evaluate(() => {
                    keyKey = false;
                    document.addEventListener("keydown", document.myListener);
                });
                await showitPage.waitForFunction("keyKey", { timeout: 0 });
                await showitPage.evaluate(() => keyKey = false)
                await clickMobileTab(showitPage)
                await changeAll(showitPage, deets)
                await showitPage.evaluate(() => {
                    document.removeEventListener("keydown", document.myListener);
                });
            } catch (err) { throw err }
        }
    } catch (err) {
        console.error(err);
        await showitBrowser.close();
        await xdBrowser.close();
    }
}
main()