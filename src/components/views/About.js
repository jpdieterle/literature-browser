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
	  <p>Ihre Daten werden zum einen dadurch erhoben, dass Sie uns diese mitteilen. Hierbei kann es sich z.B.um Daten handeln, die Sie in ein Kontaktformular eingeben.</p>
	  <p>Andere Daten werden automatisch beim Besuch der Website durch unsere IT-Systeme erfasst. Das sind vor allem technische Daten (z.B. Internetbrowser, Betriebssystem oder Uhrzeit des Seitenaufrufs). Die Erfassung dieser Daten erfolgt automatisch, sobald Sie unsere Website betreten.</p>
	  <h5>Wofür nutzen wir Ihre Daten?</h5>
	  Ein Teil der Daten wird erhoben, um eine fehlerfreie Bereitstellung der Website zu gewährleisten. Andere Daten können zur Analyse Ihres Nutzerverhaltens verwendet werden.
	  <h5>Welche Rechte haben Sie bezüglich Ihrer Daten?</h5>
	  Sie haben jederzeit das Recht unentgeltlich Auskunft über Herkunft, Empfänger und Zweck Ihrer gespeicherten personenbezogenen Daten zu erhalten. Sie haben außerdem ein Recht, die Berichtigung, Sperrung oder Löschung dieser Daten zu verlangen. Hierzu sowie zu weiteren Fragen zum Thema Datenschutz können Sie sich jederzeit unter der im Impressum angegebenen Adresse an uns wenden. Des Weiteren steht Ihnen ein Beschwerderecht bei der zuständigen Aufsichtsbehörde zu.
	  <h5>Analyse-Tools und Tools von Drittanbietern</h5>
	  <p>Beim Besuch unserer Website kann Ihr Surf-Verhalten statistisch ausgewertet werden. Das geschieht vor allem mit Cookies und mit sogenannten Analyseprogrammen. Die Analyse Ihres Surf-Verhaltens erfolgt in der Regel anonym; das Surf-Verhalten kann nicht zu Ihnen zurückverfolgt werden. Sie können dieser Analyse widersprechen oder sie durch die Nichtbenutzung bestimmter Tools verhindern. Detaillierte Informationen dazu finden Sie in der folgenden Datenschutzerklärung.</p>
	  <p>Sie können dieser Analyse widersprechen. Über die Widerspruchsmöglichkeiten werden wir Sie in dieser Datenschutzerklärung informieren.</p>
	  <h3>2. Allgemeine Hinweise und Pflichtinformationen</h3>
	  <h4>Datenschutz</h4>
	  <p>Die Betreiber dieser Seiten nehmen den Schutz Ihrer persönlichen Daten sehr ernst. Wir behandeln Ihre personenbezogenen Daten vertraulich und entsprechend der gesetzlichen Datenschutzvorschriften sowie dieser Datenschutzerklärung.</p>
	  <p>Wenn Sie diese Website benutzen, werden verschiedene personenbezogene Daten erhoben. Personenbezogene Daten sind Daten, mit denen Sie persönlich identifiziert werden können. Die vorliegende Datenschutzerklärung erläutert, welche Daten wir erheben und wofür wir sie nutzen. Sie erläutert auch, wie und zu welchem Zweck das geschieht.</p>
	  <p>Wir weisen darauf hin, dass die Datenübertragung im Internet (z.B. bei der Kommunikation per E-Mail) Sicherheitslücken aufweisen kann. Ein lückenloser Schutz der Daten vor dem Zugriff durch Dritte ist nicht möglich.</p>
	  <h4>Hinweis zur verantwortlichen Stelle</h4>
	  Die verantwortliche Stelle für die Datenverarbeitung auf dieser Website ist:
	  <p>Dr. Jana Lüdtke</p>
	  <p>Habelschwerdter Allee 45</p>
	  <p>14195 Berlin</p>
	  <p>eMail: jana.luedtke@fu-berlin.de</p>
	  <p>Verantwortliche Stelle ist die natürliche oder juristische Person, die allein oder gemeinsam mit anderen über die Zwecke und Mittel der Verarbeitung von personenbezogenen Daten (z.B. Namen, E-Mail-Adressen o. Ä.) entscheidet.</p>
	  <h4>Widerruf Ihrer Einwilligung zur Datenverarbeitung</h4>
	  Viele Datenverarbeitungsvorgänge sind nur mit Ihrer ausdrücklichen Einwilligung möglich. Sie können eine bereits erteilte Einwilligung jederzeit widerrufen. Dazu reicht eine formlose Mitteilung per E-Mail an uns. Die Rechtmäßigkeit der bis zum Widerruf erfolgten Datenverarbeitung bleibt vom Widerruf unberührt.
	  <h4>Beschwerderecht bei der zuständigen Aufsichtsbehörde</h4>
	  Im Falle datenschutzrechtlicher Verstöße steht dem Betroffenen ein Beschwerderecht bei der zuständigen Aufsichtsbehörde zu. Zuständige Aufsichtsbehörde in datenschutzrechtlichen Fragen ist der Landesdatenschutzbeauftragte des Bundeslandes, in dem unser Unternehmen seinen Sitz hat.Eine Liste der Datenschutzbeauftragten sowie deren Kontaktdaten können folgendem Link entnommen werden: <a href='https://www.bfdi.bund.de/DE/Infothek/Anschriften_Links/anschriften_links- node.html'>https://www.bfdi.bund.de/DE/Infothek/Anschriften_Links/anschriften_links- node.html</a>.
	  <h4>Recht auf Datenübertragbarkeit</h4>
	  Sie haben das Recht, Daten, die wir auf Grundlage Ihrer Einwilligung oder in Erfüllung eines Vertrags automatisiert verarbeiten, an sich oder an einen Dritten in einem gängigen, maschinenlesbaren Format aushändigen zu lassen. Sofern Sie die direkte Übertragung der Daten an einen anderen Verantwortlichen verlangen, erfolgt dies nur, soweit es technisch machbar ist.
	  <h4>SSL- bzw. TLS-Verschlüsselung</h4>
	  <p>Diese Seite nutzt aus Sicherheitsgründen und zum Schutz der Übertragung vertraulicher Inhalte, wie zum Beispiel Bestellungen oder Anfragen, die Sie an uns als Seitenbetreiber senden, eine SSL-bzw. TLS-Verschlüsselung. Eine verschlüsselte Verbindung erkennen Sie daran, dass die Adresszeile des Browsers von “http://” auf “https://” wechselt und an dem Schloss-Symbol in Ihrer Browserzeile.</p>
	  <p>Wenn die SSL- bzw. TLS-Verschlüsselung aktiviert ist, können die Daten, die Sie an uns übermitteln, nicht von Dritten mitgelesen werden.</p>
	  <h4>Auskunft, Sperrung, Löschung</h4>
	  Sie haben im Rahmen der geltenden gesetzlichen Bestimmungen jederzeit das Recht auf unentgeltliche Auskunft über Ihre gespeicherten personenbezogenen Daten, deren Herkunft und Empfänger und den Zweck der Datenverarbeitung und ggf. ein Recht auf Berichtigung, Sperrung oder Löschung dieser Daten. Hierzu sowie zu weiteren Fragen zum Thema personenbezogene Daten können Sie sich jederzeit unter der im Impressum angegebenen Adresse an uns wenden.
	  <h4>Widerspruch gegen Werbe-Mails</h4>
	  Der Nutzung von im Rahmen der Impressumspflicht veröffentlichten Kontaktdaten zur Übersendung von nicht ausdrücklich angeforderter Werbung und Informationsmaterialien wird hiermit widersprochen. Die Betreiber der Seiten behalten sich ausdrücklich rechtliche Schritte im Falle der unverlangten Zusendung von Werbeinformationen, etwa durch Spam-E-Mails, vor.
	  <h3>3. Datenerfassung auf unserer Website</h3>
	  <h4>Cookies</h4>
	  <p>Die Internetseiten verwenden teilweise so genannte Cookies. Cookies richten auf Ihrem Rechner keinen Schaden an und enthalten keine Viren. Cookies dienen dazu, unser Angebot nutzerfreundlicher, effektiver und sicherer zu machen. Cookies sind kleine Textdateien, die auf Ihrem Rechner abgelegt werden und die Ihr Browser speichert.</p>
	  <p>Die meisten der von uns verwendeten Cookies sind so genannte “Session-Cookies”. Sie werden nach Ende Ihres Besuchs automatisch gelöscht. Andere Cookies bleiben auf Ihrem Endgerät gespeichert bis Sie diese löschen. Diese Cookies ermöglichen es uns, Ihren Browser beim nächsten Besuch wiederzuerkennen.</p>
	  <p>Sie können Ihren Browser so einstellen, dass Sie über das Setzen von Cookies informiert werden und Cookies nur im Einzelfall erlauben, die Annahme von Cookies für bestimmte Fälle oder generell ausschließen sowie das automatische Löschen der Cookies beim Schließen des Browser aktivieren. Bei der Deaktivierung von Cookies kann die Funktionalität dieser Website eingeschränkt sein.</p>
	  <p>Cookies, die zur Durchführung des elektronischen Kommunikationsvorgangs oder zur Bereitstellung bestimmter, von Ihnen erwünschter Funktionen (z.B. Warenkorbfunktion) erforderlich sind, werden auf Grundlage von Art. 6 Abs. 1 lit. f DSGVO gespeichert. Der Websitebetreiber hat ein berechtigtes Interesse an der Speicherung von Cookies zur technisch fehlerfreien und optimierten Bereitstellung seiner Dienste. Soweit andere Cookies (z.B. Cookies zur Analyse Ihres Surfverhaltens) gespeichert werden, werden diese in dieser Datenschutzerklärung gesondert behandelt.</p>
	  <h4>Server-Log-Dateien</h4>
	  Der Provider der Seiten erhebt und speichert automatisch Informationen in so genannten Server-Log-Dateien, die Ihr Browser automatisch an uns übermittelt. Dies sind:
	  <ul>
	    <li>Browsertyp und Browserversion</li>
	    <li>verwendetes Betriebssystem</li>
	    <li>Referrer URL</li>
	    <li>Hostname des zugreifenden Rechners</li>
	    <li>Uhrzeit der Serveranfrage</li>
	    <li>IP-Adresse</li>
	  </ul>
	  <p>Eine Zusammenführung dieser Daten mit anderen Datenquellen wird nicht vorgenommen.</p>
	  <p>Grundlage für die Datenverarbeitung ist Art. 6 Abs. 1 lit. f DSGVO, der die Verarbeitung von Daten zur Erfüllung eines Vertrags oder vorvertraglicher Maßnahmen gestattet.</p>
	  <h4>Verarbeiten von Daten (Kunden- und Vertragsdaten)</h4>
	  <p>Wir erheben, verarbeiten und nutzen personenbezogene Daten nur, soweit sie für die Begründung, inhaltliche Ausgestaltung oder Änderung des Rechtsverhältnisses erforderlich sind (Bestandsdaten). Dies erfolgt auf Grundlage von Art. 6 Abs. 1 lit. b DSGVO, der die Verarbeitung von Daten zur Erfüllung eines Vertrags oder vorvertraglicher Maßnahmen gestattet. Personenbezogene Daten über die Inanspruchnahme unserer Internetseiten (Nutzungsdaten) erheben, verarbeiten und nutzen wir nur, soweit dies erforderlich ist, um dem Nutzer die Inanspruchnahme des Dienstes zu ermöglichen oder abzurechnen.</p>
	  <p>Die erhobenen Kundendaten werden nach Abschluss des Auftrags oder Beendigung der Geschäftsbeziehung gelöscht. Gesetzliche Aufbewahrungsfristen bleiben unberührt.</p>
	  <h4>Datenübermittlung bei Vertragsschluss für Dienstleistungen und digitale Inhalte</h4>
	  <p>Wir übermitteln personenbezogene Daten an Dritte nur dann, wenn dies im Rahmen der Vertragsabwicklung notwendig ist, etwa an das mit der Zahlungsabwicklung beauftragte Kreditinstitut.</p>
	  <p>Eine weitergehende Übermittlung der Daten erfolgt nicht bzw. nur dann, wenn Sie der Übermittlung ausdrücklich zugestimmt haben. Eine Weitergabe Ihrer Daten an Dritte ohne ausdrückliche Einwilligung, etwa zu Zwecken der Werbung, erfolgt nicht.</p>
	  <p>Grundlage für die Datenverarbeitung ist Art. 6 Abs. 1 lit. b DSGVO, der die Verarbeitung von Daten zur Erfüllung eines Vertrags oder vorvertraglicher Maßnahmen gestattet.</p>
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
