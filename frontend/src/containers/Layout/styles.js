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
    content: {
        width: 'calc(100% - 280px)',
    },
    menu: {
        height: '100vh',
        width: '280px',
    },
    breadcrumbs: {},
}));

export default useStyles;
