import { getPanel, setInput } from "./common.js"

export const getEffects = async (page) => {
    console.log('getting effects')
    const panel = await getPanel(page, "EFFECTS")
    if (!panel) return 0
    // Grab all Inputs
    const panelContent = await panel.waitForSelector('.properties-panel-content-wrapper .panel-section-content')
    const [opacityGrp, shadowGrp, cornersGrp] = await panelContent.$$('.si-c-property-input')

    const opacityInput = await opacityGrp.waitForSelector('input')
    const opacity = await opacityInput.evaluate(el => el.value)

    const cornersButtons = await cornersGrp.waitForSelector('div')
    const cornersTitle = await cornersButtons.evaluate(el =>
        Array.from(el.querySelectorAll('button')).find(div => div.classList.length == 2).title
    )
    const corners = cornersTitle.toLowerCase()


    return { opacityInput, cornersButtons, panelContent }
}

export const setEffectsAll = async (page, deets) => {
    console.log('setting Effects')
    const { opacityInput, cornersButtons } = await getEffects(page)

    await setInput(opacityInput, deets.opacity)

    if (deets.borderRadius) {
        const cornersButton = await cornersButtons.waitForSelector(`[title="Round"]`)
        await cornersButton.click()
        const panel = await getPanel(page, "EFFECTS")
        const panelContent = await panel.waitForSelector('.properties-panel-content-wrapper .panel-section-content')
        const cornersGrp = await panelContent.waitForSelector('.offset-left-subpanel')
        const cornersGrid = await cornersGrp.waitForSelector('div')
        const radiusGrp = await cornersGrid.waitForSelector('div')
        const radiusInput = await radiusGrp.waitForSelector('input')
        await setInput(radiusInput, deets.borderRadius)
        const lockButton = await cornersGrid.waitForSelector('button')
        await lockButton.click()

    }
    console.log('changed Effects')
}
