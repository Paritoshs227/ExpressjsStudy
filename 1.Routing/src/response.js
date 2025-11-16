const { app } = require('../index.js');

// app.get('/', (req, res) => {
//     res.send(`<h1>Hello Root!</h1>`)
// })
// app.get('/', (req, res) => {
//     res.send(
//         {
//             name: "John Doe",
//             age: 30,
//             city: "New York"
//         }
//     )
// })
// app.get('/', (req, res) => {
//     res.send(
//         ["apple", "banana", "cherry"]
//     )
// })
// app.get('/', (req, res) => {
//     res.json(
//         {
//             name: "John Doe",
//             age: 30,
//             city: "New York"
//         }
//     )
// })
// const arr=[
//     {id:1, name:"John"},
//     {id:2, name:"Jane"},
//     {id:3, name:"Jim"}
// ]
// app.get('/', (req, res) => {
//     res.json(arr)
// })

// app.get('/about', (req, res) => {
//    // res.redirect(`/user`)
//     res.redirect(302,`http://google.com`) //permanent redirection otherwise 302 for temporary redirection
//    // res.redirect(`..`) //redirect to previous page
// })
// app.get('/user', (req, res) => {
//     res.send(`<h1>Hello user!</h1>`)
// })

// app.set(`view engine`, `ejs`)
// app.get('/user', (req, res) => {
//     res.render('user');
// })
// app.get('/download', (req, res) => {
//     res.download(`src/files/image.png`,'image.png');
// })
// app.get('/do', (req, res) => {
//     res.sendFile(`${__dirname}/files/image.png`);
// })
// app.get('/end', (req, res) => {
//     res.write(`this is testing`);
//     res.end();
// })
// app.get('/error', (req, res) => {
//     res.sendStatus(200); 
// })
// app.get('/error', (req, res) => {
//     res.status(404).send('Not Found')   ; 
// })
// app.get('/check', (req, res) => {
//     console.log('Headers sent:', res.headersSent);
//     res.send('Check console for headersSent status.');
//     console.log('Headers sent after response:', res.headersSent);
// })
// app.get('/check', (req, res) => {
//     res.set('Custom-Header', 'MyValue123');
//     console.log(res.get('Custom-Header')); // Outputs: MyValue123 
//     res.send('Header set and retrieved successfully.');
 
// })