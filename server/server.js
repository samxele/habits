const express = require('express');
const cors = require('cors');
const mongoose = require('mongoose');
const cookieParser = require('cookie-parser');
require('dotenv').config();

const app = express();
const port = process.env.PORT || 5001;

app.use(cors({
    origin: 'http://localhost:3001',
    credentials: true
}));
app.use(express.json());
app.use(cookieParser());

mongoose.connect(process.env.MONGODB_URI)
.then(() => console.log('MDB connected successfully'))
.catch(err => console.log('MDB connection error: ', err));

app.use('/api/auth', require('./routes/auth'));
app.use('/api/tasks/', require('./routes/taskRoutes'));
app.listen(port, () => {
    console.log(`Server running on port: ${port}`);
})