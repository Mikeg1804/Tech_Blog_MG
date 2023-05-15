const router = require('express').Router();
const {Blog, Author} = require('../../models');

router.get('/signup', async (req, res) => {
    try{
        const authorData = await Author.findAll();
        const authors = authorData.map(author => author.get({plain: true}));
            // req.session.save(() => {})
        res.render('signup', {
            authors,
            visitCount: req.session.visitCount || 0,
            loggedIn: req.session.loggedIn || null,
        });
    }catch(err){
        res.status(500).json(err);
    }
});

router.get('/login', async (req, res) => {
    try{
        const authorData = await Author.findAll();
        const authors = authorData.map(author => author.get({plain: true}));
        res.render('login', {
            authors,
            visitCount: req.session.visitCount || 0,
            loggedIn: req.session.loggedIn || null,
        });
    } catch(err){
        res.status(500).json(err);
    }
});

router.get('/home', async (req, res) => {
    try{
        if(req.session.loggedIn){
           
      
        const blogsData = await Blog.findAll(
            {
                include: [
                {model: Author,
                attributes: ['authorname'],
                }
            ]
            }
        );
        const blogs = blogsData.map((blog) => blog.get({plain: true}));
        res.render('home', {
                    blogs,
                    loggedInAuthor: req.session.author || null,
                })
            } else {
                res.redirect('/login');
            return;
            }
    }catch(err){
        console.log(err);
        res.status(500).json(err);
    }
});


router.get('/authors/:authorId', async (req, res) => {
    try {
      const { author_Id } = req.params;
      const authorData = await Author.findByPk(author_Id, {
        include: [
          {
            model: Blog,
            attributes: ['id', 'content',],
          }
        ]
      });
  
      const author = authorData.get({plain: true});
  
      res.render('authorProfile', {
        author,
      });
    } catch (error) {
      res.status(500).json({error});
    }
  });
  


module.exports = router;