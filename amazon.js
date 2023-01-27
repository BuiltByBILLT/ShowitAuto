import puppeteer from 'puppeteer';
import { getImage } from './fetch.js';
import { changeAll, changeSize, changeText } from './inputs.js';
import { goToAmazon, goToXD, loginShowit } from './login.js';
import { clickDesktopTab, clickMobileTab } from './showit/common.js';
import { getSize, setSizeAll } from './showit/getSize.js';
import { getText, setTextAll } from './showit/getText.js';

const main = async () => {
    const browser = await puppeteer.launch({
        headless: false,
        defaultViewport: null,
        args: ['--window-size=1480,1090', '--window-position=0,0']
    });
    // const browser2 = await puppeteer.launch({
    //     headless: false,
    //     defaultViewport: null,
    //     args: ['--window-size=1480,1090', '--window-position=0,0']
    // });

    // const amzPage = (await browser2.pages())[0]
    const showitPage = (await browser.pages())[0];

    await loginShowit(showitPage)

    try {
        await showitPage.evaluate(() => {
            keyKey = false;
            document.addEventListener("keydown", e => { if (e.code === "Backquote") { keyKey = true } });
        });

        for (let i = 0; i < 200; i++) {
            try {
                await showitPage.waitForFunction("keyKey", { timeout: 0 });
                console.log("[node/puppeteer showit] keyKey was pressed!");


                // getImage(amzPage)
                // const { next, mobile } = calcNext(deets)


                console.log('Done')
                await showitPage.evaluate(() => { keyKey = false; });
            } catch (err) { throw err }
        }
        return;

    } catch (err) {
        console.error(err.message);
        await browser.close();
        // await browser2.close();
    }
}
main()