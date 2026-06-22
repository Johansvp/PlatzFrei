(function(){
  var forms = document.querySelectorAll('form.kontakt-form');
  forms.forEach(setupForm);

  function setupForm(form){
    var status = form.querySelector('.form-status');
    var submit = form.querySelector('.submit');

    form.addEventListener('submit', async function(e){
      e.preventDefault();
      clearErrors(form);
      setStatus(status, '', '');

      var data = collect(form);
      var errors = window.validateKontakt(data);
      if (errors.length){ showErrors(form, errors); return; }

      submit.disabled = true;
      setStatus(status, '', 'Wird gesendet …');
      try {
        var res = await fetch('https://api.web3forms.com/submit', { method:'POST', body:new FormData(form) });
        var json = await res.json();
        if (json.success){
          form.reset();
          setStatus(status, 'ok', 'Danke! Deine Nachricht wurde gesendet — wir melden uns.');
        } else {
          setStatus(status, 'err', 'Es gab ein Problem beim Senden. Bitte später erneut versuchen.');
        }
      } catch(err){
        setStatus(status, 'err', 'Netzwerkfehler. Bitte später erneut versuchen.');
      } finally {
        submit.disabled = false;
      }
    });
  }

  function collect(form){
    return {
      name: form.elements.name.value,
      email: form.elements.email.value,
      nachricht: form.elements.nachricht.value,
      datenschutz: form.elements.datenschutz.checked,
    };
  }
  function clearErrors(form){
    form.querySelectorAll('.has-error').forEach(function(el){ el.classList.remove('has-error'); });
    form.querySelectorAll('.err').forEach(function(el){ el.textContent = ''; });
  }
  function showErrors(form, errors){
    errors.forEach(function(item){
      var input = form.elements[item.field];
      if (!input) return;
      var wrap = input.closest('.field') || input.closest('.check');
      if (!wrap) return;
      wrap.classList.add('has-error');
      var err = wrap.querySelector('.err');
      if (err) err.textContent = item.message;
    });
  }
  function setStatus(el, cls, msg){ el.className = 'form-status ' + cls; el.textContent = msg; }
})();
