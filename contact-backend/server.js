const express = require('express');
const cors = require('cors');
const bodyParser = require('body-parser');
const nodemailer = require('nodemailer');

const app = express();
const PORT = 3000;

app.use(cors());
app.use(bodyParser.json());

app.post('/send-email', async (req, res) => {
  const { name, email, subject, message } = req.body;

  if (!name || !email || !subject || !message) {
    return res.status(400).send('Missing required fields');
  }

  // 🛠 Replace with your real credentials
  const transporter = nodemailer.createTransport({
    service: 'gmail',
    auth: {
      user: '', // Your Gmail address
      pass: '' // Use an App Password (not your Gmail password)
    }
  });



const adminMailOptions = {
  from: email,
  to: '',
  subject: `📬 New Message From Portfolio: ${subject}`,
  html: `
    <div style="font-size: 16px; font-family: Arial, sans-serif;">
      <h2 style="font-size: 20px;">📨 New Message From Portfolio Submission</h2>
      <p><strong>Name:</strong> ${name}</p>
      <p><strong>Email:</strong> ${email}</p>
      <p><strong>Subject:</strong> ${subject}</p>
      <p><strong>Message:</strong></p>
      <p style="white-space: pre-line;">${message}</p>
    </div>
  `
};


const userMailOptions = {
  from: '', // Your Gmail address
  to: email,
  subject: '✅ Thank you for contacting Arun!',
  html: `
    <div style="font-size: 16px; font-family: Arial, sans-serif;">
      <p>Hi <strong>${name}</strong>,</p>

      <p>Thank you for getting in touch through my portfolio. I’ve received your message:</p>

      <blockquote style="margin-left: 1rem; color: #555;">
        <em>${message}</em>
      </blockquote>

      <p>I’ll review your message and get back to you shortly.</p>

      <p>Warm regards,<br><strong>Arun R</strong></p>
    </div>
  `
};




  try {
    // Send both emails in parallel
    await transporter.sendMail(adminMailOptions);
    await transporter.sendMail(userMailOptions);

    console.log('✅ Admin and user emails sent');
    res.status(200).json({ success: true, message: "Message sent" });
  } catch (err) {
    console.error('❌ Error sending emails:', err);
    res.status(500).json({ success: false, error: "Failed to send email" });
  }
});

app.listen(PORT, () => {
  console.log(`✅ Server running on http://localhost:${PORT}`);
});
