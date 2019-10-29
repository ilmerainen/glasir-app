import React, { memo } from 'react';
import Grid from '@material-ui/core/Grid';
import PropTypes from 'prop-types';
import { Link } from 'react-router-dom';
import Button from '@material-ui/core/Button';
import IconButton from '@material-ui/core/IconButton';
import Box from '@material-ui/core/Box';
import DialogTitle from '@material-ui/core/DialogTitle';
import Dialog from '@material-ui/core/Dialog';
import DialogContent from '@material-ui/core/DialogContent';
import TextField from '@material-ui/core/TextField';
import CancelIcon from '@material-ui/icons/Cancel';
import { Typography } from '@material-ui/core';

import useStyles from './styles';

function BagModal({ bag, open, onClose, setProductCount, handleCancelItem }) {
    const classes = useStyles();
    const products = Object.entries(bag);
    const bagIsEmpty = !products.length;
    const total = Object.values(bag).reduce((sum, { price, count }) => {
        return price * count + sum;
    }, 0);

    return (
        <Dialog
            onClose={onClose}
            aria-labelledby="modal-bag"
            open={open}
            maxWidth="md"
            className={classes.root}
            fullWidth
        >
            <DialogTitle id="modal-bag">
                <Box fontSize="h6">Bag</Box>
            </DialogTitle>
            <DialogContent dividers className={classes.dialogContent}>
                {bagIsEmpty && (
                    <Grid
                        container
                        alignItems="center"
                        className={classes.emptyBag}
                    >
                        <Grid item xs={12}>
                            <Grid container justify="center">
                                <Typography variant="h5">
                                    There is nothing in the bag
                                </Typography>
                            </Grid>
                        </Grid>
                    </Grid>
                )}
                {!bagIsEmpty && (
                    <Grid container>
                        {products.map(
                            ([name, { image, price, count, url }]) => (
                                <Grid
                                    key={name}
                                    container
                                    alignItems="center"
                                    className={classes.product}
                                >
                                    <Grid item xs={4}>
                                        <Grid container alignItems="center">
                                            <Grid item xs={2}>
                                                <IconButton
                                                    className={
                                                        classes.cancelButton
                                                    }
                                                    onClick={handleCancelItem(
                                                        name
                                                    )}
                                                >
                                                    <CancelIcon />
                                                </IconButton>
                                            </Grid>
                                            <Grid
                                                item
                                                xs={10}
                                                className={classes.imageBlock}
                                            >
                                                <Link
                                                    to={url}
                                                    onClick={onClose}
                                                >
                                                    <img
                                                        src={image}
                                                        alt={name}
                                                        className={
                                                            classes.productImage
                                                        }
                                                    />
                                                </Link>
                                            </Grid>
                                        </Grid>
                                    </Grid>
                                    <Grid item xs={3}>
                                        <Grid container justify="center">
                                            <Link
                                                to={url}
                                                onClick={onClose}
                                                className={classes.textLink}
                                            >
                                                <Typography variant="subtitle1">
                                                    {name}
                                                </Typography>
                                            </Link>
                                        </Grid>
                                    </Grid>
                                    <Grid item xs={3}>
                                        <TextField
                                            id="outlined-number"
                                            label="Count"
                                            value={count}
                                            onChange={setProductCount(name)}
                                            type="number"
                                            className={classes.textField}
                                            InputLabelProps={{
                                                shrink: true,
                                            }}
                                            margin="normal"
                                            variant="outlined"
                                        />
                                    </Grid>
                                    <Grid item xs={2}>
                                        <Grid container justify="center">
                                            <Typography variant="h6">
                                                {`${price} $`}
                                            </Typography>
                                        </Grid>
                                    </Grid>
                                </Grid>
                            )
                        )}
                    </Grid>
                )}
            </DialogContent>
            {!bagIsEmpty && (
                <Grid container className={classes.footer}>
                    <Grid
                        container
                        justify="flex-end"
                        className={classes.totalText}
                    >
                        <Grid item xs={3}>
                            <Grid container justify="center">
                                <Typography variant="h5">
                                    <Box
                                        component="span"
                                        fontWeight="fontWeightBold"
                                    >
                                        {`Total: ${total}$`}
                                    </Box>
                                </Typography>
                            </Grid>
                        </Grid>
                    </Grid>
                    <Grid
                        container
                        justify="flex-end"
                        className={classes.footerButtons}
                    >
                        <Grid item xs={3}>
                            <Grid container justify="center">
                                <Button
                                    size="large"
                                    variant="outlined"
                                    color="primary"
                                    className={classes.button}
                                    onClick={onClose}
                                >
                                    Continue shopping
                                </Button>
                            </Grid>
                        </Grid>
                        <Grid item xs={3}>
                            <Grid container justify="center">
                                <Button
                                    size="large"
                                    variant="contained"
                                    color="primary"
                                    className={classes.button}
                                >
                                    Check out
                                </Button>
                            </Grid>
                        </Grid>
                    </Grid>
                </Grid>
            )}
        </Dialog>
    );
}

BagModal.defaultProps = {
    open: false,
};

BagModal.propTypes = {
    bag: PropTypes.object.isRequired,
    onClose: PropTypes.func.isRequired,
    open: PropTypes.bool,
    setProductCount: PropTypes.func.isRequired,
    handleCancelItem: PropTypes.func.isRequired,
};

export default memo(BagModal);
