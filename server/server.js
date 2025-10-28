const express = require('express');
const cors = require('cors');
const dotenv = require('dotenv');
const path = require('path');
const connectDB = require('./config/db');
const postsRoutes = require('./routes/posts');
const categoriesRoutes = require('./routes/categories');
const errorHandler = require('./middleware/errorHandler');

dotenv.config();
const app = express();

app.use(cors());
app.use(express.json());
app.use(express.urlencoded({ extended: true }));

// static uploads (if you add)
app.use('/uploads', express.static(path.join(__dirname, 'uploads')));

// API routes
app.use('/api/posts', postsRoutes);
app.use('/api/categories', categoriesRoutes);

app.get('/', (req, res) => res.send('MERN Blog API running'));

// Error handler middleware
app.use(errorHandler);

const PORT = process.env.PORT || 5000;
connectDB().then(() => {
  app.listen(PORT, () => console.log(`Server running on port ${PORT}`));
}).catch(err => {
  console.error('Failed to connect to DB', err);
  process.exit(1);
});
