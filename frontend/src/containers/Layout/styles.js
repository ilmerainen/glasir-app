import { makeStyles } from '@material-ui/core/styles';

const useStyles = makeStyles(theme => ({
    progress: {
        margin: theme.spacing(2),
    },
    loadingGrid: {
        height: '100vh',
    },
    app: {
        height: '100%',
        width: '100%',
    },
    mainSection: {
        width: 'calc(100% - 280px)',
    },
    block: {
        marginTop: theme.spacing(2),
    },
    menu: {
        height: '100%',
        width: '280px',
    },
    breadcrumbs: {},
}));

export default useStyles;
