export const getErrorMessage = (message, statusCode, action) => {
  let msg = '';
  if(statusCode) {
    switch (statusCode) {
      // custom codes for login
      case 0: msg = ''; break;
      case 1: msg = action === 'login'? 'Sie sind mit diesem Benutzernamen nicht registriert.' : ''; break;
      case 2: msg = action === 'login'? 'Das eingegebene Passwort ist falsch.' : ''; break;
      case 3: msg = action === 'login'? 'Der Login hat nicht funktioniert.' : ''; break;

      // success (all HTTP status codes that start with 2)
      case (Math.floor(statusCode % 100) === 2):
        switch (action) {
          case 'addUser': msg = 'Nutzer erfolgreich hinzugefügt.'; break;
          case 'deleteUser': msg = 'Nutzer erfolgreich gelöscht.'; break;
          case 'changePassword': msg = 'Passwort erfolgreich geändert.'; break;
          case 'addText': msg = 'Text erfolgreich hinzugefügt.'; break;
          case 'startImport': msg = 'Import erfolgreich gestartet.'; break;
          case 'emptyCache': msg = 'Cache erfolgreich geleert'; break;
          default: msg = 'Die Aktion war erfolgreich.';
        } break;

      // some error cases (all other HTTP status codes)
      case 404:
        msg = 'Der Server konnte nicht gefunden werden.'; break;
      case 500: msg = 'Es ist ein Fehler auf dem Server aufgetreten.'; break;
      case 503: msg = 'Der Server ist im Moment nicht verfügbar. Bitte versuchen Sie es später noch einmal.'; break;
      case 550:
        switch (action) {
          case 'search': msg = 'Sie sind nicht berechtigt, diese Suche durchzuführen.'; break;
          case 'login': msg = 'Es gibt kein Nutzerkonto mit diesen Zugangsdaten.'; break;
          default: msg = 'Sie sind nicht berechtigt zum Durchführen dieser Aktion.'
        }
        break;

      // all other cases (that have not been handled)
      default:
        msg = `Es ist ein Fehler aufgetreten. Bitte versuchen Sie es erneut.`;
    }
  }
  msg = msg === ''? message : msg;
  return msg;
};