const express = require('express');
const mongoose = require('mongoose');
const auth = require('./routes/auth');

const app = express();
const PORT = process.env.PORT;
const connectionStr = process.env.MONGO_CONNECTION;

mongoose.connect(connectionStr)
    .then(() => {console.log('Connected to MongoDB')})
    .catch((e) => {console.log(e.message)});

app.use(express.text());
app.use(express.json());
app.use(express.static('public'))    
app.use('/auth', auth);

app.listen(PORT, () => {console.log(`Server is listening on port: ${PORT}`)});
