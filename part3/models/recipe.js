const config = require('../utils/config');
const mongoose = require('mongoose');

mongoose.set('strictQuery', false);

const recipeSchema = new mongoose.Schema({
    title: {
        type: String,
        required: [true, 'Title required'],
        validate: {
            validator: function (v) {
                const words = ["laino", "otrova"];
                const regex = new RegExp(words.join("|"), 'i');
                if (regex.test(v)) {
                    return false;
                }
                return true;
            },
            message: props => `${props.value} no offensive words or poisonous substances allowed!`
        }
    },
    author: String,
    content: {
        type: String,
        required: [true, 'Content required'],
        validate: {
            validator: function (v) {
                const words = ["laino", "otrova"];
                const regex = new RegExp(words.join("|"), 'i');
                if (regex.test(v)) {
                    return false;
                }
                return true;
            },
            message: props => `${props.value} no offensive words or poisonous substances allowed!`
        }
    },
    ingredients: {
        type: [String],
        required: [true, 'Ingredients required'],
    },
    cookingTime: {
        type: Number,
        required: [true, 'Cooking time required'],
    },
    servings: {
        type: Number,
        required: [true, 'Servings required'],
    },
    likes: Number,
    user: {
        type: mongoose.Schema.Types.ObjectId,
        ref: 'User'
    },
    img: String,
});

recipeSchema.set('toJSON', {
    transform: (document, returnedObject) => {
        returnedObject.id = returnedObject._id.toString()
        delete returnedObject._id
        delete returnedObject.__v
    }
});

module.exports = mongoose.model('Recipe', recipeSchema);


