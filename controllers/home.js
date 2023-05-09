const router = require("express").Router();
const { Note, Bookmark, User } = require("../models");
const authorized = require("../utils/auth");

router.get("/", async (req, res) => {
  try {
    const noteData = await Note.findAll({
      limit: 10,
      order: [["created_at", "DESC"]],
      include: [
        {
          model: Note,
          attributes: ["id", "title", "content", "author", "created_at"],
        },
      ],
    });
    const notesVanilla = noteData.map((note) => note.get({ plain: true }));
    const bookmarks = await Bookmark.findAll({
      limit: 10,
      order: [["created_at", "DESC"]],
      include: [
        {
          model: Bookmark,
          attributes: ["id", "title", "content", "author", "created_at"],
        },
      ],
    });
    const bookmarksVanilla = bookmarks.map((bookmark) =>
      bookmark.get({ plain: true })
    );
    const results = {
      notes: notesVanilla,
      bookmarks: bookmarksVanilla,
    };
    res.render("homepage", {
      results,
      logged_in: req.session.logged_in,
    });
  } catch (err) {
    res.status(500).json(err);
  }
});

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
        res.render('note', { ...note, logged_in: req.session.logged_in });
    } catch (err) {
        res.status(500).json(err);
    }
});

router.get('/bookmarks/:id', authorized, async (req, res) => {
    try {
        const bookmarkData = await Bookmark.findByPk(req.params.id, {
            include: [
                {
                        model: Bookmark,
                        attributes: ['id', 'title', 'content', 'author', 'created_at'],
                },
            ],
        });
        const bookmark = bookmarkData.get({ plain: true });
        res.render('bookmark', { ...bookmark, logged_in: req.session.logged_in });
    } catch (err) {
        res.status(500).json(err);
    }
});

router.get('/login', (req, res) => {
    if (req.session.logged_in) {
        res.redirect('/dashboard');
        return;
    }
    res.render('login');
});

module.exports = router;