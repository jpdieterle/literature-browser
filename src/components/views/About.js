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
          var datenschutzerklaerung=

	"<h1>Datenschutzerklärung</h1>"+

		"<h2>1. Datenschutz auf einen Blick</h2>"+

			"<h3>Allgemeine Hinweise</h3>"+
				"Die folgenden Hinweise geben einen einfachen Überblick darüber, was mit Ihren "+
				"personenbezogenen Daten passiert, wenn Sie unsere Website besuchen. "+
				"Personenbezogene Daten sind alle Daten, mit denen Sie persönlich identifiziert "+
				"werden können. Ausführliche Informationen zum Thema Datenschutz entnehmen Sie "+
				"unserer unter diesem Text aufgeführten Datenschutzerklärung."+

			"<h3>Datenerfassung auf unserer Website</h3>"+

				"<h4>Wer ist verantwortlich für die Datenerfassung auf dieser Website?</h4>"+
					"Die Datenverarbeitung auf dieser Website erfolgt durch den "+
					"Websitebetreiber. Dessen Kontaktdaten können Sie dem Impressum dieser "+
					"Website entnehmen."+

				"<h4>Wie erfassen wir Ihre Daten?</h4>"+
					"Ihre Daten werden zum einen dadurch erhoben, dass Sie uns diese "+
					"mitteilen. Hierbei kann es sich z.B.um Daten handeln, die Sie in ein "+
					"Kontaktformular eingeben.<br><br>Andere Daten werden automatisch beim "+
					"Besuch der Website durch unsere IT-Systeme erfasst. Das sind vor allem "+
					"technische Daten (z.B. Internetbrowser, Betriebssystem oder Uhrzeit "+
					"des Seitenaufrufs). Die Erfassung dieser Daten erfolgt automatisch, "+
					"sobald Sie unsere Website betreten."+

				"<h4>Wofür nutzen wir Ihre Daten?</h4>"+
					"Ein Teil der Daten wird erhoben, um eine fehlerfreie Bereitstellung "+
					"der Website zu gewährleisten.<br>Andere Daten können zur Analyse Ihres "+
					"Nutzerverhaltens verwendet werden."+

				"<h4>Welche Rechte haben Sie bezüglich Ihrer Daten?</h4>"+
					"Sie haben jederzeit das Recht unentgeltlich Auskunft über Herkunft, "+
					"Empfänger und Zweck Ihrer gespeicherten personenbezogenen Daten zu "+
					"erhalten. Sie haben außerdem ein Recht, die Berichtigung, Sperrung "+
					"oder Löschung dieser Daten zu verlangen. Hierzu sowie zu weiteren "+
					"Fragen zum Thema Datenschutz können Sie sich jederzeit unter der im "+
					"Impressum angegebenen Adresse an uns wenden. Des Weiteren steht Ihnen "+
					"ein Beschwerderecht bei der zuständigen Aufsichtsbehörde zu."+

				"<h4>Analyse-Tools und Tools von Drittanbietern</h4>"+
					"Beim Besuch unserer Website kann Ihr Surf-Verhalten statistisch "+
					"ausgewertet werden. Das geschieht vor allem mit Cookies und mit "+
					"sogenannten Analyseprogrammen. Die Analyse Ihres Surf-Verhaltens "+
					"erfolgt in der Regel anonym; das Surf-Verhalten kann nicht zu Ihnen "+
					"zurückverfolgt werden. Sie können dieser Analyse widersprechen oder "+
					"sie durch die Nichtbenutzung bestimmter Tools verhindern. Detaillierte "+
					"Informationen dazu finden Sie in der folgenden Datenschutzerklärung."+
					"<br><br>Sie können dieser Analyse widersprechen. Über die "+
					"Widerspruchsmöglichkeiten werden wir Sie in dieser Datenschutzerklärung "+
					"informieren."+

		"<h2>2. Allgemeine Hinweise und Pflichtinformationen</h2>"+

			"<h3>Datenschutz</h3>"+
				"Die Betreiber dieser Seiten nehmen den Schutz Ihrer persönlichen Daten sehr "+
				"ernst. Wir behandeln Ihre personenbezogenen Daten vertraulich und entsprechend "+
				"der gesetzlichen Datenschutzvorschriften sowie dieser Datenschutzerklärung."+
				"<br><br>Wenn Sie diese Website benutzen, werden verschiedene personenbezogene "+
				"Daten erhoben.Personenbezogene Daten sind Daten, mit denen Sie persönlich "+
				"identifiziert werden können. Die vorliegende Datenschutzerklärung erläutert, "+
				"welche Daten wir erheben und wofür wir sie nutzen. Sie erläutert auch, wie und "+
				"zu welchem Zweck das geschieht.<br><br>Wir weisen darauf hin, dass die "+
				"Datenübertragung im Internet (z.B. bei der Kommunikation per E-Mail) "+
				"Sicherheitslücken aufweisen kann. Ein lückenloser Schutz der Daten vor dem "+
				"Zugriff durch Dritte ist nicht möglich."+

			"<h3>Hinweis zur verantwortlichen Stelle</h3>"+
				"Die verantwortliche Stelle für die Datenverarbeitung auf dieser Website ist:"+
				"<br><br>Dr. Jana Lüdtke<br>Habelschwerdter Allee 45<br>14195 Berlin<br>eMail: "+
				"jana.luedtke@fu-berlin.de<br><br>Verantwortliche Stelle ist die natürliche oder "+
				"juristische Person, die allein oder gemeinsam mit anderen über die Zwecke und "+
				"Mittel der Verarbeitung von personenbezogenen Daten (z.B. Namen, E-Mail-"+
				"Adressen o. Ä.) entscheidet."+

			"<h3>Widerruf Ihrer Einwilligung zur Datenverarbeitung</h3>"+
				"Viele Datenverarbeitungsvorgänge sind nur mit Ihrer ausdrücklichen Einwilligung "+
				"möglich. Sie können eine bereits erteilte Einwilligung jederzeit widerrufen. "+
				"Dazu reicht eine formlose Mitteilung per E-Mail an uns. Die Rechtmäßigkeit der "+
				"bis zum Widerruf erfolgten Datenverarbeitung bleibt vom Widerruf unberührt."+

			"<h3>Beschwerderecht bei der zuständigen Aufsichtsbehörde</h3>"+
				"Im Falle datenschutzrechtlicher Verstöße steht dem Betroffenen ein "+
				"Beschwerderecht bei der zuständigen Aufsichtsbehörde zu. Zuständige "+
				"Aufsichtsbehörde in datenschutzrechtlichen Fragen ist der "+
				"Landesdatenschutzbeauftragte des Bundeslandes, in dem unser Unternehmen seinen "+
				"Sitz hat.Eine Liste der Datenschutzbeauftragten sowie deren Kontaktdaten können "+
				"folgendem Link entnommen werden: "+
				"<a href='https://www.bfdi.bund.de/DE/Infothek/Anschriften_Links/anschriften_"+
				"links- node.html'>https://www.bfdi.bund.de/DE/Infothek/Anschriften_Links/"+
				"anschriften_links- node.html</a>."+

			"<h3>Recht auf Datenübertragbarkeit</h3>"+
				"Sie haben das Recht, Daten, die wir auf Grundlage Ihrer Einwilligung oder in "+
				"Erfüllung eines Vertrags automatisiert verarbeiten, an sich oder an einen "+
				"Dritten in einem gängigen, maschinenlesbaren Format aushändigen zu lassen. "+
				"Sofern Sie die direkte Übertragung der Daten an einen anderen Verantwortlichen "+
				"verlangen, erfolgt dies nur, soweit es technisch machbar ist."+

			"<h3>SSL- bzw. TLS-Verschlüsselung</h3>"+
				"Diese Seite nutzt aus Sicherheitsgründen und zum Schutz der Übertragung "+
				"vertraulicher Inhalte, wie zum Beispiel Bestellungen oder Anfragen, die Sie an "+
				"uns als Seitenbetreiber senden, eine SSL-bzw. TLS-Verschlüsselung. Eine "+
				"verschlüsselte Verbindung erkennen Sie daran, dass die Adresszeile des Browsers "+
				"von “http://” auf “https://” wechselt und an dem Schloss-Symbol in Ihrer "+
				"Browserzeile.<br><br>Wenn die SSL- bzw. TLS-Verschlüsselung aktiviert ist, "+
				"können die Daten, die Sie an uns übermitteln, nicht von Dritten mitgelesen "+
				"werden."+

			"<h3>Auskunft, Sperrung, Löschung</h3>"+
				"Sie haben im Rahmen der geltenden gesetzlichen Bestimmungen jederzeit das Recht "+
				"auf unentgeltliche Auskunft über Ihre gespeicherten personenbezogenen Daten, "+
				"deren Herkunft und Empfänger und den Zweck der Datenverarbeitung und ggf. ein "+
				"Recht auf Berichtigung, Sperrung oder Löschung dieser Daten. Hierzu sowie zu "+
				"weiteren Fragen zum Thema personenbezogene Daten können Sie sich jederzeit "+
				"unter der im Impressum angegebenen Adresse an uns wenden."+

			"<h3>Widerspruch gegen Werbe-Mails</h3>"+
				"Der Nutzung von im Rahmen der Impressumspflicht veröffentlichten Kontaktdaten "+
				"zur Übersendung von nicht ausdrücklich angeforderter Werbung und "+
				"Informationsmaterialien wird hiermit widersprochen. Die Betreiber der Seiten "+
				"behalten sich ausdrücklich rechtliche Schritte im Falle der unverlangten "+
				"Zusendung von Werbeinformationen, etwa durch Spam-E-Mails, vor."+

		"<h2>3. Datenerfassung auf unserer Website</h2>"+

			"<h3>Cookies</h3>"+
				"Die Internetseiten verwenden teilweise so genannte Cookies. Cookies richten auf "+
				"Ihrem Rechner keinen Schaden an und enthalten keine Viren. Cookies dienen dazu, "+
				"unser Angebot nutzerfreundlicher, effektiver und sicherer zu machen. Cookies "+
				"sind kleine Textdateien, die auf Ihrem Rechner abgelegt werden und die Ihr "+
				"Browser speichert.<br><br>Die meisten der von uns verwendeten Cookies sind so "+
				"genannte “Session-Cookies”. Sie werden nach Ende Ihres Besuchs automatisch "+
				"gelöscht. Andere Cookies bleiben auf Ihrem Endgerät gespeichert bis Sie diese "+
				"löschen. Diese Cookies ermöglichen es uns, Ihren Browser beim nächsten Besuch "+
				"wiederzuerkennen.<br><br>Sie können Ihren Browser so einstellen, dass Sie über "+
				"das Setzen von Cookies informiert werden und Cookies nur im Einzelfall "+
				"erlauben, die Annahme von Cookies für bestimmte Fälle oder generell "+
				"ausschließen sowie das automatische Löschen der Cookies beim Schließen des "+
				"Browser aktivieren. Bei der Deaktivierung von Cookies kann die Funktionalität "+
				"dieser Website eingeschränkt sein.<br><br>Cookies, die zur Durchführung des "+
				"elektronischen Kommunikationsvorgangs oder zur Bereitstellung bestimmter, von "+
				"Ihnen erwünschter Funktionen (z.B. Warenkorbfunktion) erforderlich sind, werden "+
				"auf Grundlage von Art. 6 Abs. 1 lit. f DSGVO gespeichert. Der Websitebetreiber "+
				"hat ein berechtigtes Interesse an der Speicherung von Cookies zur technisch "+
				"fehlerfreien und optimierten Bereitstellung seiner Dienste. Soweit andere "+
				"Cookies (z.B. Cookies zur Analyse Ihres Surfverhaltens) gespeichert werden, "+
				"werden diese in dieser Datenschutzerklärung gesondert behandelt."+

			"<h3>Server-Log-Dateien</h3>"+
				"Der Provider der Seiten erhebt und speichert automatisch Informationen in so "+
				"genannten Server-Log-Dateien, die Ihr Browser automatisch an uns übermittelt. "+
				"Dies sind:"+
					"<ul>"+
						"<li>Browsertyp und Browserversion</li>"+
						"<li>verwendetes Betriebssystem</li>"+
						"<li>Referrer URL</li>"+
						"<li>Hostname des zugreifenden Rechners</li>"+
						"<li>Uhrzeit der Serveranfrage</li>"+
						"<li>IP-Adresse</li>"+
					"</ul>"+

				"Eine Zusammenführung dieser Daten mit anderen Datenquellen wird nicht "+
				"vorgenommen.<br><br>Grundlage für die Datenverarbeitung ist Art. 6 Abs. 1 lit. "+
				"f DSGVO, der die Verarbeitung von Daten zur Erfüllung eines Vertrags oder "+
				"vorvertraglicher Maßnahmen gestattet."+

			"<h3>Verarbeiten von Daten (Kunden- und Vertragsdaten)</h3>"+
				"Wir erheben, verarbeiten und nutzen personenbezogene Daten nur, soweit sie für "+
				"die Begründung, inhaltliche Ausgestaltung oder Änderung des Rechtsverhältnisses "+
				"erforderlich sind (Bestandsdaten). Dies erfolgt auf Grundlage von Art. 6 Abs. 1 "+
				"lit. b DSGVO, der die Verarbeitung von Daten zur Erfüllung eines Vertrags oder "+
				"vorvertraglicher Maßnahmen gestattet. Personenbezogene Daten über die "+
				"Inanspruchnahme unserer Internetseiten (Nutzungsdaten) erheben, verarbeiten und "+
				"nutzen wir nur, soweit dies erforderlich ist, um dem Nutzer die Inanspruchnahme "+
				"des Dienstes zu ermöglichen oder abzurechnen.<br><br>Die erhobenen Kundendaten "+
				"werden nach Abschluss des Auftrags oder Beendigung der Geschäftsbeziehung "+
				"gelöscht. Gesetzliche Aufbewahrungsfristen bleiben unberührt."+

			"<h3>Datenübermittlung bei Vertragsschluss für Dienstleistungen und digitale Inhalte</h3>"+
				"Wir übermitteln personenbezogene Daten an Dritte nur dann, wenn dies im Rahmen "+
				"der Vertragsabwicklung notwendig ist, etwa an das mit der Zahlungsabwicklung "+
				"beauftragte Kreditinstitut.<br><br>Eine weitergehende Übermittlung der Daten "+
				"erfolgt nicht bzw. nur dann, wenn Sie der Übermittlung ausdrücklich zugestimmt "+
				"haben. Eine Weitergabe Ihrer Daten an Dritte ohne ausdrückliche Einwilligung, "+
				"etwa zu Zwecken der Werbung, erfolgt nicht.<br><br>Grundlage für die "+
				"Datenverarbeitung ist Art. 6 Abs. 1 lit. b DSGVO, der die Verarbeitung von "+
				"Daten zur Erfüllung eines Vertrags oder vorvertraglicher Maßnahmen gestattet.";

