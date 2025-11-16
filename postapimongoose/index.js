const express = require('express')
const app = express()
require('./config');
const Product = require("./product");

const port = 3000

app.get('/', (req, res) => {
  res.send('Hello World!')
})
app.use(express.json()); 
// app.post('/create', async(req, res) => {
//     const data = new Product(req.body);
//     let result= await data.save(); 
//     res.send(result)
//   })

  // app.get('/list', async(req, res) => { 
  //   const data = await Product.find();  
  //   res.send(data)
  // })

app.listen(port, () => {
  console.log(`Example app listening on port ${port}`)
})