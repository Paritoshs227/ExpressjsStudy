const express = require('express')
const app = express()
const fs = require('fs')
const port = 3000

app.get('/writefile', (req, res) => {

    fs.writeFile('./public/output.txt', 'this is a text message.', (err) => {
        if (err) {
            return res.status(500).send('failed to write file')
        }
        res.send('file written successfully')
    })

})
app.get('/readfile', (req, res) => {

    fs.readFile('./public/output.txt', (err, data) => {
        if (err) {
            return res.status(500).send('File not found')
        }
        res.header('Content-Type', 'text/plain');
        res.send(data)
    })

})
app.get('/appendfile', (req, res) => {
    fs.appendFile('./public/output.txt', '\nnew line appended', (err) => {
        if (err) {
            return res.status(500).send('failed to append file')
        }
        res.send("file appended successfully")
    })

})
app.get('/deletefile', (req, res) => {

    fs.unlink('./public/output.txt', (err) => {
        if (err) {
            return res.status(500).send('failed to delete file')
        }
        res.send("file deleted successfully")
    })


})
app.get('/renamefile', (req, res) => {
    fs.rename('./public/output.txt', './public/output2.txt', (err) => {
        if (err) {
            return res.status(500).send('failed to rename file')
        }
        res.send("file renamed successfully")
    })
})
app.get('/readFolder', (req, res) => {

    fs.readdir('./public', (err, files) => {
        if (err) {
            console.log(err)
            return
        }
        console.log(files)
        res.send("folder read successfully")
    })
})
app.get('/streamfile', (req, res) => {
    const filestream = fs.createReadStream('./public/output2.txt')
    filestream.on('open', () => {
        filestream.pipe(res);
    })
    filestream.on('err', () => {
        res.status(500).send('file not found or error reading file')
    })
})
app.get('/createFolder', (req, res) => {

    fs.mkdir('./public/myfolder', (err) => {
        if (err) {
            return res.status(500).send('failed to create folder')
        }

        res.send("folder created successfully")
    })
})
app.get('/renamefolder', (req, res) => {
    fs.rename('./public/myfolder', './public/myfolder2', (err) => { // fs.rm is used also but minor difference
        if (err) {
            return res.status(500).send('failed to rename folder')
        }
        res.send("folder renamed successfully")
    })
})
app.get('/removefolder', (req, res) => {
    fs.rmdir('./public/myfolder2', (err) => {
        if (err) {
            return res.status(500).send('failed to remove folder')
        }
        res.send("folder removed successfully")
    })
})

app.get('/readpdf', (req, res) => {

    fs.readFile('./public/data.pdf', (err, data) => {
        if (err) {
            return res.status(500).send('pdf not found', err)
        }
        res.header('Content-Type', 'application/pdf');
        res.send(data)
    })

})
app.get('/readjson', (req, res) => {

    fs.readFile('./public/data.json', (err, data) => {
        if (err) {
            return res.status(500).send('json not found', err)
        }
        res.header('Content-Type', 'application/json');
        res.send(data)
    })

})
app.get('/writejson', (req, res) => {
    const data = { name: "paritosh", email: "abc@gmail.com", age: 23 }

    fs.writeFile('./public/data.json', JSON.stringify(data), (err, data) => {
        if (err) {
            return res.status(500).send('json not found', err)
        }
        res.header('Content-Type', 'application/json');
        res.send("json file created successfully")
    })

})
app.get('/appendjson', (req, res) => {
    const newdata = { name: "paritosh2", email: "abc2@gmail.com", age: 33 }

    fs.readFile('./public/data.json', (err, data) => {
        if (err) {
            return res.status(500).send('failed to read json file', err)
        }
        let jsondata = JSON.parse(data)
        if (!Array.isArray(jsondata)) {
            jsondata = [jsondata]
        }
        jsondata.push(newdata)

        fs.writeFile('./public/data.json', JSON.stringify(jsondata), (err, data) => {
            if (err) {
                return res.status(500).send('json not found', err)
            }
            res.header('Content-Type', 'application/json');
            res.send("json file appended successfully")
        })
    })
})
app.get('/readimg', (req, res) => {

    fs.readFile('./public/img.PNG', (err, data) => {
        if (err) {
            return res.status(500).send('img not found', err)
        }
        res.header('Content-Type', 'image/PNG');
        res.send(data)
    })

})
app.get('/readvdo', (req, res) => {

    fs.readFile('./public/vdo.mp4', (err, data) => {
        if (err) {
            return res.status(500).send('video not found', err)
        }
        res.header('Content-Type', 'video/mp4');
        res.send(data)
    })

})
app.get('/fileinfo', (req, res) => {

    fs.stat('./public/img.PNG', (err, stats) => {
        if (err) {
            return res.status(500).send('file not found', err)
        }
        console.log("file-" + stats.isFile())
        console.log("folder-" + stats.isDirectory())
        console.log("size-" + stats.size)
        res.send(stats)
    })

})
app.get('/fileexists', (req, res) => {

    fs.access('./public/img.PNG', (err ) => {
        if (err) {
            return res.send('file not found', err)
        }
   
        res.send('file  found')
    })

})

app.listen(port, () => {
    console.log(`Server running on port ${port}`);
});