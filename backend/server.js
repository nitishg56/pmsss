const express = require('express');
const bodyParser = require('body-parser');
const mongoose = require('mongoose');
const crypto = require('crypto');
const nodemailer = require('nodemailer');
const twilio = require('twilio');

const app = express();
const port = 3000;

app.use(bodyParser.json());
app.use(express.static('public'));  // Assuming front-end files are in the 'public' folder

// MongoDB connection
mongoose.connect('mongodb://localhost:27017/registrationDB', { useNewUrlParser: true, useUnifiedTopology: true });

// Define the user schema
const userSchema = new mongoose.Schema({
    email: String,
    mobile: String,
    otp: String,
    registrationNumber: String
});

const User = mongoose.model('User', userSchema);

// Twilio setup
const twilioClient = twilio('TWILIO_ACCOUNT_SID', 'TWILIO_AUTH_TOKEN');
const TWILIO_PHONE_NUMBER = 'YOUR_TWILIO_PHONE_NUMBER';

// Nodemailer setup
const transporter = nodemailer.createTransport({
    service: 'gmail',
    auth: {
        user: 'YOUR_EMAIL@gmail.com',
        pass: 'YOUR_EMAIL_PASSWORD'
    }
});

app.post('/send-otp', async (req, res) => {
    const { mobile } = req.body;
    const otp = crypto.randomInt(100000, 999999).toString();

    // Send OTP via SMS
    await twilioClient.messages.create({
        body: `Your OTP code is ${otp}`,
        from: TWILIO_PHONE_NUMBER,
        to: mobile
    });

    // Store OTP
    await User.updateOne({ mobile }, { otp }, { upsert: true });

    res.json({ message: 'OTP sent to your mobile number' });
});

app.post('/verify-otp', async (req, res) => {
    const { mobile, otp } = req.body;

    const user = await User.findOne({ mobile, otp });

    if (user) {
        const registrationNumber = crypto.randomInt(10000000, 99999999).toString();
        await User.updateOne({ mobile }, { registrationNumber });

        // Send Registration Number via Email
        const mailOptions = {
            from: 'YOUR_EMAIL@gmail.com',
            to: user.email,
            subject: 'Registration Successful',
            text: `Your registration number is ${registrationNumber}`
        };

        await transporter.sendMail(mailOptions);

        res.json({ message: 'OTP verified, registration number sent to your email' });
    } else {
        res.json({ message: 'Invalid OTP' });
    }
});

app.listen(port, () => {
    console.log(`Server running at http://localhost:${port}`);
});
