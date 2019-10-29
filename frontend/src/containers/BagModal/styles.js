import { makeStyles } from '@material-ui/core/styles';

const useStyles = makeStyles(theme => ({
    root: {
        width: '100%',
    },
    productImage: {
        borderRadius: '4px',
    },
    imageBlock: {
        paddingLeft: theme.spacing(1),
    },
    emptyBag: {
        minHeight: theme.spacing(20),
    },
    cancelButton: {
        color: theme.palette.grey[200],
        '&:hover': {
            color: theme.palette.secondary[500],
        },
    },
    totalText: {
        marginBottom: theme.spacing(3),
    },
    footer: {
        padding: `${theme.spacing(2)}px ${theme.spacing(3)}px`,
    },
    textLink: {
        textDecoration: 'none',
        color: 'inherit',
        '&:hover': {
            color: theme.palette.grey[800],
        },
    },
}));

export default useStyles;
