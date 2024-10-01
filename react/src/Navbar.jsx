import * as React from 'react';
import AppBar from '@mui/material/AppBar';
import Box from '@mui/material/Box';
import Toolbar from '@mui/material/Toolbar';
import Typography from '@mui/material/Typography';
import Button from '@mui/material/Button';
import IconButton from '@mui/material/IconButton';
import MenuIcon from '@mui/icons-material/Menu';
import Logout from './Logout';
import recipeService from './services/recipeService';
import { LoaderUtil } from './global/loaderUtil';

const getAllRecipes = async (setReceipts, setShowCreateRecipe, setShowOptions) => {
    LoaderUtil.show();
    setShowCreateRecipe(false);
    try {
        const recipes = await recipeService.getReceipts()
        setReceipts(recipes);
        setShowOptions(false);
    } catch (error) {
    } finally {
        LoaderUtil.hide();
    }
}

const getMyRecipes = async (setReceipts, setShowCreateRecipe, setShowOptions) => {
    setShowCreateRecipe(false);
    const recipes = await recipeService.getAllReceiptsByUser()
    setReceipts(recipes);
    setShowOptions(true);

}

export default function NavBar({
    setShowLogin,
    userName,
    setUsername,
    setReceipts,
    setShowCreateRecipe,
    setShowOptions,
    editRef,
    setShowSingUp
}) {
    return (
        <Box>
            <AppBar position="sticky">
                <Toolbar sx={{ display: 'flex', justifyContent: 'space-between' }} >
                    <Box sx={{ display: 'flex', alignContent: 'center', alignItems: 'center' }}>
                        {/* <IconButton
                            size="large"
                            edge="start"
                            color="inherit"
                            aria-label="menu"
                            sx={{ mr: 2 }}
                        >
                            <MenuIcon />
                        </IconButton> */}
                        <Typography
                            variant="h6" component="div" sx={{ flexGrow: 1, cursor: 'pointer' }}
                            onClick={() => { getAllRecipes(setReceipts, setShowCreateRecipe, setShowOptions) }}>
                            Recipes
                        </Typography>
                        {userName &&
                            <Typography
                                variant="h6" component="div" sx={{ flexGrow: 1, cursor: 'pointer', marginInline: 2 }}
                                onClick={() => { setShowCreateRecipe(true); editRef.current = false; }} >
                                Create Recipe
                            </Typography>}
                        {userName && <Typography onClick={() => { getMyRecipes(setReceipts, setShowCreateRecipe, setShowOptions) }} variant="h6" component="div" sx={{ flexGrow: 1, cursor: 'pointer' }}>
                            My Recipes
                        </Typography>}
                    </Box>
                    <Box>
                        {userName
                            ?
                            <div className='welcome'> Welcome {userName}! <Logout setUsername={setUsername} /> </div>
                            :
                            <div>
                                <Button style={{ backgroundColor: 'white', color: 'blue', marginInline: 10 }} onClick={() => { setShowLogin(true) }}>Login</Button>
                                <Button style={{ backgroundColor: 'inherit', color: 'white', border: '2px solid white' }} onClick={() => { setShowSingUp(true) }}>Sign up</Button>
                            </div>
                        }
                    </Box>
                </Toolbar>
            </AppBar>
        </Box>
    );
}