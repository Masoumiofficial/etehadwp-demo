(function () {
  'use strict';

  const config = window.ETEHAAD_CONFIG;
  if (!config) return;

  const demosGrid = document.getElementById('demos-grid');
  const filterContainer = document.getElementById('filter-pills');
  const searchInput = document.getElementById('demo-search-input');
  const searchClearBtn = document.getElementById('search-clear-btn');
  const resultsCountEl = document.getElementById('results-count');
  const emptyStateEl = document.getElementById('demos-empty-state');
  const emptyStateTitleEl = document.getElementById('empty-state-title');
  const resetFiltersBtn = document.getElementById('reset-filters-btn');

  let activeCategory = 'all';
  let searchQuery = '';

  function normalizePersian(str) {
    return (str || '')
      .toString()
      .trim()
      .toLowerCase()
      .replace(/ي/g, 'ی')
      .replace(/ك/g, 'ک')
      .replace(/[\u200c\u200f]/g, ' ')
      .replace(/\s+/g, ' ');
  }

  function escapeHtml(text) {
    const div = document.createElement('div');
    div.textContent = text;
    return div.innerHTML;
  }

  function getCategoryCount(categoryId) {
    if (categoryId === 'all') return config.demos.length;
    return config.demos.filter(function (demo) {
      return demo.category === categoryId;
    }).length;
  }

  function renderFilterPills() {
    if (!filterContainer) return;

    filterContainer.innerHTML = config.categories
      .map(function (cat) {
        const count = getCategoryCount(cat.id);
        const activeClass = cat.id === activeCategory ? ' is-active' : '';
        const pressed = cat.id === activeCategory ? 'true' : 'false';
        return (
          '<button type="button" class="filter-pill' +
          activeClass +
          '" data-category="' +
          escapeHtml(cat.id) +
          '" aria-pressed="' +
          pressed +
          '">' +
          '<span>' +
          escapeHtml(cat.label) +
          '</span>' +
          '<span class="filter-pill-count">' +
          count +
          '</span>' +
          '</button>'
        );
      })
      .join('');

    filterContainer.querySelectorAll('.filter-pill').forEach(function (btn) {
      btn.addEventListener('click', function () {
        activeCategory = btn.getAttribute('data-category') || 'all';
        updateFilterButtons();
        renderDemos();
      });
    });
  }

  function updateFilterButtons() {
    if (!filterContainer) return;
    filterContainer.querySelectorAll('.filter-pill').forEach(function (btn) {
      const isActive = btn.getAttribute('data-category') === activeCategory;
      btn.classList.toggle('is-active', isActive);
      btn.setAttribute('aria-pressed', isActive ? 'true' : 'false');
    });
  }

  function filterDemos() {
    const normalizedQuery = normalizePersian(searchQuery);

    return config.demos.filter(function (demo) {
      const matchesCategory = activeCategory === 'all' || demo.category === activeCategory;
      if (!matchesCategory) return false;
      if (!normalizedQuery) return true;

      const searchable = normalizePersian(
        [demo.title, demo.categoryLabel, demo.description].concat(demo.keywords || []).join(' ')
      );
      return searchable.indexOf(normalizedQuery) !== -1;
    });
  }

  function createDemoCardHtml(demo) {
    const featuresHtml = (demo.features || [])
      .slice(0, 4)
      .map(function (feature) {
        return (
          '<li>' +
          '<svg viewBox="0 0 20 20" fill="none" aria-hidden="true">' +
          '<path d="M16.25 5.625L8.125 13.75L4.375 10" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"/>' +
          '</svg>' +
          '<span>' +
          escapeHtml(feature) +
          '</span>' +
          '</li>'
        );
      })
      .join('');

    return (
      '<article class="demo-card" data-demo-id="' +
      escapeHtml(demo.id) +
      '">' +
      '<div class="demo-thumb-wrap">' +
      '<img class="demo-thumb-img" src="' +
      escapeHtml(demo.image) +
      '" data-fallback="' +
      escapeHtml(demo.fallbackImage) +
      '" alt="پیش‌نمایش ' +
      escapeHtml(demo.title) +
      '" width="800" height="500" loading="lazy" decoding="async" />' +
      '<div class="demo-thumb-overlay" aria-hidden="true"></div>' +
      '<div class="demo-thumb-badges">' +
      '<span class="demo-cat-badge">' +
      escapeHtml(demo.categoryLabel) +
      '</span>' +
      (demo.badge ? '<span class="demo-tag-badge">' + escapeHtml(demo.badge) + '</span>' : '') +
      '</div>' +
      '<a class="demo-device-hint" href="' +
      escapeHtml(demo.demoPath) +
      '" target="_blank" rel="noopener noreferrer" aria-label="باز کردن مستقیم ' +
      escapeHtml(demo.title) +
      ' در تب جدید">' +
      '<svg width="14" height="14" viewBox="0 0 20 20" fill="none" aria-hidden="true">' +
      '<path d="M11 4H16M16 4V9M16 4L9 11M8 5H5C3.89543 5 3 5.89543 3 7V15C3 16.1046 3.89543 17 5 17H13C14.1046 17 15 16.1046 15 15V12" stroke="currentColor" stroke-width="1.8" stroke-linecap="round" stroke-linejoin="round"/>' +
      '</svg>' +
      '<span>نسخه زنده دسکتاپ و موبایل</span>' +
      '</a>' +
      '</div>' +
      '<div class="demo-card-body">' +
      '<h3 class="demo-card-title">' +
      escapeHtml(demo.title) +
      '</h3>' +
      '<p class="demo-card-desc">' +
      escapeHtml(demo.description) +
      '</p>' +
      '<ul class="demo-features-mini">' +
      featuresHtml +
      '</ul>' +
      '<div class="demo-card-actions">' +
      '<a class="btn btn-primary" href="' +
      escapeHtml(demo.previewPath) +
      '">' +
      '<svg viewBox="0 0 20 20" fill="none" aria-hidden="true">' +
      '<path d="M2.5 10C4.2 6.6 7 5 10 5C13 5 15.8 6.6 17.5 10C15.8 13.4 13 15 10 15C7 15 4.2 13.4 2.5 10Z" stroke="currentColor" stroke-width="1.75"/>' +
      '<circle cx="10" cy="10" r="2.5" stroke="currentColor" stroke-width="1.75"/>' +
      '</svg>' +
      '<span>مشاهده دمو</span>' +
      '</a>' +
      '<a class="btn btn-secondary" href="' +
      escapeHtml(demo.orderUrl) +
      '" target="_blank" rel="noopener noreferrer">' +
      '<svg viewBox="0 0 20 20" fill="none" aria-hidden="true">' +
      '<path d="M6 10H14M10 6L6 10L10 14" stroke="currentColor" stroke-width="1.75" stroke-linecap="round" stroke-linejoin="round"/>' +
      '</svg>' +
      '<span>جزئیات و سفارش</span>' +
      '</a>' +
      '</div>' +
      '</div>' +
      '</article>'
    );
  }

  function attachImageFallbacks() {
    if (!demosGrid) return;
    demosGrid.querySelectorAll('img.demo-thumb-img').forEach(function (img) {
      img.addEventListener(
        'error',
        function () {
          const fallback = img.getAttribute('data-fallback');
          if (fallback && img.getAttribute('src') !== fallback) {
            img.setAttribute('src', fallback);
          }
        },
        { once: true }
      );
    });
  }

  function renderDemos() {
    if (!demosGrid) return;
    const filtered = filterDemos();

    if (resultsCountEl) {
      resultsCountEl.textContent = String(filtered.length);
    }

    if (filtered.length === 0) {
      demosGrid.innerHTML = '';
      if (emptyStateEl) {
        const activeCatObj = config.categories.find(function (c) {
          return c.id === activeCategory;
        });
        if (emptyStateTitleEl) {
          if (searchQuery.trim()) {
            emptyStateTitleEl.textContent = 'دمویی مطابق با «' + searchQuery.trim() + '» پیدا نشد';
          } else if (activeCatObj && activeCatObj.id !== 'all') {
            emptyStateTitleEl.textContent =
              'در دسته‌بندی «' + activeCatObj.label + '» هنوز دموی آماده منتشر نشده است';
          } else {
            emptyStateTitleEl.textContent = 'دمویی برای نمایش یافت نشد';
          }
        }
        emptyStateEl.classList.add('is-visible');
      }
      return;
    }

    if (emptyStateEl) {
      emptyStateEl.classList.remove('is-visible');
    }

    demosGrid.innerHTML = filtered.map(createDemoCardHtml).join('');
    attachImageFallbacks();
  }

  function setupSearch() {
    if (!searchInput) return;

    searchInput.addEventListener('input', function () {
      searchQuery = searchInput.value;
      if (searchClearBtn) {
        searchClearBtn.classList.toggle('is-visible', searchQuery.trim().length > 0);
      }
      renderDemos();
    });

    if (searchClearBtn) {
      searchClearBtn.addEventListener('click', function () {
        searchInput.value = '';
        searchQuery = '';
        searchClearBtn.classList.remove('is-visible');
        searchInput.focus();
        renderDemos();
      });
    }

    if (resetFiltersBtn) {
      resetFiltersBtn.addEventListener('click', function () {
        activeCategory = 'all';
        searchQuery = '';
        if (searchInput) searchInput.value = '';
        if (searchClearBtn) searchClearBtn.classList.remove('is-visible');
        updateFilterButtons();
        renderDemos();
      });
    }
  }

  function setupHeroDeviceToggle() {
    const stageViewport = document.getElementById('hero-stage-viewport');
    const buttons = document.querySelectorAll('.stage-device-btn');
    if (!stageViewport || !buttons.length) return;

    buttons.forEach(function (btn) {
      btn.addEventListener('click', function () {
        const mode = btn.getAttribute('data-stage-device');
        buttons.forEach(function (b) {
          const isCurrent = b === btn;
          b.classList.toggle('is-active', isCurrent);
          b.setAttribute('aria-pressed', isCurrent ? 'true' : 'false');
        });
        stageViewport.classList.toggle('is-mobile', mode === 'mobile');
      });
    });
  }

  function setupMobileDrawer() {
    const openBtn = document.getElementById('mobile-menu-open');
    const closeBtn = document.getElementById('mobile-menu-close');
    const drawer = document.getElementById('mobile-drawer');
    const backdrop = document.getElementById('mobile-drawer-backdrop');
    if (!openBtn || !drawer) return;

    function openDrawer() {
      drawer.classList.add('is-open');
      drawer.setAttribute('aria-hidden', 'false');
      openBtn.setAttribute('aria-expanded', 'true');
      document.body.style.overflow = 'hidden';
      if (closeBtn) closeBtn.focus();
    }

    function closeDrawer() {
      drawer.classList.remove('is-open');
      drawer.setAttribute('aria-hidden', 'true');
      openBtn.setAttribute('aria-expanded', 'false');
      document.body.style.overflow = '';
      openBtn.focus();
    }

    openBtn.addEventListener('click', openDrawer);
    if (closeBtn) closeBtn.addEventListener('click', closeDrawer);
    if (backdrop) backdrop.addEventListener('click', closeDrawer);

    drawer.querySelectorAll('a').forEach(function (link) {
      link.addEventListener('click', closeDrawer);
    });

    document.addEventListener('keydown', function (e) {
      if (e.key === 'Escape' && drawer.classList.contains('is-open')) {
        closeDrawer();
      }
    });
  }

  renderFilterPills();
  renderDemos();
  setupSearch();
  setupHeroDeviceToggle();
  setupMobileDrawer();
})();
