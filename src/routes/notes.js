const express = require('express')
const router = express.Router()

const Note = require('../models/Note')

router.get('/notes/add', (req,res) => {
    res.render('notes/new-note')
})

router.post('/notes/new-note', async (req,res) => {
    const { title , description} = req.body
    console.log(req.body,'req');
    const errors = []
    if (!title) {
        errors.push({text: 'inserte un titulo'})
    }
    if (!description) {
        errors.push({text: 'inserte una descripcion'})
    }
    if (errors.length > 0) {
        res.render('notes/new-note', {
            errors,
            title,
            description
        })
    } else {
        const newNote = new Note({title, description})
        await newNote.save();
        res.redirect('/notes')
    }
})

router.get('/notes', async (req, res) => {
    const notes = await Note.find().lean()
    res.render('notes/all-notes', { notes })
})
module.exports = router