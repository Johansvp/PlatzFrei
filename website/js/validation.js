// Reine Validierungsfunktion: gibt eine Liste von { field, message } zurück.
function validateKontakt(data){
  const errors = [];
  const isBlank = v => !v || String(v).trim() === '';
  const req = (key, label) => { if (isBlank(data[key])) errors.push({ field:key, message:`${label} ist ein Pflichtfeld.` }); };

  req('name', 'Name');
  req('email', 'E-Mail');
  req('nachricht', 'Nachricht');

  if (!isBlank(data.email) && !/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(String(data.email).trim())) {
    errors.push({ field:'email', message:'Bitte eine gültige E-Mail-Adresse eingeben.' });
  }
  if (!data.datenschutz) {
    errors.push({ field:'datenschutz', message:'Bitte die Datenschutzhinweise bestätigen.' });
  }
  return errors;
}

if (typeof module !== 'undefined' && module.exports) { module.exports = { validateKontakt }; }
if (typeof window !== 'undefined') { window.validateKontakt = validateKontakt; }
