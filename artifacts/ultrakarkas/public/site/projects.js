(function () {
  if (window._ukInitProjects) return;
  window._ukInitProjects = true;

  window.ukProjOpenModal = function (comment) {
    var modal = document.getElementById('uk-proj-modal');
    if (modal) { modal.style.display = 'flex'; document.body.style.overflow = 'hidden'; }
    if (comment) {
      var ta = document.getElementById('uk-proj-comment');
      if (ta && !ta.value) ta.value = comment;
    }
  };
  window.ukProjCloseModal = function () {
    var modal = document.getElementById('uk-proj-modal');
    if (modal) { modal.style.display = 'none'; document.body.style.overflow = ''; }
  };
  window.ukProjSubmit = function (e) {
    e.preventDefault();
    var f = document.getElementById('uk-proj-form');
    var s = document.getElementById('uk-proj-success');
    if (f && s) { f.style.display = 'none'; s.style.display = 'block'; }
  };
  var modal = document.getElementById('uk-proj-modal');
  if (modal) modal.addEventListener('click', function (e) { if (e.target === modal) window.ukProjCloseModal(); });
  document.addEventListener('keydown', function (e) { if (e.key === 'Escape') window.ukProjCloseModal(); });
})();
