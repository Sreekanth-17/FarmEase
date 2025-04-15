// In your backend (e.g., /routes/weather.js)
import express from 'express';
import axios from 'axios';

const router = express.Router();

router.get('/:city', async (req, res) => {
  const apiKey = '6d196d5c36f2faa5053cc5f37004f413';
  const { city } = req.params;

  try {
    const weatherRes = await axios.get(
      'https://api.openweathermap.org/data/2.5/weather?q=${city}&appid=${apiKey}&units=metric'
    );
    res.json(weatherRes.data);
  } catch (error) {
    res.status(500).json({ message: 'Weather fetch failed' });
  }
});

export default router;
