
export const addShopItem = async (page, deets) => {
    calcNext(deets)
}

const calcNext = (deets) => {
    const next = {}
    const mobile = {}

    // Calc from Deets 
    if (deets.leftValue === '807') next.whiteY = String(Number(deets.topValue) + 400)
    else next.whiteY = deets.topValue

    if (deets.leftValue === '118') next.whiteX = '463'
    else if (deets.leftValue === '463') next.whiteX = '807'
    else if (deets.leftValue === '807') next.whiteX = '118'

    next.whiteW = "275"
    next.whiteH = "275"

    // Pic & Text
    next.textX = next.whiteX
    next.textY = String(Number(next.whiteY) + 300)
    next.textW = "275"
    next.textH = "55"
    next.picX = String(Number(next.whiteY) + 37)
    next.picY = String(Number(next.whiteY) + 53)
    next.picW = "200"
    next.picH = "170"


    // Mobile
    mobile.whiteY = String(Number(deets.mobValue) + 300)
    mobile.whiteW = "230"
    mobile.whiteH = "230"
    mobile.whiteX = "45"

    // Pic & Text
    mobile.textX = mobile.whiteX
    mobile.textY = String(Number(mobile.whiteY) + 250)
    mobile.textW = "230"
    mobile.textH = "45"
    mobile.picX = String(Number(mobile.whiteY) + 10)
    mobile.picY = String(Number(mobile.whiteY) + 45)
    mobile.picW = "211"
    mobile.picH = "131"

    console.log(next)
    console.log(mobile)
    return { next, mobile }
}

const insertShowit = async (page, next, mobile) => {
}