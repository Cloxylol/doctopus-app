const nodemailer = require('nodemailer');

const transporter = nodemailer.createTransport({
    service: 'gmail',
    auth: {
        user: 'doctopus.notif@gmail.com',
        pass: 'pbepvdamoobptsso'
    }
});

exports.sendEmail = async (to, subject, html) => {
    await transporter.sendMail({
        from: '"Doctopus" <doctopus.notif@gmail.com>',
        to,
        subject,
        html
    });
};
