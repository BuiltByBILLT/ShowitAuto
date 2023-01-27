import { setEffectsAll } from "./showit/getEffects.js"
import { setShapeAll } from "./showit/getShape.js"
import { setSizeAll } from "./showit/getSize.js"
import { setTextAll } from "./showit/getText.js"

export const changeAll = async (page, deets) => {
    // Size
    deets.top = String(Number(deets.top) - 1920)
    await setSizeAll(page, deets)
    //Text
    if (deets.fontFamily) {
        convertFonts(deets)
        await setTextAll(page, deets)
    }
    //Shape
    if (deets.backgroundColor || deets.borderSize) await setShapeAll(page, deets)
    // if (deets.backgroundColor) await setShapeAll(page, deets)
    // Effects
    if (deets.borderRadius || deets.opacity !== "100") await setEffectsAll(page, deets)
}

const convertFonts = (deets) => {
    if (deets.fontFamily === 'Eugene') deets.fontFamily = 'Eugene'
    if (deets.fontFamily === 'Garet') deets.fontFamily = 'Garet Book'
    if (deets.fontFamily === 'Oakley Script') deets.fontFamily = 'Oakley'
    if (deets.fontFamily === 'Sk-Modernist') deets.fontFamily = 'Sk Modernist Regular'
    if (deets.fontFamily === 'Avenir') deets.fontFamily = 'Sk Modernist Regular'
}