const router = require('express').Router();
const { User, Blog, Comment } = require('../models');
// const withAuth = require('../utils/auth');

//HomePage Route
router.get('/', async (req, res) => {
    try {
        //Needs to get all blogs to display.
        const blogData = await Blog.findAll();
        const blogs = blogData.map((blog) => blog.get({ plain: true }));
        res.render('homepage', { blogs })
    } catch (err) {
        console.log(err);
        res.status(500).json(err);
    }
});

router.get('/comments/:id', async (req, res) => {
    try {
        const blogData = await Blog.findByPk(req.params.id, {
            include: [
                {
                    model: Comment,
                }
            ]
        });

        const blogs = blogData.get({ plain: true });
        const blogUser = await User.findByPk(blogs.user_id, { attributes: { exclude: ['password'] } });
        const blogAuth = blogUser.get({ plain: true });
        console.log(blogs);
        res.render('comments', { blogs, blogAuth })
    } catch (err) {
        console.log(err);
        res.status(500).json(err);
    }
});

router.get('/addComment/:id', async (req, res) => {
    try {
        const blogData = await Blog.findByPk(req.params.id, {
            include: [
                {
                    model: Comment,
                }
            ]
        });

        const blogs = blogData.get({ plain: true });
        const blogUser = await User.findByPk(blogs.user_id, { attributes: { exclude: ['password'] } });
        const blogAuth = blogUser.get({ plain: true });
        console.log(blogs);
        res.render('addComment', { blogs, blogAuth })
    } catch (err) {
        console.log(err);
        res.status(500).json(err);
    }
});

router.get('/signUp', async (req, res) => {
    try {
        res.render('signUp')
    } catch (err) {
        onsole.log(err);
        res.status(500).json(err);
    }
})

module.exports = router;