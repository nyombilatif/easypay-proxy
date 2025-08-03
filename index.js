// index.js - EasyPay proxy
const express = require('express');
const axios = require('axios');
const bodyParser = require('body-parser');
require('dotenv').config();

const app = express();
const PORT = process.env.PORT || 10000;

app.use(bodyParser.json());

app.post('/easypay', async (req, res) => {
  const { phone, amount, reason, currency, txref } = req.body;

  try {
    const response = await axios.post('https://www.easypay.co.ug/api/', {
      action: "mmdeposit",
      apikey: process.env.EASYPAY_ID,
      secret: process.env.EASYPAY_SECRET,
      amount,
      phone,
      reason,
      currency,
      reference: txref,
      callback: "https://shjeeeeganggroup.iceiy.com/ipn.php"
    }, {
      headers: {
        'Content-Type': 'application/json'
      }
    });

    res.json(response.data);
  } catch (error) {
    console.error('EasyPay proxy error:', error.message);
    res.status(500).json({ error: 'Failed to reach EasyPay' });
  }
});

app.listen(PORT, () => {
  console.log(`EasyPay proxy running on port ${PORT}`);
});
