import { makeStyles } from '@material-ui/core/styles';

const useStyles = makeStyles(theme => ({
    button: {
        backgroundColor: theme.palette.common.white,
        padding: theme.spacing(1),
    },
    active: {
        backgroundColor: theme.palette.grey[200],
        color: 'black',
        '&:disabled': {
            color: theme.palette.common.black,
        },
    },
}));

export default useStyles;
