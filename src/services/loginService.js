const puppeteer = require('puppeteer')

function sleep(ms) {
    return new Promise((resolve) => setTimeout(resolve, ms));
}

const login = async (username, password) => {
    const browser = await puppeteer.launch({
        headless: true,
    });
    const page = await browser.newPage();
    page.setViewport({ width: 1200, height:720 });
    await page.goto('https://qldt.ptit.edu.vn/#/home',{waitUntil:"networkidle0"});
    await page.waitForSelector('input[name="username"]', {
        timeout: 1000,
    });
    await page.type('input[name="username"]', username)
    await page.type('input[type="password"]', password)
    const element = await page.$('button[class="btn btn-primary mb-1 ng-star-inserted"]')
    await element.click()
    await sleep(5000)
    const alertExists = await page.$$('.alert.alert-danger')
    if (alertExists.length != 0) {
        console.log('Đăng nhập không thành công');
        return 0
    } else {
        console.log('Đăng nhập thành công');
        return 1
    }
}
module.exports = { login   }