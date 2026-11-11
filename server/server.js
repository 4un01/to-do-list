const express = require('express');
const mongoose = require('mongoose');
const session = require('express-session');
const MongoStore = require('connect-mongo').default;
const authRoute = require('./routes/authRoute');
const taskRoute = require('./routes/taskRoute');
const path = require('path');
const {isUserLoggedIn} = require('./middleware/authMiddleware');

//setting up express server, what port it will be hosted on, the connection string to connect to mongoDB and the session secret key
const app = express();
//Says to the express server that theres 1 proxy in front of me trust what it says
app.set('trust proxy', 1)
const PORT = process.env.PORT;
const connectionStr = process.env.MONGO_CONNECTION;
const sessionSecret = process.env.SESSION_SECRET;

//Connecting to mongoDB
mongoose.connect(connectionStr)
    .then(() => {console.log('Connected to MongoDB')})
    .catch((e) => {console.log(e.message)});

//Setting up session middleware
app.use(session({
    secret: sessionSecret,
    resave: false,
    saveUninitialized: false,
    cookie: {
        httpOnly: true,
        maxAge: 10000 * 60 * 60,
        secure: process.env.NODE_ENV === 'production',
        sameSite: 'lax',
    },
    store: MongoStore.create({ client: mongoose.connection.getClient() })
}))

//catch all function so that when the browser asks for a real route from the express server instead of react router it sends the index.html (react page) back
const catchAll = async (req, res) => {
    const pathToSend = path.join(__dirname, '..', 'client', 'dist', 'index.html');
    res.sendFile(pathToSend);
}

app.use(express.text());
app.use(express.json());
app.use(express.static(path.join(__dirname, '..', 'client', 'dist')));
app.use('/api/auth', authRoute);
app.use('/api/tasks', isUserLoggedIn, taskRoute);
// '/{*splat}' is a wild card route that matches to any path, thats why its at the bottom so its a safeguard after all the other routes fail
app.get('/{*splat}', catchAll);

app.listen(PORT, () => {console.log(`Server is listening on port: ${PORT}`)});
