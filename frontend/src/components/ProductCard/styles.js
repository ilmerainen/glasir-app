import { makeStyles } from '@material-ui/core/styles';

const useStyles = makeStyles(theme => ({
    root: {},
    card: {
        width: 'inherit',
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
}));

export default useStyles;
