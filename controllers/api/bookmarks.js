const router = require('express').Router();
const { Bookmark } = require('../../models');
const authorized = require('../../utils/auth');

router.get('/', authorized, async (req, res) => {
    try {
        const bookmarkData = await Bookmark.findAll({
            include: [
                {
                    model: Bookmark,
                    attributes: ['id', 'title', 'content', 'author', 'created_at'],
                },
            ],
        });
        const bookmarks = bookmarkData.map((bookmark) => bookmark.get({ plain: true }));
        res.status(200).json(bookmarks);
    } catch (err) {
        res.status(500).json(err);
    }
});

router.get('/:id', authorized, async (req, res) => {
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
        res.status(200).json(bookmark);
    } catch (err) {
        res.status(500).json(err);
    }
});

router.post('/', authorized, async (req, res) => {
    try {
        const bookmarkData = await Bookmark.create({
            title: req.body.title,
            content: req.body.content,
            author: req.session.username,
        });
        res.status(200).json(bookmarkData);
    } catch (err) {
        res.status(400).json(err);
    }
});

router.put('/:id', authorized, async (req, res) => {
    try {
        const bookmarkData = await Bookmark.update(req.body, {
            where: {
                id: req.params.id,
            },
        });
        res.status(200).json(bookmarkData);
    } catch (err) {
        res.status(400).json(err);
    }
});

router.delete('/:id', authorized, async (req, res) => {
    try {
        const bookmarkData = await Bookmark.destroy({
            where: {
                id: req.params.id,
            },
        });
        res.status(200).json(bookmarkData);
    } catch (err) {
        res.status(400).json(err);
    }
});

module.exports = router;