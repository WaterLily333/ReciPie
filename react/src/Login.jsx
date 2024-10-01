import React, { useState } from 'react';
import recipeService from './services/recipeService';
import Modal from '@mui/material/Modal';
import Box from '@mui/material/Box';
import CancelIcon from '@mui/icons-material/Cancel';
import IconButton from '@mui/material/IconButton';
import { User } from './global/user';

const Login = ({ setUser, showLogin, setShowLogin }) => {
    const [username, setUsername] = useState('');
    const [password, setPassword] = useState('');
    const [error, setError] = useState('');

    const handleUsernameChange = (e) => {
        setUsername(e.target.value);
    };

    const handlePasswordChange = (e) => {
        setPassword(e.target.value);
    };

    const handleSubmit = async (e) => {
        e.preventDefault();
        try {
            const login = await recipeService.login(username, password);
            setError('');
            setUser(login.name);
            window.localStorage.setItem('loggedUser', JSON.stringify(login));
            User._token = login.token;
            User._userName = login.username;
            setShowLogin(false)
            setUsername();
            setPassword();
        } catch (error) {
            console.log(error);
            setError('Wrong credentials');
        }
    };


    return (
        <div>
            <Modal
                open={showLogin}
                // onClose={handleClose}
                aria-labelledby="modal-modal-title"
                aria-describedby="modal-modal-description"
            >
                <Box sx={style}>
                    <div style={{ display: 'flex', flexDirection: 'row', justifyContent: 'space-between', alignItems: 'center' }}>
                        <h2>Login</h2>
                        <IconButton
                            size="large"
                            edge="start"
                            color="inherit"
                            aria-label="menu"
                            sx={{ mr: 2 }}
                            onClick={() => {
                                setShowLogin(false);
                                setUsername();
                                setPassword();
                            }}
                        >
                            <CancelIcon />
                        </IconButton>
                    </div>

                    <form onSubmit={handleSubmit}>
                        <div>
                            <label htmlFor="username">Username:</label>
                            <input
                                required
                                type="text"
                                id="username"
                                value={username}
                                onChange={handleUsernameChange}
                            />
                        </div>
                        <div>
                            <label htmlFor="password">Password:</label>
                            <input
                                required
                                type="password"
                                id="password"
                                value={password}
                                onChange={handlePasswordChange}
                            />
                        </div>
                        <button type="submit">Login</button>
                        {error && <div className='error'>{error}</div>}
                    </form>
                </Box>
            </Modal>
        </div >
    );
};

const style = {
    position: 'absolute',
    top: '50%',
    left: '50%',
    transform: 'translate(-50%, -50%)',
    width: 400,
    bgcolor: 'background.paper',
    border: '2px solid #000',
    boxShadow: 100,
    p: 10,
};
export default Login;
