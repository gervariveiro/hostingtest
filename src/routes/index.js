const {Router} = require('express');
const nodemailer = require('nodemailer');
const router = Router();


router.post('/send-email', async (req, res) => {
    const { name, email, phone, message } = req.body;
    
    contentHTML = `
        <h1>User Information</h1>
        <ul>
            <li>Username: ${name}</li>
            <li>User Email: ${email}</li>
            <li>User Phone: ${phone}</li>
        </ul>
        <p>${message}</p>
    `;

    console.log(contentHTML);

    const transporter = nodemailer.createTransport({
        host: 'smtp.gmail.com',
        port: 465,
        secure: true,
        auth: {
            user: `gervasioriveiro@gmail.com`,
            pass: `mgmvehfoofdurvmx`
        },
        tls:{
            rejectUnauthorized: false
        }
    });

/*transporter.sendMail({
        from: 'gervasioriveiro@gmail.com',
        to: 'gervasioriveiro@gmail.com',
        subject: 'Mail de prueba',
        text:'Esto es un  prueba'
    });*/

const info = await transporter.sendMail({
        from: '"Server Gmail" <gervasioriveiro@gmail.com>',
        to: 'gervasioriveiro@gmail.com',
        subject: 'Mail de prueba',
        html: contentHTML
    })

   /* res.send('received');
});*/

console.log('Message sent', info.messageId);

res.redirect('/success.html');

});

/*transporter.verify().then(() =>{
    console.log('Ready for send emails');
})*/

module.exports = router;