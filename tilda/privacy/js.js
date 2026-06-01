(function () {
  if (window._ukInitPrivacy) return;
  window._ukInitPrivacy = true;

  window.ukPrivOpenModal = function (comment) {
    var modal = document.getElementById('uk-priv-modal');
    if (modal) { modal.style.display = 'flex'; document.body.style.overflow = 'hidden'; }
    if (comment) {
      var ta = document.getElementById('uk-priv-comment');
      if (ta && !ta.value) ta.value = comment;
    }
  };
  window.ukPrivCloseModal = function () {
    var modal = document.getElementById('uk-priv-modal');
    if (modal) { modal.style.display = 'none'; document.body.style.overflow = ''; }
  };
  window.ukPrivSubmit = function (e) {
    e.preventDefault();
    var f = document.getElementById('uk-priv-form');
    var s = document.getElementById('uk-priv-success');
    if (f && s) { f.style.display = 'none'; s.style.display = 'block'; }
  };
  var modal = document.getElementById('uk-priv-modal');
  if (modal) modal.addEventListener('click', function (e) { if (e.target === modal) window.ukPrivCloseModal(); });
  document.addEventListener('keydown', function (e) { if (e.key === 'Escape') window.ukPrivCloseModal(); });
})();
