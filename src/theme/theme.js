import { createMuiTheme } from '@material-ui/core/styles';
import indigo from '@material-ui/core/colors/indigo';
import lime from '@material-ui/core/colors/lime';
import grey from '@material-ui/core/colors/grey';

const theme = createMuiTheme({
  palette: {
    primary: indigo,
    secondary: lime,
    background: grey,
  },
  typography: {
    useNextVariants: true,
  },
});

export default theme;