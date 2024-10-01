import React, { useEffect, useState } from 'react';
import EditIcon from '@mui/icons-material/Edit';
import DeleteForeverIcon from '@mui/icons-material/DeleteForever';
import recipeService from './services/recipeService';

const RecipeList = ({ recipes, setSelectedRecipe, setRecipe, setShowCreateRecipe, editRef, showOptions, setFilteredRecipes }) => {
  // const [images, setImages] = useState({});
  // const getImg = async (title) => {
  //   try {
  //     const response = await axios.get(`https://pixabay.com/api/`, {
  //       params: {
  //         key: '46179411-8ca467e89de390329b1cc9304',
  //         q: title, // Search term entered by the user
  //         image_type: "photo", // Specify image type (photo, vector, or illustration)
  //         per_page: 3, // Number of results to retrieve
  //       },
  //     });

  //     // Extract image URLs from the response
  //     // const imageResults = response.data.hits.map((hit) => hit.webformatURL);
  //     // setImg(response.data.hits[0].webformatURL);
  //     const randomNumber = Math.floor(Math.random() * 2) + 1;
  //     console.log('randomNumber', randomNumber);
  //     console.log('res', response.data.hits[0].webformatURL);
  //     return response.data.hits[0].webformatURL;
  //   } catch (error) {
  //     console.error("Error fetching images from Pixabay:", error);
  //   }
  // }

  // useEffect(() => {
  //   if (recipes.length === 0) {
  //     return;
  //   }
  //   const fetchImages = async () => {
  //     const newImages = {};
  //     LoaderUtil.show();
  //     for (const recipe of recipes) {
  //       newImages[recipe.id] = await getImg(recipe.title);
  //     }
  //     setImages(newImages);
  //     LoaderUtil.hide();
  //   };

  //   fetchImages();
  // }, [recipes]);

  const setEditRecipe = (setRecipe, recipe, setShowCreateRecipe, editRef) => {
    setRecipe(recipe);
    setShowCreateRecipe(true);
    editRef.current = true;
  }
  const deleteRecipe = (recipe, recipes, setFilteredRecipes) => {
    try {
      const conf = confirm('Are you sure you want to delete this recipe?');
      if (!conf) return;
      recipeService.deleteReceipt(recipe.id);
      setFilteredRecipes(recipes.filter((r) => r.id !== recipe.id));
      alert('Recipe deleted successfully!');
    } catch (error) {
      alert('Failed to delete recipe');
    }
  }

  const selectRecipeForDesc = async (recipe, setSelectedRecipe, setFilteredRecipes) => {
    try {
      const content = await recipeService.getReceiptById(recipe.id);
      setSelectedRecipe(content.content);
      setFilteredRecipes([recipe]);
    } catch (error) {
      console.error("Error fetching recipe details:", error);
    }
  };

  return (
    <>
      {recipes.map((recipe) => (
        <div key={recipe.id} className="recipe-list">
          <div
            className="recipe-item"
            onClick={() => { selectRecipeForDesc(recipe, setSelectedRecipe, setFilteredRecipes) }}
          >
            <h2><b>{recipe.title}</b> </h2>
            <div class="recipe-list-details">
              <div class="image-container">
                <img src={recipe.img} alt={recipe.title} />
              </div>
            </div>
            <div style={{ display: 'flex', justifyContent: 'space-evenly', gap: '60px' }}>
              <p>Cooking Time:  <b>{recipe.cookingTime}</b> mins</p>
              <p>Servings: <b>{recipe.servings}</b> </p>
            </div>


          </div>
          {showOptions &&
            <div style={{ display: 'flex', flexDirection: 'row', justifyContent: 'end' }}>
              <EditIcon className="recipe-item-options" onClick={() => { setEditRecipe(setRecipe, recipe, setShowCreateRecipe, editRef) }} style={{ fontSize: 40 }} />
              <DeleteForeverIcon className="recipe-item-options" onClick={() => { deleteRecipe(recipe, recipes, setFilteredRecipes) }} style={{ fontSize: 40 }} />
            </div>}

        </div >
      ))}
    </>
  );
};

export default RecipeList;
