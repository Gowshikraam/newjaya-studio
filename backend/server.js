const express = require('express');
const path = require('path');
const nodemailer = require('nodemailer');
const cors = require('cors');
const bodyParser = require('body-parser');

const app = express();
const PORT = 5000;

// Middleware
app.use(cors());
app.use(bodyParser.json());

// Serve static files from the root directory
app.use(express.static(path.join(__dirname, '..')));

// Email sending endpoint
app.post('/send', (req, res) => {
  const { name, email, message } = req.body;

  const transporter = nodemailer.createTransport({
    service: 'gmail',
    auth: {
      user: 'raamgowshik@gmail.com',
      pass: 'qzmecgrfxegglsht' // Use your Gmail App Password here
    }
  });

  const mailOptions = {
    from: email,
    to: 'raamgowshik@gmail.com',
    subject: `New message from ${name}`,
    text: `Name: ${name}\nEmail: ${email}\nMessage: ${message}`
  };

  transporter.sendMail(mailOptions, (error, info) => {
    if (error) {
      console.log('Error:', error);
      res.status(500).json({ success: false, error: error.toString() });
    } else {
      console.log('Email sent:', info.response);
      res.status(200).json({ success: true });
    }
  });
});

app.listen(PORT, () => {
  console.log(`Server running on http://localhost:${PORT}`);
});