var impressum=

	"<h1>Impressum</h1>"+

		"<h2>Angaben gemäß § 5 TMG</h2>"+
			"Freie Universität Berlin<br>Habelschwerdter Allee 45<br>14195 Berlin"+

			"<h3>Vertreten durch:</h3>"+
				"<a href='https://www.fu-berlin.de/einrichtungen/organe/praesidium/praesident/'>"+
				"Der Präsident</a>"+

		"<h2>Kontakt</h2>"+
			"Telefon: ++49 (0) 30 838 55193<br>Telefax: (030) 838 -4- 556 21<br>E-Mail: jana."+
			"luedtke@fu-berlin.de"+

		"<h2>Umsatzsteuer-ID</h2>"+
			"Umsatzsteuer-Identifikationsnummer gemäß §27 a Umsatzsteuergesetz: DE 811304768"+

		"<h2>Verantwortlich für den Inhalt nach § 55 Abs. 2 RStV</h2>"+
			"Dr. Jana Lüdtke<br><br>Wir sind nicht bereit oder verpflichtet, an Streitbeilegungs"+
			"verfahren vor einer Verbraucherschlichtungsstelle teilzunehmen."+

			"<h3>Haftung für Inhalte</h3>"+
				"Als Diensteanbieter sind wir gemäß § 7 Abs.1 TMG für eigene Inhalte auf diesen "+
				"Seiten nach den allgemeinen Gesetzen verantwortlich. Nach §§ 8 bis 10 TMG sind "+
				"wir als Diensteanbieter jedoch nicht verpflichtet, übermittelte oder "+
				"gespeicherte fremde Informationen zu überwachen oder nach Umständen zu forschen"+
				", die auf eine rechtswidrige Tätigkeit hinweisen.<br><br>Verpflichtungen zur "+
				"Entfernung oder Sperrung der Nutzung von Informationen nach den allgemeinen "+
				"Gesetzen bleiben hiervon unberührt. Eine diesbezügliche Haftung ist jedoch erst "+
				"ab dem Zeitpunkt der Kenntnis einer konkreten Rechtsverletzung möglich. Bei "+
				"Bekanntwerden von entsprechenden Rechtsverletzungen werden wir diese Inhalte "+
				"umgehend entfernen."+

			"<h3>Haftung für Links</h3>"+
				"Unser Angebot enthält Links zu externen Websites Dritter, auf deren Inhalte wir "+
				"keinen Einfluss haben. Deshalb können wir für diese fremden Inhalte auch keine "+
				"Gewähr übernehmen. Für die Inhalte der verlinkten Seiten ist stets der "+
				"jeweilige Anbieter oder Betreiber der Seiten verantwortlich. Die verlinkten "+
				"Seiten wurden zum Zeitpunkt der Verlinkung auf mögliche Rechtsverstöße überprüft"+
				". Rechtswidrige Inhalte waren zum Zeitpunkt der Verlinkung nicht erkennbar.<br>"+
				"<br>Eine permanente inhaltliche Kontrolle der verlinkten Seiten ist jedoch ohne "+
				"konkrete Anhaltspunkte einer Rechtsverletzung nicht zumutbar. Bei Bekanntwerden "+
				"von Rechtsverletzungen werden wir derartige Links umgehend entfernen."+

			"<h3>Urheberrecht</h3>"+
				"Die durch die Seitenbetreiber erstellten Inhalte und Werke auf diesen Seiten "+
				"unterliegen dem deutschen Urheberrecht. Die Vervielfältigung, Bearbeitung, "+
				"Verbreitung und jede Art der Verwertung außerhalb der Grenzen des Urheberrechtes"+
				" bedürfen der schriftlichen Zustimmung des jeweiligen Autors bzw. Erstellers. "+
				"Downloads und Kopien dieser Seite sind nur für den privaten, nicht kommerziellen"+
				" Gebrauch gestattet.<br><br>Soweit die Inhalte auf dieser Seite nicht vom "+
				"Betreiber erstellt wurden, werden die Urheberrechte Dritter beachtet. "+
				"Insbesondere werden Inhalte Dritter als solche gekennzeichnet. Sollten Sie "+
				"trotzdem auf eine Urheberrechtsverletzung aufmerksam werden, bitten wir um einen"+
				" entsprechenden Hinweis. Bei Bekanntwerden von Rechtsverletzungen werden wir "+
				"derartige Inhalte umgehend entfernen.<br><br>Quelle: <a href='https://www.e-"+
				"recht24.de'>https://www.e-recht24.de</a>";

