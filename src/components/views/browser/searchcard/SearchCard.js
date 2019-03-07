import React from 'react';
import PropTypes from 'prop-types';
import { withStyles } from '@material-ui/core/styles';
import Paper from '@material-ui/core/Paper';
import Button from '@material-ui/core/Button';
import IconButton from '@material-ui/core/IconButton';
import CloseButton from '@material-ui/icons/Close';
import Typography from '@material-ui/core/Typography';

class SearchCard extends React.PureComponent {
  state = {}; // stateless component (container for inputs)

  onDelete = () => {this.props.onDelete(this.props.id)};
  onDuplicate = () => {this.props.onDuplicate(this.props.id)};

  render() {
    const { classes, id, getIndex, getDisabled } = this.props;

    return(
      <div className={classes.root}>
        <Paper className={classes.backdrop}>
          <div className={classes.topContainer}>
            <Typography variant={'h6'} color={'primary'} className={classes.title}>
              Suche Teil {getIndex(id) + 1}
            </Typography>
            <IconButton className={classes.closeButton} onClick={this.onDelete} disabled={getDisabled()}>
              <CloseButton color={'error'}/>
            </IconButton>
          </div>

          {this.props.children}

          <Button
            size="small"
            color="primary"
            className={classes.button}
            disabled={getDisabled()}
            onClick={this.onDuplicate}
          >
            duplizieren
          </Button>
        </Paper>
      </div>
    );
  }
}

SearchCard.propTypes = {
  classes: PropTypes.object.isRequired,
  id: PropTypes.string.isRequired,
  getIndex: PropTypes.func.isRequired,
  getDisabled:PropTypes.func.isRequired,
  onDuplicate: PropTypes.func.isRequired,
  onDelete: PropTypes.func.isRequired,
};

const styles = theme => ({
  root:{},
  backdrop: {
    width: 400,
    padding: 20,
    margin: theme.spacing.unit,
  },
  topContainer:{
    display: 'flex',
    justifyContent: 'space-between',
  },
  button:{
    marginTop: 10,
  },
  closeButton:{
    marginTop: -(theme.spacing.unit),
    marginRight: -(theme.spacing.unit),
  },
  title:{
    marginLeft: theme.spacing.unit,
  }
});
export default withStyles(styles)(SearchCard);