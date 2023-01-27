export const getImage = async (page) => {
    const amzLink = await showitPage.evaluate(() => prompt("Amazon Link"))
    console.log(amzLink)
    await amzPage.goto(amzLink)
    const imgWrapper = await amzPage.waitForSelector("#imgTagWrapperId")
    console.log(imgWrapper)
    console.log(await amzPage.evaluate(el => document.querySelector("#imgTagWrapperId")))
    console.log(await imgWrapper.evaluate(el => el.innerHTML))
    const img = await imgWrapper.waitForSelector("img")
    console.log(await img.evaluate(el => el.innerHTML))
    const imgLink = await img.evaluate((el) => el.src)
    console.log(imgLink)
    return imgLink
}