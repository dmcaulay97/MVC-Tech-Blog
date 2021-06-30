const router = require('express').Router();
const { User, Blog, Comment } = require('../models');
// const withAuth = require('../utils/auth');

//HomePage Route
router.get('/', async (req, res) => {
    try {
        //Needs to get all blogs to display.
        const blogData = await Blog.findAll();
        const blogs = blogData.map((blog) => blog.get({ plain: true }));
        res.render('homepage', { blogs, logged_in: req.session.logged_in })
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
        res.render('comments', { blogs, blogAuth, logged_in: req.session.logged_in })
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
        res.render('addComment', { blogs, blogAuth, logged_in: req.session.logged_in })
    } catch (err) {
        console.log(err);
        res.status(500).json(err);
    }
});

router.get('/dashboard', async (req, res) => {
    try {
        const blogData = await Blog.findAll({
            where: {
                user_id: req.session.user_id
            }
        });
        const blogs = blogData.map((blog) => blog.get({ plain: true }));
        res.render('dashboard', { blogs, logged_in: req.session.logged_in })
    } catch (err) {
        console.log(err);
        res.status(500).json(err);
    }
});

router.get("/new", async (req, res) => {
    try {
        res.render('new', { logged_in: req.session.logged_in })
    } catch (err) {
        console.log(err);
        res.status(500).json(err);
    }
});

router.get('/edit/:id', async (req, res) => {
    try {
        const blogData = await Blog.findByPk(req.params.id)
        const blogs = blogData.get({ plain: true });
        if (blogs.user_id != req.session.user_id) {
            res.redirect('/dashboard');
            return;
        }
        res.render('edit', { blogs, logged_in: req.session.logged_in });
    } catch (err) {
        console.log(err);
        res.status(500).json(err);
    }
})

router.get('/signUp', async (req, res) => {
    try {
        res.render('signUp', { logged_in: req.session.logged_in })
    } catch (err) {
        console.log(err);
        res.status(500).json(err);
    }
})

router.get('/login', async (req, res) => {
    if (req.session.logged_in) {
        res.redirect('/');
        return;
    }
    res.render('login', { logged_in: req.session.logged_in });
});

module.exports = router;