/**
 * Interactive Clinical Pregnancy & Prenatal Care Atlas — Application Controller
 * Security Architecture:
 * - 100% Free of innerHTML / outerHTML / insertAdjacentHTML / document.write
 * - Strict DOM & SVG construction via createElement / createElementNS / textContent / replaceChildren
 * - Strict Input Validation against allow-lists (Dating Methods, Risk Profiles, Week Range 1..42)
 * - No sensitive PII or tokens stored; local state stores only anonymous week/checklist preferences
 * // TODO(security): Backend authentication, OAuth/MFA, database mTLS, and server-side CSRF tokens are
 * // intentionally omitted because this is a 100% client-side, zero-backend offline medical reference tool.
 */
(function initClinicalAtlasApp() {
  'use strict';

  const SVG_NS = 'http://www.w3.org/2000/svg';
  const STORAGE_KEY = 'prenatal_clinical_atlas_prefs_v1';

  const ALLOWED_LANGUAGES = ['en', 'es', 'zh', 'pt', 'ja', 'ko', 'it', 'fr'];
  const ALLOWED_DATING_METHODS = ['edd', 'lmp', 'ivf5', 'ivf3', 'conception'];
  const ALLOWED_RISK_PROFILES = ['standard', 'ama35', 'gdm_highrisk', 'twins'];
  const ALLOWED_TABS = ['tab-atlas', 'tab-schedule', 'tab-triage', 'tab-meds'];
  const ALLOWED_VIEW_MODES = ['3d', 'photo', 'schematic'];
  const SAFE_ASSET_PATH = /^assets\/[a-z0-9_]+\.jpg$/;

  const appState = {
    lang: 'en',
    currentWeek: 8,
    activeTab: 'tab-atlas',
    viewMode: '3d',
    datingMethod: 'lmp',
    referenceDateStr: '',
    lmpEpochMs: null,
    eddEpochMs: null,
    riskProfile: 'standard',
    scheduleTrimesterFilter: 'all',
    symptomUrgencyFilter: 'all',
    symptomSearchQuery: '',
    medStatusFilter: 'all',
    medSearchQuery: '',
    completedVisits: {}
  };

  // Interactive 3D viewer handle (created on DOMContentLoaded when WebGL is available).
  let viewer3d = null;

  function ui() {
    return window.CLINICAL_I18N.getUiStrings(appState.lang);
  }

  function fmt(template, params) {
    return window.CLINICAL_I18N.formatTemplate(template, params);
  }

  function formatWeekBadgePrefix(weekNum) {
    const lang = appState.lang;
    if (lang === 'es' || lang === 'pt') return 'SEMANA ' + weekNum;
    if (lang === 'zh') return '第 ' + weekNum + ' 周';
    if (lang === 'ja') return '妊娠第' + weekNum + '週';
    if (lang === 'ko') return '임신 ' + weekNum + '주';
    if (lang === 'it') return 'SETTIMANA ' + weekNum;
    if (lang === 'fr') return 'SEMAINE ' + weekNum;
    return 'WEEK ' + weekNum;
  }

  function formatApptWeekPill(wStart, wEnd) {
    const lang = appState.lang;
    const same = wStart === wEnd;
    if (lang === 'es' || lang === 'pt') return same ? ('Semana ' + wStart) : ('Semanas ' + wStart + '–' + wEnd);
    if (lang === 'zh') return same ? ('第 ' + wStart + ' 周') : ('第 ' + wStart + '–' + wEnd + ' 周');
    if (lang === 'ja') return same ? ('妊娠' + wStart + '週') : ('妊娠' + wStart + '〜' + wEnd + '週');
    if (lang === 'ko') return same ? ('임신 ' + wStart + '주') : ('임신 ' + wStart + '–' + wEnd + '주');
    if (lang === 'it') return same ? ('Settimana ' + wStart) : ('Settimane ' + wStart + '–' + wEnd);
    if (lang === 'fr') return same ? ('Semaine ' + wStart) : ('Semaines ' + wStart + '–' + wEnd);
    return same ? ('Week ' + wStart) : ('Weeks ' + wStart + '–' + wEnd);
  }

  /* ==========================================================================
     Safe DOM & SVG Helper Utilities
     ========================================================================== */
  function createEl(tagName, className, text) {
    const el = document.createElement(tagName);
    if (className) {
      el.className = className;
    }
    if (typeof text === 'string' || typeof text === 'number') {
      el.textContent = String(text);
    }
    return el;
  }

  function setElText(id, text) {
    const el = document.getElementById(id);
    if (el && (typeof text === 'string' || typeof text === 'number')) {
      el.textContent = String(text);
    }
  }

  function createSvgEl(tagName, attrs) {
    const el = document.createElementNS(SVG_NS, tagName);
    if (attrs) {
      const keys = Object.keys(attrs);
      for (let i = 0; i < keys.length; i += 1) {
        const k = keys[i];
        el.setAttribute(k, String(attrs[k]));
      }
    }
    return el;
  }

  /* ==========================================================================
     Date & Gestational Age Calculations (Naegele's Rule & IVF Protocols)
     ========================================================================== */
  const MS_PER_DAY = 86400000;

  function parseIsoDateLocal(dateStr) {
    if (typeof dateStr !== 'string' || !/^\d{4}-\d{2}-\d{2}$/.test(dateStr)) {
      return null;
    }
    const parts = dateStr.split('-');
    const year = Number(parts[0]);
    const month = Number(parts[1]) - 1;
    const day = Number(parts[2]);
    if (year < 2020 || year > 2035 || month < 0 || month > 11 || day < 1 || day > 31) {
      return null;
    }
    const d = new Date(year, month, day, 12, 0, 0, 0);
    return Number.isNaN(d.getTime()) ? null : d.getTime();
  }

  function formatShortDate(epochMs) {
    if (!epochMs) return '';
    const d = new Date(epochMs);
    const locale = window.CLINICAL_I18N.getLocaleForLang(appState.lang);
    return d.toLocaleDateString(locale, {
      month: 'short',
      day: 'numeric',
      year: 'numeric'
    });
  }

  function recalculateGestationalTimeline() {
    const refMs = parseIsoDateLocal(appState.referenceDateStr);
    if (!refMs) {
      appState.lmpEpochMs = null;
      appState.eddEpochMs = null;
      return;
    }

    // Standard full-term gestation from LMP Day 1 is 280 days (40 weeks)
    if (appState.datingMethod === 'lmp') {
      appState.lmpEpochMs = refMs;
      appState.eddEpochMs = refMs + (280 * MS_PER_DAY);
    } else if (appState.datingMethod === 'edd') {
      appState.eddEpochMs = refMs;
      appState.lmpEpochMs = refMs - (280 * MS_PER_DAY);
    } else if (appState.datingMethod === 'conception') {
      // Ovulation/Conception is Day 14 of gestational age (266 days before EDD)
      appState.lmpEpochMs = refMs - (14 * MS_PER_DAY);
      appState.eddEpochMs = refMs + (266 * MS_PER_DAY);
    } else if (appState.datingMethod === 'ivf5') {
      // Day-5 Blastocyst Transfer corresponds to 2w5d (Day 19 of gestation; 261 days before EDD)
      appState.lmpEpochMs = refMs - (19 * MS_PER_DAY);
      appState.eddEpochMs = refMs + (261 * MS_PER_DAY);
    } else if (appState.datingMethod === 'ivf3') {
      // Day-3 Cleavage Embryo Transfer corresponds to 2w3d (Day 17 of gestation; 263 days before EDD)
      appState.lmpEpochMs = refMs - (17 * MS_PER_DAY);
      appState.eddEpochMs = refMs + (263 * MS_PER_DAY);
    }
  }

  function getWeekCalendarWindow(weekNumber) {
    if (!appState.lmpEpochMs) {
      return null;
    }
    const startMs = appState.lmpEpochMs + ((weekNumber - 1) * 7 * MS_PER_DAY);
    const endMs = startMs + (6 * MS_PER_DAY);
    return {
      startMs: startMs,
      endMs: endMs,
      label: formatShortDate(startMs) + ' – ' + formatShortDate(endMs)
    };
  }

  function getTodayGestationalAge() {
    if (!appState.lmpEpochMs) {
      return null;
    }
    const now = new Date();
    const todayNoon = new Date(now.getFullYear(), now.getMonth(), now.getDate(), 12, 0, 0, 0).getTime();
    const diffDays = Math.floor((todayNoon - appState.lmpEpochMs) / MS_PER_DAY);
    if (diffDays < 0 || diffDays > 301) {
      return null;
    }
    const weeks = Math.floor(diffDays / 7);
    const days = diffDays % 7;
    const activeWeekNumber = Math.min(42, Math.max(1, weeks + 1));
    return {
      weeks: weeks,
      days: days,
      activeWeekNumber: activeWeekNumber,
      formatted: fmt(ui().todayFmt, { w: weeks, d: days, aw: activeWeekNumber })
    };
  }

  /* ==========================================================================
     State Persistence (Safe Anonymous Preferences Only)
     ========================================================================== */
  function detectBrowserLanguage() {
    try {
      const navLang = (window.navigator && window.navigator.language) ? String(window.navigator.language).toLowerCase() : '';
      const shortCode = navLang.slice(0, 2);
      if (ALLOWED_LANGUAGES.indexOf(shortCode) !== -1) {
        return shortCode;
      }
    } catch (_e) {
      // Ignore
    }
    return 'en';
  }

  function savePreferences() {
    try {
      const payload = JSON.stringify({
        lang: appState.lang,
        currentWeek: appState.currentWeek,
        viewMode: appState.viewMode,
        datingMethod: appState.datingMethod,
        referenceDateStr: appState.referenceDateStr,
        riskProfile: appState.riskProfile,
        completedVisits: appState.completedVisits
      });
      window.localStorage.setItem(STORAGE_KEY, payload);
    } catch (_e) {
      // Ignore storage quota or private browsing restrictions gracefully
    }
  }

  function loadPreferences() {
    appState.lang = detectBrowserLanguage();
    try {
      const raw = window.localStorage.getItem(STORAGE_KEY);
      if (!raw) return;
      const parsed = JSON.parse(raw);
      if (!parsed || typeof parsed !== 'object') return;

      if (ALLOWED_LANGUAGES.indexOf(parsed.lang) !== -1) {
        appState.lang = parsed.lang;
      }
      if (typeof parsed.currentWeek === 'number' && parsed.currentWeek >= 1 && parsed.currentWeek <= 42) {
        appState.currentWeek = Math.floor(parsed.currentWeek);
      }
      if (ALLOWED_DATING_METHODS.indexOf(parsed.datingMethod) !== -1) {
        appState.datingMethod = parsed.datingMethod;
      }
      if (ALLOWED_VIEW_MODES.indexOf(parsed.viewMode) !== -1) {
        appState.viewMode = parsed.viewMode;
      }
      if (typeof parsed.referenceDateStr === 'string' && /^\d{4}-\d{2}-\d{2}$/.test(parsed.referenceDateStr)) {
        appState.referenceDateStr = parsed.referenceDateStr;
      }
      if (ALLOWED_RISK_PROFILES.indexOf(parsed.riskProfile) !== -1) {
        appState.riskProfile = parsed.riskProfile;
      }
      if (parsed.completedVisits && typeof parsed.completedVisits === 'object') {
        const cleanVisits = {};
        const keys = Object.keys(parsed.completedVisits);
        for (let i = 0; i < keys.length; i += 1) {
          const k = keys[i];
          if (/^appt-[a-z0-9-]+$/.test(k) && parsed.completedVisits[k] === true) {
            cleanVisits[k] = true;
          }
        }
        appState.completedVisits = cleanVisits;
      }
    } catch (_e) {
      // Fallback to defaults on malformed storage
    }
  }

  function clearAllLocalPreferences() {
    try {
      window.localStorage.removeItem(STORAGE_KEY);
    } catch (_e) {
      // Ignore
    }
    window.location.reload();
  }

  /* ==========================================================================
     Shareable URL State (?week=N&mode=3d|photo|schematic&lang=xx)
     ========================================================================== */
  function readWeekFromUrl() {
    try {
      const params = new URLSearchParams(window.location.search);
      const raw = params.get('week');
      if (raw === null || !/^\d{1,2}$/.test(raw)) return null;
      const n = Number(raw);
      return (n >= 1 && n <= 42) ? n : null;
    } catch (_e) {
      return null;
    }
  }

  function readModeFromUrl() {
    try {
      const params = new URLSearchParams(window.location.search);
      const raw = params.get('mode');
      if (raw && ALLOWED_VIEW_MODES.indexOf(raw) !== -1) return raw;
      return null;
    } catch (_e) {
      return null;
    }
  }

  function readLangFromUrl() {
    try {
      const params = new URLSearchParams(window.location.search);
      const raw = params.get('lang');
      if (raw && ALLOWED_LANGUAGES.indexOf(raw) !== -1) return raw;
      return null;
    } catch (_e) {
      return null;
    }
  }

  function writeStateToUrl() {
    try {
      if (!window.history || !window.history.replaceState) return;
      const url = new URL(window.location.href);
      url.searchParams.set('week', String(appState.currentWeek));
      if (appState.lang !== 'en') {
        url.searchParams.set('lang', appState.lang);
      } else {
        url.searchParams.delete('lang');
      }
      window.history.replaceState(null, '', url.pathname + url.search + url.hash);
    } catch (_e) {
      // file:// origins may refuse history updates; shareable URLs are a progressive enhancement
    }
  }

  /* ==========================================================================
     Visualizer Layers: 3D Interactive (WebGL) / Photoreal Still / Schematic SVG
     ========================================================================== */
  function findPhotoStill(week) {
    const stills = window.CLINICAL_ATLAS_DATA.PHOTO_STILLS || [];
    let exact = null;
    let exactIndex = -1;
    let nearest = null;
    let nearestIndex = -1;
    for (let i = 0; i < stills.length; i += 1) {
      const s = stills[i];
      if (!SAFE_ASSET_PATH.test(s.file)) continue;
      if (week >= s.minWeek && week <= s.maxWeek) {
        exact = s;
        exactIndex = i;
        break;
      }
      if (s.minWeek <= week && (!nearest || s.minWeek > nearest.minWeek)) {
        nearest = s;
        nearestIndex = i;
      }
    }
    if (exact) {
      return {
        still: window.CLINICAL_I18N.localizePhotoStill(exact, exactIndex, appState.lang),
        exact: true
      };
    }
    if (nearest) {
      return {
        still: window.CLINICAL_I18N.localizePhotoStill(nearest, nearestIndex, appState.lang),
        exact: false
      };
    }
    return null;
  }

  function renderPhotoStill(entry) {
    const u = ui();
    const img = document.getElementById('photo-still-img');
    const caption = document.getElementById('photo-still-caption');
    const found = findPhotoStill(entry.week);
    if (!found) {
      img.removeAttribute('src');
      img.alt = '';
      caption.textContent = u.photoNoneCaption || '';
      return;
    }
    if (img.getAttribute('src') !== found.still.file) {
      img.setAttribute('src', found.still.file);
    }
    img.alt = found.still.alt;
    caption.textContent = found.exact
      ? found.still.caption
      : fmt(u.photoNearestFmt, {
          w1: found.still.minWeek,
          w2: found.still.maxWeek,
          caption: found.still.caption,
          w: entry.week
        });
  }

  function setBuildingOverlay(visible, week) {
    const overlay = document.getElementById('viewer-building');
    if (!overlay) return;
    if (visible) {
      overlay.textContent = fmt(ui().sculptingFmt, { w: week });
      overlay.hidden = false;
    } else {
      overlay.hidden = true;
    }
  }

  function syncViewer3dOverlayButtons() {
    if (!viewer3d || !viewer3d.supported) return;
    const s = viewer3d.getState();
    const u = ui();
    document.getElementById('btn-3d-autorotate').setAttribute('aria-pressed', s.autoRotate ? 'true' : 'false');
    document.getElementById('btn-3d-xray').setAttribute('aria-pressed', s.xray ? 'true' : 'false');
    document.getElementById('btn-3d-sac').setAttribute('aria-pressed', s.showSac ? 'true' : 'false');
    const audioBtn = document.getElementById('btn-3d-audio');
    const kickBtn = document.getElementById('btn-3d-kick');
    const telemetryBox = document.getElementById('viewer-live-telemetry');
    const bpmReadout = document.getElementById('viewer-bpm-readout');
    const week = s.week || appState.currentWeek;
    const hasCardiac = week >= 5;
    if (audioBtn) {
      audioBtn.disabled = !hasCardiac;
      audioBtn.setAttribute('aria-pressed', (s.audioEnabled && hasCardiac) ? 'true' : 'false');
      audioBtn.textContent = (s.audioEnabled && hasCardiac) ? u.btnAudioOn : u.btnAudioOff;
    }
    if (kickBtn) {
      kickBtn.disabled = !hasCardiac;
    }
    if (telemetryBox && bpmReadout) {
      if (hasCardiac) {
        telemetryBox.classList.remove('is-precardiac');
        const bpm = s.bpm || Math.round(window.PrenatalAtlas3D.fetalHeartRate(week));
        bpmReadout.textContent = fmt(u.fhrActiveFmt, { bpm: bpm });
      } else {
        telemetryBox.classList.add('is-precardiac');
        bpmReadout.textContent = u.fhrPreCardiac;
      }
    }
  }

  function disable3dMode(showNotice) {
    const u = ui();
    const btn = document.querySelector('[data-view-mode="3d"]');
    if (btn) {
      btn.disabled = true;
      btn.title = u.webglTitle || u.viewerUnsupported;
    }
    const notice = document.getElementById('viewer-unsupported');
    if (notice) notice.hidden = !showNotice;
    if (appState.viewMode === '3d') {
      appState.viewMode = 'photo';
    }
  }

  function initViewer3d() {
    const mount = document.getElementById('viewport-3d');
    if (!mount || !window.PrenatalAtlas3D) {
      disable3dMode(true);
      return;
    }
    try {
      viewer3d = window.PrenatalAtlas3D.createViewer(mount, {
        onBuildStart: function (week) { setBuildingOverlay(true, week); },
        onBuildEnd: function () { setBuildingOverlay(false); syncViewer3dOverlayButtons(); },
        onError: function () {
          setBuildingOverlay(false);
          disable3dMode(true);
          applyViewMode();
        }
      });
    } catch (_e) {
      viewer3d = null;
    }
    if (!viewer3d || !viewer3d.supported) {
      disable3dMode(true);
      return;
    }
    syncViewer3dOverlayButtons();
  }

  function syncViewerActivity() {
    if (!viewer3d || !viewer3d.supported) return;
    viewer3d.setActive(appState.activeTab === 'tab-atlas' && appState.viewMode === '3d');
  }

  function updateVisualizer(entry) {
    if (appState.viewMode === '3d' && viewer3d && viewer3d.supported) {
      viewer3d.setWeek(entry.week);
      syncViewer3dOverlayButtons();
    } else if (appState.viewMode === 'photo') {
      renderPhotoStill(entry);
    } else {
      const svgMount = document.getElementById('svg-viewport-mount');
      svgMount.replaceChildren(buildAnatomicalSvg(entry));
    }
  }

  function applyViewMode() {
    const mode = appState.viewMode;
    const layers = { '3d': 'viewport-3d', photo: 'viewport-photo', schematic: 'svg-viewport-mount' };
    const keys = Object.keys(layers);
    for (let i = 0; i < keys.length; i += 1) {
      const el = document.getElementById(layers[keys[i]]);
      if (el) el.hidden = keys[i] !== mode;
    }
    const modeBtns = document.querySelectorAll('[data-view-mode]');
    for (let j = 0; j < modeBtns.length; j += 1) {
      modeBtns[j].setAttribute('aria-pressed', modeBtns[j].getAttribute('data-view-mode') === mode ? 'true' : 'false');
    }
    syncViewerActivity();
    const rawEntry = window.CLINICAL_ATLAS_DATA.WEEKS_DATA[appState.currentWeek - 1];
    if (rawEntry) {
      const locEntry = window.CLINICAL_I18N.localizeWeekEntry(rawEntry, appState.lang);
      updateVisualizer(locEntry);
    }
  }

  function setViewMode(mode) {
    if (ALLOWED_VIEW_MODES.indexOf(mode) === -1) return;
    if (mode === '3d' && (!viewer3d || !viewer3d.supported)) return;
    appState.viewMode = mode;
    savePreferences();
    applyViewMode();
  }

  /* ==========================================================================
     Anatomical & Embryological SVG Visualizer (Pure createElementNS)
     ========================================================================== */
  function buildAnatomicalSvg(weekEntry) {
    const u = ui();
    const svg = createSvgEl('svg', {
      viewBox: '0 0 360 300',
      class: 'anatomical-svg',
      role: 'img',
      'aria-label': fmt(u.svgAriaFmt, { w: weekEntry.week, title: weekEntry.stageTitle })
    });

    function addCallout(x1, y1, x2, y2, labelText, align) {
      const g = createSvgEl('g', { class: 'schematic-callout' });
      g.appendChild(createSvgEl('line', {
        x1: x1, y1: y1, x2: x2, y2: y2,
        stroke: 'rgba(182, 200, 209, 0.55)',
        'stroke-width': '1',
        'stroke-dasharray': '2,2'
      }));
      g.appendChild(createSvgEl('circle', {
        cx: x1, cy: y1, r: 2,
        fill: '#FFD166'
      }));
      const txt = createSvgEl('text', {
        x: x2 + (align === 'end' ? -4 : 4),
        y: y2 + 3,
        'text-anchor': align || 'start',
        fill: '#D8E6ED',
        'font-size': '8.5',
        'font-family': 'ui-monospace, SFMono-Regular, monospace'
      });
      txt.textContent = labelText;
      g.appendChild(txt);
      svg.appendChild(g);
    }

    // Subtle Clinical Measurement Grid Lines
    const gridGroup = createSvgEl('g', { stroke: 'rgba(255,255,255,0.06)', 'stroke-width': '1' });
    for (let x = 40; x <= 320; x += 40) {
      gridGroup.appendChild(createSvgEl('line', { x1: x, y1: 20, x2: x, y2: 274 }));
    }
    for (let y = 40; y <= 260; y += 40) {
      gridGroup.appendChild(createSvgEl('line', { x1: 20, y1: y, x2: 340, y2: y }));
    }
    svg.appendChild(gridGroup);

    const stage = weekEntry.visualStage;

    // Outer Amniotic / Gestational Sac Boundary (matches 3D amniotic sac envelope)
    const sacRadiusX = stage === 'blastocyst' ? 110 : Math.round(88 + (weekEntry.scaleFactor * 52));
    const sacRadiusY = stage === 'blastocyst' ? 92 : Math.round(74 + (weekEntry.scaleFactor * 44));
    if (stage !== 'follicle' && stage !== 'fertilization') {
      svg.appendChild(createSvgEl('ellipse', {
        cx: 180,
        cy: 146,
        rx: sacRadiusX,
        ry: sacRadiusY,
        fill: 'rgba(29, 91, 134, 0.16)',
        stroke: 'rgba(182, 200, 209, 0.42)',
        'stroke-width': '1.75'
      }));
    }

    if (stage === 'follicle') {
      // Ovarian Follicle Wall on bottom-right (matching 3D buildOocyteScene)
      svg.appendChild(createSvgEl('path', {
        d: 'M 205 265 Q 245 190 325 170 L 340 265 Z',
        fill: 'rgba(216, 87, 107, 0.28)',
        stroke: '#D8576B',
        'stroke-width': '2'
      }));

      // Corona Radiata Cumulus Oophorus Ring (matching 3D corona radiata)
      const coronaCount = 18;
      for (let i = 0; i < coronaCount; i += 1) {
        const ang = (i / coronaCount) * Math.PI * 2;
        const rDist = 56 + ((i % 2) * 5);
        svg.appendChild(createSvgEl('circle', {
          cx: (172 + Math.cos(ang) * rDist).toFixed(1),
          cy: (140 + Math.sin(ang) * rDist).toFixed(1),
          r: 8,
          fill: 'rgba(244, 184, 146, 0.45)',
          stroke: 'rgba(255, 224, 194, 0.65)',
          'stroke-width': '1'
        }));
      }

      // Glassy Zona Pellucida Shell
      svg.appendChild(createSvgEl('circle', {
        cx: 172, cy: 140, r: 46,
        fill: 'rgba(148, 210, 236, 0.16)',
        stroke: '#94D2EC',
        'stroke-width': '3'
      }));

      // Ooplasm (Vitellus)
      svg.appendChild(createSvgEl('circle', {
        cx: 172, cy: 140, r: 35,
        fill: 'rgba(244, 162, 97, 0.85)',
        stroke: '#FFD166',
        'stroke-width': '1.5'
      }));

      // Eccentric Germinal Vesicle / Nucleus + Nucleolus
      svg.appendChild(createSvgEl('circle', {
        cx: 162, cy: 132, r: 12,
        fill: '#C85A4B',
        stroke: '#FFE5D9',
        'stroke-width': '1.2'
      }));
      svg.appendChild(createSvgEl('circle', {
        cx: 160, cy: 130, r: 4,
        fill: '#FFF3B0'
      }));

      // First Polar Body in Perivitelline Space
      svg.appendChild(createSvgEl('circle', {
        cx: 196, cy: 112, r: 5.5,
        fill: '#FFD166',
        stroke: '#FFFFFF',
        'stroke-width': '1'
      }));

      addCallout(172, 94, 114, 66, u.svgZonaPellucida, 'end');
      addCallout(162, 132, 110, 126, u.svgOocyteNucleus, 'end');
      addCallout(196, 112, 236, 86, u.svgPolarBody1, 'start');
      addCallout(226, 140, 242, 140, u.svgCoronaRadiata, 'start');
      addCallout(265, 215, 232, 245, u.svgOvarianFollicle, 'start');
    } else if (stage === 'fertilization') {
      // Week 3: 16-Cell Compacted Morula inside Zona Pellucida (matching 3D buildMorulaScene)
      svg.appendChild(createSvgEl('circle', {
        cx: 180, cy: 146, r: 60,
        fill: 'rgba(148, 210, 236, 0.15)',
        stroke: '#94D2EC',
        'stroke-width': '3.5'
      }));

      const blastomereOffsets = [
        [-24, -20, 15], [0, -26, 15], [24, -18, 15],
        [-30, 2, 15], [-8, -4, 16], [14, -2, 16], [30, 6, 14],
        [-22, 22, 15], [2, 20, 16], [22, 22, 14],
        [-2, 4, 15]
      ];
      for (let i = 0; i < blastomereOffsets.length; i += 1) {
        const bx = 180 + blastomereOffsets[i][0];
        const by = 146 + blastomereOffsets[i][1];
        const br = blastomereOffsets[i][2];
        svg.appendChild(createSvgEl('circle', {
          cx: bx, cy: by, r: br,
          fill: 'rgba(235, 134, 108, 0.86)',
          stroke: '#FFD166',
          'stroke-width': '1.4'
        }));
        svg.appendChild(createSvgEl('circle', {
          cx: bx - 2, cy: by - 2, r: 4.5,
          fill: 'rgba(164, 58, 48, 0.78)'
        }));
      }

      // Two Polar Bodies at top-right under Zona Pellucida
      svg.appendChild(createSvgEl('circle', {
        cx: 214, cy: 103, r: 5,
        fill: '#FFD166', stroke: '#FFFFFF', 'stroke-width': '1'
      }));
      svg.appendChild(createSvgEl('circle', {
        cx: 223, cy: 111, r: 4.5,
        fill: '#FFD166', stroke: '#FFFFFF', 'stroke-width': '1'
      }));

      addCallout(180, 86, 118, 64, u.svgZonaPellucida, 'end');
      addCallout(156, 126, 116, 122, u.svgBlastomere, 'end');
      addCallout(218, 106, 242, 88, u.svgPolarBodies, 'start');
    } else if (stage === 'blastocyst') {
      // Week 4: Hatched Blastocyst Implanting into Right-Side Maternal Endometrium (matching 3D buildBlastocystScene)
      // Vascular Endometrial Lining on the RIGHT
      svg.appendChild(createSvgEl('path', {
        d: 'M 248 64 C 228 110, 228 182, 248 228 L 282 214 C 296 172, 296 120, 282 78 Z',
        fill: 'rgba(218, 92, 108, 0.55)',
        stroke: '#E56B7C',
        'stroke-width': '2'
      }));

      // Invading Syncytiotrophoblast Finger Projections anchoring into right endometrium
      const villiPaths = [
        'M 214 115 Q 236 108 254 102',
        'M 220 134 Q 244 132 262 128',
        'M 220 154 Q 244 156 264 158',
        'M 212 174 Q 236 182 254 190'
      ];
      for (let i = 0; i < villiPaths.length; i += 1) {
        svg.appendChild(createSvgEl('path', {
          d: villiPaths[i],
          fill: 'none',
          stroke: '#F29479',
          'stroke-width': '3.5',
          'stroke-linecap': 'round'
        }));
      }

      // Outer Trophoblast Ring & Blastocoel Cavity
      svg.appendChild(createSvgEl('circle', {
        cx: 166, cy: 146, r: 54,
        fill: 'rgba(29, 91, 134, 0.32)',
        stroke: '#74C69D',
        'stroke-width': '4.5'
      }));

      // Inner Cell Mass (Embryoblast: Epiblast + Hypoblast) on upper-left/center
      svg.appendChild(createSvgEl('ellipse', {
        cx: 148, cy: 126, rx: 22, ry: 15,
        fill: '#E76F51',
        stroke: '#FFD166',
        'stroke-width': '2'
      }));

      // Blastocoel Fluid Cavity Indicator
      svg.appendChild(createSvgEl('circle', {
        cx: 174, cy: 164, r: 22,
        fill: 'rgba(255, 209, 102, 0.16)',
        stroke: '#FFD166',
        'stroke-width': '1.5',
        'stroke-dasharray': '3,3'
      }));

      addCallout(148, 126, 114, 86, u.svgInnerCellMass, 'end');
      addCallout(114, 152, 108, 156, u.svgTrophoblastRing, 'end');
      addCallout(174, 178, 124, 218, u.svgBlastocoel, 'end');
      addCallout(258, 118, 236, 68, u.svgEndometrium, 'start');
    } else if (stage === 'embryo_early' || stage === 'embryo_late') {
      // Weeks 5–9: Carnegie-Stage Embryo facing LEFT, Dorsal Spine/Somites on RIGHT, Yolk Sac on BOTTOM-LEFT
      const isLateEmbryo = stage === 'embryo_late';
      const yolkRadius = isLateEmbryo ? 18 : 22;

      // Connecting Stalk (Future Umbilical Cord) on lower-left/bottom
      svg.appendChild(createSvgEl('path', {
        d: 'M 172 192 Q 146 210 124 218',
        fill: 'none',
        stroke: '#E07A5F',
        'stroke-width': '6',
        'stroke-linecap': 'round'
      }));

      // Vitelline Duct & Translucent Golden Yolk Sac on BOTTOM-LEFT (matching 3D & Photoreal Still)
      svg.appendChild(createSvgEl('path', {
        d: 'M 176 168 Q 146 174 126 178',
        fill: 'none',
        stroke: '#F4A261',
        'stroke-width': '3'
      }));
      svg.appendChild(createSvgEl('circle', {
        cx: 112, cy: 180, r: yolkRadius,
        fill: 'rgba(255, 196, 77, 0.38)',
        stroke: '#FFD166',
        'stroke-width': '2'
      }));
      // Vitelline capillary network inside Yolk Sac
      svg.appendChild(createSvgEl('path', {
        d: 'M 102 172 Q 112 180 122 174 M 104 188 Q 114 180 120 188',
        fill: 'none',
        stroke: 'rgba(220, 38, 38, 0.65)',
        'stroke-width': '1.2'
      }));

      // C-Shaped Embryo Body facing LEFT with Dorsal Spine curving on the RIGHT
      const scale = isLateEmbryo ? 1.06 : 0.90;
      const embryoGroup = createSvgEl('g', {
        transform: 'translate(194, 146) scale(' + scale + ') translate(-194, -146)'
      });

      // Dorsal trunk & tail curve on the RIGHT
      embryoGroup.appendChild(createSvgEl('path', {
        d: 'M 182 104 C 222 106, 232 166, 192 190 C 174 198, 160 188, 168 176',
        fill: 'none',
        stroke: '#F29B7E',
        'stroke-width': '24',
        'stroke-linecap': 'round'
      }));

      // Dorsal Somites along the right vertebral curve
      const somiteCoords = [
        [208, 118], [214, 128], [218, 140], [218, 152], [214, 164], [206, 175], [195, 183]
      ];
      for (let i = 0; i < somiteCoords.length; i += 1) {
        embryoGroup.appendChild(createSvgEl('circle', {
          cx: somiteCoords[i][0],
          cy: somiteCoords[i][1],
          r: 3.2,
          fill: '#FFE5D9',
          stroke: '#C85A4B',
          'stroke-width': '1'
        }));
      }

      // Cranial Vault / Forebrain & Midbrain Vesicles facing LEFT
      embryoGroup.appendChild(createSvgEl('ellipse', {
        cx: 174, cy: 104, rx: 22, ry: 20,
        fill: '#F4A68A',
        stroke: '#FFE5D9',
        'stroke-width': '1.5'
      }));

      // Pigmented Optic Cup (Eye) on the left-facing head
      embryoGroup.appendChild(createSvgEl('circle', {
        cx: 164, cy: 108, r: 4,
        fill: '#18222B',
        stroke: '#FFD166',
        'stroke-width': '0.8'
      }));

      // Glowing Crimson Cardiac Prominence (Heart) on ventral chest (left side of trunk)
      embryoGroup.appendChild(createSvgEl('circle', {
        cx: 184, cy: 138, r: 7.5,
        fill: '#EF4444',
        stroke: '#FFE5D9',
        'stroke-width': '1.5'
      }));

      if (isLateEmbryo || weekEntry.week === 6) {
        // Upper Limb Paddle / Hand Plate with Digital Rays extending left
        embryoGroup.appendChild(createSvgEl('path', {
          d: 'M 192 144 Q 172 148 164 142',
          fill: 'none',
          stroke: '#F7B59E',
          'stroke-width': isLateEmbryo ? '8' : '6',
          'stroke-linecap': 'round'
        }));
        embryoGroup.appendChild(createSvgEl('circle', {
          cx: 162, cy: 141, r: isLateEmbryo ? 5.5 : 3.5,
          fill: '#FFE5D9'
        }));

        // Lower Limb Paddle / Foot Plate extending left
        embryoGroup.appendChild(createSvgEl('path', {
          d: 'M 192 176 Q 174 178 166 170',
          fill: 'none',
          stroke: '#F7B59E',
          'stroke-width': isLateEmbryo ? '8' : '6',
          'stroke-linecap': 'round'
        }));
        embryoGroup.appendChild(createSvgEl('circle', {
          cx: 164, cy: 169, r: isLateEmbryo ? 5.5 : 3.5,
          fill: '#FFE5D9'
        }));
      }

      svg.appendChild(embryoGroup);

      addCallout(166, 92, 134, 68, u.svgForebrainOptic, 'end');
      addCallout(184, 138, 128, 128, u.svgCardiacProminence, 'end');
      addCallout(112, 180, 124, 232, u.svgYolkSac, 'end');
      addCallout(218, 140, 236, 118, u.svgSomites, 'start');
      if (isLateEmbryo) {
        addCallout(162, 141, 236, 178, u.svgHandFootPlates, 'start');
      }
    } else {
      // Fetal Stages (Weeks 10–42):
      // Matches 3D Interactive & Photoreal Still 1-to-1:
      // - Discoid Chorionic Placenta on the LEFT
      // - Coiled 3-Vessel Helical Umbilical Cord curving from LEFT placenta to fetal navel
      // - Articulated Fetus on the RIGHT facing LEFT (with gentle -12° cradle tilt in late 3rd trimester)
      const isLateThirdTrimester = weekEntry.week >= 32;
      const fetalScale = 0.78 + ((weekEntry.week - 10) * 0.011);

      // Crimson Discoid Placenta along the LEFT Uterine Wall (matching 3D & Photoreal Still)
      svg.appendChild(createSvgEl('path', {
        d: 'M 96 76 Q 58 146 96 216',
        fill: 'rgba(185, 56, 56, 0.42)',
        stroke: '#C83E3E',
        'stroke-width': '14',
        'stroke-linecap': 'round'
      }));
      // Chorionic plate arborizing vessels on Left Placenta
      svg.appendChild(createSvgEl('path', {
        d: 'M 96 146 Q 82 114 92 88 M 96 146 Q 82 178 92 204',
        fill: 'none',
        stroke: '#FF9494',
        'stroke-width': '2'
      }));

      // 3-Vessel Helical Umbilical Cord (2 arteries + 1 vein) from LEFT Placenta to Fetal Navel
      svg.appendChild(createSvgEl('path', {
        d: 'M 98 146 C 124 122, 138 174, 158 148 C 170 134, 178 158, 190 162',
        fill: 'none',
        stroke: '#E88D8D',
        'stroke-width': '6',
        'stroke-linecap': 'round'
      }));
      svg.appendChild(createSvgEl('path', {
        d: 'M 98 146 C 124 122, 138 174, 158 148 C 170 134, 178 158, 190 162',
        fill: 'none',
        stroke: '#B91C1C',
        'stroke-width': '2',
        'stroke-dasharray': '5,4',
        'stroke-linecap': 'round'
      }));

      // Gentle cradle tilt (-12 deg) for Weeks 32+ matching 3D m4RotZ(0.22)
      const rotationDeg = isLateThirdTrimester ? -12 : 0;
      const fetusGroup = createSvgEl('g', {
        transform: 'translate(212, 148) rotate(' + rotationDeg + ') scale(' + fetalScale.toFixed(2) + ') translate(-212, -148)'
      });

      // Fetal Torso & Rounded Back on the RIGHT
      fetusGroup.appendChild(createSvgEl('path', {
        d: 'M 212 122 C 242 128, 246 178, 214 198 C 192 204, 182 176, 192 134 Z',
        fill: '#F4C2B0',
        stroke: '#FFE8DC',
        'stroke-width': '1.8'
      }));

      // Dorsal Vertebral Spine Column (Right side of torso)
      fetusGroup.appendChild(createSvgEl('path', {
        d: 'M 222 126 Q 236 160 218 192',
        fill: 'none',
        stroke: 'rgba(255, 241, 235, 0.65)',
        'stroke-width': '2.5',
        'stroke-dasharray': '3,3'
      }));

      // Fetal Cranium & Facial Profile facing LEFT
      fetusGroup.appendChild(createSvgEl('path', {
        d: 'M 186 98 C 180 74, 216 68, 228 88 C 236 102, 228 122, 210 124 C 194 124, 186 118, 184 110 C 179 108, 179 103, 186 98 Z',
        fill: '#F4C2B0',
        stroke: '#FFE8DC',
        'stroke-width': '1.8'
      }));

      // Cerebral Cortex / Developing Brain Schematic Indicator inside Cranium
      fetusGroup.appendChild(createSvgEl('path', {
        d: 'M 192 90 C 196 78, 218 78, 222 92 C 222 102, 204 104, 192 90 Z',
        fill: 'rgba(56, 178, 166, 0.28)',
        stroke: '#52B788',
        'stroke-width': '1.3'
      }));

      // External Ear Pinna on side of head
      fetusGroup.appendChild(createSvgEl('ellipse', {
        cx: 214, cy: 108, rx: 3.5, ry: 5.5,
        fill: '#E8A590',
        stroke: '#FFE8DC',
        'stroke-width': '1'
      }));

      // Peaceful Sleeping Eyelid Crease (matches 3D & Photoreal Still)
      fetusGroup.appendChild(createSvgEl('path', {
        d: 'M 189 102 Q 194 105 199 102',
        fill: 'none',
        stroke: '#6B3E31',
        'stroke-width': '1.8',
        'stroke-linecap': 'round'
      }));

      // 4-Chamber Fetal Heart & Hepatic (Liver) Silhouette inside Torso
      fetusGroup.appendChild(createSvgEl('circle', {
        cx: 204, cy: 146, r: 5.5,
        fill: '#DC2626',
        stroke: '#FFFFFF',
        'stroke-width': '1.3'
      }));
      fetusGroup.appendChild(createSvgEl('ellipse', {
        cx: 206, cy: 162, rx: 9, ry: 6,
        fill: 'rgba(185, 56, 56, 0.45)'
      }));

      // Flexed Upper Limb: Shoulder -> Elbow -> Forearm -> 5-Finger Hand over Chest
      fetusGroup.appendChild(createSvgEl('path', {
        d: 'M 214 136 Q 204 156 186 140',
        fill: 'none',
        stroke: '#F7CAB8',
        'stroke-width': '8.5',
        'stroke-linecap': 'round'
      }));
      fetusGroup.appendChild(createSvgEl('circle', {
        cx: 184, cy: 138, r: 5,
        fill: '#FFE8DC'
      }));

      // Flexed Lower Limb: Hip -> Thigh -> Knee -> Ankle -> 5-Toe Foot
      fetusGroup.appendChild(createSvgEl('path', {
        d: 'M 210 190 Q 178 176 172 196',
        fill: 'none',
        stroke: '#F7CAB8',
        'stroke-width': '10',
        'stroke-linecap': 'round'
      }));
      fetusGroup.appendChild(createSvgEl('ellipse', {
        cx: 168, cy: 196, rx: 7, ry: 4,
        fill: '#FFE8DC'
      }));

      svg.appendChild(fetusGroup);

      // Clinical Callouts matching 3D & Photoreal layout
      addCallout(78, 114, 72, 62, u.svgPlacenta, 'start');
      addCallout(142, 148, 152, 228, u.svgUmbilicalCord, 'end');
      addCallout(208, 84, 240, 62, u.svgCortex, 'start');
      addCallout(204, 146, 250, 146, u.svgHeart, 'start');
      addCallout(172, 196, 232, 228, isLateThirdTrimester ? u.svgLimbsTerm : u.svgLimbsFetal, 'start');
    }

    // Bottom SVG Annotation Caption
    const annotationText = createSvgEl('text', {
      x: 180,
      y: 288,
      'text-anchor': 'middle',
      fill: '#B6C8D1',
      'font-size': '10',
      'font-family': 'ui-monospace, SFMono-Regular, monospace'
    });
    const presentationNote = weekEntry.week >= 32 ? u.svgTermCradle : '';
    annotationText.textContent = weekEntry.biologicalStage + ' • ' + weekEntry.lengthMetric + presentationNote;
    svg.appendChild(annotationText);

    return svg;
  }

  /* ==========================================================================
     UI Chrome Localization Across All 8 Languages
     ========================================================================== */
  function applyLanguageChrome() {
    const u = ui();
    document.documentElement.lang = appState.lang;
    document.title = u.pageTitle;

    const langSelect = document.getElementById('language-select');
    if (langSelect) {
      langSelect.value = appState.lang;
      langSelect.setAttribute('aria-label', u.langAria);
    }

    setElText('skip-link-el', u.skipLink);
    setElText('app-title-el', u.appTitle);
    setElText('app-subtitle-el', u.appSubtitle);
    setElText('badge-acog-el', u.badgeAcog);
    setElText('lang-select-label', u.langLabel);

    setElText('tab-btn-atlas', u.tabAtlas);
    setElText('tab-btn-schedule', u.tabSchedule);
    setElText('tab-btn-triage', u.tabTriage);
    setElText('tab-btn-meds', u.tabMeds);

    setElText('dating-method-label', u.datingMethodLabel);
    setElText('opt-dating-lmp', u.datingLmp);
    setElText('opt-dating-edd', u.datingEdd);
    setElText('opt-dating-conception', u.datingConception);
    setElText('opt-dating-ivf5', u.datingIvf5);
    setElText('opt-dating-ivf3', u.datingIvf3);
    setElText('ref-date-label', u.refDateLabel);
    setElText('risk-profile-label', u.riskProfileLabel);
    setElText('opt-risk-standard', u.riskStandard);
    setElText('opt-risk-ama35', u.riskAma35);
    setElText('opt-risk-gdm', u.riskGdm);
    setElText('opt-risk-twins', u.riskTwins);

    setElText('btn-jump-current-week', u.btnJumpToday);
    setElText('btn-print-checklist', u.btnPrint);
    const printBtn = document.getElementById('btn-print-checklist');
    if (printBtn) printBtn.setAttribute('title', u.btnPrintTitle);
    setElText('btn-reset-data', u.btnReset);
    const resetBtn = document.getElementById('btn-reset-data');
    if (resetBtn) resetBtn.setAttribute('title', u.btnResetTitle);

    setElText('btn-tri-1', u.tri1Btn);
    setElText('btn-tri-2', u.tri2Btn);
    setElText('btn-tri-3', u.tri3Btn);
    setElText('btn-tri-4', u.tri4Btn);
    setElText('btn-prev-week', u.btnPrevWeek);
    const prevBtn = document.getElementById('btn-prev-week');
    if (prevBtn) prevBtn.setAttribute('aria-label', u.btnPrevWeekAria);
    setElText('btn-next-week', u.btnNextWeek);
    const nextBtn = document.getElementById('btn-next-week');
    if (nextBtn) nextBtn.setAttribute('aria-label', u.btnNextWeekAria);
    setElText('scrub-timeline-label', u.scrubTimelineLabel);
    setElText('legend-dot-text', u.legendDotText);
    setElText('legend-tip-text', u.legendTipText);

    const sliderEl = document.getElementById('week-range-slider');
    if (sliderEl) sliderEl.setAttribute('aria-label', u.sliderAria);

    setElText('btn-mode-3d', u.mode3d);
    setElText('btn-mode-photo', u.modePhoto);
    setElText('btn-mode-schematic', u.modeSchematic);

    setElText('btn-3d-kick', u.btnKick);
    const kickBtn = document.getElementById('btn-3d-kick');
    if (kickBtn) kickBtn.setAttribute('title', u.btnKickTitle);
    const audioBtn = document.getElementById('btn-3d-audio');
    if (audioBtn) audioBtn.setAttribute('title', u.btnAudioTitle);
    setElText('btn-3d-autorotate', u.btnAutoRotate);
    setElText('btn-3d-xray', u.btnXray);
    const xrayBtn = document.getElementById('btn-3d-xray');
    if (xrayBtn) xrayBtn.setAttribute('title', u.btnXrayTitle);
    setElText('btn-3d-sac', u.btnSac);
    const sacBtn = document.getElementById('btn-3d-sac');
    if (sacBtn) sacBtn.setAttribute('title', u.btnSacTitle);
    setElText('btn-3d-reset', u.btnResetView);
    setElText('viewer-hint', u.viewerHint);
    setElText('viewer-unsupported', u.viewerUnsupported);

    setElText('bio-stage-label', u.bioStageLabel);
    setElText('bio-length-label', u.bioLengthLabel);
    setElText('bio-weight-label', u.bioWeightLabel);
    setElText('bio-fhr-label', u.bioFhrLabel);

    setElText('sched-heading-el', u.schedHeading);
    setElText('sched-intro-el', u.schedIntro);
    setElText('sched-filter-all', u.schedFilterAll);
    setElText('sched-filter-1', u.schedFilter1);
    setElText('sched-filter-2', u.schedFilter2);
    setElText('sched-filter-3', u.schedFilter3);
    setElText('sched-filter-4', u.schedFilter4);

    setElText('triage-heading-el', u.triageHeading);
    setElText('triage-intro-el', u.triageIntro);
    setElText('tier-1-title-el', u.tier1Title);
    setElText('tier-1-desc-el', u.tier1Desc);
    setElText('tier-2-title-el', u.tier2Title);
    setElText('tier-2-desc-el', u.tier2Desc);
    setElText('tier-3-title-el', u.tier3Title);
    setElText('tier-3-desc-el', u.tier3Desc);
    setElText('opt-urg-all', u.urgencyAll);
    setElText('opt-urg-emergency', u.urgencyEmergency);
    setElText('opt-urg-urgent', u.urgencyUrgent);
    setElText('opt-urg-routine', u.urgencyRoutine);
    const symSearch = document.getElementById('symptom-search-input');
    if (symSearch) {
      symSearch.setAttribute('placeholder', u.symptomSearchPlaceholder);
      if (u.symptomSearchAria) symSearch.setAttribute('aria-label', u.symptomSearchAria);
    }
    const symUrgFilter = document.getElementById('symptom-urgency-filter');
    if (symUrgFilter && u.urgencyFilterAria) {
      symUrgFilter.setAttribute('aria-label', u.urgencyFilterAria);
    }

    setElText('meds-heading-el', u.medsHeading);
    setElText('meds-intro-el', u.medsIntro);
    setElText('opt-med-all', u.medFilterAll);
    setElText('opt-med-approved', u.medFilterApproved);
    setElText('opt-med-caution', u.medFilterCaution);
    setElText('opt-med-avoid', u.medFilterAvoid);
    const medSearch = document.getElementById('med-search-input');
    if (medSearch) {
      medSearch.setAttribute('placeholder', u.medSearchPlaceholder);
      if (u.medSearchAria) medSearch.setAttribute('aria-label', u.medSearchAria);
    }
    const medStatusFilter = document.getElementById('med-status-filter');
    if (medStatusFilter && u.medFilterAria) {
      medStatusFilter.setAttribute('aria-label', u.medFilterAria);
    }

    const navEl = document.querySelector('.primary-nav');
    if (navEl && u.navAria) navEl.setAttribute('aria-label', u.navAria);
    const persBar = document.querySelector('.personalization-bar');
    if (persBar && u.personalizationAria) persBar.setAttribute('aria-label', u.personalizationAria);
    const triPills = document.querySelector('.trimester-pills');
    if (triPills && u.trimesterJumpAria) triPills.setAttribute('aria-label', u.trimesterJumpAria);
    const weekStrip = document.getElementById('week-grid-strip');
    if (weekStrip && u.weekStripAria) weekStrip.setAttribute('aria-label', u.weekStripAria);
    const viewModeToggle = document.querySelector('.viewer-mode-toggle');
    if (viewModeToggle && u.viewModeAria) viewModeToggle.setAttribute('aria-label', u.viewModeAria);
    const viewerCtrls = document.querySelector('.viewer-overlay-controls');
    if (viewerCtrls && u.viewerControlsAria) viewerCtrls.setAttribute('aria-label', u.viewerControlsAria);
    const schedFilterBar = document.querySelector('.schedule-filter-bar');
    if (schedFilterBar && u.schedFilterAria) schedFilterBar.setAttribute('aria-label', u.schedFilterAria);
    const canvas3d = document.querySelector('#viewport-3d canvas');
    if (canvas3d && u.canvas3dAria) canvas3d.setAttribute('aria-label', u.canvas3dAria);
    const mode3dBtn = document.getElementById('btn-mode-3d');
    if (mode3dBtn && mode3dBtn.disabled && (u.webglTitle || u.viewerUnsupported)) {
      mode3dBtn.setAttribute('title', u.webglTitle || u.viewerUnsupported);
    }

    setElText('footer-disc-title', u.footerDisclaimerTitle);
    setElText('footer-disc-body', u.footerDisclaimerBody);
    setElText('footer-priv-title', u.footerPrivacyTitle);
    setElText('footer-priv-body', u.footerPrivacyBody);

    syncViewer3dOverlayButtons();
  }

  /* ==========================================================================
     UI Rendering: Personalization Summary & Week Scrubber
     ========================================================================== */
  function renderPersonalizationSummary() {
    recalculateGestationalTimeline();
    const u = ui();
    const summaryValEl = document.getElementById('personal-edd-summary');
    const gaValEl = document.getElementById('personal-ga-summary');
    const jumpTodayBtn = document.getElementById('btn-jump-current-week');

    if (!appState.eddEpochMs) {
      summaryValEl.textContent = u.enterDatePrompt;
      gaValEl.textContent = fmt(u.viewingWeekFmt, { w: appState.currentWeek });
      jumpTodayBtn.disabled = true;
      return;
    }

    summaryValEl.textContent = u.eddPrefix + formatShortDate(appState.eddEpochMs);
    const todayGa = getTodayGestationalAge();
    if (todayGa) {
      gaValEl.textContent = todayGa.formatted;
      jumpTodayBtn.disabled = false;
    } else {
      gaValEl.textContent = u.lmpPrefix + formatShortDate(appState.lmpEpochMs);
      jumpTodayBtn.disabled = true;
    }
  }

  function renderWeekScrubber() {
    const u = ui();
    const weeksData = window.CLINICAL_ATLAS_DATA.WEEKS_DATA;
    const stripEl = document.getElementById('week-grid-strip');
    const sliderEl = document.getElementById('week-range-slider');
    const sliderLabelEl = document.getElementById('week-slider-label');

    sliderEl.value = String(appState.currentWeek);
    sliderLabelEl.textContent = fmt(u.weekOf42Fmt, { w: appState.currentWeek });

    const fragment = document.createDocumentFragment();
    for (let i = 0; i < weeksData.length; i += 1) {
      const rawItem = weeksData[i];
      const item = window.CLINICAL_I18N.localizeWeekEntry(rawItem, appState.lang);
      const chip = createEl('button', 'week-chip', item.week);
      chip.type = 'button';
      if (item.week === appState.currentWeek) {
        chip.classList.add('is-selected');
        chip.setAttribute('aria-current', 'step');
      }
      if (item.hasScheduledVisit) {
        chip.classList.add('has-appointment');
      }
      chip.setAttribute(
        'aria-label',
        fmt(u.weekChipAriaFmt, {
          w: item.week,
          title: item.stageTitle,
          visit: item.hasScheduledVisit ? u.weekChipVisitSuffix : ''
        })
      );
      chip.addEventListener('click', function onSelectWeek() {
        setSelectedWeek(item.week);
      });
      fragment.appendChild(chip);
    }
    stripEl.replaceChildren(fragment);

    // Update active state on Trimester Quick-Jump Buttons
    const currentEntry = weeksData[appState.currentWeek - 1];
    const triButtons = document.querySelectorAll('[data-trimester-jump]');
    for (let j = 0; j < triButtons.length; j += 1) {
      const btn = triButtons[j];
      const triNum = Number(btn.getAttribute('data-trimester-jump'));
      if (triNum === currentEntry.trimester) {
        btn.classList.add('is-active');
      } else {
        btn.classList.remove('is-active');
      }
    }
  }

  /* ==========================================================================
     UI Rendering: Tab 1 — Week-by-Week Clinical Atlas
     ========================================================================== */
  function renderAtlasView() {
    const u = ui();
    const weeksData = window.CLINICAL_ATLAS_DATA.WEEKS_DATA;
    const rawEntry = weeksData[appState.currentWeek - 1];
    if (!rawEntry) return;
    const entry = window.CLINICAL_I18N.localizeWeekEntry(rawEntry, appState.lang);

    // 1. Update Left Column: Anatomical Stage & Biometrics
    document.getElementById('stage-week-badge').textContent = fmt(u.weekBadgeFmt, {
      w: entry.week,
      phase: entry.phaseLabel
    });
    document.getElementById('stage-title-heading').textContent = entry.stageTitle;

    const dateWin = getWeekCalendarWindow(entry.week);
    const dateWinEl = document.getElementById('stage-date-window');
    if (dateWin) {
      dateWinEl.textContent = dateWin.label;
    } else {
      dateWinEl.textContent = fmt(u.daysOfGestationFmt, {
        d1: (entry.week - 1) * 7 + 1,
        d2: entry.week * 7
      });
    }

    updateVisualizer(entry);

    document.getElementById('bio-stage').textContent = entry.biologicalStage;
    document.getElementById('bio-length').textContent = entry.lengthMetric;
    document.getElementById('bio-weight').textContent = entry.weightMetric;
    document.getElementById('bio-fhr').textContent = entry.heartRateBpm;

    const organBar = document.getElementById('organ-tags-bar');
    const organFrag = document.createDocumentFragment();
    const labelSpan = createEl('span', 'biometric-label mb-0', u.activeSystemsLabel);
    organFrag.appendChild(labelSpan);

    for (let i = 0; i < entry.keyOrgans.length; i += 1) {
      organFrag.appendChild(createEl('span', 'organ-tag', entry.keyOrgans[i]));
    }
    organBar.replaceChildren(organFrag);

    // 2. Update Right Column: Clinical Briefing Cards
    const rightStack = document.getElementById('clinical-details-stack');
    const stackFrag = document.createDocumentFragment();

    // Card A: Doctor Check-In & Prenatal Care Guidance for This Week
    const visitCard = createEl('article', 'clinical-card' + (entry.hasScheduledVisit ? ' is-doctor-alert' : ''));
    const visitEyebrow = createEl(
      'div',
      'card-eyebrow' + (entry.hasScheduledVisit ? ' eyebrow-visit' : ''),
      entry.hasScheduledVisit ? u.scheduledVisitEyebrow : u.routineCheckInEyebrow
    );
    const visitHeading = createEl('h3', '', fmt(u.whenToCheckInFmt, { w: entry.week }));
    const visitBody = createEl('p', 'mt-2', entry.doctorCheckIn);
    visitCard.appendChild(visitEyebrow);
    visitCard.appendChild(visitHeading);
    visitCard.appendChild(visitBody);

    // Risk-profile dynamic note if user selected AMA 35+, GDM/High-Risk, or Twins
    if (appState.riskProfile !== 'standard') {
      const riskNote = createEl('div', 'high-risk-callout');
      if (appState.riskProfile === 'ama35') {
        riskNote.textContent = u.riskOverlayAma35;
      } else if (appState.riskProfile === 'gdm_highrisk') {
        riskNote.textContent = u.riskOverlayGdm;
      } else if (appState.riskProfile === 'twins') {
        riskNote.textContent = u.riskOverlayTwins;
      }
      visitCard.appendChild(riskNote);
    }
    stackFrag.appendChild(visitCard);

    // Card B: Embryological & Fetal Organogenesis Milestones
    const milestonesCard = createEl('article', 'clinical-card');
    milestonesCard.appendChild(createEl('div', 'card-eyebrow', u.embryologyEyebrow));
    milestonesCard.appendChild(createEl('h3', '', fmt(u.whatIsDevelopingFmt, { w: entry.week })));
    const ul = createEl('ul', 'milestone-list');
    for (let m = 0; m < entry.fetalMilestones.length; m += 1) {
      ul.appendChild(createEl('li', '', entry.fetalMilestones[m]));
    }
    milestonesCard.appendChild(ul);
    stackFrag.appendChild(milestonesCard);

    // Card C: Maternal Physiology & Evidence-Based MD Pearl
    const maternalCard = createEl('article', 'clinical-card is-pearl');
    maternalCard.appendChild(createEl('div', 'card-eyebrow', u.maternalEyebrow));
    maternalCard.appendChild(createEl('h3', '', u.maternalHeading));
    const matPara = createEl('p', 'mt-2', entry.maternalPhysiology);
    const pearlPara = createEl('p', 'pearl-copy', u.pearlPrefix + entry.clinicalPearl);
    maternalCard.appendChild(matPara);
    maternalCard.appendChild(pearlPara);
    stackFrag.appendChild(maternalCard);

    rightStack.replaceChildren(stackFrag);
  }

  /* ==========================================================================
     UI Rendering: Tab 2 — Complete ACOG Appointment Roadmap
     ========================================================================== */
  function renderScheduleView() {
    const u = ui();
    const appointments = window.CLINICAL_ATLAS_DATA.ACOG_APPOINTMENTS;
    const container = document.getElementById('appointments-timeline-list');
    const frag = document.createDocumentFragment();

    for (let i = 0; i < appointments.length; i += 1) {
      const rawAppt = appointments[i];
      if (appState.scheduleTrimesterFilter !== 'all' && String(rawAppt.trimester) !== appState.scheduleTrimesterFilter) {
        continue;
      }
      const appt = window.CLINICAL_I18N.localizeAppointment(rawAppt, appState.lang);

      const isCompleted = appState.completedVisits[appt.id] === true;
      const isCurrentWindow = appState.currentWeek >= appt.weekStart && appState.currentWeek <= appt.weekEnd;

      let cardClasses = 'appointment-card';
      if (isCompleted) cardClasses += ' is-completed';
      if (isCurrentWindow) cardClasses += ' is-current-window';

      const card = createEl('article', cardClasses);

      // Left Meta Column
      const metaCol = createEl('div', 'appt-meta-col');
      const topMeta = createEl('div', '');
      const weekLabel = appt.weekStart === appt.weekEnd
        ? fmt(u.apptWeekSingleFmt, { w: appt.weekStart })
        : fmt(u.apptWeekRangeFmt, { w1: appt.weekStart, w2: appt.weekEnd });
      topMeta.appendChild(createEl('span', 'appt-week-pill', weekLabel));

      const cadenceEl = createEl('div', 'text-xs-muted mt-1', u.cadencePrefix + appt.cadenceLabel);
      topMeta.appendChild(cadenceEl);

      if (appState.lmpEpochMs) {
        const startWin = getWeekCalendarWindow(appt.weekStart);
        const endWin = getWeekCalendarWindow(appt.weekEnd);
        if (startWin && endWin) {
          const calDateEl = createEl(
            'div',
            'appt-calendar-date mt-1',
            formatShortDate(startWin.startMs) + ' – ' + formatShortDate(endWin.endMs)
          );
          topMeta.appendChild(calDateEl);
        }
      }
      metaCol.appendChild(topMeta);

      // Completion Checkbox + Jump to Week Button
      const bottomActions = createEl('div', '');
      const checkLabel = createEl('label', 'appt-check-label');
      const checkInput = createEl('input', 'appt-check-input');
      checkInput.type = 'checkbox';
      checkInput.checked = isCompleted;
      checkInput.addEventListener('change', function onToggleVisit() {
        if (checkInput.checked) {
          appState.completedVisits[appt.id] = true;
        } else {
          delete appState.completedVisits[appt.id];
        }
        savePreferences();
        renderScheduleView();
      });
      checkLabel.appendChild(checkInput);
      checkLabel.appendChild(createEl('span', '', isCompleted ? u.completedLabel : u.markCompletedLabel));
      bottomActions.appendChild(checkLabel);

      const viewWeekBtn = createEl('button', 'btn mt-2 w-full', fmt(u.inspectWeekFmt, { w: appt.weekStart }));
      viewWeekBtn.type = 'button';
      viewWeekBtn.addEventListener('click', function onJumpToApptWeek() {
        setSelectedWeek(appt.weekStart);
        switchTab('tab-atlas');
      });
      bottomActions.appendChild(viewWeekBtn);

      metaCol.appendChild(bottomActions);
      card.appendChild(metaCol);

      // Right Content Column
      const contentCol = createEl('div', '');
      contentCol.appendChild(createEl('h3', '', appt.title));
      const sumP = createEl('p', 'text-sm-secondary mt-1', appt.summary);
      contentCol.appendChild(sumP);

      const detailsGrid = createEl('div', 'appt-details-grid');

      // Procedures Subbox
      const procBox = createEl('div', 'appt-subbox');
      procBox.appendChild(createEl('div', 'appt-subbox-title', u.procSubboxTitle));
      const procList = createEl('ul', 'milestone-list');
      for (let p = 0; p < appt.procedures.length; p += 1) {
        procList.appendChild(createEl('li', '', appt.procedures[p]));
      }
      procBox.appendChild(procList);
      detailsGrid.appendChild(procBox);

      // Questions to Ask Subbox
      const qBox = createEl('div', 'appt-subbox');
      qBox.appendChild(createEl('div', 'appt-subbox-title', u.questionsSubboxTitle));
      const qList = createEl('ul', 'milestone-list');
      for (let q = 0; q < appt.questionsToAsk.length; q += 1) {
        qList.appendChild(createEl('li', '', appt.questionsToAsk[q]));
      }
      qBox.appendChild(qList);
      detailsGrid.appendChild(qBox);

      contentCol.appendChild(detailsGrid);

      // High-Risk / 35+ Callout
      const hrCallout = createEl('div', 'high-risk-callout', u.highRiskPrefix + appt.highRiskAddition);
      contentCol.appendChild(hrCallout);

      card.appendChild(contentCol);
      frag.appendChild(card);
    }

    container.replaceChildren(frag);
  }

  /* ==========================================================================
     UI Rendering: Tab 3 — Red-Flag Symptom Triage
     ========================================================================== */
  function renderSymptomTriageView() {
    const u = ui();
    const symptoms = window.CLINICAL_ATLAS_DATA.SYMPTOM_TRIAGE;
    const container = document.getElementById('symptom-cards-grid');
    const frag = document.createDocumentFragment();
    const query = appState.symptomSearchQuery.trim().toLowerCase();

    let matchCount = 0;
    for (let i = 0; i < symptoms.length; i += 1) {
      const rawSym = symptoms[i];
      if (appState.symptomUrgencyFilter !== 'all' && rawSym.urgency !== appState.symptomUrgencyFilter) {
        continue;
      }
      const sym = window.CLINICAL_I18N.localizeSymptom(rawSym, appState.lang);
      if (query) {
        const haystack = (
          sym.title + ' ' +
          sym.clinicalExplanation + ' ' +
          sym.actionSteps + ' ' +
          sym.trimesterScope + ' ' +
          rawSym.title + ' ' +
          rawSym.clinicalExplanation
        ).toLowerCase();
        if (haystack.indexOf(query) === -1) {
          continue;
        }
      }
      matchCount += 1;

      const card = createEl('article', 'symptom-card urgency-' + sym.urgency);
      const badge = createEl('span', 'urgency-badge urgency-' + sym.urgency, sym.urgencyLabel);
      const scopeEl = createEl('div', 'text-xs-muted-bold', u.timingPrefix + sym.trimesterScope);

      const titleEl = createEl('h3', '', sym.title);
      const expEl = createEl('p', 'text-sm-secondary', sym.clinicalExplanation);
      const actionEl = createEl('p', 'text-sm-bold mt-1', u.actionProtocolPrefix + sym.actionSteps);

      card.appendChild(badge);
      card.appendChild(scopeEl);
      card.appendChild(titleEl);
      card.appendChild(expEl);
      card.appendChild(actionEl);
      frag.appendChild(card);
    }

    if (matchCount === 0) {
      const emptyBox = createEl('div', 'clinical-card', u.noSymptomsMatch);
      frag.appendChild(emptyBox);
    }

    container.replaceChildren(frag);
  }

  /* ==========================================================================
     UI Rendering: Tab 4 — Medication, Supplement & Food Safety Lookup
     ========================================================================== */
  function renderMedicationSafetyView() {
    const u = ui();
    const items = window.CLINICAL_ATLAS_DATA.SAFETY_DATABASE;
    const container = document.getElementById('med-cards-grid');
    const frag = document.createDocumentFragment();
    const query = appState.medSearchQuery.trim().toLowerCase();

    let matchCount = 0;
    for (let i = 0; i < items.length; i += 1) {
      const rawItem = items[i];
      if (appState.medStatusFilter !== 'all' && rawItem.status !== appState.medStatusFilter) {
        continue;
      }
      const item = window.CLINICAL_I18N.localizeMedItem(rawItem, appState.lang);
      if (query) {
        const haystack = (
          item.name + ' ' +
          item.category + ' ' +
          item.clinicalGuidance + ' ' +
          item.dosageNote + ' ' +
          rawItem.name + ' ' +
          rawItem.category
        ).toLowerCase();
        if (haystack.indexOf(query) === -1) {
          continue;
        }
      }
      matchCount += 1;

      let urgencyClass = 'routine';
      if (item.status === 'avoid') urgencyClass = 'emergency';
      if (item.status === 'caution') urgencyClass = 'urgent';

      const card = createEl('article', 'symptom-card urgency-' + urgencyClass);
      const badge = createEl('span', 'urgency-badge urgency-' + urgencyClass, item.statusLabel);
      const catEl = createEl('div', 'text-xs-muted-bold', u.categoryPrefix + item.category);

      const titleEl = createEl('h3', '', item.name);
      const doseEl = createEl('p', 'text-sm-bold', u.dosingPrefix + item.dosageNote);
      const guideEl = createEl('p', 'text-sm-secondary', item.clinicalGuidance);

      card.appendChild(badge);
      card.appendChild(catEl);
      card.appendChild(titleEl);
      card.appendChild(doseEl);
      card.appendChild(guideEl);
      frag.appendChild(card);
    }

    if (matchCount === 0) {
      const emptyBox = createEl('div', 'clinical-card', u.noMedsMatch);
      frag.appendChild(emptyBox);
    }

    container.replaceChildren(frag);
  }

  /* ==========================================================================
     Interactive Navigation & Event Wiring
     ========================================================================== */
  function setLanguage(langCode) {
    if (ALLOWED_LANGUAGES.indexOf(langCode) === -1) return;
    appState.lang = langCode;
    savePreferences();
    writeStateToUrl();
    applyLanguageChrome();
    renderPersonalizationSummary();
    renderWeekScrubber();
    renderAtlasView();
    renderScheduleView();
    renderSymptomTriageView();
    renderMedicationSafetyView();
  }

  function setSelectedWeek(weekNum) {
    const clamped = Math.max(1, Math.min(42, Math.floor(Number(weekNum) || 1)));
    appState.currentWeek = clamped;
    savePreferences();
    writeStateToUrl();
    renderPersonalizationSummary();
    renderWeekScrubber();
    renderAtlasView();
    renderScheduleView();
  }

  function switchTab(targetTabId) {
    if (ALLOWED_TABS.indexOf(targetTabId) === -1) return;
    appState.activeTab = targetTabId;

    const tabs = document.querySelectorAll('[data-tab-target]');
    for (let i = 0; i < tabs.length; i += 1) {
      const tabBtn = tabs[i];
      const isSelected = tabBtn.getAttribute('data-tab-target') === targetTabId;
      tabBtn.setAttribute('aria-selected', isSelected ? 'true' : 'false');
    }

    const panels = document.querySelectorAll('.tab-panel');
    for (let j = 0; j < panels.length; j += 1) {
      const panel = panels[j];
      if (panel.id === targetTabId) {
        panel.classList.add('is-active');
      } else {
        panel.classList.remove('is-active');
      }
    }
    syncViewerActivity();
  }

  function bindVisualizerControls() {
    const modeBtns = document.querySelectorAll('[data-view-mode]');
    for (let i = 0; i < modeBtns.length; i += 1) {
      modeBtns[i].addEventListener('click', function onModeClick(e) {
        setViewMode(e.currentTarget.getAttribute('data-view-mode'));
      });
    }
    const kickBtn = document.getElementById('btn-3d-kick');
    if (kickBtn) {
      kickBtn.addEventListener('click', function onKickClick() {
        if (!viewer3d || !viewer3d.supported) return;
        viewer3d.triggerKick();
      });
    }
    const audioBtn = document.getElementById('btn-3d-audio');
    if (audioBtn) {
      audioBtn.addEventListener('click', function onAudioClick() {
        if (!viewer3d || !viewer3d.supported) return;
        viewer3d.toggleAudio();
        syncViewer3dOverlayButtons();
      });
    }
    document.getElementById('btn-3d-autorotate').addEventListener('click', function onAutoRotate() {
      if (!viewer3d || !viewer3d.supported) return;
      viewer3d.setOptions({ autoRotate: !viewer3d.getState().autoRotate });
      syncViewer3dOverlayButtons();
    });
    document.getElementById('btn-3d-xray').addEventListener('click', function onXray() {
      if (!viewer3d || !viewer3d.supported) return;
      viewer3d.setOptions({ xray: !viewer3d.getState().xray });
      syncViewer3dOverlayButtons();
    });
    document.getElementById('btn-3d-sac').addEventListener('click', function onSac() {
      if (!viewer3d || !viewer3d.supported) return;
      viewer3d.setOptions({ showSac: !viewer3d.getState().showSac });
      syncViewer3dOverlayButtons();
    });
    document.getElementById('btn-3d-reset').addEventListener('click', function onResetView() {
      if (!viewer3d || !viewer3d.supported) return;
      viewer3d.resetView();
    });
  }

  function bindEventListeners() {
    // Language Switcher
    const langSelect = document.getElementById('language-select');
    if (langSelect) {
      langSelect.value = appState.lang;
      langSelect.addEventListener('change', function onLangChange() {
        setLanguage(langSelect.value);
      });
    }

    // Primary Navigation Tabs
    const tabBtns = document.querySelectorAll('[data-tab-target]');
    for (let i = 0; i < tabBtns.length; i += 1) {
      tabBtns[i].addEventListener('click', function onTabClick(e) {
        const target = e.currentTarget.getAttribute('data-tab-target');
        switchTab(target);
      });
    }

    // Personalization Controls
    const methodSelect = document.getElementById('dating-method-select');
    const dateInput = document.getElementById('reference-date-input');
    const riskSelect = document.getElementById('risk-profile-select');

    methodSelect.value = appState.datingMethod;
    dateInput.value = appState.referenceDateStr;
    riskSelect.value = appState.riskProfile;

    methodSelect.addEventListener('change', function onMethodChange() {
      if (ALLOWED_DATING_METHODS.indexOf(methodSelect.value) !== -1) {
        appState.datingMethod = methodSelect.value;
        savePreferences();
        renderPersonalizationSummary();
        renderAtlasView();
        renderScheduleView();
      }
    });

    dateInput.addEventListener('change', function onDateChange() {
      const val = dateInput.value;
      if (val === '' || /^\d{4}-\d{2}-\d{2}$/.test(val)) {
        appState.referenceDateStr = val;
        savePreferences();
        renderPersonalizationSummary();
        const todayGa = getTodayGestationalAge();
        if (todayGa) {
          setSelectedWeek(todayGa.activeWeekNumber);
        } else {
          renderAtlasView();
          renderScheduleView();
        }
      }
    });

    riskSelect.addEventListener('change', function onRiskChange() {
      if (ALLOWED_RISK_PROFILES.indexOf(riskSelect.value) !== -1) {
        appState.riskProfile = riskSelect.value;
        savePreferences();
        renderAtlasView();
      }
    });

    document.getElementById('btn-jump-current-week').addEventListener('click', function onJumpToday() {
      const todayGa = getTodayGestationalAge();
      if (todayGa) {
        setSelectedWeek(todayGa.activeWeekNumber);
      }
    });

    document.getElementById('btn-print-checklist').addEventListener('click', function onPrint() {
      window.print();
    });

    document.getElementById('btn-reset-data').addEventListener('click', function onReset() {
      clearAllLocalPreferences();
    });

    // Week Scrubber Controls
    document.getElementById('btn-prev-week').addEventListener('click', function onPrevWeek() {
      setSelectedWeek(appState.currentWeek - 1);
    });
    document.getElementById('btn-next-week').addEventListener('click', function onNextWeek() {
      setSelectedWeek(appState.currentWeek + 1);
    });
    document.getElementById('week-range-slider').addEventListener('input', function onSlide(e) {
      setSelectedWeek(Number(e.target.value));
    });

    // Trimester Quick-Jump Buttons
    const triJumpBtns = document.querySelectorAll('[data-trimester-start]');
    for (let t = 0; t < triJumpBtns.length; t += 1) {
      triJumpBtns[t].addEventListener('click', function onTriJump(e) {
        const targetWeek = Number(e.currentTarget.getAttribute('data-trimester-start'));
        setSelectedWeek(targetWeek);
      });
    }

    // Schedule Trimester Filters
    const schedFilterBtns = document.querySelectorAll('[data-sched-filter]');
    for (let s = 0; s < schedFilterBtns.length; s += 1) {
      schedFilterBtns[s].addEventListener('click', function onSchedFilter(e) {
        appState.scheduleTrimesterFilter = e.currentTarget.getAttribute('data-sched-filter');
        for (let k = 0; k < schedFilterBtns.length; k += 1) {
          schedFilterBtns[k].classList.remove('is-active');
        }
        e.currentTarget.classList.add('is-active');
        renderScheduleView();
      });
    }

    // Symptom Triage Filters & Search
    const symUrgencySelect = document.getElementById('symptom-urgency-filter');
    const symSearchInput = document.getElementById('symptom-search-input');
    symUrgencySelect.addEventListener('change', function onSymUrgency() {
      appState.symptomUrgencyFilter = symUrgencySelect.value;
      renderSymptomTriageView();
    });
    symSearchInput.addEventListener('input', function onSymSearch() {
      appState.symptomSearchQuery = symSearchInput.value.slice(0, 100);
      renderSymptomTriageView();
    });

    // Medication Safety Filters & Search
    const medStatusSelect = document.getElementById('med-status-filter');
    const medSearchInput = document.getElementById('med-search-input');
    medStatusSelect.addEventListener('change', function onMedStatus() {
      appState.medStatusFilter = medStatusSelect.value;
      renderMedicationSafetyView();
    });
    medSearchInput.addEventListener('input', function onMedSearch() {
      appState.medSearchQuery = medSearchInput.value.slice(0, 100);
      renderMedicationSafetyView();
    });
  }

  document.addEventListener('DOMContentLoaded', function onReady() {
    loadPreferences();
    const urlLang = readLangFromUrl();
    if (urlLang !== null) appState.lang = urlLang;
    const urlWeek = readWeekFromUrl();
    if (urlWeek !== null) appState.currentWeek = urlWeek;
    const urlMode = readModeFromUrl();
    if (urlMode !== null) appState.viewMode = urlMode;
    initViewer3d();
    bindEventListeners();
    bindVisualizerControls();
    applyLanguageChrome();
    renderPersonalizationSummary();
    renderWeekScrubber();
    applyViewMode();
    renderAtlasView();
    renderScheduleView();
    renderSymptomTriageView();
    renderMedicationSafetyView();
  });
})();
