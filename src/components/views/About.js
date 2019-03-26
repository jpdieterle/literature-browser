import React from 'react';
import PropTypes from 'prop-types';
import { withStyles } from '@material-ui/core/styles';
import Typography from '@material-ui/core/Typography';

// about the project, impressum
class About extends React.Component {
  state = {

  };

  render() {
    const { classes } = this.props;
    return(
      <div className={classes.root}>
        <Typography variant={'h5'} color={'primary'} className={classes.aboutText}>Über diese Seite</Typography><br/>
        <Typography className={classes.aboutText} paragraph={true}>
          Diese Webseite ist das Ergebnis des Projekts “Gutenberg German Poetry Corpus” im Rahmen des Moduls “Interdisziplinäres Medienprojekt” des Studiengangs B.Sc. Medieninformatik an der Freien Universität Berlin und Technischen Universität Berlin.
          Die Motivation dieses Projektes ist es, die Arbeit von beispielsweise Linguist*innen und Psycholog*innen zu erleichtern, um Erkenntnisse über die in Gedichten verwendete Sprache zu erlangen.
          Das Ergebnis ist diese Webanwendung, die es ermöglicht auf die Gedichte des  “Gutenberg-Korpus” (des größten deutschsprachigen Gedichts-Korpus) zuzugreifen, diese nach bestimmten Kriterien zu filtern und weitere Texte hinzuzufügen.
        </Typography>
        <Typography className={classes.aboutText} paragraph={true}>
          Projektleiterin war Frau Dr. Jana Lüdtke, wissenschaftliche Mitarbeiterin im Fachgebiet Allgemeine und neurokognitive Psychologie an der Freien Universität Berlin. Assistiert hat Clarissa Elisabeth Staudt, Studentin der Medieninformatik an der TU und FU Berlin.
          Am Projekt mitgewirkt haben Anna-Liza Beriwan Tepe, Arne Kuhle, Flora Muscinelli, Fatih Tekin und Ioanna Vasiliou.
        </Typography>
        <Typography variant={'h5'} color={'primary'} className={classes.aboutText}>Datenschutzerklärung</Typography><br/>    
        <Typography className={classes.aboutText} paragraph={true}>
		<h3>1. Datenschutz auf einen Blick</h3>
			<h4>Allgemeine Hinweise</h4>
				Die folgenden Hinweise geben einen einfachen Überblick darüber, was mit Ihren 
				personenbezogenen Daten passiert, wenn Sie unsere Website besuchen. 
				Personenbezogene Daten sind alle Daten, mit denen Sie persönlich identifiziert 
				werden können. Ausführliche Informationen zum Thema Datenschutz entnehmen Sie 
				unserer unter diesem Text aufgeführten Datenschutzerklärung.
					
	</Typography>
        <Typography className={classes.aboutText}>
          Favicon made by {' '}<a href="https://www.freepik.com/" title="Freepik">Freepik</a>{' '}
          from <a href="https://www.flaticon.com/" title="Flaticon">www.flaticon.com</a> is licensed by{' '}
          <a href="http://creativecommons.org/licenses/by/3.0/" title="Creative Commons BY 3.0" target="_blank" rel="noopener noreferrer">CC 3.0 BY</a>
        </Typography>
      </div>
    );
  }
}

About.propTypes = {
  classes: PropTypes.object.isRequired,
};

const styles = theme => ({
  root:{
    margin: theme.spacing.unit * 4
  },
  aboutText:{
    minWidth: 500,
    maxWidth: 1000,
  }
});

export default withStyles(styles)(About);
