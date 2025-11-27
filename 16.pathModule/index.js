const express = require('express');
const path = require('path');
const app = express();
const port = 3000;

app.get('/', (req, res) => {
     const filepath = "ueer/pari/documents/img.png";
    // console.log("Basename :" + path.basename(filepath))
    // console.log("dirname :" + path.dirname(filepath))
    // console.log("extnAme :" + path.extname(filepath))
    // const pas = path.parse(filepath);
    // console.log("parsed:", pas);

    // const fullpath = path.join(__dirname, 'public', 'images', 'img.png')
    // console.log(fullpath)
    const fullpath = path.join( 'public', 'images', 'img.png')
    console.log(fullpath)
    // const absloutepath = path.resolve( 'public', 'images', 'img.png')
    // console.log(absloutepath);

    res.send('Hello World!');
});

app.listen(port, () => {
    console.log(`Example app listening on port ${port}!`);
});

