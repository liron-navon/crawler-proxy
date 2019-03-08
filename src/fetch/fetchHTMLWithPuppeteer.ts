const puppeteer = require('puppeteer');

// keep the browser alive as a singleton
let _browser = null;

// get a new browser page, make sure to call .close() when done with it
const getNewPage = async () => {
    if (!_browser) {
        _browser = await puppeteer.launch({
            headless: true,
            args: ['--no-sandbox']
        });
    }
    return await _browser.newPage();
};

const fetch = async (url: string) => {
    const page = await getNewPage();
    await page.goto(url, {waitUntil: 'networkidle2'});
    const html = await page.content();
    const output = {
        html,
        destination: page.url
    };
    await page.close();
    return output;
};

export default fetch;


