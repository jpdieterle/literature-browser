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
	<Typography variant={'h5'} color={'primary'} className={classes.aboutText}>Datenschutzerklärung</Typography>
        <Typography className={classes.aboutText} paragraph={true}>
          <h3>1. Datenschutz auf einen Blick</h3>
	  <h4>Allgemeine Hinweise</h4>
	  Die folgenden Hinweise geben einen einfachen Überblick darüber, was mit Ihren personenbezogenen Daten passiert, wenn Sie unsere Website besuchen. Personenbezogene Daten sind alle Daten, mit denen Sie persönlich identifiziert werden können. Ausführliche Informationen zum Thema Datenschutz entnehmen Sie unserer unter diesem Text aufgeführten Datenschutzerklärung.
	  <h4>Datenerfassung auf unserer Website</h4>
	  <h5>Wer ist verantwortlich für die Datenerfassung auf dieser Website?</h5>
	  Die Datenverarbeitung auf dieser Website erfolgt durch den Websitebetreiber. Dessen Kontaktdaten können Sie dem Impressum dieser Website entnehmen.
	  <h5>Wie erfassen wir Ihre Daten?</h5>
	  Ihre Daten werden zum einen dadurch erhoben, dass Sie uns diese mitteilen. Hierbei kann es sich z.B.um Daten handeln, die Sie in ein Kontaktformular eingeben.
	</Typography>
	<Typography className={classes.aboutText} paragraph={true}>
	  Andere Daten werden automatisch beim Besuch der Website durch unsere IT-Systeme erfasst. Das sind vor allem technische Daten (z.B. Internetbrowser, Betriebssystem oder Uhrzeit des Seitenaufrufs). Die Erfassung dieser Daten erfolgt automatisch, sobald Sie unsere Website betreten.
	  <h5>Wofür nutzen wir Ihre Daten?</h5>
	  Ein Teil der Daten wird erhoben, um eine fehlerfreie Bereitstellung der Website zu gewährleisten. Andere Daten können zur Analyse Ihres Nutzerverhaltens verwendet werden.
	  <h5>Welche Rechte haben Sie bezüglich Ihrer Daten?</h5>
	  Sie haben jederzeit das Recht unentgeltlich Auskunft über Herkunft, Empfänger und Zweck Ihrer gespeicherten personenbezogenen Daten zu erhalten. Sie haben außerdem ein Recht, die Berichtigung, Sperrung oder Löschung dieser Daten zu verlangen. Hierzu sowie zu weiteren Fragen zum Thema Datenschutz können Sie sich jederzeit unter der im Impressum angegebenen Adresse an uns wenden. Des Weiteren steht Ihnen ein Beschwerderecht bei der zuständigen Aufsichtsbehörde zu.
	  <h5>Analyse-Tools und Tools von Drittanbietern</h5>
	  Beim Besuch unserer Website kann Ihr Surf-Verhalten statistisch ausgewertet werden. Das geschieht vor allem mit Cookies und mit sogenannten Analyseprogrammen. Die Analyse Ihres Surf-Verhaltens erfolgt in der Regel anonym; das Surf-Verhalten kann nicht zu Ihnen zurückverfolgt werden. Sie können dieser Analyse widersprechen oder sie durch die Nichtbenutzung bestimmter Tools verhindern. Detaillierte Informationen dazu finden Sie in der folgenden Datenschutzerklärung.
	</Typography>
	<Typography className={classes.aboutText} paragraph={true}>
	  Sie können dieser Analyse widersprechen. Über die Widerspruchsmöglichkeiten werden wir Sie in dieser Datenschutzerklärung informieren.
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
