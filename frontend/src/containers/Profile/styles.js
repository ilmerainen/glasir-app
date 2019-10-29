import { makeStyles } from '@material-ui/core/styles';

const useStyles = makeStyles(theme => ({
    root: {},
    block: {
        marginBottom: theme.spacing(3),
    },
    avatar: {
        borderRadius: 5,
        boxShadow: theme.shadows[2],
    },
    content: {
        marginBottom: theme.spacing(3),
    },
}));

export default useStyles;
