export const getDeets = async (page) => {
    const layoutProps = await page.waitForSelector('[class^=codeContentRect]')
    let raw = await layoutProps.evaluate(el => el.innerText)


    raw = raw.replace("/* Layout Properties */", "{")
    raw = raw.replace("/* UI Properties */\n", "")
    for (let i = 0; i < 20; i++) {
        raw = raw.replace("\n", "\"")
        raw = raw.replace(": ", "\":\"")
        raw = raw.replace(";", "\",")
    }
    raw = raw.slice(0, -1)
    raw = raw.concat("}")

    let obj = JSON.parse(raw)
    obj.top = obj.top.slice(0, -2)
    obj.left = obj.left.slice(0, -2)
    obj.width = obj.width.slice(0, -2)
    obj.height = obj.height.slice(0, -2)
    obj.rotate = '0'

    // If Rotate
    if (obj.transform) {
        obj.rotate = convertToAngle(obj.transform)
        if (obj.rotate < 0) obj.rotate = 360 + obj.rotate
        obj.rotate = String(obj.rotate)
    }

    // If Image 
    if (obj.background) {
        if (obj.background[0] === '#') obj.backgroundColor = obj.background.slice(0, 7)
    }
    if (obj.border) {
        obj.borderSize = obj.border.split(' ')[0].slice(0, -2)
        obj.borderColor = obj.border.split(' ')[2]
    }
    if (obj['border-radius']) {
        obj.borderRadius = obj['border-radius'].slice(0, -2)
    }
    obj.opacity = String(Number(obj.opacity) * 100) || '100'

    // If Text
    if (await page.$('[data-auto="textContent"]')) {
        await page.click('[data-auto="textContent"]')
        obj.width = String(Number(obj.width) + 5) // Extra
        if (obj.font) {
            let tempSize = Number(obj.font.match(/\d{1,3}px/g)[0].slice(0, -2))
            let tempLine = Number(obj.font.match(/\d{1,3}px/g)[1].slice(0, -2))
            let tempLetter = Number(obj['letter-spacing'].slice(0, -2))
            obj.fontSize = String(tempSize)
            obj.lineHeight = String((tempLine / tempSize).toFixed(2))
            obj.letterSpacing = String((tempLetter / tempSize).toFixed(2))
            obj.fontFamily = obj.font.match(/px .+/)[0].slice(3)
        } else {
            obj.fontFamily = "Sk-Modernist"
            obj.fontSize = '14'
            obj.lineHeight = '1.57'
            obj.letterSpacing = '0.03'
        }
        obj.color = obj.color
        obj.letterCase = obj['text-transform'] || "normal"
        obj.align = obj['text-align']
        // Dont tigger Shape
        obj.borderSize = undefined
        obj.backgroundColor = undefined
    }



    console.log(obj)
    return obj
}

function convertToAngle(matrix) {
    var values = matrix.split('(')[1],
        values = values.split(')')[0],
        values = values.split(',');

    var sin = values[1]; // 0.5

    return Math.round(Math.asin(sin) * (180 / Math.PI));
}