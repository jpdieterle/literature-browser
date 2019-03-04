import { createMuiTheme } from '@material-ui/core/styles';
import indigo from '@material-ui/core/colors/indigo';
import red from '@material-ui/core/colors/red';
import grey from '@material-ui/core/colors/grey';

const theme = createMuiTheme({
  palette: {
    primary: {
      light: indigo[300],
      main: indigo[600],
      dark: indigo[900],
    },
    secondary: {
      light: red[300],
      main: red[600],
      dark: red[900],
    },
    background: grey,
  },
  typography: {
    useNextVariants: true,
  },
});

export default theme;