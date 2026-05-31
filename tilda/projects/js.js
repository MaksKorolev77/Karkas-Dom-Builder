(function () {
  if (window._ukInitProjects) return;
  window._ukInitProjects = true;

  /* Cards are plain <a> links — no extra JS needed for navigation.
     Intersection Observer for subtle entrance animation. */
  if (!window.IntersectionObserver) return;

  var cards = document.querySelectorAll('#uk-projects-page .uk-project-card');
  cards.forEach(function (card) {
    card.style.opacity = '0';
    card.style.transform = 'translateY(24px)';
    card.style.transition = 'opacity .45s ease, transform .45s ease';
  });

  var observer = new IntersectionObserver(function (entries) {
    entries.forEach(function (entry) {
      if (entry.isIntersecting) {
        entry.target.style.opacity = '1';
        entry.target.style.transform = 'none';
        observer.unobserve(entry.target);
      }
    });
  }, { threshold: 0.1 });

  cards.forEach(function (card) { observer.observe(card); });
})();
