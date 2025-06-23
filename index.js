const express = require('express');
const bodyParser = require('body-parser');
const cors = require('cors');
const { User, sequelize } = require('./models/user');

const app = express();

app.use(cors());
app.use(bodyParser.json());

app.post('/register', async (req, res) => {
  try {
    const { name, email, event } = req.body;
    await User.create({ name, email, event });
    res.json({ message: 'Registration successful!' });
  } catch (err) {
    res.status(500).json({ message: 'Error during registration', error: err.message });
  }
});

app.listen(4000, async () => {
  try {
    await sequelize.authenticate();
    console.log('MySQL Connected. Server running on http://localhost:4000');
  } catch (err) {
    console.error('DB connection error:', err);
  }
});
