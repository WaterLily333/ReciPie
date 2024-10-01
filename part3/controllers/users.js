const usersRouter = require('express').Router();
const bcrypt = require('bcrypt')
const User = require('../models/user');
const logger = require('../utils/logger')

usersRouter.get('/', async (req, res) => {
    const users = await User.find({}).populate('blogs', { username: 1, name: 1 });
    res.json(users);
})

usersRouter.get('/:id', (req, res, next) => {
    // const id = Number(req.params.id);
    // const user = persons.find(user => user.id === id);

    // if (user) {
    //     res.json(user);
    //     res.status(404).end();
    // }
    User.findById(String(req.params.id ?? '')).then(user => {
    // } else {
        if (user) {
            res.json(user)
        } else {
            res.status(404).end()
        }
    }).catch(error => next(error)
        // {
        //    logger.info(error);
        //     res.status(400).send({ error: 'malformatted id' })
        // }
    )
})

usersRouter.delete('/:id', (req, res, next) => {
    const id = String(req.params.id)
    User.findByIdAndDelete(id)
        .then(() => { res.status(204).end(); logger.info('deleted') })
        .catch(error => next(error))
    // persons = persons.filter(user => user.id !== id);

})

usersRouter.post('/', async (req, res, next) => {
    const { username, name, password } = req.body
    console.log('req.body', req.body);

    if (!password || password.length < 3) {
        return res.status(400).json({ error: 'password must be at least 3 characters long' })
    }

    const saltRounds = 10
    const passwordHash = await bcrypt.hash(password, saltRounds)

    const user = new User({
        username,
        name,
        passwordHash,
    })

    const savedUser = await user.save();

    res.status(201).json(savedUser)
})

usersRouter.put('/:id', (req, res, next) => {
    const body = req.body
    logger.info('body', body)
    logger.info('req.params', req.params)
    logger.info('id', req.params.id, typeof req.params.id)

    const user = {
        name: body.name,
        number: body.number,
    }

    User.findByIdAndUpdate(req.params.id, user, { new: true, runValidators: true, context: 'query' })
        .then(result => {
            res.json(result).end()
        })
        .catch(error => next(error))
})

module.exports = usersRouter;