import puppeteer from 'puppeteer'

interface PropertyDataType {
    propertyName: null | string,
    propertyOwner: null | string,
    ownerContact: null | string,
    
}

export async function POST(req: Request) {
    const municipality = await req.json() as string

    const browser = await puppeteer.launch({
        headless: true
    })
    const page = await browser.newPage()
    await page.goto('https://njdcaportal.dynamics365portals.us/ultra-bhi-home/ultra-bhi-propertysearch/')

    const value = await page.evaluate((municipality) => {
        const options = Array.from(document.querySelectorAll('option'))
        const option = options.find(option => option.innerText.toLowerCase() === municipality.toLowerCase())
        const value = option?.getAttribute('value')
        return value as string
    }, municipality)

    await page.select('#ultra_municipality', value)
    await page.locator('#searchBtn').click()

    await page.waitForSelector('#piListBody a')

    const registrationLinks = await page.evaluate(() => {
        const linkTags = Array.from(document.querySelectorAll('#piListBody a'))
        const linkTagHrefs = linkTags.map(link => link.getAttribute('href'))
        return linkTagHrefs
    })

    let houseData = []
    for (const link of registrationLinks) {
        await page.goto(`https://njdcaportal.dynamics365portals.us${link}`)
        let houseInfo: = {}
    }
    await browser.close
    return new Response('yellow')
}

