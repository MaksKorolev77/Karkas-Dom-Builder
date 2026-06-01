(function () {
  if (window._ukInitVacancies) return;
  window._ukInitVacancies = true;

  window.ukVacOpenModal = function (position) {
    var modal = document.getElementById('uk-vac-modal');
    if (modal) { modal.style.display = 'flex'; document.body.style.overflow = 'hidden'; }
    if (position) {
      var inp = document.getElementById('uk-vac-position');
      if (inp) inp.value = position;
      var sub = document.getElementById('uk-vac-modal-subtitle');
      if (sub) sub.textContent = position + ' — оставьте заявку для собеседования.';
    }
  };
  window.ukVacCloseModal = function () {
    var modal = document.getElementById('uk-vac-modal');
    if (modal) { modal.style.display = 'none'; document.body.style.overflow = ''; }
  };
  window.ukVacSubmit = function (e) {
    e.preventDefault();
    var f = document.getElementById('uk-vac-form');
    var s = document.getElementById('uk-vac-success');
    if (f && s) { f.style.display = 'none'; s.style.display = 'block'; }
  };
  var modal = document.getElementById('uk-vac-modal');
  if (modal) modal.addEventListener('click', function (e) { if (e.target === modal) window.ukVacCloseModal(); });
  document.addEventListener('keydown', function (e) { if (e.key === 'Escape') window.ukVacCloseModal(); });
})();
