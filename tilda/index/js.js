(function () {
  if (window._ukInitHome) return;
  window._ukInitHome = true;

  /* ── Navbar scroll ── */
  var nav = document.getElementById('uk-navbar');
  function ukNavScroll() {
    if (window.scrollY > 40) nav.classList.add('uk-scrolled');
    else nav.classList.remove('uk-scrolled');
  }
  window.addEventListener('scroll', ukNavScroll, { passive: true });
  ukNavScroll();

  /* ── Mobile menu ── */
  window.ukToggleMenu = function () {
    document.getElementById('uk-mobile-nav').classList.toggle('uk-open');
  };
  window.ukCloseMenu = function () {
    document.getElementById('uk-mobile-nav').classList.remove('uk-open');
  };

  /* ── Smooth scroll ── */
  window.ukSmoothTo = function (id, e) {
    if (e) e.preventDefault();
    var el = document.getElementById(id);
    if (el) el.scrollIntoView({ behavior: 'smooth', block: 'start' });
  };

  /* ── Package tabs ── */
  window.ukSetPkg = function (id, btn) {
    document.querySelectorAll('.uk-pkg-tab').forEach(function (b) {
      b.style.background = '';
      b.style.color = '';
      b.setAttribute('aria-selected', 'false');
    });
    document.querySelectorAll('.uk-pkg-panel').forEach(function (p) {
      p.classList.remove('uk-active');
    });
    if (btn) {
      btn.style.background = '#f57a00';
      btn.style.color = '#fff';
      btn.setAttribute('aria-selected', 'true');
    }
    var panel = document.getElementById('uk-pkg-' + id);
    if (panel) panel.classList.add('uk-active');
  };

  /* ── Comparison table toggle ── */
  window.ukToggleTable = function () {
    var tbl = document.getElementById('uk-pkg-table');
    var btn = document.getElementById('uk-show-table-btn');
    var chv = document.getElementById('uk-table-chevron');
    if (!tbl) return;
    var open = tbl.style.display !== 'none' && tbl.style.display !== '';
    tbl.style.display = open ? 'none' : 'block';
    if (btn) btn.firstChild.textContent = open ? 'Показать полную таблицу сравнения' : 'Скрыть подробное сравнение';
    if (chv) chv.style.transform = open ? '' : 'rotate(180deg)';
  };

  /* ── FAQ accordion ── */
  window.ukToggleFaq = function (btn) {
    var item = btn.closest('.uk-faq-item');
    if (!item) return;
    var wasOpen = item.classList.contains('uk-open');
    document.querySelectorAll('.uk-faq-item.uk-open').forEach(function (i) { i.classList.remove('uk-open'); });
    if (!wasOpen) item.classList.add('uk-open');
  };

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
  if (modal) modal.addEventListener('click', function (e) { if (e.target === modal) ukCloseModal(); });
  document.addEventListener('keydown', function (e) { if (e.key === 'Escape') ukCloseModal(); });

  /* ── Modal form submit ── */
  window.ukSubmitModal = function (e) {
    e.preventDefault();
    var form = document.getElementById('uk-modal-form');
    var success = document.getElementById('uk-modal-success');
    if (form && success) { form.style.display = 'none'; success.style.display = 'block'; }
  };

  /* ── Inline form submit ── */
  window.ukSubmitInlineForm = function (e) {
    e.preventDefault();
    var form = document.getElementById('uk-inline-form');
    var success = document.getElementById('uk-inline-success');
    if (form && success) { form.style.display = 'none'; success.style.display = 'block'; }
  };

  /* ── Calculator ── */
  var ukCalcPrices = { econom: 40000, optimum: 50000, max: 60000 };
  var ukCalcLabels = { econom: 'Эконом', optimum: 'Оптимум', max: 'Максимум' };
  var ukCalcState = { area: 100, pkg: 'optimum' };
  var ukCalcFmt = new Intl.NumberFormat('ru-RU');

  window.ukCalcUpdate = function () {
    var areaEl = document.getElementById('uk-calc-area');
    if (areaEl) ukCalcState.area = Number(areaEl.value);
    var rate = ukCalcPrices[ukCalcState.pkg];
    var price = ukCalcState.area * rate;
    var areaLabel = document.getElementById('uk-calc-area-label');
    var priceEl = document.getElementById('uk-calc-price');
    var rateEl = document.getElementById('uk-calc-rate');
    if (areaLabel) areaLabel.textContent = ukCalcState.area + ' м²';
    if (priceEl) priceEl.textContent = ukCalcFmt.format(price);
    if (rateEl) rateEl.textContent = ukCalcFmt.format(rate);
  };

  window.ukCalcSetPkg = function (pkg) {
    ukCalcState.pkg = pkg;
    document.querySelectorAll('.uk-calc-pkg').forEach(function (b) {
      b.classList.toggle('uk-active', b.getAttribute('data-pkg') === pkg);
    });
    window.ukCalcUpdate();
  };

  window.ukCalcSubmit = function () {
    var label = ukCalcLabels[ukCalcState.pkg];
    window.ukOpenModal('Интересует дом площадью ' + ukCalcState.area + ' м². Комплектация «' + label + '».');
  };

  window.ukCalcUpdate();

})();
