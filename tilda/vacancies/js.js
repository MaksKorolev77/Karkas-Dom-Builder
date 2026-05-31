(function () {
  if (window._ukInitVacancies) return;
  window._ukInitVacancies = true;

  /* Entrance animation for vacancy cards */
  if (!window.IntersectionObserver) return;

  var items = document.querySelectorAll('#uk-vacancies-page .uk-vacancy');
  items.forEach(function (el) {
    el.style.opacity = '0';
    el.style.transform = 'translateY(20px)';
    el.style.transition = 'opacity .4s ease, transform .4s ease';
  });

  var obs = new IntersectionObserver(function (entries) {
    entries.forEach(function (entry) {
      if (entry.isIntersecting) {
        entry.target.style.opacity = '1';
        entry.target.style.transform = 'none';
        obs.unobserve(entry.target);
      }
    });
  }, { threshold: 0.1 });

  items.forEach(function (el) { obs.observe(el); });
})();