document.write(datenschutzerklaerung + impressum)
        </Typography>
    
        <Typography variant={'h5'} color={'primary'} className={classes.aboutText}>Impressum</Typography><br/>    
        <Typography className={classes.aboutText} paragraph={true}>
          Impressum
Angaben gemäß § 5 TMG
  Freie Universität Berlin
  Habelschwerdter Allee 45
  14195 Berlin
  
Vertreten durch: Der Präsident
Kontakt
Telefon: ++49 (0) 30 838 55193
Telefax: (030) 838 -4- 556 21
E-Mail:
jana.luedtke@fu-berlin.de
Umsatzsteuer-ID
Umsatzsteuer-Identifikationsnummer gemäß §27 a Umsatzsteuergesetz: DE 811304768

Verantwortlich für den Inhalt nach § 55 Abs. 2 RStV
Dr. Jana Lüdtke

Wir sind nicht bereit oder verpflichtet, an Streitbeilegungsverfahren vor einer Verbraucherschlichtungsstelle teilzunehmen.

Haftung für Inhalte
Als Diensteanbieter sind wir gemäß § 7 Abs.1 TMG für eigene Inhalte auf diesen Seiten nach den allgemeinen Gesetzen verantwortlich. Nach §§ 8 bis 10 TMG sind wir als Diensteanbieter jedoch nicht verpflichtet, übermittelte oder gespeicherte fremde Informationen zu überwachen oder nach Umständen zu forschen, die auf eine rechtswidrige Tätigkeit hinweisen.

