import { getPanel, setColor, setInput } from "./common.js"

export const getShape = async (page) => {
    console.log('getting shape')
    const panel = await getPanel(page, "SHAPE")
    if (!panel) return 0
    // Grab all Inputs
    const panelContent = await panel.waitForSelector('.properties-panel-content-wrapper .panel-section-content')
    const [fillGrp, backgroundColorGrp, borderSizeGrp, borderColorGrp] = await panelContent.$$('.si-c-property-input')

    const backgroundColorPicker = await backgroundColorGrp.$('div')
    const backgroundColorPreview = await backgroundColorPicker.$('div')

    const borderColorPicker = await borderColorGrp.$('div')
    const borderColorPreview = await borderColorPicker.$('div')

    const borderSizeInput = await borderSizeGrp.waitForSelector('input')
    const borderSize = await borderSizeInput.evaluate(el => el.value)

    return { backgroundColorPreview, borderColorPreview, borderSizeInput }
}

export const setShapeAll = async (page, deets) => {
    console.log('changing shape')
    const { backgroundColorPreview, borderColorPreview, borderSizeInput } = await getShape(page)

    await setInput(borderSizeInput, deets.borderSize)
    console.log("set border")
    await setColor(page, backgroundColorPreview, deets.backgroundColor)
    console.log("set background")
    await setColor(page, borderColorPreview, deets.borderColor)
    console.log("set border")
    console.log('changed Shape')
}
