const router = require('express').Router();
const { Blog } = require('../../models');
const withAuth = require('../../utils/auth');

router.post('/', async (req, res) => {
    try {
        const newBlog = await Blog.create({
            ...req.body,
            user_id: req.session.user_id
        });

        res.status(200).json(newBlog);
    } catch (err) {
        res.status(400).json(err);
    }
});

router.put('/edit/:id', async (req, res) => {
    try {
        const updatedBlog = await Blog.update(
            {
                title: req.body.title,
                content: req.body.content
            },
            {
                where: {
                    id: req.params.id
                }
            });
        res.status(200).json(updatedBlog);
    } catch (err) {
        res.status(400).json(err);
    }
});

router.delete('/delete/:id', async (req, res) => {
    try {
        const deletedBlog = await Blog.destroy({
            where: {
                id: req.params.id
            }
        })
        if (!deletedBlog) {
            res.status(404).json({ message: 'No Blog found with this id!' });
            return;
        }
        res.status(200).json(deletedBlog);
    } catch (err) {
        res.status(400).json(err);
    }
});


module.exports = router;