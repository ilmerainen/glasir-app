import { makeStyles } from '@material-ui/core/styles';

const useStyles = makeStyles(theme => ({
    root: {},
    card: {
        width: 'inherit',
        color: theme.palette.common.black,
        '&:hover': {
            color: theme.palette.grey[800],
        },
    },
    image: {
        width: 'auto',
        userDrag: 'none',
    },
    imageBlock: {
        height: '320px',
        overflow: 'hidden',
        backgroundColor: theme.palette.grey[200],
    },
    textLink: {
        textDecoration: 'none',
        color: 'inherit',
    },
}));

export default useStyles;
