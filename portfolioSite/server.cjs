

const nodemailer = require('nodemailer');
const express = require('express');
require('dotenv').config();

const cors = require('cors');
const app = express();

app.use(cors({ 
    origin: 'http://localhost:5173',
    methods: 'POST',
    allowedHeaders: ['Content-Type', 'x-api-key']
 }));

 app.use(express.json());

//Setting limit on emails sent per 15mins to protect from spam
const rateLimit = require('express-rate-limit');
const emailLimiter = rateLimit({
    windowMs: 15 * 60 * 1000, //15 minutes
    max: 3, //Limiting emails to 3 per 15 minutes
});

app.post('/api/send-email', emailLimiter ,async (req, res) => {
    const {name, email, message } = req.body;

    if (!name || !email || !message) {
        return res.status(400).json( {message: 'All fields are required.'});
    }

    const transporter = nodemailer.createTransport({
        service: 'Gmail',
        auth: {
            user: process.env.EMAIL,
            pass: process.env.EMAIL_PASSWORD,
        },
    });

    const mailOptions = {
        from: email,
        to: process.env.RECEIVER_EMAIL,
        subject: `Message from ${name}`,
        text: `You have a message from ${name} - (${email})
        ---------------------------
        ${message}
        `,
    };
    try {
        await transporter.sendMail(mailOptions);
        res.status(200).json({ message: 'Email sent successfully!'});
   } catch (error) {
        res.status(500).json({ message: `Failed to send email.${error}`});
   }
});

const PORT = process.env.PORT || 5000;

app.listen(PORT, () => console.log(`Server running on ${PORT}`));