(function () {
  if (window._ukInitProjectDetail) return;
  window._ukInitProjectDetail = true;

  /* ── Navbar scroll ── */
  var nav = document.getElementById('uk-navbar');
  if (nav) {
    var ukNavScroll = function () {
      if (window.scrollY > 40) nav.classList.add('uk-scrolled');
      else nav.classList.remove('uk-scrolled');
    };
    window.addEventListener('scroll', ukNavScroll, { passive: true });
    ukNavScroll();
  }

  /* ── Mobile menu ── */
  window.ukToggleMenu = function () {
    var n = document.getElementById('uk-mobile-nav');
    if (n) n.classList.toggle('uk-open');
  };
  window.ukCloseMenu = function () {
    var n = document.getElementById('uk-mobile-nav');
    if (n) n.classList.remove('uk-open');
  };

  /* ── Smooth scroll (fall back to home for cross-page anchors) ── */
  window.ukSmoothTo = function (id, e) {
    if (e) e.preventDefault();
    var el = document.getElementById(id);
    if (el) el.scrollIntoView({ behavior: 'smooth', block: 'start' });
    else window.location.href = 'index.html#' + id;
  };

  /* ── Package tabs ── */
  window.ukPdSetPkg = function (key, btn) {
    document.querySelectorAll('.uk-pd-pkg-tab').forEach(function (b) {
      b.setAttribute('aria-selected', 'false');
    });
    document.querySelectorAll('.uk-pd-pkg-panel').forEach(function (p) {
      p.classList.remove('uk-active');
    });
    if (btn) btn.setAttribute('aria-selected', 'true');
    var panel = document.getElementById('uk-pd-pkg-' + key);
    if (panel) panel.classList.add('uk-active');
  };

  /* ── Accordion (полный состав комплектации) ── */
  window.ukPdToggleAcc = function (btn) {
    var acc = btn.closest('.uk-pd-acc');
    if (acc) acc.classList.toggle('uk-open');
  };

  /* ── Lightbox / gallery ── */
  var lbGallery = [];
  var lbIdx = 0;
  function lbRender() {
    var img = document.getElementById('uk-pd-lb-img');
    var cnt = document.getElementById('uk-pd-lb-counter');
    if (img && lbGallery[lbIdx]) img.src = lbGallery[lbIdx];
    if (cnt) cnt.textContent = (lbIdx + 1) + ' / ' + lbGallery.length;
  }
  window.ukOpenLightbox = function (idx) {
    var box = document.getElementById('uk-pd-lightbox');
    if (!box) return;
    try { lbGallery = JSON.parse(box.getAttribute('data-uk-gallery') || '[]'); }
    catch (err) { lbGallery = []; }
    lbIdx = idx || 0;
    lbRender();
    box.classList.add('uk-open');
    document.body.style.overflow = 'hidden';
  };
  window.ukCloseLightbox = function () {
    var box = document.getElementById('uk-pd-lightbox');
    if (box) box.classList.remove('uk-open');
    document.body.style.overflow = '';
  };
  window.ukLightboxPrev = function (e) {
    if (e) e.stopPropagation();
    if (!lbGallery.length) return;
    lbIdx = (lbIdx - 1 + lbGallery.length) % lbGallery.length;
    lbRender();
  };
  window.ukLightboxNext = function (e) {
    if (e) e.stopPropagation();
    if (!lbGallery.length) return;
    lbIdx = (lbIdx + 1) % lbGallery.length;
    lbRender();
  };
  var lb = document.getElementById('uk-pd-lightbox');
  if (lb) lb.addEventListener('click', function (e) { if (e.target === lb) window.ukCloseLightbox(); });

  /* ── Modal ── */
  window.ukOpenModal = function (comment) {
    var modal = document.getElementById('uk-modal');
    if (modal) { modal.style.display = 'flex'; document.body.style.overflow = 'hidden'; }
    if (comment) {
      var ta = document.getElementById('uk-modal-comment');
      if (ta && !ta.value) ta.value = comment;
    }
  };
  window.ukCloseModal = function () {
    var modal = document.getElementById('uk-modal');
    if (modal) { modal.style.display = 'none'; document.body.style.overflow = ''; }
  };
  var modal = document.getElementById('uk-modal');
  if (modal) modal.addEventListener('click', function (e) { if (e.target === modal) window.ukCloseModal(); });

  /* ── Modal form submit ── */
  window.ukSubmitModal = function (e) {
    e.preventDefault();
    var form = document.getElementById('uk-modal-form');
    var success = document.getElementById('uk-modal-success');
    if (form && success) { form.style.display = 'none'; success.style.display = 'block'; }
  };

  /* ── Keyboard ── */
  document.addEventListener('keydown', function (e) {
    var box = document.getElementById('uk-pd-lightbox');
    if (box && box.classList.contains('uk-open')) {
      if (e.key === 'Escape') window.ukCloseLightbox();
      else if (e.key === 'ArrowRight') window.ukLightboxNext();
      else if (e.key === 'ArrowLeft') window.ukLightboxPrev();
      return;
    }
    if (e.key === 'Escape') window.ukCloseModal();
  });
})();
