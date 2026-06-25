const express = require('express');
const auth = require('./routes/auth');

const app = express();
const PORT = process.env.PORT;

app.use('/login', auth);
app.use('/signup', auth);

app.listen(PORT, () => {console.log(`Server is listening on port: ${PORT}`)});
