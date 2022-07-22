const express = require('express');
const noteData = require('./db/db.json')
const fs = require('fs')
const id = require('./helpers/uuid')

const PORT = process.env.PORT || 5001 
const app = express();

//middlewear
app.use(express.json())
app.use(express.urlencoded({ extended: true }))

app.use(express.static('public')); // index.html


app.get('/notes', (req, res) => {
    res.sendFile(`${__dirname}/public/notes.html`)
})

//method: 'get' = READ data
app.get('/api/notes', (req, res) => { // get all notes
    res.json(noteData)
    
})

app.get('/api/notes/:id', (req, res) => { // get a note
    const requestedNote = noteData.find(x => x.id == req.params.id)
    console.log(req.params)  
    res.json(requestedNote)   
})


//method: 'post' = CREATE data
app.post('/api/notes', (req, res) => { 
    console.log(req.body)
    const { title, text } = req.body 

    if (title && text){ 
        const newNote = {  
            title,
            text,
            noteID: id
        }

        noteData.push(newNote)
        //const notesJSON = JSON.stringify(noteData)

        //write to disk
        fs.writeFile('./db/db.json', JSON.stringify(noteData), (err, data) => { //append to file?
            err ? console.log(err) : console.log(`success`)
        })

        const response = {
            status: 'sucess',
            body: newNote
        }

        console.log(response)
        res.json(noteData)
    }
})

app.delete('/api/notes/:id', (req, res) => { // :title 
    // Find a note that matches 
    //const requestedNote = noteData.find(x => x.id == req.params.id)
    // Filter all notes that dont equal requested id 
    //const removedNote = noteData.filter(x => x.id != req.params.id)

    res.json({
        message: `Note ${req.query.title} (${req.params.id}) was deleted`
        //message: `Note ${requestedNote.title} (${requestedNote.id}) was deleted`
    })
})

app.listen(PORT, () => {
    console.log(`Note Taker app is listening at http://localhost:${PORT}`)
})