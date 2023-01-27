
export const getAddBar = async (page) => {
    const elementsBar = await page.waitForSelector('[data-intercom-target="add elements"]')
    const [addText, , addTextMenu, , addShape, , addShapeMenu, , addMedia] = await elementsBar.$$('div')
    const [addTitle, addHeading, addSubheading, addParagraph] = await addTextMenu.$$('a')
    const [addRectangle, addLine, addIcon] = await addShapeMenu.$$('a')
    return {
        elementsBar, addText, addTextMenu, addShape, addShapeMenu, addMedia,
        addTitle, addHeading, addSubheading, addParagraph, addRectangle, addLine, addIcon
    }
}

export const clickAddTitle = async (page) => {
    const { addText, addTitle } = await getAddBar(page)
    await addText.hover()
    await addText.waitForSelector('a')
    await addTitle.click()
}
export const clickAddHeading = async (page) => {
    const { addText, addHeading } = await getAddBar(page)
    await addText.hover()
    await addText.waitForSelector('a')
    await addHeading.click()
}
export const clickAddSubheading = async (page) => {
    const { addText, addSubheading } = await getAddBar(page)
    await addText.hover()
    await addText.waitForSelector('a')
    await addSubheading.click()
}


export const clickAddRectangle = async (page) => {
    const { addShape, addRectangle } = await getAddBar(page)
    console.log(addShape)
    await addShape.hover()
    await addShape.waitForSelector('a')
    await addRectangle.click()
}
export const clickAddLine = async (page) => {
    const { addShape, addLine } = await getAddBar(page)
    console.log(addShape)
    await addShape.hover()
    await addShape.waitForSelector('a')
    await addLine.click()
}
export const clickAddIcon = async (page) => {
    const { addShape, addIcon } = await getAddBar(page)
    console.log(addShape)
    await addShape.hover()
    await addShape.waitForSelector('a')
    await addIcon.click()
}

