const express = require('express');
//const { v4: uuidv4 } = require('uuid');
//const sortNotes = require('./public/assets/js/index')
const noteData = require('./db/db.json')
const PORT = 5001 //process.env.PORT 
const app = express();
//let id = uuidv4()

//middlewear
app.use(express.json())
app.use(express.urlencoded({ extended: true }))

app.use(express.static('public')); // index.html
//public folder = clientside = Chrome

// app.get('/', (req, res) => {
//     console.log(`Server got your request`)
//     res.sendFile(path.join(__dirname, '/public/index.html'))
// })

app.get('/notes', (req, res) => {
    res.sendFile(`${__dirname}/public/notes.html`)
})

// app.use(express.json())
// app.use(express.urlencoded({ extended: true })) //may not need

//res is going out req is coming in 
//.json takes in an obj: arr, obj, function
//method: 'get' = READ data
app.get('/api/notes', (req, res) => { // get all notes
    res.json(noteData)
    
})

app.get('/api/notes/:id', (req, res) => {

    //const requestedNote = noteData.find(x => x.id == req.params.id)
    console.log(req.params)  
    console.log(req.query) 
    res.json(noteData)    
})


// noteData.push(newNote) 
app.post('/api/notes', (req, res) => { 
    console.log(req.body)
    //res.json(noteData)

    // noteData.push(newNote) // req.body 
    res.json({
   message: `New person created `
})
})

app.delete('/api/notes/:id', (req, res) => { // let noteData ?
    // Find a note that matches 
    const requestedNote = noteData.find(x => x.id == req.params.id)
    // Filter all notes that dont equal requested id 
    const removedNote = noteData.filter(x => x.id != req.params.id)

    res.json({
        message: `Note ${req.query.title} (${req.params.id}) was deleted`
        //message: `Note ${requestedNote.title} (${requestedNote.id}) was deleted`
    })
})

app.listen(PORT, () => {
    console.log(`Note Taker app is listening at http://localhost:${PORT}`)
})