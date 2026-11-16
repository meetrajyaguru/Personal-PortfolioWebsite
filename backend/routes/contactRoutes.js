const express = require('express');
const router = express.Router();
const Contact = require('../models/Contact');
const nodemailer = require('nodemailer');

router.post('/', async (req, res) => {
  try {
    const { name, email, message } = req.body || {};

    if (!name || !email || !message) {
      return res.status(400).json({
        success: false,
        message: 'Please provide name, email, and message',
      });
    }

    const newContact = new Contact({
      name,
      email,
      message,
    });

    await newContact.save();

    let notificationSent = false;
    const smtpUser = process.env.SMTP_USER;
    const smtpAppPassword = process.env.SMTP_APP_PASSWORD;

    if (smtpUser && smtpAppPassword) {
      try {
        const transporter = nodemailer.createTransport({
          service: 'gmail',
          auth: {
            user: smtpUser,
            pass: smtpAppPassword,
          },
        });

        await transporter.sendMail({
          from: `"Portfolio Contact Form" <${smtpUser}>`,
          to: process.env.CONTACT_TO || smtpUser,
          replyTo: email,
          subject: `Portfolio contact from ${name}`,
          text: `Name: ${name}\nEmail: ${email}\n\n${message}`,
        });
        notificationSent = true;
      } catch (error) {
        console.error('Contact email notification failed:', error.message);
      }
    } else {
      console.warn('Contact email notification skipped: SMTP_USER or SMTP_APP_PASSWORD is not configured.');
    }

    res.status(201).json({
      success: true,
      message: 'Message sent successfully!',
      notificationSent,
      data: newContact,
    });
  } catch (error) {
    if (error.name === 'ValidationError') {
      return res.status(400).json({
        success: false,
        message: Object.values(error.errors)
          .map((validationError) => validationError.message)
          .join(' '),
      });
    }

    console.error('Error saving contact:', error.message);
    res.status(500).json({
      success: false,
      message: 'Server error. Please try again later.',
    });
  }
});

// ✅ GET /api/contact - Get all submissions (admin only)
router.get('/', async (req, res) => {
  try {
    const contacts = await Contact.find().sort({ createdAt: -1 });
    res.status(200).json({
      success: true,
      count: contacts.length,
      data: contacts,
    });
  } catch (error) {
    console.error('Error fetching contacts:', error);
    res.status(500).json({
      success: false,
      message: 'Server error',
    });
  }
});

module.exports = router;
