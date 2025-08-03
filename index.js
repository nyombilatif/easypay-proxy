 // index.js
import express from 'express';
import https from 'https';
import cors from 'cors';
import dotenv from 'dotenv';

dotenv.config();

const app = express();
app.use(cors());
app.use(express.json());

const EASYPAY_URL = 'https://www.easypay.co.ug/api/';

app.post('/create-payment', (req, res) => {
    const payload = JSON.stringify(req.body);
    
    const options = {
        hostname: 'www.easypay.co.ug',
        path: '/api/',
        method: 'POST',
        headers: {
            'Content-Type': 'application/json',
            'Content-Length': Buffer.byteLength(payload),
            'Client-ID': process.env.EASYPAY_CLIENT_ID,
            'Secret-Key': process.env.EASYPAY_SECRET_KEY
        }
    };

    const apiReq = https.request(options, apiRes => {
        let data = '';
        apiRes.on('data', chunk => data += chunk);
        apiRes.on('end', () => {
            try {
                res.json(JSON.parse(data));
            } catch (err) {
                res.status(500).json({ error: "Invalid response from EasyPay", raw: data });
            }
        });
    });

    apiReq.on('error', err => {
        console.error('Request failed:', err);
        res.status(500).json({ error: "Request failed", details: err.message });
    });

    apiReq.write(payload);
    apiReq.end();
});

const PORT = process.env.PORT || 3000;
app.listen(PORT, () => {
    console.log(`EasyPay proxy running on port ${PORT}`);
});
