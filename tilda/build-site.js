/* Assemble the Tilda fragments into a complete standalone static site.
   Output: artifacts/ultrakarkas/public/site/  (served at /site/) */
const fs = require('fs');
const path = require('path');

const ROOT = __dirname;                       // tilda/
const OUT = path.join(ROOT, '..', 'artifacts', 'ultrakarkas', 'public', 'site');

const read = (p) => fs.readFileSync(path.join(ROOT, p), 'utf8');

/* cache-busting token — changes every build so browsers never serve a stale
   custom.css / *.js after a rebuild or republish */
const VER = Date.now().toString(36);

fs.mkdirSync(OUT, { recursive: true });

/* ---- shared assets ---- */
fs.writeFileSync(path.join(OUT, 'custom.css'), read('custom.css'));
/* contacts.css (gold-standard, untouched at source) references generic tokens
   (--fg, --primary, …) that live in Tilda site settings. Map them to the
   shared --uk-* tokens here so the standalone page renders with correct colors. */
const contactsTokens = `:root{
  --fg: var(--uk-fg);
  --muted-fg: var(--uk-muted-fg);
  --border: var(--uk-border);
  --primary: var(--uk-primary);
  --primary-fg: #ffffff;
  --primary-bg-soft: var(--uk-primary-10);
  --shadow-lg: 0 10px 25px -5px rgba(0,0,0,.1), 0 8px 10px -6px rgba(0,0,0,.1);
}
`;
fs.writeFileSync(path.join(OUT, 'contacts.css'), contactsTokens + read('contacts/css.css'));
fs.copyFileSync(
  path.join(OUT, '..', 'favicon.svg'),
  path.join(OUT, 'favicon.svg')
);

/* ---- rewrite SPA-style links to static .html links ---- */
function rewriteLinks(html) {
  return html
    .replace(/href="\/#uk-/g, 'href="index.html#uk-')
    .replace(/href="\/project\/([^"]+)"/g, 'href="project-$1.html"')
    .replace(/href="\/projects"/g, 'href="projects.html"')
    .replace(/href="\/vacancies"/g, 'href="vacancies.html"')
    .replace(/href="\/privacy"/g, 'href="privacy.html"')
    .replace(/href="\/contacts"/g, 'href="contacts.html"')
    .replace(/href="\/"/g, 'href="index.html"');
}

function doc({ title, body, css = ['custom.css'], scripts = [] }) {
  const links = css.map((c) => `  <link rel="stylesheet" href="${c}?v=${VER}">`).join('\n');
  const scr = scripts.map((s) => `<script src="${s}?v=${VER}"></script>`).join('\n');
  return `<!DOCTYPE html>
<html lang="ru">
<head>
  <meta charset="UTF-8">
  <meta name="viewport" content="width=device-width, initial-scale=1.0">
  <link rel="icon" type="image/svg+xml" href="favicon.svg">
  <title>${title}</title>
${links}
</head>
<body>
${body}
${scr}
</body>
</html>
`;
}

/* ---- standard pages (already include wrapper + navbar + footer + modal) ---- */
const pages = [
  { slug: 'index', src: 'index', title: 'УльтраКаркас — Каркасные дома под ключ' },
  { slug: 'projects', src: 'projects', title: 'Проекты — УльтраКаркас' },
  { slug: 'vacancies', src: 'vacancies', title: 'Вакансии — УльтраКаркас' },
  { slug: 'privacy', src: 'privacy', title: 'Политика конфиденциальности — УльтраКаркас' },
];

for (const p of pages) {
  const body = rewriteLinks(read(`${p.src}/html.html`));
  const js = read(`${p.src}/js.js`);
  fs.writeFileSync(path.join(OUT, `${p.slug}.js`), js);
  fs.writeFileSync(
    path.join(OUT, `${p.slug}.html`),
    doc({ title: p.title, body, css: ['custom.css'], scripts: [`${p.slug}.js`] })
  );
}

/* ---- contacts page: reuse index navbar + footer + modal, inject the contacts block ---- */
const idx = read('index/html.html');
const between = (s, from, to) => {
  const a = s.indexOf(from);
  if (a === -1) throw new Error(`build-site: marker not found: ${from}`);
  let b = s.length;
  if (to) {
    b = s.indexOf(to);
    if (b === -1) throw new Error(`build-site: marker not found: ${to}`);
    if (b < a) throw new Error(`build-site: markers out of order: ${from} … ${to}`);
  }
  return s.slice(a, b);
};
const navbar = between(idx, '<!-- ══════════ NAVBAR', '<!-- ══════════ HERO')
  .replace('class="uk-navbar"', 'class="uk-navbar uk-inner"'); // solid white navbar on inner page
