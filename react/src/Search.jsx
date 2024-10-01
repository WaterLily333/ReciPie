import React, { useState } from 'react';
import receipts from './services/recipeService';
import { Box, Checkbox, FormControlLabel, FormGroup } from '@mui/material';

const onSearch = async (query, ingredients, cookingTime, setFilteredRecipes, setSelectedRecipe, setShowOptions) => {
    // setLoading(true);
    const ingCopy = ingredients.split(', ').map((ing) => ing.trim());
    try {
        const recipes = await receipts.getRecipeBySearch({ query: query, ingredients: ingCopy, cookingTime: cookingTime });//await axios.get(`http://localhost:3001/api/recipes`);
        setFilteredRecipes(recipes);
        setSelectedRecipe(recipes.length === 1 ? recipes[0] : undefined);
        setShowOptions(false);
    } catch (error) {
        console.error("Error fetching recipes:", error);
    }
};

const Search = ({ setFilteredRecipes, setSelectedRecipe, setShowOptions }) => {
    const [query, setQuery] = useState('');
    const [ingredients, setIngredients] = useState('');
    const [cookingTime, setCookingTime] = useState('');
    const [showCookingTime, setShowCookingTime] = useState(false);
    const [showIngredients, setShowIngredients] = useState(false);

    const handleSubmit = (e) => {
        e.preventDefault();
        console.log('query', query);
        setSelectedRecipe(undefined);
        onSearch(query, ingredients, cookingTime, setFilteredRecipes, setSelectedRecipe, setShowOptions);
    };

    const handleIngredientsChange = (e) => {
        setIngredients(e.target.value);
    }

    const handleCookingTimeChange = (e) => {
        setCookingTime(e.target.value.trim());
    }

    return (
        <div style={{ display: 'flex', justifyContent: 'space-between' }}>
            <form onSubmit={handleSubmit} className="search-form" style={{ minWidth: '60%' }}>
                <input
                    type="text"
                    value={query}
                    onChange={(e) => setQuery(e.target.value)}
                    placeholder="Search for a recipe..."
                />
                {showIngredients &&
                    <input
                        type="text"
                        value={ingredients}
                        id='ingredients'
                        onChange={handleIngredientsChange}
                        placeholder="ingredients"
                    />
                }
                {showCookingTime &&
                    <div style={{ display: 'flex', position: 'relative', flex: 0.5 }} >
                        <input
                            type="number"
                            value={cookingTime}
                            id='cookingTime'
                            onChange={handleCookingTimeChange}
                            placeholder="cooking time"
                        />
                        {cookingTime && <label htmlFor='cookingTime' style={{ position: 'absolute', right: '30px', top: '50%', transform: 'translateY(-20%)' }}>
                            minutes
                        </label>}
                    </div>
                }
                <button type="submit">Search</button>
            </form>
            <Box sx={{ display: 'flex', alignItems: 'center' }}>
                <label style={{ marginRight: 20 }}><h3>Filter By:  </h3></label>
                <FormGroup row style={{ minWidth: '40%', backgroundColor: 'rgb(0, 146, 255)' }}>
                    <FormControlLabel
                        style={{ color: 'white' }}
                        control={<Checkbox
                            style={{ color: 'white' }}
                            onClick={(e) => {
                                if (e.target.checked) {
                                    setShowIngredients(true);
                                } else {
                                    setIngredients('');
                                    setShowIngredients(false);
                                }
                            }}
                        />}
                        label="Ingredients"
                    />
                    <FormControlLabel
                        style={{ color: 'white' }}
                        control={<Checkbox
                            style={{ color: 'white' }}
                            onClick={(e) => {
                                if (e.target.checked) {
                                    setShowCookingTime(true);
                                } else {
                                    setCookingTime('');
                                    setShowCookingTime(false);
                                }
                            }}
                        />}
                        label="Cooking time" />
                </FormGroup>
            </Box>
        </div >

    );
};

export default Search;
