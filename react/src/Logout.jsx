import { Button } from "@mui/material";
import recipeService from "./services/recipeService";
import { User } from "./global/user";

const Logout = ({ setUsername }) => {
    const logout = async (setUsername) => {
        setUsername(undefined);
        await recipeService.logout();
        User._token = undefined;
        User._userName = undefined;
        window.localStorage.removeItem('loggedUser');
    };

    return (
        <Button style={{ color: 'white', backgroundColor: 'red', padding: '10px 20px' }} className="button" onClick={() => { logout(setUsername) }}>
            Logout
        </Button >
    );
};

export default Logout;
