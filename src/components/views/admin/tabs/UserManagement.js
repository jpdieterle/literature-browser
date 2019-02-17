import React from 'react';
import PropTypes from 'prop-types';
import {withStyles} from '@material-ui/core/styles';
import InfoButton from '@material-ui/icons/Info';
import Button from "@material-ui/core/Button";
import Typography from '@material-ui/core/Typography';
import TextField from '@material-ui/core/TextField';
import Paper from "@material-ui/core/Paper/Paper";
import Table from '@material-ui/core/Table';
import TableBody from '@material-ui/core/TableBody';
import TableCell from '@material-ui/core/TableCell';
import TableHead from '@material-ui/core/TableHead';
import TableRow from '@material-ui/core/TableRow';
import {Collapse} from 'react-collapse';

let rowss =  JSON.parse('{"user":"efwfw"}');

class UserManagement extends React.Component {

  handleChange = name => event => {
    this.setState({
      [name]: event.target.value,
    });
  };

  constructor(props, context) {
    super(props, context);

    this.state = {
      isOpened: false
    };
  }

  render() {
    const { classes } = this.props;
    const {  isOpened } = this.state;

    return (
        <div>
          {SimpleTable(this.props)}
          <Button
              onClick={() => this.setState({ isOpened: !isOpened })}
              aria-controls="example-collapse-text"
              aria-expanded={isOpened} className={classes.nutzerbutton}
          >
            Benutzer anlegen
          </Button>
          <Collapse isOpened={this.state.isOpened}>
            <div id="example-collapse-text">
              <Paper className={classes.formular}>
              <form className={classes.newUser}>
                <TextField
                    id="username"
                    label="Benutzername / E-Mail"
                    type="text"
                />
                <br />
                <TextField
                    id="password"
                    label="Passwort"
                    type="password"
                />
                <br />
                <Button className={classes.nutzerbutton}>
                 Anlegen
                </Button>
              </form>
              </Paper>
            </div>
          </Collapse>
        </div>
    );
  }

  componentDidMount() {

    fetch("backend/lib/admin.php", {
      method: 'GET',
      credentials: 'same-origin', // allow cookies -> session management
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify({getUser: "true"})
    })
        .then(response => {
          this.setState({responseCode: response.status});
          if(response.ok) {
            if(response.headers.get("content-type").indexOf("application/json") !== -1) {
              response.json().then(data => {
                this.setState({
                  responseData: JSON.stringify(data),
                  responseIn: true,
                });
              });
            }
          } else {
            this.setState({
              errorMessage: response.statusText,
              error: true
            });
          }
        })
        .catch(error => {
          this.setState({
            errorMessage: error.message,
            error: true
          });
        });
  }
}

UserManagement.propTypes = {
  classes: PropTypes.object.isRequired,
};

const styles = theme => ({

  root: {
    marginTop: theme.spacing.unit * 3,
    overflowX: 'auto',
    marginLeft: 1,
    marginRight: '20px',
  },
  table: {
    minWidth: 400,
  },
  newUser:{
    padding: '20px',
    marginTop: '20px'
  },
  nutzerpaper: {
    marginTop:'10px',
    marginRight: '20px',
  },
  nutzerBox: {
    padding: 5,
    display: 'flex',
  },
  deleteButton: {
    color: 'red'
  },
  formular:{
    marginRight: '20px'
  },
  nutzerbutton: {
    marginTop: '10px',
    border: '#CCC 1px solid'
  },
  tableWrapper: {
    width: '100%',
  }
});

let number = 0;
function createData(id, email) {
  number += 1;
   id = email[0];
  email = email[0];
  return { number, id, email};
}
const rows =[];
Object.entries(rowss).forEach(function(key, value) {
rows.push(createData(value,key));
});

function SimpleTable(props) {
  const { classes } = props;

  return (
      <div className={classes.tableWrapper}>
        <Paper className={classes.nutzerpaper}>
          <InfoButton color={"primary"} className={classes.infoIcon}/>
          <Typography color={"primary"} className={classes.nutzerBox}>
            Hier können Sie Nutzer hinzufügen und entfernen.
          </Typography>
        </Paper>
      <Paper className={classes.root}>
        <Table className={classes.table}>
          <TableHead>
            <TableRow>
              <TableCell>ID</TableCell>
              <TableCell align="left">Benutzername / E-mail</TableCell>
              <TableCell align="left">Aktion </TableCell>
            </TableRow>
          </TableHead>
          <TableBody>
            {rows.map(row => (
                <TableRow key={row.number}>
                  <TableCell component="th" scope="row">{row.number}</TableCell>
                  <TableCell align="left">{row.email}</TableCell>
                  <TableCell align="left"> <Button color="inherit" className={classes.deleteButton}>Löschen</Button></TableCell>
                </TableRow>
            ))}
          </TableBody>
        </Table>
      </Paper>
      </div>
  );
}

SimpleTable.propTypes = {
  classes: PropTypes.object.isRequired,
};

export default withStyles(styles)(UserManagement);

