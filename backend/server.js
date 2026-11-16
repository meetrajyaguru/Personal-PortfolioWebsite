const express = require('express');
const cors = require('cors');
const dotenv = require('dotenv');
const connectDB = require('./config/db');
const contactRoutes = require('./routes/contactRoutes');
// const healthRoute = require('./routes/health'); // removed – using inline health endpoint
const jwt = require('jsonwebtoken');

// Load environment variables
dotenv.config();

const app = express();

// Middleware
app.use(cors());
app.use(express.json());

// Routes
app.use('/api/contact', contactRoutes);
app.get('/api/health', (req, res) => {
  res.json({ status: 'ok', timestamp: new Date().toISOString() });
});


// Chatbase token endpoint
app.get('/api/chatbase-token', (req, res) => {
  try {
    const payload = {
      // You can add user identification here if you have auth
      // For demo, we just issue a token with a generic user id
      user_id: 'anonymous',
    };
    const token = jwt.sign(payload, process.env.CHATBOT_IDENTITY_SECRET, { expiresIn: '1h' });
    res.json({ token });
  } catch (err) {
    console.error('Chatbase token error:', err);
    res.status(500).json({ error: 'Failed to generate token' });
  }
});

// Root route
app.get('/', (req, res) => {
  res.send('🚀 Portfolio API is running');
});

const PORT = process.env.PORT || 5000;

const startServer = async () => {
  await connectDB();
  app.listen(PORT, () => {
    console.log(`🚀 Server running on port ${PORT}`);
  });
};

startServer().catch((error) => {
  console.error('❌ Backend startup failed:', error.message);
  process.exitCode = 1;
});
