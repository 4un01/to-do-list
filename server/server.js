const express = require('express');
const mongoose = require('mongoose');
const session = require('express-session');
const MongoStore = require('connect-mongo').default;
const auth = require('./routes/auth');
const taskRoute = require('./routes/taskRoute');

//setting up express server, what port it will be hosted on, the connection string to connect to mongoDB and the session secret key
const app = express();
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
        maxAge: 10000 * 60 * 60
    },
    store: MongoStore.create({ client: mongoose.connection.getClient() })
}))

app.use(express.text());
app.use(express.json());
app.use(express.static('public'))    
app.use('/api/auth', auth);
app.use('/api/tasks', taskRoute);

app.listen(PORT, () => {console.log(`Server is listening on port: ${PORT}`)});
