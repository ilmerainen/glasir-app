import { makeStyles } from '@material-ui/core/styles';

const useStyles = makeStyles(theme => ({
    root: {},
    list: {
        paddingTop: 0,
    },
    lists: {
        overflow: 'auto',
        height: 'inherit',
        backgroundColor: theme.palette.background.paper,
    },
    nested: {
        paddingLeft: theme.spacing(4),
    },
    headLink: {
        display: 'flex',
        alignItems: 'center',
        textDecoration: 'none',
        fontFamily: 'Roboto Condensed',
        fontWeight: '600',
        color: theme.palette.text.primary,
    },
    head: {
        minHeight: '64px',
        padding: '5%',
        paddingLeft: '16px',
    },
    logo: {
        marginRight: '8px',
        fontSize: '0',
    },
}));

export default useStyles;
