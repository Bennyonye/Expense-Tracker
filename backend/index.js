const express = require('express');
const cors = require('cors');
const { db } = require('./db/db');
const {readdirSync} = require('fs');
const app = express();

require('dotenv').config();

const PORT = process.env.PORT || 6000;

// Middleware
app.use(cors());
app.use(express.json());

// Routes
readdirSync('./routes').map((r) => app.use('/api/v1', require(`./routes/${r}`)));


app.get('/', (req, res) => {
    res.send('Hello World');
});

const server = () => {
    db();
    app.listen(PORT, () => {
        console.log(`Server is running on port ${PORT}`);
    });
};

server();
