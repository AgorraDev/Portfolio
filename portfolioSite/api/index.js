import nodemailer from 'nodemailer';
import rateLimit from 'express-rate-limit';

dotenv.config();

// const express = require('express');
// const cors = require('cors');
// const app = express();

//Setting limit on emails sent per 15mins to protect from spam
const emailLimiter = rateLimit({
    windowMs: 15 * 60 * 1000, //15 minutes
    max: 3, //Limiting emails to 3 per 15 minutes
    handler: (req, res) => {
        res.status(429).json({ message: 'Too many requests, please try again later.' })
    },
});

const allowedOrigins = [
                    'http://localhost:5173',
                    'https://portfolio-ten-puce-59.vercel.app',
                    'https://portfolio-puce-nine-33.vercel.app',
                    'https://portfolio-agorradevs-projects.vercel.app/'
                    ]


export default async (req, res) => {
    //Manually set CORS headers
    const origin = req.headers.origin ; 
    if (allowedOrigins.includes(origin)) {
        res.setHeader('Access-Control-Allow-Origin', origin);
    }
    res.setHeader('Access-Control-Allow-Methods', 'POST, OPTIONS');
    res.setHeader('Access-Control-Allow-Headers', 'Content-Type');
    
    if (req.method === 'OPTIONS') {
        return res.status(200).end();
    }
    
    if(req.method !== 'POST') {
        return res.status(405).json({ message: 'Method not allowed'});
    }


    await new Promise ((resolve) => 
        emailLimiter(req, res, resolve)
    );

    const { name, email, message } = req.body;

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
        return res.status(500).json({ message: `Failed to send email.${error.message}`});
   }
};
