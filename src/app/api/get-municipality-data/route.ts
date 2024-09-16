import puppeteer from 'puppeteer'
import pdf from 'pdf-parse'

interface PropertyDataType {
    href: string,
    ownerContactName: string,
    propertyOwnerName: string,
    address: string
}

export async function POST(req: Request) {
    console.log('yuhs')
    const municipality = await req.json() as string

    const browser = await puppeteer.launch({
        headless: false
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

    let houseData: PropertyDataType[] = await page.evaluate(() => {
        const trItems = Array.from(document.querySelectorAll('#piListBody tr'))
        const linksAndAddresses = trItems.map(tr => {
            const aTag = tr.querySelector('a')
            const href = aTag?.getAttribute('href') ?? 'No href data'
            const location = tr.querySelector('td:nth-child(3)')
            const locationData = location?.innerHTML ?? 'No address information'
            return {
                href,
                address: locationData,
                ownerContactName: '',
                propertyOwnerName: ''
            }
        })
        return linksAndAddresses
    })

    let houseIndex = 0
    for (const house of houseData) {
        await page.goto(`https://njdcaportal.dynamics365portals.us${house.href}`)
        const pageInfo = await page.evaluate(() => {
            const propertyOwnerElement = document.querySelector('#ultra_propertyowner_name')
            const propertyOwnerName = propertyOwnerElement?.getAttribute('value') ?? 'No property owner information'
            const ownerContactElement = document.querySelector('#ultra_ownercontact_name')
            let ownerContactName = ownerContactElement?.getAttribute('value') ?? 'No owner contact information'
            const registrationButton = document.querySelector('#certificateOfRegistrationBtn') 
            const href = registrationButton?.getAttribute('id')
            const isDisabled = registrationButton?.getAttribute('disabled')
            return {
                ownerContactName,
                propertyOwnerName,
                registrationButton: {
                    href,
                    isDisabled
                }
            }
        })
        houseData[houseIndex].ownerContactName = pageInfo.ownerContactName
        houseData[houseIndex].propertyOwnerName = pageInfo.propertyOwnerName

        console.log(pageInfo.registrationButton)
        if (pageInfo.registrationButton.isDisabled) continue
        page.locator('#certificateOfRegistrationBtn').click()

        console.log(pageInfo)
        // const response = await page.goto(pageInfo.registrationButton.href as string)
        // const pdfBuffer = await response?.buffer();

        // if (pdfBuffer) {
        //     const data = await pdf(pdfBuffer);
        //     console.log('PDF Text:', data.text);
        // }

        houseIndex++
    }
    console.log(houseData)
    await browser.close
    return new Response('yellow')
}

