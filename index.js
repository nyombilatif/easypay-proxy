// index.js
import express from 'express';
import axios from 'axios';
import dotenv from 'dotenv';

dotenv.config();
const app = express();
const PORT = process.env.PORT || 10000;

app.use(express.json());

app.post('/easypay', async (req, res) => {
  try {
    const response = await axios.post(
      'https://app.easypay.co.ug/api/',
      req.body,
      {
        headers: {
          'Content-Type': 'application/json',
          'Accept': 'application/json',
          'Authorization': 'Bearer ' + process.env.EASYPAY_SECRET
        }
      }
    );

    res.status(200).json(response.data);
  } catch (error) {
    console.error('Proxy error:', error.message);
    res.status(500).json({ error: 'Failed to reach EasyPay proxy or you are using wrong information' });
  }
});

app.listen(PORT, () => {
  console.log(`EasyPay proxy running on port ${PORT}`);
});
