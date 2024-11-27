const puppeteer = require('puppeteer');

// Hàm delay tiện lợi
function sleep(ms) {
    return new Promise((resolve) => setTimeout(resolve, ms));
}

const login = async (username, password) => {
    let browser;
    try {
        // Khởi động Puppeteer với các cờ phù hợp
        browser = await puppeteer.launch({
            headless: true,
            args: [
                '--no-sandbox',
                '--disable-setuid-sandbox',
                '--disable-dev-shm-usage', // Giảm yêu cầu bộ nhớ
                '--disable-gpu', // Tắt GPU (trên máy không có đồ họa)
                '--no-first-run',
                '--no-zygote'
            ],
            executablePath: '/usr/bin/chromium-browser'
        });

        const page = await browser.newPage();
        page.setDefaultTimeout(200000);

        // Điều hướng tới trang đăng nhập
        await page.goto('https://qldt.ptit.edu.vn/#/home', { waitUntil: 'networkidle0' });

        await page.waitForSelector('input[name="username"]', { timeout: 5000 });
        await page.type('input[name="username"]', username);
        await page.type('input[type="password"]', password);

        const loginButton = await page.$('button[class="btn btn-primary mb-1 ng-star-inserted"]');
        if (!loginButton) {
            console.log('Nút đăng nhập không tồn tại!');
            throw new Error('Nút đăng nhập không tồn tại!');
        }
        await loginButton.click();
        await sleep(2000);

        const alertExists = await page.$$('.alert.alert-danger');
        if (alertExists.length !== 0) {
            console.log('Đăng nhập không thành công');
            return 0; // Lỗi đăng nhập
        }

        console.log('Đăng nhập thành công');
        return 1; // Đăng nhập thành công
    } catch (error) {
        console.error('Lỗi trong quá trình đăng nhập:', error.message);
        return 0; // Lỗi hệ thống
    } finally {
        if (browser) {
            await browser.close();
        }
    }
};