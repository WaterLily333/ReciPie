import React, { useState } from 'react';
import recipeService from './services/recipeService';
import Modal from '@mui/material/Modal';
import Box from '@mui/material/Box';
import CancelIcon from '@mui/icons-material/Cancel';
import IconButton from '@mui/material/IconButton';
import { User } from './global/user';
import { LoaderUtil } from './global/loaderUtil';

const SignUp = ({ showSingUp, setShowSingUp }) => {
    const [username, setUsername] = useState('');
    const [password, setPassword] = useState('');
    const [name, setName] = useState('');
    const [confirmPassword, setConfirmPassword] = useState('');
    const [error, setError] = useState('');

    const handleUsernameChange = (e) => {
        setUsername(e.target.value);
    };

    const handleNameChange = (e) => {
        setName(e.target.value);
    }

    const handlePasswordChange = (e) => {
        setPassword(e.target.value);
    };

    const handleConfirmPasswordChange = (e) => {
        setConfirmPassword(e.target.value);
    };

    const handleSubmit = async (e) => {
        e.preventDefault();

        if (password !== confirmPassword) {
            setError('Passwords do not match');
            return;
        }

        try {
            LoaderUtil.show();
            await recipeService.createUser(name, username, password);
            setError('');
            setShowSingUp(false)
            setUsername('');
            setPassword('');
            setName('');
            setError('');
        } catch (error) {
            console.log(error);
            if (error.request.response === '{"error":"expected `username` to be unique"}') {
                setError('Username already exists');
            } else {
                setError(error.request.response);
            }
        } finally {
            LoaderUtil.hide();
        }
    };


    return (
        <div>
            <Modal
                open={showSingUp}
                // onClose={handleClose}
                aria-labelledby="modal-modal-title"
                aria-describedby="modal-modal-description"
            >
                <Box sx={style}>
                    <div style={{ display: 'flex', flexDirection: 'row', justifyContent: 'space-between', alignItems: 'center' }}>
                        <h2>SignIn</h2>
                        <IconButton
                            size="large"
                            edge="start"
                            color="inherit"
                            aria-label="menu"
                            sx={{ mr: 2 }}
                            onClick={() => {
                                setShowSingUp(false);
                                setUsername('');
                                setPassword('');
                                setConfirmPassword('');
                                setError('');
                            }}
                        >
                            <CancelIcon />
                        </IconButton>
                    </div>

                    <form onSubmit={handleSubmit}>
                        <div className='form-group'>
                            <label htmlFor="username">Username:</label>
                            <input
                                required
                                type="text"
                                id="username"
                                value={username}
                                onChange={handleUsernameChange}
                            />
                        </div>
                        <div className='form-group'>
                            <label htmlFor="name">Name:</label>
                            <input
                                required
                                type="text"
                                id="name"
                                value={name}
                                onChange={handleNameChange}
                            />
                        </div>
                        <div className='form-group'>
                            <label htmlFor="password">Password:</label>
                            <input
                                required
                                type="password"
                                id="password"
                                value={password}
                                onChange={handlePasswordChange}
                            />
                        </div>
                        <div className='form-group'>
                            <label htmlFor="confirmPassword">Confirm password:</label>
                            <input
                                required
                                type="password"
                                id="confirmPassword"
                                value={confirmPassword}
                                onChange={handleConfirmPasswordChange}
                            />
                        </div>
                        <button type="submit">Create Account</button>
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
export default SignUp;
