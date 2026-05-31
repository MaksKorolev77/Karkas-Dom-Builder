/*
  УльтраКаркас — блок «Контакты»
  Tilda Zero Block → вставить в поле JS

  Если блок монтируется несколько раз (SPA / Tilda-preview),
  флаг _ukInitContacts предотвращает повторную инициализацию.
*/
(function () {
  if (window._ukInitContacts) return;
  window._ukInitContacts = true;

  /* Animate contact rows on scroll */
  function animateRows() {
    var rows = document.querySelectorAll('.contacts-block .ci');
    if (!rows.length) return;

    if ('IntersectionObserver' in window) {
      var io = new IntersectionObserver(function (entries) {
        entries.forEach(function (entry) {
          if (entry.isIntersecting) {
            entry.target.classList.add('ci--visible');
            io.unobserve(entry.target);
          }
        });
      }, { threshold: 0.15 });

      rows.forEach(function (row, i) {
        row.style.opacity = '0';
        row.style.transform = 'translateX(-14px)';
        row.style.transition = 'opacity .4s ease ' + (i * 0.07) + 's, transform .4s ease ' + (i * 0.07) + 's';
        io.observe(row);
      });
    }
  }

  /* Apply visible state */
  document.addEventListener('animationframe', function () {});
  (function pollDOM() {
    var block = document.querySelector('.contacts-block');
    if (block) {
      animateRows();
    } else {
      setTimeout(pollDOM, 120);
    }
  })();

  /* CSS helper injected once */
  var styleId = 'uk-contacts-anim';
  if (!document.getElementById(styleId)) {
    var s = document.createElement('style');
    s.id = styleId;
    s.textContent = '.ci--visible{opacity:1!important;transform:none!important}';
    document.head.appendChild(s);
  }

})();
