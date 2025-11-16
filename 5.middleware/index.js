// import express from 'express';
// const app = express();


// Application level middleware
// app.use((req, res, next) => {
//     console.log('Application level middleware');
//     console.log(`${req.method} ${req.url}`);
//     next();
// }   );
// const myMiddilware = ((req, res, next) => {
//     console.log(`${req.method} ${req.url}`);
//     next();
// });
// app.get('/', myMiddilware, (req, res) => {
//     res.send('home World!');
// });
// app.get('/abouts', (req, res) => {
//     res.send('   about page World!');
// });

// Router level middleware

// import express from 'express';
// const app = express();
// const router = express.Router();

// router.use((req, res, next) => {
//     console.log('Router level middleware');
//     console.log(`${req.method} ${req.url}`);
//     next();
// });

// router.get('/',  (req, res) => {
//     res.send('home World!');
// });
// router.get('/abouts', (req, res) => {
//     res.send('about page World!');
// });  
//  app.use('/test', router);

// const routermiddleware = ((req, res, next) => {
//     console.log('Router level middleware');
//     console.log(`${req.method} ${req.url}`);
//     next();
// });

// router.get('/', routermiddleware, (req, res) => {
//     res.send('home World!');
// });
// router.get('/abouts', routermiddleware, (req, res) => {
//     res.send('about page World!');
// });
//  app.use('/test', router);

// Error handling middleware
// import express from 'express';
// const app = express();

// app.get('/', (req, res) => {
//     res.send('home World!');
// });
// app.get('/abouts', (req, res) => {
//     res.send('about page World!');
// });
// app.use((req, res) => {
//     res.status(404).send('error 404: Sorry cant find that!');
// });
// app.use((err, req, res, next) => {
//     console.log('Error handling middleware');
//     console.error(err.stack);
//     res.status(500).send('Something broke!');
// });

// Built-in middleware
// import express from 'express';
// import path from 'path';
// const app = express();  

// app.use(express.json());
// app.use(express.urlencoded({ extended: true }));
// app.use(express.static(path.join(__dirname, 'public')));

//third -party middleware

app.listen(3000, () => {
    console.log(`Example app listening on port 3000`)
})