const footer = between(idx, '<!-- ══════════ FOOTER', '<!-- ══════════ MODAL');
const modalTail = idx.slice(idx.indexOf('<!-- ══════════ MODAL')); // includes trailing </div> closing .uk

const contactsBlock = read('contacts/html.html');
const contactsBody = rewriteLinks(
  `<div class="uk" id="uk-contacts">\n${navbar}\n<div class="uk-pt-nav">\n${contactsBlock}\n</div>\n${footer}\n${modalTail}`
);

/* combined JS: index helpers + contacts block JS + robust cross-page smooth-scroll override */
const robust = `
/* static-site override: home-section links fall back to navigating home */
window.ukSmoothTo = function (id, e) {
  var el = document.getElementById(id);
  if (e) e.preventDefault();
  if (el) { el.scrollIntoView({ behavior: 'smooth' }); }
  else { window.location.href = 'index.html#' + id; }
};
`;
const contactsJs = read('index/js.js') + '\n' + read('contacts/js.js') + '\n' + robust;
fs.writeFileSync(path.join(OUT, 'contacts.js'), contactsJs);
fs.writeFileSync(
  path.join(OUT, 'contacts.html'),
  doc({
    title: 'Контакты — УльтраКаркас',
    body: contactsBody,
    css: ['custom.css', 'contacts.css'],
    scripts: ['contacts.js'],
  })
);

/* ---- project detail pages (faithful copy of ProjectDetail.tsx) ---- */
const { projects: pdProjects, packageSpecs: pdSpecs } = require('./project/data.js');

/* Lucide icon path-data reused from existing tilda sections */
const PD_ICONS = {
  maximize: '<path d="M8 3H5a2 2 0 0 0-2 2v3"/><path d="M21 8V5a2 2 0 0 0-2-2h-3"/><path d="M3 16v3a2 2 0 0 0 2 2h3"/><path d="M16 21h3a2 2 0 0 0 2-2v-3"/>',
  bed: '<path d="M2 4v16"/><path d="M2 8h18a2 2 0 0 1 2 2v10"/><path d="M2 17h20"/><path d="M6 8v9"/>',
  bath: '<path d="M9 6 6.5 3.5a1.5 1.5 0 0 0-1-.5C4.683 3 4 3.683 4 4.5V17a2 2 0 0 0 2 2h12a2 2 0 0 0 2-2v-5"/><line x1="10" y1="5" x2="8" y2="7"/><line x1="2" y1="12" x2="22" y2="12"/>',
  check: '<path d="M22 11.08V12a10 10 0 1 1-5.93-9.14"/><polyline points="22 4 12 14.01 9 11.01"/>',
  chevronRight: '<path d="m9 18 6-6-6-6"/>',
  chevronDown: '<polyline points="6 9 12 15 18 9"/>',
  phone: '<path d="M22 16.92v3a2 2 0 0 1-2.18 2 19.79 19.79 0 0 1-8.63-3.07A19.5 19.5 0 0 1 4.69 13 19.79 19.79 0 0 1 1.61 4.37 2 2 0 0 1 3.59 2.22h3a2 2 0 0 1 2 1.72 12.84 12.84 0 0 0 .7 2.81 2 2 0 0 1-.45 2.11L8.09 9.91a16 16 0 0 0 6 6l1.27-1.27a2 2 0 0 1 2.11-.45 12.84 12.84 0 0 0 2.81.7A2 2 0 0 1 22 16.92z"/>',
  gift: '<polyline points="20 12 20 22 4 22 4 12"/><rect x="2" y="7" width="20" height="5"/><line x1="12" y1="22" x2="12" y2="7"/><path d="M12 7H7.5a2.5 2.5 0 0 1 0-5C11 2 12 7 12 7z"/><path d="M12 7h4.5a2.5 2.5 0 0 0 0-5C13 2 12 7 12 7z"/>',
  arrowRight: '<path d="M5 12h14"/><path d="m12 5 7 7-7 7"/>',
  hammer: '<path d="m15 12-8.5 8.5c-.83.83-2.17.83-3 0 0 0 0 0 0 0a2.12 2.12 0 0 1 0-3L12 9"/><path d="M17.64 15 22 10.64"/><path d="m20.91 11.7-1.25-1.25c-.6-.6-.93-1.4-.93-2.25v-.86L16.01 4.6a5.56 5.56 0 0 0-3.94-1.64H9l.92.82A6.18 6.18 0 0 1 12 8.4v1.56l2 2h2.47l2.26 1.91"/>',
  shield: '<path d="M12 22s8-4 8-10V5l-8-3-8 3v7c0 6 8 10 8 10z"/>',
  thermometerSun: '<path d="M12 9a4 4 0 0 0-2 7.5"/><path d="M12 3v2"/><path d="m6.6 18.4-1.4 1.4"/><path d="M20 4v10.54a4 4 0 1 1-4 0V4a2 2 0 0 1 4 0Z"/><path d="M4 13H2"/><path d="M6.34 7.34 4.93 5.93"/>',
};
const pdSvg = (paths, attrs) =>
  `<svg viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"${attrs ? ' ' + attrs : ''}>${paths}</svg>`;

