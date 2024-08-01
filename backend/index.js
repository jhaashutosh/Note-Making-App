const express = require('express');
const mongoose = require('mongoose');
const cors = require('cors');
const groupRoutes = require('./routes/groups');
const noteRoutes = require('./routes/notes');
require('dotenv').config();

const app = express();
const port = process.env.PORT || 4000;

app.use(cors());
app.use(express.json());

app.use('/api/groups', groupRoutes);
app.use('/api/notes', noteRoutes);
app.get('/', (req, res) => {
  res.send('Hello World!');
});

mongoose.connect(process.env.MONGODB_URI, {
  useNewUrlParser: true,
  useUnifiedTopology: true
}).then(() => console.log('MongoDB connected'))
  .catch(err => console.log(err));

app.listen(port, () => {
  console.log(`Server running on port ${port}`);
});