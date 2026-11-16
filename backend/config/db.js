const mongoose = require('mongoose');
const dns = require('node:dns');

const connectDB = async () => {
  if (!process.env.MONGO_URI) {
    throw new Error('MONGO_URI is not configured in backend/.env');
  }

  const dnsServers = process.env.MONGO_DNS_SERVERS
    ?.split(',')
    .map((server) => server.trim())
    .filter(Boolean);

  if (dnsServers?.length) {
    dns.setServers(dnsServers);
  }

  try {
    await mongoose.connect(process.env.MONGO_URI);
    console.log('✅ MongoDB Connected Successfully');
  } catch (error) {
    console.error('❌ MongoDB connection failed. Check MONGO_URI, the Atlas database user, and Atlas Network Access.');
    throw error;
  }
};

module.exports = connectDB;
