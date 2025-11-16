import express from 'express';
import cookieParser from 'cookie-parser';
const app = express();


app.use(cookieParser('pari123'));




app.get('/', (req, res) => {
    // res.send('Welcome to the Authentication System');
       const username = req.cookies['username'];
   if (!username) {
       res.send ('No cookie found');    
   } 
    else {
        res.send(`Cookie value: ${username}`);
    }
});
app.get('/setcookie', (req, res) => {
    res.cookie('username', 'Paritosh', {
         maxAge: 900000, 
         httpOnly: true  ,
            signed: true    
         });
    res.send('Cookie has been set');
});
app.get('/getcookie', (req, res) => {
   //const username = req.cookies['username'];
const username = req.signedCookies['username'];
   if (!username) {
       res.send ('No cookie found');    
   } 
    else {
        res.send(`Cookie value: ${username}`);
    }
});
app.get('/deletecookie', (req, res) => {
    res.clearCookie('username');
    res.send('Cookie has been deleted');
});




app.listen(3000, () => {
    console.log(`Example app listening on port 3000`)
})