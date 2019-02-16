import React from 'react';
import PropTypes from 'prop-types';
import {withStyles} from '@material-ui/core/styles';
import InfoButton from '@material-ui/icons/Info';
import Button from "@material-ui/core/Button";
import Typography from '@material-ui/core/Typography';
import Paper from "@material-ui/core/Paper/Paper";
import Table from '@material-ui/core/Table';
import TableBody from '@material-ui/core/TableBody';
import TableCell from '@material-ui/core/TableCell';
import TableHead from '@material-ui/core/TableHead';
import TableRow from '@material-ui/core/TableRow';

class UserManagement extends React.Component {
  state = {}
  ;

  handleChange = name => event => {
    this.setState({
      [name]: event.target.value,
    });
  };

// TODO: add user
// TODO: remove user
// TODO: change PW

  render() {
    const {classes} = this.props;

    // TODO: render user list (w/ checkboxes)



    return (
        <div>
        </div>
    )
  }



}

UserManagement.propTypes = {
  classes: PropTypes.object.isRequired,
};

const styles = theme => ({

  root: {
    width: '100%',
    marginTop: theme.spacing.unit * 3,
    overflowX: 'auto',
    margin: -10,
    marginLeft: 1,
  },
  table: {
    minWidth: 400,
  },
  nutzerpaper: {
    marginTop:'10px',
    marginRight: '20px',
  },
  nutzerBox: {
    padding: 5,
    display: 'flex',
  },
  nutzerbutton: {
    backgroundColor: '#CCCCCC',
    marginTop: '10px'
  }
});


let number = 0;
function createData(id, name, email, password) {
  number += 1;
  return { number, id, name, email, password};
}
const rows = [
  createData(1, 'Admin', 'Admin@gutenberg.de', 12345),
];

function SimpleTable(props) {
  const { classes } = props;

  return (
      <div>
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
              <TableCell align="right">Name</TableCell>
              <TableCell align="right">Email</TableCell>
              <TableCell align="right">Password</TableCell>
            </TableRow>
          </TableHead>
          <TableBody>
            {rows.map(row => (
                <TableRow key={row.number}>
                  <TableCell component="th" scope="row">{row.id}</TableCell>
                  <TableCell align="right">{row.name}</TableCell>
                  <TableCell align="right">{row.email}</TableCell>
                  <TableCell align="right">{row.password}</TableCell>
                </TableRow>
            ))}
          </TableBody>
        </Table>
      </Paper>
        <p/>
        <Button color="inherit"  className={classes.nutzerbutton}> Nutzer Hinzufügen</Button>
      </div>
  );
}


SimpleTable.propTypes = {
  classes: PropTypes.object.isRequired,
};




function User(props){
  const{classes} = props;

  return(
      <Button color="inherit"  className={classes.nutzerbutton}> Nutzer Hinzufügen</Button>

  );
}

User.propTypes = {
  classes: PropTypes.object.isRequired,
};


export default withStyles(styles)(SimpleTable);

