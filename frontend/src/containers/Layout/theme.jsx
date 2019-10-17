import { createMuiTheme } from '@material-ui/core/styles';
import red from '@material-ui/core/colors/red';
import grey from '@material-ui/core/colors/grey';

const customizedTheme = createMuiTheme({
    palette: {
        primary: grey,
        secondary: red,
    },
});

export default customizedTheme;
