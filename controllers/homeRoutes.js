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
})

module.exports = router;