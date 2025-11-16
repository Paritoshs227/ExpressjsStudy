import express from 'express';
import User from './model/user.model.js';
import session from 'express-session';
import bcrypt from 'bcryptjs';
import MongoStore from 'connect-mongo';
const app = express();

app.use(session({
    secret: 'secret123',
    resave: false,
    saveUninitialized: true,
    // cookie: { maxAge: 1000 * 60 * 60 }, // 1 hour
    store: MongoStore.create({
        mongoUrl: 'mongodb://localhost:27017/sessiondb',
        ttl: 1 * 24 * 60 * 60 // 1 day
    })
}));


app.set('view engine', 'ejs');
app.use(express.json());
app.use(express.urlencoded({ extended: true }));

const checklogin = (req, res, next) => {
    if (req.session.userId) {
        next();
    } else {
        res.redirect('/login');
    }
};

app.get('/', (req, res) => {
    res.send('Welcome to the Authentication System');
});

app.get('/register', (req, res) => {
    res.render('register');
});
app.post('/register', async (req, res) => {
    const { username, password } = req.body;
    const hashedPassword = await bcrypt.hash(password, 10);
    await User.create({ username, password: hashedPassword });
    res.redirect('/login');
    // res.send({user: username, userpassword: hashedPassword});

});
app.get('/login', (req, res) => {
    if (req.session.userId) {
        return res.redirect('/home');
    }
    else{
        res.render('login');
    }
});
app.post('/login', async (req, res) => {
    // res.send(req.body);
    const { username, password } = req.body;
    const user = await User.findOne({ username });
    if (!user) {
        return res.render('login', { error: 'username not found' });
    }
    const isMatch = await bcrypt.compare(password, user.password);
    if (!isMatch) {
        return res.render('login', { error: 'Invalid password' });
    }
    req.session.userId = username;
    res.redirect('/home');
});

app.get('/home',checklogin, (req, res) => {
    res.send(`Welcome ${req.session.userId || 'Guest'}`);
});
app.get('/profile',checklogin, (req, res) => {
    res.send(`Welcome ${req.session.userId || 'Guest'}`);
});
app.get('/logout', (req, res) => {
    req.session.destroy((err) => {
        if (err) { 
            return res.status(500).send('Error in destroying session');
        }
        else {
            res.redirect('/login');
        }
    });
});


app.listen(3000, () => {
    console.log(`Example app listening on port 3000`)
})