const RecipeDetails = ({ recipe }) => {
    return (
        <div className="recipe-details">
            <h2>{recipe.title}</h2>
            <p>Cooking Time: <b>{recipe.cookingTime}mins</b></p>
            <p>Servings: <b>{recipe.servings}</b> </p>

            <h2>Ingredients:</h2>
            <ul>
                {(recipe.ingredients || []).map((ing, index) => (
                    <li key={index}>{ing}</li>
                ))}
            </ul>
            <h2>Instructions:</h2>
            {recipe.content}
        </div>
    );
};

export default RecipeDetails;
