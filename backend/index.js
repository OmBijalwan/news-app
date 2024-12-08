const express = require('express');
const path = require('path');
const axios = require('axios');
const cors = require('cors');

const app = express();
app.use(cors());
app.use(express.static(path.join(__dirname, '../frontend'))); // Serve frontend

const API_KEY = 'de3a6772f3814aa4b8b18f40aa50dd21'; // Replace this with your API key
const NEWS_API_URL = 'https://newsapi.org/v2/everything';

// API route for fetching news
app.get('/api/news', async (req, res) => {
    const { q } = req.query;
    try {
        const response = await axios.get(`${NEWS_API_URL}?q=${q}&apiKey=${API_KEY}`);
        res.json(response.data);
    } catch (error) {
        res.status(500).send('Error fetching news');
    }
});

// Catch-all route to serve the frontend
app.get('*', (req, res) => {
    res.sendFile(path.join(__dirname, '../frontend/index.html'));
});

const PORT = process.env.PORT || 3000;
app.listen(PORT, () => console.log(`Server running on port ${PORT}`));
