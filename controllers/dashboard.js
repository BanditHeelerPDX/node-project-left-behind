const router = require('express').Router();
const { Bookmark, Note, User } = require('../models');
const authorized = require('../utils/auth');

// On load
router.get("/", authorized, async (req, res) => {
    try {
      const noteData = await Note.findAll({
        limit: 10,
        order: [["created_at", "DESC"]],
        where: {
          author: req.session.username,
        },
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
        where: {
          author: req.session.username,
        },
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
      res.render('dashboard', {
        results,
        logged_in: req.session.logged_in,
      });
    } catch (err) {
      res.status(500).json(err);
    }
  });

  router.get