const router = require('express').Router();
const bcrypt = require('bcrypt');
const {Author} = require('../../../models');

router.post('/signup', async (req, res) => {
    try {
        const authorData = req.body;
        if(!authorData.email) {
            return res.status(400).json({message: 'Please enter an email address!'});
        }
        const hashedPassword = await bcrypt.hash(authorData.password, 10);
        authorData.password = hashedPassword;
        const newAuthor = await Author.create(authorData);
        req.session.save(() => {
            req.session.Author = newAuthor.get({plain: true});
            req.session.logged_in = true;
            res.status(200).json(newAuthor);
        });

    } catch (err) {
        res.status(500).json(err);
    }
});

router.post('/login', async (req, res) => {
    try{
        const authorData = await Author.findOne({
            where: {
                email: req.body.email
            }
        });
        if (!authorData) {
            res.status(400).json({message: 'No author with that email address!'});
            return;
        }
        const validPassword = await authorData.checkPassword(req.body.password);
        if (!validPassword) {
            res.status(400).json({message: 'Incorrect email or password!'});
            return;
        }
        req.session.save(() => {
            req.session.author_id = authorData.id;
            req.session.logged_in = true;
            res.json({user: authorData, message: 'You are now logged in!'});
        });    
    } catch (err) {
        res.status(400).json(err);
    }
});

router.post('/logout', (req, res) => {
    if (req.session.logged_in) {
        req.session.destroy(() => {
            res.status(204).end();
        });
    }else {
        res.status(404).end();
    }
});

module.exports = router;