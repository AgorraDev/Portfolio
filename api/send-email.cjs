const nodemailer = require('nodemailer');
const express = require('express');
const rateLimit = require('express-rate-limit');
require('dotenv').config();

const cors = require('cors');
const app = express();

app.use(cors({ 
    origin: ['http://localhost:5173',
             'https://your-vercel-site.vercel.app',
            ],
    methods: ['GET','POST'],
    credentials: true,
    allowedHeaders: ['Content-Type', 'x-api-key']
 }));

 app.use(express.json());

//Setting limit on emails sent per 15mins to protect from spam
let emailLimiter;
if (!emailLimiter) {
const emailLimiter = rateLimit({
    windowMs: 15 * 60 * 1000, //15 minutes
    max: 3, //Limiting emails to 3 per 15 minutes
    handler: (req, res) => {
        res.status(429).json({ message: 'Too many requests, please try again later.' })
    },
});
}

module.exports = async (req, res) => {
    if(req.method !== 'POST') {
        return res.status(405).json({ message: 'Method not allowed'})
    }

    emailLimiter(req, res, async () => {
        const {name, email, message } = req.body;
 

    if (!name || !email || !message) {
        return res.status(400).json( {message: 'All fields are required.'});
    }

    try {
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

        await transporter.sendMail(mailOptions);
        return res.status(200).json({ message: 'Email sent successfully!'});
   } catch (error) {
        console.error('Error sending email:', error)
        res.status(500).json({ message: `Failed to send email.${error.message}`});
   }
});
};