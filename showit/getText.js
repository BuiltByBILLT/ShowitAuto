import { setColor, setInput, setSelect, getPanel } from "./common.js"

export const getText = async (page) => {
    // Enter TEXT STYLE Header
    const panel = await getPanel(page, "TEXT STYLE")
    if (!panel) return 0

    // Grab all Inputs
    const panelContent = await panel.waitForSelector('.properties-panel-content-wrapper .panel-section-content')
    const [styleGrp, colorGrp, fontGrp, fontSizeGrp, lineHeightGrp, letterSpacingGrp, letterCaseGrp, alignGrp]
        = await panelContent.$$('.si-c-property-input')

    // Color
    const colorPicker = await colorGrp.$('div')
    const colorPreview = await colorPicker.$('div')
    await colorPreview.click()
    const hexInput = await page.waitForSelector('.sp-input')
    const color = await hexInput.evaluate(el => el.value)
    await page.keyboard.press('Escape')

    // Font
    const fontSelect = await fontGrp.waitForSelector('select')
    const fontFamily = await fontSelect.evaluate(el => el.value)
    // Font Size
    const fontSizeInput = await fontSizeGrp.waitForSelector('input')
    const fontSize = await fontSizeInput.evaluate(el => el.value)
    // Line Height
    const lineHeightInput = await lineHeightGrp.waitForSelector('input')
    const lineHeight = await lineHeightInput.evaluate(el => el.value)
    // Letter Spacing
    const letterSpacingInput = await letterSpacingGrp.waitForSelector('input')
    const letterSpacing = await letterSpacingInput.evaluate(el => el.value)
    // Letter Case
    const letterCaseSelect = await letterCaseGrp.waitForSelector('select')
    const letterCase = await letterCaseSelect.evaluate(el => el.value)
    // Align
    const alignButtons = await alignGrp.waitForSelector('div')
    const alignTitle = await alignButtons.evaluate(el =>
        Array.from(el.querySelectorAll('div')).find(div => div.classList.length == 1).title
    )
    const align = alignTitle.toLowerCase()

    return {
        fontSize, lineHeight, letterSpacing, fontFamily, letterCase, color, align,

        fontSizeInput, lineHeightInput, letterSpacingInput,
        colorPreview, fontSelect, letterCaseSelect, alignButtons,
    }
}



export const setTextAll = async (page, deets) => {
    const { fontSizeInput, lineHeightInput, letterSpacingInput,
        colorPreview, fontSelect, letterCaseSelect, alignButtons
    } = await getText(page)

    await setInput(fontSizeInput, deets.fontSize)
    await setInput(lineHeightInput, deets.lineHeight)
    await setInput(letterSpacingInput, deets.letterSpacing)

    await setColor(page, colorPreview, deets.color)

    await setSelect(fontSelect, deets.fontFamily)
    await setSelect(letterCaseSelect, deets.letterCase)

    const alignButton = await alignButtons.waitForSelector(`[data-align=${deets.align}]`)
    await alignButton.click()

    await lineHeightInput.click()
    console.log('changed Text')
}
