import { makeStyles } from '@material-ui/core/styles';

const useStyles = makeStyles(theme => ({
    link: {
        cursor: 'pointer',
        textDecoration: 'none',
        color: theme.palette.text.primary,
        '&:hover': {
            textDecoration: 'none',
            color: theme.palette.text.secondary,
        },
    },
}));

export default useStyles;