Verpflichtungen zur Entfernung oder Sperrung der Nutzung von Informationen nach den allgemeinen Gesetzen bleiben hiervon unberührt. Eine diesbezügliche Haftung ist jedoch erst ab dem Zeitpunkt der Kenntnis einer konkreten Rechtsverletzung möglich. Bei Bekanntwerden von entsprechendenRechtsverletzungen werden wir diese Inhalte umgehend entfernen.

Haftung für Links
Unser Angebot enthält Links zu externen Websites Dritter, auf deren Inhalte wir keinen Einfluss haben. Deshalb können wir für diese fremden Inhalte auch keine Gewähr übernehmen. Für die Inhalte der verlinkten Seiten ist stets der jeweilige Anbieter oder Betreiber der Seiten verantwortlich. Die verlinkten Seiten wurden zum Zeitpunkt der Verlinkung auf mögliche Rechtsverstöße überprüft. Rechtswidrige Inhalte waren zum Zeitpunkt der Verlinkung nicht erkennbar.

Eine permanente inhaltliche Kontrolle der verlinkten Seiten ist jedoch ohne konkrete Anhaltspunkte einer Rechtsverletzung nicht zumutbar. Bei Bekanntwerden von Rechtsverletzungen werden wir derartige Links umgehend entfernen.

Urheberrecht
Die durch die Seitenbetreiber erstellten Inhalte und Werke auf diesen Seiten unterliegen dem deutschen Urheberrecht. Die Vervielfältigung, Bearbeitung, Verbreitung und jede Art der Verwertung außerhalb der Grenzen des Urheberrechtes bedürfen der schriftlichen Zustimmung des jeweiligen Autors bzw. Erstellers. Downloads und Kopien dieser Seite sind nur für den privaten, nicht kommerziellen Gebrauch gestattet.

Soweit die Inhalte auf dieser Seite nicht vom Betreiber erstellt wurden, werden die Urheberrechte Dritter beachtet. Insbesondere werden Inhalte Dritter als solche gekennzeichnet. Sollten Sie trotzdem auf eine Urheberrechtsverletzung aufmerksam werden, bitten wir um einen entsprechenden Hinweis. Bei Bekanntwerden von Rechtsverletzungen werden wir derartige Inhalte umgehend entfernen.

Quelle: https://www.e-recht24.de
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
