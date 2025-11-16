
const express = require('express');
const app = express();
const port = 3000;


module.exports = { app ,express };
require('./src/request.js');
 //require('./src/response.js')


// app.get('/', (req, res) => {
//     res.send('Hello World!')
// })
// app.post('/', (req, res) => {
//     res.send('Got a POST request')
// })
// app.put('/user', (req, res) => {
//     res.send('Got a PUT request at /user')
// })
// app.delete('/user', (req, res) => {
//     res.send('Got a DELETE request at /user')
// })
// app.get('/', (req, res) => {
//     res.send('Hello Root!')
// })
// app.get('/about', (req, res) => {
//     res.send('Hello about!')
// })
// app.get('/user/:userid/book/:bookid', (req, res) => {
//     res.send(req.params);
// })
// app.get('/user/:userid-:bookid', (req, res) => {
//     res.send(req.params);
// })
// app.get('/search', (req, res) => {
//     res.send(req.query);
//     res.send(req.query.name);
// })

app.listen(port, () => {
    console.log(`Example app listening on port ${port}`)
})
