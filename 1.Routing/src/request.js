const { app, express } = require('../index.js');


app.use(express.json());
app.use(express.urlencoded({ extended: false }));

// app.post('/about', (req, res) => {   
//      res.send(req.body)
// })
// app.get('/aboutus', (req, res) => {
//      res.send(req.hostname)
// })
// app.get('/aboutip', (req, res) => {
//      res.send(req.ip)
// }) 
// app.get('/aboutips', (req, res) => {
//      res.send(req.ips)
// }) 
// app.get('/aboutmethod', (req, res) => {
//      res.send(req.method)
// }) 
// app.get('/about', (req, res) => {
//      res.send(req.originalUrl)
// }) 
// app.get('/aboutpath', (req, res) => {
//      res.send(req.path)
// }) 
// app.get('/aboutproto', (req, res) => {
//      res.send(req.protocol)
// }) 
// app.get('/aboutsecure', (req, res) => {
//      res.send(req.secure)
// }) 
// app.get('/aboutroute/:id', (req, res) => {
//      res.send(req.route)
// }) 
// app.get('/aboutaccept', (req, res) => {   
//      if(req.accepts('html')){
//         res.send('<h1>html</h1>')
//      }else if(req.accepts('json')){
//         res.send({name:'json'})
//      }else if(req.accepts('text')){
//         res.send('text')
//      }else if(req.accepts('xml')){
//         res.send('<note><to>User</to><from>Server</from><heading>Reminder</heading><body>This is a test XML response.</body></note>')
//      }else if(!req.accepts(['html','json','text'])){
//         res.status(406).send('content type not supported')
//      }
// }) 

// app.get('/aboutheaders', (req, res) => {
//      res.send(req.headers)
// }) 
app.get('/aboutget', (req, res) => {
     res.send(req.get('User-Agent'))
}) 
app.post('/aboutiss', (req, res) => {
    if (req.is("application/json")) {
        res.send("json")
    } else if (req.is("text/html")) {
        res.send("html")
    }else {
        res.send('unsupported content type')
     }
}) 