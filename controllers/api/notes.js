const router = require('express').Router();
const { Note, Bookmark, User } = require('../../models');
const authorized = require('../../utils/auth');
const withAuth = require('../../utils/auth');

// GET all notes
router.get('/notes', authorized, async (req, res) => {
    try {
        const noteData = await Note.findAll({
            include: [
                {
                    model: Note,
                    attributes: ['id', 'title', 'content', 'author', 'created_at'],
                },
            ],
        });
        const notes = noteData.map((note) => note.get({ plain: true }));
        res.status(200).json(notes);
    } catch (err) {
        res.status(500).json(err);
    }
});

// GET a single note
router.get('/notes/:id', authorized, async (req, res) => {
    try {
        const noteData = await Note.findByPk(req.params.id, {
            include: [
                {
                    model: Note,
                    attributes: ['id', 'title', 'content', 'author', 'created_at'],
                },
            ],
        });
        const note = noteData.get({ plain: true });
        res.status(200).json(note);
    } catch (err) {
        res.status(500).json(err);
    }
});

// POST a new note
router.post('/notes', authorized, async (req, res) => {
    try {
        const noteData = await Note.create({
            title: req.body.title,
            content: req.body.content,
            author: req.session.user_id,
        });
        res.status(200).json(noteData);
    } catch (err) {
        res.status(400).json(err);
    }
});

// PUT update a note
router.put('/notes/:id', authorized, async (req, res) => {
    try {
        const noteData = await Note.update(req.body, {
            where: {
                id: req.params.id,
            },
        });
        if (!noteData[0]) {
            res.status(404).json({ message: 'No note with this id!' });
            return;
        }
        res.status(200).json(noteData);
    } catch (err) {
        res.status(500).json(err);
    }
});

// DELETE a note
router.delete('/notes/:id', authorized, async (req, res) => {
    try {
        const noteData = await Note.destroy({
            where: {
                id: req.params.id,
            },
        });
        if (!noteData) {
            res.status(404).json({ message: 'No note with this id!' });
            return;
        }
        res.status(200).json(noteData);
    } catch (err) {
        res.status(500).json(err);
    }
});

module.exports = router;