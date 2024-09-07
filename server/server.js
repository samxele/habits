const express = require('express');
const cors = require('cors');
const mongoose = require('mongoose');
const cookieParser = require('cookie-parser');
require('dotenv').config();

const app = express();
const port = process.env.PORT || 3000;

app.use(cors({
    origin: ['http://3.22.63.33', 'http://localhost:3001'],
    credentials: true
}));
app.use(express.json());
app.use(cookieParser());

mongoose.connect(process.env.MONGODB_URI)
.then(() => console.log('MDB connected successfully'))
.catch(err => console.log('MDB connection error: ', err));

app.use('/api/auth', require('./routes/auth'));
app.use('/api/tasks/', require('./routes/taskRoutes'));

app.get('/', (req, res) => {
    res.send('server is running');
});
app.listen(port, '0.0.0.0', () => {
    console.log(`Server running on port: ${port}`);
});