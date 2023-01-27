import { getPanel, setInput } from "./common.js"

export const getSize = async (page) => {
    const panel = await getPanel(page, "SIZE & POS")
    if (!panel) return 0
    // Grab all Inputs
    const panelContent = await panel.waitForSelector('.properties-panel-content-wrapper .panel-section-content')
    await panelContent.waitForSelector('.si-c-property-input')
    const [widthGrp, leftGrp, heightGrp, topGrp, rotateGrp] = await panelContent.$$('.si-c-property-input')

    // Left (X)
    const leftInput = await leftGrp.waitForSelector('input')
    const left = await leftInput.evaluate(el => el.value)
    // Top (Y)
    const topInput = await topGrp.waitForSelector('input')
    const top = await topInput.evaluate(el => el.value)
    // Width (Y)
    const widthInput = await widthGrp.waitForSelector('input')
    const width = await widthInput.evaluate(el => el.value)
    // Height (Y)
    const heightInput = await heightGrp.waitForSelector('input')
    const height = await heightInput.evaluate(el => el.value)
    // Rotate (Y)
    const rotateInput = await rotateGrp.waitForSelector('input')
    const rotate = await rotateInput.evaluate(el => el.value)

    return {
        left, top, width, height, rotate,
        leftInput, topInput, widthInput, heightInput, rotateInput
    }
}

export const setSizeAll = async (page, deets) => {
    const { leftInput, topInput, widthInput, heightInput, rotateInput } = await getSize(page)
    await setInput(leftInput, deets.left)
    await setInput(topInput, deets.top)
    await setInput(widthInput, deets.width)
    await setInput(heightInput, deets.height)
    await setInput(rotateInput, deets.rotate)
    console.log('changed Size')
}

// export const setWidth = async (value) => {
//     const { widthInput } = await getSize(page)
//     await setInput(widthInput, value)
// }