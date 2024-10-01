import React, { useEffect, useState } from 'react';
import Box from '@mui/material/Box';
import CircularProgress from '@mui/material/CircularProgress';
import Dialog from '@mui/material/Dialog';
import DialogContent from '@mui/material/DialogContent';
import { LoaderUtil } from './global/loaderUtil';

const Loader = () => {
    const [loading, setLoading] = useState(false);
    useEffect(() => {
        LoaderUtil.instance.setIsLoading = (loading) => {
            setLoading(loading);
        };

    }, [LoaderUtil.instance.setIsLoading]);

    return (
        <div>
            <Dialog
                open={loading}
                fullScreen={false}
                // onClose={handleClose}
                aria-labelledby="alert-dialog-title"
                aria-describedby="alert-dialog-description"
            >
                <DialogContent>
                    <CircularProgress value={25} />
                </DialogContent>
            </Dialog>
        </div >
    );
};

const style = {
    position: 'absolute',
    top: '50%',
    left: '50%',
    transform: 'translate(-50%, -50%)',
    // width: 10,
    // height: 10,
    bgcolor: 'background.paper',
    border: '2px solid #000',
    boxShadow: 100,
};
export default Loader;
