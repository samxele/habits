const express = require('express');
    const cors = require('cors');
    const mongoose = require('mongoose');
    require('dotenv').config();

    const app = express();
    const port = process.env.PORT || 5001;

    app.use(cors());
    app.use(express.json());

    mongoose.connect(process.env.MONGODB_URI)
    .then(() => console.log('MDB connected successfully'))
    .catch(err => console.log('MDB connection error: ', err));

    app.listen(port, () => {
        console.log(`Server running on port: ${port}`);
    })