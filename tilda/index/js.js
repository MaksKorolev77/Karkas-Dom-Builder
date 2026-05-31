(function () {
  if (window._ukInitHome) return;
  window._ukInitHome = true;

  /* ── Hero bg parallax (subtle) ── */
  var heroBg = document.getElementById('uk-hero-bg');
  if (heroBg) {
    window.addEventListener('scroll', function () {
      var y = window.scrollY;
      heroBg.style.transform = 'scale(1.04) translateY(' + (y * 0.18) + 'px)';
    }, { passive: true });
  }

  /* ── Packages tab switcher ── */
  var tabs = document.querySelectorAll('.uk-pkg-tab');
  var panels = document.querySelectorAll('.uk-pkg-panel');

  function activateTab(targetId) {
    tabs.forEach(function (t) {
      var isActive = t.getAttribute('aria-controls') === targetId;
      t.setAttribute('aria-selected', isActive ? 'true' : 'false');
    });
    panels.forEach(function (p) {
      var isActive = p.id === targetId;
      p.setAttribute('aria-hidden', isActive ? 'false' : 'true');
    });
  }

  tabs.forEach(function (tab) {
    tab.addEventListener('click', function () {
      activateTab(tab.getAttribute('aria-controls'));
    });
  });

  /* Auto-select tab based on URL hash e.g. #packages-maximum */
  (function () {
    var hash = window.location.hash;
    if (hash && hash.indexOf('pkg-') > -1) {
      var id = hash.replace('#', '');
      var el = document.getElementById(id);
      if (el) activateTab(id);
    }
  })();

  /* ── FAQ accordion ── */
  var faqItems = document.querySelectorAll('[data-uk-faq]');
  faqItems.forEach(function (item) {
    var btn = item.querySelector('.uk-faq-btn');
    var answer = item.querySelector('.uk-faq-answer');
    if (!btn || !answer) return;
    btn.addEventListener('click', function () {
      var isOpen = btn.getAttribute('aria-expanded') === 'true';
      /* close all others */
      faqItems.forEach(function (other) {
        var ob = other.querySelector('.uk-faq-btn');
        var oa = other.querySelector('.uk-faq-answer');
        if (ob && oa) {
          ob.setAttribute('aria-expanded', 'false');
          oa.hidden = true;
          other.removeAttribute('open');
        }
      });
      if (!isOpen) {
        btn.setAttribute('aria-expanded', 'true');
        answer.hidden = false;
        item.setAttribute('open', '');
      }
    });
  });

  /* ── Lead form ── */
  var formSubmit = document.getElementById('uk-form-submit');
  var formSuccess = document.getElementById('uk-form-success');
  var formWrap = document.getElementById('uk-lead-form');

  if (formSubmit) {
    formSubmit.addEventListener('click', function () {
      var name = document.getElementById('uk-name');
      var phone = document.getElementById('uk-phone');
      var area = document.getElementById('uk-area');
      var consent = document.getElementById('uk-consent');

      /* minimal client-side validation */
      if (!name || !name.value.trim() || name.value.trim().length < 2) {
        name && name.focus();
        name && (name.style.borderColor = '#d32f2f');
        return;
      }
      if (!phone || !phone.value.trim() || phone.value.trim().length < 10) {
        phone && phone.focus();
        phone && (phone.style.borderColor = '#d32f2f');
        return;
      }
      if (!area || !area.value) {
        area && (area.style.borderColor = '#d32f2f');
        return;
      }
      if (consent && !consent.checked) {
        return;
      }

      /* collect */
      var data = {
        name: name ? name.value.trim() : '',
        phone: phone ? phone.value.trim() : '',
        area: area ? area.value : '',
        pkg: (document.getElementById('uk-pkg') || {}).value || '',
        comment: (document.getElementById('uk-comment') || {}).value || ''
      };

      /* send via fetch if backend available, else log */
      if (window.fetch) {
        fetch('/api/lead', {
          method: 'POST',
          headers: { 'Content-Type': 'application/json' },
          body: JSON.stringify(data)
        }).catch(function () { /* silent */ });
      }

      /* show success */
      if (formWrap && formSuccess) {
        var fields = formWrap.querySelectorAll('.uk-form-row, .uk-form-field, .uk-form-consent, #uk-form-submit');
        fields.forEach(function (f) { f.style.display = 'none'; });
        formSuccess.classList.remove('uk-hidden');
      }
    });

    /* reset red borders on input */
    ['uk-name', 'uk-phone', 'uk-area'].forEach(function (id) {
      var el = document.getElementById(id);
      if (el) el.addEventListener('input', function () { el.style.borderColor = ''; });
    });
  }

  /* ── Smooth anchor scroll ── */
  document.querySelectorAll('a[href^="#"]').forEach(function (a) {
    a.addEventListener('click', function (e) {
      var target = document.querySelector(a.getAttribute('href'));
      if (target) {
        e.preventDefault();
        var offset = 80;
        var top = target.getBoundingClientRect().top + window.scrollY - offset;
        window.scrollTo({ top: top, behavior: 'smooth' });
      }
    });
  });

})();
