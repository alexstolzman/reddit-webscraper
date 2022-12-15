const puppeteer = require('puppeteer')
var fs = require('fs');

async function getPostTitles() {
	try {
		const URL = 'https://old.reddit.com/r/wildhockey/'
		const browser = await puppeteer.launch()

		const page = await browser.newPage()
		await page.goto(URL)

        let count=0
        const allValues=[]

        //for the first # pages on the subreddit
        while(count<200 && await page.$(".next-button") != null){
            //Get the text of every title
            var values = await page.$$eval("div > p.title > a", elements=> elements.map(item=>item.textContent))
            allValues.push(...values)

            //Go to next page
            await page.click('.next-button a');
            //wait for page to load
            await page.waitForTimeout(100)

            count++
        }

        await fs.writeFileSync('./files/posts.txt', allValues.join('\n'));

		await browser.close()
	} catch (error) {
		console.error(error)
	}
}

getPostTitles()