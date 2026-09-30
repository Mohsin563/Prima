var lang = 'it';
function applyLang(l) {
  lang = l;
  document.documentElement.lang = l;
  document.querySelectorAll('[data-it]').forEach(function (el) {
    var v = el.getAttribute('data-' + l);
    if (v !== null && v !== '') el.textContent = v;
  });
  document.getElementById('lb').textContent = l === 'it' ? 'EN' : 'IT';
}
document.getElementById('lb').addEventListener('click', function () {
  applyLang(lang === 'it' ? 'en' : 'it');
});
applyLang('it');

document.getElementById('form').addEventListener('submit', function (e) {
  e.preventDefault();
  var v = function (id) { return document.getElementById(id).value; };
  var text = 'Richiesta appuntamento - Prima Donna Hair Beauty\n' +
    'Nome: ' + v('name') + '\nServizio: ' + v('service') +
    '\nData: ' + (v('date') || 'da definire') + '\nNote: ' + v('msg');
  var status = document.getElementById('status');
  function call() { window.location.href = 'tel:+390622181648'; }
  function ok() {
    status.textContent = lang === 'it'
      ? 'Richiesta copiata. Chiamiamo il salone per confermare.'
      : 'Request copied. Calling the salon to confirm.';
    call();
  }
  function fail() {
    status.textContent = lang === 'it'
      ? 'Copia non riuscita. Chiama il salone per prenotare.'
      : 'Copy failed. Please call the salon to book.';
    call();
  }
  try { navigator.clipboard.writeText(text).then(ok, fail); } catch (err) { fail(); }
});
