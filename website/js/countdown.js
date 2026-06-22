(function(){
  var nodes = document.querySelectorAll('.countdown');
  if (!nodes.length) return;
  function pad(n){ return n < 10 ? '0'+n : ''+n; }
  function set(cd, unit, val){ var el = cd.querySelector('[data-unit="'+unit+'"]'); if (el) el.textContent = val; }
  function update(){
    var now = Date.now();
    nodes.forEach(function(cd){
      var target = new Date(cd.getAttribute('data-deadline')).getTime();
      var diff = target - now;
      var grid = cd.querySelector('.cd-grid');
      var done = cd.querySelector('.cd-done');
      if (diff <= 0){
        if (grid) grid.hidden = true;
        if (done) done.hidden = false;
        return;
      }
      set(cd, 'days',    Math.floor(diff/86400000));
      set(cd, 'hours',   pad(Math.floor(diff%86400000/3600000)));
      set(cd, 'minutes', pad(Math.floor(diff%3600000/60000)));
      set(cd, 'seconds', pad(Math.floor(diff%60000/1000)));
    });
  }
  update();
  setInterval(update, 1000);
})();
