(function () {
  'use strict';

  const config = window.ETEHAAD_CONFIG;
  if (!config || !config.demos.length) return;

  const demoSelect = document.getElementById('preview-demo-select');
  const frameShell = document.getElementById('preview-frame-shell');
  const iframe = document.getElementById('preview-iframe');
  const loadingOverlay = document.getElementById('preview-loading');
  const fallbackBox = document.getElementById('preview-fallback');
  const fallbackImg = document.getElementById('preview-fallback-img');
  const fallbackTitle = document.getElementById('preview-fallback-title');
  const fallbackOpenBtn = document.getElementById('preview-fallback-open');
  const directLink = document.getElementById('preview-direct-link');
  const orderBtn = document.getElementById('preview-order-btn');
  const reloadBtn = document.getElementById('preview-reload-btn');
  const infoToggleBtn = document.getElementById('preview-info-toggle');
  const infoDrawer = document.getElementById('preview-info-drawer');
  const infoCloseBtn = document.getElementById('preview-info-close');
  const infoTitle = document.getElementById('preview-info-title');
  const infoDesc = document.getElementById('preview-info-desc');
  const infoFeatures = document.getElementById('preview-info-features');
  const infoStack = document.getElementById('preview-info-stack');
  const deviceButtons = document.querySelectorAll('.device-btn');

  const params = new URLSearchParams(window.location.search);
  let currentDemoId = params.get('demo') || config.demos[0].id;
  let currentDevice = params.get('device') || 'desktop';
  let loadTimer = null;

  function findDemo(id) {
    return (
      config.demos.find(function (d) {
        return d.id === id;
      }) || config.demos[0]
    );
  }

  function populateSelect() {
    if (!demoSelect) return;
    demoSelect.innerHTML = config.demos
      .map(function (d) {
        return '<option value="' + d.id + '">' + d.title + '</option>';
      })
      .join('');
    demoSelect.value = currentDemoId;
  }

  function updateUrl() {
    const url = new URL(window.location.href);
    url.searchParams.set('demo', currentDemoId);
    url.searchParams.set('device', currentDevice);
    window.history.replaceState({}, '', url.toString());
  }

  function setDevice(device) {
    currentDevice = ['desktop', 'tablet', 'mobile'].indexOf(device) !== -1 ? device : 'desktop';
    if (frameShell) {
      frameShell.classList.remove('device-desktop', 'device-tablet', 'device-mobile');
      frameShell.classList.add('device-' + currentDevice);
    }
    deviceButtons.forEach(function (btn) {
      const active = btn.getAttribute('data-device') === currentDevice;
      btn.classList.toggle('is-active', active);
      btn.setAttribute('aria-pressed', active ? 'true' : 'false');
    });
    updateUrl();
  }

  function renderInfoDrawer(demo) {
    if (infoTitle) infoTitle.textContent = demo.title;
    if (infoDesc) infoDesc.textContent = demo.description;
    if (infoFeatures) {
      infoFeatures.innerHTML = (demo.features || [])
        .map(function (f) {
          return '<li>• ' + f + '</li>';
        })
        .join('');
    }
    if (infoStack) {
      infoStack.innerHTML = (demo.stack || [])
        .map(function (tech) {
          return '<span class="stack-chip">' + tech + '</span>';
        })
        .join('');
    }
  }

  function loadDemo(id) {
    const demo = findDemo(id);
    currentDemoId = demo.id;
    document.title = 'پیش‌نمایش ' + demo.title + ' | اتحاد وردپرس';

    if (demoSelect) demoSelect.value = demo.id;
    if (directLink) directLink.href = demo.demoPath;
    if (orderBtn) orderBtn.href = demo.orderUrl;

    if (fallbackImg) {
      fallbackImg.src = '../' + demo.fallbackImage;
      fallbackImg.alt = demo.title;
    }
    if (fallbackTitle) fallbackTitle.textContent = demo.title;
    if (fallbackOpenBtn) fallbackOpenBtn.href = demo.demoPath;

    renderInfoDrawer(demo);
    updateUrl();

    if (fallbackBox) fallbackBox.classList.remove('is-visible');
    if (loadingOverlay) loadingOverlay.classList.remove('is-hidden');

    clearTimeout(loadTimer);

    if (iframe) {
      iframe.src = demo.demoPath;
      loadTimer = setTimeout(function () {
        if (loadingOverlay) loadingOverlay.classList.add('is-hidden');
      }, 4500);
    }
  }

  if (iframe) {
    iframe.addEventListener('load', function () {
      clearTimeout(loadTimer);
      if (loadingOverlay) loadingOverlay.classList.add('is-hidden');
      try {
        const doc = iframe.contentDocument;
        const text = doc ? (doc.title + ' ' + (doc.body ? doc.body.textContent.slice(0, 300) : '')) : '';
        if (doc && (/Error response/i.test(text) || /Error code:\s*404/i.test(text))) {
          if (fallbackBox) fallbackBox.classList.add('is-visible');
        }
      } catch (e) {
        // Cross-origin frame loaded normally
      }
    });

    iframe.addEventListener('error', function () {
      clearTimeout(loadTimer);
      if (loadingOverlay) loadingOverlay.classList.add('is-hidden');
      if (fallbackBox) fallbackBox.classList.add('is-visible');
    });
  }

  if (demoSelect) {
    demoSelect.addEventListener('change', function () {
      loadDemo(demoSelect.value);
    });
  }

  deviceButtons.forEach(function (btn) {
    btn.addEventListener('click', function () {
      setDevice(btn.getAttribute('data-device'));
    });
  });

  if (reloadBtn) {
    reloadBtn.addEventListener('click', function () {
      loadDemo(currentDemoId);
    });
  }

  if (infoToggleBtn && infoDrawer) {
    infoToggleBtn.addEventListener('click', function () {
      infoDrawer.classList.toggle('is-open');
    });
  }

  if (infoCloseBtn && infoDrawer) {
    infoCloseBtn.addEventListener('click', function () {
      infoDrawer.classList.remove('is-open');
    });
  }

  document.addEventListener('keydown', function (e) {
    if (e.key === 'Escape' && infoDrawer && infoDrawer.classList.contains('is-open')) {
      infoDrawer.classList.remove('is-open');
    }
  });

  populateSelect();
  setDevice(currentDevice);
  loadDemo(currentDemoId);
})();
