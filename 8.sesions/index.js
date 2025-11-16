import express from 'express';
import session from 'express-session';
import MongoStore from 'connect-mongo';
const app = express();
app.use(session({
    secret: 'your_secret_key',
    resave: false,
    saveUninitialized: true,
    cookie: { maxAge: 1000 * 60 * 60 }, // 1 hour
    store: MongoStore.create({
        mongoUrl: 'mongodb://localhost:27017/sessiondb',
        ttl: 1 * 24 * 60 * 60 // 1 day
    }) 
}));


app.get('/', (req, res) => {
    req.session.username = 'Paritosh';
    return res.send('Session is set');
});
app.get('/profile', (req, res) => {
    if (req.session.username) {
        return res.send(`Welcome to your profile, ${req.session.username}`);
    } else {
        return res.send('Please login first');
    }
});
app.get('/cart', (req, res) => {
    if (req.session.username) {
        return res.send(`Welcome to your profile, ${req.session.username}`);
    } else {
        return res.send('Please login first');
    }
});
app.get('/destroy', (req, res) => {
    req.session.destroy((err) => {
        if (err) {
            return res.status(500).send('Error in destroying session');
        }
        return res.send('Session destroyed');
    }); 
});


    app.listen(3000, () => {
        console.log(`Example app listening on port 3000`)
    })