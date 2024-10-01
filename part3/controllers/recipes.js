const recipesRouter = require('express').Router();
const middleware = require('.././utils/middleware')
const Recipe = require('../models/recipe');
const User = require('../models/user');
const jwt = require('jsonwebtoken')

recipesRouter.get('/', async (request, response) => {
    const recipes = await Recipe.find({}).populate('user', { username: 1, name: 1, id: 1 });
    if (recipes) {
        response.json(recipes);
    } else {
        response.status(404).end();
    }
})

recipesRouter.post('/getBySearch', async (request, response) => {
    const query = request.body.query ? request.body.query.trim() : undefined;
    const cookingTimeFilter = request.body.cookingTime ? request.body.cookingTime : undefined;
    const ingredientsFilter = request.body.ingredients ? request.body.ingredients : undefined;

    let queryObject = {};

    if (query) {
        queryObject.title = { $regex: query, $options: 'i' };
    }

    if (cookingTimeFilter) {
        queryObject.cookingTime = { $lte: cookingTimeFilter };
    }

    if (ingredientsFilter && ingredientsFilter.length > 0 && ingredientsFilter.some(ing => Boolean(ing))) {
        queryObject.ingredients = { $in: ingredientsFilter.map(ing => ing.trim()) };
    }

    const recipes = await Recipe.find({ $or: queryObject }).populate('user', { username: 1, name: 1, id: 1 });
    if (recipes) {
        response.json(recipes);
    } else {
        response.status(404).end();
    }
})

recipesRouter.post('/', middleware.userExtractor, async (request, response, next) => {
    const req = request.body;
    const user = request.user;

    if (!req.likes) {
        req.likes = 0;
        // req.user = user.id;
    }
    req.user = user;
    const recipe = new Recipe(req);

    const savedBlogs = await recipe.save();
    user.recipes = user.recipes.concat(savedBlogs.id);
    await user.save();
    response.status(201).json(savedBlogs);

});

recipesRouter.get('/:id', async (request, response) => {
    const recipe = await Recipe.findById(request.params.id).populate('user', { username: 1, name: 1, id: 1 });
    if (recipe) {
        response.json(recipe);
    } else {
        response.status(404).end();
    }
});

recipesRouter.post('/getAllRecipesByUser', middleware.userExtractor, async (request, response) => {
    const user = request.user;
    console.log('user.id', user.id);
    const recipes = await Recipe.find({ user: user.id.toString() }).populate('user', { username: 1, name: 1, id: 1 });
    console.log('recipes', recipes);
    if (recipes) {
        response.json(recipes);
    } else {
        response.status(404).end();
    }
});

recipesRouter.delete('/:id', middleware.userExtractor, async (req, res, next) => {
    const user = req.user;
    const recipe = await Recipe.findById(req.params.id);

    if (user.id === recipe.user.toString()) {
        const id = String(req.params.id)
        Recipe.findByIdAndDelete(id)
            .then(() => { res.status(204).end(); logger.info('deleted') })
            .catch(error => next(error))
    } else {
        res.status(401).json({ error: 'Unauthorized' })
    }

});

recipesRouter.put('/:id', middleware.userExtractor, async (req, res, next) => {
    const user = req.user;
    const body = req.body
    const recipe = body;

    const recipeToCheck = await Recipe.findById(req.params.id);

    if (user.id === recipeToCheck.user.toString()) {
        const update = await Recipe.findByIdAndUpdate(req.params.id, recipe, { new: true, runValidators: true, context: 'query' })
            .populate('user', { username: 1, name: 1, id: 1 });
        if (update) {
            console.log('update', update);
            res.json(update);
        } else {
            res.status(404).end();
        }
    } else {
        res.status(401).json({ error: 'Unauthorized' })
    }
});

module.exports = recipesRouter;