function buildProjectDetail(project) {
  const others = pdProjects.filter((p) => p.slug !== project.slug).slice(0, 3);

  /* group rooms by floor preserving order */
  const floorGroups = [];
  project.rooms.forEach((r) => {
    const f = r.floor || '';
    let g = floorGroups.find((x) => x.floor === f);
    if (!g) { g = { floor: f, rooms: [] }; floorGroups.push(g); }
    g.rooms.push(r);
  });

  const gallery = project.gallery;
  const galleryJson = JSON.stringify(gallery).replace(/"/g, '&quot;');

  const thumbs = gallery.slice(0, 5).map((src, i) => {
    const more = i === 4 && gallery.length > 5
      ? `<div class="uk-pd-thumb-more">+${gallery.length - 5}</div>` : '';
    return `<button class="uk-pd-thumb" onclick="ukOpenLightbox(${i})"><img src="${src}" alt="фото ${i + 1}" loading="lazy">${more}</button>`;
  }).join('\n            ');

  const features = project.features.map((f) =>
    `<li>${pdSvg(PD_ICONS.check)}<span>${f}</span></li>`
  ).join('\n            ');

  const trustItems = [
    { icon: PD_ICONS.hammer, label: 'Прочный несущий каркас' },
    { icon: PD_ICONS.shield, label: '10 лет гарантии' },
    { icon: PD_ICONS.thermometerSun, label: 'Энергосберегающий дом' },
    { icon: PD_ICONS.check, label: 'Контроль качества на каждом этапе' },
  ].map((t) =>
    `<div class="uk-pd-trust__item"><div class="uk-pd-trust__icon">${pdSvg(t.icon)}</div><span class="uk-pd-trust__label">${t.label}</span></div>`
  ).join('\n            ');

  /* packages tabs */
  const tabs = project.packages.map((p) =>
    `<button class="uk-pd-pkg-tab" aria-selected="${p.key === 'optimum' ? 'true' : 'false'}" onclick="ukPdSetPkg('${p.key}', this)"><span class="uk-pd-pkg-tab__name">${p.name}</span><span class="uk-pd-pkg-tab__price">${p.price}</span></button>`
  ).join('\n              ');

  const specRows = pdSpecs.map((row) => {
    if ('section' in row && row.section) {
      return `<div class="uk-pd-spec-section">${row.section}</div>`;
    }
    return null;
  });

  const panels = project.packages.map((p) => {
    const pkgWord = p.key === 'econom' ? 'эконом' : p.key === 'optimum' ? 'оптимум' : 'максимум';
    const rows = pdSpecs.map((row) => {
      if ('section' in row && row.section) {
        return `<div class="uk-pd-spec-section">${row.section}</div>`;
      }
      const value = row[p.key];
      return `<div class="uk-pd-spec-row"><div class="uk-pd-spec-row__label">${row.label}</div><div class="uk-pd-spec-row__val">${value}</div></div>`;
    }).join('\n                  ');
    const orderComment = `Проект «${project.name}» (${project.area} м²), комплектация ${p.name}.`;
    return `<div class="uk-pd-pkg-panel${p.key === 'optimum' ? ' uk-active' : ''}" id="uk-pd-pkg-${p.key}">
              <div class="uk-pd-pkg-card">
                <div class="uk-pd-pkg-head">
                  <div>
                    <div class="uk-pd-pkg-name">${p.name}</div>
                    <div class="uk-pd-pkg-tagline">${p.tagline}</div>
                  </div>
                  <div class="uk-pd-pkg-price">${p.price}</div>
                </div>
                <div class="uk-pd-acc uk-open">
                  <button class="uk-pd-acc-trigger" onclick="ukPdToggleAcc(this)">Полный состав комплектации ${pdSvg(PD_ICONS.chevronDown)}</button>
                  <div class="uk-pd-acc-content">
                    <div class="uk-pd-acc-list">
                  ${rows}
                    </div>
                    <div class="uk-pd-acc-note">Разводка электрики, водоснабжения, отопления и канализации рассчитывается индивидуально.</div>
                  </div>
                </div>
                <div class="uk-pd-pkg-actions">
                  <button class="uk-btn uk-btn--primary uk-btn--lg" onclick="ukOpenModal('${orderComment}')">Заказать «${project.name}» в комплектации ${p.name}</button>
                </div>
              </div>
            </div>`;
  }).join('\n            ');

  /* characteristics */
  const chars = project.characteristics.map((c) =>
    `<div class="uk-pd-char__row"><dt class="uk-pd-char__label">${c.label}</dt><dd class="uk-pd-char__val">${c.value}</dd></div>`
  ).join('\n              ');

  /* rooms grouped by floor */
  const roomsHtml = floorGroups.map((g) => {
    const floorLabel = g.floor ? `<div class="uk-pd-rooms__floor">${g.floor}</div>` : '';
    const cards = g.rooms.map((r) =>
      `<div class="uk-pd-room"><div class="uk-pd-room__name">${r.name}</div><div class="uk-pd-room__area">${r.area}</div></div>`
    ).join('\n                ');
    return `<div>${floorLabel}
              <div class="uk-pd-rooms__grid">
                ${cards}
              </div>
            </div>`;
  }).join('\n            ');

  /* other projects */
  const otherCards = others.map((p) =>
    `<a href="/project/${p.slug}" class="uk-pd-other-card">
              <div class="uk-pd-other-card__img"><img src="${p.cover}" alt="${p.name}" loading="lazy"></div>
              <div class="uk-pd-other-card__body">
                <div class="uk-pd-other-card__price">${p.priceFrom}</div>
                <h3 class="uk-pd-other-card__name">Проект «${p.name}»</h3>
                <div class="uk-pd-other-card__specs"><span>${p.area} м²</span><span>${p.bedrooms} спал.</span><span>${p.bathrooms} санузл.</span></div>
              </div>
            </a>`
  ).join('\n            ');

  const calcComment = `Интересует проект «${project.name}» (${project.area} м²).`;

  return `<!-- ══════════ BREADCRUMB ══════════ -->
<div class="uk-pt-nav uk-wrap">
  <nav class="uk-breadcrumb" aria-label="Breadcrumb">
    <a href="/">Главная</a>
    ${pdSvg(PD_ICONS.chevronRight)}
    <a href="/projects">Проекты</a>
    ${pdSvg(PD_ICONS.chevronRight)}
    <span style="color:var(--uk-fg)">Проект «${project.name}»</span>
  </nav>
</div>

<!-- ══════════ HEADER + GALLERY ══════════ -->
<section class="uk-wrap uk-section">
  <div class="uk-pd-top">
    <div>
      <button class="uk-pd-main-img" onclick="ukOpenLightbox(0)">
        <img src="${gallery[0]}" alt="Проект «${project.name}» — фото 1">
        <div class="uk-pd-img-badge">${project.style} · ${project.floors}</div>
        <div class="uk-pd-img-open">Открыть фото</div>
      </button>
      <div class="uk-pd-thumbs">
            ${thumbs}
      </div>
    </div>
    <div>
      <div class="uk-pd-price">${project.priceFrom}</div>
      <h1 class="uk-pd-title">Проект «${project.name}»</h1>
      <div class="uk-pd-specs">
        <div class="uk-pd-spec">${pdSvg(PD_ICONS.maximize)}<span class="uk-pd-spec__val">${project.area}</span><span class="uk-pd-spec__label">м²</span></div>
        <div class="uk-pd-spec">${pdSvg(PD_ICONS.bed)}<span class="uk-pd-spec__val">${project.bedrooms}</span><span class="uk-pd-spec__label">спальни</span></div>
        <div class="uk-pd-spec">${pdSvg(PD_ICONS.bath)}<span class="uk-pd-spec__val">${project.bathrooms}</span><span class="uk-pd-spec__label">санузел</span></div>
      </div>
      <p class="uk-pd-desc">${project.description}</p>
      <ul class="uk-pd-features">
            ${features}
      </ul>
      <div class="uk-pd-cta-row">
        <button class="uk-btn uk-btn--primary uk-pd-cta-btn--main" onclick="ukOpenModal('${calcComment}')">Получить расчёт проекта</button>
        <a href="tel:+74993909789" class="uk-btn uk-btn--outline" style="width:100%">${pdSvg(PD_ICONS.phone, 'width="16" height="16"')}Позвонить</a>
      </div>
      <div class="uk-pd-gift">
        ${pdSvg(PD_ICONS.gift)}
        <div>
          <div class="uk-pd-gift__title">При заключении договора — проект в подарок!</div>
          <div class="uk-pd-gift__sub">Заключите договор на основные работы и получите проект бесплатно.</div>
        </div>
      </div>
    </div>
  </div>

  <div class="uk-pd-trust">
            ${trustItems}
  </div>
</section>

<!-- ══════════ PACKAGES ══════════ -->
<section class="uk-section uk-section--muted">
  <div class="uk-wrap">
    <div class="uk-section-header">
      <span class="uk-eyebrow">Комплектации</span>
      <h2 class="uk-h2">Выберите комплектацию</h2>
      <p class="uk-lead" style="margin-top:1rem">Нажмите на нужную комплектацию — ниже откроется подробный состав.</p>
    </div>
    <div class="uk-pd-pkg-wrap">
      <div class="uk-pd-pkg-tabs">
              ${tabs}
      </div>
            ${panels}
    </div>
  </div>
</section>

<!-- ══════════ CHARACTERISTICS + ROOMS ══════════ -->
<section class="uk-wrap uk-section">
  <div class="uk-pd-info">
    <div>
      <h2 class="uk-pd-info__h2">Характеристики</h2>
      <dl class="uk-pd-char">
              ${chars}
      </dl>
    </div>
    <div>
      <h2 class="uk-pd-info__h2">Состав помещений</h2>
      <div class="uk-pd-rooms">
            ${roomsHtml}
      </div>
    </div>
  </div>
</section>

<!-- ══════════ OTHER PROJECTS ══════════ -->
<section class="uk-section uk-section--muted">
  <div class="uk-wrap">
    <h2 class="uk-pd-other__h2">Другие дома</h2>
    <div class="uk-pd-other-grid">
            ${otherCards}
    </div>
    <div class="uk-pd-other-all">
      <a href="/projects" class="uk-btn uk-btn--outline">Все проекты ${pdSvg(PD_ICONS.arrowRight, 'width="16" height="16"')}</a>
    </div>
  </div>
</section>

<!-- ══════════ LIGHTBOX ══════════ -->
<div class="uk-pd-lightbox" id="uk-pd-lightbox" data-uk-gallery="${galleryJson}">
  <button class="uk-pd-lb-close" onclick="ukCloseLightbox()" aria-label="Закрыть">${pdSvg('<line x1="18" y1="6" x2="6" y2="18"/><line x1="6" y1="6" x2="18" y2="18"/>')}</button>
  <button class="uk-pd-lb-nav uk-pd-lb-prev" onclick="ukLightboxPrev(event)" aria-label="Предыдущее">‹</button>
  <img class="uk-pd-lb-img" id="uk-pd-lb-img" src="${gallery[0]}" alt="Проект «${project.name}»">
  <button class="uk-pd-lb-nav uk-pd-lb-next" onclick="ukLightboxNext(event)" aria-label="Следующее">›</button>
  <div class="uk-pd-lb-counter" id="uk-pd-lb-counter">1 / ${gallery.length}</div>
</div>
`;
}

/* write the shared project detail JS once */
fs.writeFileSync(path.join(OUT, 'project.js'), read('project/js.js'));

for (const project of pdProjects) {
  const content = buildProjectDetail(project);
  const body = rewriteLinks(
    `<div class="uk" id="uk-project">\n${navbar}\n${content}\n${footer}\n${modalTail}`
  );
  fs.writeFileSync(
    path.join(OUT, `project-${project.slug}.html`),
    doc({
      title: `Проект «${project.name}» — ${project.area} м² — УльтраКаркас`,
      body,
      css: ['custom.css'],
      scripts: ['project.js'],
    })
  );
}

console.log('Built static site →', path.relative(path.join(ROOT, '..'), OUT));
console.log('Files:', fs.readdirSync(OUT).join(', '));
