// index.js
import express from 'express';
import axios from 'axios';
import dotenv from 'dotenv';

dotenv.config();
const app = express();
const PORT = process.env.PORT || 1000;

app.use(express.json());

app.post('/easypay', async (req, res) => {
  try {
    const response = await axios.post('https://app.easypay.co.ug/api/', req.body, {
      headers: {
        'Content-Type': 'application/json',
        'Authorization': `Bearer ${process.env.EASYPAY_SECRET}`
      }
    });
    res.json({ status: 'success', ...response.data });
  } catch (err) {
    console.error('Proxy error:', err.message);
    res.status(500).json({ status: 'failure', message: err?.response?.data || err.message });
  }
});

app.listen(PORT, () => console.log(`Proxy listening on port ${PORT}`));
