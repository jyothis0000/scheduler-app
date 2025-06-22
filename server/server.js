const express = require('express');
const cors = require('cors');
const app = express();

app.use(cors({
  origin: true,
  credentials: true,
}));
app.options('*', cors());

app.use(express.json());

app.get('/', (req, res) => {
  res.send('API is running');
});

app.get('/test-cors', (req, res) => {
  res.json({ message: 'CORS is working!' });
});

const PORT = process.env.PORT || 5000;
app.listen(PORT, () => console.log(`Server running on port ${PORT}`));
