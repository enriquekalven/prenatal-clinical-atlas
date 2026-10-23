/**
 * Multilingual Localization & Clinical Medical Terminology Engine (Complete 8-Language Edition)
 * Supported Languages (Allow-listed):
 * - en: English
 * - es: Español (Spanish)
 * - zh: 中文 (Simplified Chinese)
 * - pt: Português (Portuguese)
 * - ja: 日本語 (Japanese)
 * - ko: 한국어 (Korean)
 * - it: Italiano (Italian)
 * - fr: Français (French)
 *
 * Architecture Note:
 * - All clinical content (weeks 1..42, 15 ACOG appointments, 11 symptom triage cards,
 *   10 medication/nutrition safety items, and 9 photorealistic stills) is indexed by
 *   stable ID keys (zero fragile substring replacement on clinical prose).
 * - Security Note: All localized strings are rendered strictly via textContent / setAttribute
 *   (zero innerHTML / outerHTML / insertAdjacentHTML / document.write).
 */
(function initI18nModule(globalScope) {
  'use strict';

  const I18N_BUNDLE = {
  "SUPPORTED_LANGUAGES": [
    {
      "code": "en",
      "label": "English (EN)",
      "locale": "en-US"
    },
    {
      "code": "es",
      "label": "Español (ES)",
      "locale": "es-ES"
    },
    {
      "code": "zh",
      "label": "中文 (ZH)",
      "locale": "zh-CN"
    },
    {
      "code": "pt",
      "label": "Português (PT)",
      "locale": "pt-BR"
    },
    {
      "code": "ja",
      "label": "日本語 (JA)",
      "locale": "ja-JP"
    },
    {
      "code": "ko",
      "label": "한국어 (KO)",
      "locale": "ko-KR"
    },
    {
      "code": "it",
      "label": "Italiano (IT)",
      "locale": "it-IT"
    },
    {
      "code": "fr",
      "label": "Français (FR)",
      "locale": "fr-FR"
    }
  ],
  "UI_STRINGS": {
    "en": {
      "pageTitle": "Prenatal Clinical Atlas — Interactive Conception-to-Birthday OB/GYN Reference (Weeks 1–42)",
      "skipLink": "Skip to main clinical content",
      "appTitle": "Prenatal Clinical Atlas",
      "appSubtitle": "Conception-to-Birthday Interactive OB/GYN & Embryology Reference",
      "badgeAcog": "ACOG / SMFM Aligned • Weeks 1–42",
      "langLabel": "Language",
      "langAria": "Select clinical interface language",
      "tabAtlas": "1. Week-by-Week Atlas (W1–42)",
      "tabSchedule": "2. Doctor Appointments & Labs (15 Visits)",
      "tabTriage": "3. Red-Flag Symptom Triage",
      "tabMeds": "4. Safe Meds & Nutrition Lookup",
      "datingMethodLabel": "Dating Method",
      "datingLmp": "First Day of Last Period (LMP)",
      "datingEdd": "Estimated Due Date (Ultrasound EDD)",
      "datingConception": "Ovulation / Conception Date",
      "datingIvf5": "IVF Day-5 Blastocyst Transfer Date",
      "datingIvf3": "IVF Day-3 Embryo Transfer Date",
      "refDateLabel": "Reference Date (Auto-Maps Calendar)",
      "riskProfileLabel": "Clinical Care Pathway Overlay",
      "riskStandard": "Standard Low-Risk Singleton (ACOG)",
      "riskAma35": "Advanced Maternal Age (35+ / AMA Overlay)",
      "riskGdm": "High-Risk / Gestational Diabetes / HTN",
      "riskTwins": "Twin / Multiples Gestation Protocol",
      "enterDatePrompt": "Enter date to map calendar",
      "viewingWeekFmt": "Viewing Week {w} of 42",
      "todayFmt": "Today: {w}w {d}d (Week {aw})",
      "eddPrefix": "EDD: ",
      "lmpPrefix": "LMP: ",
      "btnJumpToday": "Jump to My Current Week",
      "btnPrint": "Print Clinical Summary",
      "btnPrintTitle": "Print Personalized Schedule & Checklist",
      "btnReset": "Reset",
      "btnResetTitle": "Reset saved dates and checkboxes",
      "tri1Btn": "Periconception & 1st Trimester (W1–13)",
      "tri2Btn": "2nd Trimester (W14–27)",
      "tri3Btn": "3rd Trimester (W28–40)",
      "tri4Btn": "Late-Term & Delivery (W41–42)",
      "btnPrevWeek": "← Prev Week",
      "btnPrevWeekAria": "Previous gestational week",
      "btnNextWeek": "Next Week →",
      "btnNextWeekAria": "Next gestational week",
      "weekOf42Fmt": "Week {w} of 42",
      "weekBadgeFmt": "WEEK {w} • {phase}",
      "weekChipAriaFmt": "Week {w}: {title}{visit}",
      "weekChipVisitSuffix": " (Doctor appointment window)",
      "scrubTimelineLabel": "Scrub Timeline:",
      "sliderAria": "Select gestational week from 1 to 42",
      "legendDotText": "Orange dot indicates a scheduled ACOG OB/Midwife appointment, lab, vaccine, or ultrasound window",
      "legendTipText": "Tip: Use the slider, click any week number (1–42), or enter your LMP/Due Date above to map exact calendar dates.",
      "daysOfGestationFmt": "Days {d1}–{d2} of Gestation",
      "mode3d": "3D Interactive",
      "modePhoto": "Photoreal Still",
      "modeSchematic": "Schematic",
      "btnKick": "Gentle Kick",
      "btnKickTitle": "Tap the womb to trigger a fetal stretch and kick reflex (Shortcut: K)",
      "btnAudioOff": "Doppler Audio",
      "btnAudioOn": "Doppler: ON",
      "btnAudioTitle": "Listen to synthesized OB ultrasound Doppler heartbeat audio at this week's exact BPM",
      "btnAutoRotate": "Auto-rotate",
      "btnXray": "X-Ray",
      "btnXrayTitle": "See the beating heart, liver, brain and spine through translucent skin",
      "btnSac": "Sac",
      "btnSacTitle": "Show or hide the amniotic sac and uterine wall",
      "btnResetView": "Reset View",
      "viewerHint": "Drag to rotate • Scroll/pinch to zoom • Click baby or press K for a Gentle Kick • Doppler Audio plays live FHR",
      "sculptingFmt": "Sculpting Week {w} anatomy…",
      "viewerUnsupported": "Interactive 3D requires WebGL, which this browser has disabled. Showing the schematic and photoreal views instead.",
      "fhrActiveFmt": "FHR {bpm} BPM • In-Utero Active",
      "fhrPreCardiac": "Pre-Cardiac Cleavage / Implantation",
      "bioStageLabel": "Developmental Stage",
      "bioLengthLabel": "Length (CRL / CHL)",
      "bioWeightLabel": "Estimated Weight",
      "bioFhrLabel": "Expected Heart Rate",
      "activeSystemsLabel": "Active Systems:",
      "scheduledVisitEyebrow": "● Scheduled OB/Midwife Appointment Window",
      "routineCheckInEyebrow": "○ Clinical Check-In & Care Guidance",
      "whenToCheckInFmt": "When to Check In with Your Doctor (Week {w})",
      "embryologyEyebrow": "Embryology & Organ System Maturation",
      "whatIsDevelopingFmt": "What Is Developing in Week {w}",
      "maternalEyebrow": "Maternal Physiology & Physician Pearl",
      "maternalHeading": "Maternal Changes & Evidence-Based Context",
      "pearlPrefix": "MD Clinical Pearl: ",
      "riskOverlayAma35": "AMA (35+) Clinical Overlay: Discuss 81 mg low-dose aspirin prophylaxis starting at Week 12, detailed Level II anatomy scan at Week 20, third-trimester growth scan at Week 32, weekly NST/BPP antenatal surveillance starting at Week 32–36, and delivery timing by 39w0d–39w6d.",
      "riskOverlayGdm": "High-Risk / GDM / HTN Overlay: Includes early 1st-trimester glucose/HbA1c baseline, low-dose aspirin at Week 12 (continued through delivery), serial monthly fetal growth ultrasounds (Weeks 28, 32, 36), and twice-weekly NST/AFI starting at Week 32.",
      "riskOverlayTwins": "Twin / Multiples Overlay: Determine chorionicity (dichorionic vs. monochorionic) on first-trimester ultrasound; low-dose aspirin at Week 12; serial growth scans every 2–4 weeks; and planned delivery between 36w0d–38w0d depending on chorionicity.",
      "schedHeading": "ACOG Prenatal Care Roadmap (Weeks 6–42)",
      "schedIntro": "Standard obstetric visit cadence: Every 4 weeks (Weeks 4–28), Every 2 weeks (Weeks 28–36), and Weekly (Weeks 36–41), plus twice-weekly late-term NST/BPP surveillance at Week 41+. Check off visits as you complete them.",
      "schedFilterAll": "All 15 Visits",
      "schedFilter1": "1st Trimester (W6–13)",
      "schedFilter2": "2nd Trimester (W14–28)",
      "schedFilter3": "3rd Trimester (W30–40)",
      "schedFilter4": "Late-Term (W41–42)",
      "apptWeekSingleFmt": "Week {w}",
      "apptWeekRangeFmt": "Weeks {w1}–{w2}",
      "cadencePrefix": "Cadence: ",
      "completedLabel": "Completed",
      "markCompletedLabel": "Mark Completed",
      "inspectWeekFmt": "Inspect Week {w} in Atlas →",
      "procSubboxTitle": "Clinical Exams, Labs, Scans & Vaccines",
      "questionsSubboxTitle": "Questions to Ask Your OB / Midwife",
      "highRiskPrefix": "High-Risk / 35+ / Multiples Protocol: ",
      "triageHeading": "Obstetric Symptom Triage: When to Call OB vs. Go to L&D Immediately",
      "triageIntro": "Distinguishing normal maternal physiological adaptations from urgent obstetric warning signs. When in doubt, Labor & Delivery triage and your on-call OB/Midwife prefer you call early.",
      "tier1Title": "1. Immediate L&D / Emergency (Red)",
      "tier1Desc": "Proceed directly to Labor & Delivery Triage (if ≥20 weeks) or the nearest Emergency Department. Do not wait for a callback.",
      "tier2Title": "2. Same-Day OB Call Within 1–4 Hours (Amber)",
      "tier2Desc": "Page your OB/Midwife on-call line today for targeted lab work, fetal monitoring, or prescription treatment.",
      "tier3Title": "3. Physiological Adaptation (Green)",
      "tier3Desc": "Expected hormonal or biomechanical changes of pregnancy that can be managed safely at home and discussed at your next scheduled visit.",
      "symptomSearchPlaceholder": "Search symptoms (e.g., headache, bleeding, kicks, itching, fever, Braxton Hicks)...",
      "urgencyAll": "All Urgency Tiers",
      "urgencyEmergency": "Immediate L&D / Emergency Only",
      "urgencyUrgent": "Same-Day OB Call Only",
      "urgencyRoutine": "Normal Physiological Changes Only",
      "timingPrefix": "Timing: ",
      "actionProtocolPrefix": "Action Protocol: ",
      "noSymptomsMatch": "No symptoms matched your search filter. Try clearing the search box.",
      "medsHeading": "Physician-Approved Medication, Supplement & Nutrition Safety Lookup",
      "medsIntro": "Quick reference aligned with ACOG Practice Bulletins and FDA Pregnancy & Lactation Labeling Rule (PLLR) guidance. Always confirm patient-specific dosing with your prenatal care provider.",
      "medSearchPlaceholder": "Search medications, supplements, or foods (e.g., Tylenol, Ibuprofen, Unisom, caffeine, fish, cheese)...",
      "medFilterAll": "All Safety Categories",
      "medFilterApproved": "ACOG First-Line / Approved Only",
      "medFilterCaution": "Daily Limit / Consult OB Only",
      "medFilterAvoid": "Contraindicated / Avoid in Pregnancy",
      "categoryPrefix": "Category: ",
      "dosingPrefix": "Clinical Dosing / Limit: ",
      "noMedsMatch": "No medications or foods matched your search filter.",
      "footerDisclaimerTitle": "Clinical Reference Notice:",
      "footerDisclaimerBody": " Content is structured according to ACOG (American College of Obstetricians and Gynecologists), SMFM, and CDC perinatal clinical guidelines for educational preparation and shared decision-making. It does not replace individualized medical evaluation by your OB/GYN, Maternal-Fetal Medicine specialist, or Certified Nurse-Midwife.",
      "footerPrivacyTitle": "100% Private & Offline:",
      "footerPrivacyBody": " All due-date calculations and visit checklists run locally in your browser with zero external tracking.",
      "svgAriaFmt": "Clinical embryological and fetal schematic for Week {w}: {title}",
      "svgZonaPellucida": "Zona Pellucida",
      "svgOocyteNucleus": "Oocyte Nucleus",
      "svgPolarBody1": "1st Polar Body",
      "svgCoronaRadiata": "Corona Radiata",
      "svgOvarianFollicle": "Ovarian Follicle",
      "svgBlastomere": "Blastomere (16-Cell)",
      "svgPolarBodies": "Polar Bodies",
      "svgInnerCellMass": "Inner Cell Mass",
      "svgTrophoblastRing": "Trophoblast Ring",
      "svgBlastocoel": "Blastocoel Cavity",
      "svgEndometrium": "Endometrial Wall",
      "svgForebrainOptic": "Forebrain & Optic Cup",
      "svgCardiacProminence": "Cardiac Prominence",
      "svgYolkSac": "Secondary Yolk Sac",
      "svgSomites": "Dorsal Somites & Spine",
      "svgHandFootPlates": "Hand & Foot Plates",
      "svgPlacenta": "Placental Disc",
      "svgUmbilicalCord": "3-Vessel Umbilical Cord",
      "svgCortex": "Cerebral Cortex",
      "svgHeart": "4-Chamber Heart",
      "svgLimbsTerm": "Flexed Limbs (Term)",
      "svgLimbsFetal": "Articulated Limbs",
      "svgTermCradle": " • Term Cradle",
      "navAria": "Clinical Atlas Sections",
      "personalizationAria": "Gestational Dating Calculator and Risk Profile",
      "trimesterJumpAria": "Jump by Trimester",
      "weekStripAria": "Select Week 1 through 42",
      "viewModeAria": "Visualization mode",
      "viewerControlsAria": "3D view and interactive womb controls",
      "schedFilterAria": "Filter appointments by trimester",
      "symptomSearchAria": "Search obstetric symptoms",
      "urgencyFilterAria": "Filter symptoms by urgency tier",
      "medSearchAria": "Search medications and nutrition items",
      "medFilterAria": "Filter by clinical safety category",
      "photoNoneCaption": "No photoreal still is available for this week yet. Switch to 3D Interactive for a week-specific model.",
      "photoNearestFmt": "Nearest photoreal reference (Weeks {w1}–{w2}): {caption} Switch to 3D Interactive for the Week {w} model.",
      "webglTitle": "Interactive 3D requires WebGL support in this browser.",
      "canvas3dAria": "Interactive 3D embryo and fetus model. Drag or use arrow keys to rotate, plus and minus to zoom, click or press K for a gentle fetal kick, R to reset.",
      "mtNoticeTitle": "Translation notice:",
      "mtNoticeBody": "This translation was machine-assisted and has not yet been reviewed by a native-speaker clinician. The English text is the clinical reference, so safety-critical guidance also shows the English original. This guide follows US (ACOG) practice; local guidelines, medicine brand names and emergency numbers differ by country. In an emergency, call your local emergency number.",
      "englishRefLabel": "English original (clinical reference):",
      "reviewFlagTitle": "Translation pending native-speaker clinician review",
      "englishFallbackLabel": "Shown in English (translation not yet available)",
      "langLoading": "Loading language…",
      "langLoadError": "This language could not be loaded. Showing English instead."
    },
    "es": {
      "pageTitle": "Atlas Clínico Prenatal — Referencia Interactiva de Obstetricia y Embriología (Semanas 1–42)",
      "skipLink": "Saltar al contenido clínico principal",
      "appTitle": "Atlas Clínico Prenatal",
      "appSubtitle": "Referencia Interactiva de Obstetricia y Embriología desde la Concepción hasta el Parto",
      "badgeAcog": "Alineado con ACOG / SMFM • Semanas 1–42",
      "langLabel": "Idioma",
      "langAria": "Seleccionar idioma de la interfaz clínica",
      "tabAtlas": "1. Atlas Semana a Semana (S1–42)",
      "tabSchedule": "2. Consultas Médicas y Laboratorios (15 Visitas)",
      "tabTriage": "3. Triaje de Síntomas de Alarma",
      "tabMeds": "4. Medicamentos y Nutrición Segura",
      "datingMethodLabel": "Método de Datación",
      "datingLmp": "Primer Día de la Última Menstruación (FUM)",
      "datingEdd": "Fecha Probable de Parto (FPP por Ecografía)",
      "datingConception": "Fecha de Ovulación / Concepción",
      "datingIvf5": "Transferencia FIV de Blastocisto (Día 5)",
      "datingIvf3": "Transferencia FIV de Embrión (Día 3)",
      "refDateLabel": "Fecha de Referencia (Mapea el Calendario)",
      "riskProfileLabel": "Protocolo de Riesgo Clínico",
      "riskStandard": "Embarazo Único de Bajo Riesgo (ACOG)",
      "riskAma35": "Edad Materna Avanzada (35+ / AMA)",
      "riskGdm": "Alto Riesgo / Diabetes Gestacional / HTA",
      "riskTwins": "Protocolo de Embarazo Gemelar / Múltiple",
      "enterDatePrompt": "Ingrese una fecha para mapear el calendario",
      "viewingWeekFmt": "Viendo Semana {w} de 42",
      "todayFmt": "Hoy: {w}s {d}d (Semana {aw})",
      "eddPrefix": "FPP: ",
      "lmpPrefix": "FUM: ",
      "btnJumpToday": "Ir a Mi Semana Actual",
      "btnPrint": "Imprimir Resumen Clínico",
      "btnPrintTitle": "Imprimir calendario personalizado y lista de control",
      "btnReset": "Restablecer",
      "btnResetTitle": "Restablecer fechas guardadas y casillas",
      "tri1Btn": "Periconcepción y 1.er Trimestre (S1–13)",
      "tri2Btn": "2.º Trimestre (S14–27)",
      "tri3Btn": "3.er Trimestre (S28–40)",
      "tri4Btn": "Término Tardío y Parto (S41–42)",
      "btnPrevWeek": "← Semana Ant.",
      "btnPrevWeekAria": "Semana gestacional anterior",
      "btnNextWeek": "Semana Sig. →",
      "btnNextWeekAria": "Siguiente semana gestacional",
      "weekOf42Fmt": "Semana {w} de 42",
      "weekBadgeFmt": "SEMANA {w} • {phase}",
      "weekChipAriaFmt": "Semana {w}: {title}{visit}",
      "weekChipVisitSuffix": " (Ventana de consulta médica)",
      "scrubTimelineLabel": "Línea de Tiempo:",
      "sliderAria": "Seleccionar semana gestacional de 1 a 42",
      "legendDotText": "El punto naranja indica una consulta obstétrica, laboratorio, vacuna o ecografía programada por ACOG",
      "legendTipText": "Consejo: Use el deslizador, haga clic en cualquier semana (1–42) o ingrese su FUM/FPP arriba para calcular fechas exactas.",
      "daysOfGestationFmt": "Días {d1}–{d2} de Gestación",
      "mode3d": "3D Interactivo",
      "modePhoto": "Fotografía Realista",
      "modeSchematic": "Esquema Clínico",
      "btnKick": "Patadita Suave",
      "btnKickTitle": "Toque el vientre para activar el reflejo de estiramiento y patada fetal (Atajo: K)",
      "btnAudioOff": "Audio Doppler",
      "btnAudioOn": "Doppler: ACTIVO",
      "btnAudioTitle": "Escuchar el latido cardíaco fetal por ultrasonido Doppler a los LPM exactos de esta semana",
      "btnAutoRotate": "Autorrotar",
      "btnXray": "Rayos X",
      "btnXrayTitle": "Ver el corazón latiendo, hígado, cerebro y columna a través de la piel translúcida",
      "btnSac": "Saco",
      "btnSacTitle": "Mostrar u ocultar el saco amniótico y la pared uterina",
      "btnResetView": "Restablecer Vista",
      "viewerHint": "Arrastre para rotar • Pellizque/rueda para zoom • Clic en el bebé o tecla K para Patadita • Doppler reproduce FCF en vivo",
      "sculptingFmt": "Modelando anatomía de la Semana {w}…",
      "viewerUnsupported": "El modo 3D interactivo requiere WebGL. Mostrando las vistas fotográfica y esquemática.",
      "fhrActiveFmt": "FCF {bpm} LPM • Activo In-Utero",
      "fhrPreCardiac": "Segmentación Precardíaca / Implantación",
      "bioStageLabel": "Etapa del Desarrollo",
      "bioLengthLabel": "Longitud (LCC / LCT)",
      "bioWeightLabel": "Peso Estimado",
      "bioFhrLabel": "Frecuencia Cardíaca",
      "activeSystemsLabel": "Sistemas Activos:",
      "scheduledVisitEyebrow": "● Ventana de Consulta Obstétrica Programada",
      "routineCheckInEyebrow": "○ Control Clínico y Guía de Cuidado",
      "whenToCheckInFmt": "Cuándo Consultar con su Médico (Semana {w})",
      "embryologyEyebrow": "Embriología y Maduración de Órganos",
      "whatIsDevelopingFmt": "Qué se Desarrolla en la Semana {w}",
      "maternalEyebrow": "Fisiología Materna y Perla Médica",
      "maternalHeading": "Cambios Maternos y Contexto Basado en Evidencia",
      "pearlPrefix": "Perla Clínica Médica: ",
      "riskOverlayAma35": "Protocolo Edad Materna Avanzada (35+): Analizar profilaxis con aspirina en dosis baja (81 mg) desde la Semana 12, ecografía anatómica Nivel II en la Semana 20, ecografía de crecimiento en la Semana 32, vigilancia NST/PBF semanal desde la Semana 32–36 y parto entre 39s0d–39s6d.",
      "riskOverlayGdm": "Protocolo Alto Riesgo / DG / HTA: Incluye glucosa/HbA1c basal en el 1.er trimestre, aspirina 81 mg desde la Semana 12, ecografías mensuales de crecimiento fetal (Semanas 28, 32, 36) y pruebas NST/ILA dos veces por semana desde la Semana 32.",
      "riskOverlayTwins": "Protocolo Embarazo Gemelar / Múltiple: Determinar corionicidad (bicoriónico vs. monocoriónico) en ecografía del 1.er trimestre; aspirina 81 mg en Semana 12; ecografías seriadas cada 2–4 semanas y parto programado entre 36s0d–38s0d.",
      "schedHeading": "Cronograma de Control Prenatal ACOG (Semanas 6–42)",
      "schedIntro": "Frecuencia obstétrica estándar: Cada 4 semanas (Semanas 4–28), Cada 2 semanas (Semanas 28–36) y Semanal (Semanas 36–41), más vigilancia NST/PBF dos veces por semana en Semana 41+. Marque las consultas completadas.",
      "schedFilterAll": "Las 15 Consultas",
      "schedFilter1": "1.er Trimestre (S6–13)",
      "schedFilter2": "2.º Trimestre (S14–28)",
      "schedFilter3": "3.er Trimestre (S30–40)",
      "schedFilter4": "Término Tardío (S41–42)",
      "apptWeekSingleFmt": "Semana {w}",
      "apptWeekRangeFmt": "Semanas {w1}–{w2}",
      "cadencePrefix": "Frecuencia: ",
      "completedLabel": "Completada",
      "markCompletedLabel": "Marcar Completada",
      "inspectWeekFmt": "Ver Semana {w} en el Atlas →",
      "procSubboxTitle": "Exámenes Clínicos, Laboratorios, Ecografías y Vacunas",
      "questionsSubboxTitle": "Preguntas para su Obstetra / Matrona",
      "highRiskPrefix": "Protocolo Alto Riesgo / 35+ / Múltiples: ",
      "triageHeading": "Triaje de Síntomas Obstétricos: Cuándo Llamar al Obstetra vs. Ir a Urgencias",
      "triageIntro": "Cómo distinguir adaptaciones fisiológicas normales del embarazo de signos de alarma obstétrica. Ante la duda, comuníquese siempre con su unidad de Maternidad.",
      "tier1Title": "1. Urgencia Obstétrica Inmediata (Rojo)",
      "tier1Desc": "Acuda de inmediato a Urgencias de Maternidad / Sala de Partos (si tiene ≥20 semanas) o al Servicio de Urgencias más cercano.",
      "tier2Title": "2. Llamada al Obstetra el Mismo Día en 1–4 Horas (Ámbar)",
      "tier2Desc": "Comuníquese hoy con la línea de guardia de su obstetra/matrona para análisis específicos, monitoreo fetal o tratamiento.",
      "tier3Title": "3. Adaptación Fisiológica Normal (Verde)",
      "tier3Desc": "Cambios hormonales o biomecánicos esperados del embarazo que pueden manejarse en casa y comentarse en la próxima consulta.",
      "symptomSearchPlaceholder": "Buscar síntomas (ej. cefalea, sangrado, movimientos, picazón, fiebre, contracciones)...",
      "urgencyAll": "Todos los Niveles de Urgencia",
      "urgencyEmergency": "Solo Urgencia Inmediata / Sala de Partos",
      "urgencyUrgent": "Solo Llamada en el Mismo Día",
      "urgencyRoutine": "Solo Cambios Fisiológicos Normales",
      "timingPrefix": "Etapa: ",
      "actionProtocolPrefix": "Protocolo de Acción: ",
      "noSymptomsMatch": "Ningún síntoma coincide con su búsqueda. Intente borrar el filtro.",
      "medsHeading": "Guía Médica de Medicamentos, Suplementos y Nutrición en el Embarazo",
      "medsIntro": "Referencia rápida alineada con los Boletines Prácticos de ACOG y la FDA. Confirme siempre la dosis específica con su médico obstetra.",
      "medSearchPlaceholder": "Buscar medicamentos, suplementos o alimentos (ej. paracetamol, ibuprofeno, cafeína, pescado, queso)...",
      "medFilterAll": "Todas las Categorías de Seguridad",
      "medFilterApproved": "Primera Línea ACOG / Aprobados",
      "medFilterCaution": "Límite Diario / Consultar Obstetra",
      "medFilterAvoid": "Contraindicados / Evitar en el Embarazo",
      "categoryPrefix": "Categoría: ",
      "dosingPrefix": "Dosis Clínica / Límite: ",
      "noMedsMatch": "Ningún medicamento o alimento coincide con su búsqueda.",
      "footerDisclaimerTitle": "Aviso de Referencia Clínica:",
      "footerDisclaimerBody": " El contenido está estructurado según las guías perinatales de ACOG, SMFM y CDC con fines educativos. No reemplaza la evaluación médica individualizada de su obstetra o matrona.",
      "footerPrivacyTitle": "100% Privado y Sin Conexión:",
      "footerPrivacyBody": " Todos los cálculos de fecha de parto y listas de control se ejecutan localmente en su navegador sin rastreo externo.",
      "svgAriaFmt": "Esquema clínico embriológico y fetal para la Semana {w}: {title}",
      "svgZonaPellucida": "Zona Pelúcida",
      "svgOocyteNucleus": "Núcleo del Ovocito",
      "svgPolarBody1": "1.er Cuerpo Polar",
      "svgCoronaRadiata": "Corona Radiada",
      "svgOvarianFollicle": "Folículo Ovárico",
      "svgBlastomere": "Blastómero (16 Cél.)",
      "svgPolarBodies": "Cuerpos Polares",
      "svgInnerCellMass": "Masa Celular Interna",
      "svgTrophoblastRing": "Anillo Trofoblástico",
      "svgBlastocoel": "Cavidad del Blastocele",
      "svgEndometrium": "Pared Endometrial",
      "svgForebrainOptic": "Prosencéfalo y Copa Óptica",
      "svgCardiacProminence": "Prominencia Cardíaca",
      "svgYolkSac": "Saco Vitelino Secundario",
      "svgSomites": "Somitas y Columna Dorsal",
      "svgHandFootPlates": "Placas de Manos y Pies",
      "svgPlacenta": "Disco Placentario",
      "svgUmbilicalCord": "Cordón Umbilical (3 Vasos)",
      "svgCortex": "Corteza Cerebral",
      "svgHeart": "Corazón de 4 Cámaras",
      "svgLimbsTerm": "Extremidades en Flexión",
      "svgLimbsFetal": "Extremidades Articuladas",
      "svgTermCradle": " • Posición a Término",
      "navAria": "Secciones del Atlas Clínico",
      "personalizationAria": "Calculadora de Edad Gestacional y Perfil de Riesgo",
      "trimesterJumpAria": "Saltar por Trimestre",
      "weekStripAria": "Seleccionar Semana 1 a 42",
      "viewModeAria": "Modo de visualización",
      "viewerControlsAria": "Vista 3D y controles interactivos del útero",
      "schedFilterAria": "Filtrar consultas por trimestre",
      "symptomSearchAria": "Buscar síntomas obstétricos",
      "urgencyFilterAria": "Filtrar síntomas por nivel de urgencia",
      "medSearchAria": "Buscar medicamentos y elementos de nutrición",
      "medFilterAria": "Filtrar por categoría de seguridad clínica",
      "photoNoneCaption": "Aún no hay imagen fotorrealista disponible para esta semana. Cambie a 3D Interactivo para ver el modelo específico de la semana.",
      "photoNearestFmt": "Referencia fotorrealista más cercana (Semanas {w1}–{w2}): {caption} Cambie a 3D Interactivo para el modelo de la Semana {w}.",
      "webglTitle": "El modo 3D Interactivo requiere soporte WebGL en este navegador.",
      "canvas3dAria": "Modelo 3D interactivo de embrión y feto. Arrastre o use las flechas para rotar, más y menos para acercar o alejar, haga clic o presione K para un movimiento fetal suave, R para restablecer.",
      "mtNoticeTitle": "Aviso de traducción:",
      "mtNoticeBody": "Esta traducción fue asistida por computadora y aún no ha sido revisada por un médico hablante nativo. El texto en inglés es la referencia clínica, por lo que las orientaciones críticas de seguridad también muestran el original en inglés. Esta guía sigue la práctica de EE. UU. (ACOG); las guías locales, nombres comerciales de medicamentos y números de emergencia varían según el país. En caso de emergencia, llame al número de emergencias local.",
      "englishRefLabel": "Original en inglés (referencia clínica):",
      "reviewFlagTitle": "Traducción pendiente de revisión por médico hablante nativo",
      "englishFallbackLabel": "Mostrado en inglés (traducción aún no disponible)",
      "langLoading": "Cargando idioma…",
      "langLoadError": "No se pudo cargar este idioma. Mostrando inglés en su lugar."
    },
    "zh": {
      "pageTitle": "产前临床图谱 — 受孕至分娩交互式妇产科与胚胎学参考指南（第 1–42 周）",
      "skipLink": "跳至主要临床内容",
      "appTitle": "产前临床图谱",
      "appSubtitle": "受孕至出生交互式妇产科与人类胚胎发育医学图谱",
      "badgeAcog": "遵循 ACOG / SMFM 指南 • 第 1–42 周",
      "langLabel": "语言",
      "langAria": "选择临床界面语言",
      "tabAtlas": "1. 逐周发育图谱 (第1–42周)",
      "tabSchedule": "2. 产检日程与化验检查 (15次产检)",
      "tabTriage": "3. 危险症状急诊分诊",
      "tabMeds": "4. 孕期安全用药与营养查询",
      "datingMethodLabel": "孕周计算方式",
      "datingLmp": "末次月经第一天 (LMP)",
      "datingEdd": "预产期 (超声核定 EDD)",
      "datingConception": "排卵日 / 受孕日",
      "datingIvf5": "试管婴儿 (IVF) 第5天囊胚移植日",
      "datingIvf3": "试管婴儿 (IVF) 第3天卵裂胚移植日",
      "refDateLabel": "参考日期（自动映射产检日历）",
      "riskProfileLabel": "临床高危妊娠路径叠加",
      "riskStandard": "标准低风险单胎妊娠 (ACOG)",
      "riskAma35": "高龄产妇方案 (35岁+ / AMA)",
      "riskGdm": "高危妊娠 / 妊娠期糖尿病 / 高血压",
      "riskTwins": "双胎 / 多胎妊娠临床管理方案",
      "enterDatePrompt": "输入日期以生成个人产检日历",
      "viewingWeekFmt": "当前浏览：第 {w} / 42 周",
      "todayFmt": "今日孕周：{w}周+{d}天（第 {aw} 周）",
      "eddPrefix": "预产期 (EDD)：",
      "lmpPrefix": "末次月经：",
      "btnJumpToday": "跳转至我的当前孕周",
      "btnPrint": "打印临床产检摘要",
      "btnPrintTitle": "打印个性化产检日历与检查清单",
      "btnReset": "重置",
      "btnResetTitle": "重置保存的日期和已完成勾选",
      "tri1Btn": "围受孕期与孕早期 (第1–13周)",
      "tri2Btn": "孕中期 (第14–27周)",
      "tri3Btn": "孕晚期 (第28–40周)",
      "tri4Btn": "足月晚期与分娩 (第41–42周)",
      "btnPrevWeek": "← 上一周",
      "btnPrevWeekAria": "上一孕周",
      "btnNextWeek": "下一周 →",
      "btnNextWeekAria": "下一孕周",
      "weekOf42Fmt": "第 {w} / 42 周",
      "weekBadgeFmt": "第 {w} 周 • {phase}",
      "weekChipAriaFmt": "第 {w} 周：{title}{visit}",
      "weekChipVisitSuffix": "（产检预约窗口）",
      "scrubTimelineLabel": "滑动时间轴：",
      "sliderAria": "选择第 1 至 42 孕周",
      "legendDotText": "橙色圆点表示该周有 ACOG 推荐的产科产检、血液化验、疫苗接种或超声筛查",
      "legendTipText": "提示：拖动滑块、点击任意周数（1–42），或在上方输入末次月经/预产期以映射确切日历日期。",
      "daysOfGestationFmt": "妊娠第 {d1}–{d2} 天",
      "mode3d": "3D 交互模型",
      "modePhoto": "超写实宫内影像",
      "modeSchematic": "解剖示意图",
      "btnKick": "轻柔胎动",
      "btnKickTitle": "轻触子宫触发胎儿伸展与踢腿反射（快捷键：K）",
      "btnAudioOff": "多普勒胎心音",
      "btnAudioOn": "多普勒：开启",
      "btnAudioTitle": "收听按本周精确心率合成的产科超声多普勒胎心搏动音",
      "btnAutoRotate": "自动旋转",
      "btnXray": "透视解剖",
      "btnXrayTitle": "透过半透明皮肤观察跳动的心脏、肝脏、大脑与脊柱",
      "btnSac": "羊膜囊",
      "btnSacTitle": "显示或隐藏羊膜囊与子宫壁",
      "btnResetView": "重置视角",
      "viewerHint": "拖动旋转 • 滚轮/双指缩放 • 点击宝宝或按 K 键触发胎动 • 多普勒按钮播放实时胎心音",
      "sculptingFmt": "正在构建第 {w} 周三维解剖结构…",
      "viewerUnsupported": "交互式 3D 需要 WebGL 支持，当前浏览器已禁用。已为您切换至超写实与解剖示意图视图。",
      "fhrActiveFmt": "胎心率 {bpm} 次/分 • 宫内活跃",
      "fhrPreCardiac": "心脏形成前卵裂 / 着床期",
      "bioStageLabel": "发育阶段",
      "bioLengthLabel": "体长 (顶臀长 CRL / 顶跟长 CHL)",
      "bioWeightLabel": "预估体重",
      "bioFhrLabel": "参考胎心率",
      "activeSystemsLabel": "重点发育系统：",
      "scheduledVisitEyebrow": "● ACOG 计划产检与筛查窗口",
      "routineCheckInEyebrow": "○ 本周临床随访与保健指导",
      "whenToCheckInFmt": "何时联系产科医生（第 {w} 周）",
      "embryologyEyebrow": "胚胎学与器官系统成熟里程碑",
      "whatIsDevelopingFmt": "第 {w} 周正在发育的解剖结构",
      "maternalEyebrow": "母体生理变化与主任医师临床要点",
      "maternalHeading": "母体生理适应与循证医学背景",
      "pearlPrefix": "产科医师临床要点：",
      "riskOverlayAma35": "高龄产妇 (35岁+) 临床方案：第12周起每日口服低剂量阿司匹林 (81 mg) 预防子痫前期，第20周进行详细 II 级大排畸超声，第32周行胎儿生长超声，第32–36周起每周胎心监护 (NST/BPP)，建议在 39周0天–39周6天分娩。",
      "riskOverlayGdm": "高危妊娠 / 妊娠期糖尿病 / 高血压方案：包含孕早期空腹血糖/HbA1c 基线筛查、第12周起服用低剂量阿司匹林、孕晚期每月胎儿生长超声（第28、32、36周），以及第32周起每周两次 NST/羊水指数监测。",
      "riskOverlayTwins": "双胎 / 多胎妊娠方案：孕早期超声明确绒毛膜性（双绒毛膜 vs. 单绒毛膜）；第12周启动阿司匹林预防；每 2–4 周连续生长超声监测；并根据绒毛膜性在 36周0天–38周0天计划分娩。",
      "schedHeading": "ACOG 产前检查完整路线图（第 6–42 周）",
      "schedIntro": "标准产科产检频率：每 4 周一次（第4–28周）、每 2 周一次（第28–36周）、每周一次（第36–41周），以及第41周起每周两次 NST/BPP 胎心监护。可勾选已完成的产检。",
      "schedFilterAll": "全部 15 次产检",
      "schedFilter1": "孕早期 (第6–13周)",
      "schedFilter2": "孕中期 (第14–28周)",
      "schedFilter3": "孕晚期 (第30–40周)",
      "schedFilter4": "足月晚期 (第41–42周)",
      "apptWeekSingleFmt": "第 {w} 周",
      "apptWeekRangeFmt": "第 {w1}–{w2} 周",
      "cadencePrefix": "产检频率：",
      "completedLabel": "已完成",
      "markCompletedLabel": "标记为已完成",
      "inspectWeekFmt": "在图谱中查看第 {w} 周 →",
      "procSubboxTitle": "临床体格检查、化验、超声与疫苗",
      "questionsSubboxTitle": "建议向产科医生 / 助产士咨询的问题",
      "highRiskPrefix": "高危 / 35岁+ / 双胎附加方案：",
      "triageHeading": "产科症状急诊分诊：何时联系门诊 vs. 立即前往产房急诊",
      "triageIntro": "区分孕期正常的生理适应变化与紧急产科危险信号。如有疑虑，产房急诊与值班医生建议您尽早就诊。",
      "tier1Title": "1. 立即前往产房急诊 / 急诊科（红色警报）",
      "tier1Desc": "如孕周 ≥20 周请直接前往医院产房急诊分诊 (产房急诊分诊（L&D）)，或前往最近的急诊科，切勿在家等待回电。",
      "tier2Title": "2. 当日 1–4 小时内联系产科医生（黄色预警）",
      "tier2Desc": "请于今日联系产科值班热线，安排针对性血液化验、胎心监护或安全处方治疗。",
      "tier3Title": "3. 孕期正常生理适应（绿色常规）",
      "tier3Desc": "由孕期激素或生物力学变化引起的常见反应，可居家安全缓解并在下次常规产检时沟通。",
      "symptomSearchPlaceholder": "搜索症状（如：头痛、出血、胎动减少、瘙痒、发烧、假性宫缩）...",
      "urgencyAll": "所有紧急程度",
      "urgencyEmergency": "仅显示：立即急诊 / 产房分诊",
      "urgencyUrgent": "仅显示：当日联系产科医生",
      "urgencyRoutine": "仅显示：正常孕期生理变化",
      "timingPrefix": "发生阶段：",
      "actionProtocolPrefix": "临床处理指南：",
      "noSymptomsMatch": "未找到匹配的症状，请尝试清空搜索框。",
      "medsHeading": "医生批准的孕期药物、营养补充剂与食品安全查询",
      "medsIntro": "基于 ACOG 临床实践指南与 FDA 妊娠与哺乳期用药标签规则 (PLLR)。具体剂量请务必与您的产检医生确认。",
      "medSearchPlaceholder": "搜索药物、补充剂或食物（如：对乙酰氨基酚、布洛芬、咖啡因、深海鱼、奶酪）...",
      "medFilterAll": "所有安全级别",
      "medFilterApproved": "ACOG 一线推荐 / 孕期安全",
      "medFilterCaution": "每日限量 / 需遵医嘱",
      "medFilterAvoid": "孕期禁忌 / 严禁使用",
      "categoryPrefix": "类别：",
      "dosingPrefix": "临床剂量 / 限量说明：",
      "noMedsMatch": "未找到匹配的药物或食物。",
      "footerDisclaimerTitle": "临床参考声明：",
      "footerDisclaimerBody": " 本图谱内容依据美国妇产科医师学会 (ACOG)、母胎医学会 (SMFM) 及 CDC 围产期指南编写，仅供产前健康教育与医患共同决策参考，不能替代产科医生的个体化诊疗。",
      "footerPrivacyTitle": "100% 隐私保护与本地运行：",
      "footerPrivacyBody": " 所有预产期计算与产检勾选记录均保存在您的浏览器本地，绝无任何外部追踪。",
      "svgAriaFmt": "第 {w} 周临床胚胎与胎儿解剖示意图：{title}",
      "svgZonaPellucida": "透明带",
      "svgOocyteNucleus": "卵母细胞核",
      "svgPolarBody1": "第一极体",
      "svgCoronaRadiata": "放射冠",
      "svgOvarianFollicle": "卵巢卵泡壁",
      "svgBlastomere": "卵裂球 (16细胞)",
      "svgPolarBodies": "极体",
      "svgInnerCellMass": "内细胞团",
      "svgTrophoblastRing": "滋养层细胞环",
      "svgBlastocoel": "囊胚腔",
      "svgEndometrium": "子宫内膜壁",
      "svgForebrainOptic": "前脑与视杯",
      "svgCardiacProminence": "心隆起 (原始心脏)",
      "svgYolkSac": "次级卵黄囊",
      "svgSomites": "背侧体节与脊柱",
      "svgHandFootPlates": "手板与足板",
      "svgPlacenta": "胎盘盘",
      "svgUmbilicalCord": "三血管螺旋脐带",
      "svgCortex": "大脑皮层",
      "svgHeart": "四腔心脏",
      "svgLimbsTerm": "屈曲四肢 (足月)",
      "svgLimbsFetal": "关节分化四肢",
      "svgTermCradle": " • 足月头位衔接",
      "navAria": "临床图谱导航栏",
      "personalizationAria": "孕周计算器与临床风险分层设置",
      "trimesterJumpAria": "按孕期快速跳转",
      "weekStripAria": "选择第 1 至 42 周",
      "viewModeAria": "可视化视图模式",
      "viewerControlsAria": "3D 视图与宫内交互控制",
      "schedFilterAria": "按孕期筛选产检项目",
      "symptomSearchAria": "搜索产科症状",
      "urgencyFilterAria": "按紧急程度筛选症状",
      "medSearchAria": "搜索药物与营养食品",
      "medFilterAria": "按临床安全等级筛选",
      "photoNoneCaption": "本周暂无写实静态图。请切换至“3D 交互”模式查看本周专属解剖模型。",
      "photoNearestFmt": "最近写实参考图（第 {w1}–{w2} 周）：{caption} 切换至“3D 交互”查看第 {w} 周模型。",
      "webglTitle": "3D 交互模式需要当前浏览器启用 WebGL 支持。",
      "canvas3dAria": "交互式 3D 胚胎与胎儿模型。拖动或使用方向键旋转，加号和减号缩放，点击或按 K 键触发轻柔胎动，按 R 键重置视角。",
      "mtNoticeTitle": "翻译说明：",
      "mtNoticeBody": "本翻译为机器辅助生成，尚未经母语临床医生审校。英文原文为临床基准参考，因此安全关键指导同时附有英文原文。本指南遵循美国（ACOG）临床规范；各国诊疗指南、药品商品名及急救电话有所不同。如遇紧急情况，请立即拨打当地急救电话。",
      "englishRefLabel": "英文原文（临床参考）：",
      "reviewFlagTitle": "翻译待母语临床医生审校",
      "englishFallbackLabel": "以英文显示（暂无对应翻译）",
      "langLoading": "正在加载语言…",
      "langLoadError": "无法加载该语言，已为您显示英文版。"
    },
    "pt": {
      "pageTitle": "Atlas Clínico Pré-Natal — Referência Interativa de Obstetrícia e Embriologia (Semanas 1–42)",
      "skipLink": "Ir para o conteúdo clínico principal",
      "appTitle": "Atlas Clínico Pré-Natal",
      "appSubtitle": "Referência Interativa de Obstetrícia e Embriologia da Concepção ao Nascimento",
      "badgeAcog": "Alinhado à ACOG / SMFM • Semanas 1–42",
      "langLabel": "Idioma",
      "langAria": "Selecionar idioma da interface clínica",
      "tabAtlas": "1. Atlas Semana a Semana (S1–42)",
      "tabSchedule": "2. Consultas e Exames Pré-Natais (15 Visitas)",
      "tabTriage": "3. Triagem de Sinais de Alerta",
      "tabMeds": "4. Medicamentos e Nutrição Segura",
      "datingMethodLabel": "Método de Datação",
      "datingLmp": "Primeiro Dia da Última Menstruação (DUM)",
      "datingEdd": "Data Provável do Parto (DPP por Ultrassom)",
      "datingConception": "Data da Ovulação / Concepção",
      "datingIvf5": "Transferência FIV de Blastocisto (Dia 5)",
      "datingIvf3": "Transferência FIV de Embrião (Dia 3)",
      "refDateLabel": "Data de Referência (Mapeia o Calendário)",
      "riskProfileLabel": "Protocolo de Risco Clínico",
      "riskStandard": "Gestação Única de Baixo Risco (ACOG)",
      "riskAma35": "Idade Materna Avançada (35+ / IMA)",
      "riskGdm": "Alto Risco / Diabetes Gestacional / HAS",
      "riskTwins": "Protocolo de Gestação Gemelar / Múltipla",
      "enterDatePrompt": "Insira uma data para mapear o calendário",
      "viewingWeekFmt": "Visualizando Semana {w} de 42",
      "todayFmt": "Hoje: {w}s {d}d (Semana {aw})",
      "eddPrefix": "DPP: ",
      "lmpPrefix": "DUM: ",
      "btnJumpToday": "Ir para Minha Semana Atual",
      "btnPrint": "Imprimir Resumo Clínico",
      "btnPrintTitle": "Imprimir cronograma personalizado e lista de verificação",
      "btnReset": "Redefinir",
      "btnResetTitle": "Redefinir datas salvas e caixas de seleção",
      "tri1Btn": "Periconcepção e 1.º Trimestre (S1–13)",
      "tri2Btn": "2.º Trimestre (S14–27)",
      "tri3Btn": "3.º Trimestre (S28–40)",
      "tri4Btn": "Termo Tardio e Parto (S41–42)",
      "btnPrevWeek": "← Sem. Ant.",
      "btnPrevWeekAria": "Semana gestacional anterior",
      "btnNextWeek": "Próx. Sem. →",
      "btnNextWeekAria": "Próxima semana gestacional",
      "weekOf42Fmt": "Semana {w} de 42",
      "weekBadgeFmt": "SEMANA {w} • {phase}",
      "weekChipAriaFmt": "Semana {w}: {title}{visit}",
      "weekChipVisitSuffix": " (Janela de consulta médica)",
      "scrubTimelineLabel": "Linha do Tempo:",
      "sliderAria": "Selecionar semana gestacional de 1 a 42",
      "legendDotText": "O ponto laranja indica uma consulta obstétrica, exame laboratorial, vacina ou ultrassom recomendado pela ACOG",
      "legendTipText": "Dica: Use o controle deslizante, clique em qualquer semana (1–42) ou informe sua DUM/DPP acima.",
      "daysOfGestationFmt": "Dias {d1}–{d2} de Gestação",
      "mode3d": "3D Interativo",
      "modePhoto": "Foto Realista",
      "modeSchematic": "Esquema Anatômico",
      "btnKick": "Chute Suave",
      "btnKickTitle": "Toque no útero para acionar um reflexo de chute e alongamento fetal (Atalho: K)",
      "btnAudioOff": "Áudio Doppler",
      "btnAudioOn": "Doppler: ATIVO",
      "btnAudioTitle": "Ouça o áudio Doppler do batimento cardíaco fetal nos BPM exatos desta semana",
      "btnAutoRotate": "Girar Auto",
      "btnXray": "Raio-X",
      "btnXrayTitle": "Veja o coração batendo, fígado, cérebro e coluna através da pele translúcida",
      "btnSac": "Saco",
      "btnSacTitle": "Mostrar ou ocultar o saco amniótico e a parede uterina",
      "btnResetView": "Redefinir Vista",
      "viewerHint": "Arraste para girar • Role/pince para zoom • Clique no bebê ou tecla K para Chute Suave • Doppler toca BCF ao vivo",
      "sculptingFmt": "Modelando anatomia da Semana {w}…",
      "viewerUnsupported": "O modo 3D interativo requer WebGL. Exibindo as vistas fotográfica e esquemática.",
      "fhrActiveFmt": "BCF {bpm} BPM • Ativo In-Utero",
      "fhrPreCardiac": "Clivagem Pré-Cardíaca / Implantação",
      "bioStageLabel": "Estágio de Desenvolvimento",
      "bioLengthLabel": "Comprimento (CCN / CCT)",
      "bioWeightLabel": "Peso Estimado",
      "bioFhrLabel": "Frequência Cardíaca",
      "activeSystemsLabel": "Sistemas Ativos:",
      "scheduledVisitEyebrow": "● Janela de Consulta Obstétrica Programada",
      "routineCheckInEyebrow": "○ Acompanhamento Clínico e Orientação",
      "whenToCheckInFmt": "Quando Consultar Seu Médico (Semana {w})",
      "embryologyEyebrow": "Embriologia e Maturação de Órgãos",
      "whatIsDevelopingFmt": "O Que Está se Desenvolvendo na Semana {w}",
      "maternalEyebrow": "Fisiologia Materna e Pérola Médica",
      "maternalHeading": "Mudanças Maternas e Contexto Baseado em Evidências",
      "pearlPrefix": "Pérola Clínica Médica: ",
      "riskOverlayAma35": "Protocolo Idade Materna Avançada (35+): Discutir profilaxia com aspirina em baixa dose (81 mg) a partir da Semana 12, ultrassom morfológico Nível II na Semana 20, ultrassom de crescimento na Semana 32, vigilância semanal NST/PBF a partir da Semana 32–36 e parto entre 39s0d–39s6d.",
      "riskOverlayGdm": "Protocolo Alto Risco / DMG / HAS: Inclui glicemia/HbA1c basal no 1.º trimestre, aspirina 81 mg na Semana 12, ultrassons mensais de crescimento (Semanas 28, 32, 36) e NST/ILA duas vezes por semana a partir da Semana 32.",
      "riskOverlayTwins": "Protocolo Gestação Gemelar / Múltipla: Determinar corionicidade no ultrassom de 1.º trimestre; aspirina 81 mg na Semana 12; ultrassons seriados a cada 2–4 semanas e parto planejado entre 36s0d–38s0d.",
      "schedHeading": "Roteiro de Pré-Natal ACOG (Semanas 6–42)",
      "schedIntro": "Cadência obstétrica padrão: A cada 4 semanas (Semanas 4–28), A cada 2 semanas (Semanas 28–36) e Semanal (Semanas 36–41), além de vigilância NST/PBF duas vezes por semana na Semana 41+.",
      "schedFilterAll": "Todas as 15 Consultas",
      "schedFilter1": "1.º Trimestre (S6–13)",
      "schedFilter2": "2.º Trimestre (S14–28)",
      "schedFilter3": "3.º Trimestre (S30–40)",
      "schedFilter4": "Termo Tardio (S41–42)",
      "apptWeekSingleFmt": "Semana {w}",
      "apptWeekRangeFmt": "Semanas {w1}–{w2}",
      "cadencePrefix": "Frequência: ",
      "completedLabel": "Concluída",
      "markCompletedLabel": "Marcar Concluída",
      "inspectWeekFmt": "Ver Semana {w} no Atlas →",
      "procSubboxTitle": "Exames Clínicos, Laboratório, Ultrassons e Vacinas",
      "questionsSubboxTitle": "Perguntas para Seu Obstetra / Enfermeira Obstétrica",
      "highRiskPrefix": "Protocolo Alto Risco / 35+ / Gemelar: ",
      "triageHeading": "Triagem de Sintomas Obstétricos: Quando Ligar para o Obstetra vs. Ir à Maternidade",
      "triageIntro": "Como diferenciar adaptações fisiológicas normais da gestação de sinais de alerta urgentes. Em caso de dúvida, procure a triagem obstétrica.",
      "tier1Title": "1. Emergência Obstétrica Imediata (Vermelho)",
      "tier1Desc": "Dirija-se imediatamente ao Pronto-Socorro Obstétrico / Maternidade (se ≥20 semanas) ou à Emergência mais próxima.",
      "tier2Title": "2. Contato com Obstetra no Mesmo Dia em 1–4 Horas (Âmbar)",
      "tier2Desc": "Entre em contato hoje com seu obstetra para exames laboratoriais, cardiotocografia ou tratamento específico.",
      "tier3Title": "3. Adaptação Fisiológica Normal (Verde)",
      "tier3Desc": "Alterações hormonais ou biomecânicas esperadas da gestação que podem ser manejadas em casa e relatadas na próxima consulta.",
      "symptomSearchPlaceholder": "Buscar sintomas (ex. dor de cabeça, sangramento, movimentos, coceira, febre, contrações)...",
      "urgencyAll": "Todos os Níveis de Urgência",
      "urgencyEmergency": "Apenas Emergência / Maternidade Imediata",
      "urgencyUrgent": "Apenas Contato no Mesmo Dia",
      "urgencyRoutine": "Apenas Alterações Fisiológicas Normais",
      "timingPrefix": "Período: ",
      "actionProtocolPrefix": "Protocolo de Conduta: ",
      "noSymptomsMatch": "Nenhum sintoma correspondeu à sua busca. Tente limpar o filtro.",
      "medsHeading": "Guia Médico de Medicamentos, Suplementos e Nutrição na Gestação",
      "medsIntro": "Referência rápida alinhada às diretrizes da ACOG e da FDA. Sempre confirme a posologia individual com seu obstetra.",
      "medSearchPlaceholder": "Buscar medicamentos, suplementos ou alimentos (ex. paracetamol, ibuprofeno, cafeína, peixe, queijo)...",
      "medFilterAll": "Todas as Categorias de Segurança",
      "medFilterApproved": "Primeira Linha ACOG / Aprovados",
      "medFilterCaution": "Limite Diário / Consultar Obstetra",
      "medFilterAvoid": "Contraindicados / Evitar na Gestação",
      "categoryPrefix": "Categoria: ",
      "dosingPrefix": "Posologia Clínica / Limite: ",
      "noMedsMatch": "Nenhum medicamento ou alimento correspondeu à sua busca.",
      "footerDisclaimerTitle": "Aviso de Referência Clínica:",
      "footerDisclaimerBody": " Conteúdo estruturado segundo diretrizes perinatais da ACOG, SMFM e CDC para educação em saúde. Não substitui a avaliação médica individualizada.",
      "footerPrivacyTitle": "100% Privado e Offline:",
      "footerPrivacyBody": " Todos os cálculos de DPP e listas de consultas rodam localmente no seu navegador sem rastreamento externo.",
      "svgAriaFmt": "Esquema clínico embriológico e fetal da Semana {w}: {title}",
      "svgZonaPellucida": "Zona Pelúcida",
      "svgOocyteNucleus": "Núcleo do Oócito",
      "svgPolarBody1": "1.º Corpúsculo Polar",
      "svgCoronaRadiata": "Corona Radiata",
      "svgOvarianFollicle": "Folículo Ovariano",
      "svgBlastomere": "Blastômero (16 Cél.)",
      "svgPolarBodies": "Corpúsculos Polares",
      "svgInnerCellMass": "Massa Celular Interna",
      "svgTrophoblastRing": "Anel Trofoblástico",
      "svgBlastocoel": "Cavidade Blastocística",
      "svgEndometrium": "Parede Endometrial",
      "svgForebrainOptic": "Prosencéfalo e Cálice Óptico",
      "svgCardiacProminence": "Proeminência Cardíaca",
      "svgYolkSac": "Vesícula Vitelina Secundária",
      "svgSomites": "Somitos e Coluna Dorsal",
      "svgHandFootPlates": "Placas das Mãos e Pés",
      "svgPlacenta": "Disco Placentário",
      "svgUmbilicalCord": "Cordão Umbilical (3 Vasos)",
      "svgCortex": "Córtex Cerebral",
      "svgHeart": "Coração de 4 Câmaras",
      "svgLimbsTerm": "Membros Fletidos (Termo)",
      "svgLimbsFetal": "Membros Articulados",
      "svgTermCradle": " • Apresentação a Termo",
      "navAria": "Seções do Atlas Clínico",
      "personalizationAria": "Calculadora de Idade Gestacional e Perfil de Risco",
      "trimesterJumpAria": "Navegar por Trimestre",
      "weekStripAria": "Selecionar Semana 1 a 42",
      "viewModeAria": "Modo de visualização",
      "viewerControlsAria": "Vista 3D e controles interativos do útero",
      "schedFilterAria": "Filtrar consultas por trimestre",
      "symptomSearchAria": "Pesquisar sintomas obstétricos",
      "urgencyFilterAria": "Filtrar sintomas por nível de urgência",
      "medSearchAria": "Pesquisar medicamentos e itens de nutrição",
      "medFilterAria": "Filtrar por categoria de segurança clínica",
      "photoNoneCaption": "Ainda não há imagem fotorrealista disponível para esta semana. Mude para 3D Interativo para ver o modelo específico da semana.",
      "photoNearestFmt": "Referência fotorrealista mais próxima (Semanas {w1}–{w2}): {caption} Mude para 3D Interativo para o modelo da Semana {w}.",
      "webglTitle": "O modo 3D Interativo requer suporte a WebGL neste navegador.",
      "canvas3dAria": "Modelo 3D interativo de embrião e feto. Arraste ou use as setas para girar, mais e menos para aproximar ou afastar, clique ou pressione K para um chute fetal suave, R para redefinir.",
      "mtNoticeTitle": "Aviso de tradução:",
      "mtNoticeBody": "Esta tradução contou com assistência computacional e ainda não foi revisada por um médico falante nativo. O texto em inglês é a referência clínica, portanto orientações críticas de segurança também exibem o original em inglês. Este guia segue a prática dos EUA (ACOG); diretrizes locais, nomes comerciais de medicamentos e números de emergência variam conforme o país. Em uma emergência, ligue para o número de emergência local.",
      "englishRefLabel": "Original em inglês (referência clínica):",
      "reviewFlagTitle": "Tradução pendente de revisão por médico falante nativo",
      "englishFallbackLabel": "Exibido em inglês (tradução ainda não disponível)",
      "langLoading": "Carregando idioma…",
      "langLoadError": "Não foi possível carregar este idioma. Exibindo em inglês."
    },
    "ja": {
      "pageTitle": "周産期臨床アトラス — 受精から出産までの産婦人科・発生学インタラクティブ図鑑（妊娠1〜42週）",
      "skipLink": "メインの臨床コンテンツへスキップ",
      "appTitle": "周産期臨床アトラス",
      "appSubtitle": "受精から誕生まで：産婦人科・胎児発生学インタラクティブ医学リファレンス",
      "badgeAcog": "ACOG / SMFM ガイドライン準拠 • 第1〜42週",
      "langLabel": "言語",
      "langAria": "臨床インターフェースの言語を選択",
      "tabAtlas": "1. 週数別胎児アトラス (1〜42週)",
      "tabSchedule": "2. 妊婦健診・検査スケジュール (全15回)",
      "tabTriage": "3. 危険な症状の緊急トリアージ",
      "tabMeds": "4. 妊娠中の安全な薬・栄養検索",
      "datingMethodLabel": "妊娠週数の算出方法",
      "datingLmp": "最終月経開始日 (LMP)",
      "datingEdd": "出産予定日 (超音波確定 EDD)",
      "datingConception": "排卵日 / 受精日",
      "datingIvf5": "IVF 5日目胚盤胞移植日",
      "datingIvf3": "IVF 3日目分割胚移植日",
      "refDateLabel": "基準日（健診カレンダーを自動算出）",
      "riskProfileLabel": "臨床ケアパス（リスク別オーバーレイ）",
      "riskStandard": "標準的な低リスク単胎妊娠 (ACOG)",
      "riskAma35": "高年妊娠プロトコル (35歳以上 / AMA)",
      "riskGdm": "ハイリスク / 妊娠糖尿病 (GDM) / 高血圧",
      "riskTwins": "双胎・多胎妊娠プロトコル",
      "enterDatePrompt": "日付を入力して健診カレンダーを表示",
      "viewingWeekFmt": "表示中：妊娠第 {w} / 42 週",
      "todayFmt": "本日：妊娠 {w}週 {d}日（第 {aw} 週）",
      "eddPrefix": "出産予定日：",
      "lmpPrefix": "最終月経：",
      "btnJumpToday": "現在の妊娠週数へ移動",
      "btnPrint": "臨床サマリーを印刷",
      "btnPrintTitle": "個別化された健診スケジュールとチェックリストを印刷",
      "btnReset": "リセット",
      "btnResetTitle": "保存した日付とチェック項目をリセット",
      "tri1Btn": "受精前後・妊娠初期 (1〜13週)",
      "tri2Btn": "妊娠中期 (14〜27週)",
      "tri3Btn": "妊娠後期 (28〜40週)",
      "tri4Btn": "正期産後半・分娩 (41〜42週)",
      "btnPrevWeek": "← 前の週",
      "btnPrevWeekAria": "前の妊娠週",
      "btnNextWeek": "次の週 →",
      "btnNextWeekAria": "次の妊娠週",
      "weekOf42Fmt": "第 {w} / 42 週",
      "weekBadgeFmt": "妊娠第 {w} 週 • {phase}",
      "weekChipAriaFmt": "妊娠第 {w} 週：{title}{visit}",
      "weekChipVisitSuffix": "（妊婦健診推奨週）",
      "scrubTimelineLabel": "週数スライダー：",
      "sliderAria": "妊娠1週から42週を選択",
      "legendDotText": "オレンジ色の点はACOG推奨の妊婦健診・血液検査・ワクチン・超音波検査の週を示します",
      "legendTipText": "ヒント：スライダーや週番号（1〜42）をクリックするか、上で最終月経日/出産予定日を入力してください。",
      "daysOfGestationFmt": "妊娠 {d1}〜{d2} 日目",
      "mode3d": "3D インタラクティブ",
      "modePhoto": "高精細胎内フォト",
      "modeSchematic": "解剖シェーマ",
      "btnKick": "胎動キック",
      "btnKickTitle": "子宮をタップして胎児のストレッチ・キック反射を誘発（ショートカット：K）",
      "btnAudioOff": "ドプラ心音",
      "btnAudioOn": "ドプラ：ON",
      "btnAudioTitle": "今週の正確な胎児心拍数（BPM）で合成された超音波ドプラ心音を聴く",
      "btnAutoRotate": "自動回転",
      "btnXray": "X線透視",
      "btnXrayTitle": "半透明の皮膚を通して拍動する心臓・肝臓・脳・脊柱を観察",
      "btnSac": "羊膜腔",
      "btnSacTitle": "羊膜腔と子宮壁の表示/非表示を切り替え",
      "btnResetView": "視点をリセット",
      "viewerHint": "ドラッグで回転 • スクロール/ピンチで拡大縮小 • 赤ちゃんをクリックまたはKキーで胎動 • ドプラでライブ心音再生",
      "sculptingFmt": "第 {w} 週の解剖モデルを構築中…",
      "viewerUnsupported": "インタラクティブ3DにはWebGLが必要です。高精細フォトと解剖シェーマを表示しています。",
      "fhrActiveFmt": "胎児心拍 {bpm} BPM • 胎内活動中",
      "fhrPreCardiac": "心拍開始前の卵割・着床期",
      "bioStageLabel": "発生段階",
      "bioLengthLabel": "大きさ (頭殿長 CRL / 頭踵長 CHL)",
      "bioWeightLabel": "推定体重",
      "bioFhrLabel": "予測胎児心拍数",
      "activeSystemsLabel": "発達中の器官系：",
      "scheduledVisitEyebrow": "● 妊婦健診・検査推奨ウィンドウ",
      "routineCheckInEyebrow": "○ 今週の臨床チェックポイントとケア指針",
      "whenToCheckInFmt": "産婦人科医・助産師への相談ポイント（第 {w} 週）",
      "embryologyEyebrow": "胎児発生学・臓器成熟マイルストーン",
      "whatIsDevelopingFmt": "第 {w} 週における胎児の発達",
      "maternalEyebrow": "母体生理変化と専門医の臨床パール",
      "maternalHeading": "母体の変化とエビデンスに基づく解説",
      "pearlPrefix": "産婦人科医の臨床パール：",
      "riskOverlayAma35": "高年妊娠 (35歳+) オーバーレイ：第12週からの低用量アスピリン (81 mg) 予防内服、第20週の精密胎児形態超音波、第32週の胎児発育超音波、第32〜36週からの毎週のNST/BPPモニタリング、および39週0日〜39週6日での分娩計画を相談します。",
      "riskOverlayGdm": "ハイリスク / 妊娠糖尿病 / 高血圧オーバーレイ：妊娠初期の血糖/HbA1c検査、第12週からの低用量アスピリン、第28・32・36週の胎児発育超音波、第32週からの週2回NST/羊水量測定が含まれます。",
      "riskOverlayTwins": "双胎・多胎オーバーレイ：妊娠初期の超音波で膜性（二絨毛膜性 vs 一絨毛膜性）を確定し、第12週から低用量アスピリン、2〜4週ごとの発育超音波、36週0日〜38週0日の計画分娩を行います。",
      "schedHeading": "ACOG 妊婦健診ロードマップ（第6〜42週）",
      "schedIntro": "標準的な健診間隔：4週ごと（4〜28週）、2週ごと（28〜36週）、毎週（36〜41週）、および41週以降は週2回のNST/BPP監視。受診済みの健診にチェックを入れられます。",
      "schedFilterAll": "全 15 回の健診",
      "schedFilter1": "妊娠初期 (6〜13週)",
      "schedFilter2": "妊娠中期 (14〜28週)",
      "schedFilter3": "妊娠後期 (30〜40週)",
      "schedFilter4": "予定日超過 (41〜42週)",
      "apptWeekSingleFmt": "第 {w} 週",
      "apptWeekRangeFmt": "第 {w1}〜{w2} 週",
      "cadencePrefix": "健診間隔：",
      "completedLabel": "受診済み",
      "markCompletedLabel": "受診済みにする",
      "inspectWeekFmt": "アトラスで第 {w} 週を見る →",
      "procSubboxTitle": "診察・血液検査・超音波・ワクチン",
      "questionsSubboxTitle": "主治医・助産師への質問リスト",
      "highRiskPrefix": "ハイリスク / 35歳以上 / 双胎プロトコル：",
      "triageHeading": "産科症状トリアージ：産院へ電話すべき時 vs. 直ちに救急受診すべき時",
      "triageIntro": "正常な妊娠生理変化と緊急の産科警告サインを見分けます。迷った場合は遠慮なく産婦人科・分娩室へ連絡してください。",
      "tier1Title": "1. 直ちに分娩室 (L&D) / 救急外来へ（赤）",
      "tier1Desc": "妊娠20週以降の方は直ちに産科分娩室トリアージへ、または最寄りの救急外来を受診してください。",
      "tier2Title": "2. 当日1〜4時間以内に産婦人科へ電話（黄）",
      "tier2Desc": "本日中に産婦人科の当直ラインへ連絡し、検査や胎児心拍モニタリングの指示を受けてください。",
      "tier3Title": "3. 正常な妊娠生理的適応（緑）",
      "tier3Desc": "ホルモンや体型変化に伴う一般的な症状です。自宅で安全に対処し、次回の健診時に相談できます。",
      "symptomSearchPlaceholder": "症状を検索（例：頭痛、出血、胎動、かゆみ、発熱、お腹の張り）...",
      "urgencyAll": "すべての緊急度",
      "urgencyEmergency": "直ちに救急 / 分娩室受診のみ",
      "urgencyUrgent": "当日中の産婦人科連絡のみ",
      "urgencyRoutine": "正常な生理的変化のみ",
      "timingPrefix": "時期：",
      "actionProtocolPrefix": "推奨アクション：",
      "noSymptomsMatch": "該当する症状が見つかりませんでした。検索条件をクリアしてください。",
      "medsHeading": "医師推奨の妊娠中のお薬・サプリメント・食品安全性ガイド",
      "medsIntro": "ACOG診療ガイドラインおよびFDA基準に準拠したクイックリファレンスです。内服前に必ず主治医にご確認ください。",
      "medSearchPlaceholder": "薬・サプリ・食品を検索（例：アセトアミノフェン、イブプロフェン、カフェイン、魚、チーズ）...",
      "medFilterAll": "すべての安全性カテゴリ",
      "medFilterApproved": "ACOG第一選択 / 承認薬のみ",
      "medFilterCaution": "1日量制限あり / 要医師相談",
      "medFilterAvoid": "妊娠中禁忌 / 回避すべきもの",
      "categoryPrefix": "カテゴリ：",
      "dosingPrefix": "臨床用量 / 上限目安：",
      "noMedsMatch": "該当する薬や食品が見つかりませんでした。",
      "footerDisclaimerTitle": "臨床リファレンスに関するご注意：",
      "footerDisclaimerBody": " 本コンテンツはACOG、SMFM、CDCの周産期ガイドラインに基づき教育目的で作成されています。産婦人科医や助産師による個別の医学的診断に代わるものではありません。",
      "footerPrivacyTitle": "100% プライベート＆オフライン動作：",
      "footerPrivacyBody": " 出産予定日の計算や健診チェックリストはすべてブラウザ内にのみ保存され、外部へ送信されることはありません。",
      "svgAriaFmt": "妊娠第 {w} 週の臨床発生学・胎児解剖シェーマ：{title}",
      "svgZonaPellucida": "透明帯",
      "svgOocyteNucleus": "卵母細胞核",
      "svgPolarBody1": "第一極体",
      "svgCoronaRadiata": "放線冠",
      "svgOvarianFollicle": "卵巣卵胞壁",
      "svgBlastomere": "割球 (16細胞桑実胚)",
      "svgPolarBodies": "極体",
      "svgInnerCellMass": "内部細胞塊",
      "svgTrophoblastRing": "栄養膜リング",
      "svgBlastocoel": "胚盤胞腔",
      "svgEndometrium": "子宮内膜壁",
      "svgForebrainOptic": "前脳・眼杯",
      "svgCardiacProminence": "心隆起",
      "svgYolkSac": "二次卵黄嚢",
      "svgSomites": "背側体節・脊柱",
      "svgHandFootPlates": "手板・足板",
      "svgPlacenta": "胎盤盤",
      "svgUmbilicalCord": "3血管臍帯",
      "svgCortex": "大脳皮質",
      "svgHeart": "4腔心臓",
      "svgLimbsTerm": "屈曲四肢 (正期産)",
      "svgLimbsFetal": "関節形成四肢",
      "svgTermCradle": " • 正期産頭位",
      "navAria": "臨床アトラスのセクション",
      "personalizationAria": "妊娠週数計算機とリスクプロファイル",
      "trimesterJumpAria": "妊娠期（トリメスター）で移動",
      "weekStripAria": "妊娠第1週〜第42週を選択",
      "viewModeAria": "表示モード切替",
      "viewerControlsAria": "3D表示および子宮内インタラクティブ操作",
      "schedFilterAria": "健診スケジュールを時期別に絞り込む",
      "symptomSearchAria": "産科症状を検索",
      "urgencyFilterAria": "緊急度レベルで症状を絞り込む",
      "medSearchAria": "薬・サプリメント・食品を検索",
      "medFilterAria": "臨床安全性カテゴリーで絞り込む",
      "photoNoneCaption": "この週のフォトリアル静止画はまだありません。週別の立体モデルを見るには「3Dインタラクティブ」に切り替えてください。",
      "photoNearestFmt": "最も近いフォトリアル参考画像（第{w1}〜{w2}週）：{caption} 第{w}週モデルを見るには「3Dインタラクティブ」に切り替えてください。",
      "webglTitle": "3Dインタラクティブ表示にはブラウザのWebGL対応が必要です。",
      "canvas3dAria": "インタラクティブ3D胚・胎児モデル。ドラッグまたは矢印キーで回転、プラス・マイナスで拡大縮小、クリックまたはKキーで胎動（キック）、Rキーで視点リセット。",
      "mtNoticeTitle": "翻訳に関するご案内：",
      "mtNoticeBody": "本翻訳は機械翻訳を併用しており、母語話者の医師による校閲前です。英語原文が臨床基準となるため、安全上重要な指針には英語原文も併記しています。本ガイドは米国（ACOG）の診療指針に基づいており、各国のガイドライン、医薬品名、救急電話番号は異なります。緊急時は地域の救急番号へ連絡してください。",
      "englishRefLabel": "英語原文（臨床リファレンス）：",
      "reviewFlagTitle": "母語話者医師による校閲待ちの翻訳",
      "englishFallbackLabel": "英語で表示中（翻訳準備中）",
      "langLoading": "言語を読み込み中…",
      "langLoadError": "この言語を読み込めませんでした。代わりに英語を表示しています。"
    },
    "ko": {
      "pageTitle": "산전 임상 아틀라스 — 수정부터 출산까지 산부인과 및 배아학 인터랙티브 가이드 (임신 1–42주)",
      "skipLink": "주요 임상 콘텐츠로 건너뛰기",
      "appTitle": "산전 임상 아틀라스",
      "appSubtitle": "수정부터 탄생까지 양방향 산부인과 및 태아 발생학 의학 레퍼런스",
      "badgeAcog": "ACOG / SMFM 가이드라인 준수 • 1–42주",
      "langLabel": "언어",
      "langAria": "임상 인터페이스 언어 선택",
      "tabAtlas": "1. 주수별 태아 아틀라스 (1–42주)",
      "tabSchedule": "2. 산전 진찰 및 검사 일정 (15회 방문)",
      "tabTriage": "3. 위험 증상 응급 분류 (Triage)",
      "tabMeds": "4. 임신 중 안전한 약물 및 영양 검색",
      "datingMethodLabel": "임신 주수 산정 기준",
      "datingLmp": "마지막 생리 시작일 (LMP)",
      "datingEdd": "분만예정일 (초음파 확정 EDD)",
      "datingConception": "배란일 / 수정일",
      "datingIvf5": "시험관(IVF) 5일 배반포 이식일",
      "datingIvf3": "시험관(IVF) 3일 배아 이식일",
      "refDateLabel": "기준 날짜 (산전 달력 자동 매핑)",
      "riskProfileLabel": "임상 위험도 프로토콜 오버레이",
      "riskStandard": "표준 저위험 단태아 임신 (ACOG)",
      "riskAma35": "고령 임신 프로토콜 (35세 이상 / AMA)",
      "riskGdm": "고위험 / 임신성 당뇨 (GDM) / 고혈압",
      "riskTwins": "쌍태아 / 다태아 임신 프로토콜",
      "enterDatePrompt": "날짜를 입력하여 산전 달력을 매핑하세요",
      "viewingWeekFmt": "현재 보기: 임신 {w} / 42주",
      "todayFmt": "오늘: {w}주 {d}일 (임신 {aw}주)",
      "eddPrefix": "분만예정일: ",
      "lmpPrefix": "마지막 생리일: ",
      "btnJumpToday": "내 현재 주수로 이동",
      "btnPrint": "임상 요약 인쇄",
      "btnPrintTitle": "맞춤형 산전 일정표 및 체크리스트 인쇄",
      "btnReset": "초기화",
      "btnResetTitle": "저장된 날짜 및 체크박스 초기화",
      "tri1Btn": "임신 준비 및 초기 (1–13주)",
      "tri2Btn": "임신 중기 (14–27주)",
      "tri3Btn": "임신 후기 (28–40주)",
      "tri4Btn": "만삭 후기 및 분만 (41–42주)",
      "btnPrevWeek": "← 이전 주",
      "btnPrevWeekAria": "이전 임신 주수",
      "btnNextWeek": "다음 주 →",
      "btnNextWeekAria": "다음 임신 주수",
      "weekOf42Fmt": "임신 {w} / 42주",
      "weekBadgeFmt": "임신 {w}주 • {phase}",
      "weekChipAriaFmt": "임신 {w}주: {title}{visit}",
      "weekChipVisitSuffix": " (산전 진찰 권장 주수)",
      "scrubTimelineLabel": "주수 타임라인:",
      "sliderAria": "임신 1주부터 42주까지 선택",
      "legendDotText": "주황색 점은 ACOG 권장 산부인과 진찰, 혈액검사, 예방접종 또는 초음파 검사 주수를 나타냅니다",
      "legendTipText": "팁: 슬라이더를 움직이거나 주수 번호(1–42)를 클릭하고, 위에서 마지막 생리일/예정일을 입력하세요.",
      "daysOfGestationFmt": "임신 {d1}–{d2}일차",
      "mode3d": "3D 인터랙티브",
      "modePhoto": "초실사 자궁 내 사진",
      "modeSchematic": "해부학 모식도",
      "btnKick": "부드러운 태동",
      "btnKickTitle": "자궁을 탭하여 태아 기지개 및 발차기 반사를 유도합니다 (단축키: K)",
      "btnAudioOff": "도플러 심장음",
      "btnAudioOn": "도플러: 켜짐",
      "btnAudioTitle": "이번 주 정확한 BPM으로 합성된 산부인과 초음파 도플러 태아 심장음 듣기",
      "btnAutoRotate": "자동 회전",
      "btnXray": "X-레이 투시",
      "btnXrayTitle": "반투명 피부를 통해 뛰는 심장, 간, 뇌 및 척추 관찰",
      "btnSac": "양막주머니",
      "btnSacTitle": "양막주머니와 자궁벽 표시/숨기기",
      "btnResetView": "시점 초기화",
      "viewerHint": "드래그하여 회전 • 스크롤/핀치로 확대 • 아기 클릭 또는 K키로 태동 유도 • 도플러 버튼으로 실시간 심박음 재생",
      "sculptingFmt": "임신 {w}주 해부학 모델 생성 중…",
      "viewerUnsupported": "인터랙티브 3D는 WebGL이 필요합니다. 실사 사진 및 해부학 모식도를 대신 표시합니다.",
      "fhrActiveFmt": "태아 심박수 {bpm} BPM • 자궁 내 활성",
      "fhrPreCardiac": "심장 박동 전 난할 / 착상기",
      "bioStageLabel": "발달 단계",
      "bioLengthLabel": "길이 (머리엉덩길이 CRL / 키 CHL)",
      "bioWeightLabel": "추정 체중",
      "bioFhrLabel": "예상 태아 심박수",
      "activeSystemsLabel": "주요 발달 기관:",
      "scheduledVisitEyebrow": "● ACOG 정기 산부인과 진찰 권장 주수",
      "routineCheckInEyebrow": "○ 이번 주 임상 체크인 및 산전 관리 가이드",
      "whenToCheckInFmt": "담당 산부인과 전문의 상담 포인트 (임신 {w}주)",
      "embryologyEyebrow": "배아 발생학 및 주요 장기 성숙",
      "whatIsDevelopingFmt": "임신 {w}주 태아 발달 이정표",
      "maternalEyebrow": "모체 생리학적 변화 및 전문의 임상 팁",
      "maternalHeading": "산모의 신체 변화 및 근거중심 의학 해설",
      "pearlPrefix": "산부인과 전문의 임상 팁: ",
      "riskOverlayAma35": "고령 임신 (35세+) 오버레이: 12주부터 저용량 아스피린(81 mg) 예방 복용 상담, 20주 정밀 초음파, 32주 태아 성장 초음파, 32–36주부터 매주 NST/BPP 태아 감시 및 39주0일–39주6일 분만 계획을 권장합니다.",
      "riskOverlayGdm": "고위험 / 임신성 당뇨 / 고혈압 오버레이: 임신 초기 혈당/HbA1c 기초 검사, 12주 저용량 아스피린, 매월 태아 성장 초음파(28, 32, 36주), 32주부터 주 2회 NST/양수지수 검사를 포함합니다.",
      "riskOverlayTwins": "쌍태아 / 다태아 오버레이: 임신 초기 초음파로 융모막성(이융모막 vs 단일융모막) 확인, 12주 저용량 아스피린, 2–4주 간격 성장 초음파 및 36주0일–38주0일 계획 분만을 시행합니다.",
      "schedHeading": "ACOG 산전 진찰 로드맵 (임신 6–42주)",
      "schedIntro": "표준 산전 진찰 주기: 4주 간격(4–28주), 2주 간격(28–36주), 매주(36–41주) 및 41주 이후 주 2회 NST/BPP 감시. 완료한 진찰에 체크 표시를 할 수 있습니다.",
      "schedFilterAll": "전체 15회 진찰",
      "schedFilter1": "임신 초기 (6–13주)",
      "schedFilter2": "임신 중기 (14–28주)",
      "schedFilter3": "임신 후기 (30–40주)",
      "schedFilter4": "만삭 후기 (41–42주)",
      "apptWeekSingleFmt": "임신 {w}주",
      "apptWeekRangeFmt": "임신 {w1}–{w2}주",
      "cadencePrefix": "진찰 주기: ",
      "completedLabel": "완료됨",
      "markCompletedLabel": "완료로 표시",
      "inspectWeekFmt": "아틀라스에서 {w}주 보기 →",
      "procSubboxTitle": "임상 진찰, 혈액검사, 초음파 및 예방접종",
      "questionsSubboxTitle": "담당 산부인과 전문의에게 물어볼 질문",
      "highRiskPrefix": "고위험 / 35세+ / 다태아 프로토콜: ",
      "triageHeading": "산과 증상 응급 분류: 산부인과 전화 상담 vs. 즉시 분만실 내원",
      "triageIntro": "정상적인 임신 생리적 적응과 응급 산과 경고 징후를 구분합니다. 의심스러울 때는 주저하지 말고 분만실이나 당직 의료진에게 연락하세요.",
      "tier1Title": "1. 즉시 분만실 (L&D) / 응급실 내원 (적색 경보)",
      "tier1Desc": "임신 20주 이상인 경우 즉시 분만실 응급실로, 또는 가장 가까운 응급실로 이동하세요.",
      "tier2Title": "2. 당일 1–4시간 이내 산부인과 연락 (황색 주의)",
      "tier2Desc": "오늘 산부인과 당직 라인으로 연락하여 혈액검사, 태아 심박동 모니터링 또는 처방을 받으세요.",
      "tier3Title": "3. 정상적인 임신 생리 변화 (녹색 안심)",
      "tier3Desc": "호르몬이나 체형 변화로 인한 자연스러운 증상으로 가정에서 관리하며 다음 정기 진찰 때 상담할 수 있습니다.",
      "symptomSearchPlaceholder": "증상 검색 (예: 두통, 출혈, 태동 감소, 가려움증, 발열, 배뭉침)...",
      "urgencyAll": "모든 응급 단계",
      "urgencyEmergency": "즉시 분만실 / 응급실 내원만 보기",
      "urgencyUrgent": "당일 산부인과 연락만 보기",
      "urgencyRoutine": "정상 생리적 변화만 보기",
      "timingPrefix": "발생 시기: ",
      "actionProtocolPrefix": "권장 행동 수칙: ",
      "noSymptomsMatch": "검색 조건에 맞는 증상이 없습니다.",
      "medsHeading": "전문의 승인 임신 중 약물, 영양제 및 식품 안전성 가이드",
      "medsIntro": "ACOG 진료 지침 및 FDA 기준에 맞춘 빠른 참조 가이드입니다. 복용 전 반드시 담당 산부인과 전문의와 상의하세요.",
      "medSearchPlaceholder": "약물, 영양제 또는 식품 검색 (예: 타이레놀, 이부프로펜, 카페인, 생선, 치즈)...",
      "medFilterAll": "모든 안전성 등급",
      "medFilterApproved": "ACOG 1차 권장 / 안전 승인",
      "medFilterCaution": "일일 권장량 제한 / 전문의 상담",
      "medFilterAvoid": "임신 중 금기 / 섭취 주의",
      "categoryPrefix": "분류: ",
      "dosingPrefix": "임상 용량 / 제한 기준: ",
      "noMedsMatch": "검색 조건에 맞는 약물이나 식품이 없습니다.",
      "footerDisclaimerTitle": "임상 참조 안내:",
      "footerDisclaimerBody": " 본 콘텐츠는 ACOG, SMFM 및 CDC 주산기 임상 가이드라인을 바탕으로 교육 목적으로 작성되었으며 전문의의 진료를 대체하지 않습니다.",
      "footerPrivacyTitle": "100% 개인정보 보호 및 오프라인 작동:",
      "footerPrivacyBody": " 모든 분만예정일 계산과 진찰 체크리스트는 외부 추적 없이 브라우저 내에 로컬로만 저장됩니다.",
      "svgAriaFmt": "임신 {w}주 임상 배아 및 태아 해부학 모식도: {title}",
      "svgZonaPellucida": "투명대",
      "svgOocyteNucleus": "난모세포 핵",
      "svgPolarBody1": "제1극체",
      "svgCoronaRadiata": "방사관",
      "svgOvarianFollicle": "난소 난포벽",
      "svgBlastomere": "할구 (16세포 상실배)",
      "svgPolarBodies": "극체",
      "svgInnerCellMass": "내세포괴",
      "svgTrophoblastRing": "영양막 고리",
      "svgBlastocoel": "배반포강",
      "svgEndometrium": "자궁내막벽",
      "svgForebrainOptic": "전뇌 및 안배",
      "svgCardiacProminence": "심장 융기",
      "svgYolkSac": "2차 난황낭",
      "svgSomites": "등쪽 체절 및 척추",
      "svgHandFootPlates": "손판 및 발판",
      "svgPlacenta": "태반 원반",
      "svgUmbilicalCord": "3혈관 탯줄",
      "svgCortex": "대뇌 피질",
      "svgHeart": "4심방·심실 심장",
      "svgLimbsTerm": "굴곡된 사지 (만삭)",
      "svgLimbsFetal": "관절 형성 사지",
      "svgTermCradle": " • 만삭 두위 자세",
      "navAria": "임상 아틀라스 섹션",
      "personalizationAria": "임신 주수 계산기 및 위험군 프로필",
      "trimesterJumpAria": "삼분기별 빠른 이동",
      "weekStripAria": "임신 1주부터 42주까지 선택",
      "viewModeAria": "시각화 모드",
      "viewerControlsAria": "3D 뷰 및 양막 인터랙티브 컨트롤",
      "schedFilterAria": "삼분기별로 산전 진찰 필터링",
      "symptomSearchAria": "산과 증상 검색",
      "urgencyFilterAria": "응급도 단계별로 증상 필터링",
      "medSearchAria": "약물 및 영양 항목 검색",
      "medFilterAria": "임상 안전성 범주별로 필터링",
      "photoNoneCaption": "이 주수에 해당하는 실사 이미지가 아직 없습니다. 주수별 정밀 모델은 3D 인터랙티브 모드로 전환해 확인하세요.",
      "photoNearestFmt": "가장 가까운 실사 참조 이미지 (임신 {w1}–{w2}주): {caption} {w}주차 모델은 3D 인터랙티브 모드로 전환하세요.",
      "webglTitle": "3D 인터랙티브 모드를 사용하려면 브라우저의 WebGL 지원이 필요합니다.",
      "canvas3dAria": "인터랙티브 3D 배아 및 태아 모델. 드래그하거나 화살표 키로 회전하고, 플러스 및 마이너스 키로 확대/축소하며, 클릭하거나 K 키를 눌러 태동을 체험하고, R 키로 초기화합니다.",
      "mtNoticeTitle": "번역 안내:",
      "mtNoticeBody": "이 번역은 기계 번역의 도움을 받아 작성되었으며 아직 원어민 임상의의 감수를 거치지 않았습니다. 영문 원문이 임상 기준이므로 안전과 직결된 지침은 영문 원문을 함께 표시합니다. 본 가이드는 미국(ACOG) 진료 지침을 따르며, 국가별로 세부 지침, 약품명 및 응급 전화번호가 다를 수 있습니다. 응급 상황 시 현지 응급 구조 번호로 연락하세요.",
      "englishRefLabel": "영문 원문 (임상 참조):",
      "reviewFlagTitle": "원어민 임상의 감수 대기 중인 번역",
      "englishFallbackLabel": "영문으로 표시됨 (번역 준비 중)",
      "langLoading": "언어 불러오는 중…",
      "langLoadError": "선택한 언어를 불러올 수 없어 영문으로 표시합니다."
    },
    "it": {
      "pageTitle": "Atlante Clinico Prenatale — Riferimento Interattivo di Ostetricia ed Embriologia (Settimane 1–42)",
      "skipLink": "Salta al contenuto clinico principale",
      "appTitle": "Atlante Clinico Prenatale",
      "appSubtitle": "Riferimento Interattivo di Ostetricia ed Embriologia dal Concepimento alla Nascita",
      "badgeAcog": "Allineato ACOG / SMFM • Settimane 1–42",
      "langLabel": "Lingua",
      "langAria": "Seleziona la lingua dell'interfaccia clinica",
      "tabAtlas": "1. Atlante Settimana per Settimana (S1–42)",
      "tabSchedule": "2. Visite Ostetriche ed Esami (15 Visite)",
      "tabTriage": "3. Triage dei Sintomi d’Allarme",
      "tabMeds": "4. Farmaci Sicuri e Nutrizione",
      "datingMethodLabel": "Metodo di Datazione",
      "datingLmp": "Primo Giorno dell’Ultima Mestruazione (UM)",
      "datingEdd": "Data Presunta del Parto (DPP da Ecografia)",
      "datingConception": "Data di Ovulazione / Concepimento",
      "datingIvf5": "Trasferimento FIVET Blastocisti (5° Giorno)",
      "datingIvf3": "Trasferimento FIVET Embrione (3° Giorno)",
      "refDateLabel": "Data di Riferimento (Mappa il Calendario)",
      "riskProfileLabel": "Profilo di Rischio Clinico",
      "riskStandard": "Gravidanza Singola a Basso Rischio (ACOG)",
      "riskAma35": "Età Materna Avanzata (35+ / AMA)",
      "riskGdm": "Alto Rischio / Diabete Gestazionale / Ipertensione",
      "riskTwins": "Protocollo Gravidanza Gemellare / Multipla",
      "enterDatePrompt": "Inserisci una data per mappare il calendario",
      "viewingWeekFmt": "Settimana {w} di 42",
      "todayFmt": "Oggi: {w}s {d}g (Settimana {aw})",
      "eddPrefix": "DPP: ",
      "lmpPrefix": "UM: ",
      "btnJumpToday": "Vai alla Mia Settimana Attuale",
      "btnPrint": "Stampa Riepilogo Clinico",
      "btnPrintTitle": "Stampa calendario personalizzato e checklist",
      "btnReset": "Reimposta",
      "btnResetTitle": "Reimposta date salvate e caselle selezionate",
      "tri1Btn": "Periconcepimento e 1° Trimestre (S1–13)",
      "tri2Btn": "2° Trimestre (S14–27)",
      "tri3Btn": "3° Trimestre (S28–40)",
      "tri4Btn": "Termine Tardivo e Parto (S41–42)",
      "btnPrevWeek": "← Sett. Prec.",
      "btnPrevWeekAria": "Settimana gestazionale precedente",
      "btnNextWeek": "Sett. Succ. →",
      "btnNextWeekAria": "Settimana gestazionale successiva",
      "weekOf42Fmt": "Settimana {w} di 42",
      "weekBadgeFmt": "SETTIMANA {w} • {phase}",
      "weekChipAriaFmt": "Settimana {w}: {title}{visit}",
      "weekChipVisitSuffix": " (Finestra visita ostetrica)",
      "scrubTimelineLabel": "Linea Temporale:",
      "sliderAria": "Seleziona settimana gestazionale da 1 a 42",
      "legendDotText": "Il punto arancione indica una visita ostetrica, esame di laboratorio, vaccino o ecografia programmata (ACOG)",
      "legendTipText": "Consiglio: Usa il cursore, clicca su una settimana (1–42) o inserisci UM/DPP sopra per calcolare le date esatte.",
      "daysOfGestationFmt": "Giorni {d1}–{d2} di Gestazione",
      "mode3d": "3D Interattivo",
      "modePhoto": "Foto Realistica",
      "modeSchematic": "Schema Anatomico",
      "btnKick": "Calcetto Dolce",
      "btnKickTitle": "Tocca il grembo per attivare il riflesso di stiramento e calcetto fetale (Scorciatoia: K)",
      "btnAudioOff": "Audio Doppler",
      "btnAudioOn": "Doppler: ATTIVO",
      "btnAudioTitle": "Ascolta il battito cardiaco fetale Doppler ai BPM esatti di questa settimana",
      "btnAutoRotate": "Autorotazione",
      "btnXray": "Raggi X",
      "btnXrayTitle": "Osserva cuore pulsante, fegato, cervello e colonna attraverso la pelle traslucida",
      "btnSac": "Sacco",
      "btnSacTitle": "Mostra o nascondi il sacco amniotico e la parete uterina",
      "btnResetView": "Reimposta Vista",
      "viewerHint": "Trascina per ruotare • Scorri/pizzica per zoom • Clicca sul bimbo o tasto K per Calcetto • Doppler riproduce BCF dal vivo",
      "sculptingFmt": "Modellazione anatomica Settimana {w}…",
      "viewerUnsupported": "Il 3D interattivo richiede WebGL. Visualizzazione delle modalità fotografica e schematica.",
      "fhrActiveFmt": "BCF {bpm} BPM • Attivo In-Utero",
      "fhrPreCardiac": "Segmentazione Pre-Cardiaca / Impianto",
      "bioStageLabel": "Stadio di Sviluppo",
      "bioLengthLabel": "Lunghezza (CRL / CHL)",
      "bioWeightLabel": "Peso Stimato",
      "bioFhrLabel": "Frequenza Cardiaca",
      "activeSystemsLabel": "Sistemi in Sviluppo:",
      "scheduledVisitEyebrow": "● Finestra di Visita Ostetrica Programmata",
      "routineCheckInEyebrow": "○ Controllo Clinico e Guida Prenatale",
      "whenToCheckInFmt": "Quando Consultare il Ginecologo / Ostetrica (Settimana {w})",
      "embryologyEyebrow": "Embriologia e Maturazione degli Organi",
      "whatIsDevelopingFmt": "Cosa si Sviluppa nella Settimana {w}",
      "maternalEyebrow": "Fisiologia Materna e Perla Clinica",
      "maternalHeading": "Cambiamenti Materni e Contesto Basato sulle Evidenze",
      "pearlPrefix": "Perla Clinica Medica: ",
      "riskOverlayAma35": "Protocollo Età Materna Avanzata (35+): Valutare profilassi con aspirina a basso dosaggio (81 mg) dalla Settimana 12, ecografia morfologica di II livello alla Settimana 20, ecografia di accrescimento alla Settimana 32, monitoraggio NST/BPP settimanale dalla Settimana 32–36 e parto a 39s0g–39s6g.",
      "riskOverlayGdm": "Protocollo Alto Rischio / GDM / Ipertensione: Include glicemia/HbA1c nel 1° trimestre, aspirina 81 mg dalla Settimana 12, ecografie mensili di accrescimento (Settimane 28, 32, 36) e NST/AFI bisettimanali dalla Settimana 32.",
      "riskOverlayTwins": "Protocollo Gravidanza Gemellare / Multipla: Determinare la corionicità nell’ecografia del 1° trimestre; aspirina 81 mg alla Settimana 12; ecografie di crescita ogni 2–4 settimane e parto programmato tra 36s0g–38s0g.",
      "schedHeading": "Calendario delle Visite Prenatali ACOG (Settimane 6–42)",
      "schedIntro": "Cadenza ostetrica standard: Ogni 4 settimane (Settimane 4–28), Ogni 2 settimane (Settimane 28–36) e Settimanale (Settimane 36–41), più monitoraggio NST/BPP bisettimanale alla Settimana 41+.",
      "schedFilterAll": "Tutte le 15 Visite",
      "schedFilter1": "1° Trimestre (S6–13)",
      "schedFilter2": "2° Trimestre (S14–28)",
      "schedFilter3": "3° Trimestre (S30–40)",
      "schedFilter4": "Termine Tardivo (S41–42)",
      "apptWeekSingleFmt": "Settimana {w}",
      "apptWeekRangeFmt": "Settimane {w1}–{w2}",
      "cadencePrefix": "Frequenza: ",
      "completedLabel": "Completata",
      "markCompletedLabel": "Segna Completata",
      "inspectWeekFmt": "Vedi Settimana {w} nell’Atlante →",
      "procSubboxTitle": "Esami Clinici, Analisi, Ecografie e Vaccini",
      "questionsSubboxTitle": "Domande da Porre al Ginecologo / Ostetrica",
      "highRiskPrefix": "Protocollo Alto Rischio / 35+ / Gemellare: ",
      "triageHeading": "Triage dei Sintomi Ostetrici: Quando Chiamare il Medico vs. Pronto Soccorso Ostetrico",
      "triageIntro": "Distinguere i normali adattamenti fisiologici della gravidanza dai segnali di allarme ostetrico urgente.",
      "tier1Title": "1. Pronto Soccorso Ostetrico Immediato (Rosso)",
      "tier1Desc": "Recarsi immediatamente al Pronto Soccorso Ostetrico / Sala Parto (se ≥20 settimane) o al Pronto Soccorso più vicino.",
      "tier2Title": "2. Chiamata in Giornata al Ginecologo entro 1–4 Ore (Ambra)",
      "tier2Desc": "Contatta oggi stesso il tuo ginecologo/ostetrica per esami mirati, monitoraggio fetale o terapia.",
      "tier3Title": "3. Adattamento Fisiologico Normale (Verde)",
      "tier3Desc": "Cambiamenti ormonali o biomeccanici attesi in gravidanza gestibili a casa e discutibili alla prossima visita.",
      "symptomSearchPlaceholder": "Cerca sintomi (es. mal di testa, perdite, movimenti, prurito, febbre, contrazioni)...",
      "urgencyAll": "Tutti i Livelli di Urgenza",
      "urgencyEmergency": "Solo Emergenza Immediata / Sala Parto",
      "urgencyUrgent": "Solo Chiamata in Giornata",
      "urgencyRoutine": "Solo Cambiamenti Fisiologici Normali",
      "timingPrefix": "Periodo: ",
      "actionProtocolPrefix": "Protocollo d’Azione: ",
      "noSymptomsMatch": "Nessun sintoma corrisponde alla ricerca.",
      "medsHeading": "Guida Medica a Farmaci, Integratori e Alimentazione Sicura in Gravidanza",
      "medsIntro": "Riferimento rapido allineato alle linee guida ACOG e FDA. Conferma sempre il dosaggio con il tuo medico curante.",
      "medSearchPlaceholder": "Cerca farmaci, integratori o alimenti (es. paracetamolo, ibuprofene, caffeina, pesce, formaggio)...",
      "medFilterAll": "Tutte le Categorie di Sicurezza",
      "medFilterApproved": "Prima Linea ACOG / Approvati",
      "medFilterCaution": "Limite Giornaliero / Consultare il Medico",
      "medFilterAvoid": "Controindicati / Evitare in Gravidanza",
      "categoryPrefix": "Categoria: ",
      "dosingPrefix": "Dosaggio Clinico / Limite: ",
      "noMedsMatch": "Nessun farmaco o alimento corrisponde alla ricerca.",
      "footerDisclaimerTitle": "Avviso di Riferimento Clinico:",
      "footerDisclaimerBody": " I contenuti sono strutturati secondo le linee guida perinatali ACOG, SMFM e CDC a scopo educativo. Non sostituiscono la valutazione medica personalizzata.",
      "footerPrivacyTitle": "100% Privato e Offline:",
      "footerPrivacyBody": " Tutti i calcoli della DPP e le checklist vengono eseguiti localmente nel browser senza tracciamento esterno.",
      "svgAriaFmt": "Schema clinico embriologico e fetale per la Settimana {w}: {title}",
      "svgZonaPellucida": "Zona Pellucida",
      "svgOocyteNucleus": "Nucleo dell’Ovocita",
      "svgPolarBody1": "1° Globulo Polare",
      "svgCoronaRadiata": "Corona Radiata",
      "svgOvarianFollicle": "Follicolo Ovarico",
      "svgBlastomere": "Blastomero (16 Cell.)",
      "svgPolarBodies": "Globuli Polari",
      "svgInnerCellMass": "Massa Cellulare Interna",
      "svgTrophoblastRing": "Anello Trofoblastico",
      "svgBlastocoel": "Cavità del Blastocele",
      "svgEndometrium": "Parete Endometriale",
      "svgForebrainOptic": "Prosencefalo e Calice Ottico",
      "svgCardiacProminence": "Prominenza Cardiaca",
      "svgYolkSac": "Sacco Vitellino Secondario",
      "svgSomites": "Somiti e Colonna Dorsale",
      "svgHandFootPlates": "Piastre di Mani e Piedi",
      "svgPlacenta": "Disco Placentare",
      "svgUmbilicalCord": "Cordone Ombelicale (3 Vasi)",
      "svgCortex": "Corteccia Cerebrale",
      "svgHeart": "Cuore a 4 Camere",
      "svgLimbsTerm": "Arti Flessi (Termine)",
      "svgLimbsFetal": "Arti Articolati",
      "svgTermCradle": " • Posizione a Termine",
      "navAria": "Sezioni dell’Atlante Clinico",
      "personalizationAria": "Calcolatore dell’Età Gestazionale e Profilo di Rischio",
      "trimesterJumpAria": "Salta per Trimestre",
      "weekStripAria": "Seleziona Settimana da 1 a 42",
      "viewModeAria": "Modalità di visualizzazione",
      "viewerControlsAria": "Vista 3D e controlli interattivi dell’utero",
      "schedFilterAria": "Filtra le visite per trimestre",
      "symptomSearchAria": "Cerca sintomi ostetrici",
      "urgencyFilterAria": "Filtra i sintomi per livello di urgenza",
      "medSearchAria": "Cerca farmaci e alimenti",
      "medFilterAria": "Filtra per categoria di sicurezza clinica",
      "photoNoneCaption": "Nessuna immagine fotorealistica disponibile per questa settimana. Passa a 3D Interattivo per il modello specifico della settimana.",
      "photoNearestFmt": "Riferimento fotorealistico più vicino (Settimane {w1}–{w2}): {caption} Passa a 3D Interattivo per il modello della Settimana {w}.",
      "webglTitle": "La modalità 3D Interattivo richiede il supporto WebGL nel browser.",
      "canvas3dAria": "Modello 3D interattivo di embrione e feto. Trascina o usa le frecce per ruotare, più e meno per lo zoom, fai clic o premi K per un calcetto fetale, R per reimpostare.",
      "mtNoticeTitle": "Nota sulla traduzione:",
      "mtNoticeBody": "Questa traduzione è stata assistita da sistemi automatici e non è ancora stata revisionata da un medico madrelingua. Il testo inglese costituisce il riferimento clinico, pertanto le indicazioni critiche per la sicurezza mostrano anche l’originale inglese. Questa guida segue le linee guida USA (ACOG); protocolli locali, nomi commerciali dei farmaci e numeri di emergenza variano per Paese. In caso di emergenza, contatta il numero di emergenza locale.",
      "englishRefLabel": "Originale inglese (riferimento clinico):",
      "reviewFlagTitle": "Traduzione in attesa di revisione clinica madrelingua",
      "englishFallbackLabel": "Mostrato in inglese (traduzione non ancora disponibile)",
      "langLoading": "Caricamento lingua…",
      "langLoadError": "Impossibile caricare questa lingua. Visualizzazione in inglese."
    },
    "fr": {
      "pageTitle": "Atlas Clinique Prénatal — Référence Interactive d’Obstétrique et d’Embryologie (Semaines 1–42)",
      "skipLink": "Passer au contenu clinique principal",
      "appTitle": "Atlas Clinique Prénatal",
      "appSubtitle": "Référence Interactive d’Obstétrique et d’Embryologie de la Conception à la Naissance",
      "badgeAcog": "Conforme ACOG / SMFM • Semaines 1–42",
      "langLabel": "Langue",
      "langAria": "Sélectionner la langue de l’interface clinique",
      "tabAtlas": "1. Atlas Semaine par Semaine (S1–42)",
      "tabSchedule": "2. Consultations et Examens (15 Visites)",
      "tabTriage": "3. Triage des Symptômes d’Alerte",
      "tabMeds": "4. Médicaments et Nutrition Autorisés",
      "datingMethodLabel": "Méthode de Datation",
      "datingLmp": "Premier Jour des Dernières Règles (DDR)",
      "datingEdd": "Date Prévue d’Accouchement (DPA Échographique)",
      "datingConception": "Date d’Ovulation / Conception",
      "datingIvf5": "Transfert FIV de Blastocyste (Jour 5)",
      "datingIvf3": "Transfert FIV d’Embryon (Jour 3)",
      "refDateLabel": "Date de Référence (Calendrier Automatique)",
      "riskProfileLabel": "Protocole de Suivi Clinique",
      "riskStandard": "Grossesse Unique à Bas Risque (ACOG)",
      "riskAma35": "Âge Maternel Avancé (35+ / AMA)",
      "riskGdm": "Haut Risque / Diabète Gestationnel / HTA",
      "riskTwins": "Protocole Grossesse Gémellaire / Multiple",
      "enterDatePrompt": "Saisissez une date pour générer le calendrier",
      "viewingWeekFmt": "Semaine {w} sur 42",
      "todayFmt": "Aujourd’hui : {w}s {d}j (Semaine {aw})",
      "eddPrefix": "DPA : ",
      "lmpPrefix": "DDR : ",
      "btnJumpToday": "Aller à Ma Semaine Actuelle",
      "btnPrint": "Imprimer le Résumé Clinique",
      "btnPrintTitle": "Imprimer le calendrier personnalisé et la liste de suivi",
      "btnReset": "Réinitialiser",
      "btnResetTitle": "Réinitialiser les dates enregistrées et les cases cochées",
      "tri1Btn": "Périconception & 1er Trimestre (S1–13)",
      "tri2Btn": "2e Trimestre (S14–27)",
      "tri3Btn": "3e Trimestre (S28–40)",
      "tri4Btn": "Terme Tardif & Accouchement (S41–42)",
      "btnPrevWeek": "← Sem. Préc.",
      "btnPrevWeekAria": "Semaine gestationnelle précédente",
      "btnNextWeek": "Sem. Suiv. →",
      "btnNextWeekAria": "Semaine gestationnelle suivante",
      "weekOf42Fmt": "Semaine {w} sur 42",
      "weekBadgeFmt": "SEMAINE {w} • {phase}",
      "weekChipAriaFmt": "Semaine {w} : {title}{visit}",
      "weekChipVisitSuffix": " (Fenêtre de consultation médicale)",
      "scrubTimelineLabel": "Frise Chronologique :",
      "sliderAria": "Sélectionner la semaine gestationnelle de 1 à 42",
      "legendDotText": "Le point orange indique un rendez-vous obstétrical, bilan biologique, vaccin ou échographie programmé (ACOG)",
      "legendTipText": "Astuce : Utilisez le curseur, cliquez sur une semaine (1–42) ou saisissez votre DDR/DPA ci-dessus.",
      "daysOfGestationFmt": "Jours {d1}–{d2} de Gestation",
      "mode3d": "3D Interactif",
      "modePhoto": "Photo Réaliste",
      "modeSchematic": "Schéma Anatomique",
      "btnKick": "Petit Coup de Pied",
      "btnKickTitle": "Touchez l’utérus pour déclencher un réflexe d’étirement et de coup de pied fœtal (Raccourci : K)",
      "btnAudioOff": "Audio Doppler",
      "btnAudioOn": "Doppler : ACTIF",
      "btnAudioTitle": "Écouter le rythme cardiaque fœtal Doppler synthétisé aux BPM exacts de cette semaine",
      "btnAutoRotate": "Rotation Auto",
      "btnXray": "Rayons X",
      "btnXrayTitle": "Observer le cœur battant, le foie, le cerveau et la colonne à travers la peau translucide",
      "btnSac": "Sac",
      "btnSacTitle": "Afficher ou masquer le sac amniotique et la paroi utérine",
      "btnResetView": "Réinitialiser la Vue",
      "viewerHint": "Glisser pour pivoter • Molette/pincer pour zoomer • Cliquer sur bébé ou touche K pour un Coup de Pied • Doppler joue le RCF en direct",
      "sculptingFmt": "Modélisation anatomique de la Semaine {w}…",
      "viewerUnsupported": "Le mode 3D interactif nécessite WebGL. Affichage des vues photographique et schématique.",
      "fhrActiveFmt": "RCF {bpm} BPM • Actif In-Utero",
      "fhrPreCardiac": "Segmentation Pré-Cardiaque / Implantation",
      "bioStageLabel": "Stade de Développement",
      "bioLengthLabel": "Taille (LCC / LCT)",
      "bioWeightLabel": "Poids Estimé",
      "bioFhrLabel": "Rythme Cardiaque Fœtal",
      "activeSystemsLabel": "Systèmes en Développement :",
      "scheduledVisitEyebrow": "● Fenêtre de Consultation Obstétricale Programmée",
      "routineCheckInEyebrow": "○ Suivi Clinique & Conseils Prénataux",
      "whenToCheckInFmt": "Quand Consulter Votre Médecin / Sage-Femme (Semaine {w})",
      "embryologyEyebrow": "Embryologie & Maturation des Organes",
      "whatIsDevelopingFmt": "Ce Qui se Développe à la Semaine {w}",
      "maternalEyebrow": "Physiologie Maternelle & Perle Médicale",
      "maternalHeading": "Changements Maternels & Contexte Fondé sur les Preuves",
      "pearlPrefix": "Perle Clinique Médicale : ",
      "riskOverlayAma35": "Protocole Âge Maternel Avancé (35+) : Discuter l’aspirine à faible dose (81 mg) dès la Semaine 12, échographie morphologique de niveau II à la Semaine 20, échographie de croissance à la Semaine 32, surveillance RCF/BPP hebdomadaire dès les Semaines 32–36 et accouchement prévu entre 39 SA et 39 SA + 6j.",
      "riskOverlayGdm": "Protocole Haut Risque / DG / HTA : Inclut glycémie/HbA1c au 1er trimestre, aspirine 81 mg dès la Semaine 12, échographies mensuelles de croissance (Semaines 28, 32, 36) et surveillance RCF/ILA deux fois par semaine dès la Semaine 32.",
      "riskOverlayTwins": "Protocole Grossesse Gémellaire / Multiple : Déterminer la chorionicité au 1er trimestre ; aspirine 81 mg à la Semaine 12 ; échographies de croissance toutes les 2–4 semaines et accouchement programmé entre 36 et 38 SA.",
      "schedHeading": "Calendrier de Suivi Prénatal ACOG (Semaines 6–42)",
      "schedIntro": "Rythme obstétrical standard : toutes les 4 semaines (Semaines 4–28), toutes les 2 semaines (Semaines 28–36) et hebdomadaire (Semaines 36–41), plus surveillance RCF/BPP bi-hebdomadaire à partir de 41 SA.",
      "schedFilterAll": "Les 15 Consultations",
      "schedFilter1": "1er Trimestre (S6–13)",
      "schedFilter2": "2e Trimestre (S14–28)",
      "schedFilter3": "3e Trimestre (S30–40)",
      "schedFilter4": "Terme Tardif (S41–42)",
      "apptWeekSingleFmt": "Semaine {w}",
      "apptWeekRangeFmt": "Semaines {w1}–{w2}",
      "cadencePrefix": "Fréquence : ",
      "completedLabel": "Effectuée",
      "markCompletedLabel": "Marquer Effectuée",
      "inspectWeekFmt": "Voir la Semaine {w} dans l’Atlas →",
      "procSubboxTitle": "Examens Cliniques, Bilans, Échographies & Vaccins",
      "questionsSubboxTitle": "Questions à Poser à Votre Obstétricien / Sage-Femme",
      "highRiskPrefix": "Protocole Haut Risque / 35+ / Gémellaire : ",
      "triageHeading": "Triage des Symptômes Obstétricaux : Quand Appeler vs. Urgences Maternité Immédiates",
      "triageIntro": "Distinguer les adaptations physiologiques normales de la grossesse des signes d’alerte obstétricaux urgents.",
      "tier1Title": "1. Urgences Maternité Immédiates (Rouge)",
      "tier1Desc": "Rendez-vous immédiatement aux Urgences Maternité / Salle de Naissance (si ≥20 SA) ou aux Urgences les plus proches.",
      "tier2Title": "2. Appel Obstétrical le Jour Même sous 1–4 Heures (Ambre)",
      "tier2Desc": "Contactez aujourd’hui la garde de votre obstétricien/sage-femme pour un bilan, un monitoring fœtal ou un traitement.",
      "tier3Title": "3. Adaptation Physiologique Normale (Vert)",
      "tier3Desc": "Changements hormonaux ou biomécaniques attendus pouvant être soulagés à domicile et évoqués lors de la prochaine visite.",
      "symptomSearchPlaceholder": "Rechercher un symptôme (ex. céphalée, saignement, mouvements fœtaux, fièvre, contractions)...",
      "urgencyAll": "Tous les Niveaux d’Urgence",
      "urgencyEmergency": "Urgences Immédiates Uniquement",
      "urgencyUrgent": "Appel le Jour Même Uniquement",
      "urgencyRoutine": "Changements Physiologiques Normaux Uniquement",
      "timingPrefix": "Période : ",
      "actionProtocolPrefix": "Protocole d’Action : ",
      "noSymptomsMatch": "Aucun symptôme ne correspond à votre recherche.",
      "medsHeading": "Guide Médical des Médicaments, Compléments et Aliments Autorisés pendant la Grossesse",
      "medsIntro": "Référence rapide alignée sur les recommandations de l’ACOG et de la FDA. Confirmez toujours la posologie avec votre praticien.",
      "medSearchPlaceholder": "Rechercher un médicament, complément ou aliment (ex. paracétamol, ibuprofène, caféine, poisson, fromage)...",
      "medFilterAll": "Toutes les Catégories de Sécurité",
      "medFilterApproved": "Première Intention ACOG / Autorisés",
      "medFilterCaution": "Dose Quotidienne Limitée / Avis Médical",
      "medFilterAvoid": "Contre-indiqués / À Éviter",
      "categoryPrefix": "Catégorie : ",
      "dosingPrefix": "Posologie Clinique / Limite : ",
      "noMedsMatch": "Aucun médicament ou aliment ne correspond à votre recherche.",
      "footerDisclaimerTitle": "Avis de Référence Clinique :",
      "footerDisclaimerBody": " Ce contenu est structuré selon les recommandations périnatales de l’ACOG, de la SMFM et du CDC à titre éducatif. Il ne remplace pas une consultation médicale personnalisée.",
      "footerPrivacyTitle": "100 % Privé & Local :",
      "footerPrivacyBody": " Tous les calculs de terme et listes de suivi s’exécutent localement dans votre navigateur sans pistage externe.",
      "svgAriaFmt": "Schéma clinique embryologique et fœtal pour la Semaine {w} : {title}",
      "svgZonaPellucida": "Zone Pellucide",
      "svgOocyteNucleus": "Noyau de l’Ovocyte",
      "svgPolarBody1": "1er Globule Polaire",
      "svgCoronaRadiata": "Corona Radiata",
      "svgOvarianFollicle": "Follicule Ovarien",
      "svgBlastomere": "Blastomère (16 cell.)",
      "svgPolarBodies": "Globules Polaires",
      "svgInnerCellMass": "Masse Cellulaire Interne",
      "svgTrophoblastRing": "Anneau Trophoblastique",
      "svgBlastocoel": "Cavité du Blastocèle",
      "svgEndometrium": "Paroi Endométriale",
      "svgForebrainOptic": "Prosencéphale & Cupule Optique",
      "svgCardiacProminence": "Proéminence Cardiaque",
      "svgYolkSac": "Vésicule Vitelline Secondaire",
      "svgSomites": "Somites & Tube Neural",
      "svgHandFootPlates": "Palettes Mains & Pieds",
      "svgPlacenta": "Disque Placentaire",
      "svgUmbilicalCord": "Cordon Ombilical (3 Vaisseaux)",
      "svgCortex": "Cortex Cérébral",
      "svgHeart": "Cœur à 4 Cavités",
      "svgLimbsTerm": "Membres Fléchis (Terme)",
      "svgLimbsFetal": "Membres Articulés",
      "svgTermCradle": " • Présentation à Terme",
      "navAria": "Sections de l’Atlas Clinique",
      "personalizationAria": "Calculateur d’Âge Gestationnel et Profil de Risque",
      "trimesterJumpAria": "Accès rapide par Trimestre",
      "weekStripAria": "Sélectionner la Semaine 1 à 42",
      "viewModeAria": "Mode de visualisation",
      "viewerControlsAria": "Vue 3D et commandes interactives intra-utérines",
      "schedFilterAria": "Filtrer les consultations par trimestre",
      "symptomSearchAria": "Rechercher des symptômes obstétricaux",
      "urgencyFilterAria": "Filtrer les symptômes par niveau d’urgence",
      "medSearchAria": "Rechercher des médicaments et aliments",
      "medFilterAria": "Filtrer par catégorie de sécurité clinique",
      "photoNoneCaption": "Aucune image photoréaliste n’est encore disponible pour cette semaine. Passez en 3D Interactif pour le modèle spécifique de la semaine.",
      "photoNearestFmt": "Référence photoréaliste la plus proche (Semaines {w1}–{w2}) : {caption} Passez en 3D Interactif pour le modèle de la Semaine {w}.",
      "webglTitle": "Le mode 3D Interactif nécessite la prise en charge de WebGL par ce navigateur.",
      "canvas3dAria": "Modèle 3D interactif d’embryon et de fœtus. Faites glisser ou utilisez les flèches pour pivoter, plus et moins pour zoomer, cliquez ou appuyez sur K pour un mouvement fœtal, R pour réinitialiser.",
      "mtNoticeTitle": "Note de traduction :",
      "mtNoticeBody": "Cette traduction a été réalisée avec assistance informatique et n’a pas encore été relue par un clinicien de langue maternelle. Le texte anglais fait foi sur le plan clinique ; les consignes critiques de sécurité affichent donc aussi l’original anglais. Ce guide suit les recommandations américaines (ACOG) ; les protocoles locaux, noms commerciaux de médicaments et numéros d’urgence diffèrent selon le pays. En cas d’urgence, appelez le numéro d’urgence local.",
      "englishRefLabel": "Original en anglais (référence clinique) :",
      "reviewFlagTitle": "Traduction en attente de relecture par un clinicien natif",
      "englishFallbackLabel": "Affiché en anglais (traduction non disponible)",
      "langLoading": "Chargement de la langue…",
      "langLoadError": "Impossible de charger cette langue. Affichage en anglais."
    }
  },
  "DATA": {
    "es": {
      "weeks": {
        "1": {
          "phaseLabel": "Periconcepcional (Fase Menstrual / Folicular)",
          "stageTitle": "Reclutamiento Folicular y Renovación Endometrial",
          "biologicalStage": "Cohorte de Folículos Ováricos",
          "lengthMetric": "0.04 mm (Folículo Primordial)",
          "weightMetric": "< 0,001 g",
          "heartRateBpm": "Aún no formado (Preconcepción)",
          "keyOrgans": [
            "Eje Hipotálamo-Hipófisis-Ovario",
            "Capa Basal Endometrial",
            "Selección del Folículo Dominante"
          ],
          "fetalMilestones": [
            "La datación obstétrica comienza el Día 1 de la Fecha de Última Menstruación (FUM), unas 2 semanas antes de la fecundación real.",
            "La hormona foliculoestimulante (FSH) recluta una cohorte de folículos ováricos antrales; emerge un folículo dominante de Graaf.",
            "El aumento del estradiol prolifera el endometrio funcional para preparar un lecho de implantación vascularizado."
          ],
          "maternalPhysiology": "La descamación menstrual da paso a la fase folicular proliferativa. La temperatura basal permanece en el rango preovulatorio.",
          "doctorCheckIn": "Control Preconcepcional: Confirmar 400–800 mcg diarios de ácido fólico (4 mg si hubo defecto del tubo neural previo), verificar inmunidad a rubéola/varicela y revisar medicamentos crónicos.",
          "clinicalPearl": "El ACOG calcula el embarazo desde el Día 1 de la FUM (40 semanas / 280 días en total) porque el momento de la ovulación varía, mientras que la edad embrionaria es ~2 semanas menor (38 semanas / 266 días)."
        },
        "2": {
          "phaseLabel": "Periconcepcional (Fase Periovulatoria)",
          "stageTitle": "Pico de LH, Ovulación y Captura Tubárica",
          "biologicalStage": "Ovocito Secundario (Metafase II)",
          "lengthMetric": "0.12 mm (Ovocito de 120 µm)",
          "weightMetric": "< 0,001 g",
          "heartRateBpm": "Aún no formado (Ventana de ovulación)",
          "keyOrgans": [
            "Complejo Cúmulo-Ovocito",
            "Zona Pelúcida",
            "Formación del Cuerpo Lúteo"
          ],
          "fetalMilestones": [
            "El pico de hormona luteinizante (LH) a mitad del ciclo reanuda la Meiosis I y expulsa el primer corpúsculo polar.",
            "La ovulación libera el ovocito secundario detenido en Metafase II, captado hacia la ampolla tubárica por las fimbrias.",
            "El folículo roto sekeiniza formando el Cuerpo Lúteo, que secreta progesterona para transformar el endometrio a estado secretor."
          ],
          "maternalPhysiology": "El pico de estrógenos estimula el engrosamiento endometrial y el moco cervical fértil; la temperatura basal corporal aumenta ~0,3 °C (~0,5 °F) tras la ovulación.",
          "doctorCheckIn": "Optimización de la Ventana Fértil: La máxima fecundabilidad ocurre durante los 5 días previos a la ovulación y el día mismo de la ovulación (el ovocito es viable 12–24 horas).",
          "clinicalPearl": "Si la concepción ocurre mediante FIV (IVF), la transferencia de un blastocisto de Día 5 equivale a 2 semanas + 5 días de edad gestacional ese mismo día."
        },
        "3": {
          "phaseLabel": "1.er Trimestre — Etapa Germinal",
          "stageTitle": "Fecundación, Segmentación del Cigoto y Mórula",
          "biologicalStage": "Cigoto → Mórula de 16 Células",
          "lengthMetric": "0.15 – 0.20 mm",
          "weightMetric": "< 0,001 g",
          "heartRateBpm": "Etapa de segmentación avascular",
          "keyOrgans": [
            "Genoma Diploide (46 Cromosomas)",
            "Compactación de Blastómeros",
            "Segregación de Masa Celular Interna"
          ],
          "fetalMilestones": [
            "Fecundación en la ampolla de la trompa de Falopio que forma un cigoto diploide de 46 cromosomas.",
            "Los pronúcleos masculino y femenino se fusionan en un cigoto diploide (46,XX o 46,XY) e inician divisiones mitóticas cada 12–24 horas.",
            "Al 4.º día posconcepción, la mórula de 16 a 32 células se compacta, entra a la cavidad uterina y forma el blastocisto temprano."
          ],
          "maternalPhysiology": "El Factor Temprano del Embarazo (EPF) modula la tolerancia inmunológica materna; la progesterona del cuerpo lúteo sostiene el endometrio.",
          "doctorCheckIn": "Aún no se requiere consulta médica. Evite los AINE (ibuprofeno, naproxeno), ya que inhibir las prostaglandinas puede afectar la implantación.",
          "clinicalPearl": "Durante las Semanas 3–4 (período de «todo o nada»), los blastómeros totipotentes pueden compensar una lesión celular aislada, antes de que comience la organogénesis en la Semana 5."
        },
        "4": {
          "phaseLabel": "1.er Trimestre — Implantación",
          "stageTitle": "Implantación del Blastocisto y hCG del Sincitiotrofoblasto",
          "biologicalStage": "Blastocisto Bilaminar en Implantación",
          "lengthMetric": "0.4 – 1.0 mm",
          "weightMetric": "< 0.01 g",
          "heartRateBpm": "Circulación lacunar primitiva",
          "keyOrgans": [
            "Disco Bilaminar (Epiblasto e Hipoblasto)",
            "Cavidad Amniótica",
            "Saco Vitelino Primario",
            "Lagunas Trofoblásticas"
          ],
          "fetalMilestones": [
            "El blastocisto eclosiona de la zona pelúcida e invade el endometrio uterino decidualizado (Días 6–10 posovulación).",
            "La Masa Celular Interna se diferencia en el disco embrionario bilaminar (epiblasto e hipoblasto).",
            "El sincitiotrofoblasto invade los capilares espirales maternos y secreta beta-hCG, rescatando al cuerpo lúteo para mantener la progesterona."
          ],
          "maternalPhysiology": "Ausencia de menstruación; la beta-hCG sérica es detectable 8–11 días tras la ovulación y se duplica cada 48–72 horas en un embarazo viable.",
          "doctorCheckIn": "¡Prueba de embarazo positiva! Llame a su obstetra o matrona para programar su primera consulta de confirmación y datación (habitualmente entre las Semanas 6 y 9).",
          "clinicalPearl": "Un manchado leve («sangrado de implantación») es común y benigno, pero el dolor pélvico unilateral con sangrado requiere beta-hCG seriada para descartar embarazo ectópico."
        },
        "5": {
          "phaseLabel": "1.er Trimestre — Organogénesis Temprana",
          "stageTitle": "Gastrulación, Placa Neural y Tubo Cardíaco Primitivo",
          "biologicalStage": "Embrión Trilaminar (Estadio de Carnegie 9–10)",
          "lengthMetric": "1.5 – 2.5 mm (LCC)",
          "weightMetric": "0.02 g",
          "heartRateBpm": "85 – 100 LPM (Contracciones incipientes)",
          "keyOrgans": [
            "Ectodermo / Mesodermo / Endodermo",
            "Surco Neural",
            "Creciente Cardiogénica",
            "Somitas"
          ],
          "fetalMilestones": [
            "La gastrulación establece las tres capas germinales: Ectodermo (sistema nervioso/piel), Mesodermo (corazón/huesos/riñones) y Endodermo (intestino/pulmones/hígado).",
            "La placa neural se pliega formando el surco neural flanqueado por los somitas del mesodermo paraxial.",
            "Los tubos endocárdicos se fusionan en un tubo cardíaco primitivo que inicia contracciones peristálticas alrededor del Día 22 posconcepción."
          ],
          "maternalPhysiology": "El rápido aumento de hCG, estrógenos y progesterona provoca náuseas tempranas, sensibilidad mamaria, olfato agudizado y fatiga.",
          "doctorCheckIn": "Si tiene antecedentes de embarazo ectópico, pérdidas recurrentes o FIV, su médico puede solicitar beta-hCG seriada cada 48 h y una ecografía temprana de localización.",
          "clinicalPearl": "En la ecografía transvaginal de la Semana 5, el saco gestacional y el saco vitelino son visibles cuando la beta-hCG supera la zona discriminatoria (~1.500–2.000 mUI/mL)."
        },
        "6": {
          "phaseLabel": "1.er Trimestre — Organogénesis",
          "stageTitle": "Cierre del Tubo Neural, Asa Cardíaca y Esbozos de Extremidades",
          "biologicalStage": "Embrión (Estadio de Carnegie 12–13)",
          "lengthMetric": "4 – 6 mm (LCC)",
          "weightMetric": "0.1 g",
          "heartRateBpm": "100 – 115 LPM",
          "keyOrgans": [
            "Neuroporos Anterior y Posterior",
            "Tubo Cardíaco en Asa en S",
            "Vesículas Ópticas",
            "Placodas Óticas"
          ],
          "fetalMilestones": [
            "Los neuroporos anterior (craneal) y posterior (caudal) se cierran por completo el Día 28 posconcepción, sellando las vesículas cerebrales y la médula espinal.",
            "El tubo cardíaco primitivo realiza su incurvación en S, definiendo aurículas y ventrículos con latido visible en la ecografía transvaginal.",
            "Emergen los esbozos de las extremidades superiores e inferiores junto con los arcos faríngeos (futura mandíbula, paladar y oído medio)."
          ],
          "maternalPhysiology": "El flujo sanguíneo renal aumenta un 25–30 %, causando micción frecuente incluso antes de que el útero comprima la vejiga.",
          "doctorCheckIn": "Ventana de Ecografía de Viabilidad y Datación (Semanas 6–8): Confirma el polo embrionario intrauterino, mide la Longitud Céfalo-Caudal (LCC ±3–5 días de precisión) y documenta el latido cardíaco.",
          "clinicalPearl": "Como el cierre del tubo neural finaliza en la Semana 6, los defectos del tubo neural (espina bífida) se originan antes de la primera consulta prenatal, lo que resalta la importancia del ácido fólico temprano."
        },
        "7": {
          "phaseLabel": "1.er Trimestre — Organogénesis",
          "stageTitle": "Expansión del Telencéfalo, Placas de las Manos y Metanefros",
          "biologicalStage": "Embrión (Estadio de Carnegie 15–16)",
          "lengthMetric": "9 – 11 mm (LCC)",
          "weightMetric": "0.5 g",
          "heartRateBpm": "120 – 140 LPM",
          "keyOrgans": [
            "Hemisferios Cerebrales",
            "Riñón Definitivo (Metanefros)",
            "Rayos Digitales (Placas de la Mano)",
            "Esbozos Pancreáticos"
          ],
          "fetalMilestones": [
            "La neurogénesis avanza a ~100.000 nuevas neuronas por minuto mientras el prosencéfalo se divide en dos hemisferios.",
            "Las placas de las manos se aplanan y forman rayos digitales; se invaginan las vesículas del cristalino y aparece el pigmento retiniano.",
            "El brote ureteral invade el mesénquima metanéfrico para formar los riñones definitivos (metanefros)."
          ],
          "maternalPhysiology": "Las glándulas cervicales secretan un tapón mucoso espeso (opérculo) que sella el canal endocervical frente a bacterias ascendentes.",
          "doctorCheckIn": "Para las náuseas y vómitos del embarazo, la terapia de primera línea del ACOG es Vitamina B6 (piridoxina 10–25 mg tres veces al día) más doxilamina (12.5–25 mg).",
          "clinicalPearl": "Esta semana comienza la herniación fisiológica del intestino medio: el rápido crecimiento intestinal proyecta temporalmente el intestino hacia el cordón umbilical hasta las Semanas 10–11."
        },
        "8": {
          "phaseLabel": "1.er Trimestre — Organogénesis",
          "stageTitle": "Septación del Corazón de 4 Cámaras y Dedos Palmeados",
          "biologicalStage": "Embrión (Estadio de Carnegie 18–20)",
          "lengthMetric": "15 – 17 mm (LCC)",
          "weightMetric": "1.1 g",
          "heartRateBpm": "145 – 165 LPM",
          "keyOrgans": [
            "Válvulas Auriculoventriculares",
            "Tabique Interventricular",
            "Centros de Condrificación",
            "Pabellones Auriculares Externos"
          ],
          "fetalMilestones": [
            "Los cojinetes endocárdicos se fusionan y el tabique interventricular se cierra, completando la arquitectura cardíaca de 4 cámaras.",
            "La apoptosis (muerte celular programada) esculpe las muescas entre los dedos de manos y pies; se flexionan codos y rodillas.",
            "Se forman los moldes esqueléticos cartilaginosos primarios y comienzan movimientos espontáneos del tronco y extremidades."
          ],
          "maternalPhysiology": "El útero crece del tamaño de un puño al de un limón grande; el gasto cardíaco materno aumenta un 20 % por mayor volumen sistólico.",
          "doctorCheckIn": "Consulta Obstétrica Integral y Panel Prenatal Inicial (Semanas 8–10): Hemograma, grupo/Rh/Coombs indirecto, rubéola, hepatitis B/C, VIH, sífilis, urocultivo y citología si corresponde.",
          "clinicalPearl": "La Longitud Céfalo-Caudal (LCC) del primer trimestre (entre las Semanas 7 y 13) es el método más exacto para establecer o corregir la Fecha Probable de Parto (FPP)."
        },
        "9": {
          "phaseLabel": "1.er Trimestre — Etapa Embrionaria Tardía",
          "stageTitle": "Pico de Frecuencia Cardíaca Embrionaria, Fusión Palpebral y Diafragma",
          "biologicalStage": "Embrión Tardío (Estadio de Carnegie 21–22)",
          "lengthMetric": "22 – 25 mm (2.3 cm LCC)",
          "weightMetric": "2.0 g",
          "heartRateBpm": "155 – 175 LPM (Pico Fisiológico)",
          "keyOrgans": [
            "Diafragma Pleuroperitoneal",
            "Párpados Fusionados",
            "Hipófisis y Corteza Suprarrenal",
            "Ligamentos Vocales"
          ],
          "fetalMilestones": [
            "La frecuencia cardíaca embrionaria alcanza su pico fisiológico (~165–175 LPM) mientras madura la inervación parasimpática.",
            "Las membranas pleuroperitoneales se fusionan con el septum transversum para completar el diafragma torácico.",
            "Los párpados cubren los ojos y se fusionan (permaneciendo cerrados hasta las Semanas 25–26 para proteger las córneas)."
          ],
          "maternalPhysiology": "El pico sérico de beta-hCG (~90.000–100.000 mUI/mL) suele coincidir con el pico de náuseas matutinas entre las Semanas 9 y 10.",
          "doctorCheckIn": "Comente con su obstetra las opciones de cribado genético: ADN fetal libre en sangre materna (NIPT) desde la Semana 10+0, cribado de portadores y ecografía de Translucencia Nucal.",
          "clinicalPearl": "Si los vómitos intensos causan pérdida >5 % del peso pregestacional, cetonuria o intolerancia a líquidos por 24 h (hiperémesis gravídica), acuda para hidratación IV y antieméticos."
        },
        "10": {
          "phaseLabel": "1.er Trimestre — Transición Embrión a Feto",
          "stageTitle": "Fin de la Organogénesis y Ventana de ADN Fetal Libre (NIPT)",
          "biologicalStage": "Transición Embrión → Feto (Estadio de Carnegie 23)",
          "lengthMetric": "31 – 35 mm (3.3 cm LCC)",
          "weightMetric": "4.0 g",
          "heartRateBpm": "150 – 170 LPM",
          "keyOrgans": [
            "Osificación Endocondral",
            "Filtración Glomerular de Nefronas",
            "Gérmenes de Dientes Primarios",
            "Vellosidades Coriónicas"
          ],
          "fetalMilestones": [
            "El final de la Semana 10 marca la transición formal de Embrión a Feto: todos los sistemas orgánicos principales están establecidos.",
            "Los riñones metanéfricos comienzan a producir orina fetal diluida, que pronto será el componente principal del líquido amniótico.",
            "La cola embrionaria desaparece por completo; se forman las uñas de las manos y los gérmenes de los dientes de leche."
          ],
          "maternalPhysiology": "El trofoblasto placentario empieza a asumir la síntesis de progesterona y estradiol desde el cuerpo lúteo («cambio luteoplacentario»).",
          "doctorCheckIn": "Se abre la ventana de extracción sanguínea para NIPT (ADN fetal libre, Semana 10+0): detecta Trisomía 21 (Síndrome de Down), Trisomía 18, Trisomía 13 y aneuploidías de cromosomas sexuales con >99 % de sensibilidad para T21.",
          "clinicalPearl": "Como la organogénesis estructural principal concluye al final de la Semana 10, la susceptibilidad a teratógenos estructurales mayores disminuye al iniciar la etapa de crecimiento fetal."
        },
        "11": {
          "phaseLabel": "1.er Trimestre — Período Fetal Temprano",
          "stageTitle": "Retracción del Intestino Medio, Fusión Palatina y Tapones Nasales",
          "biologicalStage": "Feto Temprano",
          "lengthMetric": "4.1 – 4.5 cm (LCC)",
          "weightMetric": "7.5 g",
          "heartRateBpm": "145 – 165 LPM",
          "keyOrgans": [
            "Cierre de la Pared Abdominal",
            "Fusión del Paladar Secundario",
            "Eritropoyesis Hepática",
            "Folículos Pilosos"
          ],
          "fetalMilestones": [
            "La herniación fisiológica del intestino medio se resuelve al rotar el intestino 270° en sentido antihorario y retraerse dentro del abdomen fetal.",
            "Las crestas palatinas maxilares se elevan y se fusionan en la línea media para separar las cavidades oral y nasal.",
            "El hígado fetal se convierte en el órgano principal de hematopoyesis, produciendo hemoglobina fetal (HbF)."
          ],
          "maternalPhysiology": "La resistencia vascular sistémica materna disminuye por la progesterona y el óxido nítrico, pudiendo causar leve mareo ortostático al levantarse rápido.",
          "doctorCheckIn": "Ventana de Ecografía de Translucencia Nucal (TN) del 1.er Trimestre (Semanas 11+0 a 13+6) y Biopsia de Vellosidades Coriales (BVC, Semanas 10–13) si está indicada.",
          "clinicalPearl": "La Hemoglobina Fetal (HbF, alfa-2/gamma-2) tiene mayor afinidad por el oxígeno que la hemoglobina adulta (HbA), facilitando la transferencia de oxígeno a través de la placenta."
        },
        "12": {
          "phaseLabel": "1.er Trimestre — Semana Hito (Tamizaje NT)",
          "stageTitle": "Reflejo de Deglución, Peristaltismo y Ventana de Aspirina a Bajas Dosis",
          "biologicalStage": "Feto",
          "lengthMetric": "5.3 – 5.8 cm (LCC)",
          "weightMetric": "14 g (0.5 oz)",
          "heartRateBpm": "140 – 160 LPM",
          "keyOrgans": [
            "Peristaltismo Gastrointestinal",
            "Hormonas Hipofisarias (ACTH/TSH)",
            "Linfopoyesis Esplénica",
            "Clavículas y Fémures Osificados"
          ],
          "fetalMilestones": [
            "El feto deglute activamente líquido amniótico; el músculo liso intestinal inicia contracciones peristálticas y absorción de glucosa.",
            "Aparecen los centros de osificación primaria en el cráneo, los huesos largos y las vértebras.",
            "Los genitales externos inician su diferenciación morfológica bajo la acción de la DHT (masculino) o en su ausencia (femenino)."
          ],
          "maternalPhysiology": "El fondo uterino se eleva por encima de la sínfisis del pubis, pasando de ser un órgano pélvico a uno abdominal; disminuye la presión sobre la vejiga.",
          "doctorCheckIn": "Consulta de las 12 semanas + Prevención de preeclampsia: ACOG y USPSTF recomiendan iniciar aspirina en dosis baja (81 mg diarios desde la Semana 12 hasta el parto) si presenta ≥1 factor de riesgo alto o ≥2 moderados (p. ej., primer embarazo, edad ≥35, IMC >30).",
          "clinicalPearl": "Una vez confirmada una frecuencia cardíaca fetal normal a las 12 semanas con cribado genético normal, el riesgo estadístico de aborto espontáneo cae por debajo del 1–2 %."
        },
        "13": {
          "phaseLabel": "1.er Trimestre — Última Semana del Primer Trimestre",
          "stageTitle": "Maduración de Cuerdas Vocales, Dermatoglifos y Autonomía Placentaria",
          "biologicalStage": "Feto",
          "lengthMetric": "6.7 – 7.4 cm (LCC)",
          "weightMetric": "25 g (0.9 oz)",
          "heartRateBpm": "140 – 160 LPM",
          "keyOrgans": [
            "Unidad Fetoplacentaria",
            "Huellas Dactilares (Crestas Dérmicas)",
            "Páncreas Endocrino/Exocrino (Insulina)",
            "Folículos Ováricos Primordiales"
          ],
          "fetalMilestones": [
            "Comienzan a formarse las crestas epidérmicas únicas (huellas dactilares) en las yemas de los dedos.",
            "En los fetos femeninos, las ovogonias proliferan rápidamente en los ovarios (~2 millones de folículos primordiales a mitad de la gestación).",
            "El crecimiento de la cabeza se modera respecto al tronco; la cabeza representa ahora cerca de un tercio de la Longitud Céfalo-Caudal."
          ],
          "maternalPhysiology": "Los niveles de hCG se estabilizan y descienden al asumir la placenta plena autonomía endocrina; las náuseas suelen ceder y vuelve la energía.",
          "doctorCheckIn": "Última semana para medir la Translucencia Nucal (TN, debe completarse antes de 13s6d / LCC ≤84 mm). Programe su limpieza dental (segura y recomendada en el embarazo).",
          "clinicalPearl": "La gingivitis gestacional es frecuente por la permeabilidad vascular; la higiene dental de rutina y la lidocaína local (sin sobrecarga sistémica de epinefrina) son completamente seguras."
        },
        "14": {
          "phaseLabel": "2.º Trimestre — Inicio del Segundo Trimestre",
          "stageTitle": "Aparición del Lanugo, Síntesis de Hormona Tiroidea y Expresiones Faciales",
          "biologicalStage": "Feto del 2.º Trimestre",
          "lengthMetric": "8.5 cm (LCC) / ~12 cm (LCT)",
          "weightMetric": "45 g (1.6 oz)",
          "heartRateBpm": "135 – 155 LPM",
          "keyOrgans": [
            "Tiroides Fetal (Tiroxina T4)",
            "Nervio Craneal VII (Facial)",
            "Lanugo Fetal",
            "Próstata / Descenso Ovárico"
          ],
          "fetalMilestones": [
            "La glándula tiroides fetal comienza a captar yodo y a sintetizar tiroxina endógena (T4) para impulsar el neurodesarrollo.",
            "El VII par craneal (nervio facial) inerva los músculos faciales, permitiendo reflejos de fruncir el ceño y hacer muecas.",
            "Comienza a brotar un vello finísimo (lanugo) que fijará la vérnix caseosa protectora sobre la piel."
          ],
          "maternalPhysiology": "Bienvenida al Segundo Trimestre («trimestre dorado»). Vuelve el apetito; el gasto cardíaco materno supera en ~30–40 % el nivel pregestacional.",
          "doctorCheckIn": "Si tiene antecedentes de insuficiencia cervical o parto prematuro espontáneo <34 semanas, consulte sobre la medición seriada de longitud cervical o cerclaje profiláctico (12–14 semanas).",
          "clinicalPearl": "Un aporte adecuado de yodo (220 mcg/día en total durante el embarazo; verifique que su vitamina prenatal incluya yoduro de potasio) es esencial ya que la tiroides fetal se activa en la Semana 14."
        },
        "15": {
          "phaseLabel": "2.º Trimestre — Desarrollo Esquelético y Auditivo",
          "stageTitle": "Huesecillos del Oído Medio, Movimientos Respiratorios Amnióticos y Ventana MSAFP",
          "biologicalStage": "Feto",
          "lengthMetric": "10.1 cm (LCC) / ~14.5 cm (LCT)",
          "weightMetric": "70 g (2.5 oz)",
          "heartRateBpm": "135 – 155 LPM",
          "keyOrgans": [
            "Martillo / Yunque / Estribo",
            "Árbol Traqueobronquial",
            "Diáfisis de Huesos Largos",
            "Papilas Gustativas"
          ],
          "fetalMilestones": [
            "Los tres huesecillos del oído medio (martillo, yunque, estribo) comienzan a osificarse, preparando la vía auditiva conductiva.",
            "Los movimientos respiratorios fetales episódicos movilizan líquido amniótico por el árbol bronquial, estimulando el desarrollo pulmonar.",
            "El feto traga líquido amniótico y produce orina diluida que mantiene el volumen amniótico."
          ],
          "maternalPhysiology": "La actividad melanocítica estimulada por estrógenos puede producir la línea alba pigmentada (línea nigra) y melasma facial.",
          "doctorCheckIn": "Se abre la ventana de Alfa-Fetoproteína Sérica Materna (MSAFP / Tamizaje Cuádruple, Semanas 15–20): evalúa defectos abiertos del tubo neural y de la pared abdominal.",
          "clinicalPearl": "Posición al dormir: A partir de la mitad del segundo trimestre, priorice dormir de lado (especialmente decúbito lateral izquierdo) para evitar comprimir la vena cava inferior."
        },
        "16": {
          "phaseLabel": "2.º Trimestre — Hito del 4.º Mes (Primeros Movimientos)",
          "stageTitle": "Movimientos Oculares Sacádicos, Flexión Coordinada y Primeros Movimientos Fetales",
          "biologicalStage": "Feto",
          "lengthMetric": "11.6 cm (LCC) / ~16.5 cm (LCT)",
          "weightMetric": "100 g (3.5 oz)",
          "heartRateBpm": "130 – 155 LPM",
          "keyOrgans": [
            "Músculos Extraoculares",
            "Gelatina de Wharton del Cordón",
            "Vaciado Cíclico de Vejiga Fetal",
            "Receptores Sensoriales Cutáneos"
          ],
          "fetalMilestones": [
            "Comienzan movimientos oculares sacádicos lentos bajo los párpados fusionados al madurar los núcleos oculomotores.",
            "El corazón fetal bombea ~24 litros (~25 qt) de sangre al día a través del cordón umbilical de 3 vasos (2 arterias y 1 vena recubiertas de gelatina de Wharton).",
            "La vejiga fetal se llena y vacía cada 30–45 minutos, manteniendo el volumen y amortiguación del líquido amniótico."
          ],
          "maternalPhysiology": "Las madres multíparas (o con placenta posterior) pueden empezar a notar los primeros movimientos fetales sutiles entre las Semanas 16 y 20.",
          "doctorCheckIn": "Consulta Obstétrica de las 16 Semanas: Presión arterial, peso, tira reactiva de orina, latido cardíaco fetal con Doppler y extracción de MSAFP si corresponde. ¡Agende su Ecografía Anatómica de las 20 semanas!",
          "clinicalPearl": "Si tiene placenta anterior (adherida a la pared frontal del útero), actúa como amortiguador y suele retrasar la percepción de las primeras patadas hasta las Semanas 20–22; esto es totalmente normal."
        },
        "17": {
          "phaseLabel": "2.º Trimestre — Maduración Adiposa e Inmunológica",
          "stageTitle": "Depósito de Tejido Adiposo Pardo e Inicio de Transferencia de IgG Transplacentaria",
          "biologicalStage": "Feto",
          "lengthMetric": "13.0 cm (LCC) / ~18.5 cm (LCT)",
          "weightMetric": "140 g (5.0 oz)",
          "heartRateBpm": "130 – 155 LPM",
          "keyOrgans": [
            "Tejido Adiposo Pardo (Grasa Parda)",
            "Células Ciliadas Cocleares",
            "Glándulas Sudoríparas",
            "Receptores Placentarios FcRn de IgG"
          ],
          "fetalMilestones": [
            "El Tejido Adiposo Pardo (grasa parda) comienza a depositarse alrededor del cuello, esternón y riñones para la termogénesis posnatal.",
            "Los receptores placentarios FcRn inician el transporte activo de anticuerpos IgG maternos hacia la circulación fetal.",
            "Las células ciliadas cocleares se alinean en el órgano de Corti; los sonidos internos maternos estimulan el oído interno."
          ],
          "maternalPhysiology": "El estiramiento del ligamento redondo a los lados de la pelvis puede causar punzadas inguinales breves al girarse, toser o levantarse.",
          "doctorCheckIn": "Ventana Diagnóstica de Amniocentesis (Semanas 15–20): Se ofrece si el cribado genético fue de alto riesgo o si se requiere diagnóstico cromosómico definitivo.",
          "clinicalPearl": "El dolor del ligamento redondo dura pocos segundos y se desencadena con el movimiento. Los cólicos persistentes, rítmicos o con sangrado requieren evaluación médica."
        },
        "18": {
          "phaseLabel": "2.º Trimestre — Expansión Neurosensorial",
          "stageTitle": "Inicio de la Mielinización, Vérnix Caseosa y Ventana Temprana de Ecografía Anatómica",
          "biologicalStage": "Feto",
          "lengthMetric": "14.2 cm (LCC) / ~20.5 cm (LCT)",
          "weightMetric": "190 g (6.7 oz)",
          "heartRateBpm": "125 – 155 LPM",
          "keyOrgans": [
            "Mielinización de Células de Schwann",
            "Glándulas Sebáceas (Vérnix Caseosa)",
            "Tractos de Salida Cardíacos",
            "Cuerpo Calloso"
          ],
          "fetalMilestones": [
            "Las glándulas sebáceas secretan Vérnix Caseosa: una biopelícula rica en lípidos y antimicrobiana que protege la piel fetal.",
            "Las células de Schwann y los oligodendrocitos inician la mielinización axonal para acelerar la conducción nerviosa.",
            "El cuerpo calloso conecta ambos hemisferios cerebrales; los tractos de salida cardíacos son claramente visibles en ecografía."
          ],
          "maternalPhysiology": "Nadir fisiológico de la presión arterial a mitad del embarazo: la vasodilatación sistémica sitúa la presión en su punto más bajo (~5–10 mmHg bajo el basal) entre las Semanas 18–20.",
          "doctorCheckIn": "Se abre la ventana de la Ecografía Anatómica Integral de Nivel II (Semanas 18–22): la mayoría de los obstetras prefieren realizarla entre 19s0d y 21s0d.",
          "clinicalPearl": "Durante la Ecografía Anatómica, también se mide la Longitud Cervical (normal ≥25 mm a las 18–24 semanas) para evaluar el riesgo de parto prematuro."
        },
        "19": {
          "phaseLabel": "2.º Trimestre — Mapeo Cortical Sensorial",
          "stageTitle": "Mapeo de la Corteza Somatosensorial y Concentración Tubular Renal",
          "biologicalStage": "Feto",
          "lengthMetric": "15.3 cm (LCC) / ~22.5 cm (LCT)",
          "weightMetric": "240 g (8.5 oz)",
          "heartRateBpm": "125 – 155 LPM",
          "keyOrgans": [
            "Corteza Somatosensorial",
            "Asas de Henle Renales",
            "Gérmenes de Dientes Permanentes",
            "Ramificación Bronquiolar"
          ],
          "fetalMilestones": [
            "Las proyecciones talamocorticales llegan a la subplaca de la corteza cerebral, sentando las bases del procesamiento auditivo, visual y táctil.",
            "Los gérmenes de los dientes permanentes se forman detrás de los dientes primarios en el maxilar y la mandíbula.",
            "Comienza la etapa canalicular del desarrollo pulmonar: se dividen los bronquiolos respiratorios y proliferan los capilares pulmonares."
          ],
          "maternalPhysiology": "El volumen sanguíneo materno se ha expandido un ~30–35 %; la mayor demanda de hierro para la masa eritrocitaria requiere un aporte constante de hierro.",
          "doctorCheckIn": "Prepare sus preguntas para la consulta de las 20 semanas y la Ecografía Anatómica (ubicación placentaria respecto al cérvix, cordón de 3 vasos y cursos de preparación al parto).",
          "clinicalPearl": "Si se detecta una placenta «de inserción baja» a las 19–20 semanas, >90 % se resuelven espontáneamente («trofotropismo placentario») al elongarse el segmento uterino inferior hacia la Semana 32."
        },
        "20": {
          "phaseLabel": "2.º Trimestre — Hito de la Mitad del Embarazo",
          "stageTitle": "Hito de la Mitad del Embarazo: Ecografía Anatómica de Nivel II y Fondo Uterino en el Ombligo",
          "biologicalStage": "Feto de Mitad de Gestación",
          "lengthMetric": "25.5 cm (10.0 in Longitud Céfalo-Talón)",
          "weightMetric": "300 g (10.6 oz)",
          "heartRateBpm": "120 – 155 LPM",
          "keyOrgans": [
            "Vistas de 4 Cámaras y Grandes Vasos",
            "Fosa Posterior / Cerebelo",
            "Acumulación de Meconio",
            "Estrato Córneo Epidérmico"
          ],
          "fetalMilestones": [
            "A partir de la Semana 20, los obstetras miden la longitud coronilla-talón (CHL) total en lugar de la longitud coronilla-rabadilla porque las piernas fetales se estiran.",
            "El meconio estéril (células epiteliales descamadas, lanugo, pigmentos biliares y líquido amniótico) se acumula en el colon fetal.",
            "Emergen ciclos circadianos de sueño-vigilia: el feto alterna períodos de 20–40 minutos de actividad y reposo."
          ],
          "maternalPhysiology": "El fondo uterino alcanza el nivel del ombligo materno. De la Semana 20 a la 36, la altura uterina en centímetros equivale aproximadamente a la edad gestacional en semanas (±2 cm).",
          "doctorCheckIn": "Consulta de las 20 Semanas y Ecografía Anatómica de Nivel II (Semanas 18–22): Revisión estructural detallada de ventrículos cerebrales, perfil/labios, corazón de 4 cámaras y tractos de salida, estómago, riñones, vejiga, columna, cordón de 3 vasos, placenta y cérvix.",
          "clinicalPearl": "Por qué importa la presión arterial después de la Semana 20: La hipertensión de inicio reciente (PA ≥140/90) a partir de la Semana 20 define el umbral diagnóstico de Hipertensión Gestacional o Preeclampsia."
        },
        "21": {
          "phaseLabel": "2.º Trimestre — Transición Hematopoyética a Médula Ósea",
          "stageTitle": "Hematopoyesis en Médula Ósea y Maduración de Enzimas Digestivas",
          "biologicalStage": "Feto",
          "lengthMetric": "26.7 cm (10.5 in LCT)",
          "weightMetric": "360 g (12.7 oz)",
          "heartRateBpm": "120 – 155 LPM",
          "keyOrgans": [
            "Eritropoyesis en Médula Ósea",
            "Vellosidades del Intestino Delgado",
            "Pulpa Roja Esplénica",
            "Laberinto Vestibular (Equilibrio)"
          ],
          "fetalMilestones": [
            "El tracto digestivo absorbe agua y azúcares del líquido amniótico deglutido (~24 L / ~25 qt filtrados durante la gestación).",
            "Las microvellosidades intestinales expresan enzimas disacaridasas (lactasa, sacarasa), absorbiendo agua y electrolitos del líquido amniótico.",
            "Los canales semicirculares vestibulares del oído interno detectan el movimiento materno, acunando al bebé al caminar."
          ],
          "maternalPhysiology": "La hormona relaxina flexibiliza la sínfisis del pubis y las articulaciones sacroilíacas para preparar la pelvis, pudiendo causar leve molestia pélvica.",
          "doctorCheckIn": "Si en la ecografía de las 20 semanas alguna estructura quedó parcialmente oculta por la posición fetal, se programa un breve control ecográfico en 2–4 semanas.",
          "clinicalPearl": "Por qué el bebé parece más activo de noche: Caminar durante el día lo mece suavemente para dormir; al acostarse en calma por la noche, su alerta alcanza el máximo."
        },
        "22": {
          "phaseLabel": "2.º Trimestre — Integración Auditiva y Táctil",
          "stageTitle": "Reconocimiento Auditivo de la Voz, Cejas y Reflejo de Prensión",
          "biologicalStage": "Feto",
          "lengthMetric": "27.8 cm (10.9 in LCT)",
          "weightMetric": "430 g (15.2 oz)",
          "heartRateBpm": "120 – 155 LPM",
          "keyOrgans": [
            "Vía Cóclea-Corteza Auditiva",
            "Reflejo de Prensión Palmar",
            "Conductos Lagrimales",
            "Primordios de Conductos Alveolares"
          ],
          "fetalMilestones": [
            "Maduran las respuestas auditivas del tronco encefálico; el feto escucha y empieza a reconocer la cadencia de la voz materna.",
            "Se desarrolla el reflejo de prensión palmar: el feto sujeta con frecuencia el cordón umbilical (la gelatina de Wharton protege los vasos).",
            "Las cejas y el cabello fino del cuero cabelludo son visibles, aunque el pigmento de melanina aún no se ha depositado por completo."
          ],
          "maternalPhysiology": "Hemodilución fisiológica: el volumen plasmático aumenta más rápido (~45–50 %) que la masa eritrocitaria (~25–30 %), causando un descenso normal de hemoglobina.",
          "doctorCheckIn": "Si está indicado (p. ej., concepción por FIV, diabetes preexistente o antecedente familiar de cardiopatía congénita), se realiza un Ecocardiograma Fetal especializado entre las Semanas 20–22.",
          "clinicalPearl": "Pueden aparecer contracciones de Braxton Hicks (endurecimiento uterino indoloro e irregular de <30 segundos) en la segunda mitad del embarazo; ceden con hidratación y reposo."
        },
        "23": {
          "phaseLabel": "2.º Trimestre — Umbral Pulmonar Periviable",
          "stageTitle": "Neumocitos Tipo II y Síntesis Inicial de Lipoproteínas del Surfactante",
          "biologicalStage": "Feto (Ventana de Viabilidad Neonatal)",
          "lengthMetric": "28.9 cm (11.4 in LCT)",
          "weightMetric": "500 g (1.1 lb)",
          "heartRateBpm": "120 – 155 LPM",
          "keyOrgans": [
            "Neumocitos Alveolares Tipo II",
            "Lecho Capilar Pulmonar",
            "Sueño de Movimientos Oculares Rápidos (REM)",
            "Islotes de Langerhans Pancreáticos"
          ],
          "fetalMilestones": [
            "Los neumocitos cuboidales Tipo II se diferencian en las vías aéreas distales y comienzan a sintetizar cuerpos lamelares de surfactante inicial.",
            "Los capilares pulmonares se aproximan al epitelio respiratorio, estableciendo la barrera alveolocapilar primitiva.",
            "Comienzan los ciclos de sueño de Movimientos Oculares Rápidos (REM), esenciales para el cableado neuronal de la corteza visual y sensoriomotora."
          ],
          "maternalPhysiology": "El desplazamiento superior del estómago y la relajación del esfínter esofágico inferior por la progesterona pueden provocar reflujo gastroesofágico.",
          "doctorCheckIn": "Conozca los signos de Trabajo de Parto Prematuro: presión pélvica o cólicos regulares (>4–6 contracciones/hora), dolor lumbar bajo continuo o cambio en el flujo vaginal.",
          "clinicalPearl": "Las Semanas 23–24 representan el umbral de viabilidad neonatal en las UCIN de Nivel III/IV, donde los corticosteroides antenatales (betametasona) aceleran la madurez pulmonar si hay amenaza de parto prematuro."
        },
        "24": {
          "phaseLabel": "2.º Trimestre — Viabilidad Neonatal y Tamizaje de Glucosa",
          "stageTitle": "Transición Pulmonar Sacular, Hito de Viabilidad y Apertura de Ventana GCT",
          "biologicalStage": "Feto",
          "lengthMetric": "30.0 cm (11.8 in LCT)",
          "weightMetric": "600 g (1.32 lb)",
          "heartRateBpm": "120 – 155 LPM",
          "keyOrgans": [
            "Sáculos Terminales Pulmonares",
            "Sistema Vestibular del Oído Interno",
            "Células Beta Pancreáticas Fetales",
            "Capilares Cutáneos"
          ],
          "fetalMilestones": [
            "Los pulmones pasan de la etapa canalicular a la sacular: brotan sáculos terminales en los extremos de los bronquiolos respiratorios.",
            "El aparato vestibular del oído interno está estructuralmente maduro, otorgando al feto sentido de orientación espacial en el saco amniótico.",
            "Los lechos capilares subcutáneos se llenan de sangre, cambiando la piel fetal de translúcida a rosada-rojiza."
          ],
          "maternalPhysiology": "La secreción placentaria de lactógeno placentario humano (hPL), cortisol y hormona del crecimiento aumenta al final del 2.º trimestre, creando resistencia fisiológica a la insulina para enviar glucosa al feto.",
          "doctorCheckIn": "Consulta de las 24 Semanas + Apertura de Ventana de Tamizaje de Diabetes Gestacional (Semanas 24–28): Se solicita la Prueba de O’Sullivan de 1 hora (50 g de glucosa) y hemograma del 3.er trimestre.",
          "clinicalPearl": "Por qué se criba la Diabetes Gestacional (DG) a las 24–28 semanas: Las hormonas contrainsulares placentarias (hPL) suben fuertemente en la Semana 24, revelando insuficiencia pancreática en ~6–9 % de los embarazos."
        },
        "25": {
          "phaseLabel": "2.º Trimestre — Vascularización Pulmonar y Apertura Nasal",
          "stageTitle": "Disolución de Tapones Nasales, Arborización Capilar y Osificación Espinal",
          "biologicalStage": "Feto",
          "lengthMetric": "34.6 cm (13.6 in LCT)",
          "weightMetric": "660 g (1.45 lb)",
          "heartRateBpm": "120 – 155 LPM",
          "keyOrgans": [
            "Fosas Nasales Permeables",
            "Surfactante Pulmonar (SP-B/SP-C)",
            "Osificación del Arco Vertebral",
            "Circuitos de Dominancia Manual"
          ],
          "fetalMilestones": [
            "Los tapones epiteliales dentro de las fosas nasales se disuelven, abriendo los conductos nasales para la respiración amniótica de práctica.",
            "Las proteínas del surfactante B y C (SP-B, SP-C) aumentan dentro de los neumocitos Tipo II.",
            "Las estructuras de la columna vertebral (33 anillos, 150 articulaciones, 1.000 ligamentos) se fortalecen para sostener la masa corporal en crecimiento."
          ],
          "maternalPhysiology": "Aumenta la presión venosa en las extremidades inferiores, pudiendo causar calambres nocturnos en las pantorrillas o leve edema maleolar vespertino.",
          "doctorCheckIn": "Realice su Prueba de Tolerancia a la Glucosa de 1 Hora (50 g Glucola) entre las Semanas 24 y 28. No requiere ayuno para el tamizaje de 1 hora salvo indicación médica.",
          "clinicalPearl": "Si su prueba de 1 hora resulta ≥135–140 mg/dL, no se alarme: es un tamizaje, no un diagnóstico. Alrededor del 75–80 % de las pacientes que realizan la curva diagnóstica de 3 horas con 100 g en ayunas obtienen resultados normales."
        },
        "26": {
          "phaseLabel": "2.º Trimestre — Despertar Visual y Apertura Palpebral",
          "stageTitle": "Separación de Párpados, Reflejo de Parpadeo-Sobresalto y Bastones Retinianos",
          "biologicalStage": "Feto",
          "lengthMetric": "35.6 cm (14.0 in LCT)",
          "weightMetric": "760 g (1.68 lb)",
          "heartRateBpm": "120 – 155 LPM",
          "keyOrgans": [
            "Fotorreceptores Retinianos (Conos y Bastones)",
            "Mielinización del Nervio Óptico",
            "Reflejo de Sobresalto Vibroacústico",
            "Descenso Inguinal Testicular"
          ],
          "fetalMilestones": [
            "Los párpados fusionados se separan y abren por primera vez desde la Semana 9; el feto parpadea ante luces intensas o sonidos fuertes (reflejo de sobresalto vibroacústico).",
            "Los reflejos de sobresalto (Moro) y de prensión palmar están presentes en respuesta a sonidos y vibraciones.",
            "En los fetos masculinos, el gubernáculo guía los testículos hacia el canal inguinal en dirección al escroto."
          ],
          "maternalPhysiology": "La circunferencia de la caja torácica se expande 5–7 cm al elevarse el diafragma ~4 cm; el volumen corriente pulmonar aumenta un 30–40 %.",
          "doctorCheckIn": "Revise con su obstetra los resultados de hemoglobina/hematocrito y ferritina del tercer trimestre para detectar anemia ferropénica (Hb <10.5 g/dL en 2.º trimestre o <11.0 g/dL en 3.er trimestre).",
          "clinicalPearl": "Tomar los suplementos de hierro oral con Vitamina C (jugo de naranja) en ayunas o en días alternos mejora su absorción duodenal y reduce el estreñimiento."
        },
        "27": {
          "phaseLabel": "2.º Trimestre — Última Semana del Segundo Trimestre",
          "stageTitle": "Vías Talamocorticales del Dolor, Hipo Fetal y Apertura de Ventana de Vacuna Tdap",
          "biologicalStage": "Feto",
          "lengthMetric": "36.6 cm (14.4 in LCT)",
          "weightMetric": "875 g (1.93 lb)",
          "heartRateBpm": "120 – 155 LPM",
          "keyOrgans": [
            "Inicio de Circunvoluciones Cerebrales (Giros)",
            "Nervio Frénico / Diafragma",
            "Bazo y Timo Fetal",
            "Tejido Adiposo Blanco Subcutáneo"
          ],
          "fetalMilestones": [
            "Los espasmos diafragmáticos rítmicos (hipo fetal) se vuelven frecuentes y se perciben como golpecitos suaves y regulares cada pocos segundos.",
            "Los hemisferios cerebrales comienzan a formar surcos y circunvoluciones primarias para expandir la superficie cortical.",
            "Los linfocitos T maduran en el timo fetal."
          ],
          "maternalPhysiology": "Al concluir el segundo trimestre, el fondo uterino se sitúa ~7 cm por encima del ombligo; la retención hídrica puede causar leve hormigueo del túnel carpiano.",
          "doctorCheckIn": "Se abre la ventana de la vacuna Tdap (Semanas 27–36): Los CDC y el ACOG recomiendan aplicar Tdap en CADA embarazo entre las Semanas 27 y 36 (idealmente 27–30s) para maximizar la transferencia de anticuerpos contra la tos ferina al recién nacido.",
          "clinicalPearl": "El hipo fetal es un signo totalmente normal de maduración del nervio frénico y del centro respiratorio del tronco encefálico; se siente como un pulso rítmico durante 5–15 minutos."
        },
        "28": {
          "phaseLabel": "3.er Trimestre — Inicio y Transición a Consultas Quincenales",
          "stageTitle": "Entrada al 3.er Trimestre, Profilaxis con RhoGAM y Conteo Diario de Movimientos",
          "biologicalStage": "Feto del 3.er Trimestre",
          "lengthMetric": "37.6 cm (14.8 in LCT)",
          "weightMetric": "1 005 g (2.22 lb — ¡Hito de 1 kg!)",
          "heartRateBpm": "115 – 155 LPM",
          "keyOrgans": [
            "Reflejo Fotomotor Pupilar",
            "Síntesis de Lecitina del Surfactante",
            "Folias del Cerebelo",
            "Expresión del Antígeno Rh(D)"
          ],
          "fetalMilestones": [
            "El feto supera el hito de 1 kilogramo (2.2 lb); el tejido adiposo blanco subcutáneo alcanza el ~2–3 % del peso corporal.",
            "Las pupilas se contraen y dilatan en respuesta a la luz; los ciclos de sueño muestran patrones de ondas cerebrales REM y no REM.",
            "La producción de surfactante broncopulmonar se acelera, elevando la relación lecitina/esfingomielina (L/E)."
          ],
          "maternalPhysiology": "Bienvenida al Tercer Trimestre. El flujo sanguíneo uterino alcanza ~500–700 mL/minuto (~80 % perfundiendo la placenta).",
          "doctorCheckIn": "Consulta de las 28 Semanas (Transición a visitas cada 2 semanas): Revisar prueba de glucosa de 1 hora (GCT), aplicar vacuna Tdap, administrar inmunoglobulina anti-D (RhoGAM 300 mcg IM) si la madre es Rh negativo e iniciar el Conteo Diario de Movimientos Fetales.",
          "clinicalPearl": "Protocolo ACOG de Conteo de Movimientos (Desde la Semana 28): Una vez al día (idealmente tras comer), recuéstese de lado y mida cuánto tarda en sentir 10 movimientos distintos (patadas o giros, no hipo). Lo normal es <2 horas (a menudo <30 min). Si hay <10 movimientos en 2 horas, acuda de inmediato a Urgencias Obstétricas para un NST."
        },
        "29": {
          "phaseLabel": "3.er Trimestre — Mineralización Esquelética Acelerada",
          "stageTitle": "Acreción Rápida de Calcio y Termorregulación Hipotalámica",
          "biologicalStage": "Feto",
          "lengthMetric": "38.6 cm (15.2 in LCT)",
          "weightMetric": "1 150 g (2.54 lb)",
          "heartRateBpm": "115 – 155 LPM",
          "keyOrgans": [
            "Acreción Ósea de Calcio por Osteoblastos",
            "Núcleo Preóptico Hipotalámico (Termorregulación)",
            "Síntesis Suprarrenal de DHEA-S",
            "Septación Alveolar Pulmonar"
          ],
          "fetalMilestones": [
            "La placenta bombea activamente ~250–300 mg de calcio elemental por día desde la circulación materna hacia el esqueleto fetal.",
            "El hipotálamo madura sus circuitos centrales de termorregulación.",
            "Las glándulas suprarrenales fetales aumentan de tamaño y secretan DHEA-S, que la placenta convierte en estriol."
          ],
          "maternalPhysiology": "El aumento del peso fetal y la lordosis lumbar desplazan su centro de gravedad; el calzado con soporte y las basculaciones pélvicas alivian la tensión lumbosacra.",
          "doctorCheckIn": "Sin consulta estándar esta semana (cadencia quincenal: próxima visita en la Semana 30). Controle diariamente la presión arterial y los movimientos fetales.",
          "clinicalPearl": "En el tercer trimestre, el feto adquiere el 80 % de sus reservas totales de calcio óseo y hierro: asegure 1.000 mg/día de calcio en la dieta y un aporte constante de hierro."
        },
        "30": {
          "phaseLabel": "3.er Trimestre — Plegamiento Cortical y Dominio Medular",
          "stageTitle": "Profundización de Giros Cerebrales, Dominio de Médula Ósea y Pico Amniótico",
          "biologicalStage": "Feto",
          "lengthMetric": "39.9 cm (15.7 in LCT)",
          "weightMetric": "1 320 g (2.91 lb)",
          "heartRateBpm": "115 – 155 LPM",
          "keyOrgans": [
            "Surcos Cerebrales Secundarios y Terciarios",
            "Médula Ósea Medular Dominante",
            "Ciclos Respiratorios Diafragmáticos",
            "Inicio de Caída del Lanugo"
          ],
          "fetalMilestones": [
            "La superficie cerebral desarrolla circunvoluciones y surcos profundos, ampliando la corteza sin aumentar el diámetro craneal.",
            "La médula ósea es ya el órgano hematopoyético principal; los glóbulos rojos fetales circulan con una vida media de ~60–90 días.",
            "Al engrosarse la grasa subcutánea, el lanugo temprano comienza a desprenderse hacia el líquido amniótico."
          ],
          "maternalPhysiology": "El volumen de líquido amniótico se acerca a su pico fisiológico (~800–1.000 mL entre las Semanas 30 y 34) antes de disminuir gradualmente hacia el término.",
          "doctorCheckIn": "Consulta Quincenal de las 30 Semanas: Presión arterial, tira reactiva de orina, medición de altura uterina (~28–32 cm), frecuencia cardíaca fetal con Doppler y revisión de signos de alarma.",
          "clinicalPearl": "Si la altura uterina mide >3 cm por encima o por debajo de la semana gestacional, su obstetra solicitará una ecografía de crecimiento fetal y volumen de líquido amniótico."
        },
        "31": {
          "phaseLabel": "3.er Trimestre — Sinaptogénesis y Aumento de Grasa Subcutánea",
          "stageTitle": "Billones de Conexiones Sinápticas y Acreción Cerebral de DHA",
          "biologicalStage": "Feto",
          "lengthMetric": "41.1 cm (16.2 in LCT)",
          "weightMetric": "1 500 g (3.31 lb)",
          "heartRateBpm": "115 – 155 LPM",
          "keyOrgans": [
            "Circuito Retina-Corteza Visual",
            "Membranas Fosfolipídicas Ricas en DHA",
            "Filtración Glomerular Renal Madura",
            "Coordinación Succión-Deglución"
          ],
          "fetalMilestones": [
            "El cerebro fetal acumula ~50–70 mg/día de omega-3 DHA en las membranas neuronales y fotorreceptores retinianos.",
            "Los cinco sentidos especiales (visión, audición, gusto, olfato a través de compuestos amnióticos y tacto) están funcionalmente activos.",
            "El feto gana aproximadamente 150–200 gramos (0,35–0,5 lb) por semana desde ahora hasta el término."
          ],
          "maternalPhysiology": "Los alvéolos mamarios sintetizan calostro (pre-leche rica en inmunoglobulina A); pueden secretarse gotas ocasionales.",
          "doctorCheckIn": "Si presenta condiciones de alto riesgo (edad ≥35–40 años, diabetes gestacional con medicación, hipertensión crónica o embarazo gemelar), las pruebas sin estrés (NST) o perfiles biofísicos (BPP) semanales suelen iniciar en la semana 32.",
          "clinicalPearl": "Aprendizaje de sabores in utero: Los compuestos aromáticos de su dieta (ajo, vainilla, zanahoria) pasan al líquido amniótico y son degustados por el feto, facilitando la aceptación posnatal de alimentos."
        },
        "32": {
          "phaseLabel": "3.er Trimestre — Posicionamiento Cefálico y Protección VRS",
          "stageTitle": "Versión Cefálica, Uñas de las Manos Completas y Ventana de Vacuna VSR",
          "biologicalStage": "Feto (Fase de Posicionamiento Cefálico)",
          "lengthMetric": "42.4 cm (16.7 in LCT)",
          "weightMetric": "1 700 g (3.75 lb)",
          "heartRateBpm": "110 – 155 LPM",
          "keyOrgans": [
            "Presentación Cefálica (Cabeza Abajo)",
            "Fosfatidilglicerol del Surfactante",
            "Uñas Completas en Manos",
            "Pico de Transferencia Materno-Fetal de IgG"
          ],
          "fetalMilestones": [
            "Aproximadamente el 85–90 % de los fetos giran hacia la presentación cefálica (cabeza abajo) para adaptarse a la cavidad uterina piriforme.",
            "Las uñas de las manos llegan a la punta de los dedos; la piel se vuelve lisa y opaca al alcanzar la grasa subcutánea el ~7–8 % del peso.",
            "Los movimientos respiratorios fetales ocurren el 30–40 % del tiempo durante el sueño activo, un marcador clave en el Perfil Biofísico."
          ],
          "maternalPhysiology": "El volumen plasmático materno alcanza su expansión máxima (+45–50 % sobre el nivel pregestacional), exigiendo el máximo trabajo cardiovascular.",
          "doctorCheckIn": "Consulta Quincenal de las 32 Semanas + Ventana de Vacuna Materna contra el VRS (Semanas 32–36): Los CDC y el ACOG recomiendan 1 dosis de vacuna materna contra el VRS (Abrysvo) entre 32s0d y 36s6d en temporada (septiembre–enero) para proteger al recién nacido de bronquiolitis grave.",
          "clinicalPearl": "Por qué los movimientos se sienten diferentes a las 32+ semanas: Al reducirse el espacio uterino, las patadas amplias pasan a ser giros firmes, estiramientos y presión de codos o talones, ¡pero la frecuencia total NO debe disminuir!"
        },
        "33": {
          "phaseLabel": "3.er Trimestre — Transferencia de IgG y Flexibilidad Craneal",
          "stageTitle": "Fontanelas Craneales, Pico de Transferencia de IgG y Coordinación de Succión",
          "biologicalStage": "Feto",
          "lengthMetric": "43.7 cm (17.2 in LCT)",
          "weightMetric": "1 920 g (4.23 lb)",
          "heartRateBpm": "110 – 155 LPM",
          "keyOrgans": [
            "Fontanelas Anterior y Posterior",
            "Tríada Succión-Deglución-Respiración",
            "Nefrogénesis Próxima a Completarse",
            "Transporte Placentario Activo de IgG"
          ],
          "fetalMilestones": [
            "El volumen de líquido amniótico alcanza su pico (~800–1.000 mL) entre las semanas 33 y 34 antes de disminuir gradualmente hacia el término.",
            "Los niveles fetales de anticuerpos IgG transplacentarios se acercan y pronto superarán las concentraciones séricas maternas.",
            "Los núcleos del tronco encefálico comienzan a coordinar la tríada rítmica de succión-deglución-respiración."
          ],
          "maternalPhysiology": "El fondo uterino se aproxima al apéndice xifoides; comidas más pequeñas y frecuentes y elevar la cabecera alivian el reflujo.",
          "doctorCheckIn": "Seleccione y confirme el consultorio de su Pediatra, verifique la cobertura para el recién nacido e instale la silla infantil para el auto mirando hacia atrás.",
          "clinicalPearl": "Las aceleraciones de la frecuencia cardíaca fetal (incrementos de ≥15 LPM durante ≥15 segundos al moverse) son el sello de un sistema nervioso autónomo fetal bien oxigenado y reactivo."
        },
        "34": {
          "phaseLabel": "3.er Trimestre — Umbral Prematuro Tardío y Nefrogénesis Completa",
          "stageTitle": "Finalización de la Nefrogénesis Permanente y Aumento de Surfactante",
          "biologicalStage": "Feto en Umbral Prematuro Tardío",
          "lengthMetric": "45.0 cm (17.7 in LCT)",
          "weightMetric": "2 150 g (4.74 lb)",
          "heartRateBpm": "110 – 155 LPM",
          "keyOrgans": [
            "1 Millón de Nefronas por Riñón",
            "Surfactante Rico en Fosfatidilcolina",
            "Engrosamiento de Vérnix Caseosa",
            "Descenso Testicular al Escroto"
          ],
          "fetalMilestones": [
            "La nefrogénesis humana (formación de nuevas nefronas filtrantes) se completa de forma permanente entre las Semanas 34 y 36 con ~1 millón de nefronas por riñón.",
            "La secreción de surfactante pulmonar se dispara; los nacidos a partir de las 34 semanas tienen >98 % de supervivencia sin secuelas respiratorias a largo plazo.",
            "El recubrimiento de vérnix caseosa es espeso y cremoso; las uñas de manos y pies están bien formadas."
          ],
          "maternalPhysiology": "La hinchazón fisiológica de tobillos al final de la tarde es común, mientras que el edema repentino de cara o manos con cefalea o destellos visuales exige medir la presión arterial de inmediato.",
          "doctorCheckIn": "Consulta Quincenal de las 34 Semanas: Presión arterial y síntomas de preeclampsia, altura uterina, latidos fetales, maniobras de Leopold para evaluar presentación y revisión de preferencias de parto.",
          "clinicalPearl": "La Semana 34 marca un gran hito obstétrico: después de 34s0d rara vez se indican tocolíticos para frenar el parto porque la madurez pulmonar y sistémica está muy avanzada."
        },
        "35": {
          "phaseLabel": "3.er Trimestre — Madurez Hepática y Reserva Metabólica",
          "stageTitle": "Reserva Hepática de Glucógeno, Depósitos de Hierro y Rápido Aumento Adiposo",
          "biologicalStage": "Feto",
          "lengthMetric": "46.2 cm (18.2 in LCT)",
          "weightMetric": "2 385 g (5.25 lb)",
          "heartRateBpm": "110 – 150 LPM",
          "keyOrgans": [
            "Reservas Hepáticas de Glucógeno y Hierro",
            "Conjugación de Bilirrubina (UGT1A1)",
            "Grasa Subcutánea (10% del Peso Corporal)",
            "Reflejo de Succión Coordinado"
          ],
          "fetalMilestones": [
            "El hígado fetal almacena rápidamente glucógeno (para mantener la glucemia tras el pinzamiento del cordón) y ferritina.",
            "Los riñones y el hígado están estructuralmente completos y maduran vías enzimáticas como la UGT1A1 para conjugar la bilirrubina.",
            "El feto gana ~30 gramos (1 oz) de grasa cada día."
          ],
          "maternalPhysiology": "Aumenta la presión pélvica a medida que el segmento uterino inferior se adelgaza; regresa la micción frecuente al encajarse más la cabeza fetal.",
          "doctorCheckIn": "La próxima semana (Semana 36) inicia las visitas obstétricas SEMANALES e incluye el hisopado de Estreptococo del Grupo B (SGB) y la confirmación de presentación fetal.",
          "clinicalPearl": "Prepare su bolso para el hospital en la Semana 35 (documento de identidad, tarjeta del seguro, plan de parto, sostén de lactancia, cargadores, ropa de salida para el bebé) y realice el prerregistro en Maternidad."
        },
        "36": {
          "phaseLabel": "3.er Trimestre — Consultas Semanales y Tamizaje de EGB",
          "stageTitle": "Etapa Pulmonar Alveolar, Tamizaje de SGB (GBS) y Encajamiento Fetal",
          "biologicalStage": "Feto Prematuro Tardío (Inicio de Control Semanal)",
          "lengthMetric": "47.4 cm (18.7 in LCT)",
          "weightMetric": "2 620 g (5.78 lb)",
          "heartRateBpm": "110 – 150 LPM",
          "keyOrgans": [
            "Alvéolos Pulmonares Verdaderos",
            "Desprendimiento de Vérnix al Líquido Amniótico",
            "Encajamiento Cefálico en Pelvis",
            "Colon Lleno de Meconio"
          ],
          "fetalMilestones": [
            "Los pulmones entran en la Etapa Alveolar final (desde la Semana 36 hasta la primera infancia), formando alvéolos verdaderos listos para el intercambio gaseoso.",
            "La vérnix caseosa y el lanugo desprendidos se mezclan con el líquido amniótico, que el feto deglute formando el meconio.",
            "En los primeros embarazos, la cabeza fetal suele descender («aligeramiento» o encajamiento) hacia la entrada pélvica."
          ],
          "maternalPhysiology": "Cuando ocurre el encajamiento, disminuye la presión bajo las costillas (facilitando respirar y comer), mientras aumenta la presión en el suelo pélvico.",
          "doctorCheckIn": "Consulta de las 36 Semanas (¡Inicio de Visitas Semanales!): Hisopado rectovaginal de Estreptococo del Grupo B (SGB, realizado entre 36s0d y 37s6d) y confirmación de presentación cefálica mediante maniobras de Leopold o ecografía.",
          "clinicalPearl": "Por qué se realiza la prueba de SGB a las 36–37 semanas: ~25 % de los adultos sanos portan el Estreptococo Grupo B sin síntomas. Si es positivo, administrar penicilina/ampicilina IV durante el parto reduce el riesgo de sepsis neonatal por SGB en >80 %. Si el bebé está en podálica (nalgas) a las 36s, se conversa la Versión Cefálica Externa (VCE) para la Semana 37."
        },
        "37": {
          "phaseLabel": "3.er Trimestre — Término Temprano (37s0d–38s6d)",
          "stageTitle": "Hito de Término Temprano, Ventana de VCE y Regla de Trabajo de Parto (5-1-1)",
          "biologicalStage": "Feto de Término Temprano",
          "lengthMetric": "48.6 cm (19.1 in LCT)",
          "weightMetric": "2 860 g (6.30 lb)",
          "heartRateBpm": "110 – 150 LPM",
          "keyOrgans": [
            "Relación L/S de Surfactante Maduro ≥2:1",
            "Tractos Corticoespinales Mielinizados",
            "Permeabilidad del Conducto Arterioso",
            "Almohadillas Adiposas Bucales de Succión"
          ],
          "fetalMilestones": [
            "A las 37s0d, el embarazo alcanza el estado de «Término Temprano» (el ACOG define Término Temprano como 37s0d–38s6d, y Término Completo como 39s0d–40s6d).",
            "Las almohadillas grasas bucales rellenan las mejillas, brindando estabilidad mecánica de succión para la lactancia.",
            "El pico de cortisol suprarrenal fetal activa los canales de reabsorción de líquido pulmonar (ENaC) para despejar los pulmones al nacer."
          ],
          "maternalPhysiology": "La maduración cervical comienza silenciosamente: las fibras de colágeno se remodelan ablandando el cuello uterino y desplazándolo hacia adelante.",
          "doctorCheckIn": "Consulta semanal de la semana 37: Revisión del resultado de EGB, presión arterial, latidos fetales y repaso de la regla de parto «5-1-1 / 4-1-1», rotura de membranas y cuándo acudir al hospital.",
          "clinicalPearl": "Por qué el ACOG evita el parto electivo antes de 39s0d sin indicación médica: Entre las Semanas 37 y 39, el cerebro fetal aumenta su peso en ~30 % y se completa la transición respiratoria."
        },
        "38": {
          "phaseLabel": "3.er Trimestre — Término Temprano (38 Semanas)",
          "stageTitle": "Pico de Fosfatidilglicerol del Surfactante, Cuerdas Vocales y Reflejos",
          "biologicalStage": "Feto de Término Temprano",
          "lengthMetric": "49.8 cm (19.6 in LCT)",
          "weightMetric": "3 080 g (6.79 lb)",
          "heartRateBpm": "110 – 150 LPM",
          "keyOrgans": [
            "Fosfatidilglicerol (PG) Positivo",
            "Derivaciones Cardíacas Fetales (Foramen Oval)",
            "Glándulas Lagrimales y Salivales",
            "15% de Grasa Corporal"
          ],
          "fetalMilestones": [
            "La presencia de fosfatidilglicerol (PG) en el líquido amniótico confirma la madurez bioquímica pulmonar completa.",
            "La grasa corporal representa ya el ~15 % del peso fetal total, permitiendo una regulación térmica independiente tras el nacimiento.",
            "Las cuerdas vocales, los arcos reflejos neurológicos (Moro, búsqueda, succión, prensión) y los órganos sensoriales están listos para la vida extrauterina."
          ],
          "maternalPhysiology": "La expulsión del tapón mucoso y una mayor presión pélvica o contracciones prodrómicas irregulares pueden ocurrir días o semanas antes del parto activo.",
          "doctorCheckIn": "Consulta Semanal de las 38 Semanas: Presión arterial, control de orina, frecuencia cardíaca fetal, altura uterina y conversación sobre recuperación posparto, lactancia y anticoncepción posparto.",
          "clinicalPearl": "Trabajo de Parto Verdadero vs. Braxton Hicks: Las contracciones de Braxton Hicks son irregulares y ceden con hidratación o reposo. Las contracciones de parto verdadero se vuelven progresivamente más largas, fuertes y cercanas entre sí."
        },
        "39": {
          "phaseLabel": "3.er Trimestre — Término Completo (39s0d–40s6d)",
          "stageTitle": "Hito de Término Completo, Índice de Bishop y Estudio ARRIVE",
          "biologicalStage": "Feto a Término Completo",
          "lengthMetric": "50.7 cm (20.0 in LCT)",
          "weightMetric": "3 290 g (7.25 lb)",
          "heartRateBpm": "110 – 150 LPM",
          "keyOrgans": [
            "Corteza Cerebral de Término Completo",
            "Renovación Epidérmica Completa",
            "Señalización Placentaria de Oxitocina",
            "Enzimas Hepáticas Maduras"
          ],
          "fetalMilestones": [
            "¡Felicidades! A las 39s0d su bebé alcanza oficialmente el «TÉRMINO COMPLETO» según las definiciones del ACOG y la SMFM.",
            "Los pulmones fetales secretan proteínas del surfactante hacia el líquido amniótico, activando receptores uterinos de oxitocina que inician el trabajo de parto espontáneo.",
            "Una nueva capa externa de epidermis reemplaza las células cutáneas descamadas; la vérnix permanece sobre todo en los pliegues."
          ],
          "maternalPhysiology": "El borramiento cervical (adelgazamiento del 0 % al 100 %) y la dilatación (apertura de 0 a 10 cm) progresan antes y durante la primera etapa del parto.",
          "doctorCheckIn": "Consulta Semanal de las 39 Semanas: Examen cervical opcional (índice de Bishop: dilatación, borramiento, altura de presentación), despegamiento de membranas opcional o diálogo sobre inducción electiva a las 39 semanas según el estudio ARRIVE.",
          "clinicalPearl": "Ensayo ARRIVE (NEJM 2018): En primigestas de bajo riesgo, la inducción electiva a las 39w0d–39w4d mostró una tasa ligeramente menor de cesárea (18,6 % frente a 22,2 %) y menor hipertensión gestacional que el manejo expectante, haciendo que tanto esperar el parto espontáneo como la inducción a las 39 semanas sean opciones seguras."
        },
        "40": {
          "phaseLabel": "3.er Trimestre — Fecha Probable de Parto (FPP / 40 Semanas)",
          "stageTitle": "Fecha Probable de Parto (40w0d) y Preparación para la Transición Cardiopulmonar",
          "biologicalStage": "Feto a Término Completo",
          "lengthMetric": "51.2 cm (20.2 in LCT)",
          "weightMetric": "3 460 g (7.63 lb)",
          "heartRateBpm": "110 – 150 LPM",
          "keyOrgans": [
            "Foramen Oval y Conducto Arterioso Listos para Cerrar",
            "300 Centros de Osificación",
            "Inmunidad Pasiva Materna por IgG",
            "Suturas Craneales para Moldeamiento"
          ],
          "fetalMilestones": [
            "Al nacer, el primer llanto del bebé expande los pulmones y reduce la resistencia vascular pulmonar en un 80 %, cerrando funcionalmente el Foramen Oval y el Conducto Arterioso.",
            "Un recién nacido a término tiene ~300 huesos/centros cartilaginosos (muchos se fusionan luego en los 206 huesos adultos) y una capacidad gástrica del tamaño de una cereza (~5–7 mL el Día 1, ideal para el calostro).",
            "La agudeza visual al nacer enfoca con precisión a 20–30 cm (8–12 pulgadas), la distancia exacta entre los brazos y el rostro materno o paterno."
          ],
          "maternalPhysiology": "Solo el ~4–5 % de los bebés nacen exactamente en su Fecha Probable de Parto; cerca del 50 % de las madres primerizas dan a luz entre 40s0d y 41s3d si esperan el inicio espontáneo.",
          "doctorCheckIn": "Consulta de las 40 Semanas (FPP): Presión arterial, latidos fetales, tacto cervical o despegamiento de membranas si se desea, y programación del monitoreo fetal de la Semana 41 (NST + ILA/PBF) y fecha de inducción.",
          "clinicalPearl": "Recuerde las 4 características al Romper Fuente (Líquido Amniótico): Anote Color (claro vs. verdoso por meconio), Olor (inodoro vs. fétido), Cantidad (chorro vs. goteo continuo) y Hora, y llame a Maternidad de inmediato aunque no tenga contracciones."
        },
        "41": {
          "phaseLabel": "Término Tardío — Vigilancia Fetal (41s0d–41s6d)",
          "stageTitle": "Pruebas Antenatales de Término Tardío (NST / PBF) y Planificación de Inducción",
          "biologicalStage": "Feto de Término Tardío",
          "lengthMetric": "51.7 cm (20.4 in LCT)",
          "weightMetric": "3 600 g (7.94 lb)",
          "heartRateBpm": "110 – 150 LPM",
          "keyOrgans": [
            "Monitoreo de Reserva Placentaria",
            "Índice de Líquido Amniótico (ILA)",
            "Piel Seca/Descamativa (Poca Vérnix)",
            "Uñas Largas más allá de las Yemas"
          ],
          "fetalMilestones": [
            "Entre 41s0d y 41s6d, el ACOG clasifica el embarazo como «Término Tardío» (Late-Term).",
            "La mayor parte de la vérnix caseosa ya se ha reabsorbido, por lo que los recién nacidos de término tardío suelen tener la piel ligeramente seca en palmas y plantas y uñas más largas.",
            "El estado de alerta fetal y la madurez neurológica están excepcionalmente desarrollados."
          ],
          "maternalPhysiology": "El volumen de líquido amniótico disminuye de forma natural en el término tardío conforme avanza la maduración vascular placentaria.",
          "doctorCheckIn": "Consulta de embarazo prolongado de la semana 41 y vigilancia bisemanal: Prueba sin estrés (NST) más índice de líquido amniótico (ILA) / bolsillo vertical máximo (≥2 cm) o perfil biofísico completo (BPP, puntuado sobre 8 o 10). Programar inducción antes de las 42w0d.",
          "clinicalPearl": "El Boletín Práctico del ACOG sobre Embarazo de Término Tardío y Postérmino recomienda iniciar vigilancia fetal antenatal a las 41s0d y finalizar el embarazo entre 41s0d y 41s6d para evitar insuficiencia placentaria postérmino."
        },
        "42": {
          "phaseLabel": "Ventana de Parto Postérmino (42s0d)",
          "stageTitle": "Inducción Activa del Trabajo de Parto, Nacimiento y Hora Dorada",
          "biologicalStage": "Hito Postérmino / Nacimiento",
          "lengthMetric": "52.0 cm (20.5 in LCT)",
          "weightMetric": "3 685 g (8.12 lb)",
          "heartRateBpm": "110 – 150 LPM",
          "keyOrgans": [
            "Pinzamiento Tardío del Cordón (30–60 s)",
            "Hora Dorada Piel con Piel",
            "Puntuación de APGAR (1 y 5 min)",
            "Vitamina K y Profilaxis Ocular Neonatal"
          ],
          "fetalMilestones": [
            "El ACOG recomienda finalizar el embarazo a más tardar a las 42s0d (mediante maduración cervical con balón de Foley/misoprostol e inducción con oxitocina si no ha iniciado el parto espontáneo).",
            "Al nacer, el ACOG recomienda el Pinzamiento Tardío del Cordón Umbilical durante 30–60 segundos, transfiriendo ~80 mL de sangre placentaria para reforzar las reservas de hierro del bebé durante los primeros 6 meses.",
            "El Contacto Piel con Piel inmediato («Hora Dorada») estabiliza la temperatura, glucemia y frecuencia cardíaca del recién nacido, e inicia la lactancia y la liberación materna de oxitocina."
          ],
          "maternalPhysiology": "La tercera etapa del parto (alumbramiento) expulsa la placenta dentro de los 5–30 minutos posteriores al nacimiento; la contracción uterina comprime las arterias espirales para prevenir la hemorragia posparto.",
          "doctorCheckIn": "Parto y Cuidado Posparto Inmediato: Puntaje APGAR del recién nacido (al minuto 1 y 5), inyección neonatal de Vitamina K (previene la enfermedad hemorrágica), vacuna de Hepatitis B, tamizaje auditivo/metabólico y programación del control materno de presión arterial/ánimo a las 2–3 semanas y visita posparto integral a las 6 semanas.",
          "clinicalPearl": "Signos de alarma posparto (alerta «POST-BIRTH»): En las 6 semanas posteriores al parto, acuda a urgencias por dolor torácico o disnea, convulsiones, pensamientos de autolesión, sangrado >1 compresa/hora durante 2 horas, infección de herida, dolor/enrojecimiento en pantorrilla, fiebre ≥38,0 °C (100,4 °F) o cefalea intensa con PA ≥140/90."
        }
      },
      "appointments": {
        "appt-w6-8": {
          "cadenceLabel": "Confirmación Inicial",
          "title": "Visita de Ecografía de Viabilidad y Datación",
          "summary": "Confirma ubicación intrauterina, polo embrionario, actividad cardíaca, embarazo único vs. múltiple y datación exacta por Longitud Céfalo-Caudal (CRL).",
          "procedures": [
            "Ecografía transvaginal o transabdominal de datación (la CRL establece la FPP con precisión de ±3–5 días)",
            "Verificación de saco vitelino, saco gestacional y frecuencia cardíaca embrionaria (100–165 LPM)",
            "Revisión de antecedentes médicos, quirúrgicos, obstétricos y genéticos familiares",
            "Manejo temprano de náuseas/vómitos y verificación de vitamina prenatal (Ácido Fólico ≥400–800 mcg)"
          ],
          "questionsToAsk": [
            "¿Coincide mi Longitud Céfalo-Caudal (CRL) con mi FPP por FUM, o ajustaremos la fecha oficial de parto?",
            "¿En qué hospital o maternidad atiende los partos esta clínica y cómo funciona el turno de guardia obstétrica?",
            "¿Cuál es el teléfono de urgencias fuera de horario si presento manchado o síntomas intensos?"
          ],
          "highRiskAddition": "Edad Materna ≥35 / Pérdida Previa / FIV: Ecografía temprana de localización a las 5.5–6 semanas y evaluación de soporte lúteo con progesterona."
        },
        "appt-w8-10": {
          "cadenceLabel": "Cada 4 Semanas (c/4s)",
          "title": "Ingreso Obstétrico Integral y Panel Inicial de Laboratorio Prenatal",
          "summary": "Examen físico completo y perfil basal de análisis clínicos maternos en sangre y orina.",
          "procedures": [
            "Biometría Hemática Completa (BHC: hemoglobina, hematocrito, plaquetas)",
            "Grupo Sanguíneo (ABO), Factor Rh(D) y Prueba de Coombs Indirecto (anticuerpos irregulares)",
            "Títulos de inmunidad: Rubéola IgG, Varicela IgG; Tamizaje infeccioso: Hepatitis B (HBsAg), Hepatitis C, VIH, Sífilis (VDRL/RPR)",
            "Urocultivo con antibiograma (detecta bacteriuria asintomática para prevenir pielonefritis)",
            "TSH (si hay antecedente tiroideo), HbA1c (si hay riesgo de diabetes/IMC ≥25) y Tamizaje de Portadores Genéticos (Fibrosis Quística, AME, Hemoglobinopatías)"
          ],
          "questionsToAsk": [
            "¿Soy Rh positivo o Rh negativo y mis títulos de inmunidad vacunal (Rubéola/Varicela) son protectores?",
            "¿Tengo factores de riesgo para tamizaje temprano de diabetes gestacional o aspirina en dosis baja en la Semana 12?",
            "¿Cómo coordinaremos la prueba de ADN fetal libre (NIPT) y la ecografía de Translucencia Nucal del primer trimestre?"
          ],
          "highRiskAddition": "Riesgo de DG / DG Previa / SOP / IMC ≥25: Solicitud temprana de prueba de glucosa de 1 hora (GCT) o HbA1c en esta primera visita."
        },
        "appt-w10-13": {
          "cadenceLabel": "Cada 4 Semanas (c/4s)",
          "title": "Ventana Genética: ADN Fetal Libre (NIPT) y Translucencia Nucal (TN)",
          "summary": "Tamizaje de aneuploidías cromosómicas, evaluación anatómica temprana e inicio de profilaxis de preeclampsia en la Semana 12.",
          "procedures": [
            "Extracción de sangre materna para ADN Fetal Libre (NIPT, desde las 10s0d): tamiza Trisomías 21, 18, 13 y cromosomas sexuales",
            "Ecografía de Translucencia Nucal (TN, 11s0d–13s6d): mide el pliegue líquido detrás de la nuca fetal (<3.0 mm normal) y evalúa hueso nasal",
            "Auscultación de latidos fetales con Doppler (140–165 LPM) y control de presión arterial / orina materna",
            "Inicio de Aspirina en Dosis Baja (81 mg diarios desde la Semana 12) si se cumplen criterios ACOG de prevención de preeclampsia"
          ],
          "questionsToAsk": [
            "¿Debo iniciar aspirina en dosis baja de 81 mg en la semana 12 para prevenir la preeclampsia según mi perfil?",
            "¿Cuándo estarán listos los resultados del NIPT (usualmente 7–10 días calendario) y cómo se entregan?",
            "¿Hay alguna recomendación sobre ejercicio o viajes al entrar al segundo trimestre?"
          ],
          "highRiskAddition": "Edad ≥35 / Gemelos: Asesoría genética detallada; Biopsia de Vellosidades Coriónicas (BVC, 10–13s) disponible si se desea diagnóstico definitivo; confirmar corionicidad gemelar antes de la Semana 14."
        },
        "appt-w16": {
          "cadenceLabel": "Cada 4 Semanas (c/4s)",
          "title": "Control de Semana 16 (2.º Trimestre) y Tamizaje de Alfa-Fetoproteína (MSAFP)",
          "summary": "Control de bienestar materno-fetal y marcador sérico de defectos abiertos del tubo neural.",
          "procedures": [
            "Presión arterial, curva de peso materno y tira reactiva de orina (proteínas/glucosa/leucocitos)",
            "Verificación de la Frecuencia Cardíaca Fetal con Doppler portátil",
            "Extracción de Alfa-Fetoproteína Sérica Materna (MSAFP, 15–20s) para descartar defectos abiertos del tubo neural (espina bífida/anencefalia) o Tamizaje Cuádruple si no se realizó NIPT",
            "Orden para programar la Ecografía Anatómica Nivel II de las 20 semanas"
          ],
          "questionsToAsk": [
            "Aunque mi NIPT fue de bajo riesgo, ¿debemos tomar hoy la Alfa-Fetoproteína (MSAFP) para descartar defectos abiertos del tubo neural?",
            "¿Cuándo debo esperar sentir movimientos fetales constantes, especialmente según la ubicación de mi placenta?"
          ],
          "highRiskAddition": "Parto Pretérmino Espontáneo Previo: Ecografías transvaginales seriadas de longitud cervical cada 2 semanas entre las Semanas 16 y 24."
        },
        "appt-w18-22": {
          "cadenceLabel": "Cada 4 Semanas (c/4s)",
          "title": "Ecografía Anatómica Fetal Nivel II y Consulta Obstétrica de 20 Semanas",
          "summary": "Estudio estructural detallado de pies a cabeza, localización placentaria, líquido amniótico y medición de longitud cervical.",
          "procedures": [
            "Ecografía morfológica de nivel II (45–60 min): ventrículos cerebrales, cerebelo, plexos coroideos, perfil/labios, corazón de 4 cámaras + tractos de salida VI/VD, diafragma, estómago, riñones, inserción del cordón, cordón umbilical de 3 vasos, columna y las 4 extremidades",
            "Evaluación de ubicación placentaria (descartando placenta previa o vasa previa)",
            "Medición de longitud cervical (normal ≥25 mm entre las 18 y 24 semanas)",
            "Medición de altura uterina (inicia en Semana 20 a nivel del ombligo), presión arterial y control de orina"
          ],
          "questionsToAsk": [
            "¿Se visualizaron claramente hoy todos los tractos de salida cardíacos y la columna vertebral, o requerimos una cita complementaria?",
            "¿Mi placenta es anterior, posterior o fúndica, y está bien alejada (>2 cm) del orificio cervical interno?",
            "¿Cuál es la medida de mi longitud cervical?"
          ],
          "highRiskAddition": "FIV / Diabetes Preexistente / Riesgo Cardíaco Congénito: Ecocardiograma Fetal Especializado entre las Semanas 20 y 22 con cardiología pediátrica o Medicina Materno-Fetal."
        },
        "appt-w24-28": {
          "cadenceLabel": "Transición a Quincenal en Sem. 28",
          "title": "Tamizaje de Diabetes Gestacional, Biometría Hemática, RhoGAM y Vacuna Tdap",
          "summary": "Hito metabólico, hematológico e inmunológico clave entre el 2.º y 3.er trimestre.",
          "procedures": [
            "Prueba de O'Sullivan de 1 hora con 50 g de glucosa oral (GCT) para diabetes gestacional (24–28 semanas; si ≥135–140 mg/dL, curva de 3 horas con 100 g)",
            "Biometría Hemática de 3.er Trimestre (descarta anemia ferropénica vs. dilucional y trombocitopenia gestacional)",
            "Coombs Indirecto e Inmunoglobulina Anti-D (RhoGAM 300 mcg IM) en la Semana 28 si la madre es Rh negativo",
            "Vacuna Tdap (Tétanos, Difteria y Tosferina Acelular) entre las Semanas 27 y 36 (idealmente 27–30s) para transferir anticuerpos al recién nacido",
            "Repetición de serología de Sífilis y VIH en el 3.er trimestre según guías ACOG"
          ],
          "questionsToAsk": [
            "¿Cuáles son mis niveles del tamizaje de glucosa de 1 hora y de hemoglobina/ferritina del tercer trimestre? ¿Debo añadir hierro oral?",
            "¿Puedo recibir hoy mi vacuna Tdap y cuándo deben vacunarse mi pareja y familiares (al menos 2 semanas antes del parto)?",
            "¿Cómo debo realizar y registrar el conteo diario de movimientos fetales a partir de la Semana 28?"
          ],
          "highRiskAddition": "Gemelos Monocoriónicos: Ecografías cada 2 semanas para vigilancia de Transfusión Feto-Fetal (STFF); Bicoriónicos: ecografías de crecimiento cada 4 semanas."
        },
        "appt-w30": {
          "cadenceLabel": "Cada 2 Semanas (c/2s)",
          "title": "Consulta Quincenal de Semana 30 y Revisión de Conteo de Movimientos",
          "summary": "Primera visita quincenal del tercer trimestre enfocada en la curva de crecimiento fetal y vigilancia de preeclampsia.",
          "procedures": [
            "Presión arterial y tira reactiva de orina (tamizaje de hipertensión gestacional / proteinuria)",
            "Medición de Altura Uterina en cm (esperado 28–32 cm) y FCF con Doppler",
            "Revisión del patrón diario de Movimientos Fetales (≥10 movimientos en 2 horas)",
            "Revisión de signos de alarma de parto pretérmino y preadmisión hospitalaria"
          ],
          "questionsToAsk": [
            "¿Mi altura uterina va acorde con mi semana gestacional?",
            "¿Cómo realizo el prerregistro de admisión a Maternidad y por dónde se ingresa a urgencias obstétricas de noche?"
          ],
          "highRiskAddition": "Edad ≥35 / Obesidad / DG / Hipertensión: Planificar ecografía de crecimiento del 3.er trimestre y pruebas de bienestar fetal semanales (PSS/PBF) desde la Semana 32."
        },
        "appt-w32": {
          "cadenceLabel": "Cada 2 Semanas (c/2s)",
          "title": "Consulta de Semana 32, Ventana de Vacuna VSR y Control de Crecimiento",
          "summary": "Evaluación de la presentación fetal, inmunización materna estacional contra VSR e inicio de vigilancia antenatal en alto riesgo.",
          "procedures": [
            "Vacuna Materna contra el VSR (Abrysvo, 32s0d–36s6d en temporada de septiembre a enero) para prevenir bronquiolitis grave por VSR en el recién nacido",
            "Presión arterial, examen de orina, altura uterina (30–34 cm) y latidos fetales",
            "Ecografía de seguimiento de localización placentaria o crecimiento si hubo placenta baja previa, edad ≥35, DG o discrepancia de crecimiento"
          ],
          "questionsToAsk": [
            "¿Estoy en la ventana estacional para recibir hoy la vacuna materna Abrysvo contra el VSR (o recibirá el bebé Nirsevimab al nacer)?",
            "¿Se puede palpar si el bebé ya está empezando a colocarse de cabeza (cefálico)?"
          ],
          "highRiskAddition": "Edad ≥35–40 / DG / HTA Crónica / RCIU: Iniciar Pruebas Sin Estrés (PSS/NST) y/o Perfiles Biofísicos (PBF) semanales o bisemanales."
        },
        "appt-w34": {
          "cadenceLabel": "Cada 2 Semanas (c/2s)",
          "title": "Hito Pretérmino Tardío de Semana 34 y Revisión del Plan de Parto",
          "summary": "Revisión de opciones de analgesia obstétrica, preferencias de parto, masaje perineal y signos de alarma de preeclampsia.",
          "procedures": [
            "Presión arterial, control de proteínas en orina, altura uterina (32–36 cm) y latidos cardíacos fetales",
            "Maniobras de Leopold para palpar situación (longitudinal vs. transversa) y presentación fetal",
            "Conversación sobre preferencias de parto: analgesia epidural, óxido nitroso, monitoreo fetal continuo vs. intermitente, pinzamiento tardío del cordón y Hora Dorada piel con piel"
          ],
          "questionsToAsk": [
            "¿Cuáles son las prácticas estándar del hospital para el pinzamiento tardío del cordón, el contacto piel con piel inmediato y la asesoría de lactancia?",
            "¿En qué escenarios clínicos recomendaría una cesárea o un parto vaginal instrumentado?"
          ],
          "highRiskAddition": "Placenta Previa / Cesárea Corporal Previa: Confirmar programación del parto según ACOG (usualmente 36s0d–37s6d para placenta previa)."
        },
        "appt-w36": {
          "cadenceLabel": "Inicio de Visitas Semanales (c/1s)",
          "title": "Hisopado de Estreptococo Grupo B (EGB) de Semana 36 y Confirmación de Presentación",
          "summary": "Inicio de visitas semanales, cultivo universal de Estreptococo Grupo B y verificación formal de presentación cefálica.",
          "procedures": [
            "Hisopado vaginal inferior y rectal para Estreptococo del Grupo B (EGB / GBS, realizado entre 36s0d y 37s6d; válido por 5 semanas)",
            "Maniobras de Leopold + ecografía de consultorio si es necesario para confirmar presentación Cefálica (de vértice)",
            "Si el feto está en presentación Pélvica (Podálica) a las 36 semanas: asesorar sobre Versión Cefálica Externa (VCE) en la Semana 37",
            "Suspender Aspirina en dosis baja a las 36 semanas o al parto según protocolo; si hay antecedente de VHS genital, iniciar profilaxis oral con Aciclovir/Valaciclovir a las 36 semanas"
          ],
          "questionsToAsk": [
            "¿Está confirmado que el bebé se encuentra en presentación cefálica (cabeza abajo)?",
            "Si mi cultivo de Estreptococo Grupo B sale positivo, ¿qué tan pronto debo llegar al hospital al iniciar el trabajo de parto o romperse la fuente para recibir al menos 4 horas de penicilina IV?"
          ],
          "highRiskAddition": "Antecedente de Herpes Simple (VHS): Iniciar profilaxis oral diaria con valaciclovir/aciclovir a las 36s0d para prevenir lesiones activas y cesárea."
        },
        "appt-w37": {
          "cadenceLabel": "Semanal (c/1s)",
          "title": "Consulta de Término Temprano (Semana 37) y Reglas de Admisión a Parto",
          "summary": "Revisión del resultado de EGB, madurez de término temprano y criterios exactos para acudir a urgencias de maternidad.",
          "procedures": [
            "Presión arterial, control de orina, altura uterina y frecuencia cardíaca fetal",
            "Revisión y registro del resultado del cultivo de Estreptococo Grupo B (EGB) en el carné prenatal",
            "Confirmación de la Regla de Triage de Parto (5-1-1 para primer parto: contracciones cada 5 min, de 1 min de duración, durante 1 hora; o 4-1-1; o acudir de inmediato si rompe fuente / sangrado / menor movimiento)"
          ],
          "questionsToAsk": [
            "¿Cuál fue el resultado de mi cultivo de Estreptococo Grupo B?",
            "Si se me rompe la fuente en casa sin contracciones, ¿debo acudir de inmediato a Maternidad?"
          ],
          "highRiskAddition": "Hipertensión Gestacional / Preeclampsia sin criterios de severidad / Colestasis / Gemelos Bicoriónicos: Parto habitualmente programado entre las 37s0d y 38s0d según ACOG."
        },
        "appt-w38": {
          "cadenceLabel": "Semanal (c/1s)",
          "title": "Control Semanal de Semana 38 y Plan de Cuidado Posparto",
          "summary": "Vigilancia continua de presión arterial materna y bienestar fetal, más preparación para el 4.º Trimestre.",
          "procedures": [
            "Presión arterial, tira de orina, altura uterina y latidos cardíacos fetales",
            "Tacto vaginal opcional si la paciente presenta cólicos o desea conocer su dilatación/borramiento basal",
            "Asesoría sobre recuperación posparto, piso pélvico, salud mental (escala de Edimburgo) y anticoncepción posparto"
          ],
          "questionsToAsk": [
            "¿A quién debo acudir para apoyo de lactancia una vez que nos den el alta a casa?",
            "¿Cuándo se programarán mis controles posparto (ACOG recomienda un chequeo inicial dentro de las 3 semanas y visita integral a las 6–12 semanas)?"
          ],
          "highRiskAddition": "DG Controlada con Dieta / Edad ≥40: Conversar sobre el momento óptimo del parto alrededor de las 39s0d–39s6d."
        },
        "appt-w39": {
          "cadenceLabel": "Semanal (c/1s)",
          "title": "Consulta de Término Completo (Semana 39), Despegamiento de Membranas y Opciones de Inducción",
          "summary": "Evaluación de término completo, puntaje de Bishop opcional y toma de decisiones compartida sobre manejo expectante vs. inducción a las 39 semanas.",
          "procedures": [
            "Presión arterial, examen de orina, altura uterina y latidos cardíacos fetales",
            "Examen cervical digital opcional para evaluar el Puntaje de Bishop (dilatación, borramiento, altura de presentación, consistencia y posición)",
            "Despegamiento de Membranas opcional (si el cuello tiene ≥1 cm de dilatación y se revisan riesgos/estado de EGB; libera prostaglandinas locales para favorecer el parto espontáneo en 48 h)",
            "Toma de decisiones compartida sobre manejo expectante vs. inducción electiva a las 39 semanas (protocolo del ensayo ARRIVE)"
          ],
          "questionsToAsk": [
            "¿Cuál es mi dilatación, borramiento y estación fetal actual, y soy candidata hoy para un despegamiento de membranas?",
            "Si no inicio trabajo de parto espontáneo a las 40 semanas, ¿cuándo recomienda programar monitoreo fetal e inducción?"
          ],
          "highRiskAddition": "DG con Medicación / Edad ≥35–40: ACOG recomienda el parto en la semana 39 (39s0d–39s6d)."
        },
        "appt-w40": {
          "cadenceLabel": "Semanal (c/1s)",
          "title": "Consulta de Fecha Probable de Parto (Semana 40) y Plan Posfechado",
          "summary": "Evaluación en la fecha estimada de parto, reevaluación cervical y programación de vigilancia fetal de la Semana 41.",
          "procedures": [
            "Presión arterial, control de proteínas en orina y latidos cardíacos fetales",
            "Examen cervical y repetición opcional de despegamiento de membranas",
            "Orden para Prueba Sin Estrés (PSS/NST) e Índice de Líquido Amniótico (ILA) / Perfil Biofísico (PBF) en la Semana 41",
            "Programación provisional de fecha de inducción del parto entre las 41s0d y 41s6d"
          ],
          "questionsToAsk": [
            "Si programamos una inducción la próxima semana, ¿ingresaré la noche anterior para maduración cervical (balón de Foley o misoprostol) o por la mañana para oxitocina?"
          ],
          "highRiskAddition": "La mayoría de los embarazos de alto riesgo y edad materna ≥40 se finalizan entre las 39s0d y 40s0d según consenso ACOG/SMFM."
        },
        "appt-w41-42": {
          "cadenceLabel": "Dos Veces por Semana (41s+)",
          "title": "Vigilancia de Término Tardío (Semana 41 NST/PBF) e Inducción del Parto",
          "summary": "Pruebas bisemanales de bienestar fetal y líquido amniótico, culminando en el nacimiento a más tardar a las 42s0d.",
          "procedures": [
            "Prueba Sin Estrés (PSS / NST): monitoreo externo de 20–40 min que verifica FCF basal (110–160 LPM), variabilidad moderada y ≥2 aceleraciones (15x15) en 20 min",
            "Perfil Biofísico (PBF) / Ecografía de Líquido Amniótico: verifica Bolsillo Vertical Máximo (BVM ≥2 cm) o ILA ≥5 cm, movimientos respiratorios, tono y movimiento fetal",
            "Admisión a Maternidad para maduración cervical e inducción del trabajo de parto antes de las 42s0d"
          ],
          "questionsToAsk": [
            "¿Están hoy completamente reactivos mi bolsillo de líquido amniótico (BVM/ILA) y el monitoreo fetal (NST)?",
            "¿A qué hora debemos presentarnos en Maternidad para nuestra inducción programada?"
          ],
          "highRiskAddition": "Oligohidramnios (BVM <2 cm) o NST No Reactivo: Admisión inmediata a sala de partos para nacimiento."
        }
      },
      "symptoms": {
        "sym-1": {
          "urgencyLabel": "Acudir a Maternidad / Llamar al Obstetra de Inmediato",
          "trimesterScope": "3.er Trimestre (Semanas 28–42)",
          "title": "Disminución de Movimientos Fetales (<10 Movimientos en 2 Horas a las ≥28 Semanas)",
          "clinicalExplanation": "Una caída repentina en los movimientos fetales o no alcanzar 10 movimientos nítidos en 2 horas durante el conteo enfocado puede ser un signo temprano de insuficiencia placentaria o compresión del cordón umbilical.",
          "actionSteps": "Beba agua fría, recuéstese sobre su lado izquierdo en una habitación tranquila y concéntrese en los movimientos. NO espere hasta mañana ni confíe en un Doppler casero: acuda de inmediato a urgencias de maternidad para un monitoreo fetal (NST) de 20 minutos."
        },
        "sym-2": {
          "urgencyLabel": "Acudir a Urgencias Obstétricas / Hospital de Inmediato",
          "trimesterScope": "2.º y 3.er Trimestre (≥20 Semanas) y Posparto",
          "title": "Dolor de Cabeza Intenso y Persistente, Cambios Visuales (Destellos/Manchas) o Dolor en la Boca del Estómago",
          "clinicalExplanation": "Una cefalea intensa que no cede con paracetamol e hidratación, escotomas visuales (luces o visión borrosa), dolor en el cuadrante superior derecho/epigastrio o hinchazón brusca de cara y manos son signos clásicos de Preeclampsia con Criterios de Severidad o síndrome HELLP.",
          "actionSteps": "Tómese la presión arterial si tiene baumanómetro (≥140/90 está elevada; ≥160/110 es emergencia hipertensiva). Acuda de inmediato a urgencias de maternidad para monitoreo de PA, proteínas en orina, plaquetas y enzimas hepáticas."
        },
        "sym-3": {
          "urgencyLabel": "Acudir a Maternidad / Llamar al Obstetra de Inmediato",
          "trimesterScope": "Todos los Trimestres (Semanas 1–42)",
          "title": "Sangrado Vaginal (Sangre Roja Brillante o Expulsión de Coágulos)",
          "clinicalExplanation": "En el 1.er trimestre, el sangrado abundante o con dolor pélvico unilateral requiere descartar embarazo ectópico o amenaza de aborto. En el 2.º/3.er trimestre, requiere ecografía inmediata para descartar Placenta Previa o Desprendimiento Prematuro de Placenta.",
          "actionSteps": "Acuda de inmediato a Urgencias o Maternidad. Si usted es Rh negativo, necesitará además inmunoglobulina Anti-D (RhoGAM) dentro de las 72 horas posteriores a cualquier episodio de sangrado."
        },
        "sym-4": {
          "urgencyLabel": "Acudir a Maternidad de Inmediato",
          "trimesterScope": "2.º y 3.er Trimestre",
          "title": "Salida de Líquido Claro, Rosado o Verdoso por la Vagina (Ruptura de Fuente)",
          "clinicalExplanation": "La Ruptura Espontánea de Membranas a término o la Ruptura Prematura de Membranas Pretérmino (RPMP) antes de las 37 semanas elimina la barrera amniótica contra infecciones y conlleva riesgo de prolapso de cordón si la cabeza no está encajada.",
          "actionSteps": "Anote Color, Olor, Cantidad y Hora. No introduzca nada en la vagina. Acuda directamente a Maternidad para confirmación estéril con espéculo."
        },
        "sym-5": {
          "urgencyLabel": "Llamar al Obstetra / Maternidad en 1–2 Horas",
          "trimesterScope": "2.º y 3.er Trimestre (Semanas 20–36)",
          "title": "Contracciones Regulares Antes de las 37 Semanas (>4–6 por Hora Durante 1 Hora)",
          "clinicalExplanation": "El endurecimiento uterino rítmico acompañado de cólicos tipo menstrual, presión pélvica, dolor lumbar sordo o flujo mucoso antes de las 37s0d puede indicar amenaza de parto pretérmino.",
          "actionSteps": "Vacíe la vejiga, beba 500 mL (16–24 oz) de agua y recuéstese sobre el lado izquierdo. Si persisten >4–6 contracciones en 1 hora, llame de inmediato a maternidad para evaluación de fibronectina fetal y longitud cervical."
        },
        "sym-6": {
          "urgencyLabel": "Llamar Hoy al Obstetra y Tratar la Fiebre con Paracetamol",
          "trimesterScope": "Todos los Trimestres (Semanas 1–42)",
          "title": "Fiebre ≥100.4°F (38.0°C) o Escalofríos",
          "clinicalExplanation": "La hipertermia materna sostenida en el 1.er trimestre aumenta el riesgo para el tubo neural, y en trimestres posteriores puede desencadenar contracciones pretérmino o indicar pielonefritis, influenza, COVID-19 o corioamnionitis.",
          "actionSteps": "Tome paracetamol (acetaminofén 650–1.000 mg) para bajar la temperatura central, hidrátese y llame a su obstetra para evaluar el foco infeccioso."
        },
        "sym-7": {
          "urgencyLabel": "Acudir al Servicio de Urgencias de Inmediato",
          "trimesterScope": "Todos los Trimestres y 6 Semanas Posparto",
          "title": "Hinchazón, Enrojecimiento o Calor en una Sola Pantorrilla, o Dolor Torácico / Falta de Aire",
          "clinicalExplanation": "El embarazo es un estado de hipercoagulabilidad fisiológica, lo que aumenta el riesgo de Trombosis Venosa Profunda (TVP, más frecuente en la pierna izquierda) y Tromboembolia Pulmonar (TEP).",
          "actionSteps": "No masajee la pantorrilla. Acuda de inmediato al Servicio de Urgencias para realizar un ultrasonido Doppler venoso de extremidad inferior."
        },
        "sym-8": {
          "urgencyLabel": "Llamar al Consultorio Obstétrico en 24 Horas",
          "trimesterScope": "Final del 2.º y 3.er Trimestre",
          "title": "Comezón Intensa en Palmas de las Manos y Plantas de los Pies (Especialmente de Noche, Sin Sarpullido)",
          "clinicalExplanation": "El prurito palmo-plantar intenso sin erupción cutánea primaria es el síntoma clásico de la Colestasis Intrahepática del Embarazo (CIE), causada por la elevación de ácidos biliares séricos.",
          "actionSteps": "Llame a su obstetra para solicitar Ácidos Biliares Totales en sangre y Pruebas de Función Hepática (AST/ALT). Si se confirma, el ácido ursodesoxicólico alivia la comezón y protege al bebé."
        },
        "sym-9": {
          "urgencyLabel": "Llamar Hoy al Consultorio Obstétrico",
          "trimesterScope": "Todos los Trimestres",
          "title": "Ardor al Orinar (Disuria), Orina Turbia/Fétida o Dolor en el Costado Renal",
          "clinicalExplanation": "La progesterona dilata los uréteres, haciendo que las Infecciones de Vías Urinarias (IVU) bajas asciendan con mucha mayor facilidad hacia una pielonefritis aguda, la cual puede desencadenar parto pretérmino.",
          "actionSteps": "Comuníquese hoy con su consultorio obstétrico para un examen general de orina y urocultivo, e iniciar de inmediato antibióticos seguros en el embarazo (como cefalexina o fosfomicina)."
        },
        "sym-10": {
          "urgencyLabel": "Cambio Fisiológico Normal (Comentar en Consulta)",
          "trimesterScope": "2.º y 3.er Trimestre",
          "title": "Punzada Breve y Aguda en la Ingle al Girar en la Cama, Levantarse o Toser",
          "clinicalExplanation": "Dolor Clásico del Ligamento Redondo: a medida que el útero crece hacia arriba saliendo de la pelvis, los ligamentos redondos se estiran como bandas elásticas tensas y sufren breves espasmos con los movimientos bruscos.",
          "actionSteps": "Flexione las caderas antes de toser o estornudar, gire lentamente hacia un lado antes de incorporarse, aplique una compresa tibia (no caliente) o utilice una faja de soporte maternal."
        },
        "sym-11": {
          "urgencyLabel": "Cambio Fisiológico Normal (Braxton Hicks)",
          "trimesterScope": "2.º y 3.er Trimestre",
          "title": "Endurecimiento Abdominal Irregular e Indoloro que Cede con Hidratación y Reposo",
          "clinicalExplanation": "Las contracciones de Braxton Hicks (\"de práctica\") tonifican el músculo liso uterino sin dilatar el cuello. Son irregulares en frecuencia, no aumentan de intensidad y suelen desencadenarse por deshidratación o vejiga llena.",
          "actionSteps": "Beba 2 vasos de agua, vacíe la vejiga y descanse sobre su lado izquierdo. Llame a su obstetra si se vuelven regulares (cada 5–10 min) o dolorosas."
        },
        "sym-12": {
          "urgencyLabel": "Cambio Fisiológico Normal",
          "trimesterScope": "Todos los Trimestres",
          "title": "Congestión Nasal Leve (\"Rinitis del Embarazo\") o Sangrado Nasal Ocasional",
          "clinicalExplanation": "La congestión mucosa mediada por estrógenos y la expansión del +45% en el volumen sanguíneo inflaman los cornetes nasales hasta en el 30% de las embarazadas.",
          "actionSteps": "Use aerosol nasal de solución salina estéril, un humidificador de vapor frío en la habitación y tiras nasales. Evite descongestionantes orales como fenilefrina o pseudoefedrina (especialmente en el 1.er trimestre o si hay hipertensión)."
        }
      },
      "safety": {
        "med-1": {
          "category": "Dolor y Fiebre",
          "statusLabel": "Primera Línea Aprobada (ACOG)",
          "name": "Paracetamol / Acetaminofén (Tylenol)",
          "dosageNote": "325–650 mg cada 6 horas según necesidad (Máx. 3.000 mg/24h); use la dosis efectiva más baja por el menor tiempo.",
          "clinicalGuidance": "El ACOG y la SMFM confirman el paracetamol (acetaminofén) como el analgésico y antipirético de primera línea más seguro en los tres trimestres. Tratar la fiebre materna ≥38,0 °C (100,4 °F) es clínicamente importante para proteger al embrión/feto."
        },
        "med-2": {
          "category": "Dolor y Fiebre",
          "statusLabel": "Contraindicado en el Embarazo",
          "name": "Ibuprofeno (Advil/Motrin), Naproxeno (Aleve) y Aspirina en Dosis Alta (AINEs)",
          "dosageNote": "Evitar durante todo el embarazo (Nota: la aspirina de baja dosis de 81 mg recetada por su obstetra para prevenir preeclampsia es una excepción y SÍ es segura).",
          "clinicalGuidance": "Los AINEs orales inhiben las prostaglandinas fetales, causando cierre prematuro del conducto arterioso fetal, deterioro renal fetal y oligohidramnios (bajo líquido amniótico) tras la Semana 20."
        },
        "med-3": {
          "category": "Náuseas y Vómitos",
          "statusLabel": "Terapia de Primera Línea ACOG",
          "name": "Vitamina B6 (Piridoxina) + Doxilamina (Unisom SleepTabs / Diclegis)",
          "dosageNote": "Vitamina B6 10–25 mg 3 veces al día + Succinato de doxilamina 12.5–25 mg al acostarse.",
          "clinicalGuidance": "El esquema antiemético más estudiado en obstetricia (>200.000 embarazos expuestos sin señal teratogénica). Asegúrese de adquirir succinato de doxilamina de ingrediente único."
        },
        "med-4": {
          "category": "Acidez y Reflujo",
          "statusLabel": "Primera/Segunda Línea Aprobada",
          "name": "Carbonato de Calcio (Tums) y Famotidina (Pepcid)",
          "dosageNote": "Carbonato de calcio 500–1.000 mg según necesidad; Famotidina 10–20 mg 1 o 2 veces al día si los antiácidos no bastan.",
          "clinicalGuidance": "Los antiácidos de calcio neutralizan el ácido de forma segura y aportan calcio adicional (sepárelos 2 horas del hierro). Evite el subsalicilato de bismuto (Pepto-Bismol) por su absorción de salicilato."
        },
        "med-5": {
          "category": "Estreñimiento y GI",
          "statusLabel": "Aprobado (Absorción Sistémica Mínima)",
          "name": "Polietilenglicol 3350 (MiraLAX), Psyllium (Metamucil) y Docusato (Colace)",
          "dosageNote": "Polietilenglicol (MiraLAX) 17 g diarios en 240 mL (8 oz) de agua, aumentando la hidratación y la fibra dietética.",
          "clinicalGuidance": "La progesterona enlentece la motilidad intestinal y el hierro prenatal agrava el estreñimiento. Los laxantes osmóticos y formadores de bolo no se absorben a nivel sistémico y son seguros en todo el embarazo. Evite el aceite de ricino."
        },
        "med-6": {
          "category": "Alergias y Resfriado",
          "statusLabel": "Alivio de Alergias de Primera Línea",
          "name": "Loratadina (Claritin), Cetirizina (Zyrtec) y Fluticasona en Spray Nasal (Flonase)",
          "dosageNote": "Loratadina 10 mg diarios o Cetirizina 10 mg diarios; evite las versiones \"Claritin-D\" o \"Zyrtec-D\" con descongestionante.",
          "clinicalGuidance": "Los antihistamínicos de segunda generación y los esteroides intranasales tienen un sólido perfil de seguridad en el embarazo. Evite la pseudoefedrina o fenilefrina oral (productos \"-D\") en el 1.er trimestre o si hay hipertensión."
        },
        "med-7": {
          "category": "Dermatología / Cuidado de la Piel",
          "statusLabel": "Estrictamente Contraindicado (Teratogénico)",
          "name": "Isotretinoína (Accutane) y Retinoides Tópicos con Receta (Tretinoína / Retin-A)",
          "dosageNote": "Suspender antes de la concepción; utilice en su lugar Ácido Azelaico, Ácido Glicólico (<10%) o Niacinamida.",
          "clinicalGuidance": "Los retinoides sistémicos (derivados de la vitamina A) causan embriopatía craneofacial, cardíaca y tímica grave. Por precaución clínica, dermatólogos y obstetras también indican suspender los retinoides tópicos (tretinoína, adapaleno, retinol) durante el embarazo."
        },
        "med-8": {
          "category": "Nutrición y Bebidas",
          "statusLabel": "Seguro <200 mg / Día (ACOG)",
          "name": "Cafeína (Café, Espresso, Matcha, Té)",
          "dosageNote": "Limite la cafeína total diaria a ≤200 mg (aprox. una taza de 350 mL / 12 oz de café filtrado o dos expresos).",
          "clinicalGuidance": "El Comité del ACOG confirma que el consumo moderado de cafeína (<200 mg/día) no aumenta el riesgo de aborto espontáneo ni de parto prematuro. Recuerde contabilizar el té, los refrescos y el chocolate amargo en su total diario."
        },
        "med-9": {
          "category": "Nutrición y Bebidas",
          "statusLabel": "Altamente Recomendado (2–3 Porciones/Sem.)",
          "name": "Pescados Omega-3 Bajos en Mercurio (Salmón Silvestre, Sardinas, Trucha, Bacalao, Camarón)",
          "dosageNote": "225–340 g (8–12 oz) por semana de pescados/mariscos bajos en mercurio bien cocidos (aporta ~200–300 mg/día de DHA).",
          "clinicalGuidance": "La FDA y el ACOG recomiendan activamente comer 2–3 porciones/semana de pescado bajo en mercurio bien cocido para el desarrollo cerebral y retiniano fetal (DHA). EVITE estrictamente peces depredadores altos en mercurio: Tiburón, Pez Espada, Caballa Gigante, Aguja y Atún Patudo."
        },
        "med-10": {
          "category": "Nutrición y Bebidas",
          "statusLabel": "Evitar Crudos / No Pasteurizados",
          "name": "Lácteos No Pasteurizados, Carnes Frías sin Calentar y Brotes Crudos (Riesgo de Listeria)",
          "dosageNote": "Verifique que la etiqueta del queso indique \"Elaborado con Leche Pasteurizada\"; caliente los embutidos hasta que humeen (74°C / 165°F).",
          "clinicalGuidance": "La inmunidad celular disminuye en el embarazo, aumentando 10 veces la susceptibilidad a Listeria monocytogenes, que atraviesa la placenta. La mayoría de los quesos blandos comerciales (feta, brie, queso fresco) SÍ son pasteurizados: ¡solo revise la etiqueta!"
        }
      },
      "photos": {
        "0": {
          "caption": "Semanas 1–2: Ovocito secundario (≈120 µm) en la ovulación — zona pelúcida cristalina y corona radiada emergiendo del folículo ovárico.",
          "alt": "Render hiperrealista de un ovocito humano con su zona pelúcida y células del cúmulo emergiendo de la superficie ovárica."
        },
        "1": {
          "caption": "Semana 3: Mórula compactada de 16 células (Día 4 posfecundación) con cuerpos polares dentro de la zona pelúcida.",
          "alt": "Render hiperrealista de una mórula humana de 16 células con blastómeros translúcidos compactados dentro de la zona pelúcida transparente."
        },
        "2": {
          "caption": "Semana 4: Blastocisto eclosionado implantándose en el endometrio vascularizado — anillo trofoblástico, blastocele y masa celular interna.",
          "alt": "Render hiperrealista de un blastocisto humano implantándose en el revestimiento uterino rosado con finas proyecciones trofoblásticas."
        },
        "3": {
          "caption": "Semanas 5–6: Embrión en estadio de Carnegie con somitas dorsales, prominencia cardíaca primitiva y saco vitelino dorado dentro del saco gestacional.",
          "alt": "Render hiperrealista de un embrión humano temprano con piel translúcida, somitas visibles y saco vitelino dentro de la membrana amniótica."
        },
        "4": {
          "caption": "Semanas 7–9: Etapa embrionaria tardía con vesículas telencefálicas, copa óptica pigmentada, corazón de 4 cámaras, placas de manos y saco vitelino.",
          "alt": "Fotografía macro intrauterina de un embrión humano tardío con piel vascular translúcida, copa óptica oscura, esbozos de extremidades y saco vitelino dorado."
        },
        "5": {
          "caption": "Semanas 10–15: Feto del 1.er trimestre con dedos separados, párpados fusionados, vasos temporales translúcidos y cordón umbilical de 3 vasos unido a la placenta izquierda.",
          "alt": "Fotografía macro intrauterina de un feto humano de 12 semanas dentro del saco amniótico con cordón umbilical de 3 vasos y disco placentario izquierdo."
        },
        "6": {
          "caption": "Semanas 16–25: Feto de mitad de gestación (Ecografía Anatómica Nivel II de las 20 semanas) con brillo de vérnix caseosa, extremidades flexionadas y cordón umbilical de 3 vasos conectado a la placenta izquierda.",
          "alt": "Fotografía macro intrauterina de un feto humano de 20 semanas a mitad de gestación flotando en el saco amniótico con disco placentario izquierdo."
        },
        "7": {
          "caption": "Semanas 26–33: Feto del inicio del 3.er trimestre con párpados y pestañas formados y depósito acelerado de tejido adiposo subcutáneo.",
          "alt": "Fotografía macro intrauterina de un feto humano de 28 semanas del tercer trimestre descansando plácidamente dentro del saco amniótico."
        },
        "8": {
          "caption": "Semanas 34–42: Feto de término completo con mejillas redondeadas, grasa subcutánea madura y surfactante pulmonar listo para el nacimiento.",
          "alt": "Fotografía macro intrauterina de un feto humano a término acunado dentro del saco amniótico con placenta izquierda y cordón umbilical enrollado."
        }
      }
    },
    "zh": {
      "weeks": {
        "1": {
          "phaseLabel": "围受孕期（月经期 / 卵泡募集期）",
          "stageTitle": "卵泡募集与子宫内膜周期重置",
          "biologicalStage": "卵巢窦卵泡募集群",
          "lengthMetric": "0.04 mm (原始卵泡)",
          "weightMetric": "< 0.001 g",
          "heartRateBpm": "尚未形成（受孕前）",
          "keyOrgans": [
            "下丘脑-垂体-卵巢轴",
            "子宫内膜基底层",
            "优势卵泡选择"
          ],
          "fetalMilestones": [
            "产科孕周从末次月经（LMP）第 1 天开始计算，大约在实际受精前 2 周。",
            "促卵泡激素（FSH）募集一批窦卵泡，最终筛选出一个优势格拉夫卵泡。",
            "不断升高的雌二醇促进子宫内膜功能层增殖，为受精卵准备血管丰富的着床床。"
          ],
          "maternalPhysiology": "月经期子宫内膜剥脱过渡至卵泡增殖期，基础体温维持在排卵前的较低水平。",
          "doctorCheckIn": "备孕核查：每日补充 400–800 mcg 叶酸（既往有神经管缺陷史需 4 mg），核实风疹/水痘抗体，并评估慢性病药物的致畸风险。",
          "clinicalPearl": "ACOG 从末次月经第 1 天起算孕龄（共 40 周 / 280 天），因为排卵时间因人而异，而实际胚胎龄比孕周少约 2 周（38 周 / 266 天）。"
        },
        "2": {
          "phaseLabel": "围受孕期（排卵期窗口）",
          "stageTitle": "LH 峰、排卵与输卵管拾卵",
          "biologicalStage": "次级卵母细胞（减数分裂 II 期中期）",
          "lengthMetric": "0.12 mm (120微米卵母细胞)",
          "weightMetric": "< 0.001 g",
          "heartRateBpm": "尚未形成（排卵窗口）",
          "keyOrgans": [
            "卵丘-卵母细胞复合体",
            "透明带",
            "黄体形成"
          ],
          "fetalMilestones": [
            "周期中期的促黄体生成素（LH）峰触发减数分裂 I 恢复并排出第一极体。",
            "排卵释放停滞在减数分裂 II 中期的次级卵母细胞，由输卵管伞端拾入输卵管壶腹部。",
            "破裂的卵泡黄体化形成黄体，分泌孕酮使子宫内膜转化为分泌期状态。"
          ],
          "maternalPhysiology": "雌激素高峰促进子宫内膜增厚并产生利于受精的拉丝状宫颈黏液；排卵后孕酮使基础体温（BBT）升高约 0.3 °C（0.5 °F）。",
          "doctorCheckIn": "易孕窗口指导：最高受孕率出现在排卵前 5 天至排卵当日（卵母细胞排出后存活约 12–24 小时）。",
          "clinicalPearl": "若通过试管婴儿（IVF）受孕，第 5 天囊胚移植当日即对应妊娠 2 周 + 5 天（2w5d）。"
        },
        "3": {
          "phaseLabel": "孕早期 — 胚芽卵裂期",
          "stageTitle": "受精、受精卵卵裂与桑椹胚形成",
          "biologicalStage": "受精卵 → 16细胞桑椹胚",
          "lengthMetric": "0.15 – 0.20 mm",
          "weightMetric": "< 0.001 g",
          "heartRateBpm": "无血管卵裂阶段",
          "keyOrgans": [
            "二倍体基因组 (46条染色体)",
            "卵裂球致密化",
            "内细胞团分化"
          ],
          "fetalMilestones": [
            "输卵管壶腹部的受精触发皮质反应，阻止多精受精并完成减数分裂 II。",
            "雌雄原核融合成二倍体受精卵（46,XX 或 46,XY），每隔 12–24 小时进行快速有丝分裂卵裂。",
            "受精后第 4 天，16–32 细胞的桑椹胚发生致密化并进入宫腔，出现腔隙形成早期囊胚。"
          ],
          "maternalPhysiology": "早孕因子（EPF）调节母体免疫耐受；黄体分泌的孕酮维持子宫内膜稳定。",
          "doctorCheckIn": "本周尚无需医院产检。请避免服用非甾体抗炎药（布洛芬、萘普生），因为抑制前列腺素可能干扰囊胚着床。",
          "clinicalPearl": "孕 4 周（受精后 2 周）之前的暴露通常遵循“全或无”定律（早于胚胎第 3–8 周 / 孕 5–10 周的经典器官发生期），但已知致畸物仍应立即停用。"
        },
        "4": {
          "phaseLabel": "孕早期 — 囊胚着床期",
          "stageTitle": "囊胚着床与合体滋养层分泌 hCG",
          "biologicalStage": "着床期双层胚盘囊胚",
          "lengthMetric": "0.4 – 1.0 mm",
          "weightMetric": "< 0.01 g",
          "heartRateBpm": "原始陷窝母胎循环",
          "keyOrgans": [
            "上胚层与下胚层双层胚盘",
            "羊膜腔",
            "初级卵黄囊",
            "滋养层陷窝"
          ],
          "fetalMilestones": [
            "囊胚从透明带孵出，贴附并侵入蜕膜化的子宫内膜（排卵后第 6–10 天）。",
            "内细胞团分化为双层胚盘（上胚层与下胚层）。",
            "合体滋养层侵入母体螺旋毛细血管并分泌 β-hCG，挽救妊娠黄体以持续产生孕酮。"
          ],
          "maternalPhysiology": "月经推迟；排卵后 8–11 天血清 β-hCG 即可检出，正常宫内孕每 48–72 小时翻倍。",
          "doctorCheckIn": "早孕试纸阳性！请联系产科预约首次产前确认与孕周核定超声（通常安排在第 6–9 周）。",
          "clinicalPearl": "预计经期前后的少量点滴出血（“着床出血”）常见且良性，但若伴随单侧下腹痛，需抽血复查动态 β-hCG 以排除异位妊娠（宫外孕）。"
        },
        "5": {
          "phaseLabel": "孕早期 — 早期器官发生",
          "stageTitle": "原肠胚形成、神经板与原始心管搏动",
          "biologicalStage": "三胚层胚胎（卡内基分期 9–10）",
          "lengthMetric": "1.5 – 2.5 mm (顶臀长)",
          "weightMetric": "0.02 g",
          "heartRateBpm": "85 – 100 次/分（原始心管初发搏动）",
          "keyOrgans": [
            "外胚层 / 中胚层 / 内胚层",
            "神经沟",
            "生心区新月",
            "体节"
          ],
          "fetalMilestones": [
            "原肠胚形成确立三大胚层：外胚层（神经系统/表皮）、中胚层（心脏/骨骼/肾脏/血液）与内胚层（消化道/肺/肝脏）。",
            "神经板折叠形成神经沟，两侧排列着轴旁中胚层体节。",
            "成对的心内膜管融合为单一原始心管，在受精后第 22 天左右开始蠕动性搏动。"
          ],
          "maternalPhysiology": "快速升高的 hCG、雌激素与孕酮可引起早期孕吐、乳房胀痛、嗅觉敏感及明显困倦。",
          "doctorCheckIn": "若有宫外孕史、复发性流产史或 IVF 受孕，医生可能会安排每 48 小时血清 β-hCG 监测及早期孕囊定位超声。",
          "clinicalPearl": "第 5 周经阴道超声（TVUS）下，当血清 β-hCG 超过鉴别阈值（约 1,500–2,000 mIU/mL）时，可见宫内孕囊与卵黄囊（“双蜕膜囊征”）。"
        },
        "6": {
          "phaseLabel": "孕早期 — 器官发生期",
          "stageTitle": "神经管闭合、心脏襻形成与四肢肢芽萌出",
          "biologicalStage": "胚胎（卡内基分期 12–13）",
          "lengthMetric": "4 – 6 mm (顶臀长)",
          "weightMetric": "0.1 g",
          "heartRateBpm": "100 – 115 次/分",
          "keyOrgans": [
            "前后神经孔闭合",
            "S形盘曲原始心管",
            "视泡",
            "听基板"
          ],
          "fetalMilestones": [
            "前（颅侧）神经孔与后（尾侧）神经孔在受精后第 28 天完全闭合，封闭脑泡与脊髓。",
            "原始心管完成右旋 S 形弯曲，建立心房与心室腔，经阴道超声可清晰观察到原始心管搏动。",
            "上下肢芽与鳃弓（未来的下颌、腭部及中耳结构）同步萌出。"
          ],
          "maternalPhysiology": "肾血流量增加 25–30%，即使在子宫增大压迫膀胱之前就会出现尿频现象。",
          "doctorCheckIn": "早期妊娠活性与孕周核定超声窗口（第 6–8 周）：确认宫内胎芽、测量顶臀长（CRL，误差 ±3–5 天）并记录胎心搏动。",
          "clinicalPearl": "由于神经管闭合在第 6 周完成，脊柱裂等神经管缺陷往往在首次产检前就已发生，因此孕前及孕早期补充叶酸至关重要。"
        },
        "7": {
          "phaseLabel": "孕早期 — 器官发生期",
          "stageTitle": "端脑泡扩张、手板指线与后肾形成",
          "biologicalStage": "胚胎（卡内基分期 15–16）",
          "lengthMetric": "9 – 11 mm (顶臀长)",
          "weightMetric": "0.5 g",
          "heartRateBpm": "120 – 140 次/分",
          "keyOrgans": [
            "大脑半球",
            "永久肾（后肾）",
            "手板指线",
            "胰芽"
          ],
          "fetalMilestones": [
            "前脑分为成对的端脑泡（未来的大脑皮层），每分钟生成约 10 万个新神经元。",
            "手板变平并显现指线（手指原基）；晶状体泡内陷，视网膜色素开始出现。",
            "输尿管芽侵入后肾间充质，开始发育为永久肾（后肾）。"
          ],
          "maternalPhysiology": "宫颈腺体分泌浓稠的黏液栓，封闭宫颈管以阻挡上行性细菌感染。",
          "doctorCheckIn": "针对孕期恶心呕吐（孕吐），ACOG 一线推荐方案为维生素 B6（吡哆醇 10–25 mg，每日 3 次）联合多西拉敏（12.5–25 mg）。",
          "clinicalPearl": "生理性中肠疝于本周开始：快速生长的肠管暂时突入脐带近端体蒂内，直至第 10–11 周退回腹腔。"
        },
        "8": {
          "phaseLabel": "孕早期 — 器官发生期",
          "stageTitle": "4 腔心室间隔闭合与指间蹼状手指",
          "biologicalStage": "胚胎（卡内基分期 18–20）",
          "lengthMetric": "15 – 17 mm (顶臀长)",
          "weightMetric": "1.1 g",
          "heartRateBpm": "145 – 165 次/分",
          "keyOrgans": [
            "房室瓣",
            "室间隔",
            "软骨化中心",
            "外耳廓"
          ],
          "fetalMilestones": [
            "心内膜垫融合且室间隔闭合，完成 4 腔心脏的解剖结构构建。",
            "细胞凋亡（程序性细胞死亡）在指/趾间雕琢出凹槽，肘关节与膝关节开始弯曲。",
            "初级软骨性骨骼雏形形成，胚胎躯干与四肢开始出现自发性微弱抽动（母体尚无法感知）。"
          ],
          "maternalPhysiology": "子宫从拳头大小增大至大柠檬大小；母体心输出量因每搏输出量和心率增加而提升约 20%。",
          "doctorCheckIn": "首次产检（孕 8–10 周）：经阴道超声确认宫内活胎及顶臀长（CRL），核对预产期（EDD），完成首次产前血液检查（血型、Rh、不规则抗体、CBC、风疹、乙肝、HIV、梅毒、尿培养）及宫颈筛查。",
          "clinicalPearl": "孕早期（第 7–13 周）超声测量的顶臀长（CRL）是确立或校正预产期（EDD）最精准的金标准。"
        },
        "9": {
          "phaseLabel": "孕早期 — 晚期胚胎阶段",
          "stageTitle": "胚胎心率峰值、眼睑融合与膈肌形成",
          "biologicalStage": "晚期胚胎（卡内基分期 21–22）",
          "lengthMetric": "22 – 25 mm (2.3 cm 顶臀长)",
          "weightMetric": "2.0 g",
          "heartRateBpm": "155 – 175 次/分（生理性峰值）",
          "keyOrgans": [
            "胸腹膜膈肌",
            "眼睑融合",
            "垂体与肾上腺皮质",
            "声韧带（声带）"
          ],
          "fetalMilestones": [
            "由于副交感神经系统尚在发育，胚胎心率在本周达到生理性峰值（约 165–175 BPM）。",
            "胸腹膜与横膈融合，完成胸腔膈肌的封闭。",
            "上下眼睑长合并融合闭合（将一直闭合至第 25–26 周以保护发育中的角膜）。"
          ],
          "maternalPhysiology": "血清 β-hCG 在孕 9–10 周达到峰值（约 90,000–100,000 mIU/mL），通常与早孕晨吐高峰期相吻合。",
          "doctorCheckIn": "与产科医生沟通遗传学筛查方案：自孕 10+0 周起可抽血行无创产前基因检测（NIPT）、单基因携带者筛查（CF、SMA、血红蛋白病）及颈项透明层（NT）超声。",
          "clinicalPearl": "若剧烈呕吐导致体重较孕前下降 >5%、尿酮体阳性或 24 小时无法进水（妊娠剧吐），请及时就医接受静脉补液与止吐治疗。"
        },
        "10": {
          "phaseLabel": "孕早期 — 胚胎向胎儿过渡期",
          "stageTitle": "器官发生期完成与无创产前基因检测（NIPT）窗口开启",
          "biologicalStage": "胚胎 → 胎儿过渡期（卡内基第 23 期）",
          "lengthMetric": "31 – 35 mm (3.3 cm 顶臀长)",
          "weightMetric": "4.0 g",
          "heartRateBpm": "150 – 170 次/分",
          "keyOrgans": [
            "软骨内成骨",
            "肾单位肾小球滤过",
            "乳牙牙蕾",
            "绒毛膜绒毛"
          ],
          "fetalMilestones": [
            "第 10 周末标志着从“胚胎”正式过渡为“胎儿”：所有主要器官系统均已在解剖位置上建立。",
            "后肾开始产生稀释的胎儿尿液，随后将成为羊水的主要来源。",
            "胚胎尾部完全退化；手指甲床与颌骨内的乳牙牙蕾开始形成。"
          ],
          "maternalPhysiology": "胎盘滋养层开始接替妊娠黄体合成孕酮与雌二醇（“黄体-胎盘功能转换”）。",
          "doctorCheckIn": "无创产前基因检测（NIPT / 游离 DNA）采血窗口开启（孕 10+0 周）：筛查 21 三体（唐氏综合征）、18 三体、13 三体及性染色体异常，对 T21 敏感度 >99%。",
          "clinicalPearl": "随着主要器官结构发生期在第 10 周末完成，进入胎儿生长成熟期后，发生重大结构性畸形的敏感性显著下降。"
        },
        "11": {
          "phaseLabel": "孕早期 — 早期胎儿阶段",
          "stageTitle": "中肠生理性回纳、腭板融合与鼻塞形成",
          "biologicalStage": "早期胎儿",
          "lengthMetric": "4.1 – 4.5 cm (顶臀长)",
          "weightMetric": "7.5 g",
          "heartRateBpm": "145 – 165 次/分",
          "keyOrgans": [
            "腹壁闭合",
            "继发腭融合",
            "肝脏造血",
            "毛囊"
          ],
          "fetalMilestones": [
            "肠管逆时针旋转 270° 并完全退回胎儿腹腔，腹壁闭合，生理性中肠疝自然消退。",
            "上颌腭突抬升并在中线融合，将口腔与鼻腔完全分隔。",
            "胎儿肝脏成为主要造血器官，大量合成胎儿血红蛋白（HbF）。"
          ],
          "maternalPhysiology": "在孕酮和一氧化氮作用下母体全身血管阻力下降，快速起身时偶有体位性头晕。",
          "doctorCheckIn": "孕早期 NT（颈项透明层）超声窗口（11周0天至13周6天），如有产前诊断指征可在此窗口期（10–13周）行绒毛膜穿刺取样（CVS）。",
          "clinicalPearl": "胎儿血红蛋白（HbF，α2γ2）对氧气的亲和力高于成人血红蛋白（HbA），确保氧气高效地从母体绒毛间隙向胎儿转运。"
        },
        "12": {
          "phaseLabel": "孕早期 — 第12周里程碑（NT超声窗口）",
          "stageTitle": "吞咽反射、肠蠕动与小剂量阿司匹林预防窗口",
          "biologicalStage": "胎儿",
          "lengthMetric": "5.3 – 5.8 cm (顶臀长)",
          "weightMetric": "14 g（0.5 盎司）",
          "heartRateBpm": "140 – 160 次/分",
          "keyOrgans": [
            "胃肠道蠕动",
            "垂体激素 (ACTH/TSH)",
            "脾脏淋巴生成",
            "锁骨与股骨骨化"
          ],
          "fetalMilestones": [
            "胎儿开始主动吞咽羊水；肠道平滑肌启动协调性蠕动收缩并吸收葡萄糖。",
            "颅骨、长骨与椎骨出现初级骨化中心。",
            "外生殖器在双氢睾酮（DHT，男性）或无 DHT（女性）信号调控下开始形态学分化。"
          ],
          "maternalPhysiology": "子宫底升出耻骨联合上方，从盆腔器官变为腹腔器官，对膀胱的直接压迫暂时减轻。",
          "doctorCheckIn": "孕 12 周产检 + 子痫前期预防评估：若存在 ≥1 项高危因素或 ≥2 项中危因素（如初产、年龄 ≥35 岁、BMI >30），ACOG 与 USPSTF 建议自孕 12 周起每日服用 81 mg 小剂量阿司匹林直至分娩。",
          "clinicalPearl": "一旦在第 12 周超声确认胎心正常且遗传学筛查低风险，自然流产的统计学风险将降至 1–2% 以下。"
        },
        "13": {
          "phaseLabel": "孕早期 — 孕早期最后一周",
          "stageTitle": "声带成熟、指纹皮嵴形成与胎盘内分泌自主",
          "biologicalStage": "胎儿",
          "lengthMetric": "6.7 – 7.4 cm (顶臀长)",
          "weightMetric": "25 g（0.9 盎司）",
          "heartRateBpm": "140 – 160 次/分",
          "keyOrgans": [
            "胎儿-胎盘单位",
            "指纹（真皮嵴）",
            "胰腺分泌胰岛素",
            "卵巢原始卵泡群"
          ],
          "fetalMilestones": [
            "指尖掌垫上开始形成独一无二的表皮摩擦嵴（指纹）。",
            "女性胎儿发育中的卵巢内卵原细胞迅速增殖（至孕中期可达约 200 万个原始卵泡）。",
            "头部生长速度相对躯干放缓，目前头部约占顶臀长（CRL）的三分之一。"
          ],
          "maternalPhysiology": "随着胎盘完全建立内分泌自主权，hCG 水平达平台期并开始回落；孕吐通常明显减轻，精力逐渐恢复。",
          "doctorCheckIn": "本周是测量 NT（颈项透明层）的最后窗口（必须在 13周6天 / CRL ≤84 mm 前完成）。可预约孕期口腔洁牙（孕期洗牙安全且推荐）。",
          "clinicalPearl": "受激素影响毛细血管通透性增加，妊娠期牙龈炎很常见；常规洗牙护理及局部利多卡因麻醉（无全身肾上腺素过载）在孕期完全安全。"
        },
        "14": {
          "phaseLabel": "孕中期 — 步入孕中期",
          "stageTitle": "胎毛萌出、甲状腺激素合成与面部微表情",
          "biologicalStage": "孕中期胎儿",
          "lengthMetric": "8.5 cm (顶臀长) / ~12 cm (顶跟长)",
          "weightMetric": "45 g（1.6 盎司）",
          "heartRateBpm": "135 – 155 次/分",
          "keyOrgans": [
            "胎儿甲状腺（甲状腺素 T4）",
            "第七对脑神经（面神经）",
            "胎毛（毳毛）",
            "前列腺分化 / 卵巢下降"
          ],
          "fetalMilestones": [
            "胎儿甲状腺开始摄取碘并合成内源性甲状腺素（T4），驱动大脑神经系统发育。",
            "第七对脑神经（面神经）支配面部肌肉，胎儿出现眯眼、皱眉等面部表情反射。",
            "体表开始萌出极细的胎毛（毳毛），用于附着保护皮肤的胎脂。"
          ],
          "maternalPhysiology": "欢迎进入孕中期（“黄金孕中期”）。食欲明显恢复，母体心输出量较孕前基线增加约 30–40%。",
          "doctorCheckIn": "若有宫颈机能不全史或 <34 周自发性早产史，请与医生讨论宫颈长度超声监测或预防性宫颈环扎术（通常在 12–14 周施行）。",
          "clinicalPearl": "由于第 14 周起胎儿甲状腺开始自主合成激素，孕期充足的碘摄入（每日 220 mcg，请确认复合维生素含碘化钾）对胎儿脑发育至关重要。"
        },
        "15": {
          "phaseLabel": "孕中期 — 骨骼骨化与听觉发育",
          "stageTitle": "中耳听小骨骨化、羊水呼吸样运动与母血清 AFP 筛查窗口",
          "biologicalStage": "胎儿",
          "lengthMetric": "10.1 cm (顶臀长) / ~14.5 cm (顶跟长)",
          "weightMetric": "70 g（2.5 盎司）",
          "heartRateBpm": "135 – 155 次/分",
          "keyOrgans": [
            "锤骨 / 砧骨 / 镫骨（听小骨）",
            "气管支气管树",
            "长骨骨干骨化",
            "味蕾"
          ],
          "fetalMilestones": [
            "中耳三块听小骨（锤骨、砧骨、镫骨）开始骨化，建立声音传导通路。",
            "胎儿出现间歇性呼吸样运动，将羊水吸入并排出发育中的支气管树，促进肺部发育。",
            "骨骼肌神经支配增强，双腿长度现已超过双臂。"
          ],
          "maternalPhysiology": "雌激素刺激黑色素细胞活性，腹部可能出现妊娠中线（黑线）、乳晕加深或面部妊娠斑。",
          "doctorCheckIn": "母体血清甲胎蛋白（MSAFP / 唐氏四联筛查）窗口开启（第 15–20 周）：即使做过 NIPT，单项 MSAFP 仍可用于筛查开放性神经管缺陷。",
          "clinicalPearl": "睡姿建议：从孕中期开始建议采用侧卧位（尤其是左侧卧位），避免增大的子宫压迫下腔静脉影响回心血量。"
        },
        "16": {
          "phaseLabel": "孕中期 — 孕4月里程碑（初觉胎动）",
          "stageTitle": "快速扫视眼动、四肢协调屈伸与初觉胎动窗口",
          "biologicalStage": "胎儿",
          "lengthMetric": "11.6 cm (顶臀长) / ~16.5 cm (顶跟长)",
          "weightMetric": "100 g（3.5 盎司）",
          "heartRateBpm": "130 – 155 次/分",
          "keyOrgans": [
            "眼外肌",
            "脐带华通氏胶",
            "胎儿膀胱周期性排尿",
            "皮肤感觉感受器"
          ],
          "fetalMilestones": [
            "随着中脑动眼神经核发育成熟，闭合的眼睑下开始出现缓慢的扫视性眼球运动。",
            "胎儿心脏每天通过包裹着华通氏胶的 3 血管脐带（2 条脐动脉、1 条脐静脉）泵血约 24 升（25 夸脱）。",
            "胎儿膀胱每 30–45 分钟充盈并排空一次，维持羊水量与缓冲保护空间。"
          ],
          "maternalPhysiology": "经产妇（或胎盘位于子宫后壁者）可能在第 16–20 周之间首次感受到轻柔的胎动（“初觉胎动”）。",
          "doctorCheckIn": "第 16 周常规产检：测量血压、体重、尿常规试纸、多普勒听胎心，按需采血查 MSAFP。请立即预约第 20 周 II 级系统大排畸超声！",
          "clinicalPearl": "如果超声提示“胎盘前壁”（胎盘附着在子宫前壁），胎盘会像软垫一样缓冲胎动，通常到第 20–22 周才明显感到胎动，这完全正常。"
        },
        "17": {
          "phaseLabel": "孕中期 — 棕色脂肪与免疫成熟",
          "stageTitle": "棕色脂肪组织沉积与跨胎盘 IgG 抗体转运启动",
          "biologicalStage": "胎儿",
          "lengthMetric": "13.0 cm (顶臀长) / ~18.5 cm (顶跟长)",
          "weightMetric": "140 g（5.0 盎司）",
          "heartRateBpm": "130 – 155 次/分",
          "keyOrgans": [
            "棕色脂肪组织 (BAT)",
            "耳蜗毛细胞",
            "汗腺",
            "胎盘 FcRn IgG 抗体受体"
          ],
          "fetalMilestones": [
            "特化的棕色脂肪组织（BAT）开始在颈部、胸骨后及肾周沉积，用于出生后的非颤抖性产热。",
            "合体滋养层 FcRn 受体开始主动将母体 IgG 保护性抗体转运至胎儿血液循环。",
            "耳蜗柯蒂氏器内的毛细胞排列成形，母体内部低频声音（心跳、血流声）开始刺激内耳。"
          ],
          "maternalPhysiology": "骨盆两侧的子宫圆韧带受牵拉，在翻身、咳嗽或站起时可能引起短暂的腹股沟牵拉刺痛（“圆韧带痛”）。",
          "doctorCheckIn": "羊膜腔穿刺产前诊断窗口（第 15–20 周）：若无创/唐筛提示高风险或超声发现结构异常，可通过羊水穿刺行染色体核型及基因芯片确诊。",
          "clinicalPearl": "子宫圆韧带痛表现为随体位改变出现的数秒钟短暂刺痛；若出现持续加重、规律性腹痛或伴随出血/发热，应立即就医评估。"
        },
        "18": {
          "phaseLabel": "孕中期 — 神经感觉系统扩展",
          "stageTitle": "神经髓鞘化启动、胎脂分泌与大排畸超声窗口开启",
          "biologicalStage": "胎儿",
          "lengthMetric": "14.2 cm (顶臀长) / ~20.5 cm (顶跟长)",
          "weightMetric": "190 g（6.7 盎司）",
          "heartRateBpm": "125 – 155 次/分",
          "keyOrgans": [
            "施万细胞神经髓鞘化",
            "皮脂腺（分泌胎脂）",
            "心脏流出道",
            "胼胝体"
          ],
          "fetalMilestones": [
            "皮脂腺开始分泌胎脂（Vernix Caseosa）——一层富含脂质且具抗菌作用的生物保护膜，防止胎儿皮肤受羊水浸渍。",
            "外周施万细胞与中枢少突胶质细胞开始包裹神经轴突形成髓鞘，加速神经冲动传导。",
            "胼胝体连接左右大脑半球；心脏流出道（主动脉与肺动脉交叉）在超声下清晰可辨。"
          ],
          "maternalPhysiology": "孕中期生理性血压低谷：全身血管扩张使母体血压在第 18–20 周达到最低点（较孕前基线低约 5–10 mmHg）。",
          "doctorCheckIn": "II 级系统胎儿大排畸超声窗口开启（第 18–22 周）：多数产科与母胎医学专家建议安排在 19周0天至 21周0天之间，以获得最佳心脏与脊柱成像。",
          "clinicalPearl": "在大排畸超声检查时，医生还会测量宫颈长度（18–24 周正常值 ≥25 mm），用于评估早产风险。"
        },
        "19": {
          "phaseLabel": "孕中期 — 大脑感觉皮层映射",
          "stageTitle": "体感皮层映射构建与肾小管浓缩功能成熟",
          "biologicalStage": "胎儿",
          "lengthMetric": "15.3 cm (顶臀长) / ~22.5 cm (顶跟长)",
          "weightMetric": "240 g（8.5 盎司）",
          "heartRateBpm": "125 – 155 次/分",
          "keyOrgans": [
            "躯体感觉皮层",
            "肾小管亨利氏环（髓袢）",
            "恒牙牙蕾",
            "细支气管分支"
          ],
          "fetalMilestones": [
            "丘脑-皮层神经投射到达大脑皮层板下区，为听觉、视觉和触觉信息处理奠定基础。",
            "恒牙牙蕾在上下颌骨乳牙牙蕾的深部开始形成。",
            "肺发育进入小管期：呼吸性细支气管不断分支，肺毛细血管网密集增生。"
          ],
          "maternalPhysiology": "母体血容量已扩充约 30–35%，红细胞生成对铁的需求大增，需保证富含铁的膳食与产前铁剂补充。",
          "doctorCheckIn": "为第 20 周产检与大排畸超声准备问题清单（如胎盘下缘距宫颈内口距离、脐带三血管结构及分娩准备课程）。",
          "clinicalPearl": "若第 19–20 周超声提示“胎盘位置偏低 / 边缘性状态”，随着孕晚期子宫下段拉长，超过 90% 会在第 32 周前自然“长上去”。"
        },
        "20": {
          "phaseLabel": "孕中期 — 孕程过半里程碑（大排畸超声）",
          "stageTitle": "孕程过半里程碑：II 级系统大排畸超声与宫底达脐平",
          "biologicalStage": "孕程半程胎儿",
          "lengthMetric": "25.5 cm (10.0 in 顶踵长 CHL)",
          "weightMetric": "300 g（10.6 盎司）",
          "heartRateBpm": "120 – 155 次/分",
          "keyOrgans": [
            "4 腔心与大血管流出道切面",
            "后颅窝 / 小脑",
            "胎粪积聚",
            "表皮角质层"
          ],
          "fetalMilestones": [
            "从孕 20 周起，由于胎儿双腿伸展，产科医生改为测量顶踵长（CHL，头顶至脚跟总长）而非顶臀长（CRL）。",
            "无菌胎粪（脱落的肠上皮细胞、胎毛、胆色素及浓缩羊水）开始在胎儿结肠内积聚。",
            "胎儿出现昼夜睡眠-觉醒周期，每 20–40 分钟在活跃活动与安静睡眠之间交替。"
          ],
          "maternalPhysiology": "子宫底高度达到母体肚脐水平。在第 20 至 36 周之间，宫高（厘米数）大致等于妊娠周数（±2 cm）。",
          "doctorCheckIn": "孕 20 周产检与 II 级系统排畸超声（孕 18–22 周）：从头到脚详细检查脑室、颜面唇部、4 腔心、流出道、胃泡、双肾、膀胱、脊柱、3 血管脐带、胎盘及宫颈长度。",
          "clinicalPearl": "为什么第 20 周后的血压至关重要：妊娠 20 周及以后首次出现的高血压（血压 ≥140/90 mmHg）是诊断妊娠期高血压或子痫前期的关键分界点。"
        },
        "21": {
          "phaseLabel": "孕中期 — 骨髓造血功能转换",
          "stageTitle": "骨髓造血转换与肠道消化酶成熟",
          "biologicalStage": "胎儿",
          "lengthMetric": "26.7 cm (10.5 in 顶跟长)",
          "weightMetric": "360 g（12.7 盎司）",
          "heartRateBpm": "120 – 155 次/分",
          "keyOrgans": [
            "骨髓造血功能启动",
            "小肠绒毛",
            "脾脏红髓",
            "前庭迷路（平衡觉）"
          ],
          "fetalMilestones": [
            "消化道开始从吞咽的羊水中吸收水分与糖分（整个孕期约过滤 24 L / 25 qt 羊水）。",
            "小肠微绒毛开始表达双糖酶（乳糖酶、蔗糖酶），从吞咽的羊水中吸收水分和电解质。",
            "内耳前庭半规管可感知母体运动，当母亲走动时像摇篮一样哄睡胎儿，平躺安静时胎动反而更明显。"
          ],
          "maternalPhysiology": "松弛素使耻骨联合与骶髂关节韧带柔韧松弛，为分娩做准备，有时会引起轻微的骨盆带酸痛。",
          "doctorCheckIn": "如果第 20 周大排畸超声因胎儿体位遮挡导致部分切面（如脊柱或心脏流出道）显示欠佳，通常会在 2–4 周内安排一次简短的复查补拍。",
          "clinicalPearl": "为什么宝宝在夜间似乎更活跃：白天行走时的摇晃感会让胎儿安睡；当您夜间安静平躺或进食晚餐后，胎儿刚好进入清醒活跃期。"
        },
        "22": {
          "phaseLabel": "孕中期 — 听觉与触觉整合",
          "stageTitle": "母体声音听觉识别、眉毛成型与握持反射",
          "biologicalStage": "胎儿",
          "lengthMetric": "27.8 cm (10.9 in 顶跟长)",
          "weightMetric": "430 g（15.2 盎司）",
          "heartRateBpm": "120 – 155 次/分",
          "keyOrgans": [
            "耳蜗-听觉皮层通路",
            "手掌抓握反射",
            "泪管",
            "肺泡管原基"
          ],
          "fetalMilestones": [
            "脑干听觉诱发反应趋于成熟；胎儿能够听到并开始熟悉母亲说话的韵律及外界低频声音。",
            "手掌抓握反射形成——胎儿常在宫内抓握脐带（华通氏胶可保护脐血管免受压迫）。",
            "眉毛与细软的头发已清晰可见，但黑色素尚未完全沉积。"
          ],
          "maternalPhysiology": "生理性血液稀释：母体血浆容量增加速度（约 45–50%）快于红细胞总量增加（约 25–30%），导致血红蛋白浓度出现生理性轻度下降。",
          "doctorCheckIn": "如有指征（如试管婴儿受孕、孕前糖尿病或先天性心脏病家族史），通常在第 20–22 周进行专项胎儿超声心动图检查。",
          "clinicalPearl": "妊娠后半期可能开始出现偶发、无痛、不规律且持续 <30 秒的子宫发紧（Braxton Hicks 假性宫缩），饮水与休息后即可缓解。"
        },
        "23": {
          "phaseLabel": "孕中期 — 围存活期肺泡表面活性物质萌发",
          "stageTitle": "II 型肺泡上皮细胞分化与早期表面活性脂蛋白合成",
          "biologicalStage": "胎儿（围存活期阈值窗口）",
          "lengthMetric": "28.9 cm (11.4 in 顶跟长)",
          "weightMetric": "500 g（1.1 磅）",
          "heartRateBpm": "120 – 155 次/分",
          "keyOrgans": [
            "II 型肺泡上皮细胞",
            "肺毛细血管床",
            "快速眼动 (REM) 睡眠",
            "胰腺朗格汉斯岛（胰岛）"
          ],
          "fetalMilestones": [
            "立方状 II 型肺泡上皮细胞在远端气道分化，开始合成早期表面活性物质板层小体。",
            "肺毛细血管紧贴气道上皮，建立原始的气-血交换屏障。",
            "快速眼动（REM）睡眠周期开始出现，对视觉皮层和感觉运动皮层的内源性神经环路构建至关重要。"
          ],
          "maternalPhysiology": "胃部受子宫向上推移，加上孕酮使食管下括约肌松弛，容易引起胃食管反流（烧心）。",
          "doctorCheckIn": "熟知早产预警信号：规律性骨盆压迫感或腹痛（每小时 >4–6 次宫缩）、持续性低位腰背酸痛，或阴道分泌物性状改变（水样/黏液样/血性）。",
          "clinicalPearl": "第 23–24 周是现代三级/四级新生儿重症监护室（NICU）的围存活期阈值；若发生早产威胁，产前应用糖皮质激素（倍他米松）可显著加速胎肺成熟。"
        },
        "24": {
          "phaseLabel": "孕中期 — 新生儿存活阈值与糖耐量筛查窗口",
          "stageTitle": "肺原始囊泡期转换、围产医学存活力里程碑与糖耐量筛查开启",
          "biologicalStage": "胎儿",
          "lengthMetric": "30.0 cm (11.8 in 顶跟长)",
          "weightMetric": "600 g（1.32 磅）",
          "heartRateBpm": "120 – 155 次/分",
          "keyOrgans": [
            "肺终末囊泡",
            "内耳前庭平衡系统",
            "胎儿胰岛 β 细胞",
            "皮肤毛细血管网"
          ],
          "fetalMilestones": [
            "肺发育从“小管期”过渡至“囊泡期”：呼吸性细支气管末端萌发出终末囊泡（原始肺泡囊）。",
            "内耳前庭平衡系统结构成熟，使胎儿在羊膜腔内具备完整的空间方位感。",
            "皮下毛细血管床充盈血液，胎儿皮肤由半透明转为粉红色。"
          ],
          "maternalPhysiology": "孕中期后段胎盘分泌的人胎盘生乳素（hPL）、皮质醇和生长激素显著升高，产生生理性母体胰岛素抵抗，以优先向胎儿输送葡萄糖。",
          "doctorCheckIn": "孕 24 周产检 + 妊娠期糖尿病筛查窗口开启（孕 24–28 周）：开具 1 小时 50 g 口服葡萄糖激发试验（GCT）及孕晚期血常规/不规则抗体复查单。",
          "clinicalPearl": "为什么在第 24–28 周筛查妊娠期糖尿病（GDM）：胎盘抗胰岛素激素（hPL）在第 24 周陡增，会在约 6–9% 的孕妇中暴露胰岛 β 细胞代偿不足。"
        },
        "25": {
          "phaseLabel": "孕中期 — 肺血管网发育与鼻孔开放",
          "stageTitle": "鼻孔栓溶解贯通、肺毛细血管分支与脊柱骨化中心",
          "biologicalStage": "胎儿",
          "lengthMetric": "34.6 cm (13.6 in 顶跟长)",
          "weightMetric": "660 g（1.45 磅）",
          "heartRateBpm": "120 – 155 次/分",
          "keyOrgans": [
            "鼻孔重新开放",
            "肺表面活性蛋白 (SP-B/SP-C)",
            "椎弓骨化",
            "利手神经回路"
          ],
          "fetalMilestones": [
            "鼻孔内的上皮塞溶解开放，鼻道贯通，胎儿开始进行经鼻羊水呼吸练习。",
            "II 型肺泡上皮细胞内的表面活性蛋白 B 和 C（SP-B、SP-C）合成增加。",
            "脊柱结构（33 个椎骨环、150 个关节、1,000 条韧带）进一步强化以支撑不断增长的体重。"
          ],
          "maternalPhysiology": "下肢静脉回流压力增高，夜间偶发小腿抽筋，或傍晚出现轻度脚踝水肿。",
          "doctorCheckIn": "请在孕 24–28 周期间完成 1 小时 50 g 口服葡萄糖激发试验（GCT）；除非产科医生特别要求，1 小时初筛无需空腹。",
          "clinicalPearl": "若 1 小时 50g 筛查血糖 ≥135–140 mg/dL 请勿惊慌：这只是初筛而非确诊，约 75–80% 进一步接受 3 小时 100g 空腹糖耐量试验（GTT）的孕妇结果完全正常。"
        },
        "26": {
          "phaseLabel": "孕中期 — 视觉觉醒与眼睑睁开",
          "stageTitle": "眼睑睁开、眨眼惊跳反射与视网膜视杆细胞发育",
          "biologicalStage": "胎儿",
          "lengthMetric": "35.6 cm (14.0 in 顶跟长)",
          "weightMetric": "760 g（1.68 磅）",
          "heartRateBpm": "120 – 155 次/分",
          "keyOrgans": [
            "视网膜光感受器（视锥与视杆细胞）",
            "视神经髓鞘化",
            "声振惊跳反射",
            "睾丸经腹股沟管下降"
          ],
          "fetalMilestones": [
            "自第 9 周闭合的上下眼睑首次重新分开并睁眼；胎儿对强光透照或大声响会产生眨眼惊跳反应（声振惊跳反射）。",
            "眼球后部的视网膜视杆细胞与视锥细胞进一步分化。",
            "男性胎儿的引带开始引导睾丸进入腹股沟管向阴囊下降。"
          ],
          "maternalPhysiology": "随着膈肌上抬约 4 cm，母体胸廓周径扩大 5–7 cm，潮气量增加 30–40%，有时会感到轻微的生理性气短。",
          "doctorCheckIn": "与产科医生一起查看孕晚期血常规（血红蛋白/血细胞比容）及血清铁蛋白结果，筛查缺铁性贫血（孕中期 Hb <10.5 g/dL 或孕晚期 <11.0 g/dL）。",
          "clinicalPearl": "口服补铁技巧：将铁剂与维生素 C（如橙汁）同服，或采取隔日服用法，可显著提高十二指肠铁吸收率并减少便秘副作用。"
        },
        "27": {
          "phaseLabel": "孕中期 — 孕中期最后一周",
          "stageTitle": "丘脑-皮层痛觉通路连接、胎儿打嗝与百白破（Tdap）疫苗窗口开启",
          "biologicalStage": "胎儿",
          "lengthMetric": "36.6 cm (14.4 in 顶跟长)",
          "weightMetric": "875 g（1.93 磅）",
          "heartRateBpm": "120 – 155 次/分",
          "keyOrgans": [
            "大脑皮层脑回初现",
            "膈神经与膈肌呼吸运动",
            "胎儿脾脏与胸腺",
            "皮下白色脂肪沉积"
          ],
          "fetalMilestones": [
            "规律的胎儿膈肌痉挛（胎儿打嗝）变得常见，母体可感觉到每隔几秒钟一次、轻柔而有节奏的跳动感。",
            "原本平滑的大脑半球表面开始形成初级脑沟与脑回，大幅扩展大脑皮层表面积。",
            "T 淋巴细胞在胎儿胸腺内发育成熟。"
          ],
          "maternalPhysiology": "随着孕中期进入尾声，子宫底位于肚脐上方约 7 cm；手腕屈肌支持带的水钠潴留有时会引起轻微的腕管综合征麻木感。",
          "doctorCheckIn": "百白破疫苗（Tdap）接种窗口开启（第 27–36 周）：CDC 与 ACOG 建议每次怀孕均在第 27–36 周（最佳为 27–30 周）接种一剂 Tdap，以便将高浓度百日咳 IgG 抗体传递给新生儿。",
          "clinicalPearl": "胎儿打嗝是膈神经与脑干呼吸中枢发育成熟的完全正常表现——与踢腿不同，它感觉像持续 5–15 分钟的规律轻叩。"
        },
        "28": {
          "phaseLabel": "孕晚期 — 步入孕晚期并转为每两周产检",
          "stageTitle": "正式进入第 3 孕期（孕晚期）、RhoGAM 免疫预防与每日胎动计数（第 28 周）",
          "biologicalStage": "孕晚期胎儿",
          "lengthMetric": "37.6 cm (14.8 in 顶跟长)",
          "weightMetric": "1,005 g（2.22 磅 — 1 kg 里程碑！）",
          "heartRateBpm": "115 – 155 次/分",
          "keyOrgans": [
            "瞳孔对光反射",
            "肺表面活性物质卵磷脂合成",
            "小脑叶片",
            "红细胞 Rh(D) 抗原表达"
          ],
          "fetalMilestones": [
            "胎儿体重突破 1 公斤（2.2 磅）里程碑；皮下白色脂肪组织约占体重的 2–3%。",
            "瞳孔可对光线产生收缩与散大反射；睡眠周期呈现清晰的快速眼动（REM）与非快速眼动脑电波模式。",
            "支气管肺泡表面活性物质加速合成，卵磷脂/鞘磷脂（L/S）比值稳步上升。"
          ],
          "maternalPhysiology": "欢迎进入孕晚期（第 3 孕期）。子宫血流量现已达到每分钟约 500–700 mL（其中约 80% 灌注胎盘）。",
          "doctorCheckIn": "孕 28 周产检（转为每 2 周一次产检）：复核 1 小时 GCT 糖筛结果、接种 Tdap 百白破疫苗、Rh 阴性孕妇肌注抗 D 免疫球蛋白（RhoGAM 300 mcg），并开始每日数胎动。",
          "clinicalPearl": "ACOG 胎动计数规范（第 28 周起）：每天固定时间（建议餐后）侧卧，记录感受到 10 次独立胎动（踢、滚、顶，不含打嗝）所需时间。正常应在 2 小时内达标（通常 <30 分钟）；若 2 小时内不足 10 次，请立即前往医院行胎心监护（NST）。"
        },
        "29": {
          "phaseLabel": "孕晚期 — 骨骼钙化与矿物质沉积加速",
          "stageTitle": "骨骼钙质快速沉积与下丘脑体温调节中枢成熟",
          "biologicalStage": "胎儿",
          "lengthMetric": "38.6 cm (15.2 in 顶跟长)",
          "weightMetric": "1,150 g（2.54 磅）",
          "heartRateBpm": "115 – 155 次/分",
          "keyOrgans": [
            "成骨细胞钙盐沉积",
            "下丘脑视前核（体温调节中枢）",
            "肾上腺 DHEA-S 合成",
            "肺泡间隔化"
          ],
          "fetalMilestones": [
            "胎盘每天主动从母体血液循环向胎儿骨骼泵入约 250–300 mg 元素钙。",
            "下丘脑中枢体温调节环路趋于成熟。",
            "胎儿肾上腺增大并分泌硫酸脱氢表雄酮（DHEA-S），由胎盘转化为雌三醇。"
          ],
          "maternalPhysiology": "胎儿体重增长与腰椎生理性前凸使重心前移；穿着有支撑力的鞋子并练习骨盆倾斜伸展可缓解腰骶部酸痛。",
          "doctorCheckIn": "本周无常规医院产检（双周产检节奏：下次产检在第 30 周）。请继续每日监测胎动与血压。",
          "clinicalPearl": "胎儿全身约 80% 的骨钙与铁储备是在孕晚期积累的——请确保每日摄入 1,000 mg 膳食钙及充足的铁。"
        },
        "30": {
          "phaseLabel": "孕晚期 — 大脑皮层沟回折叠与骨髓造血主导",
          "stageTitle": "大脑皮层脑回加深、骨髓造血主导与羊水量峰值",
          "biologicalStage": "胎儿",
          "lengthMetric": "39.9 cm (15.7 in 顶跟长)",
          "weightMetric": "1,320 g（2.91 磅）",
          "heartRateBpm": "115 – 155 次/分",
          "keyOrgans": [
            "大脑次级与三级脑沟折叠",
            "骨髓主导全身造血",
            "膈肌节律性呼吸样运动",
            "胎毛开始脱落"
          ],
          "fetalMilestones": [
            "大脑皮层经历快速脑回化，形成深层的次级脑沟，支撑高级认知功能发育。",
            "骨髓现已成为主导造血器官；胎儿红细胞在体内的寿命约为 60–90 天。",
            "随着皮下脂肪增厚，早期胎毛开始脱落进入羊水中。"
          ],
          "maternalPhysiology": "羊水量接近整个孕期的生理峰值（第 30–34 周约为 800–1,000 mL），随后在接近足月时缓慢回落。",
          "doctorCheckIn": "第 30 周双周产检：测量血压、尿蛋白/尿糖筛查、测量宫高（预期 28–32 cm）、多普勒听胎心，并宣教早产预警指征。",
          "clinicalPearl": "若宫高测量值与实际孕周相差 >3 cm（宫高与孕周不符），产科医生会安排专项孕晚期胎儿生长及羊水量超声评估。"
        },
        "31": {
          "phaseLabel": "孕晚期 — 突触快速生成与皮下脂质激增",
          "stageTitle": "数万亿突触连接形成与大脑 DHA 快速蓄积",
          "biologicalStage": "胎儿",
          "lengthMetric": "41.1 cm (16.2 in 顶跟长)",
          "weightMetric": "1,500 g（3.31 磅）",
          "heartRateBpm": "115 – 155 次/分",
          "keyOrgans": [
            "视网膜-视觉皮层回路",
            "富含 DHA 的神经磷脂膜",
            "肾小球滤过功能成熟",
            "吸吮-吞咽协调反射"
          ],
          "fetalMilestones": [
            "胎儿大脑每天将约 50–70 mg 的 Omega-3 DHA 整合进神经元细胞膜与视网膜光感受器中。",
            "五种特殊感觉（视觉、听觉、味觉、经羊水气味分子介导的嗅觉以及触觉）已全部具备功能活性。",
            "从现在起到足月，胎儿每周体重约增加 150–200 克（0.35–0.5 磅）。"
          ],
          "maternalPhysiology": "乳腺腺泡开始合成富含分泌型免疫球蛋白 A（sIgA）的初乳，有时乳头会偶发渗出少量淡黄色初乳滴。",
          "doctorCheckIn": "若合并高危妊娠因素（如高龄 ≥35–40 岁、药物控制的妊娠期糖尿病、慢性高血压或双胎），通常自孕 32 周起每周进行 1–2 次无应激试验（NST）或生物物理评分（BPP）。",
          "clinicalPearl": "宫内味觉记忆：母体饮食中的天然风味分子（如香草、胡萝卜、大蒜等）可进入羊水被胎儿品尝，有助于出生后辅食引入期的口味适应。"
        },
        "32": {
          "phaseLabel": "孕晚期 — 头位固定与呼吸道合胞病毒 (RSV) 免疫保护",
          "stageTitle": "胎头转位（头先露）、手指甲长齐与母体 RSV 疫苗窗口",
          "biologicalStage": "胎儿（头位转换阶段）",
          "lengthMetric": "42.4 cm (16.7 in 顶跟长)",
          "weightMetric": "1,700 g（3.75 磅）",
          "heartRateBpm": "110 – 155 次/分",
          "keyOrgans": [
            "头先露（头位）",
            "肺表面活性物质磷脂酰甘油 (PG)",
            "指甲发育达指尖",
            "母胎 IgG 抗体转运高峰"
          ],
          "fetalMilestones": [
            "约 85–90% 的胎儿会自然转为头朝下的头先露（头位），以适应梨形的子宫腔。",
            "手指甲已长到指尖；随着皮下白色脂肪达到体重的 7–8%，皮肤变得光滑饱满。",
            "活跃睡眠期约 30–40% 的时间可见胎儿呼吸样运动，这是超声生物物理评分（BPP）的重要指标。"
          ],
          "maternalPhysiology": "母体血浆容量达到孕期最大扩张峰值（比孕前增加 45–50%），心血管系统处于最高负荷状态。",
          "doctorCheckIn": "孕 32 周双周产检 + 母体 RSV 疫苗接种窗口开启（孕 32–36 周）：CDC 与 ACOG 建议在 RSV 流行季（9 月至次年 1 月）于 32w0d 至 36w6d 之间接种 1 剂母体 RSV 疫苗（Abrysvo），以保护新生儿免受重症 RSV 细支气管炎侵害。",
          "clinicalPearl": "为什么 32 周后胎动感觉变了：随着宫内空间变紧凑，大幅度踢腿转为有力的翻身、伸展和手肘/脚跟顶推——但每日胎动的总次数绝不应减少！"
        },
        "33": {
          "phaseLabel": "孕晚期 — 母胎 IgG 抗体转运与颅骨可塑性",
          "stageTitle": "颅骨囟门与骨缝、跨胎盘 IgG 抗体转运高峰与吸吮协调",
          "biologicalStage": "胎儿",
          "lengthMetric": "43.7 cm (17.2 in 顶跟长)",
          "weightMetric": "1,920 g（4.23 磅）",
          "heartRateBpm": "110 – 155 次/分",
          "keyOrgans": [
            "前囟与后囟",
            "吸吮-吞咽-呼吸三联协调",
            "肾单位发育即将完成",
            "胎盘主动转运 IgG 抗体"
          ],
          "fetalMilestones": [
            "虽然四肢长骨已良好钙化，但颅骨板之间仍保留纤维缝与囟门（“软脑门”），以便分娩时胎头安全塑形通过产道。",
            "经胎盘转运的胎儿体内 IgG 抗体浓度接近并即将超过母体血清水平。",
            "脑干神经核团开始协调“吸吮-吞咽-呼吸”三联节律动作。"
          ],
          "maternalPhysiology": "子宫底接近胸骨剑突下方；采取少食多餐及垫高床头可有效缓解胃食管反流与餐后饱胀感。",
          "doctorCheckIn": "选定新生儿儿科保健医院/医生，确认新生儿医保参保流程，并提前安装调试好反向安装的婴儿安全座椅。",
          "clinicalPearl": "胎心加速（胎动时胎心率较基线上升 ≥15 BPM 且持续 ≥15 秒）是胎儿中枢与自主神经系统氧合良好、反应灵敏的标志。"
        },
        "34": {
          "phaseLabel": "孕晚期 — 晚期早产阈值与肾单位发育完成",
          "stageTitle": "终生肾单位形成完成与肺表面活性物质激增",
          "biologicalStage": "晚期早产阶段胎儿",
          "lengthMetric": "45.0 cm (17.7 in 顶跟长)",
          "weightMetric": "2,150 g（4.74 磅）",
          "heartRateBpm": "110 – 155 次/分",
          "keyOrgans": [
            "每侧肾脏 100 万个肾单位成型",
            "磷脂酰胆碱（卵磷脂）表面活性物质",
            "胎脂保护层增厚",
            "睾丸下降入阴囊"
          ],
          "fetalMilestones": [
            "人类肾单位发生（新肾单位的形成）在第 34–36 周之间永久完成，每侧肾脏拥有约 100 万个肾单位。",
            "肺泡表面活性物质分泌激增；满 34 周及以后出生的新生儿存活率 >98%，远期呼吸系统并发症极低。",
            "胎脂层浓厚如乳霜，手指甲和脚趾甲均已发育良好。"
          ],
          "maternalPhysiology": "傍晚出现轻度脚踝生理性水肿很常见；但若突发面部/双手水肿并伴随头痛或视物闪光，需立即测量血压排查子痫前期。",
          "doctorCheckIn": "第 34 周双周产检：血压与子痫前期症状筛查、宫高测量、胎心听诊、四步触诊法（Leopold 手法）评估胎方位，并讨论分娩镇痛与分娩计划。",
          "clinicalPearl": "第 34 周是产科的重要临床节点：满 34 周后若自然发动早产，通常不再强行使用宫缩抑制剂保胎，因为胎肺及全身器官成熟度已相当完善。"
        },
        "35": {
          "phaseLabel": "孕晚期 — 肝脏代谢成熟与铁/糖原储备",
          "stageTitle": "肝脏糖原储备、铁储备与皮下脂肪快速增长",
          "biologicalStage": "胎儿",
          "lengthMetric": "46.2 cm (18.2 in 顶跟长)",
          "weightMetric": "2,385 g（5.25 磅）",
          "heartRateBpm": "110 – 150 次/分",
          "keyOrgans": [
            "肝脏糖原与铁储备积累",
            "胆红素结合酶 (UGT1A1) 诱导",
            "皮下脂肪（占体重 10%）",
            "协调吸吮反射"
          ],
          "fetalMilestones": [
            "胎儿肝脏快速储备糖原（用于在断脐后至母乳下奶前的过渡期维持血糖稳定）与铁蛋白。",
            "双肾与肝脏结构已完全成熟，胆红素葡萄糖醛酸转移酶（UGT1A1）等代谢酶系加速成熟。",
            "胎儿每天约蓄积 30 克（1 盎司）皮下脂肪。"
          ],
          "maternalPhysiology": "随着子宫下段拉长变薄，骨盆压迫感增强；胎头向骨盆入口下降也会使尿频再次明显。",
          "doctorCheckIn": "下周（第 36 周）起将转为每周一次（q1w）产检，并将进行 B 族链球菌（GBS）拭子筛查与正式胎位确认。",
          "clinicalPearl": "建议在第 35 周备好待产包（身份证件、医保卡、产检本、哺乳内衣、洗漱用品、手机充电器、宝宝出院衣物与包被），并确认医院产房急诊夜间入院路线。"
        },
        "36": {
          "phaseLabel": "孕晚期 — 开始每周产检与 B 族链球菌 (GBS) 筛查",
          "stageTitle": "肺泡期成熟、B 族链球菌（GBS）筛查与胎头入盆",
          "biologicalStage": "晚期早产胎儿（转为每周产检）",
          "lengthMetric": "47.4 cm (18.7 in 顶跟长)",
          "weightMetric": "2,620 g（5.78 磅）",
          "heartRateBpm": "110 – 150 次/分",
          "keyOrgans": [
            "成熟真性肺泡",
            "胎脂脱入羊水形成乳白色悬浮颗粒",
            "胎头入盆（衔接）",
            "结肠贮满胎粪"
          ],
          "fetalMilestones": [
            "肺发育正式进入最终的“肺泡期”（从第 36 周持续至幼儿期），形成真正薄壁的成熟肺泡，为出生后的气体交换做好准备。",
            "脱落的胎脂与胎毛混入羊水被胎儿吞咽，在肠道内形成墨绿色的第一口胎便（胎粪）。",
            "初产妇在此阶段常出现胎头下降入盆（“轻松感”）。"
          ],
          "maternalPhysiology": "胎头入盆后，上腹部和肋弓下的压迫感明显减轻（呼吸和进食变轻松），但盆底与耻骨联合的压迫感会相应增加。",
          "doctorCheckIn": "第 36 周产检（正式开启每周一次产检！）：进行 B 族链球菌（GBS）阴道-直肠拭子筛查（36周0天至 37周6天之间采集），并通过触诊或床旁超声确认胎先露（头位 vs 臀位）。",
          "clinicalPearl": "为何在孕 36–37 周筛查 GBS：约 25% 的健康孕妇无症状携带 B 族链球菌（GBS）。若结果阳性，分娩时静脉滴注青霉素或氨苄西林可将新生儿早发型 GBS 败血症风险降低 >80%。此外，若孕 36 周仍为臀位，可讨论在孕 37 周行外倒转术（ECV）。"
        },
        "37": {
          "phaseLabel": "孕晚期 — 早期足月 (37周0天–38周6天)",
          "stageTitle": "早期足月里程碑、外倒转术（ECV）窗口与临产分诊法则（5-1-1）",
          "biologicalStage": "早期足月胎儿",
          "lengthMetric": "48.6 cm (19.1 in 顶跟长)",
          "weightMetric": "2,860 g（6.30 磅）",
          "heartRateBpm": "110 – 150 次/分",
          "keyOrgans": [
            "成熟肺表面活性物质卵磷脂/鞘磷脂比值 ≥2:1",
            "皮质脊髓束髓鞘化",
            "动脉导管保持开放",
            "颊脂垫（吸吮脂肪垫）"
          ],
          "fetalMilestones": [
            "满 37周0天，妊娠正式进入“早期足月”（ACOG 定义 37w0d–38w6d 为早期足月 Early Term，39w0d–40w6d 为完全足月 Full Term）。",
            "面颊部的颊脂垫饱满圆润，为出生后吸吮母乳或奶瓶提供稳定的负压支撑。",
            "胎儿肾上腺皮质醇激增，上调肺泡上皮钠通道（ENaC），准备在出生第一声啼哭时迅速清除肺内液体。"
          ],
          "maternalPhysiology": "宫颈成熟悄然启动：在前列腺素与基质金属蛋白酶作用下，宫颈胶原纤维重塑，宫颈质地由鼻尖般坚韧逐渐变软如唇，并向产道前方移动。",
          "doctorCheckIn": "孕 37 周每周产检：复核 GBS 培养结果、血压与胎心音，并温习“5-1-1 / 4-1-1”临产入院法则、破水识别及何时前往产房。",
          "clinicalPearl": "为什么 ACOG 建议无医学指征不在 39周0天前择期分娩：在第 37 至 39 周之间，胎儿大脑重量还会增长约 30%，且呼吸与体温调节能力在 39 周达到最佳成熟度。"
        },
        "38": {
          "phaseLabel": "孕晚期 — 早期足月（第38周）",
          "stageTitle": "表面活性物质磷脂酰甘油（PG）峰值、声带与新生儿反射就绪",
          "biologicalStage": "早期足月胎儿",
          "lengthMetric": "49.8 cm (19.6 in 顶跟长)",
          "weightMetric": "3,080 g（6.79 磅）",
          "heartRateBpm": "110 – 150 次/分",
          "keyOrgans": [
            "肺磷脂酰甘油 (PG) 阳性（肺成熟标志）",
            "胎儿心脏分流通道（卵圆孔）",
            "泪腺与唾液腺成熟",
            "体脂率达 15%"
          ],
          "fetalMilestones": [
            "羊水中出现磷脂酰甘油（PG）标志着胎肺生化成熟度已完全达标。",
            "体脂现已占胎儿总体重的约 15%，使其在出生后能够独立维持体温恒定。",
            "声带、神经反射弧（拥抱反射、觅食反射、吸吮反射、握持反射）及各感官器官均已做好宫外生活准备。"
          ],
          "maternalPhysiology": "排出宫颈黏液栓（“见红”——粉红或褐色果冻状分泌物）以及骨盆压迫感加重或不规律前驱宫缩，可能在正式临产前数天至数周出现。",
          "doctorCheckIn": "第 38 周每周产检：测量血压、尿检、胎心率、宫高，并沟通产后康复、母乳喂养支持及产后避孕方案。",
          "clinicalPearl": "真性临产宫缩 vs 假性宫缩（Braxton Hicks）：假性宫缩不规律、局限于下腹前壁，饮水或变换体位可缓解；真性临产宫缩无论如何休息都会越来越长、越来越强、间隔越来越短。"
        },
        "39": {
          "phaseLabel": "孕晚期 — 完全足月 (39周0天–40周6天)",
          "stageTitle": "完全足月里程碑、Bishop 宫颈评分与 ARRIVE 引产研究讨论",
          "biologicalStage": "完全足月胎儿",
          "lengthMetric": "50.7 cm (20.0 in 顶跟长)",
          "weightMetric": "3,290 g（7.25 磅）",
          "heartRateBpm": "110 – 150 次/分",
          "keyOrgans": [
            "足月大脑皮层",
            "表皮角质更新完成",
            "胎盘催产素与前列腺素分娩信号",
            "成熟肝脏代谢酶系"
          ],
          "fetalMilestones": [
            "恭喜——满 39周0天，您的宝宝按照 ACOG 与 SMFM 标准正式达到“完全足月（Full Term）”！",
            "胎儿肺部分泌的表面活性蛋白进入羊水，激活羊膜巨噬细胞及母体子宫催产素受体——这是触发自然临产的核心生物信号之一。",
            "全新的表皮角质层替代了脱落的表层细胞，胎脂主要保留在皮肤褶皱处。"
          ],
          "maternalPhysiology": "宫颈管消退（从 0% 变薄至 100%）与宫口扩张（从 0 cm 开全至 10 cm）在临产前后及第一产程中逐步推进。",
          "doctorCheckIn": "第 39 周每周产检：可选宫颈内检（Bishop 宫颈成熟度评分：宫口开大、消退、先露位置、质地、宫颈口位置）、可选人工剥膜（减少过期妊娠），或基于 ARRIVE 研究讨论 39 周择期引产方案。",
          "clinicalPearl": "ARRIVE 临床试验（NEJM 2018）：在低风险初产妇中，孕 39w0d–39w4d 择期引产相比期待观察具有略低的剖宫产率（18.6% 对比 22.2%）及更低的妊娠期高血压风险，因此等待自然临产与孕 39 周引产均为安全合理的选择。"
        },
        "40": {
          "phaseLabel": "孕晚期 — 预产期里程碑 (EDD / 第40周)",
          "stageTitle": "预产期里程碑（40w0d）与出生心肺循环转换准备就绪",
          "biologicalStage": "完全足月胎儿",
          "lengthMetric": "51.2 cm (20.2 in 顶跟长)",
          "weightMetric": "3,460 g（7.63 磅）",
          "heartRateBpm": "110 – 150 次/分",
          "keyOrgans": [
            "卵圆孔与动脉导管准备出生后功能性闭合",
            "全身约 300 个骨化中心",
            "母源 IgG 被动免疫保护",
            "颅骨缝（适应产道塑形）"
          ],
          "fetalMilestones": [
            "出生时的第一声啼哭使肺泡瞬间扩张，肺血管阻力骤降 80%，从而在数小时至数天内功能性关闭卵圆孔与动脉导管。",
            "足月新生儿拥有约 300 块骨与软骨中心（日后逐渐融合为成人的 206 块骨），出生第 1 天的胃容量仅樱桃大小（约 5–7 mL，恰好匹配初乳分泌量）。",
            "出生时的视觉焦点精准定位于 20–30 cm（8–12 英寸）——恰好是怀抱或哺乳时婴儿到父母脸部的距离。"
          ],
          "maternalPhysiology": "仅有约 4–5% 的宝宝会在预产期（EDD）当天准时出生；若等待自然临产，约 50% 的初产妇会在 40周0天至 41周3天之间分娩。",
          "doctorCheckIn": "第 40 周预产期产检：测量血压、听胎心、按需评估宫颈成熟度或人工剥膜，并预约第 41 周的足月晚期胎心监护（NST + 羊水指数 AFI 或 BPP）及计划引产日期。",
          "clinicalPearl": "牢记破水（胎膜破裂）的 4 项观察要点（COAT）：一旦破水，请记录颜色（Color：清亮还是黄绿胎粪染）、气味（Odor）、流量（Amount）及时间（Time），即使尚未开始宫缩也应立即联系产房。"
        },
        "41": {
          "phaseLabel": "足月晚期 — 严密胎心与羊水监护 (41周0天–41周6天)",
          "stageTitle": "足月晚期产前监护（NST / BPP）与引产计划安排",
          "biologicalStage": "足月晚期胎儿",
          "lengthMetric": "51.7 cm (20.4 in 顶跟长)",
          "weightMetric": "3,600 g（7.94 磅）",
          "heartRateBpm": "110 – 150 次/分",
          "keyOrgans": [
            "胎盘功能储备监护",
            "羊水指数 (AFI) 与最大羊水暗区监测",
            "皮肤干燥脱屑（胎脂减少）",
            "指甲长出指尖"
          ],
          "fetalMilestones": [
            "在妊娠 41周0天至 41周6天之间，ACOG 将其定义为“足月晚期（Late-Term）”。",
            "大部分胎脂现已被重吸收，因此足月晚期出生的新生儿手掌与足底皮肤常略显干燥或脱皮，指甲也较长。",
            "胎儿的警觉度与神经系统发育极其成熟。"
          ],
          "maternalPhysiology": "随着胎盘血管自然老化与钙化，足月晚期的羊水量会生理性逐渐减少。",
          "doctorCheckIn": "孕 41 周过期前产检及每周 2 次胎心监护：进行无应激试验（NST）加羊水指数（AFI）/ 最大羊水暗区（MVP ≥2 cm）或完整生物物理评分（BPP，满分 8 或 10 分），并安排在 42w0d 前住院引产。",
          "clinicalPearl": "ACOG 晚期与过期妊娠管理指南建议自 41w0d 起启动产前胎儿监护，并在 41w0d 至 41w6d 之间分娩，以避免过期妊娠胎盘功能不全。"
        },
        "42": {
          "phaseLabel": "足月向过期妊娠过渡分娩窗口 (42周0天)",
          "stageTitle": "积极住院引产、迎接宝宝诞生与产后“黄金一小时”",
          "biologicalStage": "足月分娩与诞生里程碑",
          "lengthMetric": "52.0 cm (20.5 in 顶跟长)",
          "weightMetric": "3,685 g（8.12 磅）",
          "heartRateBpm": "110 – 150 次/分",
          "keyOrgans": [
            "延迟断脐 (30–60秒)",
            "出生后黄金一小时肌肤接触",
            "新生儿阿氏评分 (APGAR 1分钟与5分钟)",
            "新生儿维生素 K 注射与红霉素眼膏预防"
          ],
          "fetalMilestones": [
            "ACOG 建议最迟不超过 42周0天分娩（若尚未自然临产，通过球囊/前列腺素促宫颈成熟及缩宫素静脉滴注引产）。",
            "宝宝出生时，ACOG 推荐延迟脐带结扎 30–60 秒，可向新生儿额外输送约 80 mL 胎盘血，显著提升婴儿前 6 个月的铁储备。",
            "出生后立即进行母婴肌肤接触（“黄金一小时”）可稳定新生儿体温、血糖与心率，促进第一口母乳吸吮并激发母体催产素分泌。"
          ],
          "maternalPhysiology": "第三产程在胎儿娩出后 5–30 分钟内娩出胎盘；子宫强力收缩（子宫复旧）压迫螺旋动脉以预防产后出血。",
          "doctorCheckIn": "分娩与产后即刻护理：新生儿 1 分钟与 5 分钟 Apgar 评分、新生儿维生素 K 肌注（预防维生素 K 缺乏性出血）、乙肝疫苗、听力与遗传代谢病筛查，并预约产后 2–3 周血压/情绪随访及产后 6 周全面复查。",
          "clinicalPearl": "产后危险信号（“POST-BIRTH”警示）：产后 6 周内，若出现胸痛/呼吸困难、抽搐、自伤念头、出血连续 2 小时每小时浸透 >1 片卫生巾、切口红肿流脓、小腿疼痛红肿、体温 ≥38.0 °C（100.4 °F）或剧烈头痛伴血压 ≥140/90，请立即急诊就医。"
        }
      },
      "appointments": {
        "appt-w6-8": {
          "cadenceLabel": "初次确认",
          "title": "胚胎存活与孕周核对超声产检",
          "summary": "确认宫内妊娠位置、胎芽、原始心管搏动、单胎或多胎妊娠，并通过头臀长 (CRL) 精确核对预产期。",
          "procedures": [
            "经阴道或经腹早孕定周超声（CRL 核对预产期误差仅 ±3–5 天）",
            "确认卵黄囊、孕囊及胎心率（100–165 BPM）",
            "全面评估既往内科、外科、产科及家族遗传病史",
            "早孕期恶心呕吐管理及产前复合维生素核查（叶酸 ≥400–800 mcg）"
          ],
          "questionsToAsk": [
            "超声测量的头臀长 (CRL) 与按末次月经推算的预产期一致吗？是否需要修正官方预产期？",
            "本诊所与哪家医院分娩中心合作？产科医生的值班轮转机制是怎样的？",
            "如果夜间或周末出现阴道点滴出血或剧烈不适，非工作时间的急诊联系电话是多少？"
          ],
          "highRiskAddition": "高龄产妇 (35+) / 既往流产史 / 试管婴儿 (IVF)：建议在 5.5–6 周提前行超声排外宫外孕，并评估黄体酮支持方案。"
        },
        "appt-w8-10": {
          "cadenceLabel": "每 4 周一次 (q4w)",
          "title": "首次全面产科建档与初始产前化验组合",
          "summary": "全面体格检查以及母体血液与尿液基线实验室筛查。",
          "procedures": [
            "全血细胞计数（CBC：血红蛋白、血细胞比容、血小板）",
            "ABO 血型、Rh(D) 血型及不规则抗体筛查（间接 Coombs 试验）",
            "免疫滴度与传染病筛查：风疹 IgG、水痘 IgG、乙肝表面抗原 (HBsAg)、丙肝、HIV、梅毒 (RPR)",
            "尿培养及药敏试验（筛查无症状菌尿以预防急性肾盂肾炎）",
            "促甲状腺激素 TSH（有甲功病史者）、糖化血红蛋白 HbA1c（糖尿病高危/BMI ≥25）及扩展性单基因遗传病携带者筛查（囊性纤维化、SMA、地中海贫血）"
          ],
          "questionsToAsk": [
            "我是 Rh 阳性还是 Rh 阴性血型？风疹和水痘抗体滴度是否具有足够保护力？",
            "我是否需要提前筛查妊娠期糖尿病，或在第 12 周开始服用小剂量阿司匹林预防子痫前期？",
            "无创产前基因检测 (NIPT) 和孕早期颈项透明层 (NT) 超声该如何预约衔接？"
          ],
          "highRiskAddition": "妊娠期糖尿病高危 / 既往 GDM / 多囊卵巢综合征（PCOS）/ BMI ≥25：首次产检时即安排早期 1 小时 GCT 糖筛或糖化血红蛋白（HbA1c）检测。"
        },
        "appt-w10-13": {
          "cadenceLabel": "每 4 周一次 (q4w)",
          "title": "无创产前基因检测 (NIPT) 与颈项透明层 (NT) 遗传学筛查窗口",
          "summary": "染色体非整倍体筛查、早期结构评估，以及在第 12 周启动子痫前期预防方案。",
          "procedures": [
            "外周血游离胎盘 DNA (NIPT) 采血（≥10周0天即可）：筛查 21、18、13 三体及性染色体异常",
            "颈项透明层 (NT) 超声（11周0天–13周6天）：测量胎儿颈后透明层厚度（<3.0 mm 为正常）并观察鼻骨",
            "多普勒胎心听诊（140–165 BPM）及母体血压、尿常规检查",
            "若符合 ACOG 子痫前期高危/中危标准，自第 12 周起每日服用小剂量阿司匹林 (81 mg)"
          ],
          "questionsToAsk": [
            "根据我的临床情况，是否需要从第 12 周开始每天服用 81 mg 阿司匹林预防子痫前期？",
            "NIPT 结果通常几天出来（一般 7–10 个自然日），医院会如何通知结果？",
            "进入孕中期后，运动或出行方面有哪些注意事项？"
          ],
          "highRiskAddition": "高龄 (35+) / 双胎：深入遗传咨询；如需确诊可于 10–13 周行绒毛膜穿刺 (CVS)；双胎妊娠须在 14 周前明确绒毛膜性（双绒 vs 单绒）。"
        },
        "appt-w16": {
          "cadenceLabel": "每 4 周一次 (q4w)",
          "title": "孕 16 周孕中期产检与母体血清甲胎蛋白 (MSAFP) / 四联筛查",
          "summary": "常规母胎健康检查及开放性神经管缺陷血清学标志物筛查。",
          "procedures": [
            "测量血压、母体体重增长趋势及尿试纸检测（尿蛋白/尿糖/白细胞）",
            "使用便携式多普勒核查胎心率",
            "抽取母体血清甲胎蛋白 (MSAFP, 15–20周) 筛查开放性神经管缺陷（脊柱裂/无脑儿），或对未做 NIPT 者行唐氏四联筛查",
            "开具并预约孕 20 周 II 级系统排畸三维/二维大排畸超声检查单"
          ],
          "questionsToAsk": [
            "即使我的 NIPT 结果为低风险，今天是否仍需单独抽血检测甲胎蛋白 (MSAFP) 以排查开放性神经管缺陷？",
            "结合我的胎盘位置，我大概什么时候能明显感受到规律的胎动（初觉胎动）？"
          ],
          "highRiskAddition": "既往自发性早产史：自孕 16 周至 24 周每 2 周行经阴道宫颈长度超声监测。"
        },
        "appt-w18-22": {
          "cadenceLabel": "每 4 周一次 (q4w)",
          "title": "II 级系统胎儿大排畸超声与孕 20 周产检",
          "summary": "从头到脚的胎儿器官结构全面排查、胎盘位置定位、羊水量评估及宫颈长度测量。",
          "procedures": [
            "II 级系统排畸超声（45–60 分钟）：详细评估脑室、小脑、脉络丛、面部侧面与双唇、4 腔心及左右室流出道、膈肌、胃泡、双肾、脐带插入口、3 血管脐带、脊柱及全部 4 肢",
            "胎盘位置评估（排查前置胎盘或血管前置）",
            "宫颈管长度测量（18–24 周正常值 ≥25 mm）",
            "测量宫高（第 20 周平肚脐）、血压及尿常规检查"
          ],
          "questionsToAsk": [
            "今天胎儿心脏流出道和脊柱切面都看清楚了吗？是否需要复查补拍？",
            "我的胎盘位于前壁、后壁还是宫底？距离宫颈内口是否大于 2 厘米？",
            "我今天的宫颈长度测量值是多少毫米？"
          ],
          "highRiskAddition": "试管婴儿 (IVF) / 孕前糖尿病 / 先天性心脏病高危：于孕 20–22 周由小儿心内科或母胎医学专家加做专项胎儿超声心动图。"
        },
        "appt-w24-28": {
          "cadenceLabel": "第 28 周起转为每 2 周一次",
          "title": "妊娠期糖尿病 (糖耐量) 筛查、血常规、抗 D 免疫球蛋白与百白破 (Tdap) 疫苗",
          "summary": "衔接第 2 与第 3 孕期（孕中晚期）的代谢、血液学与免疫学重要里程碑产检。",
          "procedures": [
            "妊娠期糖尿病 1 小时 50 g 口服葡萄糖激发试验（GCT，孕 24–28 周；若 ≥135–140 mg/dL，则需进一步行 3 小时 100 g 口服葡萄糖耐量试验 OGTT）",
            "复查孕晚期血常规 CBC（排查缺铁性贫血与妊娠期血小板减少症）",
            "若母体为 Rh 阴性血型，于第 28 周复查不规则抗体并肌注抗 D 免疫球蛋白 (RhoGAM 300 mcg)",
            "在第 27–36 周（最佳 27–30 周）接种成人百白破疫苗 (Tdap)，通过胎盘为新生儿提供百日咳被动免疫保护",
            "按 ACOG 指南于孕晚期复查梅毒与 HIV 筛查"
          ],
          "questionsToAsk": [
            "我的 1 小时血糖筛查结果以及孕晚期血红蛋白/铁蛋白数值是多少？需要补充口服铁剂吗？",
            "我今天可以接种 Tdap 百白破疫苗吗？伴侣和照护新生的长辈应该在什么时候完成接种（至少在接触宝宝前 2 周）？",
            "从第 28 周开始，我每天应该如何正确数胎动并做记录？"
          ],
          "highRiskAddition": "单绒毛膜双胎：每 2 周行超声排查双胎输血综合征 (TTTS)；双绒毛膜双胎：每 4 周行胎儿生长超声。"
        },
        "appt-w30": {
          "cadenceLabel": "每 2 周一次 (q2w)",
          "title": "孕 30 周双周产检与胎动计数核查",
          "summary": "进入孕晚期每两周一次产检的首访，重点关注胎儿生长曲线与子痫前期监测。",
          "procedures": [
            "测量血压及尿试纸检测（筛查妊娠期高血压/蛋白尿）",
            "测量耻骨联合-宫底高度（宫高预期 28–32 cm）及多普勒胎心率",
            "核查每日胎动计数规律（2 小时内 ≥10 次有效胎动）",
            "复习早产预警信号并办理分娩医院预登记手续"
          ],
          "questionsToAsk": [
            "我的宫高增长曲线与当前的孕周吻合吗？",
            "如何办理产房住院预登记？夜间或急诊入院时产科急诊通道在哪里？"
          ],
          "highRiskAddition": "高龄 ≥35 / 肥胖 / 妊娠期糖尿病 / 高血压：安排孕晚期生长超声，并自第 32 周起开始每周胎心监护 (NST) 或生物物理评分 (BPP)。"
        },
        "appt-w32": {
          "cadenceLabel": "每 2 周一次 (q2w)",
          "title": "孕 32 周产检、呼吸道合胞病毒 (RSV) 疫苗窗口与生长评估",
          "summary": "评估胎方位、季节性母体 RSV 免疫接种，以及启动高危妊娠产前胎心监护。",
          "procedures": [
            "母体 RSV 疫苗接种（Abrysvo，每年 9 月至次年 1 月期间于 32周0天–36周6天接种），预防新生儿重症 RSV 下呼吸道感染",
            "测量血压、尿常规、宫高（30–34 cm）及胎心音",
            "若此前存在胎盘低置、高龄、妊娠期糖尿病或宫高与孕周不符，行胎盘位置复查或胎儿生长超声"
          ],
          "questionsToAsk": [
            "我今天是否处于接种 Abrysvo 母体 RSV 疫苗的季节窗口内（或者宝宝出生后将注射尼塞韦单抗 Beyfortus）？",
            "现在能摸出宝宝是否已经开始转成头位（头朝下）了吗？"
          ],
          "highRiskAddition": "高龄 (≥35–40) / GDM / 慢性高血压 / 胎儿生长受限 (FGR)：开始每周 1–2 次无应激试验 (NST) 及/或生物物理评分 (BPP)。"
        },
        "appt-w34": {
          "cadenceLabel": "每 2 周一次 (q2w)",
          "title": "孕 34 周晚期早产里程碑与分娩意愿沟通",
          "summary": "讨论分娩镇痛选择、分娩计划偏好、会阴按摩及子痫前期红色预警信号。",
          "procedures": [
            "测量血压、尿蛋白检测、宫高（32–36 cm）及胎心音",
            "四步触诊法（Leopold 手法）触诊胎产式（纵产式 vs 横产式）及胎先露",
            "沟通分娩偏好：硬膜外分娩镇痛（无痛分娩）、笑气吸入、间歇性与持续性胎心监护、延迟断脐及出生后第一小时肌肤接触（黄金一小时）"
          ],
          "questionsToAsk": [
            "我们医院在延迟断脐、出生后立即母婴肌肤接触以及哺乳顾问查房方面的标准流程是怎样的？",
            "在哪些临床情况下您会建议转为剖宫产或器械助产？"
          ],
          "highRiskAddition": "前置胎盘 / 既往古典式剖宫产史：按 ACOG 指南确认择期分娩时间（前置胎盘通常安排在 36周0天–37周6天）。"
        },
        "appt-w36": {
          "cadenceLabel": "开始每周产检 (q1w)",
          "title": "孕 36 周 B 族链球菌 (GBS) 拭子筛查与胎先露确认",
          "summary": "正式进入每周一次产检阶段，进行常规 GBS 培养筛查并确认胎儿是否为头位。",
          "procedures": [
            "阴道下段及直肠 B 族链球菌 (GBS) 拭子采样（于 36周0天–37周6天进行，有效期 5 周）",
            "四步触诊法 + 必要时床旁超声确认胎儿头先露（枕先露）",
            "若 36 周时胎儿仍为臀位：评估并沟通第 37 周行外倒转术 (ECV) 的可行性",
            "按医嘱于 36 周或分娩时停用小剂量阿司匹林；若有生殖器疱疹 (HSV) 病史，自 36 周起开始口服阿昔洛韦/伐昔洛韦抑制治疗"
          ],
          "questionsToAsk": [
            "今天确认宝宝已经是头朝下（头位）了吗？",
            "如果我的 GBS 筛查呈阳性，规律宫缩开始或破水后我应该多早赶到产房，以确保分娩前输注满至少 4 小时的静脉青霉素？"
          ],
          "highRiskAddition": "生殖器疱疹 (HSV) 病史：自 36周0天起每日口服伐昔洛韦/阿昔洛韦预防复发，避免因产道活动性病灶而需剖宫产。"
        },
        "appt-w37": {
          "cadenceLabel": "每周一次 (q1w)",
          "title": "孕 37 周早期足月产检与临产入院指征宣教",
          "summary": "核查 GBS 培养结果、评估早期足月生理准备情况，并明确前往产房急诊的准确指征。",
          "procedures": [
            "测量血压、尿常规、宫高及胎心率",
            "核查 GBS 细菌培养结果并记录于产检档案中",
            "确认临产分诊入院法则（初产妇 5-1-1 法则：宫缩每 5 分钟一次、每次持续 1 分钟、持续满 1 小时；或经产妇 4-1-1 法则；若破水、阴道出血或胎动减少则立即就医）"
          ],
          "questionsToAsk": [
            "我的 GBS 链球菌筛查结果是阴性还是阳性？",
            "如果在家破水但还没有规律宫缩，我需要立即直接去医院产房吗？"
          ],
          "highRiskAddition": "妊娠期高血压 / 无重度特征的轻度子痫前期 / 妊娠期肝内胆汁淤积症 (ICP) / 双绒双胎：按 ACOG 指南通常在 37周0天–38周0天安排分娩。"
        },
        "appt-w38": {
          "cadenceLabel": "每周一次 (q1w)",
          "title": "孕 38 周每周产检与产后康复（第四孕期）规划",
          "summary": "持续监测母体血压与胎儿宫内状况，并为产后第 4 孕期（产褥期）做好全面准备。",
          "procedures": [
            "测量血压、尿试纸、宫高及胎心音",
            "若孕妇有下腹坠胀或希望了解宫颈基础条件，可选择行宫颈内诊检查（评估宫口扩张与宫颈管消退）",
            "产后康复指导、盆底肌健康、产后心理健康（爱丁堡产后抑郁量表宣教）及产后避孕咨询"
          ],
          "questionsToAsk": [
            "出院回家后如果遇到母乳喂养困难，我应该联系哪位哺乳顾问或门诊？",
            "我的产后复查将如何安排（ACOG 建议产后 3 周内进行初步随访，6–12 周进行全面产后复查）？"
          ],
          "highRiskAddition": "饮食控制的妊娠期糖尿病 / 高龄 40+：讨论在 39周0天–39周6天期间分娩的最佳时机。"
        },
        "appt-w39": {
          "cadenceLabel": "每周一次 (q1w)",
          "title": "孕 39 周完全足月产检、人工剥膜与引产方案讨论",
          "summary": "完全足月里程碑评估、可选宫颈 Bishop 评分检查，以及期待疗法与 39 周择期引产的医患共同决策。",
          "procedures": [
            "测量血压、尿常规、宫高及胎心音",
            "可选阴道指检评估宫颈成熟度 Bishop 评分（宫口扩张、宫颈管消退、先露位置、宫颈硬度及朝向）",
            "可选人工剥膜术（Membrane Sweep：若宫口已开 ≥1 cm 且核查 GBS 状态后进行，可促使内源性前列腺素释放，促进 48 小时内自然临产）",
            "基于 ARRIVE 临床试验方案，共同决策期待自然临产还是 39 周择期引产"
          ],
          "questionsToAsk": [
            "我目前的宫口扩张度、宫颈消退比例和胎头位置如何？今天适合做人工剥膜吗？",
            "如果到 40 周预产期仍未自然发作，您建议什么时候安排晚期足月胎心监护和引产？"
          ],
          "highRiskAddition": "药物控制的妊娠期糖尿病 / 高龄 ≥35–40：ACOG 建议在第 39 周（39周0天–39周6天）分娩。"
        },
        "appt-w40": {
          "cadenceLabel": "每周一次 (q1w)",
          "title": "孕 40 周预产期 (EDD) 产检与过期妊娠管理计划",
          "summary": "预产期全面评估、宫颈成熟度复查，以及安排第 41 周胎儿宫内监护与引产日程。",
          "procedures": [
            "测量血压、尿蛋白检测及胎心音",
            "宫颈检查及可选再次人工剥膜术",
            "开具第 41 周无应激试验 (NST) 及羊水指数 (AFI) / 生物物理评分 (BPP) 检查单",
            "预约在 41周0天至 41周6天之间住院引产的备选日期"
          ],
          "questionsToAsk": [
            "如果我们安排下周住院引产，我是前一天晚上入院进行促宫颈成熟（如水囊或米索前列醇），还是当天早上直接静滴缩宫素？"
          ],
          "highRiskAddition": "根据 ACOG/SMFM 共识，大多数高危妊娠及 ≥40 岁高龄产妇均在 39周0天–40周0天前完成分娩。"
        },
        "appt-w41-42": {
          "cadenceLabel": "每周两次 (41周+)",
          "title": "孕 41 周晚期足月 NST / BPP 监护与住院引产",
          "summary": "每周两次胎儿宫内安危与羊水量监测，最迟于 42周0天前完成分娩。",
          "procedures": [
            "无应激试验（NST）：20–40 分钟外源性胎心监护，确认胎心基线（110–160 BPM）、中度基线变异，以及 20 分钟内出现 ≥2 次胎心加速（≥15 bpm 持续 ≥15 秒，即 15x15）",
            "生物物理评分 (BPP) / 羊水超声：确认最大羊水暗区垂直深度 (MVP ≥2 cm) 或羊水指数 (AFI ≥5 cm)、胎儿呼吸样运动、肌张力及胎动",
            "在 42周0天前住院进入产房行促宫颈成熟及引产分娩"
          ],
          "questionsToAsk": [
            "我今天的羊水深度 (MVP/AFI) 正常吗？胎心监护 (NST) 是完全反应型吗？",
            "我们预约引产当天应该几点钟到达医院产房办理住院？"
          ],
          "highRiskAddition": "羊水过少 (MVP <2 cm) 或胎心监护异常：立即直接收入产房启动分娩。"
        }
      },
      "symptoms": {
        "sym-1": {
          "urgencyLabel": "立即前往产房急诊 / 联系产科医生",
          "trimesterScope": "孕晚期（第 28–42 周）",
          "title": "胎动明显减少（≥28 周专注计数 2 小时内少于 10 次）",
          "clinicalExplanation": "胎动突然减少或在专注数胎动时 2 小时内未达到 10 次清晰踢动/滚动，可能是胎盘功能减退或脐带受压的早期信号。",
          "actionSteps": "喝一杯冷水，在安静房间内取左侧卧位专注数胎动。切勿等到第二天，也不要依赖家用胎心仪，请立即前往医院产房急诊进行 20 分钟持续胎心监护 (NST)。"
        },
        "sym-2": {
          "urgencyLabel": "立即前往产房急诊 / 急诊科",
          "trimesterScope": "第 2 与第 3 孕期（≥20 周）及产褥期",
          "title": "剧烈持续性头痛、视觉异常（闪光感/视野黑点）或右上腹/上腹部疼痛",
          "clinicalExplanation": "服用对乙酰氨基酚和补水后仍不缓解的剧烈头痛、视觉暗点（闪光或视物模糊）、右上腹或心窝部疼痛，或面部/双手突发水肿，是重度子痫前期或 HELLP 综合征的典型特征。",
          "actionSteps": "如有血压计请立即测量血压（≥140/90 为升高；≥160/110 为高血压急症）。请立即前往产房急诊进行血压监测、尿蛋白、血常规/血小板及肝酶检查。"
        },
        "sym-3": {
          "urgencyLabel": "立即前往产房急诊 / 联系产科医生",
          "trimesterScope": "全孕期（第 1–42 周）",
          "title": "阴道出血（鲜红色血液或伴有血块排出）",
          "clinicalExplanation": "在第 1 孕期（孕早期），大量出血或伴随单侧下腹痛需排查异位妊娠（宫外孕）或先兆流产；在第 2 与第 3 孕期（孕中晚期），阴道出血需立即行超声检查以排除前置胎盘或胎盘早剥。",
          "actionSteps": "请立即前往医院产房或急诊科就诊。如果您是 Rh 阴性血型，在任何母胎出血事件发生后 72 小时内还需注射抗 D 免疫球蛋白 (RhoGAM)。"
        },
        "sym-4": {
          "urgencyLabel": "立即前往医院产房急诊",
          "trimesterScope": "第 2 与第 3 孕期（孕中晚期）",
          "title": "阴道突然涌出或持续流出清亮、粉红或黄绿色液体（破水）",
          "clinicalExplanation": "足月胎膜早破 (ROM) 或 37 周前未足月胎膜早破 (PPROM) 会使羊膜腔失去抗感染屏障，且在胎头未入盆时存在脐带脱垂风险。",
          "actionSteps": "记下液体的颜色、气味、流出量和时间 (COAT)。切勿在阴道内塞入任何物品，请立即平卧或直接前往医院产房进行无菌窥器羊水结晶/试纸确认。"
        },
        "sym-5": {
          "urgencyLabel": "1–2 小时内联系产科医生或产房",
          "trimesterScope": "第 2 与第 3 孕期（孕 20–36 周）",
          "title": "37 周前出现规律宫缩（每小时超过 4–6 次且持续满 1 小时）",
          "clinicalExplanation": "在 37周0天前出现节律性子宫发紧变硬，伴随类似痛经的下腹坠痛、骨盆压迫感、腰骶部酸痛或分泌物增多，可能提示先兆早产。",
          "actionSteps": "排空膀胱，饮用 500 mL（16–24 盎司）温水，向左侧卧休息。若 1 小时内仍有 >4–6 次规律宫缩，请立即联系产房进行胎儿纤连蛋白（fFN）及宫颈长度评估。"
        },
        "sym-6": {
          "urgencyLabel": "今日联系产科医生并服用对乙酰氨基酚退热",
          "trimesterScope": "全孕期（第 1–42 周）",
          "title": "发热 ≥38.0°C (100.4°F) 或伴有寒战",
          "clinicalExplanation": "孕早期持续母体核心高热会增加神经管缺陷风险；孕中晚期发热可能诱发早产宫缩，或提示急性肾盂肾炎、流感、COVID-19 或绒毛膜羊膜炎。",
          "actionSteps": "服用对乙酰氨基酚（泰诺 650–1000 mg）降低母体核心体温，充分补液，并立即联系产科医生排查感染源。"
        },
        "sym-7": {
          "urgencyLabel": "立即前往医院急诊科 (ER)",
          "trimesterScope": "全孕期及产后 6 周内",
          "title": "单侧小腿肿胀、发红、皮温升高，或出现胸痛 / 呼吸急促",
          "clinicalExplanation": "妊娠期处于生理性高凝状态（凝血因子升高以防分娩大出血），这会增加深静脉血栓形成（DVT，因髂动脉压迫最常见于左腿）和肺栓塞 (PE) 的风险。",
          "actionSteps": "切勿按摩或揉搓肿胀的小腿！请立即前往医院急诊科进行下肢深静脉多普勒超声检查。"
        },
        "sym-8": {
          "urgencyLabel": "24 小时内联系产科门诊",
          "trimesterScope": "第 2 孕期晚期至第 3 孕期",
          "title": "手掌与脚底剧烈瘙痒（尤其夜间加重，且皮肤表面无皮疹）",
          "clinicalExplanation": "无原发性皮疹的手掌和脚底剧烈瘙痒是妊娠期肝内胆汁淤积症 (ICP) 的典型症状，由母体血清总胆汁酸升高引起。",
          "actionSteps": "请在 24 小时内联系产科门诊抽血查血清总胆汁酸 (TBA) 和肝功能 (AST/ALT)。一旦确诊，口服熊去氧胆酸可有效止痒并降低胆汁酸水平。"
        },
        "sym-9": {
          "urgencyLabel": "今日联系产科门诊",
          "trimesterScope": "全孕期",
          "title": "排尿灼痛（尿痛）、尿液浑浊/异味或侧腰部（肾区）疼痛",
          "clinicalExplanation": "孕酮会使输尿管平滑肌松弛扩张，导致下尿路感染 (UTI/膀胱炎) 更容易上行发展为急性肾盂肾炎，进而可能诱发早产。",
          "actionSteps": "请于今日联系产科门诊进行尿常规和尿培养检查，以便及时使用孕期安全抗生素（如头孢氨苄、孕中期呋喃妥因或磷霉素）规范治疗。"
        },
        "sym-10": {
          "urgencyLabel": "正常妊娠生理变化（可在产检时咨询）",
          "trimesterScope": "第 2 与第 3 孕期（孕中晚期）",
          "title": "翻身、起立或咳嗽时腹股沟/下腹两侧出现短暂尖锐牵拉痛",
          "clinicalExplanation": "典型的子宫圆韧带牵拉痛：随着子宫向上增大超出骨盆，成对的子宫圆韧带像拉紧的橡皮筋一样被拉伸，在体位突然改变时会发生短暂痉挛。",
          "actionSteps": "咳嗽或打喷嚏前先微屈髋部弯腰，起床前先缓慢侧卧再撑起身体，可使用温热（勿过烫）毛巾热敷或佩戴孕妇托腹带缓解。"
        },
        "sym-11": {
          "urgencyLabel": "正常生理性假宫缩 (Braxton Hicks)",
          "trimesterScope": "第 2 与第 3 孕期（孕中晚期）",
          "title": "不规律、无痛性的腹部发紧变硬，补水与休息后即可缓解",
          "clinicalExplanation": "布雷克斯顿·希克斯（Braxton Hicks“练习性”）假宫缩能锻炼子宫平滑肌，但不会使宫口扩张。其特点是频率不规律、强度不递增，常由轻度脱水或憋尿诱发。",
          "actionSteps": "饮用 2 杯温水，排空膀胱，向左侧卧休息。若宫缩变得规律（每 5–10 分钟一次）或伴随疼痛，请联系产科医生。"
        },
        "sym-12": {
          "urgencyLabel": "正常妊娠生理变化",
          "trimesterScope": "全孕期",
          "title": "轻度鼻塞（“妊娠期鼻炎”）或偶发少量鼻出血",
          "clinicalExplanation": "雌激素介导的鼻黏膜充血水肿以及孕期 +45% 的血容量扩张，会导致约 30% 的孕妇出现鼻甲肿胀和鼻黏膜毛细血管脆弱。",
          "actionSteps": "可使用无菌生理盐水喷鼻剂、卧室冷雾加湿器及鼻贴缓解。避免口服含有伪麻黄碱或去氧肾上腺素的感冒通鼻药（尤其在孕早期或血压偏高时）。"
        }
      },
      "safety": {
        "med-1": {
          "category": "解热与镇痛",
          "statusLabel": "一线安全药物 (ACOG)",
          "name": "对乙酰氨基酚 / 扑热息痛 (Tylenol / 泰诺林)",
          "dosageNote": "按需每 6 小时 325–650 mg（24 小时最大量 3,000 mg）；遵循最低有效剂量与最短疗程原则。",
          "clinicalGuidance": "ACOG 与 SMFM 确认对乙酰氨基酚是贯穿三个孕期最安全的一线镇痛与退热药物。及时控制母体发热 ≥38.0 °C（100.4 °F）对保护胚胎和胎儿至关重要。"
        },
        "med-2": {
          "category": "解热与镇痛",
          "statusLabel": "孕期禁用（低剂量阿司匹林除外）",
          "name": "布洛芬 (Advil/芬必得)、萘普生与高剂量阿司匹林（非甾体抗炎药 NSAIDs）",
          "dosageNote": "整个孕期避免使用（注：产科医生开具用于预防子痫前期的每日 81 mg 小剂量阿司匹林属例外，安全可用）。",
          "clinicalGuidance": "口服非甾体抗炎药会抑制胎儿前列腺素合成，在孕 20 周后可引起胎儿动脉导管提前闭合、胎儿肾功能受损及羊水过少，并可能干扰早期胚胎着床。"
        },
        "med-3": {
          "category": "恶心与孕吐",
          "statusLabel": "ACOG 一线标准疗法",
          "name": "维生素 B6（吡哆醇）+ 琥珀酸多西拉敏 (Unisom SleepTabs / Diclegis)",
          "dosageNote": "维生素 B6 每次 10–25 mg 每日 3 次 + 睡前琥珀酸多西拉敏 12.5–25 mg。",
          "clinicalGuidance": "产科研究最充分的止吐方案（逾 20 万例妊娠暴露证实无致畸风险）。购买时请认准单一成分的琥珀酸多西拉敏 (Doxylamine succinate)。"
        },
        "med-4": {
          "category": "反酸与胃灼热",
          "statusLabel": "一/二线安全用药",
          "name": "碳酸钙抗酸片 (Tums) 与法莫替丁 (Pepcid)",
          "dosageNote": "碳酸钙按需每次 500–1,000 mg；若抗酸片不足以缓解，可每日 1–2 次口服法莫替丁 10–20 mg。",
          "clinicalGuidance": "钙抗酸剂可安全中和胃酸并补充钙质（需与铁剂间隔 2 小时服用）。避免使用次水杨酸铋 (Pepto-Bismol)，因其会吸收水杨酸盐成分。"
        },
        "med-5": {
          "category": "便秘与胃肠道",
          "statusLabel": "安全获批（全身吸收极微）",
          "name": "聚乙二醇 3350 (MiraLAX)、车前子壳膳食纤维 (Metamucil) 与多库酯钠 (Colace)",
          "dosageNote": "聚乙二醇（MiraLAX）每日 17 g 溶于 240 mL（8 盎司）水中服用，同时增加日常饮水与膳食纤维。",
          "clinicalGuidance": "孕酮会减慢肠道蠕动，产前铁剂也会加重便秘。渗透性与容积性泻药不进入全身血液循环，全孕期均可安全使用。避免使用蓖麻油或矿物油。"
        },
        "med-6": {
          "category": "过敏与感冒",
          "statusLabel": "孕期一线抗过敏安全用药",
          "name": "氯雷他定 (开瑞坦/Claritin)、西替利嗪 (仙特明/Zyrtec) 与氟替卡松鼻喷雾剂 (辅舒良/Flonase)",
          "dosageNote": "氯雷他定每日 10 mg 或西替利嗪每日 10 mg；避免含有减充血剂的复方制剂（如 Claritin-D 或 Zyrtec-D）。",
          "clinicalGuidance": "第二代抗组胺药与鼻用糖皮质激素喷雾剂在孕期拥有良好的安全记录。孕早期或血压偏高者应避免口服伪麻黄碱/去氧肾上腺素。"
        },
        "med-7": {
          "category": "皮肤科与孕期护肤",
          "statusLabel": "严格禁用（强致畸性）",
          "name": "异维 A 酸 (Accutane/泰尔丝) 与处方外用维 A 酸类 (维 A 酸乳膏 / Retin-A)",
          "dosageNote": "必须在备孕前停用；孕期护肤可改用壬二酸（杜鹃花酸）、果酸 (<10%) 或烟酰胺。",
          "clinicalGuidance": "全身性维 A 酸类药物会导致严重的颅面部、心脏和胸腺胚胎畸形。出于严格安全考量，皮肤科与产科指南同样建议在孕期停用所有外用维 A 酸、阿达帕林及视黄醇（A 醇）护肤品。"
        },
        "med-8": {
          "category": "营养与饮品安全",
          "statusLabel": "每日 <200 毫克内安全 (ACOG)",
          "name": "咖啡因（咖啡、浓缩咖啡、抹茶、茶饮）",
          "dosageNote": "每日咖啡因总摄入量控制在 ≤200 mg（约一杯 350 mL / 12 盎司滴滤咖啡或两份浓缩咖啡）。",
          "clinicalGuidance": "ACOG 委员会意见确认，适量摄入咖啡因（每日 <200 mg）不会增加自然流产或早产风险。计算每日总量时请一并计入茶饮、可乐及黑巧克力。"
        },
        "med-9": {
          "category": "营养与饮品安全",
          "statusLabel": "强烈推荐（每周 2–3 份）",
          "name": "低汞富含 Omega-3 的鱼虾（野生三文鱼、沙丁鱼、鳟鱼、真鳕鱼、虾）",
          "dosageNote": "每周摄入 225–340 克（8–12 盎司）彻底煮熟的低汞海产品（可提供每日约 200–300 mg DHA）。",
          "clinicalGuidance": "FDA 与 ACOG 积极推荐每周食用 2–3 份熟透的低汞鱼虾，以促进胎儿大脑与视网膜 DHA 发育。严格避免高汞掠食性鱼类：鲨鱼、剑鱼、大耳马鲛、马林鱼、胸棘鲷及大眼金枪鱼。"
        },
        "med-10": {
          "category": "营养与饮品安全",
          "statusLabel": "避免生食 / 未巴氏消毒食品",
          "name": "未巴氏消毒乳制品、未加热的冷切熟食肉与生豆芽（李斯特菌风险）",
          "dosageNote": "确认奶酪标签注明“由巴氏杀菌奶制成 (Pasteurized)”；冷切肉/火腿/热狗须加热至冒热气 (74°C / 165°F)。",
          "clinicalGuidance": "孕期细胞免疫功能下降，孕妇感染单核细胞增生李斯特菌的风险升高 10 倍，且该菌可穿过胎盘。大型超市出售的多数软奶酪（菲达、布里、鲜奶酪）均已经过巴氏杀菌——食用前请核对标签！"
        }
      },
      "photos": {
        "0": {
          "caption": "第 1–2 周：排卵期的次级卵母细胞（约 120 µm）——晶莹的透明带与外围放射冠卵丘细胞正从破裂的卵巢卵泡中释出。",
          "alt": "从卵巢表面排出的带有透明带和周围卵丘细胞的人类卵母细胞超写实渲染图。"
        },
        "1": {
          "caption": "第 3 周：受精后第 4 天的 16 细胞致密化桑椹胚，透明带内可见极体与半透明卵裂球。",
          "alt": "透明外壳内紧密排列半透明卵裂球的 16 细胞人类桑椹胚超写实渲染图。"
        },
        "2": {
          "caption": "第 4 周：破壳孵出的囊胚正在着床于富含血管的右侧子宫内膜——可见滋养层环、囊胚腔与内细胞团。",
          "alt": "通过细微滋养层突起附着于粉红色子宫内膜的人类囊胚超写实渲染图。"
        },
        "3": {
          "caption": "第 5–6 周：呈 C 形弯曲的卡内基期早期胚胎，背侧可见体节序列、腹侧原始心管隆起，以及下方的金黄色次级卵黄囊。",
          "alt": "羊膜腔内具有半透明皮肤、清晰体节与金色卵黄囊的人类早期胚胎超写实渲染图。"
        },
        "4": {
          "caption": "第 7–9 周：晚期胚胎阶段，展示端脑脑泡、色素性视杯、跳动的四腔心脏、带指线的手板与卵黄囊。",
          "alt": "具有半透明血管皮肤、深色视杯、肢芽与金色卵黄囊的晚期人类胚胎宫内微距图像。"
        },
        "5": {
          "caption": "第 10–15 周：孕早期胎儿，手指与脚趾已完全分离，眼睑融合，太阳穴血管清晰可见， 3 血管螺旋脐带连接左侧胎盘盘。",
          "alt": "羊膜囊内第 12 周人类胎儿的宫内微距图像，可见 3 血管脐带及左侧胎盘盘。"
        },
        "6": {
          "caption": "第 16–25 周：孕中期胎儿（第 20 周 II 级系统大排畸超声里程碑），体表覆盖胎脂光泽，四肢自然屈曲，3 血管脐带连接左侧胎盘。",
          "alt": "悬浮于羊膜囊中并连接左侧胎盘盘的第 20 周孕中期人类胎儿宫内微距图像。"
        },
        "7": {
          "caption": "第 26–33 周：孕晚期初段胎儿，眼睑与睫毛清晰，皮下白色脂肪快速沉积，宫内睡眠神态安详。",
          "alt": "在羊膜囊内安详休息的第 28 周孕晚期人类胎儿宫内微距图像。"
        },
        "8": {
          "caption": "第 34–42 周：孕晚期后段至完全足月胎儿，双颊饱满圆润，皮下脂肪与肺泡表面活性物质均已成熟，准备迎接分娩。",
          "alt": "蜷卧于羊膜囊内并带有左侧胎盘与螺旋脐带的足月人类胎儿宫内微距图像。"
        }
      }
    },
    "pt": {
      "weeks": {
        "1": {
          "phaseLabel": "Periconcepcional (Fase Menstrual / Folicular)",
          "stageTitle": "Recrutamento Folicular e Renovação Endometrial",
          "biologicalStage": "Coorte de Folículos Ovarianos",
          "lengthMetric": "0.04 mm (Folículo Primordial)",
          "weightMetric": "< 0,001 g",
          "heartRateBpm": "Ainda não formado (Pré-concepção)",
          "keyOrgans": [
            "Eixo Hipotálamo-Hipófise-Ovário",
            "Camada Basal Endometrial",
            "Seleção do Folículo Dominante"
          ],
          "fetalMilestones": [
            "A datação obstétrica inicia no 1.º dia da Data da Última Menstruação (DUM), cerca de 2 semanas antes da fertilização real.",
            "O hormônio folículo-estimulante (FSH) recruta uma coorte de folículos antrais; emerge um folículo dominante de Graaf.",
            "O estradiol crescente prolifera o endométrio funcional para preparar um leito de implantação vascularizado."
          ],
          "maternalPhysiology": "A descamação menstrual transita para a fase folicular proliferativa. A temperatura basal permanece na faixa pré-ovulatória.",
          "doctorCheckIn": "Checklist Pré-concepcional: Confirmar 400–800 mcg diários de ácido fólico (4 mg se defeito prévio do tubo neural), verificar imunidade a rubéola/varicela e revisar medicamentos de uso contínuo.",
          "clinicalPearl": "O ACOG data a gestação a partir do 1.º dia da DUM (40 semanas / 280 dias no total) porque a ovulação varia, enquanto a idade embrionária é ~2 semanas menor (38 semanas / 266 dias)."
        },
        "2": {
          "phaseLabel": "Periconcepcional (Fase Periovulatória)",
          "stageTitle": "Pico de LH, Ovulação e Captura Tubária",
          "biologicalStage": "Oócito Secundário (Metáfase II)",
          "lengthMetric": "0.12 mm (Oócito de 120 µm)",
          "weightMetric": "< 0,001 g",
          "heartRateBpm": "Ainda não formado (Janela ovulatória)",
          "keyOrgans": [
            "Complexo Cumulus-Oócito",
            "Zona Pelúcida",
            "Formação do Corpo Lúteo"
          ],
          "fetalMilestones": [
            "O pico do hormônio luteinizante (LH) no meio do ciclo retoma a Meiose I e libera o primeiro corpúsculo polar.",
            "A ovulação libera o oócito secundário em Metáfase II, captado para a ampola tubária pelas fímbrias.",
            "O folículo rompido transforma-se no Corpo Lúteo, secretando progesterona para tornar o endométrio secretor."
          ],
          "maternalPhysiology": "O pico de estrogênio estimula o espessamento endometrial e o muco cervical fértil; a temperatura corporal basal sobe ~0,3 °C (~0,5 °F) após a ovulação.",
          "doctorCheckIn": "Janela Fértil: A maior probabilidade de concepção ocorre nos 5 dias anteriores à ovulação e no próprio dia da ovulação (viabilidade do oócito de 12–24 horas).",
          "clinicalPearl": "Na concepção por FIV, a transferência de um blastocisto de 5.º dia (D5) corresponde exatamente a 2 semanas + 5 dias de idade gestacional no dia da transferência."
        },
        "3": {
          "phaseLabel": "1.º Trimestre — Estágio Germinativo",
          "stageTitle": "Fertilização, Clivagem do Zigoto e Mórula",
          "biologicalStage": "Zigoto → Mórula de 16 Células",
          "lengthMetric": "0.15 – 0.20 mm",
          "weightMetric": "< 0,001 g",
          "heartRateBpm": "Estágio de clivagem avascular",
          "keyOrgans": [
            "Genoma Diploide (46 Cromossomos)",
            "Compactação de Blastômeros",
            "Segregação da Massa Celular Interna"
          ],
          "fetalMilestones": [
            "Fecundação na ampola da tuba uterina formando um zigoto diploide com 46 cromossomos.",
            "Os pró-núcleos masculino e feminino fundem-se em um zigoto diploide (46,XX ou 46,XY) e iniciam clivagens mitóticas a cada 12–24 horas.",
            "No 4.º dia pós-concepção, a mórula de 16 a 32 células compacta-se, entra na cavidade uterina e forma o blastocisto inicial."
          ],
          "maternalPhysiology": "O Fator Precoce da Gravidez (EPF) modula a tolerância imunológica materna; a progesterona do corpo lúteo mantém o endométrio.",
          "doctorCheckIn": "Ainda não é necessária consulta médica. Evite AINEs (ibuprofeno, naproxeno), pois a inibição de prostaglandinas pode prejudicar a implantação.",
          "clinicalPearl": "Exposições antes da 4ª semana (14 dias pós-concepção) costumam seguir o princípio do «tudo ou nada» (antes da organogênese clássica das semanas 3–8 embrionárias / 5–10 gestacionais), mas teratógenos conhecidos devem ser suspensos imediatamente."
        },
        "4": {
          "phaseLabel": "1.º Trimestre — Implantação",
          "stageTitle": "Implantação do Blastocisto e hCG do Sinciciotrofoblasto",
          "biologicalStage": "Blastocisto Bilaminar em Implantação",
          "lengthMetric": "0.4 – 1.0 mm",
          "weightMetric": "< 0,01 g",
          "heartRateBpm": "Circulação lacunar primitiva",
          "keyOrgans": [
            "Disco Epiblasto e Hipoblasto",
            "Cavidade Amniótica",
            "Vesícula Vitelina Primária",
            "Lacunas Trofoblásticas"
          ],
          "fetalMilestones": [
            "O blastocisto eclode da zona pelúcida e invade o endométrio uterino decidualizado (Dias 6–10 pós-ovulação).",
            "A Massa Celular Interna diferencia-se no disco embrionário bilaminar (epiblasto e hipoblasto).",
            "O sinciciotrofoblasto invade os capilares espiralados maternos e secreta beta-hCG, mantendo o corpo lúteo e a produção de progesterona."
          ],
          "maternalPhysiology": "Atraso menstrual; o beta-hCG sérico torna-se detectável 8–11 dias após a ovulação e dobra a cada 48–72 horas em gestação tópica viável.",
          "doctorCheckIn": "Teste de gravidez positivo! Entre em contato com seu obstetra para agendar a primeira consulta pré-natal e o ultrassom de datação (geralmente entre as Semanas 6 e 9).",
          "clinicalPearl": "Pequeno escape («sangramento de nidação») é comum e benigno, mas dor pélvica unilateral com sangramento exige beta-hCG seriado para descartar gravidez ectópica."
        },
        "5": {
          "phaseLabel": "1.º Trimestre — Organogênese Inicial",
          "stageTitle": "Gastrulação, Placa Neural e Tubo Cardíaco Primitivo",
          "biologicalStage": "Embrião Trilaminar (Estágio de Carnegie 9–10)",
          "lengthMetric": "1.5 – 2.5 mm (CCN)",
          "weightMetric": "0,02 g",
          "heartRateBpm": "85 – 100 BPM (Contrações iniciais)",
          "keyOrgans": [
            "Ectoderma / Mesoderma / Endoderma",
            "Sulco Neural",
            "Crescente Cardiogênico",
            "Somitos"
          ],
          "fetalMilestones": [
            "A gastrulação estabelece os três folhetos germinativos: Ectoderma (sistema nervoso/epiderme), Mesoderma (coração/ossos/rins) e Endoderma (intestino/pulmões/fígado).",
            "A placa neural dobra-se formando o sulco neural ladeado pelos somitos do mesoderma paraxial.",
            "Os tubos endocárdicos fundem-se em um tubo cardíaco primitivo que inicia contrações peristálticas por volta do 22.º dia pós-concepção."
          ],
          "maternalPhysiology": "A rápida elevação de hCG, estrogênio e progesterona desencadeia náuseas iniciais, sensibilidade mamária, olfato apurado e fadiga.",
          "doctorCheckIn": "Se houver histórico de gravidez ectópica, perdas recorrentes ou FIV, o médico pode solicitar beta-hCG seriado a cada 48h e ultrassom precoce.",
          "clinicalPearl": "No ultrassom transvaginal na Semana 5, o saco gestacional e a vesícula vitelina tornam-se visíveis quando o beta-hCG ultrapassa a zona discriminatória (~1.500–2.000 mUI/mL)."
        },
        "6": {
          "phaseLabel": "1.º Trimestre — Organogênese",
          "stageTitle": "Fechamento do Tubo Neural, Alça Cardíaca e Brotos dos Membros",
          "biologicalStage": "Embrião (Estágio de Carnegie 12–13)",
          "lengthMetric": "4 – 6 mm (CCN)",
          "weightMetric": "0,1 g",
          "heartRateBpm": "100 – 115 BPM",
          "keyOrgans": [
            "Neuróporos Anterior e Posterior",
            "Coração Tubular em S",
            "Vesículas Ópticas",
            "Placódios Óticos"
          ],
          "fetalMilestones": [
            "Os neuróporos anterior (craniano) e posterior (caudal) fecham-se completamente no 28.º dia pós-concepção, selando as vesículas cerebrais e a medula espinhal.",
            "O tubo cardíaco primitivo sofre dobramento em S, estabelecendo câmaras atriais e ventriculares com batimento visível ao ultrassom transvaginal.",
            "Surgem os brotos dos membros superiores e inferiores junto aos arcos faríngeos (futura mandíbula, palato e orelha média)."
          ],
          "maternalPhysiology": "O fluxo sanguíneo renal aumenta 25–30%, causando micção frequente mesmo antes de o útero comprimir a bexiga.",
          "doctorCheckIn": "Janela do Ultrassom de Viabilidade e Datação (Semanas 6–8): Confirma o embrião intrauterino, mede o Comprimento Cabeça-Nádega (CCN ±3–5 dias) e documenta os batimentos cardíacos.",
          "clinicalPearl": "Como o fechamento do tubo neural termina na Semana 6, defeitos como espinha bífida originam-se antes da primeira consulta, reforçando a importância do ácido fólico precoce."
        },
        "7": {
          "phaseLabel": "1.º Trimestre — Organogênese",
          "stageTitle": "Expansão do Telencéfalo, Placas das Mãos e Metanefros",
          "biologicalStage": "Embrião (Estágio de Carnegie 15–16)",
          "lengthMetric": "9 – 11 mm (CCN)",
          "weightMetric": "0,5 g",
          "heartRateBpm": "120 – 140 BPM",
          "keyOrgans": [
            "Hemisférios Cerebrais",
            "Rim Definitivo (Metanefro)",
            "Raios Digitais (Placas das Mãos)",
            "Brotos Pancreáticos"
          ],
          "fetalMilestones": [
            "O prosencéfalo divide-se em vesículas telencefálicas pares (futuro córtex cerebral), gerando ~100.000 novos neurônios por minuto.",
            "As placas das mãos achatam-se e formam raios digitais; as vesículas do cristalino invaginam e surge o pigmento retiniano.",
            "O broto uretérico invade o mesênquima metanéfrico para formar os rins definitivos (metanefro)."
          ],
          "maternalPhysiology": "As glândulas cervicais secretam um tampão mucoso espesso que sela o canal endocervical contra bactérias ascendentes.",
          "doctorCheckIn": "Para náuseas e vômitos da gravidez, a terapia de primeira linha do ACOG é Vitamina B6 (piridoxina 10–25 mg 3x/dia) associada à doxilamina (12,5–25 mg).",
          "clinicalPearl": "A herniação fisiológica do intestino médio começa nesta semana: o rápido crescimento intestinal projeta temporariamente as alças para a base do cordão umbilical até as Semanas 10–11."
        },
        "8": {
          "phaseLabel": "1.º Trimestre — Organogênese",
          "stageTitle": "Septação do Coração de 4 Câmaras e Dedos Membranados",
          "biologicalStage": "Embrião (Estágio de Carnegie 18–20)",
          "lengthMetric": "15 – 17 mm (CCN)",
          "weightMetric": "1,1 g",
          "heartRateBpm": "145 – 165 BPM",
          "keyOrgans": [
            "Válvulas Atrioventriculares",
            "Septo Interventricular",
            "Centros de Condrificação",
            "Pavilhões Auriculares Externos"
          ],
          "fetalMilestones": [
            "Os coxins endocárdicos fundem-se e o septo interventricular fecha-se, completando a arquitetura cardíaca de 4 câmaras.",
            "A apoptose (morte celular programada) esculpe os espaços entre os dedos das mãos e dos pés; cotovelos e joelhos fletem-se.",
            "Formam-se os moldes esqueléticos cartilaginosos primários e iniciam-se movimentos espontâneos do tronco e membros."
          ],
          "maternalPhysiology": "O útero expande-se do tamanho de um punho para o de um limão grande; o débito cardíaco materno sobe 20%.",
          "doctorCheckIn": "Primeira Consulta Pré-Natal (Semanas 8–10): Ultrassom transvaginal para confirmar viabilidade e CCN (CRL), datação da DPP, exames laboratoriais de rotina (tipagem ABO/Rh, Coombs indireto, hemograma, rubéola, HBsAg, HIV, sífilis, urocultura) e citologia cervical.",
          "clinicalPearl": "O Comprimento Cabeça-Nádega (CCN) entre 7 e 13 semanas é o método mais preciso para estabelecer ou corrigir a Data Provável do Parto (DPP)."
        },
        "9": {
          "phaseLabel": "1.º Trimestre — Estágio Embrionário Tardio",
          "stageTitle": "Pico da Frequência Cardíaca Embrionária, Fusão Palpebral e Diafragma",
          "biologicalStage": "Embrião Tardio (Estágio de Carnegie 21–22)",
          "lengthMetric": "22 – 25 mm (2.3 cm CCN)",
          "weightMetric": "2,0 g",
          "heartRateBpm": "155 – 175 BPM (Pico Fisiológico)",
          "keyOrgans": [
            "Diafragma Pleuroperitoneal",
            "Pálpebras Fundidas",
            "Hipófise e Córtex Adrenal",
            "Ligamentos Vocais"
          ],
          "fetalMilestones": [
            "A frequência cardíaca embrionária atinge seu pico fisiológico (~165–175 BPM) enquanto a inervação parassimpática amadurece.",
            "As membranas pleuroperitoneais fundem-se ao septo transverso para completar o diafragma torácico.",
            "As pálpebras crescem sobre os olhos e fundem-se (permanecendo fechadas até as Semanas 25–26 para proteger as córneas)."
          ],
          "maternalPhysiology": "O pico sérico de beta-hCG (~90.000–100.000 mUI/mL) costuma coincidir com o auge dos enjoos matinais entre as Semanas 9 e 10.",
          "doctorCheckIn": "Converse com seu obstetra sobre a triagem genética: DNA fetal livre (NIPT) a partir da Semana 10+0, painel de portadores e ultrassom de Translucência Nucal.",
          "clinicalPearl": "Se vômitos intensos causarem perda >5% do peso pré-gestacional, cetonúria ou incapacidade de ingerir líquidos por 24h (hiperêmese gravídica), procure avaliação para hidratação IV."
        },
        "10": {
          "phaseLabel": "1.º Trimestre — Transição Embrião para Feto",
          "stageTitle": "Conclusão da Organogênese e Elegibilidade para o NIPT",
          "biologicalStage": "Transição Embrião → Feto (Estágio de Carnegie 23)",
          "lengthMetric": "31 – 35 mm (3.3 cm CCN)",
          "weightMetric": "4,0 g",
          "heartRateBpm": "150 – 170 BPM",
          "keyOrgans": [
            "Ossificação Endocondral",
            "Filtração Glomerular dos Néfrons",
            "Brotos Dentários Decíduos",
            "Vilosidades Coriônicas"
          ],
          "fetalMilestones": [
            "O final da Semana 10 marca a transição formal de Embrião para Feto: todos os principais sistemas orgânicos estão estabelecidos.",
            "Os rins metanéfricos começam a produzir urina fetal diluída, que logo será o principal componente do líquido amniótico.",
            "A cauda embrionária regride completamente; formam-se as unhas das mãos e os brotos dos dentes decíduos."
          ],
          "maternalPhysiology": "O trofoblasto placentário começa a assumir a síntese de progesterona e estradiol do corpo lúteo («transição lúteo-placentária»).",
          "doctorCheckIn": "Abre-se a janela de coleta do NIPT (DNA fetal livre, Semana 10+0): rastreia Trissomia 21 (Síndrome de Down), Trissomia 18, Trissomia 13 e aneuploidias sexuais com >99% de sensibilidade para T21.",
          "clinicalPearl": "Como a organogênese estrutural principal termina no fim da Semana 10, a suscetibilidade a grandes teratógenos estruturais diminui significativamente."
        },
        "11": {
          "phaseLabel": "1.º Trimestre — Período Fetal Inicial",
          "stageTitle": "Retração do Intestino Médio, Fusão Palatina e Tampões Nasais",
          "biologicalStage": "Feto Inicial",
          "lengthMetric": "4.1 – 4.5 cm (CCN)",
          "weightMetric": "7,5 g",
          "heartRateBpm": "145 – 165 BPM",
          "keyOrgans": [
            "Fechamento da Parede Abdominal",
            "Fusão do Palato Secundário",
            "Eritropoiese Hepática",
            "Folículos Capilares"
          ],
          "fetalMilestones": [
            "A herniação fisiológica do intestino médio resolve-se quando o intestino gira 270° no sentido anti-horário e retrai-se para o abdome fetal.",
            "As prateleiras palatinas maxilares elevam-se e fundem-se na linha média, separando as cavidades oral e nasal.",
            "Os botões dentários dos 20 dentes decíduos (de leite) estão formados sob as gengivas."
          ],
          "maternalPhysiology": "A resistência vascular sistêmica materna cai devido à progesterona e ao óxido nítrico, podendo causar leve tontura postural ao levantar-se rápido.",
          "doctorCheckIn": "Janela do Ultrassom de Translucência Nucal (TN) do 1.º Trimestre (Semanas 11+0 a 13+6) e Biópsia de Vilo Corial (BVC, Semanas 10–13) se indicada.",
          "clinicalPearl": "A Hemoglobina Fetal (HbF, alfa-2/gama-2) possui maior afinidade pelo oxigênio que a hemoglobina adulta (HbA), otimizando a transferência placentária de oxigênio."
        },
        "12": {
          "phaseLabel": "1.º Trimestre — Semana Marco (Translucência Nucal)",
          "stageTitle": "Reflexo de Deglutição, Peristaltismo e Janela da Aspirina em Baixa Dose",
          "biologicalStage": "Feto",
          "lengthMetric": "5.3 – 5.8 cm (CCN)",
          "weightMetric": "14 g (0,5 oz)",
          "heartRateBpm": "140 – 160 BPM",
          "keyOrgans": [
            "Peristaltismo Gastrointestinal",
            "Hormônios Hipofisários (ACTH/TSH)",
            "Linfopoiese Esplênica",
            "Clavículas e Fêmures Ossificados"
          ],
          "fetalMilestones": [
            "O feto deglute ativamente líquido amniótico; a musculatura lisa intestinal inicia contrações peristálticas e absorção de glicose.",
            "Surgem centros de ossificação primária no crânio, ossos longos e vértebras.",
            "A genitália externa inicia diferenciação morfológica sob ação da DHT (masculino) ou ausência de DHT (feminino)."
          ],
          "maternalPhysiology": "O fundo uterino eleva-se acima da sínfise púbica, passando de órgão pélvico para abdominal; a compressão vesical alivia temporariamente.",
          "doctorCheckIn": "Consulta de 12 Semanas + Prevenção de Pré-eclâmpsia: ACOG e USPSTF recomendam iniciar aspirina em baixa dose (81 mg/dia da Semana 12 até o parto) se houver ≥1 fator de alto risco ou ≥2 moderados (ex.: primeira gestação, idade ≥35, IMC >30).",
          "clinicalPearl": "Confirmado o batimento cardíaco fetal normal às 12 semanas com rastreamento genético normal, o risco estatístico de abortamento espontâneo cai para menos de 1–2%."
        },
        "13": {
          "phaseLabel": "1.º Trimestre — Última Semana do 1.º Trimestre",
          "stageTitle": "Maturação das Cordas Vocais, Dermatoglifos e Autonomia Placentária",
          "biologicalStage": "Feto",
          "lengthMetric": "6.7 – 7.4 cm (CCN)",
          "weightMetric": "25 g (0,9 oz)",
          "heartRateBpm": "140 – 160 BPM",
          "keyOrgans": [
            "Unidade Fetoplacentária",
            "Impressões Digitais (Cristas Dérmicas)",
            "Pâncreas (Secreção de Insulina)",
            "Folículos Ovarianos Primordiais"
          ],
          "fetalMilestones": [
            "Cristas epidérmicas únicas (impressões digitais) começam a se formar nas polpas digitais.",
            "Em fetos femininos, as ovogônias proliferam rapidamente nos ovários (~2 milhões de folículos primordiais na metade da gestação).",
            "O crescimento da cabeça desacelera em relação ao tronco, representando agora cerca de um terço do Comprimento Cabeça-Nádega."
          ],
          "maternalPhysiology": "Os níveis de hCG estabilizam e declinam à medida que a placenta assume total autonomia endócrina; os enjoos diminuem e a disposição retorna.",
          "doctorCheckIn": "Última semana para medição da Translucência Nucal (TN, até 13s6d / CCN ≤84 mm). Agende sua avaliação e profilaxia odontológica (segura e recomendada na gestação).",
          "clinicalPearl": "A gengivite gravídica é comum devido à permeabilidade vascular; a limpeza odontológica de rotina e o uso de lidocaína local (sem sobrecarga sistêmica de epinefrina) são totalmente seguros."
        },
        "14": {
          "phaseLabel": "2.º Trimestre — Início do 2.º Trimestre",
          "stageTitle": "Surgimento do Lanugo, Síntese de Hormônio Tireoidiano e Expressões Faciais",
          "biologicalStage": "Feto do 2.º Trimestre",
          "lengthMetric": "8.5 cm (CCN) / ~12 cm (CCT)",
          "weightMetric": "45 g (1,6 oz)",
          "heartRateBpm": "135 – 155 BPM",
          "keyOrgans": [
            "Tireoide Fetal (Tiroxina T4)",
            "Nervo Craniano VII (Facial)",
            "Lanugo Fetal",
            "Próstata / Descida Ovariana"
          ],
          "fetalMilestones": [
            "A glândula tireoide fetal começa a captar iodo e sintetizar tiroxina endógena (T4) para impulsionar o neurodesenvolvimento.",
            "O VII nervo craniano (facial) inerva a musculatura da face, permitindo reflexos de franzir a testa e fazer caretas.",
            "Começa a surgir uma penugem ultrafina (lanugo) que fixará o vernix caseoso protetor na pele."
          ],
          "maternalPhysiology": "Bem-vinda ao Segundo Trimestre («trimestre dourado»). O apetite retorna; o débito cardíaco materno está ~30–40% acima do basal pré-gestacional.",
          "doctorCheckIn": "Se houver histórico de insuficiência istmocervical ou parto prematuro espontâneo <34 semanas, converse sobre avaliação seriada do colo uterino ou cerclagem profilática (geralmente realizada entre 12 e 14 semanas).",
          "clinicalPearl": "A ingestão adequada de iodo (220 mcg/dia na gestação) é essencial a partir da Semana 14, quando a tireoide fetal passa a produzir seus próprios hormônios."
        },
        "15": {
          "phaseLabel": "2.º Trimestre — Desenvolvimento Esquelético e Auditivo",
          "stageTitle": "Ossículos do Ouvido Médio, Movimentos Respiratórios Amnióticos e Janela MSAFP",
          "biologicalStage": "Feto",
          "lengthMetric": "10.1 cm (CCN) / ~14.5 cm (CCT)",
          "weightMetric": "70 g (2,5 oz)",
          "heartRateBpm": "135 – 155 BPM",
          "keyOrgans": [
            "Martelo / Bigorna / Estribo",
            "Árvore Traqueobrônquica",
            "Diáfises dos Ossos Longos",
            "Papilas Gustativas"
          ],
          "fetalMilestones": [
            "Os três ossículos da orelha média (martelo, bigorna, estribo) começam a ossificar, preparando a via auditiva condutiva.",
            "Movimentos respiratórios fetais episódicos mobilizam o líquido amniótico pela árvore brônquica, estimulando o crescimento pulmonar.",
            "A inervação muscular esquelética fortalece-se; as pernas já são mais longas que os braços."
          ],
          "maternalPhysiology": "A atividade melanocítica estimulada pelo estrogênio pode causar a linha nigra abdominal e melasma facial.",
          "doctorCheckIn": "Abre-se a janela de Alfa-Fetoproteína Sérica Materna (MSAFP, Semanas 15–20) para rastreio de defeitos abertos do tubo neural.",
          "clinicalPearl": "Posição ao dormir: A partir do meio do segundo trimestre, prefira dormir de lado (especialmente decúbito lateral esquerdo) para descomprimir a veia cava inferior."
        },
        "16": {
          "phaseLabel": "2.º Trimestre — Marco do 4.º Mês (Primeiros Movimentos)",
          "stageTitle": "Movimentos Oculares Sacádicos, Flexão Coordenada e Primeiros Movimentos Fetais",
          "biologicalStage": "Feto",
          "lengthMetric": "11.6 cm (CCN) / ~16.5 cm (CCT)",
          "weightMetric": "100 g (3,5 oz)",
          "heartRateBpm": "130 – 155 BPM",
          "keyOrgans": [
            "Músculos Extraoculares",
            "Geleia de Wharton do Cordão",
            "Ciclo Vesical Fetal",
            "Receptores Sensoriais Cutâneos"
          ],
          "fetalMilestones": [
            "Movimentos oculares sacádicos lentos começam sob as pálpebras fundidas com a maturação dos núcleos oculomotores.",
            "O coração fetal bombeia ~24 litros (~25 qt) de sangue por dia pelo cordão umbilical de 3 vasos (2 artérias e 1 veia protegidas pela geleia de Wharton).",
            "A bexiga fetal enche e esvazia a cada 30–45 minutos, mantendo o volume do líquido amniótico."
          ],
          "maternalPhysiology": "Gestantes multíparas (e aquelas com placenta posterior) podem notar os primeiros movimentos fetais sutis entre as Semanas 16 e 20.",
          "doctorCheckIn": "Consulta Obstétrica de 16 Semanas: Pressão arterial, peso, fita urinária, batimentos cardiofetais ao Doppler e agendamento do Ultrassom Morfológico de 20 semanas.",
          "clinicalPearl": "Se você tiver placenta anterior (fixada na parede frontal do útero), ela funciona como uma almofada e costuma atrasar a percepção dos primeiros chutes até as Semanas 20–22 — isso é totalmente normal."
        },
        "17": {
          "phaseLabel": "2.º Trimestre — Maturação Adiposa e Imunológica",
          "stageTitle": "Deposição de Tecido Adiposo Marrom e Início da Transferência Transplacentária de IgG",
          "biologicalStage": "Feto",
          "lengthMetric": "13.0 cm (CCN) / ~18.5 cm (CCT)",
          "weightMetric": "140 g (5,0 oz)",
          "heartRateBpm": "130 – 155 BPM",
          "keyOrgans": [
            "Tecido Adiposo Marrom",
            "Células Ciliadas Cocleares",
            "Glândulas Sudoríparas",
            "Receptores Placentários FcRn de IgG"
          ],
          "fetalMilestones": [
            "O Tecido Adiposo Marrom começa a se depositar ao redor do pescoço, esterno e rins para a termogênese pós-natal.",
            "Os receptores placentários FcRn iniciam o transporte ativo de anticorpos IgG maternos para a circulação fetal.",
            "As células ciliadas cocleares alinham-se no órgão de Corti; sons internos maternos começam a estimular a orelha interna."
          ],
          "maternalPhysiology": "O estiramento do ligamento redondo na pelve lateral pode causar fisgadas breves na virilha ao virar na cama, tossir ou levantar.",
          "doctorCheckIn": "Janela Diagnóstica de Amniocentese (Semanas 15–20): Oferecida caso o NIPT/rastreio indique alto risco ou para diagnóstico genético definitivo.",
          "clinicalPearl": "A dor do ligamento redondo é breve (segundos) e desencadeada pelo movimento. Cólicas persistentes, rítmicas ou com sangramento exigem avaliação obstétrica."
        },
        "18": {
          "phaseLabel": "2.º Trimestre — Expansão Neurossensorial",
          "stageTitle": "Início da Mielinização, Vernix Caseoso e Janela Inicial do Ultrassom Morfológico",
          "biologicalStage": "Feto",
          "lengthMetric": "14.2 cm (CCN) / ~20.5 cm (CCT)",
          "weightMetric": "190 g (6,7 oz)",
          "heartRateBpm": "125 – 155 BPM",
          "keyOrgans": [
            "Mielinização por Células de Schwann",
            "Glândulas Sebáceas (Vernix)",
            "Vias de Saída Cardíacas",
            "Corpo Caloso"
          ],
          "fetalMilestones": [
            "As glândulas sebáceas secretam o Vernix Caseoso — um biofilme lipídico e antimicrobiano que impermeabiliza a pele fetal.",
            "As células de Schwann e os oligodendrócitos iniciam a mielinização dos axônios para acelerar a condução nervosa.",
            "As câmaras cardíacas e os tratos de saída (4 câmaras, aorta e tronco pulmonar) já são claramente visíveis ao ultrassom."
          ],
          "maternalPhysiology": "Nadir fisiológico da pressão arterial na metade da gestação: a vasodilatação reduz a pressão ao seu ponto mais baixo (~5–10 mmHg abaixo do basal) entre as Semanas 18–20.",
          "doctorCheckIn": "Abre-se a janela do Ultrassom Morfológico de 2.º Trimestre (Semanas 18–22), idealmente realizado entre 19s0d e 21s0d.",
          "clinicalPearl": "Durante o Morfológico, mede-se também o Comprimento do Colo Uterino (normal ≥25 mm entre 18–24 semanas) para rastreio de risco de prematuridade."
        },
        "19": {
          "phaseLabel": "2.º Trimestre — Mapeamento Cortical Sensorial",
          "stageTitle": "Mapeamento do Córtex Somatossensorial e Concentração Tubular Renal",
          "biologicalStage": "Feto",
          "lengthMetric": "15.3 cm (CCN) / ~22.5 cm (CCT)",
          "weightMetric": "240 g (8,5 oz)",
          "heartRateBpm": "125 – 155 BPM",
          "keyOrgans": [
            "Córtex Somatossensorial",
            "Alças de Henle Renais",
            "Brotos dos Dentes Permanentes",
            "Ramificação Bronquiolar"
          ],
          "fetalMilestones": [
            "As projeções talamocorticais alcançam a subplaca do córtex cerebral, estruturando o processamento auditivo, visual e tátil.",
            "Os brotos dos dentes permanentes formam-se profundamente atrás dos brotos dos dentes de leite na maxila e mandíbula.",
            "Inicia-se a fase canalicular do desenvolvimento pulmonar: os bronquíolos respiratórios dividem-se e os capilares proliferam."
          ],
          "maternalPhysiology": "O volume sanguíneo materno expandiu ~30–35%; a maior demanda de ferro para a massa eritrocitária exige aporte regular de ferro.",
          "doctorCheckIn": "Prepare suas dúvidas para a consulta de 20 semanas e Ultrassom Morfológico (localização da placenta em relação ao colo, cordão de 3 vasos).",
          "clinicalPearl": "Se a placenta for descrita como «inserção baixa» às 19–20 semanas, >90% resolvem espontaneamente à medida que o segmento uterino inferior cresce até a Semana 32."
        },
        "20": {
          "phaseLabel": "2.º Trimestre — Marco da Metade da Gestação",
          "stageTitle": "Marco da Metade da Gestação: Ultrassom Morfológico de Nível II e Fundo Uterino na Cicatriz Umbilical",
          "biologicalStage": "Feto de Meia Gestação",
          "lengthMetric": "25.5 cm (10.0 in Comprimento Cabeça-Calcanhar)",
          "weightMetric": "300 g (10,6 oz)",
          "heartRateBpm": "120 – 155 BPM",
          "keyOrgans": [
            "Corte de 4 Câmaras e Vias de Saída",
            "Fossa Posterior / Cerebelo",
            "Acúmulo de Mecônio",
            "Estrato Córneo Epidérmico"
          ],
          "fetalMilestones": [
            "A partir da Semana 20, os obstetras medem o comprimento cabeça-calcanhar (CHL) total em vez do comprimento cabeça-nádega, pois as pernas fetais se esticam.",
            "O mecônio estéril (células epiteliais descamadas, lanugo, pigmentos biliares e líquido amniótico) acumula-se no cólon fetal.",
            "Surgem ciclos circadianos de sono-vigília: o feto alterna períodos de 20–40 minutos de atividade e repouso."
          ],
          "maternalPhysiology": "O fundo uterino atinge a cicatriz umbilical materna. Da Semana 20 à 36, a altura uterina em centímetros equivale aproximadamente à idade gestacional em semanas (±2 cm).",
          "doctorCheckIn": "Consulta de 20 Semanas e Ultrassom Morfológico de 2º Trimestre (Semanas 18–22): Avaliação detalhada dos ventrículos cerebrais, perfil/lábios, coração de 4 câmaras, vias de saída, estômago, rins, bexiga, coluna, cordão de 3 vasos, placenta e colo uterino.",
          "clinicalPearl": "Por que a pressão arterial após a Semana 20 é crítica: Hipertensão iniciada a partir de 20 semanas (PA ≥140/90) é o critério diagnóstico para Hipertensão Gestacional ou Pré-eclâmpsia."
        },
        "21": {
          "phaseLabel": "2.º Trimestre — Transição Hematopoiética Medular",
          "stageTitle": "Hematopoiese na Medula Óssea e Maturação das Enzimas Digestivas",
          "biologicalStage": "Feto",
          "lengthMetric": "26.7 cm (10.5 in CCT)",
          "weightMetric": "360 g (12,7 oz)",
          "heartRateBpm": "120 – 155 BPM",
          "keyOrgans": [
            "Eritropoiese na Medula Óssea",
            "Vilosidades do Intestino Delgado",
            "Polpa Vermelha Esplênica",
            "Labirinto Vestibular"
          ],
          "fetalMilestones": [
            "O trato digestivo absorve água e açúcares do líquido amniótico deglutido (~24 L / ~25 qt filtrados ao longo da gestação).",
            "As microvilosidades intestinais expressam enzimas dissacaridases (lactase, sacarase), absorvendo água e eletrólitos do líquido amniótico.",
            "Os canais semicirculares vestibulares na orelha interna percebem o movimento materno, embalando o feto quando você caminha."
          ],
          "maternalPhysiology": "O hormônio relaxina flexibiliza a sínfise púbica e as articulações sacroilíacas para o parto, podendo causar leve desconforto pélvico.",
          "doctorCheckIn": "Se o ultrassom de 20 semanas teve visualização parcial devido à posição fetal, um breve exame complementar é agendado em 2–4 semanas.",
          "clinicalPearl": "Por que o bebê parece mais ativo à noite: Caminhar durante o dia embala o feto para dormir; quando você se deita em silêncio à noite, o estado de alerta fetal aumenta."
        },
        "22": {
          "phaseLabel": "2.º Trimestre — Integração Auditiva e Tátil",
          "stageTitle": "Reconhecimento Auditivo da Voz, Sobrancelhas e Reflexo de Preensão",
          "biologicalStage": "Feto",
          "lengthMetric": "27.8 cm (10.9 in CCT)",
          "weightMetric": "430 g (15,2 oz)",
          "heartRateBpm": "120 – 155 BPM",
          "keyOrgans": [
            "Via Cóclea-Córtex Auditivo",
            "Reflexo de Preensão Palmar",
            "Ductos Lacrimais",
            "Primórdios de Ductos Alveolares"
          ],
          "fetalMilestones": [
            "As respostas auditivas do tronco encefálico amadurecem; o feto ouve e começa a reconhecer a cadência da voz materna.",
            "Desenvolve-se o reflexo de preensão palmar — o feto frequentemente segura o cordão umbilical (protegido pela geleia de Wharton).",
            "Sobrancelhas e fios finos no couro cabeludo são visíveis, embora a melanina ainda não esteja totalmente depositada."
          ],
          "maternalPhysiology": "Hemodiluição fisiológica: o volume plasmático cresce mais rápido (~45–50%) que a massa eritrocitária (~25–30%), causando queda fisiológica da hemoglobina.",
          "doctorCheckIn": "Se indicado (concepção por FIV, diabetes prévio ou histórico familiar de cardiopatia congênita), realiza-se Ecocardiograma Fetal especializado entre as Semanas 20–22.",
          "clinicalPearl": "Contrações de Braxton Hicks (endurecimento uterino indolor e irregular durando <30 segundos) podem surgir na segunda metade da gestação e cedem com hidratação e repouso."
        },
        "23": {
          "phaseLabel": "2.º Trimestre — Limiar Pulmonar Periviável",
          "stageTitle": "Pneumócitos Tipo II e Síntese Inicial de Lipoproteínas do Surfactante",
          "biologicalStage": "Feto (Janela de Viabilidade Neonatal)",
          "lengthMetric": "28.9 cm (11.4 in CCT)",
          "weightMetric": "500 g (1,1 lb)",
          "heartRateBpm": "120 – 155 BPM",
          "keyOrgans": [
            "Pneumócitos Alveolares Tipo II",
            "Leito Capilar Pulmonar",
            "Sono REM (Movimento Rápido dos Olhos)",
            "Ilhotas de Langerhans"
          ],
          "fetalMilestones": [
            "Os pneumócitos cuboidais Tipo II diferenciam-se nas vias aéreas distais e começam a sintetizar corpos lamelares de surfactante inicial.",
            "Os capilares pulmonares aproximam-se do epitélio respiratório, estabelecendo a barreira hemato-aérea primitiva.",
            "Iniciam-se os ciclos de sono REM (Movimento Rápido dos Olhos), essenciais para a formação de circuitos neurais no córtex."
          ],
          "maternalPhysiology": "O deslocamento superior do estômago e o relaxamento do esfíncter esofágico inferior pela progesterona podem causar refluxo gastroesofágico (azia).",
          "doctorCheckIn": "Reconheça os sinais de Trabalho de Parto Prematuro: pressão pélvica ou cólicas regulares (>4–6 contrações/hora), dor lombar contínua ou perda de líquido/sangue.",
          "clinicalPearl": "As Semanas 23–24 representam o limiar de viabilidade em UTIs Neonatais modernas, onde corticoides antenatais (betametasona) aceleram a maturação pulmonar se houver risco de parto prematuro."
        },
        "24": {
          "phaseLabel": "2.º Trimestre — Viabilidade Neonatal e Rastreio Glicêmico",
          "stageTitle": "Transição Pulmonar Sacular, Marco de Viabilidade e Abertura da Janela de Rastreio de DMG",
          "biologicalStage": "Feto",
          "lengthMetric": "30.0 cm (11.8 in CCT)",
          "weightMetric": "600 g (1,32 lb)",
          "heartRateBpm": "120 – 155 BPM",
          "keyOrgans": [
            "Sáculos Terminais (Pulmões)",
            "Sistema Vestibular da Orelha Interna",
            "Células Beta Pancreáticas Fetais",
            "Capilares Cutâneos"
          ],
          "fetalMilestones": [
            "Os pulmões transitam da fase canalicular para a sacular: sáculos terminais brotam nas extremidades dos bronquíolos respiratórios.",
            "O aparelho vestibular da orelha interna está estruturalmente maduro, dando ao feto orientação espacial completa no saco amniótico.",
            "Os leitos capilares subcutâneos enchem-se de sangue, mudando a pele fetal de translúcida para rosada."
          ],
          "maternalPhysiology": "A secreção placentária de lactogênio placentário humano (hPL) e cortisol eleva-se no final do 2.º trimestre, gerando resistência fisiológica à insulina para direcionar glicose ao feto.",
          "doctorCheckIn": "Consulta de 24 Semanas + Janela de Rastreamento de Diabetes Gestacional (Semanas 24–28): Solicitação do teste oral de tolerância à glicose de 1 hora com 50 g (GCT) e hemograma/Coombs do 3º trimestre.",
          "clinicalPearl": "Por que o Diabetes Gestacional (DMG) é rastreado entre 24–28 semanas: Os hormônios contrainsulínicos placentários (hPL) sobem acentuadamente na Semana 24, revelando insuficiência pancreática em ~6–9% das gestações."
        },
        "25": {
          "phaseLabel": "2.º Trimestre — Vascularização Pulmonar e Patência Nasal",
          "stageTitle": "Dissolução dos Tampões Nasais, Arborização Capilar e Ossificação Espinhal",
          "biologicalStage": "Feto",
          "lengthMetric": "34.6 cm (13.6 in CCT)",
          "weightMetric": "660 g (1,45 lb)",
          "heartRateBpm": "120 – 155 BPM",
          "keyOrgans": [
            "Narinas Pérvias",
            "Surfactante Pulmonar (SP-B/SP-C)",
            "Ossificação do Arco Vertebral",
            "Circuitos de Dominância Manual"
          ],
          "fetalMilestones": [
            "Os tampões epiteliais dentro das narinas dissolvem-se, abrindo as vias nasais para os movimentos respiratórios no líquido amniótico.",
            "As proteínas do surfactante B e C (SP-B, SP-C) aumentam dentro dos pneumócitos Tipo II.",
            "As estruturas da coluna vertebral (33 anéis, 150 articulações, 1.000 ligamentos) fortalecem-se para sustentar o peso corporal."
          ],
          "maternalPhysiology": "A pressão venosa nos membros inferiores aumenta, podendo causar cãibras noturnas nas panturrilhas ou leve inchaço nos tornozelos ao fim do dia.",
          "doctorCheckIn": "Realize o teste de rastreamento de glicose de 1 hora (50 g) ou TOTG entre as semanas 24 e 28. Não é necessário jejum para o teste de triagem de 1 hora, salvo orientação médica.",
          "clinicalPearl": "Se o seu teste de triagem de 1 hora der ≥135–140 mg/dL, não entre em pânico: é um exame de rastreamento, não um diagnóstico. Cerca de 75–80% das gestantes que fazem a curva diagnóstica de 3 horas com 100 g em jejum têm resultado normal."
        },
        "26": {
          "phaseLabel": "2.º Trimestre — Despertar Visual e Abertura Palpebral",
          "stageTitle": "Separação das Pálpebras, Reflexo de Piscar-Sobressalto e Bastonetes Retinianos",
          "biologicalStage": "Feto",
          "lengthMetric": "35.6 cm (14.0 in CCT)",
          "weightMetric": "760 g (1,68 lb)",
          "heartRateBpm": "120 – 155 BPM",
          "keyOrgans": [
            "Fotorreceptores Retinianos",
            "Mielinização do Nervo Óptico",
            "Reflexo de Sobressalto Vibroacústico",
            "Descida Inguinal Testicular"
          ],
          "fetalMilestones": [
            "As pálpebras fundidas separam-se e abrem-se pela primeira vez desde a Semana 9; o feto pisca em resposta a luzes ou sons altos (reflexo de sobressalto).",
            "Os bastonetes e cones retinianos diferenciam-se no fundo do olho.",
            "Em fetos masculinos, o gubernáculo guia os testículos pelo canal inguinal em direção ao escroto."
          ],
          "maternalPhysiology": "A circunferência da caixa torácica expande-se 5–7 cm à medida que o diafragma sobe ~4 cm; o volume corrente respiratório aumenta 30–40%.",
          "doctorCheckIn": "Revise com seu médico os resultados de hemoglobina/hematócrito e ferritina para avaliar anemia ferropriva (Hb <10,5 g/dL no 2.º tri ou <11,0 g/dL no 3.º tri).",
          "clinicalPearl": "Tomar o suplemento de ferro com Vitamina C (suco de laranja) ou em dias alternados melhora a absorção duodenal e reduz a constipação."
        },
        "27": {
          "phaseLabel": "2.º Trimestre — Última Semana do 2.º Trimestre",
          "stageTitle": "Vias Talamocorticais da Dor, Soluços Fetais e Abertura da Janela da Vacina dTpa (Tdap)",
          "biologicalStage": "Feto",
          "lengthMetric": "36.6 cm (14.4 in CCT)",
          "weightMetric": "875 g (1,93 lb)",
          "heartRateBpm": "120 – 155 BPM",
          "keyOrgans": [
            "Início dos Giros Cerebrais",
            "Nervo Frênico / Diafragma",
            "Baço e Timo Fetal",
            "Gordura Branca Subcutânea"
          ],
          "fetalMilestones": [
            "Espasmos diafragmáticos rítmicos (soluços fetais) tornam-se frequentes e palpáveis como toques suaves e regulares a cada poucos segundos.",
            "Os hemisférios cerebrais começam a formar sulcos e giros primários para expandir a superfície cortical.",
            "Os linfócitos T amadurecem no timo fetal."
          ],
          "maternalPhysiology": "No encerramento do segundo trimestre, o fundo uterino está ~7 cm acima do umbigo; retenção hídrica pode causar leve formigamento nas mãos (túnel do carpo).",
          "doctorCheckIn": "Abre-se a Janela da Vacina dTpa (Semanas 27–36): CDC e ACOG recomendam a dTpa em TODA gestação entre 27 e 36 semanas (idealmente entre 27 e 30 semanas) para maximizar a transferência de IgG materna contra coqueluche ao recém-nascido.",
          "clinicalPearl": "Os soluços fetais são um sinal normal de maturação do nervo frênico e do centro respiratório; parecem um pulso rítmico que dura de 5 a 15 minutos."
        },
        "28": {
          "phaseLabel": "3.º Trimestre — Início e Transição para Consultas Quinzenais",
          "stageTitle": "Entrada no 3.º Trimestre, Profilaxia com RhoGAM e Contagem Diária de Movimentos",
          "biologicalStage": "Feto do 3.º Trimestre",
          "lengthMetric": "37.6 cm (14.8 in CCT)",
          "weightMetric": "1.005 g (2,22 lb — Marco de 1 kg!)",
          "heartRateBpm": "115 – 155 BPM",
          "keyOrgans": [
            "Reflexo Fotomotor Pupilar",
            "Síntese de Lecitina do Surfactante",
            "Folhas Cerebelares",
            "Expressão do Antígeno Rh(D)"
          ],
          "fetalMilestones": [
            "O feto ultrapassa o marco de 1 quilograma (2,2 lb); o tecido adiposo branco subcutâneo atinge ~2–3% do peso corporal.",
            "As pupilas contraem e dilatam em resposta à luz; os ciclos de sono mostram padrões distintos de ondas cerebrais REM e não-REM.",
            "A produção de surfactante broncopulmonar acelera, elevando a relação lecitina/esfingomielina (L/E)."
          ],
          "maternalPhysiology": "Bem-vinda ao Terceiro Trimestre. O fluxo sanguíneo uterino atinge ~500–700 mL/minuto (~80% perfundindo a placenta).",
          "doctorCheckIn": "Consulta de 28 Semanas (Transição para Consultas Quinzenais de 2 em 2 semanas): Avaliar exame de glicose de 1 hora, aplicar vacina dTpa, administrar Imunoglobulina Anti-D (RhoGAM 300 mcg IM) se mãe Rh negativo e iniciar contagem diária de movimentos fetais.",
          "clinicalPearl": "Protocolo ACOG de Contagem de Movimentos Fetais (A partir da 28ª Semana): Uma vez ao dia (após uma refeição), deite-se sobre o lado esquerdo e cronometre o tempo até sentir 10 movimentos distintos (chutes, giros — não soluços). O normal é <2 horas (geralmente <30 min). Se <10 movimentos em 2 horas, procure a maternidade imediatamente."
        },
        "29": {
          "phaseLabel": "3.º Trimestre — Mineralização Esquelética Acelerada",
          "stageTitle": "Acreção Rápida de Cálcio e Termorregulação Hipotalâmica",
          "biologicalStage": "Feto",
          "lengthMetric": "38.6 cm (15.2 in CCT)",
          "weightMetric": "1.150 g (2,54 lb)",
          "heartRateBpm": "115 – 155 BPM",
          "keyOrgans": [
            "Acreção de Cálcio por Osteoblastos",
            "Núcleo Pré-Óptico Hipotalâmico",
            "Síntese Adrenal de DHEA-S",
            "Septação Alveolar"
          ],
          "fetalMilestones": [
            "A placenta bombeia ativamente ~250–300 mg de cálcio elementar por dia da circulação materna para o esqueleto fetal.",
            "O hipotálamo amadurece seus circuitos centrais de termorregulação.",
            "As glândulas adrenais fetais crescem e secretam DHEA-S, convertido em estriol pela placenta."
          ],
          "maternalPhysiology": "O peso fetal crescente e a lordose lombar deslocam o centro de gravidade; calçados confortáveis e exercícios de inclinação pélvica reduzem a sobrecarga lombar.",
          "doctorCheckIn": "Sem consulta de rotina nesta semana (ritmo quinzenal: próxima visita na Semana 30). Monitore os movimentos fetais diariamente.",
          "clinicalPearl": "No terceiro trimestre, o feto adquire 80% de suas reservas totais de cálcio ósseo e ferro — garanta 1.000 mg/dia de cálcio alimentar e ingestão regular de ferro."
        },
        "30": {
          "phaseLabel": "3.º Trimestre — Dobramento Cortical e Domínio Medular",
          "stageTitle": "Aprofundamento dos Giros Cerebrais, Domínio da Medula Óssea e Pico de Líquido Amniótico",
          "biologicalStage": "Feto",
          "lengthMetric": "39.9 cm (15.7 in CCT)",
          "weightMetric": "1.320 g (2,91 lb)",
          "heartRateBpm": "115 – 155 BPM",
          "keyOrgans": [
            "Sulcos Cerebrais Secundários e Terciários",
            "Medula Óssea Dominante",
            "Ciclos Respiratórios Diafragmáticos",
            "Início da Queda do Lanugo"
          ],
          "fetalMilestones": [
            "O córtex cerebral passa por rápida girificação, formando sulcos secundários profundos que sustentam a cognição.",
            "A medula óssea é agora o principal órgão hematopoiético; as hemácias fetais circulam com meia-vida de ~60–90 dias.",
            "Com o espessamento da gordura subcutânea, o lanugo inicial começa a se desprender no líquido amniótico."
          ],
          "maternalPhysiology": "O volume de líquido amniótico aproxima-se do pico fisiológico (~800–1.000 mL entre as Semanas 30 e 34) antes de reduzir gradualmente até o termo.",
          "doctorCheckIn": "Consulta Quinzenal de 30 Semanas: Pressão arterial, fita urinária, medida da altura uterina (~28–32 cm), batimentos cardiofetais e revisão dos sinais de alerta.",
          "clinicalPearl": "Se a altura uterina diferir em >3 cm da idade gestacional em semanas, o obstetra solicitará um ultrassom obstétrico com avaliação de crescimento e líquido amniótico."
        },
        "31": {
          "phaseLabel": "3.º Trimestre — Sinaptogênese e Aumento de Gordura Subcutânea",
          "stageTitle": "Trilhões de Conexões Sinápticas e Acreção Cerebral de DHA",
          "biologicalStage": "Feto",
          "lengthMetric": "41.1 cm (16.2 in CCT)",
          "weightMetric": "1.500 g (3,31 lb)",
          "heartRateBpm": "115 – 155 BPM",
          "keyOrgans": [
            "Circuito Retina-Córtex Visual",
            "Membranas Fosfolipídicas de DHA",
            "Filtração Glomerular Renal",
            "Coordenação Sucção-Deglutição"
          ],
          "fetalMilestones": [
            "O cérebro fetal acumula ~50–70 mg/dia de ômega-3 DHA nas membranas neuronais e fotorreceptores da retina.",
            "Todos os cinco sentidos (visão, audição, paladar, olfato via líquido amniótico e tato) estão funcionalmente ativos.",
            "O feto ganha cerca de 150–200 gramas (0,35–0,5 lb) por semana a partir de agora até o termo."
          ],
          "maternalPhysiology": "O colostro (pré-leite rico em imunoglobulina A) já é sintetizado nos alvéolos mamários, podendo haver saída ocasional de pequenas gotas.",
          "doctorCheckIn": "Em gestações de alto risco (idade ≥35–40 anos, DMG com medicação, hipertensão crônica ou gemelar), a cardiotocografia (NST) ou perfil biofísico fetal (PBF) semanal costuma começar na 32ª semana.",
          "clinicalPearl": "Memória gustativa intraútero: Compostos aromáticos da dieta materna passam para o líquido amniótico e são degustados pelo feto, influenciando a aceitação alimentar pós-natal."
        },
        "32": {
          "phaseLabel": "3.º Trimestre — Posicionamento Cefálico e Proteção VSR",
          "stageTitle": "Versão Cefálica, Unhas das Mãos Completas e Janela da Vacina contra VSR",
          "biologicalStage": "Feto (Fase de Posicionamento Cefálico)",
          "lengthMetric": "42.4 cm (16.7 in CCT)",
          "weightMetric": "1.700 g (3,75 lb)",
          "heartRateBpm": "110 – 155 BPM",
          "keyOrgans": [
            "Apresentação Cefálica",
            "Fosfatidilglicerol do Surfactante",
            "Leito Ungueal Completo",
            "Pico de Transferência Materno-Fetal de IgG"
          ],
          "fetalMilestones": [
            "Cerca de 85–90% dos fetos giram para a apresentação cefálica (cabeça para baixo) acomodando-se ao formato uterino.",
            "As unhas das mãos alcançam a ponta dos dedos; a pele torna-se lisa e opaca com a gordura subcutânea atingindo ~7–8% do peso.",
            "Movimentos respiratórios fetais ocorrem em 30–40% do tempo de sono ativo, um marcador importante no Perfil Biofísico Fetal."
          ],
          "maternalPhysiology": "O volume plasmático materno atinge sua expansão máxima (+45–50% acima do basal), exigindo trabalho máximo do sistema cardiovascular.",
          "doctorCheckIn": "Consulta Quinzenal de 32 Semanas + Janela da Vacina Materna contra VSR (Semanas 32–36): CDC e ACOG recomendam 1 dose da vacina materna contra VSR (Abrysvo) entre 32w0d e 36w6d durante a sazonalidade para proteger o recém-nascido contra bronquiolite grave.",
          "clinicalPearl": "Por que os movimentos mudam após 32 semanas: Com menos espaço livre, chutes amplos dão lugar a rolamentos fortes e espreguiçamentos — mas a frequência diária de movimentos NÃO deve diminuir!"
        },
        "33": {
          "phaseLabel": "3.º Trimestre — Transferência de IgG e Maleabilidade Craniana",
          "stageTitle": "Fontanelas Cranianas, Pico de Transferência de IgG e Coordenação da Sucção",
          "biologicalStage": "Feto",
          "lengthMetric": "43.7 cm (17.2 in CCT)",
          "weightMetric": "1.920 g (4,23 lb)",
          "heartRateBpm": "110 – 155 BPM",
          "keyOrgans": [
            "Fontanelas Anterior e Posterior",
            "Tríade Sucção-Deglutição-Respiração",
            "Nefrogênese Próxima da Conclusão",
            "Transporte Placentário de IgG"
          ],
          "fetalMilestones": [
            "Embora os ossos longos estejam calcificados, as placas cranianas permanecem separadas por suturas fibrosas e fontanelas («moleiras») para permitir a moldagem no canal de parto.",
            "Os níveis de anticorpos IgG transplacentários no feto aproximam-se e logo superarão as concentrações séricas maternas.",
            "Os núcleos do tronco encefálico começam a coordenar a tríade rítmica de sucção-deglutição-respiração."
          ],
          "maternalPhysiology": "O fundo uterino aproxima-se do apêndice xifoide; refeições menores e mais frequentes e elevar a cabeceira aliviam o refluxo.",
          "doctorCheckIn": "Escolha o Pediatra que acompanhará o bebê, verifique a cobertura do plano de saúde para o recém-nascido e instale o bebê-conforto voltado para trás no carro.",
          "clinicalPearl": "As acelerações transitórias da frequência cardíaca fetal (aumento ≥15 BPM por ≥15 segundos ao se mover) demonstram excelente oxigenação fetal."
        },
        "34": {
          "phaseLabel": "3.º Trimestre — Limiar Pré-Termo Tardio e Nefrogênese Completa",
          "stageTitle": "Conclusão da Nefrogênese Permanente e Pico de Surfactante Pulmonar",
          "biologicalStage": "Feto no Limiar Pré-Termo Tardio",
          "lengthMetric": "45.0 cm (17.7 in CCT)",
          "weightMetric": "2.150 g (4,74 lb)",
          "heartRateBpm": "110 – 155 BPM",
          "keyOrgans": [
            "1 Milhão de Néfrons por Rim",
            "Surfactante de Fosfatidilcolina",
            "Espessamento do Vernix Caseoso",
            "Descida Testicular ao Escroto"
          ],
          "fetalMilestones": [
            "A nefrogênese humana (formação de novos néfrons) completa-se permanentemente entre as Semanas 34 e 36 com ~1 milhão de néfrons por rim.",
            "A secreção de surfactante pulmonar dispara; bebês nascidos a partir de 34 semanas têm >98% de sobrevida sem morbidade respiratória tardia.",
            "A camada de vernix caseoso é espessa e cremosa; as unhas das mãos e dos pés estão bem formadas."
          ],
          "maternalPhysiology": "O inchaço fisiológico nos tornozelos à noite é comum, mas edema súbito na face ou mãos acompanhado de cefaleia ou alterações visuais exige aferição imediata da pressão.",
          "doctorCheckIn": "Consulta Quinzenal de 34 Semanas: Pressão arterial e rastreio de pré-eclâmpsia, altura uterina, batimentos fetais, manobras de Leopold e revisão do plano de parto.",
          "clinicalPearl": "A Semana 34 é um marco obstétrico: após 34s0d, raramente se utilizam tocolíticos para inibir o trabalho de parto devido à avançada maturidade pulmonar fetal."
        },
        "35": {
          "phaseLabel": "3.º Trimestre — Maturidade Hepática e Reserva Metabólica",
          "stageTitle": "Reserva Hepática de Glicogênio, Estoques de Ferro e Rápido Ganho Adiposo",
          "biologicalStage": "Feto",
          "lengthMetric": "46.2 cm (18.2 in CCT)",
          "weightMetric": "2.385 g (5,25 lb)",
          "heartRateBpm": "110 – 150 BPM",
          "keyOrgans": [
            "Reservas Hepáticas de Glicogênio e Ferro",
            "Conjugação de Bilirrubina (UGT1A1)",
            "Gordura Subcutânea (10% do Peso)",
            "Reflexo de Sucção Coordenado"
          ],
          "fetalMilestones": [
            "O fígado fetal armazena rapidamente glicogênio (para manter a glicemia logo após o clampeamento do cordão) e ferritina.",
            "Rins e fígado estão estruturalmente completos e amadurecem vias enzimáticas como a UGT1A1 para metabolizar a bilirrubina.",
            "O feto ganha ~30 gramas (1 oz) de gordura todos os dias."
          ],
          "maternalPhysiology": "A pressão pélvica aumenta à medida que o segmento uterino inferior se distende; a frequência urinária retorna com a descida da cabeça fetal.",
          "doctorCheckIn": "Na próxima semana (Semana 36) iniciam-se as consultas SEMANAIS, incluindo a coleta do cotonete para Estreptococo do Grupo B (EGB) e confirmação da apresentação.",
          "clinicalPearl": "Organize a mala da maternidade até a Semana 35 (documentos, cartão de pré-natal, plano de parto, sutiã de amamentação, carregador, roupas do bebê)."
        },
        "36": {
          "phaseLabel": "3.º Trimestre — Consultas Semanais e Rastreio de EGB",
          "stageTitle": "Fase Pulmonar Alveolar, Rastreio de EGB (GBS) e Insinuação Fetal",
          "biologicalStage": "Feto Pré-Termo Tardio (Início de Controle Semanal)",
          "lengthMetric": "47.4 cm (18.7 in CCT)",
          "weightMetric": "2.620 g (5,78 lb)",
          "heartRateBpm": "110 – 150 BPM",
          "keyOrgans": [
            "Alvéolos Pulmonares Verdadeiros",
            "Desprendimento de Vernix no Líquido Amniótico",
            "Insinuação Cefálica na Pelve",
            "Cólon Preenchido por Mecônio"
          ],
          "fetalMilestones": [
            "Os pulmões entram na Fase Alveolar final (da Semana 36 até a primeira infância), formando alvéolos verdadeiros prontos para a troca gasosa.",
            "O vernix caseoso e o lanugo desprendidos misturam-se ao líquido amniótico e são deglutidos para formar o mecônio.",
            "Em primeiras gestações, a cabeça fetal costuma encaixar («insinuação») na entrada da pelve."
          ],
          "maternalPhysiology": "Quando o bebê encaixa, a pressão sob as costelas alivia (facilitando a respiração), enquanto aumenta a pressão no assoalho pélvico.",
          "doctorCheckIn": "Consulta de 36 Semanas (Início das Consultas Semanais!): Coleta do swab vaginorretal para Estreptococo do Grupo B (EGB, entre 36s0d e 37s6d) e confirmação da apresentação cefálica.",
          "clinicalPearl": "Por que pesquisar EGB entre 36 e 37 semanas: ~25% das gestantes saudáveis colonizam Estreptococo do Grupo B sem sintomas. Se positivo, penicilina/ampicilina IV no parto reduz o risco de sepse neonatal em >80%. Se o feto estiver pélvico na 36ª semana, discute-se a Versão Cefálica Externa (VCE) para a 37ª semana."
        },
        "37": {
          "phaseLabel": "3.º Trimestre — Termo Precoce (37s0d–38s6d)",
          "stageTitle": "Marco do Termo Precoce, Janela de VCE e Regra de Triagem do Parto (5-1-1)",
          "biologicalStage": "Feto a Termo Precoce",
          "lengthMetric": "48.6 cm (19.1 in CCT)",
          "weightMetric": "2.860 g (6,30 lb)",
          "heartRateBpm": "110 – 150 BPM",
          "keyOrgans": [
            "Relação L/E de Surfactante Maduro ≥2:1",
            "Tratos Corticoespinhais Mielinizados",
            "Patência do Ducto Arterioso",
            "Coxins Adiposos Bucais de Sucção"
          ],
          "fetalMilestones": [
            "Com 37s0d, a gestação atinge o «Termo Precoce» (o ACOG define Termo Precoce como 37s0d–38s6d, e Termo Completo como 39s0d–40s6d).",
            "As bolsas de gordura bucal preenchem as bochechas, garantindo estabilidade mecânica de sucção para a amamentação.",
            "O pico de cortisol adrenal fetal ativa os canais de reabsorção de fluido pulmonar (ENaC) para limpar os pulmões ao nascer."
          ],
          "maternalPhysiology": "O amadurecimento cervical inicia-se silenciosamente: as fibras colágenas remodelam-se, amolecendo o colo uterino.",
          "doctorCheckIn": "Consulta Semanal de 37 Semanas: Revisar resultado do EGB, pressão arterial, batimentos cardiofetais e orientar sobre a Regra de Trabalho de Parto «5-1-1 / 4-1-1», bolsa rota e quando ir à maternidade.",
          "clinicalPearl": "Por que o ACOG evita partos eletivos antes de 39s0d sem indicação médica: Entre as Semanas 37 e 39, o cérebro fetal cresce ~30% em peso e a transição respiratória se completa."
        },
        "38": {
          "phaseLabel": "3.º Trimestre — Termo Precoce (38 Semanas)",
          "stageTitle": "Pico de Fosfatidilglicerol do Surfactante, Cordas Vocais e Reflexos",
          "biologicalStage": "Feto a Termo Precoce",
          "lengthMetric": "49.8 cm (19.6 in CCT)",
          "weightMetric": "3.080 g (6,79 lb)",
          "heartRateBpm": "110 – 150 BPM",
          "keyOrgans": [
            "Fosfatidilglicerol (PG) Positivo",
            "Shunts Cardíacos Fetais (Forame Oval)",
            "Glândulas Lacrimais e Salivares",
            "15% de Gordura Corporal"
          ],
          "fetalMilestones": [
            "A presença de fosfatidilglicerol (PG) no líquido amniótico confirma a maturidade bioquímica pulmonar completa.",
            "A gordura corporal compõe agora ~15% do peso fetal total, permitindo regulação térmica independente após o parto.",
            "As cordas vocais, os arcos reflexos neurológicos (Moro, busca, sucção, preensão) e os órgãos sensoriais estão prontos para a vida extrauterina."
          ],
          "maternalPhysiology": "A perda do tampão mucoso e o aumento da pressão pélvica ou contrações prodrômicas irregulares podem ocorrer dias antes do trabalho de parto ativo.",
          "doctorCheckIn": "Consulta Semanal de 38 Semanas: Pressão arterial, exame de urina, batimentos fetais, altura uterina e orientações sobre puerpério, amamentação e contracepção pós-parto.",
          "clinicalPearl": "Trabalho de Parto Verdadeiro vs. Braxton Hicks: As contrações de Braxton Hicks são irregulares e param com repouso/hidratação. As contrações verdadeiras tornam-se progressivamente mais longas, fortes e próximas."
        },
        "39": {
          "phaseLabel": "3.º Trimestre — Termo Completo (39s0d–40s6d)",
          "stageTitle": "Marco do Termo Completo, Índice de Bishop e Discussão do Estudo ARRIVE",
          "biologicalStage": "Feto a Termo Completo",
          "lengthMetric": "50.7 cm (20.0 in CCT)",
          "weightMetric": "3.290 g (7,25 lb)",
          "heartRateBpm": "110 – 150 BPM",
          "keyOrgans": [
            "Córtex Cerebral a Termo Completo",
            "Renovação Epidérmica",
            "Sinalização Placentária de Ocitocina",
            "Enzimas Hepáticas Maduras"
          ],
          "fetalMilestones": [
            "Parabéns — com 39s0d seu bebê atinge oficialmente o «TERMO COMPLETO» pelas diretrizes do ACOG e da SMFM!",
            "Os pulmões fetais secretam proteínas do surfactante no líquido amniótico, ativando receptores uterinos de ocitocina que desencadeiam o trabalho de parto espontâneo.",
            "Uma nova camada epidérmica substitui as células descamadas; o vernix permanece principalmente nas dobrinhas da pele."
          ],
          "maternalPhysiology": "O apagamento cervical (afinamento de 0% a 100%) e a dilatação (abertura de 0 a 10 cm) progridem antes e durante a primeira fase do parto.",
          "doctorCheckIn": "Consulta Semanal de 39 Semanas: Exame de toque opcional (índice de Bishop), descolamento de membranas opcional ou conversa sobre indução eletiva às 39 semanas conforme o estudo ARRIVE.",
          "clinicalPearl": "Estudo ARRIVE (NEJM 2018): Em nulíparas de baixo risco, a indução eletiva entre 39w0d e 39w4d mostrou taxa ligeiramente menor de cesariana (18,6% vs 22,2%) e menor hipertensão gestacional em comparação à conduta expectante, tornando tanto aguardar o parto espontâneo quanto a indução com 39 semanas opções seguras."
        },
        "40": {
          "phaseLabel": "3.º Trimestre — Data Provável do Parto (DPP / 40 Semanas)",
          "stageTitle": "Data Provável do Parto (40w0d) e Prontidão para a Transição Cardiopulmonar",
          "biologicalStage": "Feto a Termo Completo",
          "lengthMetric": "51.2 cm (20.2 in CCT)",
          "weightMetric": "3.460 g (7,63 lb)",
          "heartRateBpm": "110 – 150 BPM",
          "keyOrgans": [
            "Forame Oval e Ducto Arterioso Prontos para Fechar",
            "300 Centros de Ossificação",
            "Imunidade Passiva Materna por IgG",
            "Suturas Cranianas para Moldagem"
          ],
          "fetalMilestones": [
            "Ao nascer, o primeiro choro expande os pulmões e reduz a resistência vascular pulmonar em 80%, fechando funcionalmente o Forame Oval e o Canal Arterial.",
            "Um recém-nascido a termo possui ~300 centros ósseos/cartilaginosos (que se fundem nos 206 ossos adultos) e capacidade gástrica do tamanho de uma cereja (~5–7 mL no 1º dia, ideal para o colostro).",
            "A acuidade visual ao nascer foca precisamente a 20–30 cm (8–12 polegadas) — a distância exata entre o colo/seio e o rosto dos pais."
          ],
          "maternalPhysiology": "Apenas ~4–5% dos bebês nascem exatamente na Data Provável do Parto; cerca de 50% das primigestas entram em trabalho de parto espontâneo entre 40s0d e 41s3d.",
          "doctorCheckIn": "Consulta de 40 Semanas (DPP): Pressão arterial, batimentos fetais, avaliação cervical se desejada e agendamento da vitalidade fetal da Semana 41 (CTG + ILA/PBF) e data de indução.",
          "clinicalPearl": "Lembre-se dos 4 parâmetros da Bolsa Rota (COAT): Se a bolsa romper, observe a Cor (clara vs. esverdeada/mecônio), Odor, Quantidade e Horário, e ligue para a maternidade imediatamente — mesmo que não haja contrações."
        },
        "41": {
          "phaseLabel": "Termo Tardio — Vigilância Fetal (41s0d–41s6d)",
          "stageTitle": "Vigilância Fetal de Termo Tardio (NST / PBF) e Planejamento da Indução",
          "biologicalStage": "Feto de Termo Tardio",
          "lengthMetric": "51.7 cm (20.4 in CCT)",
          "weightMetric": "3.600 g (7,94 lb)",
          "heartRateBpm": "110 – 150 BPM",
          "keyOrgans": [
            "Monitoramento da Reserva Placentária",
            "Índice de Líquido Amniótico (ILA)",
            "Pele Seca/Descamativa (Pouco Vernix)",
            "Unhas Longas além das Pontas dos Dedos"
          ],
          "fetalMilestones": [
            "Entre 41s0d e 41s6d, a gestação é classificada pelo ACOG como «Termo Tardio» (Late-Term).",
            "A maior parte do vernix caseoso já foi reabsorvida, de modo que recém-nascidos de termo tardio costumam ter pele levemente seca nas palmas e plantas e unhas compridas.",
            "O estado de alerta fetal e a maturidade neurológica estão plenamente desenvolvidos."
          ],
          "maternalPhysiology": "O volume de líquido amniótico reduz naturalmente no termo tardio com o amadurecimento placentário.",
          "doctorCheckIn": "Consulta de 41 Semanas e Vigilância Bisemanal: Realizar cardiotocografia (NST) mais Índice de Líquido Amniótico (ILA) / Maior Bolsão Vertical (≥2 cm) ou Perfil Biofísico Fetal completo (PBF, pontuado em 8 ou 10). Programar indução do parto antes de 42w0d.",
          "clinicalPearl": "As diretrizes do ACOG recomendam vigilância fetal anteparto a partir de 41w0d e parto entre 41w0d e 41w6d para evitar insuficiência placentária pós-termo."
        },
        "42": {
          "phaseLabel": "Janela de Parto Pós-Termo (42s0d)",
          "stageTitle": "Indução Ativa do Trabalho de Parto, Nascimento e Hora Dourada",
          "biologicalStage": "Marco Pós-Termo / Nascimento",
          "lengthMetric": "52.0 cm (20.5 in CCT)",
          "weightMetric": "3.685 g (8,12 lb)",
          "heartRateBpm": "110 – 150 BPM",
          "keyOrgans": [
            "Clampeamento Tardio do Cordão (30–60 s)",
            "Hora Dourada Pele a Pele",
            "Escala de APGAR (1 e 5 min)",
            "Vitamina K e Profilaxia Ocular Neonatal"
          ],
          "fetalMilestones": [
            "O ACOG recomenda o parto até no máximo 42s0d (via amadurecimento cervical com sonda de Foley/misoprostol e indução com ocitocina caso o trabalho de parto espontâneo não tenha ocorrido).",
            "Ao nascer, recomenda-se o Clampeamento Tardio do Cordão Umbilical por 30–60 segundos, transferindo ~80 mL de sangue placentário para reforçar os estoques de ferro do bebê nos primeiros 6 meses.",
            "O Contato Pele a Pele imediato («Hora Dourada») estabiliza a temperatura, glicemia e frequência cardíaca do recém-nascido e estimula a amamentação."
          ],
          "maternalPhysiology": "O terceiro período do parto (dequitação) libera a placenta em 5–30 minutos após o nascimento; a contração uterina comprime as artérias espiraladas prevenindo a hemorragia pós-parto.",
          "doctorCheckIn": "Parto e Cuidados Pós-Parto Imediatos: Índice de Apgar (1º e 5º min), vitamina K intramuscular neonatal (previne doença hemorrágica), vacina contra Hepatite B, triagens neonatais, avaliação materna em 2–3 semanas (pressão/humor) e consulta puerperal completa em 6 semanas.",
          "clinicalPearl": "Sinais de Alerta Pós-Parto («POST-BIRTH»): Nas 6 semanas após o parto, procure emergência se houver dor torácica/falta de ar, convulsões, pensamentos de autolesão, sangramento >1 absorvente/hora por 2 horas, infecção na cicatriz, dor/vermelhidão na panturrilha, febre ≥38,0 °C (100,4 °F) ou cefaleia forte com PA ≥140/90."
        }
      },
      "appointments": {
        "appt-w6-8": {
          "cadenceLabel": "Confirmação Inicial",
          "title": "Consulta de Ultrassom de Viabilidade e Datação",
          "summary": "Confirma localização intrauterina, polo embrionário, batimentos cardíacos, gestação única vs. gemelar e datação precisa pelo Comprimento Cabeça-Nádega (CCN).",
          "procedures": [
            "Ultrassom transvaginal ou transabdominal de datação (o CCN estabelece a DPP com precisão de ±3–5 dias)",
            "Verificação da vesícula vitelínica, saco gestacional e frequência cardíaca embrionária (100–165 BPM)",
            "Revisão do histórico médico, cirúrgico, obstétrico e genético familiar",
            "Manejo precoce de náuseas/vômitos e verificação do polivitamínico pré-natal (Ácido Fólico ≥400–800 mcg)"
          ],
          "questionsToAsk": [
            "O Comprimento Cabeça-Nádega (CCN) coincide com a minha DPP pela DUM ou vamos atualizar a data oficial?",
            "Em qual maternidade a equipe realiza os partos e como funciona a escala de plantão obstétrico?",
            "Qual é o telefone de sobreaviso/triagem fora do horário comercial caso eu tenha sangramento ou sintomas intensos?"
          ],
          "highRiskAddition": "Idade Materna ≥35 / Perda Anterior / FIV: Ultrassom precoce às 5,5–6 semanas e revisão de suporte lúteo com progesterona."
        },
        "appt-w8-10": {
          "cadenceLabel": "A Cada 4 Semanas (4/4s)",
          "title": "Admissão Obstétrica Completa e Painel Laboratorial Pré-Natal Inicial",
          "summary": "Exame físico completo e perfil laboratorial materno basal de sangue e urina.",
          "procedures": [
            "Hemograma Completo (hemoglobina, hematócrito, plaquetas)",
            "Tipagem Sanguínea (ABO), Fator Rh(D) e Coombs Indireto (pesquisa de anticorpos irregulares)",
            "Sorologias e imunidade: Rubéola IgG, Varicela IgG, Hepatite B (HBsAg), Hepatite C, HIV, Sífilis (VDRL) e Toxoplasmose",
            "Urocultura com antibiograma (rastreia bacteriúria assintomática para prevenir pielonefrite)",
            "TSH (se histórico tireoidiano), Glicemia/HbA1c (se risco de diabetes/IMC ≥25) e Triagem de Portadores Genéticos (Fibrose Cística, AME, Hemoglobinopatias)"
          ],
          "questionsToAsk": [
            "Meu sangue é Rh positivo ou Rh negativo, e minhas sorologias vacinais (Rubéola/Varicela) mostram imunidade?",
            "Tenho fatores de risco para rastreio precoce de diabetes gestacional ou uso de AAS em baixa dose na 12ª semana?",
            "Como vamos agendar o NIPT (DNA fetal livre) e o ultrassom Morfológico de 1º Trimestre (Translucência Nucal)?"
          ],
          "highRiskAddition": "Risco de DMG / DMG prévio / SOP / IMC ≥25: Rastreamento precoce de glicose de 1 hora (GCT) ou glicemia/HbA1c solicitado já na primeira consulta."
        },
        "appt-w10-13": {
          "cadenceLabel": "A Cada 4 Semanas (4/4s)",
          "title": "Janela Genética: NIPT (DNA Fetal Livre) e Translucência Nucal (TN)",
          "summary": "Rastreamento de aneuploidias cromossômicas, avaliação anatômica precoce e início da profilaxia de pré-eclâmpsia na 12ª semana.",
          "procedures": [
            "Coleta de sangue materno para DNA Fetal Livre (NIPT, a partir de 10s0d): rastreia Trissomias 21, 18, 13 e cromossomos sexuais",
            "Ultrassom Morfológico de 1º Trimestre com Translucência Nucal (TN, 11s0d–13s6d): mede o espaço líquido na nuca fetal (<3,0 mm normal) e osso nasal",
            "Ausculta dos batimentos cardiofetais via Sonar Doppler (140–165 BPM) e aferição de pressão arterial / urina",
            "Início de Aspirina em Baixa Dose (AAS 81–100 mg/dia a partir da 12ª semana) se houver critérios de risco para pré-eclâmpsia"
          ],
          "questionsToAsk": [
            "Devo iniciar aspirina em baixa dose (81 mg) na 12ª semana para prevenção de pré-eclâmpsia com base no meu perfil?",
            "Em quantos dias sai o resultado do NIPT (geralmente 7–10 dias corridos) e como serei informada?",
            "Há alguma recomendação específica sobre exercícios físicos ou viagens ao entrar no segundo trimestre?"
          ],
          "highRiskAddition": "Idade ≥35 / Gêmeos: Aconselhamento genético detalhado; Biópsia de Vilo Corial (BVC, 10–13s) se desejar diagnóstico definitivo; confirmar corionicidade gemelar antes da 14ª semana."
        },
        "appt-w16": {
          "cadenceLabel": "A Cada 4 Semanas (4/4s)",
          "title": "Consulta de 16 Semanas (2º Trimestre) e Alfa-Fetoproteína (MSAFP)",
          "summary": "Avaliação de rotina do bem-estar materno-fetal e marcador sérico para defeitos abertos do tubo neural.",
          "procedures": [
            "Pressão arterial, curva de ganho ponderal materno e fita reagente de urina (proteína/glicose/leucócitos)",
            "Verificação da Frequência Cardíaca Fetal via Sonar Doppler",
            "Dosagem de Alfa-Fetoproteína Sérica Materna (MSAFP, 15–20s) para rastrear defeitos abertos do tubo neural (espinha bífida/anencefalia) ou teste quádruplo caso o NIPT não tenha sido realizado",
            "Solicitação e agendamento do Ultrassom Morfológico de 2º Trimestre (20 semanas)"
          ],
          "questionsToAsk": [
            "Mesmo com o NIPT de baixo risco, devemos colher a Alfa-Fetoproteína (MSAFP) hoje para rastrear defeitos do tubo neural?",
            "Quando devo começar a sentir os movimentos fetais com clareza, considerando a posição da minha placenta?"
          ],
          "highRiskAddition": "Parto Prematuro Espontâneo Anterior: Ultrassom transvaginal seriado do colo uterino a cada 2 semanas da 16ª à 24ª semana."
        },
        "appt-w18-22": {
          "cadenceLabel": "A Cada 4 Semanas (4/4s)",
          "title": "Ultrassom Morfológico de 2º Trimestre (Nível II) e Consulta de 20 Semanas",
          "summary": "Avaliação estrutural detalhada de todos os sistemas orgânicos fetais, localização placentária, líquido amniótico e medida do colo uterino.",
          "procedures": [
            "Ultrassom Morfológico de 2º Trimestre (45–60 min): ventrículos cerebrais, cerebelo, plexos coroides, perfil/lábios, coração de 4 câmaras + vias de saída VE/VD, diafragma, estômago, rins, inserção do cordão, cordão umbilical de 3 vasos, coluna e os 4 membros",
            "Avaliação da localização placentária (afastando placenta prévia ou vasa prévia)",
            "Medida do comprimento do colo uterino (normal ≥25 mm entre 18 e 24 semanas)",
            "Medida da altura uterina (inicia na 20ª semana na cicatriz umbilical), pressão arterial e exame de urina"
          ],
          "questionsToAsk": [
            "Todas as vias de saída cardíacas e a coluna foram claramente visualizadas hoje ou precisamos complementar o exame?",
            "Minha placenta é anterior, posterior ou fúndica, e está bem distante (>2 cm) do orifício interno do colo?",
            "Qual foi a medida do comprimento do meu colo uterino?"
          ],
          "highRiskAddition": "FIV / Diabetes Pré-Existente / Risco de Cardiopatia Congênita: Ecocardiograma Fetal com cardiologista pediátrico entre 20 e 22 semanas."
        },
        "appt-w24-28": {
          "cadenceLabel": "Transição para Quinzenal na 28ª Sem.",
          "title": "Rastreio de Diabetes Gestacional, Hemograma, Imunoglobulina Anti-D e Vacina dTpa",
          "summary": "Marco metabólico, hematológico e imunológico fundamental na transição do 2º para o 3º trimestre.",
          "procedures": [
            "Teste de Tolerância à Glicose de 1 hora com 50 g (GCT) para Diabetes Gestacional (24–28 semanas; se ≥135–140 mg/dL, curva de 3 horas com 100 g)",
            "Hemograma de 3º Trimestre (rastreia anemia ferropriva vs. fisiológica e plaquetopenia gestacional)",
            "Coombs Indireto e Imunoglobulina Anti-D (RhoGAM 300 mcg IM) na 28ª semana se a gestante for Rh negativo",
            "Vacina dTpa (Difteria, Tétano e Coqueluche Acelular) entre 27 e 36 semanas (idealmente 27–30s) para imunidade passiva do recém-nascido contra coqueluche",
            "Repetição das sorologias de Sífilis e HIV no 3º trimestre conforme diretrizes"
          ],
          "questionsToAsk": [
            "Quais são os resultados do meu exame de glicose de 1 hora e de hemoglobina/ferritina do terceiro trimestre? Devo suplementar ferro oral?",
            "Posso tomar a vacina dTpa hoje, e quando meu parceiro(a) e avós devem atualizar a deles (pelo menos 2 semanas antes do parto)?",
            "Como devo fazer e anotar o mobilograma (contagem diária de chutes) a partir da 28ª semana?"
          ],
          "highRiskAddition": "Gêmeos Monocoriônicos: Ultrassom a cada 2 semanas para rastreio de Síndrome de Transfusão Feto-Fetal (STFF); Dicoriônicos: ultrassom de crescimento a cada 4 semanas."
        },
        "appt-w30": {
          "cadenceLabel": "A Cada 2 Semanas (2/2s)",
          "title": "Consulta Quinzenal de 30 Semanas e Revisão do Mobilograma",
          "summary": "Primeira consulta quinzenal do terceiro trimestre focada na curva de crescimento fetal e vigilância de pré-eclâmpsia.",
          "procedures": [
            "Pressão arterial e fita reagente de urina (rastreio de hipertensão gestacional / proteinúria)",
            "Medida da Altura Uterina em cm (esperado 28–32 cm) e batimentos cardiofetais via Doppler",
            "Revisão do padrão diário de Movimentos Fetais (≥10 movimentos em até 2 horas)",
            "Orientação sobre sinais de alerta de trabalho de parto prematuro e cadastro na maternidade"
          ],
          "questionsToAsk": [
            "Minha altura uterina está acompanhando a curva esperada para a idade gestacional?",
            "Como faço o pré-cadastro de internação na maternidade e onde fica a entrada do pronto-socorro obstétrico à noite?"
          ],
          "highRiskAddition": "Idade ≥35 / Obesidade / DMG / Hipertensão: Programar ultrassom de crescimento de 3º trimestre e cardiotocografia/perfil biofísico semanal a partir de 32 semanas."
        },
        "appt-w32": {
          "cadenceLabel": "A Cada 2 Semanas (2/2s)",
          "title": "Consulta de 32 Semanas, Janela da Vacina VSR e Avaliação de Crescimento",
          "summary": "Avaliação da apresentação fetal, imunização materna contra o Vírus Sincicial Respiratório (VSR) e vigilância antenatal.",
          "procedures": [
            "Vacina Materna contra VSR (Abrysvo, 32s0d–36s6d) para prevenir bronquiolite grave por VSR nos primeiros 6 meses do bebê",
            "Pressão arterial, exame de urina, altura uterina (30–34 cm) e batimentos cardiofetais",
            "Ultrassom de acompanhamento de localização placentária ou crescimento se houve placenta baixa, idade ≥35, DMG ou discrepância de altura uterina"
          ],
          "questionsToAsk": [
            "Estou na janela ideal para receber a vacina materna Abrysvo contra o VSR hoje (ou o bebê receberá Nirsevimabe ao nascer)?",
            "Já é possível perceber se o bebê está começando a ficar de cabeça para baixo (cefálico)?"
          ],
          "highRiskAddition": "Idade ≥35–40 / DMG / HAS Crônica / RCF: Iniciar Cardiotocografia (CTG/NST) e/ou Perfil Biofísico Fetal (PBF) semanal ou quinzenal."
        },
        "appt-w34": {
          "cadenceLabel": "A Cada 2 Semanas (2/2s)",
          "title": "Marco Pré-Termo Tardio de 34 Semanas e Revisão do Plano de Parto",
          "summary": "Revisão das opções de analgesia de parto, preferências de nascimento, massagem perineal e sinais de alerta de pré-eclâmpsia.",
          "procedures": [
            "Pressão arterial, pesquisa de proteína na urina, altura uterina (32–36 cm) e batimentos cardiofetais",
            "Manobras de Leopold para palpar situação (longitudinal vs. transversa) e apresentação fetal",
            "Discussão do plano de parto: analgesia peridural, métodos não farmacológicos, ausculta intermitente vs. monitorização contínua, clampeamento oportuno do cordão e Hora Dourada pele a pele"
          ],
          "questionsToAsk": [
            "Quais são os protocolos padrão da maternidade para clampeamento tardio do cordão, contato pele a pele imediato e consultoria de amamentação?",
            "Em quais cenários clínicos seria indicada uma cesariana ou parto vaginal operatório?"
          ],
          "highRiskAddition": "Placenta Prévia / Cesárea Clássica Anterior: Confirmar agendamento do parto conforme diretrizes (geralmente 36s0d–37s6d para placenta prévia)."
        },
        "appt-w36": {
          "cadenceLabel": "Início das Consultas Semanais (1/1s)",
          "title": "Swab de Estreptococo do Grupo B (EGB) de 36 Semanas e Confirmação da Apresentação",
          "summary": "Transição para consultas semanais, rastreio universal de EGB (Cotonete) e confirmação da apresentação cefálica.",
          "procedures": [
            "Coleta de swab vaginal inferior e retal para Estreptococo do Grupo B (EGB / GBS, realizada entre 36s0d e 37s6d; validade de 5 semanas)",
            "Manobras de Leopold + ultrassom à beira-leito se necessário para confirmar apresentação Cefálica (vértice)",
            "Se o feto estiver Pélvico (sentado) às 36 semanas: orientar sobre Versão Cefálica Externa (VCE) na 37ª semana",
            "Suspender AAS em baixa dose na 36ª semana conforme protocolo; se histórico de Herpes Genital (HSV), iniciar supressão oral com Aciclovir/Valaciclovir às 36 semanas"
          ],
          "questionsToAsk": [
            "Está confirmado que o bebê está de cabeça para baixo (apresentação cefálica)?",
            "Se meu exame do cotonete (EGB) vier positivo, com que antecedência devo ir para a maternidade no trabalho de parto ou bolsa rota para receber pelo menos 4 horas de penicilina venosa?"
          ],
          "highRiskAddition": "Histórico de Herpes Genital (HSV): Iniciar profilaxia oral diária com valaciclovir/aciclovir com 36s0d para prevenir lesões ativas no parto."
        },
        "appt-w37": {
          "cadenceLabel": "Semanal (1/1s)",
          "title": "Consulta de Termo Precoce (37 Semanas) e Orientações de Internação para o Parto",
          "summary": "Revisão do resultado do EGB, prontidão fisiológica de termo precoce e critérios exatos para procurar a maternidade.",
          "procedures": [
            "Pressão arterial, exame de urina, altura uterina e frequência cardíaca fetal",
            "Verificação e anotação do resultado da cultura de Estreptococo B (EGB) no cartão de pré-natal",
            "Confirmação da regra de triagem do trabalho de parto (5-1-1 para o primeiro bebê: contrações a cada 5 min, durando 1 min, por 1 hora; ou 4-1-1; ou ida imediata se bolsa rota / sangramento / redução dos movimentos)"
          ],
          "questionsToAsk": [
            "Qual foi o resultado do meu exame de Estreptococo do Grupo B (cotonete)?",
            "Se minha bolsa estourar em casa sem contrações, devo ir imediatamente para a maternidade?"
          ],
          "highRiskAddition": "Hipertensão Gestacional / Pré-Eclâmpsia leve sem sinais de gravidade / Colestase / Gêmeos Dicoriônicos: Parto frequentemente indicado entre 37s0d e 38s0d."
        },
        "appt-w38": {
          "cadenceLabel": "Semanal (1/1s)",
          "title": "Consulta Semanal de 38 Semanas e Plano de Cuidados Pós-Parto",
          "summary": "Vigilância contínua da pressão arterial materna e bem-estar fetal, além do preparo para o Puerpério (4º Trimestre).",
          "procedures": [
            "Pressão arterial, fita de urina, altura uterina e batimentos cardiofetais",
            "Exame de toque cervical opcional caso a gestante apresente cólicas ou deseje saber a dilatação/esvaecimento basal",
            "Orientação sobre recuperação pós-parto, assoalho pélvico, saúde mental (Escala de Edimburgo) e contracepção no puerpério"
          ],
          "questionsToAsk": [
            "Quem devo procurar para suporte de amamentação após a alta hospitalar?",
            "Quando serão agendadas minhas consultas pós-parto (o ACOG recomenda revisão inicial em até 3 semanas e consulta completa entre 6 e 12 semanas)?"
          ],
          "highRiskAddition": "DMG Controlado com Dieta / Idade ≥40: Discutir programação do parto em torno de 39s0d–39s6d."
        },
        "appt-w39": {
          "cadenceLabel": "Semanal (1/1s)",
          "title": "Consulta de Termo Completo (39 Semanas), Descolamento de Membranas e Opções de Indução",
          "summary": "Avaliação do marco de termo completo, índice de Bishop opcional e decisão compartilhada entre conduta expectante vs. indução com 39 semanas.",
          "procedures": [
            "Pressão arterial, exame de urina, altura uterina e batimentos cardiofetais",
            "Toque cervical opcional para avaliar o Índice de Bishop (dilatação, esvaecimento, altura da apresentação, consistência e posição)",
            "Descolamento de Membranas opcional (se o colo estiver ≥1 cm dilatado; libera prostaglandinas endógenas para estimular o trabalho de parto espontâneo em 48h)",
            "Decisão compartilhada sobre conduta expectante vs. indução eletiva com 39 semanas (protocolo do estudo ARRIVE)"
          ],
          "questionsToAsk": [
            "Qual é minha dilatação, esvaecimento e altura da apresentação atual, e sou candidata ao descolamento de membranas hoje?",
            "Se eu não entrar em trabalho de parto espontâneo até as 40 semanas, quando você recomenda agendar a vitalidade fetal e a indução?"
          ],
          "highRiskAddition": "DMG com Uso de Insulina/Medicação / Idade ≥35–40: Diretrizes recomendam o parto na 39ª semana (39s0d–39s6d)."
        },
        "appt-w40": {
          "cadenceLabel": "Semanal (1/1s)",
          "title": "Consulta da Data Provável do Parto (40 Semanas) e Plano de Pós-Datismo",
          "summary": "Avaliação na DPP, reavaliação cervical e agendamento da vigilância fetal da 41ª semana.",
          "procedures": [
            "Pressão arterial, pesquisa de proteína na urina e batimentos cardiofetais",
            "Avaliação cervical e repetição opcional do descolamento de membranas",
            "Solicitação de Cardiotocografia (CTG/NST) e Índice de Líquido Amniótico (ILA) / Perfil Biofísico Fetal (PBF) para a 41ª semana",
            "Agendamento provisório da data de internação para indução do parto entre 41s0d e 41s6d"
          ],
          "questionsToAsk": [
            "Se agendarmos a indução na próxima semana, internarei na noite anterior para preparo do colo (balão de Foley ou misoprostol) ou pela manhã para ocitocina?"
          ],
          "highRiskAddition": "A maioria das gestações de alto risco e idade materna ≥40 tem o parto indicado entre 39s0d e 40s0d."
        },
        "appt-w41-42": {
          "cadenceLabel": "Duas Vezes por Semana (41s+)",
          "title": "Vigilância de Termo Tardio (41 Semanas CTG / PBF) e Indução do Trabalho de Parto",
          "summary": "Avaliação bissemanal do bem-estar fetal e do líquido amniótico, culminando no parto até 42s0d.",
          "procedures": [
            "Cardiotocografia Basal (NST): monitoramento externo por 20–40 min verificando FCF basal (110–160 bpm), variabilidade moderada e ≥2 acelerações (15x15) em 20 min",
            "Perfil Biofísico Fetal (PBF) / Ultrassom de Líquido Amniótico: verifica Maior Bolsão Vertical (MBV ≥2 cm) ou ILA ≥5 cm, movimentos respiratórios, tônus e movimento fetal",
            "Internação na maternidade para amadurecimento cervical e indução do trabalho de parto antes de 42s0d"
          ],
          "questionsToAsk": [
            "Meu bolsão de líquido amniótico (MBV/ILA) e a cardiotocografia estão completamente normais e reativos hoje?",
            "A que horas devemos chegar na maternidade para nossa internação de indução agendada?"
          ],
          "highRiskAddition": "Oligodrâmnio (MBV <2 cm) ou Cardiotocografia Não Reativa: Internação imediata no centro obstétrico para resolução da gestação."
        }
      },
      "symptoms": {
        "sym-1": {
          "urgencyLabel": "Ir à Maternidade / Ligar para o Obstetra Imediatamente",
          "trimesterScope": "3º Trimestre (Semanas 28–42)",
          "title": "Redução dos Movimentos Fetais (<10 Movimentos em 2 Horas com ≥28 Semanas)",
          "clinicalExplanation": "Uma queda súbita nos movimentos do bebê ou não atingir 10 movimentos nítidos em 2 horas durante o mobilograma pode ser um sinal precoce de insuficiência placentária ou compressão do cordão umbilical.",
          "actionSteps": "Beba água gelada, deite-se sobre o lado esquerdo em local silencioso e concentre-se nos movimentos. NÃO espere até amanhã nem confie em Doppler doméstico — vá imediatamente à maternidade para uma cardiotocografia (NST) contínua de 20 minutos."
        },
        "sym-2": {
          "urgencyLabel": "Ir ao Pronto-Socorro Obstétrico Imediatamente",
          "trimesterScope": "2º e 3º Trimestres (≥20 Semanas) e Pós-Parto",
          "title": "Dor de Cabeça Forte e Persistente, Alterações Visuais (Pontos Brilhantes) ou Dor na Boca do Estômago",
          "clinicalExplanation": "Cefaleia intensa que não melhora com paracetamol e hidratação, escotomas visuais (pontos brilhantes/visão turva), dor no quadrante superior direito/epigástrio ou inchaço súbito no rosto e mãos são sinais clássicos de Pré-Eclâmpsia Grave ou síndrome HELLP.",
          "actionSteps": "Meça a pressão arterial se tiver aparelho (≥140/90 está elevada; ≥160/110 é emergência hipertensiva). Procure imediatamente o pronto-socorro obstétrico para avaliação de PA, proteinúria, plaquetas e enzimas hepáticas."
        },
        "sym-3": {
          "urgencyLabel": "Ir à Maternidade / Ligar para o Obstetra Imediatamente",
          "trimesterScope": "Todos os Trimestres (Semanas 1–42)",
          "title": "Sangramento Vaginal (Sangue Vermelho Vivo ou Saída de Coágulos)",
          "clinicalExplanation": "No 1º trimestre, sangramento intenso ou acompanhado de dor pélvica unilateral exige avaliação para gravidez ectópica ou ameaça de abortamento. No 2º/3º trimestres, exige ultrassom imediato para afastar Placenta Prévia ou Descolamento Prematuro de Placenta.",
          "actionSteps": "Vá imediatamente ao pronto-socorro obstétrico. Se seu sangue for Rh negativo, você também precisará receber imunoglobulina Anti-D (RhoGAM) em até 72 horas após qualquer episódio de sangramento."
        },
        "sym-4": {
          "urgencyLabel": "Ir para a Maternidade Imediatamente",
          "trimesterScope": "2º e 3º Trimestres",
          "title": "Perda de Líquido Claro, Rosado ou Esverdeado em Jato ou Gotejamento Contínuo (Bolsa Rota)",
          "clinicalExplanation": "A Ruptura Prematura de Membranas a termo ou pré-termo (antes de 37 semanas) remove a barreira amniótica contra infecções e traz risco de prolapso de cordão umbilical caso a cabeça não esteja encaixada.",
          "actionSteps": "Observe a Cor, Odor, Quantidade e Horário. Não introduza nada na vagina. Dirija-se diretamente à maternidade para avaliação estéril."
        },
        "sym-5": {
          "urgencyLabel": "Ligar para o Obstetra / Maternidade em 1–2 Horas",
          "trimesterScope": "2º e 3º Trimestres (Semanas 20–36)",
          "title": "Contrações Regulares Antes de 37 Semanas (>4–6 por Hora Durante 1 Hora)",
          "clinicalExplanation": "Endurecimentos uterinos rítmicos acompanhados de cólicas semelhantes às menstruais, pressão pélvica, dor lombar baixa ou secreção mucosa antes de 37s0d podem indicar trabalho de parto prematuro.",
          "actionSteps": "Esvazie a bexiga, beba 500 mL (16–24 oz) de água e deite-se sobre o lado esquerdo. Se persistirem >4–6 contrações em 1 hora, ligue imediatamente para a maternidade para avaliação do comprimento cervical e fibronectina fetal."
        },
        "sym-6": {
          "urgencyLabel": "Ligar Hoje para o Obstetra e Tratar a Febre com Paracetamol",
          "trimesterScope": "Todos os Trimestres (Semanas 1–42)",
          "title": "Febre ≥38,0°C (100,4°F) ou Calafrios",
          "clinicalExplanation": "A hipertermia materna sustentada no 1º trimestre aumenta o risco de defeitos do tubo neural e, mais tarde, pode desencadear contrações prematuras ou indicar pielonefrite, influenza, COVID-19 ou corioamnionite.",
          "actionSteps": "Tome Paracetamol (Acetaminofeno 650–1.000 mg) para baixar a temperatura central, hidrate-se e entre em contato com seu obstetra para investigar o foco infeccioso."
        },
        "sym-7": {
          "urgencyLabel": "Pronto-Socorro / Emergência Imediatamente",
          "trimesterScope": "Todos os Trimestres e 6 Semanas Pós-Parto",
          "title": "Inchaço, Vermelhidão ou Calor em Apenas Uma Panturrilha, ou Dor no Peito / Falta de Ar",
          "clinicalExplanation": "A gestação é um estado de hipercoagulabilidade (fatores de coagulação elevados para evitar hemorragia no parto), aumentando o risco de Trombose Venosa Profunda (TVP, mais comum na perna esquerda) e Embolia Pulmonar (EP).",
          "actionSteps": "Não massageie a panturrilha. Procure imediatamente o Pronto-Socorro para realização de ultrassom Doppler venoso de membros inferiores."
        },
        "sym-8": {
          "urgencyLabel": "Contatar o Consultório Obstétrico em 24 Horas",
          "trimesterScope": "Final do 2º e 3º Trimestres",
          "title": "Coceira Intensa nas Palmas das Mãos e Plantas dos Pés (Principalmente à Noite, Sem Lesões na Pele)",
          "clinicalExplanation": "O prurido palmoplantar intenso sem erupção cutânea primária é o sintoma clássico da Colestase Intra-Hepática da Gravidez (CIG), causada pela elevação dos ácidos biliares séricos.",
          "actionSteps": "Contate seu obstetra para solicitar dosagem de Ácidos Biliares Totais e Transaminases (TGO/TGP). Se confirmado, o ácido ursodesoxicólico alivia a coceira e reduz os ácidos biliares."
        },
        "sym-9": {
          "urgencyLabel": "Ligar Hoje para o Consultório Obstétrico",
          "trimesterScope": "Todos os Trimestres",
          "title": "Ardência ao Urinar (Disúria), Urina Turva/Com Odor Forte ou Dor Lombar Lateral",
          "clinicalExplanation": "A progesterona dilata os ureteres, tornando as Infecções do Trato Urinário (ITU) baixas muito mais propensas a evoluir para pielonefrite aguda (infecção renal), o que pode desencadear parto prematuro.",
          "actionSteps": "Entre em contato hoje com seu obstetra para realizar exame de urina (EAS) e urocultura, iniciando prontamente antibióticos seguros na gestação (como cefalexina ou fosfomicina)."
        },
        "sym-10": {
          "urgencyLabel": "Alteração Fisiológica Normal (Comentar na Consulta)",
          "trimesterScope": "2º e 3º Trimestres",
          "title": "Fisgada Rápida na Virilha ao Virar na Cama, Levantar-se ou Tossir",
          "clinicalExplanation": "Dor Clássica do Ligamento Redondo: à medida que o útero cresce para fora da pelve, os ligamentos redondos esticam-se como elásticos tensos e contraem-se brevemente com movimentos bruscos.",
          "actionSteps": "Flexione o quadril antes de tossir ou espirrar, vire-se devagar de lado antes de se levantar, use uma compressa morna (não muito quente) ou utilize uma cinta de suporte gestacional."
        },
        "sym-11": {
          "urgencyLabel": "Alteração Fisiológica Normal (Braxton Hicks)",
          "trimesterScope": "2º e 3º Trimestres",
          "title": "Endurecimento Abdominal Irregular e Indolor que Melhora com Hidratação e Repouso",
          "clinicalExplanation": "As contrações de Braxton Hicks (\"contrações de treinamento\") tonificam o músculo uterino sem dilatar o colo. São irregulares, não aumentam de intensidade e costumam ser desencadeadas por desidratação ou bexiga cheia.",
          "actionSteps": "Beba 2 copos de água, esvazie a bexiga e descanse deitada sobre o lado esquerdo. Ligue para seu obstetra se ficarem regulares (a cada 5–10 min) ou dolorosas."
        },
        "sym-12": {
          "urgencyLabel": "Alteração Fisiológica Normal",
          "trimesterScope": "Todos os Trimestres",
          "title": "Congestão Nasal Leve (\"Rinite Gestacional\") ou Sangramento Nasal Ocasional",
          "clinicalExplanation": "O ingurgitamento da mucosa mediado pelo estrogênio e a expansão de +45% no volume sanguíneo incham os cornetos nasais em até 30% das gestantes.",
          "actionSteps": "Use spray nasal de soro fisiológico estéril, umidificador de ar no quarto e tiras nasais. Evite descongestionantes orais como fenilefrina ou pseudoefedrina (especialmente no 1º trimestre ou se houver hipertensão)."
        }
      },
      "safety": {
        "med-1": {
          "category": "Dor e Febre",
          "statusLabel": "Primeira Linha Aprovada (ACOG)",
          "name": "Paracetamol / Acetaminofeno (Tylenol)",
          "dosageNote": "325–650 mg a cada 6 horas se necessário (Máx. 3.000 mg/24h); menor dose eficaz pelo menor tempo.",
          "clinicalGuidance": "O ACOG e a SMFM confirmam o paracetamol (acetaminofeno) como o analgésico e antitérmico de primeira linha mais seguro nos três trimestres. Tratar a febre materna ≥38,0 °C (100,4 °F) é essencial para proteger o embrião/feto."
        },
        "med-2": {
          "category": "Dor e Febre",
          "statusLabel": "Contraindicado na Gestação",
          "name": "Ibuprofeno (Advil/Motrin), Naproxeno e Aspirina em Dose Alta (AINEs)",
          "dosageNote": "Evitar durante a gestação (Nota: a aspirina em baixa dose de 81–100 mg prescrita pelo obstetra para prevenção de pré-eclâmpsia é exceção e É segura).",
          "clinicalGuidance": "Os AINEs orais inibem a síntese de prostaglandinas fetais, causando fechamento prematuro do canal arterial fetal, redução da função renal fetal e oligodrâmnio após a 20.ª semana."
        },
        "med-3": {
          "category": "Náuseas e Vômitos",
          "statusLabel": "Terapia de Primeira Linha ACOG",
          "name": "Vitamina B6 (Piridoxina) + Doxilamina (Unisom / Diclegis)",
          "dosageNote": "Vitamina B6 10–25 mg 3x/dia + Succinato de doxilamina 12,5–25 mg ao deitar.",
          "clinicalGuidance": "O regime antiemético mais amplamente estudado em obstetrícia (>200.000 gestações avaliadas com zero sinal teratogênico)."
        },
        "med-4": {
          "category": "Azia e Refluxo",
          "statusLabel": "Primeira/Segunda Linha Aprovada",
          "name": "Carbonato de Cálcio (Tums) e Famotidina (Pepcid)",
          "dosageNote": "Carbonato de cálcio 500–1.000 mg se necessário; Famotidina 10–20 mg 1 a 2x/dia se antiácidos forem insuficientes.",
          "clinicalGuidance": "Antiácidos de cálcio neutralizam o ácido com segurança e fornecem cálcio suplementar (separe por 2 horas do suplemento de ferro). Evite subsalicilato de bismuto (Pepto-Bismol)."
        },
        "med-5": {
          "category": "Constipação e GI",
          "statusLabel": "Aprovado (Absorção Sistêmica Mínima)",
          "name": "Polietilenoglicol 3350 (MiraLAX / Muvinlax), Psyllium (Metamucil) e Docusato (Colace)",
          "dosageNote": "Polietilenoglicol (MiraLAX) 17 g ao dia diluído em 240 mL (8 oz) de água, associado a maior hidratação e fibras na dieta.",
          "clinicalGuidance": "A progesterona reduz a motilidade intestinal e o ferro pré-natal agrava a constipação. Laxantes osmóticos e formadores de bolo fecal têm absorção sistêmica mínima e são seguros na gestação. Evite óleo de rícino."
        },
        "med-6": {
          "category": "Alergias e Resfriado",
          "statusLabel": "Alívio de Alergia de Primeira Linha",
          "name": "Loratadina (Claritin), Cetirizina (Zyrtec) e Spray Nasal de Fluticasona (Flonase)",
          "dosageNote": "Loratadina 10 mg/dia ou Cetirizina 10 mg/dia; evite fórmulas \"-D\" com descongestionante oral.",
          "clinicalGuidance": "Anti-histamínicos de segunda geração e sprays nasais de corticosteroide têm excelente perfil de segurança na gestação. Evite pseudoefedrina/fenilefrina oral no 1.º trimestre ou se houver hipertensão."
        },
        "med-7": {
          "category": "Dermatologia / Pele",
          "statusLabel": "Estritamente Contraindicado (Teratogênico)",
          "name": "Isotretinoína (Roacutan) e Retinoides Tópicos (Tretinoína / Retin-A / Adapaleno)",
          "dosageNote": "Suspender antes da concepção; utilize Ácido Azelaico, Ácido Glicólico (<10%) ou Niacinamida como alternativa.",
          "clinicalGuidance": "Retinoides sistêmicos (derivados da vitamina A) causam embriopatia craniofacial, cardíaca e tímica grave. Por segurança, dermatologistas e obstetras também recomendam suspender retinoides tópicos e retinol durante a gestação."
        },
        "med-8": {
          "category": "Nutrição e Bebidas",
          "statusLabel": "Seguro Abaixo de <200 mg / Dia (ACOG)",
          "name": "Cafeína (Café, Espresso, Matcha, Chá)",
          "dosageNote": "Limite o consumo total diário de cafeína a ≤200 mg (aprox. uma xícara de 350 mL / 12 oz de café coado ou duas doses de espresso).",
          "clinicalGuidance": "O parecer do ACOG confirma que o consumo moderado de cafeína (<200 mg/dia) não aumenta o risco de abortamento ou parto prematuro. Lembre-se de incluir chás, refrigerantes e chocolate amargo na contagem diária."
        },
        "med-9": {
          "category": "Nutrição e Bebidas",
          "statusLabel": "Fortemente Recomendado (2–3 Porções/Sem.)",
          "name": "Peixes Ômega-3 com Baixo Mercúrio (Salmão, Sardinha, Truta, Bacalhau, Camarão)",
          "dosageNote": "225–340 g (8–12 oz) por semana de pescados de baixo mercúrio bem cozidos (fornece ~200–300 mg/dia de DHA).",
          "clinicalGuidance": "FDA e ACOG recomendam consumir 2–3 porções/semana de peixes cozidos com baixo teor de mercúrio para o desenvolvimento cerebral e retiniano fetal (DHA). EVITE peixes predadores ricos em mercúrio: Tubarão (Cação), Peixe-Espada, Cavala-Rei, Marlim e Atum-Patudo."
        },
        "med-10": {
          "category": "Nutrição e Bebidas",
          "statusLabel": "Evitar Crus / Não Pasteurizados",
          "name": "Laticínios Não Pasteurizados, Frios Mal Aquecidos e Brotos Crus (Risco de Listeria)",
          "dosageNote": "Verifique no rótulo do queijo \"Feito com Leite Pasteurizado\"; aqueça frios/embutidos até soltar vapor (74°C / 165°F).",
          "clinicalGuidance": "A imunidade celular diminui na gestação, tornando gestantes 10x mais suscetíveis à Listeria monocytogenes, que atravessa a placenta. A maioria dos queijos macios de supermercado (feta, brie, queijo minas/fresco) É pasteurizada — basta conferir o rótulo!"
        }
      },
      "photos": {
        "0": {
          "caption": "Semanas 1–2: Oócito secundário (≈120 µm) na ovulação — zona pelúcida translúcida e células da corona radiata emergindo do folículo ovariano.",
          "alt": "Renderização hiper-realista de um oócito humano com sua zona pelúcida e células do cumulus emergindo da superfície ovariana."
        },
        "1": {
          "caption": "Semana 3: Mórula compactada de 16 células (4.º dia pós-fertilização) com corpúsculos polares dentro da zona pelúcida.",
          "alt": "Renderização hiper-realista de uma mórula humana mostrando blastômeros translúcidos compactados dentro de uma zona pelúcida transparente."
        },
        "2": {
          "caption": "Semana 4: Blastocisto eclodido implantando-se no endométrio vascular — anel trofoblástico, blastocele e massa celular interna.",
          "alt": "Renderização hiper-realista de um blastocisto humano fixando-se ao endométrio uterino rosado com projeções trofoblásticas."
        },
        "3": {
          "caption": "Semanas 5–6: Embrião em estágio de Carnegie com somitos dorsais, proeminência cardíaca primitiva e vesícula vitelina dourada.",
          "alt": "Renderização hiper-realista de um embrião humano inicial com pele translúcida, somitos visíveis e saco vitelínico dentro da membrana amniótica."
        },
        "4": {
          "caption": "Semanas 7–9: Estágio embrionário tardio mostrando vesículas cerebrais, cálice óptico pigmentado, coração de 4 câmaras, placas das mãos e vesícula vitelina.",
          "alt": "Fotografia macro intrauterina de um embrião humano tardio com pele vascular translúcida, cálice óptico escuro, brotos de membros e saco vitelínico dourado."
        },
        "5": {
          "caption": "Semanas 10–15: Feto do 1.º trimestre com dedos separados, pálpebras fundidas, vasos temporais translúcidos e cordão umbilical de 3 vasos ligado à placenta esquerda.",
          "alt": "Fotografia macro intrauterina de um feto humano de 12 semanas dentro do saco amniótico com cordão umbilical de 3 vasos e disco placentário à esquerda."
        },
        "6": {
          "caption": "Semanas 16–25: Feto de meia gestação (Ultrassom Morfológico de 20 Semanas) com brilho de vernix caseoso, membros fletidos e cordão umbilical de 3 vasos conectado à placenta esquerda.",
          "alt": "Fotografia macro intrauterina de um feto humano de 20 semanas em meia gestação flutuando no saco amniótico com disco placentário à esquerda."
        },
        "7": {
          "caption": "Semanas 26–33: Feto do início do 3.º trimestre com pálpebras e cílios formados e deposição acelerada de gordura subcutânea.",
          "alt": "Fotografia macro intrauterina de um feto humano de 28 semanas no terceiro trimestre repousando tranquilamente dentro do saco amniótico."
        },
        "8": {
          "caption": "Semanas 34–42: Feto a termo completo com bochechas arredondadas, tecido adiposo maduro e surfactante pulmonar pronto para o nascimento.",
          "alt": "Fotografia macro intrauterina de um feto humano a termo acolhido dentro do saco amniótico com placenta à esquerda e cordão umbilical espiralado."
        }
      }
    },
    "ja": {
      "weeks": {
        "1": {
          "phaseLabel": "受精前後（月経期・卵胞期）",
          "stageTitle": "卵胞リクルートメントと子宮内膜のリセット",
          "biologicalStage": "卵巣卵胞コホート",
          "lengthMetric": "0.04 mm (原始卵胞)",
          "weightMetric": "< 0.001 g",
          "heartRateBpm": "未形成（受精前）",
          "keyOrgans": [
            "視床下部-下垂体-卵巣系",
            "子宮内膜基底層",
            "主席卵胞の選択"
          ],
          "fetalMilestones": [
            "産科的な妊娠週数は最終月経（LMP）の初日を第1日として数え、実際の受精より約2週間前から始まります。",
            "卵胞刺激ホルモン（FSH）が胞状卵胞群をリクルートし、1つの主席卵胞（グラーフ卵胞）が選抜されます。",
            "上昇するエストラジオールが子宮内膜機能層を増殖させ、血管に富む着床床を準備します。"
          ],
          "maternalPhysiology": "月経期の内膜剥離から増殖期（卵胞期）へ移行します。基礎体温は排卵前の低温相を維持します。",
          "doctorCheckIn": "プレコンセプション確認：毎日400〜800 mcgの葉酸摂取（神経管閉鎖障害の既往がある場合は4 mg）、風疹・水痘の抗体確認、常用薬の催奇形性チェックを行います。",
          "clinicalPearl": "ACOGは排卵日の個人差を考慮し最終月経第1日（LMP 1日目）から妊娠期間（計40週／280日）を算出します。胎芽齢はこれより約2週間短くなります（38週／266日）。"
        },
        "2": {
          "phaseLabel": "受精前後（排卵期ウィンドウ）",
          "stageTitle": "LHサージ・排卵・卵管采による卵子捕捉",
          "biologicalStage": "二次卵母細胞（第二減数分裂中期）",
          "lengthMetric": "0.12 mm (120 µm 卵母細胞)",
          "weightMetric": "< 0.001 g",
          "heartRateBpm": "未形成（排卵期）",
          "keyOrgans": [
            "卵丘・卵母細胞複合体",
            "透明帯",
            "黄体形成"
          ],
          "fetalMilestones": [
            "周期中期の黄体形成ホルモン（LH）サージにより第一減数分裂が再開し、第一極体が放出されます。",
            "排卵により第二減数分裂中期で停止した二次卵母細胞が放出され、卵管采によって卵管膨大部へ取り込まれます。",
            "排卵後の卵胞は黄体化し、プロゲステロンを分泌して子宮内膜を分泌期へと変化させます。"
          ],
          "maternalPhysiology": "エストロゲンの急増により子宮内膜が肥厚し、精子の通過を助ける頸管粘液が増加します。排卵後はプロゲステロンにより基礎体温が約0.3℃（0.5°F）上昇します。",
          "doctorCheckIn": "妊娠可能期間（ファータイル・ウィンドウ）：最も妊娠しやすいのは排卵前の5日間と排卵日当日です（卵子の受精可能時間は排卵後12〜24時間）。",
          "clinicalPearl": "体外受精（IVF）の場合、培養5日目（Day 5）胚盤胞の移植当日は妊娠2週5日（2w5d）に相当します。"
        },
        "3": {
          "phaseLabel": "妊娠初期 — 胚芽・卵割期",
          "stageTitle": "受精・接合子の卵割・桑実胚（モルラ）形成",
          "biologicalStage": "受精卵 → 16細胞桑実胚",
          "lengthMetric": "0.15 – 0.20 mm",
          "weightMetric": "< 0.001 g",
          "heartRateBpm": "無血管卵割期",
          "keyOrgans": [
            "二倍体ゲノム (46染色体)",
            "割球のコンパクション",
            "内部細胞塊の分化"
          ],
          "fetalMilestones": [
            "卵管膨大部での受精により皮質反応が起こり、多精子受精を防いで第二減数分裂が完了します。",
            "雌雄の前核が融合して二倍体の受精卵（46,XX または 46,XY）となり、12〜24時間ごとに卵割（体細胞分裂）を繰り返します。",
            "受精後4日目までに16〜32細胞の桑実胚（モルラ）がコンパクションを起こして子宮腔に入り、胞胚腔を形成して初期胚盤胞となります。"
          ],
          "maternalPhysiology": "早期妊娠因子（EPF）が母体の免疫寛容を誘導し、黄体からのプロゲステロンが子宮内膜の剥離を防ぎます。",
          "doctorCheckIn": "まだ受診の必要はありません。NSAIDs（イブプロフェン、ナプロキセン等）はプロスタグランジン阻害により着床を妨げる可能性があるため避けてください。",
          "clinicalPearl": "妊娠4週（受精後2週）未満の薬剤曝露は一般に「全か無か（All-or-None）」の法則に従いますが（胎芽期3〜8週／妊娠5〜10週の器官形成期前）、催奇形性が知られる薬剤は直ちに中止すべきです。"
        },
        "4": {
          "phaseLabel": "妊娠初期 — 胚盤胞着床期",
          "stageTitle": "胚盤胞の着床と合胞体栄養膜からのhCG分泌",
          "biologicalStage": "着床中の二層性胚盤胞",
          "lengthMetric": "0.4 – 1.0 mm",
          "weightMetric": "< 0.01 g",
          "heartRateBpm": "原始絨毛間腔循環",
          "keyOrgans": [
            "エピブラスト・ハイポブラスト二層性胚盤",
            "羊膜腔",
            "一次卵黄嚢",
            "栄養膜小腔"
          ],
          "fetalMilestones": [
            "胚盤胞が透明帯から孵化（ハッチング）し、脱落膜化した子宮内膜へ接着・浸潤します（排卵後6〜10日目）。",
            "内部細胞塊が二層性胚盤（エピブラストとハイポブラスト）へと分化します。",
            "合胞体栄養膜が母体のらせん動脈毛細血管に浸潤してhCGを分泌し、妊娠黄体を維持してプロゲステロン産生を継続させます。"
          ],
          "maternalPhysiology": "月経予定日の遅れがみられます。血中hCGは排卵後8〜11日で検出可能となり、正常な子宮内妊娠では48〜72時間ごとに倍増します。",
          "doctorCheckIn": "妊娠検査薬が陽性になったら、産婦人科へ連絡し初診（胎嚢・心拍確認：通常妊娠6〜9週頃）を予約しましょう。",
          "clinicalPearl": "月経予定日頃の少量の着床出血は良性ですが、片側の下腹部痛を伴う出血がある場合は異所性妊娠（子宮外妊娠）を除外するため血中hCGの推移確認が必要です。"
        },
        "5": {
          "phaseLabel": "妊娠初期 — 初期器官形成期",
          "stageTitle": "原腸陥入・神経板形成・原始心筒の拍動開始",
          "biologicalStage": "三胚葉性胎芽（カーネギー段階 9–10）",
          "lengthMetric": "1.5 – 2.5 mm (頭殿長)",
          "weightMetric": "0.02 g",
          "heartRateBpm": "85 – 100 BPM（原始心筒の初発拍動）",
          "keyOrgans": [
            "外胚葉・中胚葉・内胚葉",
            "神経溝",
            "心原領域",
            "体節"
          ],
          "fetalMilestones": [
            "原腸形成により三胚葉が確立します：外胚葉（神経系・表皮）、中胚葉（心臓・骨格・腎臓・血液）、内胚葉（消化管・肺・肝臓）。",
            "神経板が折りたたまれて神経溝となり、その両側に沿軸中胚葉の体節が並びます。",
            "一対の心内膜筒が融合して単一の原始心管となり、受精後22日目頃から蠕動様の拍動を開始します。"
          ],
          "maternalPhysiology": "hCG、エストロゲン、プロゲステロンの急増により、つわり（悪心）、乳房の張り、嗅覚過敏、強い眠気が現れ始めます。",
          "doctorCheckIn": "異所性妊娠の既往、反復流産、またはIVF妊娠の場合は、48時間ごとの血中hCG測定や早期の経腟超音波検査が行われることがあります。",
          "clinicalPearl": "妊娠5週の経腟超音波（TVUS）では、血中hCGが識別ゾーン（約1,500〜2,000 mIU/mL）を超えると胎嚢（GS）と卵黄嚢が確認できます。"
        },
        "6": {
          "phaseLabel": "妊娠初期 — 器官形成期",
          "stageTitle": "神経管閉鎖・心臓ループ形成・四肢肢芽の出現",
          "biologicalStage": "胎芽（カーネギー段階 12–13）",
          "lengthMetric": "4 – 6 mm (頭殿長)",
          "weightMetric": "0.1 g",
          "heartRateBpm": "100 – 115 BPM",
          "keyOrgans": [
            "前・後神経孔",
            "S字状心ループ",
            "眼胞",
            "耳プラコード"
          ],
          "fetalMilestones": [
            "前神経孔（頭側）と後神経孔（尾側）が受精後28日目までに完全に閉鎖し、脳胞と脊髄が形成されます。",
            "原始心管がS字状にループ形成（心ループ）を行い、経腟超音波で規則的な心拍動が確認できるようになります。",
            "上肢芽・下肢芽とともに咽頭弓（将来の顎、口蓋、中耳の構造）が現れます。"
          ],
          "maternalPhysiology": "腎血流量が25〜30％増加するため、子宮が膀胱を圧迫する前でも頻尿が起こりやすくなります。",
          "doctorCheckIn": "初期胎児確認・予定日決定超音波ウィンドウ（妊娠6〜8週）：子宮内の胎芽と心拍を確認し、頭殿長（CRL：誤差±3〜5日）を計測します。",
          "clinicalPearl": "神経管の閉鎖は妊娠6週で完了するため、二分脊椎などの神経管閉鎖障害を予防するには妊娠前からの葉酸摂取が不可欠です。"
        },
        "7": {
          "phaseLabel": "妊娠初期 — 器官形成期",
          "stageTitle": "終脳胞の拡大・手板の形成・後腎（永久腎）の出現",
          "biologicalStage": "胎芽（カーネギー段階 15–16）",
          "lengthMetric": "9 – 11 mm (頭殿長)",
          "weightMetric": "0.5 g",
          "heartRateBpm": "120 – 140 BPM",
          "keyOrgans": [
            "大脳半球",
            "永久腎（後腎）",
            "手板の指放線",
            "膵芽"
          ],
          "fetalMilestones": [
            "前脳が一対の端脳胞（将来の大脳皮質）に分かれ、毎分約10万個の新しい神経細胞（ニューロン）が生成されます。",
            "手板が平らになり指放線（指の原基）が現れ、水晶体胞の陥入と網膜色素の形成が進みます。",
            "尿管芽が後腎間葉に侵入し、永久腎（後腎）の形成が始まります。"
          ],
          "maternalPhysiology": "子宮頸管腺から濃厚な粘液栓が分泌され、上行性感染から子宮内を守るバリアが形成されます。",
          "doctorCheckIn": "つわり（妊娠悪阻）に対するACOGの第一選択療法は、ビタミンB6（ピリドキシン10〜25 mg 1日3回）とドキシラミン（12.5〜25 mg）の併用です。",
          "clinicalPearl": "今週から生理的臍帯ヘルニアが始まります。急速に発育する中腸が一時的に臍帯内へ突出する正常な過程で、妊娠10〜11週頃に腹腔内へ戻ります。"
        },
        "8": {
          "phaseLabel": "妊娠初期 — 器官形成期",
          "stageTitle": "4腔心臓の中隔形成と水かきのある指",
          "biologicalStage": "胎芽（カーネギー段階 18–20）",
          "lengthMetric": "15 – 17 mm (頭殿長)",
          "weightMetric": "1.1 g",
          "heartRateBpm": "145 – 165 BPM",
          "keyOrgans": [
            "房室弁",
            "心室中隔",
            "軟骨化中心",
            "外耳介"
          ],
          "fetalMilestones": [
            "心内膜床が癒合し心室中隔が閉鎖することで、4腔（2心房2心室）の心臓構造が完成します。",
            "アポトーシス（プログラム細胞死）により水かき状の手足の指の間に切れ込みが入り、肘や膝の関節が形成されます。",
            "軟骨性の一次骨格モデルが形成され、体幹や四肢の自発的な微小運動が始まります（母体にはまだ感じられません）。"
          ],
          "maternalPhysiology": "子宮は握りこぶし大から大きめのレモン大へと拡大し、母体の心拍出量は一回拍出量と心拍数の増加により約20％上昇します。",
          "doctorCheckIn": "初回妊婦健診（妊娠8〜10週）：経腟超音波で胎児心拍と頭殿長（CRL）を計測して分娩予定日（EDD）を確定し、妊娠初期血液検査（血液型、Rh、不規則抗体、血算、風疹、B型肝炎、HIV、梅毒、尿培養）および子宮頸がん検診を実施します。",
          "clinicalPearl": "妊娠7〜13週における頭殿長（CRL）の超音波計測は、出産予定日（EDD）を確定・修正する最も正確な基準となります。"
        },
        "9": {
          "phaseLabel": "妊娠初期 — 胎芽後期",
          "stageTitle": "胎芽心拍数のピーク・眼瞼癒合・横隔膜の形成",
          "biologicalStage": "後期胎芽（カーネギー段階 21–22）",
          "lengthMetric": "22 – 25 mm (2.3 cm 頭殿長)",
          "weightMetric": "2.0 g",
          "heartRateBpm": "155 – 175 BPM（生理的ピーク）",
          "keyOrgans": [
            "胸腹膜横隔膜",
            "眼瞼癒合",
            "下垂体・副腎皮質",
            "声帯靭帯"
          ],
          "fetalMilestones": [
            "自律神経（副交感神経）の成熟途上にあるため、胎芽の心拍数は今週、生理的ピーク（約165〜175 BPM）に達します。",
            "胸腹膜が横中隔と癒合し、胸腔と腹腔を隔てる横隔膜が完成します。",
            "上下の眼瞼が伸びて癒合し、発達中の角膜を保護するため妊娠25〜26週頃まで閉じた状態を保ちます。"
          ],
          "maternalPhysiology": "血中hCG濃度がピーク（約90,000〜100,000 mIU/mL）に達し、妊娠9〜10週頃はつわりの症状が最も強くなりやすい時期です。",
          "doctorCheckIn": "出生前遺伝学的検査の選択肢（妊娠10+0週からのNIPT［無侵襲的出生前遺伝学的検査］、保因者スクリーニング、NT超音波検査など）について主治医と相談しましょう。",
          "clinicalPearl": "激しい嘔吐により妊娠前体重の5％以上の減少、尿ケトン体陽性、24時間水分が摂れない状態（妊娠悪阻）がある場合は、点滴補液や制吐薬治療のため受診してください。"
        },
        "10": {
          "phaseLabel": "妊娠初期 — 胎芽から胎児への移行期",
          "stageTitle": "器官形成期の完了とNIPT（新型出生前診断）対象期間開始",
          "biologicalStage": "胎芽 → 胎児移行期（カーネギー段階 23）",
          "lengthMetric": "31 – 35 mm (3.3 cm 頭殿長)",
          "weightMetric": "4.0 g",
          "heartRateBpm": "150 – 170 BPM",
          "keyOrgans": [
            "軟骨内骨化",
            "ネフロン糸球体濾過",
            "乳歯歯胚",
            "絨毛膜絨毛"
          ],
          "fetalMilestones": [
            "妊娠10週の終わりは「胎芽（Embryo）」から「胎児（Fetus）」への正式な移行点であり、すべての主要臓器系の基本構造が確立します。",
            "永久腎（後腎）が希釈された胎児尿の産生を開始し、やがて羊水の主要な構成成分となります。",
            "胎芽期の尾は完全に退縮し、手指の爪床や顎の中の乳歯歯胚が形成されます。"
          ],
          "maternalPhysiology": "プロゲステロンとエストラジオールの産生主体が妊娠黄体から胎盤絨毛へと移行し始めます（黄体・胎盤シフト）。",
          "doctorCheckIn": "NIPT（母体血胎児染色体検査：セルフリーDNA）の採血ウィンドウが開始（妊娠10+0週）：21トリソミー（ダウン症候群、T21に対する感度99％以上）、18トリソミー、13トリソミー、性染色体異数性をスクリーニングします。",
          "clinicalPearl": "主要な構造的器官形成は第10週の終わりまでに完了するため、以降は胎児の発育・成熟期に入り、重大な形態異常のリスクは大きく低下します。"
        },
        "11": {
          "phaseLabel": "妊娠初期 — 胎児初期",
          "stageTitle": "中腸の腹腔内還納・口蓋癒合・鼻栓の形成",
          "biologicalStage": "初期胎児",
          "lengthMetric": "4.1 – 4.5 cm (頭殿長)",
          "weightMetric": "7.5 g",
          "heartRateBpm": "145 – 165 BPM",
          "keyOrgans": [
            "腹壁の閉鎖",
            "二次口蓋の癒合",
            "肝臓での赤血球造血",
            "毛包"
          ],
          "fetalMilestones": [
            "腸管が反時計回りに270度回転しながら胎児の腹腔内へ完全に還納され、生理的臍帯ヘルニアが解消します。",
            "上顎の口蓋突起が挙上して正中で癒合し、口腔と鼻腔が分離されます。",
            "歯茎の奥には20本の乳歯の歯胚が形成されています。"
          ],
          "maternalPhysiology": "プロゲステロンと一酸化窒素の作用で母体の末梢血管抵抗が低下するため、急に立ち上がった際に立ちくらみ（起立性低血圧）を感じることがあります。",
          "doctorCheckIn": "妊娠初期NT（頸部透亮像）超音波スクリーニング期間（妊娠11+0週〜13+6週）および適応がある場合の絨毛検査（CVS：10〜13週）の期間です。",
          "clinicalPearl": "胎児ヘモグロビン（HbF：α2γ2）は成人ヘモグロビン（HbA）よりも酸素親和性が高く、胎盤絨毛間腔での母体から胎児への酸素受け渡しを効率化します。"
        },
        "12": {
          "phaseLabel": "妊娠初期 — 12週マイルストーン（NT検査）",
          "stageTitle": "嚥下反射・腸管蠕動運動・低用量アスピリン予防開始時期",
          "biologicalStage": "胎児",
          "lengthMetric": "5.3 – 5.8 cm (頭殿長)",
          "weightMetric": "14 g (0.5 oz)",
          "heartRateBpm": "140 – 160 BPM",
          "keyOrgans": [
            "消化管蠕動運動",
            "下垂体ホルモン (ACTH/TSH)",
            "脾臓でのリンパ球産生",
            "鎖骨・大腿骨の骨化"
          ],
          "fetalMilestones": [
            "胎児は羊水を能動的に嚥下し始め、腸管平滑筋が協調的な蠕動運動とブドウ糖吸収を開始します。",
            "頭蓋骨、長管骨、椎骨に一次骨化中心が現れます。",
            "外性器がDHT（男性）またはDHT非存在（女性）のシグナルにより形態学的分化を始めます。"
          ],
          "maternalPhysiology": "子宮底が恥骨結合の上方へせり上がり、骨盤内臓器から腹腔内臓器へと移行するため、膀胱への圧迫が一時的に和らぎます。",
          "doctorCheckIn": "妊娠12週健診＋妊娠高血圧腎症の予防確認：高リスク因子が1つ以上、または中等度リスク因子（初産、35歳以上、BMI 30超など）が2つ以上ある場合、ACOG/USPSTFは妊娠12週から分娩まで低用量アスピリン（81 mg/日）の服用を推奨しています。",
          "clinicalPearl": "妊娠12週時点で正常な胎児心拍と染色体スクリーニング低リスクが確認されると、以降の自然流産率は1〜2％未満まで低下します。"
        },
        "13": {
          "phaseLabel": "妊娠初期 — 妊娠初期の最終週",
          "stageTitle": "声帯の成熟・指紋（皮膚紋理）の形成・胎盤内分泌の自律化",
          "biologicalStage": "胎児",
          "lengthMetric": "6.7 – 7.4 cm (頭殿長)",
          "weightMetric": "25 g (0.9 oz)",
          "heartRateBpm": "140 – 160 BPM",
          "keyOrgans": [
            "胎児・胎盤機能単位",
            "指紋（皮膚隆線）",
            "膵臓（インスリン分泌）",
            "卵巣原始卵胞"
          ],
          "fetalMilestones": [
            "指先の掌側パッドに固有の皮膚隆線（指紋）が形成され始めます。",
            "女児胎児では発達中の卵巣内で卵祖細胞が急速に増殖します（妊娠中期までに約200万個の原始卵胞となります）。",
            "体幹の成長に伴い頭部の比率が相対的に小さくなり、頭部は頭殿長（CRL）の約3分の1になります。"
          ],
          "maternalPhysiology": "胎盤が内分泌機能を完全に担うようになり、hCG値がピークを越えて低下し始めるため、つわりが和らぎ体調が回復してきます。",
          "doctorCheckIn": "NT（頸部透亮像）計測の最終週です（13週6日／CRL 84 mm以下までに実施）。妊娠中の歯科検診・クリーニングもこの時期に予約しましょう。",
          "clinicalPearl": "妊娠中は血管透過性の亢進により妊娠性歯肉炎が起こりやすくなります。全身性のアドレナリン過剰負荷を避けた歯科用局所麻酔（リドカイン）や通常の歯科クリーニングは妊娠中も完全に安全です。"
        },
        "14": {
          "phaseLabel": "妊娠中期 — 妊娠中期（安定期）の開始",
          "stageTitle": "産毛（ラヌゴ）の出現・甲状腺ホルモン合成・表情筋の動き",
          "biologicalStage": "妊娠中期胎児",
          "lengthMetric": "8.5 cm (頭殿長) / ~12 cm (頭踵長)",
          "weightMetric": "45 g (1.6 oz)",
          "heartRateBpm": "135 – 155 BPM",
          "keyOrgans": [
            "胎児甲状腺（チロキシン T4）",
            "第VII脳神経（顔面神経）",
            "産毛（ラヌゴ）",
            "前立腺形成 / 卵巣下降"
          ],
          "fetalMilestones": [
            "胎児の甲状腺がヨウ素を取り込み、神経発達を促す内因性チロキシン（T4）の合成を開始します。",
            "第VII脳神経（顔面神経）が表情筋を支配し、目を細めたり眉をひそめたりする表情反射が現れます。",
            "皮膚を保護する胎脂（ベルニクス）を留めるための極めて細い産毛（ラヌゴ）が生え始めます。"
          ],
          "maternalPhysiology": "妊娠中期（安定期）に入りました。食欲が戻り、母体の心拍出量は非妊時の約30〜40％増に達します。",
          "doctorCheckIn": "子宮頸管無力症や34週未満の自然早産の既往がある場合は、経腟超音波による頸管長モニタリングや予防的頸管縫縮術（12〜14週頃）について相談してください。",
          "clinicalPearl": "妊娠14週から胎児の甲状腺が働き始めるため、胎児の脳発達に不可欠なヨウ素の適切な摂取（妊婦推奨量約220〜240 mcg/日）が重要です。"
        },
        "15": {
          "phaseLabel": "妊娠中期 — 骨格の骨化と聴覚の発達",
          "stageTitle": "中耳耳小骨の骨化・羊水呼吸様運動・母体血清AFP検査時期",
          "biologicalStage": "胎児",
          "lengthMetric": "10.1 cm (頭殿長) / ~14.5 cm (頭踵長)",
          "weightMetric": "70 g (2.5 oz)",
          "heartRateBpm": "135 – 155 BPM",
          "keyOrgans": [
            "ツチ骨・キヌタ骨・アブミ骨",
            "気管・気管支樹",
            "長管骨骨幹部",
            "味蕾（みらい）"
          ],
          "fetalMilestones": [
            "中耳の3つの耳小骨（ツチ骨・キヌタ骨・アブミ骨）の骨化が始まり、伝音聴覚路の準備が進みます。",
            "間欠的な胎児呼吸様運動により羊水が気管支樹に出入りし、肺胞系の発育を促します。",
            "骨格筋の神経支配が強まり、上肢よりも下肢の方が長くなります。"
          ],
          "maternalPhysiology": "エストロゲンによるメラノサイト刺激により、腹部の正中線（黒線）や乳輪の色素沈着、肝斑が現れることがあります。",
          "doctorCheckIn": "母体血清マーカー（MSAFP／クアトロテスト）検査期間（妊娠15〜20週）：開放性神経管奇形（二分脊椎など）のスクリーニングが可能です。",
          "clinicalPearl": "睡眠時の姿勢：妊娠中期以降は、増大した子宮による下大静脈の圧迫を防ぐため、横向き（特に左側臥位）での睡眠が推奨されます。"
        },
        "16": {
          "phaseLabel": "妊娠中期 — 4ヶ月（16週）マイルストーン",
          "stageTitle": "サッカード眼球運動・四肢の協調運動・胎動初覚（クイックニング）",
          "biologicalStage": "胎児",
          "lengthMetric": "11.6 cm (頭殿長) / ~16.5 cm (頭踵長)",
          "weightMetric": "100 g (3.5 oz)",
          "heartRateBpm": "130 – 155 BPM",
          "keyOrgans": [
            "外眼筋",
            "臍帯ワルトン膠様質",
            "胎児膀胱の周期的排尿",
            "皮膚感覚受容器"
          ],
          "fetalMilestones": [
            "中脳の動眼神経核が成熟し、閉じた眼瞼の下でゆっくりとした眼球運動が始まります。",
            "胎児の心臓はワルトン膠様質に守られた3血管臍帯（臍帯動脈2本・臍帯静脈1本）を通じて1日約24リットル（25クォート）の血液を拍出します。",
            "胎児の膀胱は30〜45分ごとに充満と排尿を繰り返し、羊水量を維持しています。"
          ],
          "maternalPhysiology": "経産婦の方や後壁胎盤の方は、妊娠16〜20週頃に最初の微かな胎動（初覚）を感じ始めることがあります。",
          "doctorCheckIn": "妊娠16週健診：血圧、体重、尿検査、ドップラー心音確認。妊娠20週前後の精密形態超音波（中期胎児スクリーニング）を予約しましょう。",
          "clinicalPearl": "前壁胎盤（子宮の前側の壁に付着している胎盤）の場合、胎盤がクッションとなるため最初の胎動を感じる時期が妊娠20〜22週頃まで遅れることがよくありますが、完全に正常です。"
        },
        "17": {
          "phaseLabel": "妊娠中期 — 褐色脂肪と免疫系の成熟",
          "stageTitle": "褐色脂肪組織の蓄積開始と経胎盤IgG抗体移行の開始",
          "biologicalStage": "胎児",
          "lengthMetric": "13.0 cm (頭殿長) / ~18.5 cm (頭踵長)",
          "weightMetric": "140 g (5.0 oz)",
          "heartRateBpm": "130 – 155 BPM",
          "keyOrgans": [
            "褐色脂肪組織 (BAT)",
            "蝸牛有毛細胞",
            "汗腺",
            "胎盤 FcRn IgG 受容体"
          ],
          "fetalMilestones": [
            "出生後の非ふるえ熱産生を担う褐色脂肪組織（BAT）が頸部、胸骨周囲、腎臓周囲に蓄積し始めます。",
            "胎盤のFcRn受容体を介して、母体のIgG抗体が胎児循環へ能動輸送され始めます。",
            "蝸牛のコルチ器に有毛細胞が整列し、母体の心音や大動脈血流音などの低周波音が内耳を刺激し始めます。"
          ],
          "maternalPhysiology": "子宮を支える円靭帯が引き伸ばされることで、寝返りや立ち上がり、咳の際に足の付け根（鼠径部）に一瞬ピリッとした痛み（円靭帯痛）を感じることがあります。",
          "doctorCheckIn": "羊水検査（確定診断）の適応期間（妊娠15〜20週）：NIPT等で高リスクの場合や超音波所見がある場合に染色体・マイクロアレイ検査として実施されます。",
          "clinicalPearl": "円靭帯痛は体動時に数秒間生じる一過性の痛みです。持続的・規則的な腹痛や出血・発熱を伴う場合は速やかに産婦人科を受診してください。"
        },
        "18": {
          "phaseLabel": "妊娠中期 — 神経・感覚器の発達",
          "stageTitle": "神経髄鞘化（ミエリン化）の開始・胎脂の形成・中期精密超音波期間の開始",
          "biologicalStage": "胎児",
          "lengthMetric": "14.2 cm (頭殿長) / ~20.5 cm (頭踵長)",
          "weightMetric": "190 g (6.7 oz)",
          "heartRateBpm": "125 – 155 BPM",
          "keyOrgans": [
            "シュワン細胞による髄鞘化",
            "皮脂腺（胎脂ベルニクス）",
            "心臓流出路",
            "脳梁"
          ],
          "fetalMilestones": [
            "皮脂腺が胎脂（ベルニクス・カゼオーサ）を分泌し始め、脂質と抗菌成分に富む保護膜で胎児の皮膚を羊水から守ります。",
            "末梢のシュワン細胞と中枢のオリゴデンドロサイトが神経軸索の髄鞘化（ミエリン形成）を開始し、神経伝導速度を高めます。",
            "心臓の4つの部屋（4腔断面）と左右の流出路が超音波検査ではっきり確認できるようになります。"
          ],
          "maternalPhysiology": "妊娠中期の生理的血圧低下：全身の血管拡張により、妊娠18〜20週頃に母体の血圧が最も低い時期（非妊時より5〜10 mmHg低下）を迎えます。",
          "doctorCheckIn": "妊娠中期精密形態超音波（レベルIIアナトミースキャン）の推奨期間（妊娠18〜22週）：心臓や脊椎の描出に最適な19〜21週頃の実施が推奨されます。",
          "clinicalPearl": "形態超音波の際には子宮頸管長（妊娠18〜24週の正常値は25 mm以上）も計測し、早産リスクの評価を行います。"
        },
        "19": {
          "phaseLabel": "妊娠中期 — 感覚野皮質のマッピング",
          "stageTitle": "体性感覚野のマッピングと腎尿細管濃縮機能の成熟",
          "biologicalStage": "胎児",
          "lengthMetric": "15.3 cm (頭殿長) / ~22.5 cm (頭踵長)",
          "weightMetric": "240 g (8.5 oz)",
          "heartRateBpm": "125 – 155 BPM",
          "keyOrgans": [
            "体性感覚野皮質",
            "ヘンレ係蹄（ループ）",
            "永久歯歯胚",
            "細気管支の分岐"
          ],
          "fetalMilestones": [
            "視床皮質投射が大脳皮質サブプレートに到達し、聴覚・視覚・触覚の情報処理基盤が築かれます。",
            "上下の顎の乳歯歯胚の奥深くに、永久歯の歯胚が形成され始めます。",
            "肺発生が「管状期」に入り、呼吸細気管支の分岐と肺毛細血管の増殖が進みます。"
          ],
          "maternalPhysiology": "母体の循環血液量は約30〜35％増加しており、赤血球増産に伴う鉄需要を満たすため、食事やサプリメントからの鉄分摂取が重要です。",
          "doctorCheckIn": "20週健診と精密形態超音波に向けた質問（胎盤の位置と内子宮口からの距離、3血管臍帯の確認、両親学級の案内など）を準備しましょう。",
          "clinicalPearl": "妊娠19〜20週時点で「低置胎盤ぎみ」と言われても、子宮下部の伸展に伴い妊娠32週までに90％以上が正常位置へ上昇します。"
        },
        "20": {
          "phaseLabel": "妊娠中期 — 妊娠折り返し（精密形態超音波）",
          "stageTitle": "妊娠折り返しマイルストーン：レベルII精密形態超音波検査と子宮底が臍高に到達",
          "biologicalStage": "妊娠折り返し期胎児",
          "lengthMetric": "25.5 cm (10.0 in 頭踵長 CHL)",
          "weightMetric": "300 g (10.6 oz)",
          "heartRateBpm": "120 – 155 BPM",
          "keyOrgans": [
            "心臓4腔断面および流出路像",
            "後頭蓋窩・小脳",
            "胎便の蓄積",
            "表皮角質層"
          ],
          "fetalMilestones": [
            "妊娠20週以降は胎児の脚が伸びるため、頭殿長（CRL）ではなく頭頂から踵までの全長（CHL：頭踵長）を計測します。",
            "無菌の胎便（脱落した腸管上皮細胞、産毛、胆汁色素、嚥下した羊水）が胎児の結腸内に蓄積し始めます。",
            "概日リズムに近い睡眠・覚醒サイクルが現れ、20〜40分周期で活動期と休止期を繰り返します。"
          ],
          "maternalPhysiology": "子宮底が母体の臍（へそ）の高さに達します。妊娠20〜36週の間、子宮底長（cm）はおよそ妊娠週数（±2 cm）に相当します。",
          "doctorCheckIn": "妊娠20週健診および精密形態超音波（18〜22週）：脳室、顔面・口唇、4腔心臓と流出路、胃泡、腎臓、膀胱、脊椎、3血管臍帯、胎盤位置、頸管長を全身くまなく確認します。",
          "clinicalPearl": "妊娠20週以降の血圧管理が重要な理由：妊娠20週以降に初めて発症する高血圧（140/90 mmHg以上）は、妊娠高血圧症候群／妊娠高血圧腎症の診断基準となります。"
        },
        "21": {
          "phaseLabel": "妊娠中期 — 骨髄造血への移行",
          "stageTitle": "骨髄造血への移行と消化酵素の成熟",
          "biologicalStage": "胎児",
          "lengthMetric": "26.7 cm (10.5 in 頭踵長)",
          "weightMetric": "360 g (12.7 oz)",
          "heartRateBpm": "120 – 155 BPM",
          "keyOrgans": [
            "骨髄赤血球造血",
            "小腸絨毛",
            "脾臓赤脾髄",
            "前庭迷路（平衡感覚）"
          ],
          "fetalMilestones": [
            "消化管が嚥下した羊水から水分と糖分を吸収し始めます（妊娠期間を通じて約24 L / 25 qtの羊水が循環します）。",
            "小腸の微絨毛に二糖類分解酵素（ラクターゼ、スクラーゼ）が発現し、嚥下した羊水から水分や電解質を吸収します。",
            "内耳の前庭半規管が母体の動きを感知するため、日中の歩行時は揺られて眠り、母体が横になると活発に動くことが多くなります。"
          ],
          "maternalPhysiology": "リラキシンというホルモンが恥骨結合や仙腸関節を緩めて産道の準備を始めるため、骨盤周りの軽い痛みを感じることがあります。",
          "doctorCheckIn": "20週の形態超音波で胎児の向きのために見えにくかった部位がある場合は、2〜4週間後に再確認の超音波検査が組まれます。",
          "clinicalPearl": "夜間に胎動を強く感じやすい理由：日中の歩行の揺れがゆりかごのように胎児を眠らせ、夜に静かに横になると胎児が覚醒モードになるためです。"
        },
        "22": {
          "phaseLabel": "妊娠中期 — 聴覚と触覚の統合",
          "stageTitle": "母体音声の聴覚認識・眉毛の形成・把握反射",
          "biologicalStage": "胎児",
          "lengthMetric": "27.8 cm (10.9 in 頭踵長)",
          "weightMetric": "430 g (15.2 oz)",
          "heartRateBpm": "120 – 155 BPM",
          "keyOrgans": [
            "蝸牛・聴覚野神経路",
            "手掌把握反射",
            "涙管",
            "肺胞管原基"
          ],
          "fetalMilestones": [
            "聴性脳幹反応が成熟し、胎児は母体の声の抑揚や外部の低い音を聞き分け始めます。",
            "手掌把握反射が発達し、胎児はしばしば臍帯を握ります（ワルトン膠様質が血管を圧迫から守っています）。",
            "眉毛や頭部の細い毛髪が見えてきますが、メラニン色素はまだ十分に沈着していません。"
          ],
          "maternalPhysiology": "生理的水血症（血液希釈）：赤血球量の増加（約25〜30％）よりも血漿量の増加（約45〜50％）が上回るため、ヘモグロビン値が軽度低下します。",
          "doctorCheckIn": "適応がある場合（IVF妊娠、妊娠前からの糖尿病、先天性心疾患の家族歴など）は、妊娠20〜22週頃に胎児心エコー精密検査を行います。",
          "clinicalPearl": "妊娠後半には、痛みを伴わない不規則で30秒未満の子宮の張り（ブラクストン・ヒックス収縮）が現れることがありますが、水分補給と安静で治まります。"
        },
        "23": {
          "phaseLabel": "妊娠中期 — 生育限界期の肺サーファクタント形成",
          "stageTitle": "II型肺胞上皮細胞の分化と初期サーファクタントリポタンパク合成",
          "biologicalStage": "胎児（生育限界ウィンドウ）",
          "lengthMetric": "28.9 cm (11.4 in 頭踵長)",
          "weightMetric": "500 g (1.1 lbs)",
          "heartRateBpm": "120 – 155 BPM",
          "keyOrgans": [
            "II型肺胞上皮細胞",
            "肺毛細血管床",
            "レム（REM）睡眠",
            "膵ランゲルハンス島"
          ],
          "fetalMilestones": [
            "末梢気道でII型肺胞上皮細胞が分化し、初期の肺サーファクタント（層状封入体）の合成を開始します。",
            "肺毛細血管が気道上皮に密着し、原始的な血液・空気関門が形成されます。",
            "レム（REM）睡眠サイクルが始まり、視覚野および感覚運動野の神経回路ネットワーク形成を促します。"
          ],
          "maternalPhysiology": "子宮の上昇による胃の圧迫とプロゲステロンによる下部食道括約筋の弛緩により、胃食道逆流（胸やけ）が起こりやすくなります。",
          "doctorCheckIn": "切迫早産のサインを把握しましょう：規則的なお腹の張り・痛み（1時間に4〜6回以上）、持続的な腰背部痛、水様性・粘液性・血性の帯下変化。",
          "clinicalPearl": "妊娠23〜24週は周産期医療における生育限界（成育限界）の節目であり、切迫早産時には母体へのステロイド（ベタメタゾン）投与が胎児の肺成熟を強力に促します。"
        },
        "24": {
          "phaseLabel": "妊娠中期 — 生育限界到達と妊娠糖尿病スクリーニング",
          "stageTitle": "肺の終末嚢期への移行・成育限界マイルストーン・糖負荷検査（GCT）期間開始",
          "biologicalStage": "胎児",
          "lengthMetric": "30.0 cm (11.8 in 頭踵長)",
          "weightMetric": "600 g (1.32 lbs)",
          "heartRateBpm": "120 – 155 BPM",
          "keyOrgans": [
            "終末嚢（肺胞嚢）",
            "内耳前庭系",
            "胎児膵β細胞",
            "皮膚毛細血管"
          ],
          "fetalMilestones": [
            "肺の発生が管状期から「終末嚢期（嚢状期）」へ移行し、呼吸細気管支の末端に終末嚢（原始肺胞嚢）が形成されます。",
            "内耳の前庭器官が構造的に成熟し、羊水腔内での空間的な姿勢感覚が備わります。",
            "皮下の毛細血管床に血流が満ち、胎児の皮膚が半透明から赤みを帯びたピンク色へと変化します。"
          ],
          "maternalPhysiology": "胎盤から分泌されるヒト胎盤性ラクトゲン（hPL）やコルチゾールが増加し、胎児へ優先的にブドウ糖を送るための生理的なインスリン抵抗性が生じます。",
          "doctorCheckIn": "妊娠24週健診＋妊娠糖尿病（GDM）スクリーニング期間開始（妊娠24〜28週）：1時間50g経口ブドウ糖負荷試験（GCT）および妊娠後期の血算（CBC）・不規則抗体検査が案内されます。",
          "clinicalPearl": "妊娠24〜28週に妊娠糖尿病検査を行う理由：胎盤由来のインスリン拮抗ホルモン（hPL）が24週頃から急増し、約6〜9％の妊婦で耐糖能低下が顕在化するためです。"
        },
        "25": {
          "phaseLabel": "妊娠中期 — 肺毛細血管網と鼻孔の開通",
          "stageTitle": "鼻栓の開通・毛細血管網の発達・脊椎の骨化進行",
          "biologicalStage": "胎児",
          "lengthMetric": "34.6 cm (13.6 in 頭踵長)",
          "weightMetric": "660 g (1.45 lbs)",
          "heartRateBpm": "120 – 155 BPM",
          "keyOrgans": [
            "鼻孔の開通",
            "肺サーファクタントタンパク質 (SP-B/SP-C)",
            "椎弓の骨化",
            "利き手神経回路"
          ],
          "fetalMilestones": [
            "鼻孔を塞いでいた上皮プラグが溶解して鼻腔が開通し、羊水を吸い込む呼吸様運動がより活発になります。",
            "II型肺胞上皮細胞内でサーファクタントタンパク質BおよびC（SP-B、SP-C）が増加します。",
            "脊柱の構造（33個の椎骨、150の関節、1,000本の靭帯）が強化され、増大する体重を支えます。"
          ],
          "maternalPhysiology": "下肢の静脈圧が上昇するため、夜間にふくらはぎのこむら返りが起きたり、夕方に足首の軽いむくみ（浮腫）が出ることがあります。",
          "doctorCheckIn": "妊娠24〜28週の間に1時間50g経口ブドウ糖負荷試験（GCT）を受けましょう。主治医から特別な指示がない限り、1時間スクリーニング検査前の絶食は不要です。",
          "clinicalPearl": "1時間GCTが135〜140 mg/dL以上でも慌てる必要はありません。これはスクリーニング検査であり、絶食下での3時間100g精密ブドウ糖負荷試験（GTT）を受ける妊婦さんの約75〜80％は正常と判定されます。"
        },
        "26": {
          "phaseLabel": "妊娠中期 — 視覚の覚醒と開眼",
          "stageTitle": "眼瞼の開眼・瞬目驚愕反射・網膜桿体細胞の発達",
          "biologicalStage": "胎児",
          "lengthMetric": "35.6 cm (14.0 in 頭踵長)",
          "weightMetric": "760 g (1.68 lbs)",
          "heartRateBpm": "120 – 155 BPM",
          "keyOrgans": [
            "網膜視細胞（錐体・桿体）",
            "視神経の髄鞘化",
            "音響振動驚愕反射",
            "精巣の鼠径管下降"
          ],
          "fetalMilestones": [
            "妊娠9週以来閉じていた上下の眼瞼が分離して初めて開眼し、強い光や大きな音に対して瞬目・驚愕反射（音響振動驚愕反射）を示します。",
            "網膜の桿体細胞と錐体細胞（視細胞）が分化します。",
            "男児胎児では、精巣導帯に導かれて精巣が鼠径管内へ下降し始めます。"
          ],
          "maternalPhysiology": "横隔膜が約4 cm押し上げられる一方で胸郭周囲径が5〜7 cm広がり、一回換気量が30〜40％増加します。",
          "doctorCheckIn": "後期血液検査のヘモグロビン・ヘマトクリット値およびフェリチン値を確認し、鉄欠乏性貧血（第2三半期 Hb <10.5 g/dL、第3三半期 <11.0 g/dL）がないかチェックしましょう。",
          "clinicalPearl": "経口鉄剤はビタミンCと一緒に摂取したり隔日投与にすることで、十二指肠での鉄吸収効率が高まり便秘などの胃腸症状が軽減します。"
        },
        "27": {
          "phaseLabel": "妊娠中期 — 妊娠中期の最終週",
          "stageTitle": "視床皮質痛覚路の形成・胎児のしゃっくり・Tdapワクチン接種期間の開始",
          "biologicalStage": "胎児",
          "lengthMetric": "36.6 cm (14.4 in 頭踵長)",
          "weightMetric": "875 g (1.93 lbs)",
          "heartRateBpm": "120 – 155 BPM",
          "keyOrgans": [
            "大脳脳回の形成開始",
            "横隔神経・横隔膜",
            "胎児脾臓・胸腺",
            "皮下白色脂肪"
          ],
          "fetalMilestones": [
            "規則的な胎児横隔膜痙攣（胎児のしゃっくり）が頻繁になり、数秒ごとのリズミカルなピクピクとした動きとして感じられます。",
            "滑らかだった大脳半球の表面に一次脳溝と脳回（しわ）が形成され始め、大脳皮質の表面積が拡大します。",
            "胎児の胸腺でTリンパ球が成熟します。"
          ],
          "maternalPhysiology": "妊娠中期の最終週となり、子宮底は臍の上約7 cmに達します。むくみにより手首の正中神経が圧迫され、軽い手のしびれ（手根管症候群）が出ることがあります。",
          "doctorCheckIn": "Tdapワクチン接種ウィンドウ開始（妊娠27〜36週）：新生児への百日咳IgG抗体移行を最大化するため、CDCとACOGは毎回の妊娠で27〜36週（理想的には27〜30週）でのTdap接種を推奨しています。",
          "clinicalPearl": "胎児のしゃっくりは横隔神経と脳幹呼吸中枢が成熟している正常なサインであり、5〜15分ほど続く規則的なリズムとして感じられます。"
        },
        "28": {
          "phaseLabel": "妊娠後期 — 妊娠後期の開始と2週ごとの健診移行",
          "stageTitle": "妊娠後期（第3三半期）突入・抗D免疫グロブリン（RhoGAM）予防・毎日の胎動カウント開始",
          "biologicalStage": "妊娠後期胎児",
          "lengthMetric": "37.6 cm (14.8 in 頭踵長)",
          "weightMetric": "1,005 g（2.22 lb — 1 kg マイルストーン！）",
          "heartRateBpm": "115 – 155 BPM",
          "keyOrgans": [
            "瞳孔対光反射",
            "サーファクタント・レシチン合成",
            "小脳回（小脳葉）",
            "Rh(D) 抗原の発現"
          ],
          "fetalMilestones": [
            "胎児の体重が1キログラム（2.2ポンド）の大台を超え、皮下の白色脂肪組織が体重の約2〜3％に達します。",
            "瞳孔が光に反応して収縮・散大し、睡眠サイクルに明確なレム睡眠とノンレム睡眠の脳波パターンが現れます。",
            "肺サーファクタントの産生が加速し、レシチン・スフィンゴミエリン（L/S）比が上昇します。"
          ],
          "maternalPhysiology": "妊娠後期（第3三半期）に入りました。子宮血流量は毎分約500〜700 mL（約80％が胎盤へ還流）に達します。",
          "doctorCheckIn": "妊娠28週健診（2週間ごとの健診へ移行）：1時間糖負荷試験（GCT）結果の確認、Tdapワクチン接種、Rhマイナス妊婦への抗D免疫グロブリン（RhoGAM 300 mcg IM）投与、および毎日の胎動カウント開始。",
          "clinicalPearl": "ACOG胎動カウント法（妊娠28週から開始）：毎日1回（食後など）、横になって赤ちゃんが10回動く（しゃっくりを除くキックや回転）までの時間を測ります。通常は2時間未満（多くは30分未満）です。2時間で10回未満の場合は直ちに産院へ連絡しNSTを受けてください。"
        },
        "29": {
          "phaseLabel": "妊娠後期 — 骨格の石灰化とミネラル蓄積",
          "stageTitle": "急速な骨カルシウム沈着と視床下部による体温調節機能の成熟",
          "biologicalStage": "胎児",
          "lengthMetric": "38.6 cm (15.2 in 頭踵長)",
          "weightMetric": "1,150 g (2.54 lbs)",
          "heartRateBpm": "115 – 155 BPM",
          "keyOrgans": [
            "骨芽細胞によるカルシウム沈着",
            "視床下部視索前野（体温調節）",
            "副腎 DHEA-S 合成",
            "肺胞中隔形成"
          ],
          "fetalMilestones": [
            "胎盤は母体循環から1日あたり約250〜300 mgのカルシウムを胎児の骨格へと能動輸送します。",
            "視床下部の中枢性体温調節回路が成熟します。",
            "胎児の副腎が大きくなりDHEA-Sを分泌し、胎盤でエストリオールへと変換されます。"
          ],
          "maternalPhysiology": "胎児の体重増加と腰椎前弯により重心が前方へ移動します。サポート力のある靴や骨盤チルト体操が腰痛予防に有効です。",
          "doctorCheckIn": "今週は定期健診のない週です（次回は妊娠30週）。毎日胎動カウントと体調確認を続けましょう。",
          "clinicalPearl": "胎児の全骨カルシウムおよび鉄貯蔵量の約80％は妊娠後期に蓄積されるため、1日1,000 mgのカルシウムと十分な鉄分摂取を心がけましょう。"
        },
        "30": {
          "phaseLabel": "妊娠後期 — 大脳皮質の皺形成と骨髄造血の確立",
          "stageTitle": "大脳皮質の脳回深化・骨髄造血の確立・羊水量のピーク",
          "biologicalStage": "胎児",
          "lengthMetric": "39.9 cm (15.7 in 頭踵長)",
          "weightMetric": "1,320 g (2.91 lbs)",
          "heartRateBpm": "115 – 155 BPM",
          "keyOrgans": [
            "二次・三次脳溝の形成",
            "骨髄造血の優位確立",
            "横隔膜呼吸様運動サイクル",
            "産毛（ラヌゴ）の脱落開始"
          ],
          "fetalMilestones": [
            "大脳皮質の脳回形成（しわの形成）が急速に進み、高次脳機能を支える深い二次脳溝が作られます。",
            "骨髄が主たる造血臓器となり、胎児赤血球は約60〜90日の寿命で循環します。",
            "皮下脂肪が厚みを増すにつれ、初期の産毛（ラヌゴ）が羊水中へ抜け落ち始めます。"
          ],
          "maternalPhysiology": "羊水量は妊娠30〜34週頃に生理的ピーク（約800〜1,000 mL）に達し、その後は正期産に向けて緩やかに減少していきます。",
          "doctorCheckIn": "妊娠30週健診（2週間ごと）：血圧測定、尿蛋白・尿糖検査、子宮底長計測（目安28〜32 cm）、ドップラー胎児心音確認、切迫早産サインの確認。",
          "clinicalPearl": "子宮底長が妊娠週数相当より3 cm以上大きい、または小さい場合は、胎児発育および羊水量を評価する超音波検査が行われます。"
        },
        "31": {
          "phaseLabel": "妊娠後期 — シナプス形成と皮下脂肪の急増",
          "stageTitle": "数兆個のシナプス結合の形成と脳内DHAの急速な蓄積",
          "biologicalStage": "胎児",
          "lengthMetric": "41.1 cm (16.2 in 頭踵長)",
          "weightMetric": "1,500 g (3.31 lbs)",
          "heartRateBpm": "115 – 155 BPM",
          "keyOrgans": [
            "網膜・視覚野神経ループ",
            "DHAリン脂質神経膜",
            "腎糸球体濾過機能",
            "吸啜・嚥下協調反射"
          ],
          "fetalMilestones": [
            "胎児の脳は神経細胞膜や網膜視細胞の発達のため、1日あたり約50〜70 mgのオメガ3脂肪酸（DHA）を急速に蓄積します。",
            "五感（視覚、聴覚、味覚、羊水中の香気成分による嗅覚、触覚）がすべて機能的に活動しています。",
            "これから正期産にかけて、胎児は毎週約150〜200グラム（0.35〜0.5ポンド）ずつ体重を増やしていきます。"
          ],
          "maternalPhysiology": "乳腺房では免疫グロブリンA（IgA）に富む初乳が合成され始め、少量の分泌が見られることがあります。",
          "doctorCheckIn": "ハイリスク妊娠（35〜40歳以上、インスリン管理中のGDM、慢性高血圧、双胎など）では、妊娠32週頃から週1〜2回のNST（ノンストレステスト）やBPPによる胎児モニタリングが始まります。",
          "clinicalPearl": "胎内での味覚学習：母体の食事に含まれる風味成分は羊水へ移行し、胎児がそれを嚥下することで出生後の離乳食の受け入れやすさに影響すると言われています。"
        },
        "32": {
          "phaseLabel": "妊娠後期 — 頭位への回転とRSウイルスワクチン保護",
          "stageTitle": "頭位への回転・手指の爪の完成・母体RSウイルスワクチン接種期間",
          "biologicalStage": "胎児（頭位定着期）",
          "lengthMetric": "42.4 cm (16.7 in 頭踵長)",
          "weightMetric": "1,700 g (3.75 lbs)",
          "heartRateBpm": "110 – 155 BPM",
          "keyOrgans": [
            "頭位（頭下位）",
            "サーファクタント・ホスファチジルグリセロール (PG)",
            "手指の爪の完成",
            "母体・胎児間 IgG 抗体移行の急増"
          ],
          "fetalMilestones": [
            "約85〜90％の胎児が洋梨状の子宮腔に合わせて頭を下にした頭位（頭위）へと回転します。",
            "手の爪が指先まで達し、皮下脂肪が体重の約7〜8％に増えて皮膚は滑らかでふっくらしてきます。",
            "活動睡眠時の30〜40％の時間で胎児呼吸様運動が見られ、BPP（バイオフィジカルプロファイル）超音波の評価項目となります。"
          ],
          "maternalPhysiology": "母体の血漿量が最大（非妊時の＋45〜50％）に達し、循環器系への負荷がピークを迎えます。",
          "doctorCheckIn": "妊娠32週健診＋母体RSウイルスワクチン接種期間開始（妊娠32〜36週）：CDCおよびACOGは新生児の重篤なRSウイルス細気管支炎を予防するため、32w0d〜36w6dの間に母体RSウイルスワクチン（アブリスボ）1回接種を推奨しています。",
          "clinicalPearl": "32週以降の胎動の感じ方の変化：子宮内のスペースが狭くなるため、大きく蹴る動きから「ぐにゅっと回る・伸びをする・肘や踵で押す」動きに変わりますが、胎動の回数は減りません。"
        },
        "33": {
          "phaseLabel": "妊娠後期 — 母体IgG抗体移行と頭蓋骨の柔軟性",
          "stageTitle": "頭蓋泉門と縫合・経胎盤IgG移行のピーク・吸啜協調運動の開始",
          "biologicalStage": "胎児",
          "lengthMetric": "43.7 cm (17.2 in 頭踵長)",
          "weightMetric": "1,920 g (4.23 lbs)",
          "heartRateBpm": "110 – 155 BPM",
          "keyOrgans": [
            "大泉門・小泉門",
            "吸啜・嚥下・呼吸の三徴協調",
            "ネフロン形成の完了間近",
            "胎盤を介した IgG 抗体輸送"
          ],
          "fetalMilestones": [
            "長管骨の石灰化が進む一方、頭蓋骨は産道を通過する際の応形機能（モールディング）のために骨縫合と泉門（大泉門・小泉門）で柔らかく保たれています。",
            "胎盤を通過した胎児血中のIgG抗体濃度が母体血中濃度に追いつき、やがて母体濃度を上回ります。",
            "脳幹の神経核が「吸啜（吸う）・嚥下（飲み込む）・呼吸」のリズミカルな協調運動を整え始めます。"
          ],
          "maternalPhysiology": "子宮底がみぞおち（剣状突起）近くに達するため、1回の食事量を減らして回数を分ける（分割食）ことや上半身を少し高くして休むことで胃の圧迫や逆流が和らぎます。",
          "doctorCheckIn": "出生後の小児科（かかりつけ医）や1か月健診の流れを確認し、後ろ向きチャイルドシートの取り付け準備を進めましょう。",
          "clinicalPearl": "胎動に伴う一過性頻脈（心拍数が15 BPM以上・15秒以上上昇する反応）は、胎児の自律神経系と酸素化状態が良好である重要なサインです。"
        },
        "34": {
          "phaseLabel": "妊娠後期 — 後期早産閾値とネフロン形成完了",
          "stageTitle": "生涯分のネフロン形成完了と肺サーファクタント分泌の急増",
          "biologicalStage": "後期早産期胎児",
          "lengthMetric": "45.0 cm (17.7 in 頭踵長)",
          "weightMetric": "2,150 g (4.74 lbs)",
          "heartRateBpm": "110 – 155 BPM",
          "keyOrgans": [
            "片腎あたり100万個のネフロン完成",
            "ホスファチジルコリン・サーファクタント",
            "胎脂（ベルニクス）の肥厚",
            "精巣の陰嚢内下降完了"
          ],
          "fetalMilestones": [
            "腎ネフロンの新規形成（ネフロン形成）は妊娠34〜36週で生涯分が完了し、片腎あたり約100万個のネフロンが備わります。",
            "肺サーファクタントの分泌が急増し、妊娠34週以降に出生した児の生存率は98％を超え、長期的な呼吸器合併症リスクは大幅に低下します。",
            "胎脂（ベルニクス）のコーティングが厚くクリーミーになり、手足の爪もしっかりと形成されています。"
          ],
          "maternalPhysiology": "夕方の足首の軽いむくみは生理的ですが、顔や手の急激なむくみに頭痛や視覚異常（チカチカする等）を伴う場合は直ちに血圧測定が必要です。",
          "doctorCheckIn": "妊娠34週健診（2週間ごと）：血圧・尿検査、妊娠高血圧腎症の徴候確認、子宮底長、レオポルド触診法による胎位確認、バースプラン・無痛分娩等の相談。",
          "clinicalPearl": "妊娠34週は産科管理の大きな節目です。34週0日以降は胎児の肺および全身の成熟が進んでいるため、陣痛が発来しても無理な子宮収縮抑制（張り止め）は行わないのが一般的です。"
        },
        "35": {
          "phaseLabel": "妊娠後期 — 肝機能・代謝系の成熟と鉄貯蔵",
          "stageTitle": "肝グリコーゲン貯蔵・鉄貯蔵の強化・皮下脂肪の急速な増加",
          "biologicalStage": "胎児",
          "lengthMetric": "46.2 cm (18.2 in 頭踵長)",
          "weightMetric": "2,385 g (5.25 lbs)",
          "heartRateBpm": "110 – 150 BPM",
          "keyOrgans": [
            "肝臓のグリコーゲン・鉄分貯蔵",
            "ビリルビン抱合酵素 (UGT1A1)",
            "皮下脂肪（体重の10%）",
            "協調的吸啜反射"
          ],
          "fetalMilestones": [
            "胎児の肝臓は、出生直後の血糖値を維持するためのグリコーゲンと貯蔵鉄（フェリチン）を急速に蓄えます。",
            "腎臓と肝臓の構造は完成し、ビリルビン代謝酵素（UGT1A1）などの酵素系が成熟を進めます。",
            "胎児は毎日約30グラム（1オンス）ずつ皮下脂肪を蓄えてふっくらしていきます。"
          ],
          "maternalPhysiology": "子宮下部が伸展し児頭が骨盤内へ下がり始めるため、骨盤への圧迫感や頻尿が再び強まります。",
          "doctorCheckIn": "来週（妊娠36週）からは「週1回」の妊婦健診に移行し、B群溶血性レンサ球菌（GBS）スクリーニング検査と胎位（頭位か骨盤位か）の確認を行います。",
          "clinicalPearl": "妊娠35週までに陣痛バッグ・入院準備（母子健康手帳、保険証、診察券、授乳用ブラ、充電器、赤ちゃんの退院着など）を整え、夜間の産院連絡先を確認しておきましょう。"
        },
        "36": {
          "phaseLabel": "妊娠後期 — 毎週の健診開始とGBSスクリーニング",
          "stageTitle": "肺胞期への移行・GBS（B群溶連菌）スクリーニング・児頭下降",
          "biologicalStage": "後期早産期胎児（毎週健診への移行）",
          "lengthMetric": "47.4 cm (18.7 in 頭踵長)",
          "weightMetric": "2,620 g (5.78 lbs)",
          "heartRateBpm": "110 – 150 BPM",
          "keyOrgans": [
            "真性肺胞の形成",
            "羊水中への胎脂脱落",
            "児頭の骨盤内進入（固定）",
            "大腸内の胎便充満"
          ],
          "fetalMilestones": [
            "肺の発達が最終段階である「肺胞期」（妊娠36週〜幼児期）に入り、ガス交換を担う真の肺胞が形成されます。",
            "剥がれ落ちた胎脂や産毛が羊水に混ざり、胎児がそれを嚥下して暗緑色の初回便（胎便）が作られます。",
            "初産婦さんでは胎児の頭が骨盤入口部へ下がり始める「児頭下降（ライトニング）」が起こりやすくなります。"
          ],
          "maternalPhysiology": "児頭が下がると胃や胸郭への圧迫が軽くなり呼吸や食事が楽になる一方、骨盤底や恥骨への圧迫感・頻尿が強まります。",
          "doctorCheckIn": "妊娠36週健診（週1回の健診がスタート！）：B群溶血性レンサ球菌（GBS）培養検査（36週0日〜37週6日）および超音波・触診による胎位（頭位）の確認を行います。",
          "clinicalPearl": "GBS検査を妊娠36〜37週に行う理由：健康な妊婦の約25％が無症状でB群溶血性レンサ球菌（GBS）を保菌しており、陽性の場合に分娩時にペニシリン系抗菌薬を点滴することで新生児GBS敗血症リスクを80％以上減らせます。また妊娠36週で骨盤位（逆子）の場合は37週での外回転術（ECV）を相談します。"
        },
        "37": {
          "phaseLabel": "妊娠後期 — 早期正期産 (37週0日〜38週6日)",
          "stageTitle": "早期正期産マイルストーン・外回転術（ECV）時期・陣痛入院ルール（5-1-1）",
          "biologicalStage": "早期正期産胎児",
          "lengthMetric": "48.6 cm (19.1 in 頭踵長)",
          "weightMetric": "2,860 g (6.30 lbs)",
          "heartRateBpm": "110 – 150 BPM",
          "keyOrgans": [
            "肺成熟指標 L/S比 ≥2:1",
            "皮質脊髄路の髄鞘化",
            "動脈管の開存維持",
            "頬部脂肪体（吸啜パッド）"
          ],
          "fetalMilestones": [
            "妊娠37週0日をもって「正期産（37週0日〜41週6日）」に入ります（ACOG分類では37週0日〜38週6日をEarly Term［早期正期産］、39週0日〜40週6日をFull Termと定義）。",
            "頬の脂肪パッド（バッカルファット）がふっくらと発達し、母乳やミルクを吸う際の陰圧維持を助けます。",
            "胎児副腎からのコルチゾール急増により肺水吸収チャネル（ENaC）が活性化され、出生直後の肺水クリアランスに備えます。"
          ],
          "maternalPhysiology": "子宮頸管の熟化が静かに始まり、コラーゲン線維の再構築によって子宮口が徐々に柔らかく前方へと変化していきます。",
          "doctorCheckIn": "妊娠37週健診（週1回）：GBS検査結果、血圧、胎児心音を確認し、陣痛発来時の入院目安（「5-1-1 / 4-1-1」ルール）や破水時の対応を確認します。",
          "clinicalPearl": "医学的適応のない39週未満の計画分娩を避ける理由：妊娠37週から39週のわずか2週間で胎児の脳重量は約30％増加し、呼吸・代謝の成熟が完成するためです。"
        },
        "38": {
          "phaseLabel": "妊娠後期 — 早期正期産（第38週）",
          "stageTitle": "肺ホスファチジルグリセロール（PG）のピーク・声帯と原始反射の完成",
          "biologicalStage": "早期正期産胎児",
          "lengthMetric": "49.8 cm (19.6 in 頭踵長)",
          "weightMetric": "3,080 g (6.79 lbs)",
          "heartRateBpm": "110 – 150 BPM",
          "keyOrgans": [
            "ホスファチジルグリセロール (PG) 陽性",
            "胎児循環シャント（卵円孔）",
            "涙腺・唾液腺の成熟",
            "体脂肪率 15%"
          ],
          "fetalMilestones": [
            "羊水中にホスファチジルグリセロール（PG）が出現し、肺の生化学的成熟が完了したことが確認されます。",
            "体脂肪が胎児体重の約15％に達し、出生後の自立した体温維持が可能になります。",
            "声帯、原始反射（モロー反射、探索反射、吸啜反射、把握反射）、および感覚器がすべて子宮外生活に向けて完成します。"
          ],
          "maternalPhysiology": "粘液栓の排出（「おしるし」：ピンク〜褐色の粘液性出血）や前駆陣痛（不規則なお腹の張り）が、本陣痛の数日〜数週間前に見られることがあります。",
          "doctorCheckIn": "妊娠38週健診（週1回）：血圧、尿検査、胎児心拍、子宮底長計測、および産後の回復・母乳育児サポート・産後の家族計画についての確認。",
          "clinicalPearl": "本陣痛と前駆陣痛（ブラクストン・ヒックス収縮）の違い：前駆陣痛は不規則で休息により治まりますが、本陣痛は姿勢を変えても次第に間隔が短く、強く、長くなっていきます。"
        },
        "39": {
          "phaseLabel": "妊娠後期 — 完全正期産 (39週0日〜40週6日)",
          "stageTitle": "完全正期産（Full Term）マイルストーン・ビショップスコア・ARRIVE試験の相談",
          "biologicalStage": "完全正期産胎児",
          "lengthMetric": "50.7 cm (20.0 in 頭踵長)",
          "weightMetric": "3,290 g (7.25 lbs)",
          "heartRateBpm": "110 – 150 BPM",
          "keyOrgans": [
            "正期産の大脳皮質",
            "表皮の角化・更新",
            "胎盤オキシトシン分娩シグナル",
            "肝代謝酵素の成熟"
          ],
          "fetalMilestones": [
            "おめでとうございます！妊娠39週0日で、ACOGおよびSMFMが定義する「完全正期産（Full Term：39週0日〜40週6日）」に到達しました。",
            "胎児の肺から羊水中へ分泌されるサーファクタントタンパク質が母体の子宮オキシトシン受容体を活性化し、自然陣痛発来の生物学的トリガーとなります。",
            "新しい表皮層が完成し、胎脂は主に皮膚のくびれや関節のしわに残る状態となります。"
          ],
          "maternalPhysiology": "子宮頸管の展退（薄くなること：0〜100％）と開大（子宮口が0 cmから全開大10 cmまで開くこと）が分娩第1期にかけて進行します。",
          "doctorCheckIn": "妊娠39週健診（週1回）：内診によるビショップスコア（頸管熟化度）の評価、希望に応じた卵膜剥離（内診グリグリ）、およびARRIVE試験に基づく39週計画分娩の選択肢について相談します。",
          "clinicalPearl": "ARRIVE試験（NEJM 2018）：低リスク初産婦において妊娠39w0d〜39w4dでの計画誘発分娩は待機的管理に比べ帝王切開率（18.6% 対 22.2%）および妊娠高血圧症候群の発症率がやや低いことが示されており、自然陣痛待機と39週誘発はどちらも安全な選択肢です。"
        },
        "40": {
          "phaseLabel": "妊娠後期 — 出産予定日 (EDD / 第40週)",
          "stageTitle": "出産予定日（40週0日）と出生時の心肺循環移行への準備完了",
          "biologicalStage": "完全正期産胎児",
          "lengthMetric": "51.2 cm (20.2 in 頭踵長)",
          "weightMetric": "3,460 g (7.63 lbs)",
          "heartRateBpm": "110 – 150 BPM",
          "keyOrgans": [
            "卵円孔・動脈管の出生後閉鎖準備完了",
            "約300個の骨化中心",
            "母体由来 IgG 受動免疫",
            "産道通過のための頭蓋縫合"
          ],
          "fetalMilestones": [
            "出生時の産声によって肺が大きく広がり、肺血管抵抗が80％低下することで、卵円孔と動脈管が機能的に閉鎖へと向かいます。",
            "正期産の新生児は約300個の骨・軟骨中心（成長に伴い成人の206個の骨に癒合）を持ち、生後1日目の胃容量はサクランボ大（約5〜7 mL）で初乳の量にぴったり合っています。",
            "出生時の視力は20〜30 cm（8〜12インチ）の距離にピントが合うようになっており、抱っこや授乳中の親の顔がちょうど見える距離になっています。"
          ],
          "maternalPhysiology": "出産予定日ちょうどに生まれる赤ちゃんは全体の約4〜5％であり、自然陣痛を待つ初産婦の約50％は40w0d〜41w3dの間に出産します。",
          "doctorCheckIn": "妊娠40週（出産予定日）健診：血圧、胎児心音、内診（希望により卵膜剥離）、および41週以降の胎児ウェルビーイング検査（NST＋羊水量／BPP）と分娩誘発日程の相談。",
          "clinicalPearl": "破水時の4つの確認ポイント（COAT）：破水したら「色（透明か緑・茶色の胎便混濁か）」「におい」「量」「時刻」を確認し、陣痛が始まっていなくても直ちに産院へ連絡してください。"
        },
        "41": {
          "phaseLabel": "予定日超過 — 分娩監視 NST/BPP (41週0日〜41週6日)",
          "stageTitle": "後期正期産の胎児モニタリング（NST／BPP）と分娩誘発の計画",
          "biologicalStage": "予定日超過（正期産後半）胎児",
          "lengthMetric": "51.7 cm (20.4 in 頭踵長)",
          "weightMetric": "3,600 g (7.94 lbs)",
          "heartRateBpm": "110 – 150 BPM",
          "keyOrgans": [
            "胎盤予備能モニタリング",
            "羊水インデックス (AFI)",
            "胎脂減少に伴う皮膚の乾燥・落屑",
            "指先を超える長い爪"
          ],
          "fetalMilestones": [
            "妊娠41週0日〜41週6日は、ACOG分類において「後期正期産（Late-Term）」と定義されます。",
            "胎脂（ベルニクス）の大部分がすでに吸収されているため、41週以降に生まれる赤ちゃんは手のひらや足の裏の皮膚が少し乾燥し、爪が長めに伸びています。",
            "胎児の覚醒度と神経学的成熟度は極めて高い状態にあります。"
          ],
          "maternalPhysiology": "胎盤の成熟に伴い、妊娠41週以降は羊水量が自然かつ緩やかに減少していきます。",
          "doctorCheckIn": "妊娠41週健診および週2回の胎児モニタリング：NST（ノンストレステスト）と羊水量計測（AFIまたは最大羊水ポケットMVP ≥2 cm）、またはBPP（バイオフィジカルプロファイル、8点または10点満点）を実施し、42w0d前の分娩誘発を計画します。",
          "clinicalPearl": "ACOGガイドラインでは過期産に伴う胎盤機能不全を防ぐため、41週0日からの胎児監視と41週0日〜41週6日までの分娩完了を推奨しています。"
        },
        "42": {
          "phaseLabel": "過期産予防・計画分娩ウィンドウ (42週0日)",
          "stageTitle": "分娩誘発の実施・赤ちゃんの誕生とゴールデンアワー（早期母子接触）",
          "biologicalStage": "分娩・誕生マイルストーン",
          "lengthMetric": "52.0 cm (20.5 in 頭踵長)",
          "weightMetric": "3,685 g (8.12 lbs)",
          "heartRateBpm": "110 – 150 BPM",
          "keyOrgans": [
            "遅延臍帯結紮 (30〜60秒)",
            "誕生後ゴールデンアワーの早期母子接触",
            "アプガースコア評価 (1分・5分)",
            "新生児ビタミンK投与・点眼予防"
          ],
          "fetalMilestones": [
            "ACOGは遅くとも妊娠42週0日までの分娩完了を推奨しています（自然陣痛が未発来の場合は頸管熟化処置およびオキシトシンによる分娩誘発を行います）。",
            "出生時には臍帯遅延結紮（30〜60秒後）が推奨されており、胎盤から約80 mLの血液が移行することで生後6か月間の鉄貯蔵量を高めます。",
            "出生直後の早期母子接触（カンガルーケア／ゴールデンアワー）は、新生児の体温・血糖・心拍を安定させ、初回授乳と母体のオキシトシン分泌を促進します。"
          ],
          "maternalPhysiology": "分娩第3期（後産期）では出生後5〜30分以内に胎盤が娩出され、子宮が強く収縮（子宮復古）してらせん動脈を圧迫することで産後出血を防ぎます。",
          "doctorCheckIn": "分娩および出生直後のケア：新生児アプガースコア（1分・5分値）、ビタミンK投与（ビタミンK欠乏性出血症の予防）、B型肝炎ワクチン、聴覚・代謝スクリーニング、および産後2〜3週間の母体血圧・メンタル確認と産後6週間健診の予約。",
          "clinicalPearl": "産後の危険サイン（「POST-BIRTH」アラート）：産後6週間以内に、胸痛・息苦しさ、けいれん、自傷念慮、2時間続けて1時間にナプキン1枚以上あふれる出血、創部感染、ふくらはぎの痛み・発赤、38.0℃（100.4°F）以上の発熱、激しい頭痛や血圧140/90以上があれば直ちに救急受診してください。"
        }
      },
      "appointments": {
        "appt-w6-8": {
          "cadenceLabel": "初回確認",
          "title": "胎嚢・心拍確認および予定日決定超音波健診",
          "summary": "子宮内妊娠の位置、胎芽、心拍動、単胎・多胎の別を確認し、頭殿長（CRL）から正確な出産予定日（EDD）を算出します。",
          "procedures": [
            "経腟または経腹超音波検査（CRL測定により±3〜5日の精度で出産予定日を確定）",
            "卵黄嚢・胎嚢および胎児心拍数（100〜165 BPM）の確認",
            "既往歴、手術歴、産科歴、家族の遺伝学的履歴の聴取",
            "つわり（悪心・嘔吐）の初期ケアと妊婦用サプリメント（葉酸 400〜800 mcg以上）の確認"
          ],
          "questionsToAsk": [
            "頭殿長（CRL）は最終月経からの予定日と一致していますか、それとも正式な出産予定日を修正しますか？",
            "分娩はどの病院・周産期センターで行い、当直医の体制はどうなっていますか？",
            "夜間や休日に出血や強い症状が出た場合の緊急連絡先（トリアージ番号）はどこですか？"
          ],
          "highRiskAddition": "35歳以上 / 流産既往 / 体外受精（IVF）：妊娠5.5〜6週での早期胎嚢確認超音波および黄体ホルモン補充の評価。"
        },
        "appt-w8-10": {
          "cadenceLabel": "4週ごと (q4w)",
          "title": "初回妊婦精密健診および初期血液・尿検査パネル",
          "summary": "全身の身体診察および母体の基礎血液・尿スクリーニング検査一式を実施します。",
          "procedures": [
            "末梢血一般検査（CBC：ヘモグロビン、ヘマトクリット、血小板数）",
            "血液型（ABO式・Rh(D)因子）および不規則抗体スクリーニング（間接クームス試験）",
            "抗体価・感染症検査：風疹IgG、水痘IgG、B型肝炎（HBs抗原）、C型肝炎、HIV、梅毒（RPR）",
            "尿培養・感受性検査（腎盂腎炎を予防するため無症候性細菌尿をスクリーニング）",
            "TSH（甲状腺疾患歴がある場合）、HbA1c（糖尿病リスク/BMI 25以上）、および遺伝性疾患キャリアスクリーニング"
          ],
          "questionsToAsk": [
            "私の血液型はRh陽性・陰性のどちらですか？また風疹や水痘の抗体価は十分ですか？",
            "早期の妊娠糖尿病スクリーニングや、妊娠12週からの低用量アスピリン開始の対象になりますか？",
            "NIPT（無侵襲的出生前遺伝学的検査）や妊娠初期の頸部浮腫（NT）超音波検査はどのように予約すればよいですか？"
          ],
          "highRiskAddition": "妊娠糖尿病リスク / 既往GDM / PCOS / BMI 25以上：初回健診時に早期1時間ブドウ糖負荷試験（GCT）またはHbA1c検査を実施。"
        },
        "appt-w10-13": {
          "cadenceLabel": "4週ごと (q4w)",
          "title": "NIPT（新型出生前診断）および頸部浮腫（NT）初期精密超音波ウィンドウ",
          "summary": "染色体異数性スクリーニング、初期胎児形態評価、および妊娠12週での妊娠高血圧腎症予防開始を行います。",
          "procedures": [
            "母体血胎児染色体検査（NIPT、10週0日以降）：21・18・13トリソミーおよび性染色体をスクリーニング",
            "頸部浮腫（NT）超音波検査（11週0日〜13週6日）：胎児後頸部の透亮像（3.0 mm未満が正常）と鼻骨を確認",
            "ドップラーによる胎児心拍確認（140〜165 BPM）および母体血圧・尿検査",
            "ACOG基準に該当する場合、妊娠12週より低用量アスピリン（1日81 mg）の内服を開始"
          ],
          "questionsToAsk": [
            "私のリスクプロファイルでは、妊娠高血圧腎症予防のために妊娠12週から81 mgの低用量アスピリンを開始すべきですか？",
            "NIPTの結果はいつ頃（通常7〜10日）届き、どのように説明を受けられますか？",
            "妊娠中期に入るにあたり、運動や旅行で気をつけるべき変更点はありますか？"
          ],
          "highRiskAddition": "35歳以上 / 双胎：詳細な遺伝カウンセリング。確定診断を希望する場合は絨毛検査（CVS、10〜13週）が可能。双胎の膜性診断（二絨毛膜性 vs 一絨毛膜性）は14週未満に確定。"
        },
        "appt-w16": {
          "cadenceLabel": "4週ごと (q4w)",
          "title": "妊娠16週（妊娠中期）健診および母体血清AFP（クアトロ）検査",
          "summary": "母児の定期ウェルネス確認と、開放性神経管奇形の母体血清マーカー検査を行います。",
          "procedures": [
            "血圧測定、母体体重推移、尿試験紙検査（蛋白・糖・白血球）",
            "ハンドヘルド・ドップラーによる胎児心拍数の確認",
            "開放性神経管奇形（二分脊椎・無脳症）を調べる母体血清α-フェトプロテイン（MSAFP、15〜20週）採血（NIPT未実施の場合はクアトロ検査）",
            "妊娠20週のレベルII精密胎児形態（スクリーニング）超音波検査の予約手配"
          ],
          "questionsToAsk": [
            "NIPTが低リスクであっても、開放性神経管奇形を調べるために本日MSAFP検査を受けるべきですか？",
            "胎盤の位置を踏まえると、いつ頃から胎動をはっきり感じ始めるでしょうか？"
          ],
          "highRiskAddition": "自然早産既往：妊娠16週から24週まで2週間ごとに経腟超音波で子宮頸管長を連続測定。"
        },
        "appt-w18-22": {
          "cadenceLabel": "4週ごと (q4w)",
          "title": "レベルII 胎児精密形態（中期スクリーニング）超音波および20週健診",
          "summary": "全身の臓器構造の詳細な観察、胎盤位置の確認、羊水量評価、および子宮頸管長測定を行います。",
          "procedures": [
            "中期精密超音波検査（45〜60分）：脳室、小脳、脈絡叢、顔面プロフィール・口唇、心臓（4腔断面および左右流出路）、横隔膜、胃泡、腎臓、臍帯付着部・3血管臍帯、脊椎、4肢すべて",
            "胎盤位置の評価（前置胎盤や前置血管の除外）",
            "子宮頸管長の測定（18〜24週では25 mm以上が正常）",
            "子宮底長測定（20週で臍高）、血圧測定、尿検査"
          ],
          "questionsToAsk": [
            "本日、心臓の流出路や脊椎の断面はすべて鮮明に確認できましたか？再検査の必要はありますか？",
            "胎盤は前壁・後壁・子宮底のどこにあり、内子宮口から十分（2 cm以上）離れていますか？",
            "子宮頸管長の測定値は何ミリでしたか？"
          ],
          "highRiskAddition": "IVF / 糖尿病合併 / 先天性心疾患リスク：妊娠20〜22週に小児循環器専門医または周産期専門医による胎児心エコー検査を実施。"
        },
        "appt-w24-28": {
          "cadenceLabel": "28週より2週ごとへ移行",
          "title": "妊娠糖尿病スクリーニング（糖負荷試験）、血算、抗D人免疫グロブリン・百日咳（Tdap）ワクチン",
          "summary": "第2三半期（妊娠中期）から第3三半期（妊娠後期）への移行期における代謝・血液・免疫の重要なマイルストーン健診です。",
          "procedures": [
            "1時間50g経口ブドウ糖負荷試験（GCT、妊娠24〜28週；135〜140 mg/dL以上の場合は3時間100g精密ブドウ糖負荷試験GTTを実施）",
            "妊娠後期の血算（CBC）再検査（鉄欠乏性貧血や妊娠性血小板減少症の評価）",
            "母体がRhマイナスの場合、28週で不規則抗体再検査および抗D人免疫グロブリン（RhoGAM 300 mcg）筋肉内注射",
            "新生児の百日咳受動免疫のため、妊娠27〜36週（推奨27〜30週）に三種混合（Tdap）ワクチンを接種",
            "ガイドラインに基づく妊娠後期の梅毒・HIVスクリーニング再検査"
          ],
          "questionsToAsk": [
            "1時間ブドウ糖負荷試験の結果と妊娠後期のヘモグロビン・フェリチン値はいかがですか？経口鉄剤を追加すべきですか？",
            "本日Tdapワクチンを接種できますか？またパートナーや祖父母はいつまでに接種すべきですか（誕生の2週間前まで）？",
            "妊娠28週からの毎日の胎動カウント（10回胎動カウント法）はどのように記録すればよいですか？"
          ],
          "highRiskAddition": "一絨毛膜性双胎：双胎間輸血症候群（TTTS）監視のため2週間ごとの超音波。二絨毛膜性双胎：4週間ごとの発育超音波。"
        },
        "appt-w30": {
          "cadenceLabel": "2週ごと (q2w)",
          "title": "妊娠30週（2週ごと）健診および胎動カウント確認",
          "summary": "妊娠後期の2週おき健診の初回として、胎児発育曲線と妊娠高血圧腎症の監視に重点を置きます。",
          "procedures": [
            "血圧測定および尿試験紙検査（妊娠高血圧・蛋白尿のスクリーニング）",
            "子宮底長の測定（目安 28〜32 cm）およびドップラー胎児心音確認",
            "毎日の胎動カウント（2時間以内に10回以上の胎動）の記録確認",
            "切迫早産の兆候の確認および分娩入院予約手続きの確認"
          ],
          "questionsToAsk": [
            "子宮底長は妊娠週数に沿った順調な伸びを示していますか？",
            "分娩入院の事前登録はどのように行い、夜間・休日の産科救急入り口はどこになりますか？"
          ],
          "highRiskAddition": "35歳以上 / 肥満 / GDM / 高血圧：妊娠後期の発育超音波および32週からの毎週の胎児心拍数陣痛図（NST）/ BPP検査を計画。"
        },
        "appt-w32": {
          "cadenceLabel": "2週ごと (q2w)",
          "title": "妊娠32週健診、RSウイルス母子免疫ワクチン期間および胎児発育確認",
          "summary": "胎位の評価、RSウイルス母体ワクチン接種、およびハイリスク妊婦の胎児ウェルビーイング監視を開始します。",
          "procedures": [
            "新生児の重篤なRSウイルス下気道感染症を予防する母体RSウイルスワクチン（アブリスボ、32週0日〜36週6日）の接種",
            "血圧測定、尿検査、子宮底長（30〜34 cm）、胎児心音の確認",
            "低置胎盤の既往、35歳以上、GDM、または子宮底長の乖離がある場合の胎盤位置・胎児発育超音波検査"
          ],
          "questionsToAsk": [
            "本日、母体用RSウイルスワクチン（アブリスボ）の接種対象期間に入っていますか（または出生後にベイフォータスを投与しますか）？",
            "赤ちゃんが頭位（頭が下）に落ち着き始めているか分かりますか？"
          ],
          "highRiskAddition": "35〜40歳以上 / GDM / 慢性高血圧 / FGR：週1〜2回のノンストレステスト（NST）および/またはBiophysical Profile（BPP）を開始。"
        },
        "appt-w34": {
          "cadenceLabel": "2週ごと (q2w)",
          "title": "妊娠34週（後期早産期）マイルストーン健診およびバースプラン確認",
          "summary": "分娩時の鎮痛法（無痛分娩など）、バースプラン、会陰マッサージ、および妊娠高血圧腎症の警告サインを確認します。",
          "procedures": [
            "血圧測定、尿蛋白確認、子宮底長（32〜36 cm）、胎児心音の確認",
            "レオポルド触診法による胎향・胎位（縦位 vs 横位、頭位 vs 骨盤位）の確認",
            "バースプランの相談：硬膜外無痛分娩、分娩監視の方法、遅延臍帯結紮、出生直後の早期母子接触（ゴールデンアワー・カンガルーケア）"
          ],
          "questionsToAsk": [
            "遅延臍帯結紮、出生直後の早期母子接触、および授乳指導に関する病院の標準的な流れはどのようになっていますか？",
            "どのような臨床状況になった場合に、帝王切開や吸引・鉗子分娩が推奨されますか？"
          ],
          "highRiskAddition": "前置胎盤 / 古典的帝王切開既往：ガイドラインに基づき予定帝王切開の時期（前置胎盤では通常36週0日〜37週6日）を確定。"
        },
        "appt-w36": {
          "cadenceLabel": "毎週健診の開始 (q1w)",
          "title": "妊娠36週 B群溶血性レンサ球菌（GBS）検査および胎位確認（毎週健診開始）",
          "summary": "毎週の健診へ移行し、全妊婦対象のGBS培養スクリーニングと頭位の最終確認を行います。",
          "procedures": [
            "腟入口部および直腸のB群溶血性レンサ球菌（GBS）培養検査（36週0日〜37週6日に実施、5週間有効）",
            "レオポルド触診および必要に応じた超音波検査による頭位（頭が下）の確認",
            "36週時点で骨盤位（逆子）の場合：37週での外回転術（ECV）について説明・相談",
            "プロトコルに従い36週で低用量アスピリンを終了。性器ヘルペス（HSV）既往がある場合は36週よりバラシクロビル予防内服を開始"
          ],
          "questionsToAsk": [
            "赤ちゃんは頭位（頭が下）になっていることが確認できましたか？",
            "もしGBS検査が陽性だった場合、分娩の4時間以上前に点滴抗菌薬（ペニシリン）を開始できるよう、陣痛や破水からどのタイミングで来院すべきですか？"
          ],
          "highRiskAddition": "性器ヘルペス（HSV）既往：分娩時の活動性病変と帝王切開を防ぐため、36週0日より毎日の経口抗ウイルス薬予防投与を開始。"
        },
        "appt-w37": {
          "cadenceLabel": "毎週 (q1w)",
          "title": "妊娠37週（正期産開始）健診および陣痛・入院タイミングの確認",
          "summary": "GBS培養結果の確認、正期産に入った生理的準備の評価、および分娩入院の正確な基準を確認します。",
          "procedures": [
            "血圧測定、尿検査、子宮底長、胎児心拍数の確認",
            "GBS培養検査の結果確認と母子健康手帳・カルテへの記載",
            "陣痛入院ルール（初産婦の5-1-1ルール：5分間隔・1分間持続する陣痛が1時間続く場合、または経産婦の4-1-1ルール、破水・出血・胎動減少時は直ちに来院）の確認"
          ],
          "questionsToAsk": [
            "前回のGBS（B群溶血性レンサ球菌）検査の結果はどうでしたか？",
            "もし自宅で陣痛がないまま破水した場合、すぐに産院（分娩室）へ向かうべきですか？"
          ],
          "highRiskAddition": "妊娠高血圧 / 重症所見のない妊娠高血圧腎症 / 妊娠性肝内胆汁うっ滞症 / 二絨毛膜性双胎：ACOG基準に基づき37週0日〜38週0日での分娩が計画されることが多い。"
        },
        "appt-w38": {
          "cadenceLabel": "毎週 (q1w)",
          "title": "妊娠38週健診および産後ケア（第4三半期）プランニング",
          "summary": "母体血圧と胎児の継続的モニタリングに加え、産褥期（第4三半期）に向けた準備を行います。",
          "procedures": [
            "血圧測定、尿検査、子宮底長、胎児心音の確認",
            "前駆陣痛がある場合や希望に応じた内診（子宮口の開大度・展退度の確認）",
            "産後の身体回復、骨盤底筋ケア、メンタルヘルス（エジンバラ産後うつ病質問票の概要）、および産後の家族計画に関する相談"
          ],
          "questionsToAsk": [
            "退院後に授乳の相談が必要になった場合、どこに連絡すればよいですか？",
            "産後健診はいつ予約されますか（ACOGは産後3週間以内の初期チェックと6〜12週までの包括的健診を推奨）？"
          ],
          "highRiskAddition": "食事療法で管理中のGDM / 40歳以上：39週0日〜39週6日頃での分娩タイミングについて相談。"
        },
        "appt-w39": {
          "cadenceLabel": "毎週 (q1w)",
          "title": "妊娠39週（正期産中枢）健診、卵膜剥離および分娩誘発オプションの相談",
          "summary": "39週マイルストーン評価、ビショップスコア（子宮頸管熟化度）の確認、および自然陣痛待機と39週計画誘発分娩の共同意思決定を行います。",
          "procedures": [
            "血圧測定、尿検査、子宮底長、胎児心音の確認",
            "ビショップスコア（開大度、展退度、児頭下降度、硬度、位置）を評価する内診（希望・適応時）",
            "卵膜剥離（内診グリグリ：子宮口が1 cm以上開大している場合に選択可能。内因性プロスタグランジンを放出させ48時間以内の自然陣痛を促す）",
            "自然待機療法と39週での選択的誘発分娩（ARRIVE試験プロトコル）に関する共同意思決定"
          ],
          "questionsToAsk": [
            "現在の子宮口の開き具合や児頭の下がり具合はどうですか？本日、卵膜剥離を受けることは可能ですか？",
            "40週の予定日までに自然陣痛が来ない場合、いつ頃に胎児モニター検査や誘発分娩を予約するのがよいですか？"
          ],
          "highRiskAddition": "薬物療法中のGDM / 35〜40歳以上：ACOGガイドラインでは妊娠39週（39週0日〜39週6日）での分娩を推奨。"
        },
        "appt-w40": {
          "cadenceLabel": "毎週 (q1w)",
          "title": "妊娠40週（出産予定日 EDD）健診および予定日超過時の管理計画",
          "summary": "出産予定日での母児評価、子宮頸管の再確認、および41週の胎児ウェルビーイング検査の予約を行います。",
          "procedures": [
            "血圧測定、尿蛋白確認、および胎児心音の確認",
            "内診による子宮口の評価および希望時の卵膜剥離",
            "妊娠41週でのノンストレステスト（NST）および羊水インデックス（AFI）/ BPP超音波検査のオーダー",
            "41週0日〜41週6日の間での分娩誘発入院日の仮予約"
          ],
          "questionsToAsk": [
            "来週に誘発分娩を予定する場合、前日の夕方に入院して子宮頸管熟化処置（バルーンやプロスタグランジン製剤）を行いますか、それとも当日朝から陣痛促進剤を開始しますか？"
          ],
          "highRiskAddition": "ほとんどのハイリスク妊娠および40歳以上の妊婦は、学会コンセンサスに基づき39週0日〜40週0日までに分娩となります。"
        },
        "appt-w41-42": {
          "cadenceLabel": "週2回 (41週以降)",
          "title": "妊娠41週（予定日超過）NST / BPP胎児監視および分娩誘発入院",
          "summary": "週2回の胎児ウェルビーイング検査と羊水量評価を行い、遅くとも42週0日までの出産を目指します。",
          "procedures": [
            "ノンストレステスト（NST）：20〜40分間の分娩監視装置により胎児心拍数基線（110〜160 BPM）、中等度の基線細変動、および20分間に2回以上の一過性頻脈（15 bpm以上・15秒以上＝15x15）を確認",
            "Biophysical Profile（BPP）/ 羊水超音波検査：最大羊水深度（MVP 2 cm以上）または羊水インデックス（AFI 5 cm以上）、胎児呼吸様運動、筋緊張、胎動を確認",
            "妊娠42週0日を迎える前に子宮頸管熟化処置および分娩誘発のために入院"
          ],
          "questionsToAsk": [
            "本日の羊水量（MVP/AFI）とNSTモニターは完全にリアクティブ（良好）ですか？",
            "予定されている誘発分娩のため、何時に産科病棟へ入院すればよいですか？"
          ],
          "highRiskAddition": "羊水過少（MVP 2 cm未満）またはNST異常所見：ただちに分娩室へ入院し分娩を開始。"
        }
      },
      "symptoms": {
        "sym-1": {
          "urgencyLabel": "ただちに産科病棟へ受診 / 産科医へ連絡",
          "trimesterScope": "妊娠後期（28〜42週）",
          "title": "胎動の減少（妊娠28週以降で2時間に10回未満の胎動）",
          "clinicalExplanation": "胎動の急激な減少や、集中して胎動を数えた際に2時間以内に10回の明確な動きが感じられない場合は、胎盤機能不全や臍帯圧迫の初期サインである可能性があります。",
          "actionSteps": "冷たい水を飲み、静かな部屋で左側臥位になって胎動に集中してください。翌日まで待ったり家庭用ドップラーで自己判断せず、直ちに産科を受診して20分間のノンストレステスト（NST）を受けてください。"
        },
        "sym-2": {
          "urgencyLabel": "ただちに産科救急 / 救急外来へ受診",
          "trimesterScope": "第2・第3三半期（妊娠20週以降）および産褥期",
          "title": "激しい持続する頭痛、視覚異常（チカチカする光・かすみ目）、または右季肋部・みぞおちの痛み",
          "clinicalExplanation": "アセトアミノフェンや水分補給で改善しない激しい頭痛、閃輝暗点・視野のかすみ、右上腹部・心窩部痛、または顔や手の急激なむくみは、重症妊娠高血圧腎症やHELLP症候群の代表的な徴候です。",
          "actionSteps": "血圧計があれば測定し（140/90以上は高値、160/110以上は高血圧緊急症）、ただちに産科救急を受診して血圧管理、尿蛋白、血小板、肝酵素検査を受けてください。"
        },
        "sym-3": {
          "urgencyLabel": "ただちに産科病棟へ受診 / 産科医へ連絡",
          "trimesterScope": "全妊娠期間（1〜42週）",
          "title": "性器出血（鮮血または血塊の排出）",
          "clinicalExplanation": "第1三半期（妊娠初期）の多量の出血や片側下腹部痛を伴う出血は異所性妊娠（子宮外妊娠）や切迫流産の評価が必要です。第2・第3三半期（妊娠中期・後期）の出血は前置胎盤や常位胎盤早期剥離を除外するため直ちに超音波検査が必要です。",
          "actionSteps": "ただちに産科救急を受診してください。血液型がRhマイナスの場合は、出血から72時間以内に抗D人免疫グロブリン（RhoGAM）の投与も必要になります。"
        },
        "sym-4": {
          "urgencyLabel": "ただちに分娩室・産科救急へ受診",
          "trimesterScope": "第2・第3三半期（妊娠中期・後期）",
          "title": "透明・ピンク色・緑がかった水様帯下の流出または持続的な漏れ（破水）",
          "clinicalExplanation": "正期産での破水（ROM）や37週未満の前期破水（PPROM）は感染防御バリアを失わせ、児頭が固定していない場合は臍帯脱出のリスクを伴います。",
          "actionSteps": "色・におい・量・時刻（COAT）を確認してください。腟内にタンポンなどを入れず、入浴も控えて直ちに産科病棟を受診してください。"
        },
        "sym-5": {
          "urgencyLabel": "1〜2時間以内に産科へ電話連絡",
          "trimesterScope": "第2・第3三半期（妊娠20〜36週）",
          "title": "妊娠37週未満での規則的なお腹の張り・陣痛（1時間に4〜6回以上が1時間持続）",
          "clinicalExplanation": "37週0日未満で生理痛のような下腹部痛、骨盤の圧迫感、鈍い腰痛、または粘液性帯下を伴う規則的な子宮収縮は、切迫早産の可能性があります。",
          "actionSteps": "排尿を済ませ、500 mL（16〜24オンス）の水を飲んで左側臥位で安静にしてください。1時間に4〜6回以上の張りが続く場合は、直ちに産院へ連絡し癌胎児性フィブロネクチンや子宮頸管長の評価を受けてください。"
        },
        "sym-6": {
          "urgencyLabel": "本日中に産科へ連絡しアセトアミノフェンで解熱",
          "trimesterScope": "全妊娠期間（1〜42週）",
          "title": "38.0°C（100.4°F）以上の発熱または悪寒・ふるえ",
          "clinicalExplanation": "妊娠初期の持続的な母体高体温は神経管閉鎖障害のリスクを高め、中期以降は早産収縮を誘発したり、腎盂腎炎・インフルエンザ・COVID-19・絨毛膜羊膜炎などの感染症を示唆します。",
          "actionSteps": "アセトアミノフェン（カロナール・タイレノール 650〜1000 mg等）を服用して解熱し、水分を補給したうえで産婦人科へ連絡して原因感染の評価を受けてください。"
        },
        "sym-7": {
          "urgencyLabel": "ただちに救急外来（ER）を受診",
          "trimesterScope": "全妊娠期間および産後6週間",
          "title": "片側のふくらはぎの腫れ・発赤・熱感、または胸痛・息切れ",
          "clinicalExplanation": "妊娠中は分娩時の出血に備えて血液が固まりやすい状態（過凝固状態）になっており、深部静脈血栓症（DVT、左脚に好発）および肺血栓塞栓症（PE）のリスクが高まります。",
          "actionSteps": "ふくらはぎをマッサージしないでください。下肢静脈エコー検査のため、ただちに救急外来（ER）を受診してください。"
        },
        "sym-8": {
          "urgencyLabel": "24時間以内に産婦人科へ連絡",
          "trimesterScope": "第2三半期後半〜第3三半期",
          "title": "手のひらや足の裏の強い痒み（特に夜間に悪化し、発疹を伴わないもの）",
          "clinicalExplanation": "発疹を伴わない手掌・足底の激しい掻痒感は、血清総胆汁酸の上昇によって起こる妊娠性肝内胆汁うっ滞症（ICP）の典型的な症状です。",
          "actionSteps": "産婦人科に連絡し、血清総胆汁酸および肝機能検査（AST/ALT）を受けてください。確定した場合はウルソデオキシコール酸の投与により痒みと胆汁酸値を改善させます。"
        },
        "sym-9": {
          "urgencyLabel": "本日中に産婦人科へ連絡",
          "trimesterScope": "全妊娠期間",
          "title": "排尿時の痛み・しみる感じ（排尿痛）、尿の濁り、または背中・腰の片側の痛み",
          "clinicalExplanation": "プロゲステロンの作用で尿管が拡張するため、膀胱炎などの下部尿路感染症（UTI）が急性腎盂腎炎へ上行しやすく、早産を引き起こす原因になります。",
          "actionSteps": "本日中に産婦人科へ連絡して尿検査と尿培養を受け、妊娠中に安全な抗菌薬（セファレキシンなど）を速やかに開始してください。"
        },
        "sym-10": {
          "urgencyLabel": "正常な生理的変化（次回健診時に相談）",
          "trimesterScope": "第2・第3三半期（妊娠中期・後期）",
          "title": "寝返り、立ち上がり、または咳をした時の足の付け根（鼠径部）の一時的な鋭い痛み",
          "clinicalExplanation": "典型的な円靭帯痛（子宮円索痛）です。子宮が骨盤から上方へ大きくなるにつれて左右の円靭帯がゴムバンドのように引き伸ばされ、急な動きで一時的に痙攣します。",
          "actionSteps": "咳やくしゃみの前に股関節を軽く曲げ、起き上がる時はゆっくり横向きになってから起き、熱すぎない温湿布や骨盤ベルトを活用してください。"
        },
        "sym-11": {
          "urgencyLabel": "正常な生理的変化（ブラクストン・ヒックス前駆陣痛）",
          "trimesterScope": "第2・第3三半期（妊娠中期・後期）",
          "title": "水分補給と安静で治まる不規則で痛みのないお腹の張り（ブラクストン・ヒックス収縮）",
          "clinicalExplanation": "ブラクストン・ヒックス（「練習」）収縮は子宮頸管を開大させずに子宮筋を鍛える生理的な張りです。間隔は不規則で強さも増さず、脱水や膀胱の充満で誘発されやすくなります。",
          "actionSteps": "コップ2杯の水を飲み、排尿を済ませて左側臥位で休んでください。5〜10分間隔で規則的になったり痛みを伴う場合は産科へ連絡してください。"
        },
        "sym-12": {
          "urgencyLabel": "正常な生理的変化",
          "trimesterScope": "全妊娠期間",
          "title": "軽い鼻づまり（「妊娠性鼻炎」）または時折の鼻血",
          "clinicalExplanation": "エストロゲンによる粘膜の充血と血液量の約45%増加により、妊婦の約30%で鼻甲介の腫れや鼻粘膜からの出血が起こりやすくなります。",
          "actionSteps": "生理食塩水の点鼻スプレー、寝室の加湿器、鼻腔拡張テープを使用してください。プソイドエフェドリンやフェニレフリンなどの内服血管収縮薬（特に妊娠初期や高血圧がある場合）は避けてください。"
        }
      },
      "safety": {
        "med-1": {
          "category": "鎮痛・解熱",
          "statusLabel": "第一選択薬として承認 (ACOG)",
          "name": "アセトアミノフェン（タイレノール / カロナール）",
          "dosageNote": "必要に応じて6時間ごとに325〜650 mg（24時間最大3,000 mg）；最小有効量を最短期間で使用。",
          "clinicalGuidance": "ACOGおよびSMFMは、アセトアミノフェンを全妊娠期間を通じて最も安全な第一選択の鎮痛・解熱薬としています。38.0℃（100.4°F）以上の母体発熱を適切に解熱することは胎児保護に重要です。"
        },
        "med-2": {
          "category": "鎮痛・解熱",
          "statusLabel": "妊娠中禁忌（低用量アスピリン除く）",
          "name": "イブプロフェン、ナプロキセン、高用量アスピリン（非ステロイド性抗炎症薬 NSAIDs）",
          "dosageNote": "妊娠全期間で服用を避けてください（注：妊娠高血圧腎症予防のために産科医が処方する低用量アスピリン81 mgは例外であり安全です）。",
          "clinicalGuidance": "経口NSAIDsは胎児のプロスタグランジン合成を阻害し、妊娠20週以降に胎児動脈管早期閉鎖、胎児腎機能低下、羊水過少を引き起こすリスクがあります。"
        },
        "med-3": {
          "category": "つわり・吐き気",
          "statusLabel": "ACOG第一選択療法",
          "name": "ビタミンB6（ピリドキシン）＋ ドキシラミン（Unisom / Diclegis）",
          "dosageNote": "ビタミンB6 1回10〜25 mgを1日3回 ＋ 就寝時にドキシラミンコハク酸塩 12.5〜25 mg。",
          "clinicalGuidance": "産科領域で最も広く研究されているつわり第一選択薬です（20万例以上の妊娠データで催奇形性なし）。"
        },
        "med-4": {
          "category": "胸やけ・逆流性食道炎",
          "statusLabel": "第一・第二選択として承認",
          "name": "炭酸カルシウム（Tums）および ファモチジン（ガスター / Pepcid）",
          "dosageNote": "炭酸カルシウム 500〜1,000 mgを頓用；制酸薬で不十分な場合はファモチジン 10〜20 mgを1日1〜2回。",
          "clinicalGuidance": "カルシウム制酸薬は安全に胃酸を中和しカルシウムも補給できます（鉄剤とは2時間空けて服用）。次サリチル酸ビスマス（Pepto-Bismol）はサリチル酸吸収のため避けてください。"
        },
        "med-5": {
          "category": "便秘・消化器",
          "statusLabel": "承認（全身吸収は極めて少ない）",
          "name": "ポリエチレングリコール 3350（MiraLAX / モビコール）、サイリウム（Metamucil）、ジオクチルソジウムスルホサクシネート（Colace）",
          "dosageNote": "ポリエチレングリコール（MiraLAX 17g）を1日1回240 mL（8オンス）の水に溶かして服用し、水分と食物繊維の摂取を増やします。",
          "clinicalGuidance": "プロゲステロンは腸管運動を低下させ、鉄剤も便秘を悪化させます。浸透圧性下剤や膨張性下剤は全身に吸収されず妊娠中も安全です。ひまし油は避けてください。"
        },
        "med-6": {
          "category": "アレルギー・風邪",
          "statusLabel": "妊娠中第一選択のアレルギー治療薬",
          "name": "ロラタジン（クラリチン）、セチリジン（ジルテック）、フルチカゾン点鼻薬（フルナーゼ）",
          "dosageNote": "ロラタジン1日10 mg または セチリジン1日10 mg；血管収縮薬配合の「-D」製剤は避けてください。",
          "clinicalGuidance": "第2世代抗ヒスタミン薬とステロイド点鼻薬は妊娠中の高い安全性が確認されています。妊娠初期や高血圧がある場合は経口プソイドエフェドリン等を避けてください。"
        },
        "med-7": {
          "category": "皮膚科・スキンケア",
          "statusLabel": "絶対禁忌（催奇形性あり）",
          "name": "イソトレチノイン（アキュテイン）および医療用・化粧品レチノイド（トレチノイン / レチノール）",
          "dosageNote": "妊娠前に使用を中止してください；代替としてアゼライン酸、グリコール酸（10%未満）、ナイアシンアミドを使用します。",
          "clinicalGuidance": "内服レチノイド（ビタミンA誘導体）は重篤な頭蓋顔面・心臓・胸腺の胎芽奇形を引き起こします。念のため外用トレチノイン、アダパレン、レチノールも妊娠中は中止が推奨されます。"
        },
        "med-8": {
          "category": "栄養・飲料",
          "statusLabel": "1日200 mg未満なら安全 (ACOG)",
          "name": "カフェイン（コーヒー、エスプレッソ、抹茶、紅茶・緑茶）",
          "dosageNote": "1日のカフェイン総摂取量を200 mg以下（約350 mL / 12オンスのドリップコーヒー1杯、またはエスプレッソ2ショット程度）に抑えましょう。",
          "clinicalGuidance": "ACOG委員会見解では、適度なカフェイン摂取（1日200 mg未満）は流産や早産のリスクを上昇させないことが確認されています。お茶やダークチョコレートに含まれる分も合算してください。"
        },
        "med-9": {
          "category": "栄養・飲料",
          "statusLabel": "強く推奨（週2〜3回）",
          "name": "低水銀のオメガ3豊富な魚介類（天然サケ・サーモン、イワシ、マス、タラ、エビ）",
          "dosageNote": "週に225〜340 g（8〜12オンス）の十分に加熱した低水銀魚介類（1日あたり約200〜300 mgのDHAを供給）。",
          "clinicalGuidance": "FDAおよびACOGは胎児の脳と網膜のDHA発達のため、週2〜3回の加熱調理した低水銀魚の摂取を推奨しています。高水銀の大型魚（サメ、メカジキ、キングマッカレル、マカジキ、メバチマグロ等）は避けてください。"
        },
        "med-10": {
          "category": "栄養・飲料",
          "statusLabel": "非加熱・未殺菌食品は避ける",
          "name": "未殺菌の乳製品・ナチュラルチーズ、非加熱のハム・デリミート、生スプラウト（リステリア菌リスク）",
          "dosageNote": "チーズは「殺菌乳（Pasteurized Milk）使用」の表示を確認し、ハムやソーセージ等は中心温度74℃（165°F、湯気が出るまで）加熱してください。",
          "clinicalGuidance": "妊娠中は細胞性免疫が低下し、胎盤を通過するリステリア・モノサイトゲネスへの感受性が約10倍高まります。市販のソフトチーズでも加熱殺菌済みのものは安全ですので、必ずラベルを確認してください。"
        }
      },
      "photos": {
        "0": {
          "caption": "第1〜2週：排卵時の二次卵母細胞（約120 µm）— 透明帯と放線冠（卵丘細胞）が卵巣卵胞から放出される瞬間。",
          "alt": "卵巣表面から排卵される透明帯と卵丘細胞を伴うヒト卵母細胞の超高精細レンダリング画像。"
        },
        "1": {
          "caption": "第3週：受精後4日目の16細胞桑実胚（モルラ）— 透明帯の内部に密着した割球と極体が観察されます。",
          "alt": "透明な殻（透明帯）の内部に半透明の割球が密に詰まったヒト桑実胚（モルラ）の超高精細レンダリング画像。"
        },
        "2": {
          "caption": "第4週：透明帯から孵化し血管豊富な子宮内膜へ着床する胚盤胞 — 栄養膜リング、胚盤胞腔、内部細胞塊。",
          "alt": "細い栄養膜突起を伸ばしてピンク色の子宮内膜に着床するヒト胚盤胞の超高精細レンダリング画像。"
        },
        "3": {
          "caption": "第5〜6週：C字型に湾曲したカーネギー段階の初期胎芽 — 背側の体節、腹側の心隆起、黄金色の二次卵黄嚢。",
          "alt": "羊膜内に浮かぶ、半透明の皮膚・体節・卵黄嚢が可視化された初期ヒト胚の超高精細レンダリング画像。"
        },
        "4": {
          "caption": "第7〜9週：胎芽後期 — 脳胞、色素を持つ眼杯、拍動する4腔心臓、指放線を持つ手板と卵黄嚢。",
          "alt": "半透明の血管皮膚、黒い眼杯、肢芽、黄金色の卵黄嚢を示す後期ヒト胚の子宮内マクロ画像。"
        },
        "5": {
          "caption": "第10〜15週：妊娠初期の胎児 — 分離した手指・足指、癒合した眼瞼、側頭部の透見血管、左側の胎盤につながる3血管臍帯。",
          "alt": "羊膜腔内の妊娠12週ヒト胎児の子宮内マクロ画像（3血管臍帯と左側の胎盤円盤）。"
        },
        "6": {
          "caption": "第16〜25週：妊娠中期の胎児（20週精密形態超音波マイルストーン）— 胎脂の輝き、屈曲した四肢、左側の胎盤につながる3血管臍帯。",
          "alt": "羊膜腔内に浮かぶ妊娠20週（妊娠中期）ヒト胎児と左側胎盤の子宮内マクロ画像。"
        },
        "7": {
          "caption": "第26〜33週：妊娠後期前半の胎児 — 穏やかな眼瞼とまつ毛、急速に蓄積する皮下脂肪。",
          "alt": "羊膜腔内で穏やかに休む妊娠28週（妊娠後期）ヒト胎児の子宮内マクロ画像。"
        },
        "8": {
          "caption": "第34〜42週：正期産の胎児 — ふっくらした頬、成熟した皮下脂肪と肺サーファクタントを備え誕生の準備が整った状態。",
          "alt": "左側の胎盤とらせん状の臍帯とともに羊膜腔内に抱かれた正期産ヒト胎児の子宮内マクロ画像。"
        }
      }
    },
    "ko": {
      "weeks": {
        "1": {
          "phaseLabel": "임신 준비기 (생리기 / 난포기)",
          "stageTitle": "난포 모집 및 자궁내막 리셋",
          "biologicalStage": "난소 난포 코호트",
          "lengthMetric": "0.04 mm (원시 난포)",
          "weightMetric": "< 0.001 g",
          "heartRateBpm": "아직 형성되지 않음 (임신 전)",
          "keyOrgans": [
            "시상하부-뇌하수체-난소 축",
            "자궁내막 기저층",
            "우성 난포 선택"
          ],
          "fetalMilestones": [
            "산과적 임신 주수는 실제 수정 약 2주 전인 마지막 생리 시작일(LMP) 1일차부터 계산합니다.",
            "난포자극호르몬(FSH)이 동난포군을 모집하며, 그중 하나의 우성 그라프 난포가 선택됩니다.",
            "증가하는 에스트라디올이 자궁내막 기능층을 증식시켜 혈관이 풍부한 착상 환경을 준비합니다."
          ],
          "maternalPhysiology": "생리혈 배출이 끝나고 증식기(난포기)로 전환됩니다. 기초체온은 배란 전 저온기를 유지합니다.",
          "doctorCheckIn": "임신 준비 체크리스트: 매일 엽산 400–800 mcg 복용(신경관 결손 과거력이 있으면 4 mg), 풍진·수두 항체 확인 및 복용 중인 만성질환 약물의 안전성을 점검하세요.",
          "clinicalPearl": "배란 시기는 개인차가 있으므로 ACOG는 마지막 생리 첫날(LMP 1일)부터 임신 주수(총 40주 / 280일)를 계산하며, 실제 배아 나이는 이보다 약 2주 짧습니다(38주 / 266일)."
        },
        "2": {
          "phaseLabel": "임신 준비기 (배란기 창)",
          "stageTitle": "LH 급증, 배란 및 나팔관 난자 포착",
          "biologicalStage": "제2난모세포 (감수분열 중기 II)",
          "lengthMetric": "0.12 mm (120 µm 난모세포)",
          "weightMetric": "< 0.001 g",
          "heartRateBpm": "아직 형성되지 않음 (배란기)",
          "keyOrgans": [
            "난구-난모세포 복합체",
            "투명대",
            "황체 형성"
          ],
          "fetalMilestones": [
            "주기 중반의 황체형성호르몬(LH) 급증이 제1감수분열 재개와 제1극체 방출을 유도합니다.",
            "배란을 통해 제2감수분열 중기에 정지된 제2난모세포가 배출되어 나팔관 채(fimbriae)에 의해 팽대부로 이동합니다.",
            "파열된 난포는 황체로 변하여 프로게스테론을 분비하고 자궁내막을 분비기로 전환시킵니다."
          ],
          "maternalPhysiology": "에스트로겐 급증으로 자궁내막이 두꺼워지고 가임기 경부 점액이 분비되며, 배란 후 프로게스테론 작용으로 기초체온이 약 0.3°C(0.5°F) 상승합니다.",
          "doctorCheckIn": "가임기 최적화: 임신 가능성이 가장 높은 시기는 배란 전 5일과 배란 당일입니다(난자 생존 시간은 12–24시간).",
          "clinicalPearl": "시험관 시술(IVF)로 임신한 경우, 5일 배양 배반포 이식 당일이 임신 2주 5일(2w5d)에 해당합니다."
        },
        "3": {
          "phaseLabel": "임신 초기 — 배종기 (난할 단계)",
          "stageTitle": "수정, 접합자 난할 및 상실배(Morula) 형성",
          "biologicalStage": "접합자 → 16세포 상실배",
          "lengthMetric": "0.15 – 0.20 mm",
          "weightMetric": "< 0.001 g",
          "heartRateBpm": "무혈관 난할 단계",
          "keyOrgans": [
            "2배체 유전체 (46염색체)",
            "할구 밀착화",
            "내세포괴 분리"
          ],
          "fetalMilestones": [
            "나팔관 팽대부에서 수정이 이루어지면 피질 반응이 일어나 다정자 수정을 차단하고 제2감수분열을 완료합니다.",
            "남성과 여성 전핵이 융합하여 2배체 접합자(46,XX 또는 46,XY)를 형성하고 12–24시간마다 빠른 난할 분열을 시작합니다.",
            "수정 후 4일경 16–32세포 상실배가 밀착화(compaction)를 거쳐 자궁강으로 진입하며 초기 배반포로 발달합니다."
          ],
          "maternalPhysiology": "조기임신인자(EPF)가 모체의 면역 관용을 조절하며, 황체에서 분비되는 프로게스테론이 자궁내막 탈락을 방지합니다.",
          "doctorCheckIn": "아직 병원 방문은 필요하지 않습니다. 이부프로펜·나프록센 등 비스테로이드성 소염진통제(NSAIDs)는 착상을 방해할 수 있으므로 피하세요.",
          "clinicalPearl": "임신 4주(수정 후 2주) 이전의 약물 노출은 보통 '전무도 아니면 전부(all-or-none)' 법칙을 따르지만(배아기 3~8주 / 임신 5~10주 기관형성기 이전), 알려진 기형유발물질은 즉시 중단해야 합니다."
        },
        "4": {
          "phaseLabel": "임신 초기 — 배반포 착상기",
          "stageTitle": "배반포 착상 및 합포체영양막 hCG 분비",
          "biologicalStage": "착상 중인 이층 배반포",
          "lengthMetric": "0.4 – 1.0 mm",
          "weightMetric": "< 0.01 g",
          "heartRateBpm": "원시 열공 순환",
          "keyOrgans": [
            "배아원기 위판·아래판",
            "양막강",
            "1차 난황낭",
            "영양막 열공"
          ],
          "fetalMilestones": [
            "배반포가 투명대에서 부화(hatching)하여 탈락막화된 자궁내막에 부착·침윤합니다(배란 후 6–10일).",
            "내세포괴가 두 층의 배아원반(위판 epiblast 및 아래판 hypoblast)으로 분화합니다.",
            "합포체영양막이 모체 나선 모세혈관을 침윤하며 베타-hCG를 분비하여 황체의 프로게스테론 생성을 유지시킵니다."
          ],
          "maternalPhysiology": "생리가 멈추며, 혈청 베타-hCG는 배란 8–11일 후부터 검출되고 정상 자궁내 임신에서 48–72시간마다 2배로 증가합니다.",
          "doctorCheckIn": "소변 임신반응검사 양성! 산부인과에 연락하여 첫 임신 확인 및 초음파 진료(보통 임신 6–9주 사이)를 예약하세요.",
          "clinicalPearl": "예정 생리일 무렵의 소량 혈흔(‘착상혈’)은 흔하고 양성이지만, 한쪽 아랫배 통증을 동반한 출혈은 자궁외임신 배제를 위해 연속 혈청 베타-hCG 검사가 필요합니다."
        },
        "5": {
          "phaseLabel": "임신 초기 — 초기 기관형성기",
          "stageTitle": "원장배 형성, 신경판 및 원시 심장관 박동",
          "biologicalStage": "삼배엽 배아 (카네기 단계 9–10)",
          "lengthMetric": "1.5 – 2.5 mm (머리엉덩길이)",
          "weightMetric": "0.02 g",
          "heartRateBpm": "85 – 100 BPM (원시 심장관 박동 시작)",
          "keyOrgans": [
            "외배엽 / 중배엽 / 내배엽",
            "신경고랑",
            "심장발생 초승달",
            "체절"
          ],
          "fetalMilestones": [
            "창자배 형성(gastrulation)을 통해 외배엽(신경계/표피), 중배엽(심장/뼈/신장/혈액), 내배엽(소화관/폐/간)의 3배엽이 확립됩니다.",
            "신경판이 접히며 신경고랑을 형성하고 양옆으로 축옆중배엽 체절(somites)이 배열됩니다.",
            "한 쌍의 심내막관이 하나의 원시 심장관으로 융합되어 수정 후 약 22일경부터 꿈틀거리는 박동을 시작합니다."
          ],
          "maternalPhysiology": "급격히 상승하는 hCG, 에스트로겐, 프로게스테론으로 인해 초기 입덧, 유방 압통, 후각 예민 및 피로감이 나타납니다.",
          "doctorCheckIn": "자궁외임신 과거력, 반복 유산 또는 시험관(IVF) 임신인 경우 48시간 간격의 혈청 베타-hCG 검사 및 조기 초음파를 시행할 수 있습니다.",
          "clinicalPearl": "임신 5주 질식 초음파(TVUS)에서 혈청 베타-hCG가 판별 기준치(약 1,500–2,000 mIU/mL)를 넘으면 아기집(임신낭)과 난황낭이 관찰됩니다."
        },
        "6": {
          "phaseLabel": "임신 초기 — 기관형성기",
          "stageTitle": "신경관 폐쇄, 심장 고리 형성 및 팔다리 싹 출현",
          "biologicalStage": "배아 (카네기 단계 12–13)",
          "lengthMetric": "4 – 6 mm (머리엉덩길이)",
          "weightMetric": "0.1 g",
          "heartRateBpm": "100 – 115 BPM",
          "keyOrgans": [
            "앞·뒤 신경구멍",
            "S자형 심장 고리",
            "눈소포 (안포)",
            "귀기원판"
          ],
          "fetalMilestones": [
            "앞(머리쪽) 신경구멍과 뒤(꼬리쪽) 신경구멍이 수정 후 28일경 완전히 닫히며 뇌소포와 척수를 형성합니다.",
            "원시 심장관이 S자형 고리 형성(looping)을 거치며 질식 초음파에서 규칙적인 심장 박동이 관찰됩니다.",
            "위·아래 팔다리 싹(limb buds)과 인두굽이(미래의 턱, 입천장, 중이 구조)가 함께 나타납니다."
          ],
          "maternalPhysiology": "신장 혈류량이 25–30% 증가하여 자궁이 방광을 압박하기 전부터 빈뇨 증상이 나타날 수 있습니다.",
          "doctorCheckIn": "초기 생존 및 임신 주수 확인 초음파(임신 6–8주): 자궁 내 배아(태아극)와 심박동을 확인하고 머리엉덩이길이(CRL, 오차 ±3–5일)를 측정합니다.",
          "clinicalPearl": "신경관 폐쇄는 임신 6주에 완료되므로 척추갈림증 등 신경관 결손을 예방하려면 임신 전부터 초기까지 엽산 복용이 매우 중요합니다."
        },
        "7": {
          "phaseLabel": "임신 초기 — 기관형성기",
          "stageTitle": "종뇌 확장, 손판 형성 및 후신(영구 신장) 발달",
          "biologicalStage": "배아 (카네기 단계 15–16)",
          "lengthMetric": "9 – 11 mm (머리엉덩길이)",
          "weightMetric": "0.5 g",
          "heartRateBpm": "120 – 140 BPM",
          "keyOrgans": [
            "대뇌 반구",
            "영구 신장 (후신)",
            "손판 손가락 광선",
            "췌장 싹"
          ],
          "fetalMilestones": [
            "앞뇌(전뇌)가 한 쌍의 끝뇌소포(미래의 대뇌피질)로 나뉘며 분당 약 10만 개의 새로운 신경세포를 생성합니다.",
            "손판이 납작해지며 손가락 광선(digital rays)이 나타나고, 수정체 소포 함입과 망막 색소가 형성됩니다.",
            "요관싹이 후신 중간엽으로 자라 들어가 영구 신장(후신, metanephros)을 형성합니다."
          ],
          "maternalPhysiology": "자궁경부샘에서 두꺼운 점액마개(mucus plug)를 분비하여 외부 세균의 상행 감염으로부터 자궁강을 보호합니다.",
          "doctorCheckIn": "임신 중 오심 및 구토(입덧)의 ACOG 1차 치료제는 비타민 B6(피리독신 10–25 mg 하루 3회)와 독실라민(12.5–25 mg) 복합요법입니다.",
          "clinicalPearl": "이번 주부터 생리적 중장 탈출이 시작됩니다. 급속히 자라는 장 고리가 일시적으로 탯줄 기저부로 밀려 나왔다가 임신 10–11주경 복강 내로 완전히 복귀합니다."
        },
        "8": {
          "phaseLabel": "임신 초기 — 기관형성기",
          "stageTitle": "4방 심장 중격 형성 및 물갈퀴 모양 손가락",
          "biologicalStage": "배아 (카네기 단계 18–20)",
          "lengthMetric": "15 – 17 mm (머리엉덩길이)",
          "weightMetric": "1.1 g",
          "heartRateBpm": "145 – 165 BPM",
          "keyOrgans": [
            "방실판막",
            "심실중격",
            "연골화 중심",
            "외이 (귓바퀴)"
          ],
          "fetalMilestones": [
            "심내막융기가 융합하고 심실중격이 닫히면서 4심방·심실(2심방 2심실)의 심장 구조가 완성됩니다.",
            "세포자멸사(apoptosis)를 통해 물갈퀴 모양의 손발가락 사이에 패임이 생기고 팔꿈치와 무릎 관절이 구부러집니다.",
            "연골성 1차 골격 틀이 형성되고 몸통과 사지의 자발적인 미세 움직임이 시작됩니다."
          ],
          "maternalPhysiology": "자궁이 주먹 크기에서 큰 레몬 크기로 커지며, 모체의 심박출량이 일회박출량 및 심박수 증가로 약 20% 상승합니다.",
          "doctorCheckIn": "산전 초기 종합 진찰 및 기본 혈액·소변 검사(임신 8–10주): 일반혈액검사(CBC), 혈액형/Rh/불규칙항체, 풍진, B/C형 간염, HIV, 매독, 소변 배양 검사를 시행합니다.",
          "clinicalPearl": "임신 7~13주 사이에 측정한 머리엉덩이길이(CRL)는 공식 분만예정일(EDD)을 산정하거나 교정하는 가장 정확한 기준입니다."
        },
        "9": {
          "phaseLabel": "임신 초기 — 후기 배아 단계",
          "stageTitle": "배아 심박수 정점, 눈꺼풀 융합 및 횡격막 형성",
          "biologicalStage": "후기 배아 (카네기 단계 21–22)",
          "lengthMetric": "22 – 25 mm (2.3 cm 머리엉덩길이)",
          "weightMetric": "2.0 g",
          "heartRateBpm": "155 – 175 BPM (생리적 최고점)",
          "keyOrgans": [
            "흉복막 횡격막",
            "융합된 눈꺼풀",
            "뇌하수체 및 부신피질",
            "성대 인대"
          ],
          "fetalMilestones": [
            "자율신경계(부교감신경)가 성숙하는 과정에서 배아 심박수가 생리적 최고치(약 165–175 BPM)에 도달합니다.",
            "흉복막이 가로중격(septum transversum)과 융합하여 흉강 횡격막을 완성합니다.",
            "눈꺼풀이 자라 눈을 덮고 융합되며, 발달 중인 각막을 보호하기 위해 임신 25–26주까지 닫힌 상태를 유지합니다."
          ],
          "maternalPhysiology": "혈청 베타-hCG 수치가 정점(약 90,000–100,000 mIU/mL)에 이르며 임신 9–10주 사이에 입덧이 가장 심해지는 경우가 많습니다.",
          "doctorCheckIn": "산전 유전 선별검사 옵션을 상담하세요: 임신 10주 0일부터 가능한 비침습적 산전검사(NIPT), 보인자 검사 및 목투명대(NT) 초음파.",
          "clinicalPearl": "심한 구토로 임신 전 체중의 5% 이상 감소하거나 케톤뇨, 24시간 동안 수분 섭취가 불가능한 경우(임신오조증) 수액 및 항구토제 치료를 위해 병원을 방문하세요."
        },
        "10": {
          "phaseLabel": "임신 초기 — 배아에서 태아로의 전환기",
          "stageTitle": "기관형성기 완료 및 NIPT(비침습적 산전검사) 가능 시기",
          "biologicalStage": "배아 → 태아 전환기 (카네기 단계 23)",
          "lengthMetric": "31 – 35 mm (3.3 cm 머리엉덩길이)",
          "weightMetric": "4.0 g",
          "heartRateBpm": "150 – 170 BPM",
          "keyOrgans": [
            "연골내 골화",
            "네프론 사구체 여과",
            "유치 치배 (치아 싹)",
            "융모막 융모"
          ],
          "fetalMilestones": [
            "임신 10주 말은 ‘배아(Embryo)’에서 ‘태아(Fetus)’로 전환되는 시점으로, 모든 주요 기관계가 해부학적 위치에 자리 잡습니다.",
            "후신(영구 신장)이 묽은 태아 소변을 생성하기 시작하며, 이는 곧 양수의 주성분이 됩니다.",
            "배아 꼬리가 완전히 사라지고 손톱 바닥과 턱뼈 내부의 유치 치배(치아 싹)가 형성됩니다."
          ],
          "maternalPhysiology": "태반 영양막이 황체를 대신하여 프로게스테론과 에스트라디올 합성을 맡기 시작합니다(‘황체-태반 전환’).",
          "doctorCheckIn": "NIPT(비침습적 산전 유전자 검사, 세포유리 DNA) 채혈 가능 시기 시작(임신 10주 0일): 21번 삼염색체(다운증후군, T21 민감도 >99%), 18번 삼염색체, 13번 삼염색체 및 성염색체 이수성을 선별합니다.",
          "clinicalPearl": "주요 구조적 기관형성이 10주 말에 완료되므로, 이후 태아 성장기에는 주요 기형유발물질에 대한 구조적 취약성이 크게 감소합니다."
        },
        "11": {
          "phaseLabel": "임신 초기 — 초기 태아기",
          "stageTitle": "중장 복강 내 복귀, 구개 융합 및 코마개 형성",
          "biologicalStage": "초기 태아",
          "lengthMetric": "4.1 – 4.5 cm (머리엉덩길이)",
          "weightMetric": "7.5 g",
          "heartRateBpm": "145 – 165 BPM",
          "keyOrgans": [
            "복벽 폐쇄",
            "2차 구개 융합",
            "간 적혈구 조혈",
            "모낭"
          ],
          "fetalMilestones": [
            "장관이 시계 반대 방향으로 270° 회전하며 태아 복강 내로 완전히 복귀하여 생리적 중장 탈출이 해소됩니다.",
            "위턱 입천장 선반(구개돌기)이 정중선에서 융합하여 구강과 비강을 분리합니다.",
            "태아의 간이 주요 조혈 기관이 되어 태아 헤모글로빈(HbF)을 활발히 생성합니다."
          ],
          "maternalPhysiology": "프로게스테론과 산화질소에 의해 모체 전신 혈관 저항이 낮아져 갑자기 일어설 때 가벼운 기립성 어지럼증이 생길 수 있습니다.",
          "doctorCheckIn": "임신 1분기 목투명대(NT) 초음파 검사 시기(11주 0일~13주 6일) 및 적응증이 있는 경우 융모막 융모 생검(CVS, 10–13주)을 시행하는 시기입니다.",
          "clinicalPearl": "태아 헤모글로빈(HbF, 알파-2/감마-2)은 성인 헤모글로빈(HbA)보다 산소 친화도가 높아 태반을 통한 산소 전달을 극대화합니다."
        },
        "12": {
          "phaseLabel": "임신 초기 — 12주 이정표 (목투명대 검사)",
          "stageTitle": "삼킴 반사, 장 연동운동 및 저용량 아스피린 예방 시기",
          "biologicalStage": "태아",
          "lengthMetric": "5.3 – 5.8 cm (머리엉덩길이)",
          "weightMetric": "14 g (0.5 oz)",
          "heartRateBpm": "140 – 160 BPM",
          "keyOrgans": [
            "위장관 연동운동",
            "뇌하수체 호르몬 (ACTH/TSH)",
            "비장 림프구 생성",
            "쇄골 및 대퇴골 골화"
          ],
          "fetalMilestones": [
            "태아가 양수를 능동적으로 삼키기 시작하며, 장 평활근이 연동운동과 포도당 흡수를 시작합니다.",
            "두개골, 긴뼈(장골) 및 척추뼈에 1차 골화 중심이 나타납니다.",
            "외부 생식기가 디하이드로테스토스테론(DHT) 신호 유무에 따라 형태학적 분화를 시작합니다."
          ],
          "maternalPhysiology": "자궁바닥(자궁저부)이 치골결합 위로 올라오며 골반 장기에서 복강 장기로 전환되어 방광 압박이 일시적으로 완화됩니다.",
          "doctorCheckIn": "임신 12주 산전 진찰 + 전자간증 예방 점검: 고위험 요인이 1개 이상이거나 중등도 위험 요인(초산, 35세 이상, BMI >30 등)이 2개 이상인 경우, ACOG/USPSTF는 임신 12주부터 분만 시까지 저용량 아스피린(하루 81 mg) 복용을 권장합니다.",
          "clinicalPearl": "임신 12주에 정상 태아 심박동과 유전 선별검사 정상이 확인되면 자연유산의 통계적 위험은 1–2% 미만으로 낮아집니다."
        },
        "13": {
          "phaseLabel": "임신 초기 — 임신 초기 마지막 주",
          "stageTitle": "성대 성숙, 지문(피부능선) 형성 및 태반 내분비 자율성",
          "biologicalStage": "태아",
          "lengthMetric": "6.7 – 7.4 cm (머리엉덩길이)",
          "weightMetric": "25 g (0.9 oz)",
          "heartRateBpm": "140 – 160 BPM",
          "keyOrgans": [
            "태아-태반 단위",
            "지문 (진피 능선)",
            "췌장 (인슐린 분비)",
            "난소 원시 난포"
          ],
          "fetalMilestones": [
            "손가락 끝 패드에 고유한 표피 마찰 능선(지문)이 형성되기 시작합니다.",
            "여아 태아의 경우 발달 중인 난소 내에서 난조세포가 급속히 증식합니다(임신 중기까지 약 200만 개의 원시 난포 형성).",
            "몸통 성장에 비해 머리 성장이 완만해지면서 머리 크기가 머리엉덩이길이(CRL)의 약 3분의 1을 차지합니다."
          ],
          "maternalPhysiology": "태반이 내분비 기능을 완전히 담당함에 따라 hCG 수치가 완만히 감소하며, 입덧이 가라앉고 활력이 돌아오기 시작합니다.",
          "doctorCheckIn": "목투명대(NT) 초음파 측정 마지막 주간입니다(13주 6일 / CRL ≤84 mm 이전에 완료). 임신 중 안전한 치과 검진 및 스케일링을 예약하세요.",
          "clinicalPearl": "임신 중 치은염은 혈관 투과성 증가로 흔히 발생하며, 정기적인 스케일링과 국소 리도카인 마취(전신 에피네프린 과부하 없이)는 안전합니다."
        },
        "14": {
          "phaseLabel": "임신 중기 — 임신 중기 진입",
          "stageTitle": "배냇솜털(라누고) 출현, 갑상선 호르몬 합성 및 얼굴 표정",
          "biologicalStage": "임신 중기 태아",
          "lengthMetric": "8.5 cm (머리엉덩길이) / ~12 cm (전체키)",
          "weightMetric": "45 g (1.6 oz)",
          "heartRateBpm": "135 – 155 BPM",
          "keyOrgans": [
            "태아 갑상선 (티록신 T4)",
            "제7뇌신경 (안면신경)",
            "배냇솜털 (라누고)",
            "전립선 형성 / 난소 하강"
          ],
          "fetalMilestones": [
            "태아 갑상선이 요오드를 포집하여 신경 발달을 이끄는 내인성 티록신(T4) 합성을 시작합니다.",
            "제7뇌신경(안면신경)이 얼굴 근육을 지배하여 눈을 찡그리거나 찌푸리는 표정 반사가 가능해집니다.",
            "보호막인 태지(버닉스)를 피부에 고정해 줄 미세한 배냇솜털(라누고)이 자라기 시작합니다."
          ],
          "maternalPhysiology": "임신 중기(‘황금기’)에 접어들었습니다. 식욕이 회복되며 모체 심박출량은 임신 전보다 약 30–40% 증가한 상태입니다.",
          "doctorCheckIn": "자궁경부무력증이나 34주 미만 자연 조산 과거력이 있다면 자궁경부 길이 연속 측정이나 예방적 자궁경부 원형묶음술(맥도날드 수술, 12–14주)을 상담하세요.",
          "clinicalPearl": "14주차부터 태아 갑상선이 활성화되므로 태아 뇌 발달을 위해 충분한 요오드 섭취(임신 중 하루 220 mcg 권장)가 필수적입니다."
        },
        "15": {
          "phaseLabel": "임신 중기 — 골격 및 청각 발달",
          "stageTitle": "중이 청소골 골화, 양수 호흡 운동 및 모체 혈청 AFP 검사 시기",
          "biologicalStage": "태아",
          "lengthMetric": "10.1 cm (머리엉덩길이) / ~14.5 cm (전체키)",
          "weightMetric": "70 g (2.5 oz)",
          "heartRateBpm": "135 – 155 BPM",
          "keyOrgans": [
            "망치뼈 / 모루뼈 / 등자뼈",
            "기관-기관지 나무",
            "장골 골간",
            "미뢰 (맛봉오리)"
          ],
          "fetalMilestones": [
            "중이의 세 귓속뼈(망치뼈, 모루뼈, 등자뼈)가 골화되기 시작하여 전도성 청각 경로를 준비합니다.",
            "간헐적인 태아 호흡 운동을 통해 양수가 기관지 나무로 들어오고 나가며 폐 성장을 자극합니다.",
            "골격근 신경 지배가 강화되며 다리가 팔보다 길어집니다."
          ],
          "maternalPhysiology": "에스트로겐에 의한 멜라닌 세포 자극으로 복부 임신선(흑선)과 유륜 착색, 기미가 나타날 수 있습니다.",
          "doctorCheckIn": "모체 혈청 알파태아단백(MSAFP / 쿼드 검사) 시기 시작(임신 15–20주): 개방성 신경관 결손 및 복벽 결손을 선별합니다.",
          "clinicalPearl": "수면 자세: 임신 중기부터는 커진 자궁이 하대정맥을 누르지 않도록 옆으로 눕는 자세(특히 왼쪽 옆으로 눕기)가 권장됩니다."
        },
        "16": {
          "phaseLabel": "임신 중기 — 4개월(16주) 이정표",
          "stageTitle": "단속성 안구 운동, 사지 협응 굴곡 및 첫 태동 감지 시기",
          "biologicalStage": "태아",
          "lengthMetric": "11.6 cm (머리엉덩길이) / ~16.5 cm (전체키)",
          "weightMetric": "100 g (3.5 oz)",
          "heartRateBpm": "130 – 155 BPM",
          "keyOrgans": [
            "외안근",
            "탯줄 와튼 젤리",
            "태아 방광 배뇨 주기",
            "피부 감각 수용체"
          ],
          "fetalMilestones": [
            "중뇌 눈운동신경핵이 성숙함에 따라 닫힌 눈꺼풀 아래에서 느린 안구 운동이 시작됩니다.",
            "태아 심장은 와튼 젤리로 보호되는 3혈관 탯줄(동맥 2개, 정맥 1개)을 통해 하루 약 24리터(25 쿼트)의 혈액을 펌프질합니다.",
            "태아 방광이 30–45분마다 차고 비워지며 양수량과 완충 공간을 유지합니다."
          ],
          "maternalPhysiology": "경산모이거나 후벽 태반인 경우 임신 16–20주 사이에 첫 태동(나비 날개짓 같은 느낌)을 느끼기 시작할 수 있습니다.",
          "doctorCheckIn": "16주 정기 산전 진찰: 혈압, 체중, 소변 검사, 도플러 태아 심음 확인 및 MS-AFP/쿼드 혈액검사 시행. 20주 정밀 초음파를 예약하세요!",
          "clinicalPearl": "전방 태반(태반이 자궁 앞벽에 위치한 경우)은 쿠션 역할을 하여 첫 태동을 느끼는 시기가 임신 20~22주까지 늦어질 수 있으며, 이는 완전히 정상입니다."
        },
        "17": {
          "phaseLabel": "임신 중기 — 갈색 지방 및 면역 성숙",
          "stageTitle": "갈색 지방 조직 축적 및 경태반 IgG 항체 전달 시작",
          "biologicalStage": "태아",
          "lengthMetric": "13.0 cm (머리엉덩길이) / ~18.5 cm (전체키)",
          "weightMetric": "140 g (5.0 oz)",
          "heartRateBpm": "130 – 155 BPM",
          "keyOrgans": [
            "갈색 지방 조직 (BAT)",
            "달팽이관 유모세포",
            "땀샘 (한선)",
            "태반 FcRn IgG 수용체"
          ],
          "fetalMilestones": [
            "출생 후 비떨림 열생산을 담당하는 특수 갈색지방조직(BAT)이 목, 흉골, 신장 주위에 축적되기 시작합니다.",
            "태반 FcRn 수용체가 모체의 IgG 항체를 태아 순환계로 능동 수송하기 시작합니다.",
            "달팽이관 코르티 기관의 유모세포가 정렬되어 모체 심장박동 등 저주파 소리가 내이를 자극합니다."
          ],
          "maternalPhysiology": "골반 옆쪽의 자궁원인대가 늘어나면서 돌아눕거나 기침할 때 사타구니에 짧고 찌릿한 통증(‘원인대 통증’)이 생길 수 있습니다.",
          "doctorCheckIn": "양수검사 진단 시기(임신 15–20주): 선별검사 고위험군이거나 초음파 이상 소견이 있을 때 확진을 위해 시행할 수 있습니다.",
          "clinicalPearl": "원인대 통증은 움직일 때 수 초간 나타나는 짧은 통증입니다. 지속적이거나 규칙적인 수축성 복통, 출혈이 동반되면 즉시 진료받으세요."
        },
        "18": {
          "phaseLabel": "임신 중기 — 신경감각계 확장",
          "stageTitle": "신경 수초화 시작, 태지(버닉스) 형성 및 정밀 초음파 시기 시작",
          "biologicalStage": "태아",
          "lengthMetric": "14.2 cm (머리엉덩길이) / ~20.5 cm (전체키)",
          "weightMetric": "190 g (6.7 oz)",
          "heartRateBpm": "125 – 155 BPM",
          "keyOrgans": [
            "슈반 세포 수초화",
            "피지선 (태지 분비)",
            "심장 유출로",
            "뇌량"
          ],
          "fetalMilestones": [
            "피지선에서 지질과 항균 성분이 풍부한 생물막인 태지(버닉스)를 분비하여 양수로부터 태아 피부를 보호합니다.",
            "말초 슈반 세포와 중추 희소돌기아교세포가 신경 축삭의 수초화(미엘린 형성)를 시작하여 신경 전달 속도를 높입니다.",
            "뇌량이 좌우 대뇌 반구를 연결하며, 초음파에서 심장 유출로(대동맥 및 폐동맥)가 뚜렷하게 구분됩니다."
          ],
          "maternalPhysiology": "임신 중기 생리적 혈압 최저점: 전신 혈관 확장으로 인해 임신 18–20주경 혈압이 평소보다 5–10 mmHg가량 가장 낮아집니다.",
          "doctorCheckIn": "임신 중기 정밀 초음파(Level II 해부학 초음파) 시기 시작(임신 18–22주): 태아 심장과 척추를 가장 잘 관찰할 수 있는 19주 0일~21주 0일 사이가 권장됩니다.",
          "clinicalPearl": "정밀 초음파 검사 시 조산 위험을 선별하기 위해 자궁경부 길이(18–24주 정상 기준 ≥25 mm)도 함께 측정합니다."
        },
        "19": {
          "phaseLabel": "임신 중기 — 감각 피질 매핑",
          "stageTitle": "체성감각 피질 매핑 및 신장 세뇨관 농축 기능 성숙",
          "biologicalStage": "태아",
          "lengthMetric": "15.3 cm (머리엉덩길이) / ~22.5 cm (전체키)",
          "weightMetric": "240 g (8.5 oz)",
          "heartRateBpm": "125 – 155 BPM",
          "keyOrgans": [
            "체성감각 피질",
            "헨레 고리 (콩팥세관)",
            "영구치 치배",
            "세기관지 분지"
          ],
          "fetalMilestones": [
            "시상-피질 신경 투사가 대뇌 피질 하판에 도달하여 청각, 시각, 촉각 처리의 기초를 다집니다.",
            "위아래 턱뼈의 유치 치배 깊은 곳에서 영구치 치배(치아 싹)가 형성됩니다.",
            "폐 발달의 세관기(canalicular stage)가 시작되어 호흡세기관지가 분지하고 폐 모세혈관이 증식합니다."
          ],
          "maternalPhysiology": "모체 혈액량이 약 30–35% 증가하여 적혈구 생성을 위한 철분 요구량이 커지므로 꾸준한 철분 섭취가 필요합니다.",
          "doctorCheckIn": "20주 산전 진찰과 정밀 초음파에서 질문할 내용(태반 위치와 자궁경부와의 거리, 3혈관 탯줄 확인 등)을 미리 준비하세요.",
          "clinicalPearl": "19–20주 초음파에서 ‘전치태반 경계’ 또는 ‘하위 태반’ 소견이 있더라도 자궁 하부가 늘어나면서 32주경에는 90% 이상이 정상 위치로 올라갑니다."
        },
        "20": {
          "phaseLabel": "임신 중기 — 임신 반환점 (20주 정밀 초음파)",
          "stageTitle": "임신 반환점 이정표: Level II 정밀 해부학 초음파 및 자궁저부 배꼽 높이 도달",
          "biologicalStage": "임신 중기 반환점 태아",
          "lengthMetric": "25.5 cm (10.0 in 머리발꿈치길이 CHL)",
          "weightMetric": "300 g (10.6 oz)",
          "heartRateBpm": "120 – 155 BPM",
          "keyOrgans": [
            "4심방·심실 및 유출로 단면",
            "후두개와 / 소뇌",
            "태변 축적",
            "표피 각질층"
          ],
          "fetalMilestones": [
            "임신 20주부터는 태아 다리가 펴지기 때문에 머리엉덩이길이(CRL) 대신 정수리부터 발뒤꿈치까지의 전체 키(머리발꿈치길이, CHL)를 측정합니다.",
            "무균 상태의 태변(탈락된 장 상피세포, 배냇솜털, 담즙 색소, 양수)이 태아 대장에 쌓이기 시작합니다.",
            "수면-각성 주기가 나타나며 태아는 20–40분 간격으로 활발한 움직임과 조용한 휴식을 번갈아 반복합니다."
          ],
          "maternalPhysiology": "자궁바닥(자궁저부) 높이가 산모의 배꼽 위치에 도달합니다. 임신 20주부터 36주까지 자궁저부 높이(cm)는 임신 주수(±2 cm)와 거의 일치합니다.",
          "doctorCheckIn": "20주 산전 진찰 및 임신 중기 정밀 초음파(18–22주): 뇌실, 얼굴/입술, 4심방·심실 심장 및 유출로, 위, 신장, 방광, 척추, 3혈관 탯줄, 태반 위치 및 자궁경부 길이를 정밀하게 확인합니다.",
          "clinicalPearl": "임신 20주 이후 혈압이 중요한 이유: 임신 20주 이후에 새로 발생하는 고혈압(혈압 ≥140/90)은 임신성 고혈압 또는 전자간증(임신중독증)의 진단 기준이 됩니다."
        },
        "21": {
          "phaseLabel": "임신 중기 — 골수 조혈 기능 전환",
          "stageTitle": "골수 조혈 전환 및 소화 효소 성숙",
          "biologicalStage": "태아",
          "lengthMetric": "26.7 cm (10.5 in 전체키)",
          "weightMetric": "360 g (12.7 oz)",
          "heartRateBpm": "120 – 155 BPM",
          "keyOrgans": [
            "골수 적혈구 조혈",
            "소장 융모",
            "비장 적색속질",
            "전정 미로 (평형감각)"
          ],
          "fetalMilestones": [
            "소화관이 삼킨 양수에서 수분과 당분을 흡수하기 시작합니다(임신 기간 동안 약 24 L / 25 qt의 양수가 여과됨).",
            "소장 미세융모에서 이당류 분해효소(락타아제, 수크라아제)가 발현되어 삼킨 양수로부터 수분과 전해질을 흡수합니다.",
            "내이의 전정 반고리관이 산모의 움직임을 감지하여 산모가 걸을 때는 흔들림에 잠들고 누워서 쉴 때 더 활발히 움직입니다."
          ],
          "maternalPhysiology": "릴랙신 호르몬이 출산을 대비해 치골결합과 천장관절 인대를 이완시키므로 가벼운 골반통이 나타날 수 있습니다.",
          "doctorCheckIn": "20주 정밀 초음파 당시 태아 자세 때문에 일부 구조물이 가려졌던 경우, 2–4주 내에 간단한 재확인 초음파를 시행합니다.",
          "clinicalPearl": "아기가 밤에 더 활발해 보이는 이유: 낮 동안 걷는 움직임이 태아를 재워주고, 밤에 조용히 누우면 태아의 각성도가 높아지기 때문입니다."
        },
        "22": {
          "phaseLabel": "임신 중기 — 청각 및 촉각 통합",
          "stageTitle": "청각적 목소리 인지, 눈썹 형성 및 쥐기 반사",
          "biologicalStage": "태아",
          "lengthMetric": "27.8 cm (10.9 in 전체키)",
          "weightMetric": "430 g (15.2 oz)",
          "heartRateBpm": "120 – 155 BPM",
          "keyOrgans": [
            "달팽이관-청각피질 경로",
            "손바닥 파악 반사",
            "눈물관 (누관)",
            "폐포관 원기"
          ],
          "fetalMilestones": [
            "뇌간 청각 반응이 성숙하여 태아는 엄마 목소리의 억양과 낮은 외부 소리를 듣고 익히기 시작합니다.",
            "손바닥 파악(쥐기) 반사가 발달하여 태아가 탯줄을 잡기도 합니다(와튼 젤리가 혈관 압박을 방지합니다).",
            "눈썹과 가는 머리카락이 보이기 시작하지만 멜라닌 색소는 아직 완전히 침착되지 않았습니다."
          ],
          "maternalPhysiology": "생리적 혈액희석: 혈장량 증가(약 45–50%)가 적혈구 증가(약 25–30%)보다 빨라 헤모글로빈 수치가 생리적으로 약간 낮아집니다.",
          "doctorCheckIn": "적응증이 있는 경우(시험관 임신, 임신 전 당뇨, 선천성 심장병 가족력 등) 임신 20–22주경 정밀 태아 심장초음파를 시행합니다.",
          "clinicalPearl": "임신 후반부에는 30초 미만으로 지속되는 불규칙하고 통증 없는 배 뭉침(브랙스턴 힉스 가진통)이 나타날 수 있으며 수분 섭취와 휴식으로 완화됩니다."
        },
        "23": {
          "phaseLabel": "임신 중기 — 생존 한계기 폐 계면활성제 형성",
          "stageTitle": "제2형 폐포세포 분화 및 초기 폐 계면활성제 지단백 합성",
          "biologicalStage": "태아 (생존 한계 도달기)",
          "lengthMetric": "28.9 cm (11.4 in 전체키)",
          "weightMetric": "500 g (1.1 lbs)",
          "heartRateBpm": "120 – 155 BPM",
          "keyOrgans": [
            "제2형 폐포 상피세포",
            "폐 모세혈관상",
            "급속안구운동 (REM) 수면",
            "췌장 랑게르한스섬"
          ],
          "fetalMilestones": [
            "말단 기도의 제2형 폐포 상피세포가 분화하여 초기 폐 계면활성제(층판소체) 합성을 시작합니다.",
            "폐 모세혈관이 기도 상피와 밀착하여 원시 혈액-공기 장벽을 형성합니다.",
            "시각 및 감각운동 피질의 신경 회로 연결에 필수적인 급속안구운동(REM) 수면 주기가 시작됩니다."
          ],
          "maternalPhysiology": "자궁이 커지며 위장이 위로 밀려 올라가고 프로게스테론이 하부식도괄약근을 이완시켜 속쓰림(위식도 역류)이 생길 수 있습니다.",
          "doctorCheckIn": "조기 진통 징후를 숙지하세요: 규칙적인 골반 압박감이나 배 뭉침(시간당 4–6회 이상), 지속적인 아래 허리 통증, 수양성 또는 혈성 질 분비물 변화.",
          "clinicalPearl": "임신 23–24주는 현대 신생아중환자실(NICU)의 생존 한계(periviable threshold) 시점으로, 조산 위험 시 산전 스테로이드(베타메타손) 투여가 태아 폐 성숙을 크게 촉진합니다."
        },
        "24": {
          "phaseLabel": "임신 중기 — 생존 한계 도달 및 임신성 당뇨 선별검사",
          "stageTitle": "폐 소낭기 전환, 생존 가능성 이정표 및 임신성 당뇨 선별검사(GCT) 시기 시작",
          "biologicalStage": "태아",
          "lengthMetric": "30.0 cm (11.8 in 전체키)",
          "weightMetric": "600 g (1.32 lbs)",
          "heartRateBpm": "120 – 155 BPM",
          "keyOrgans": [
            "종말낭 (폐포낭)",
            "내이 전정계",
            "태아 췌장 베타세포",
            "피부 모세혈관"
          ],
          "fetalMilestones": [
            "폐 발달이 세관기에서 낭상(saccular) 단계로 전환되어 호흡세기관지 끝에 종말낭(원시 폐포낭)이 형성됩니다.",
            "내이의 전정기관이 구조적으로 성숙하여 태아가 양수 내에서 공간 방향 감각을 갖게 됩니다.",
            "피하 모세혈관상이 혈액으로 채워지면서 태아 피부가 반투명한 상태에서 분홍빛을 띠게 됩니다."
          ],
          "maternalPhysiology": "태반락토겐(hPL), 코르티솔 등의 분비가 증가하여 태아에게 포도당을 원활히 공급하기 위한 생리적 인슐린 저항성이 커집니다.",
          "doctorCheckIn": "24주 산전 진찰 + 임신성 당뇨병 선별검사 시기 시작(임신 24–28주): 1시간 50g 경구 포도당 부하검사(GCT) 및 임신 후기 빈혈(CBC)/항체 검사를 준비합니다.",
          "clinicalPearl": "임신 24–28주에 임신성 당뇨병(GDM)을 검사하는 이유: 태반의 항인슐린 호르몬(hPL)이 24주경 급증하여 약 6–9%의 임신부에서 인슐린 분비 부족이 드러나기 때문입니다."
        },
        "25": {
          "phaseLabel": "임신 중기 — 폐 모세혈관 발달 및 콧구멍 개방",
          "stageTitle": "코마개 개통, 모세혈관 분지화 및 척추 골화",
          "biologicalStage": "태아",
          "lengthMetric": "34.6 cm (13.6 in 전체키)",
          "weightMetric": "660 g (1.45 lbs)",
          "heartRateBpm": "120 – 155 BPM",
          "keyOrgans": [
            "콧구멍 개방",
            "폐 계면활성제 단백질 (SP-B/SP-C)",
            "척추궁 골화",
            "손 우세 신경회로"
          ],
          "fetalMilestones": [
            "콧구멍을 막고 있던 상피 마개가 녹으면서 비강이 열려 양수 호흡 연습이 활발해집니다.",
            "제2형 폐포 세포 내에서 계면활성제 단백질 B와 C(SP-B, SP-C) 생성이 증가합니다.",
            "척추 구조(33개 척추뼈 고리, 150개 관절, 1,000개 인대)가 튼튼해지며 늘어나는 체중을 지탱합니다."
          ],
          "maternalPhysiology": "하지 정맥압이 높아지면서 밤에 종아리 쥐(근육 경련)가 나거나 저녁 무렵 발목에 가벼운 부종이 생길 수 있습니다.",
          "doctorCheckIn": "임신 24–28주 사이에 1시간 50g 경구 포도당 부하검사(임당 검사)를 완료하세요. 1시간 선별검사는 별도 지시가 없는 한 금식이 필요하지 않습니다.",
          "clinicalPearl": "1시간 선별검사(GCT) 수치가 ≥135–140 mg/dL로 나오더라도 당황하지 않으셔도 됩니다. 이는 진단이 아닌 선별검사이며, 금식 후 3시간 100g 확진검사(GTT)를 받는 산모의 약 75–80%는 정상으로 판정됩니다."
        },
        "26": {
          "phaseLabel": "임신 중기 — 시각 각성 및 눈꺼풀 개방",
          "stageTitle": "눈꺼풀 분리(눈뜸), 깜짝 눈깜빡임 반사 및 망막 간상세포 발달",
          "biologicalStage": "태아",
          "lengthMetric": "35.6 cm (14.0 in 전체키)",
          "weightMetric": "760 g (1.68 lbs)",
          "heartRateBpm": "120 – 155 BPM",
          "keyOrgans": [
            "망막 광수용체 (원뿔·막대세포)",
            "시신경 수초화",
            "진동음향 놀람 반사",
            "고환 서혜관 하강"
          ],
          "fetalMilestones": [
            "임신 9주 이후 닫혀 있던 눈꺼풀이 처음으로 분리되어 눈을 뜨며, 밝은 빛이나 큰 소리에 눈을 깜빡이는 깜짝 반사를 보입니다.",
            "안구 뒤쪽 망막의 막대세포(간상세포)와 원뿔세포(원추세포)가 분화합니다.",
            "남아 태아의 경우 고환길잡이(gubernaculum)가 고환을 서혜관(샅굴)을 통해 음낭 쪽으로 내려보내기 시작합니다."
          ],
          "maternalPhysiology": "횡격막이 약 4 cm 올라감에 따라 흉곽 둘레가 5–7 cm 넓어지고 1회 호흡량이 30–40% 증가합니다.",
          "doctorCheckIn": "임신 후기 혈액검사의 헤모글로빈/헤마토크릿 및 페리틴 수치를 확인하여 철결핍성 빈혈(임신 중기 Hb <10.5 g/dL, 후기 <11.0 g/dL) 여부를 점검하세요.",
          "clinicalPearl": "경구 철분제를 비타민 C(오렌지 주스 등)와 함께 공복 또는 격일로 복용하면 십이지장 흡수율이 높아지고 변비 부작용이 줄어듭니다."
        },
        "27": {
          "phaseLabel": "임신 중기 — 임신 중기 마지막 주",
          "stageTitle": "시상피질 통각 경로 연결, 태아 딸꾹질 및 백일해(Tdap) 백신 접종 시기 시작",
          "biologicalStage": "태아",
          "lengthMetric": "36.6 cm (14.4 in 전체키)",
          "weightMetric": "875 g (1.93 lbs)",
          "heartRateBpm": "120 – 155 BPM",
          "keyOrgans": [
            "대뇌 이랑(뇌회) 형성 시작",
            "횡격막신경 / 횡격막",
            "태아 비장 및 흉선",
            "피하 백색 지방"
          ],
          "fetalMilestones": [
            "규칙적인 태아 횡격막 수축(태아 딸꾹질)이 흔해지며 몇 초 간격의 일정하고 가벼운 톡톡거림으로 느껴집니다.",
            "매끄럽던 대뇌 반구 표면에 1차 고랑(뇌구)과 이랑(뇌회)이 잡히기 시작하며 대뇌 피질 표면적이 넓어집니다.",
            "태아 흉선(가슴샘)에서 T-림프구가 성숙합니다."
          ],
          "maternalPhysiology": "임신 중기가 마무리되면서 자궁저부가 배꼽 위 약 7 cm에 위치하며, 수분 저류로 인해 손목 터널 증후군(손 저림)이 살짝 나타날 수 있습니다.",
          "doctorCheckIn": "백일해(Tdap) 예방접종 시기 시작(임신 27–36주): CDC와 ACOG는 신생아에게 백일해 면역항체(IgG)를 전달하기 위해 매 임신마다 27–36주(이상적으로 27–30주) 사이에 Tdap 접종을 권장합니다.",
          "clinicalPearl": "태아 딸꾹질은 횡격막 신경과 뇌간 호흡 중추가 성숙하고 있다는 완전히 정상적인 신호로, 5–15분 동안 규칙적인 박동처럼 느껴집니다."
        },
        "28": {
          "phaseLabel": "임신 후기 — 임신 후기 진입 및 격주 진찰 전환",
          "stageTitle": "임신 3삼분기(후기) 진입, 로감(RhoGAM) 예방주사 및 매일 태동 세기 시작",
          "biologicalStage": "임신 후기 태아",
          "lengthMetric": "37.6 cm (14.8 in 전체키)",
          "weightMetric": "1,005 g (2.22 lb — 1 kg 이정표!)",
          "heartRateBpm": "115 – 155 BPM",
          "keyOrgans": [
            "동공 대광 반사",
            "폐 계면활성제 레시틴 합성",
            "소뇌 엽",
            "Rh(D) 항원 발현"
          ],
          "fetalMilestones": [
            "태아 체중이 1킬로그램(2.2 파운드) 이정표를 넘어서며, 피하 백색 지방 조직이 체중의 약 2–3%에 달합니다.",
            "동공이 빛에 반응하여 수축·확장하며, 수면 주기에 뚜렷한 REM 및 비-REM 뇌파 패턴이 나타납니다.",
            "기관지폐 계면활성제 생성이 가속화되어 레시틴/스핑고미엘린(L/S) 비율이 상승합니다."
          ],
          "maternalPhysiology": "임신 후기(3분기)에 접어들었습니다. 자궁 혈류량은 분당 약 500–700 mL(약 80%가 태반 관류)에 이릅니다.",
          "doctorCheckIn": "28주 산전 진찰(2주 간격 진찰로 전환): 1시간 당부하 선별검사(GCT) 결과 확인, 백일해(Tdap) 백신 접종, 산모가 Rh 음성인 경우 항D 면역글로불린(RhoGAM 300 mcg IM) 투여, 매일 태동 세기 시작.",
          "clinicalPearl": "ACOG 태동 측정 프로토콜(임신 28주부터): 매일 1회(가급적 식후) 옆으로 누워 딸꾹질을 제외한 뚜렷한 태동 10회를 느끼는 데 걸리는 시간을 측정합니다. 정상은 2시간 미만(대개 30분 미만)이며, 2시간 동안 10회 미만이면 지체하지 말고 분만실에 연락해 비수축검사(NST)를 받으세요."
        },
        "29": {
          "phaseLabel": "임신 후기 — 골격 무기질 침착 가속화",
          "stageTitle": "빠른 칼슘 축적 및 시상하부 체온 조절 중추 성숙",
          "biologicalStage": "태아",
          "lengthMetric": "38.6 cm (15.2 in 전체키)",
          "weightMetric": "1,150 g (2.54 lbs)",
          "heartRateBpm": "115 – 155 BPM",
          "keyOrgans": [
            "조골세포 칼슘 침착",
            "시상하부 시각교차앞핵 (체온조절)",
            "부신 DHEA-S 합성",
            "폐포 중격 형성"
          ],
          "fetalMilestones": [
            "태반이 하루 약 250–300 mg의 칼슘을 모체 순환계에서 태아 골격으로 능동 수송합니다.",
            "시상하부의 중추 체온조절 회로가 성숙합니다.",
            "태아 부신이 커지며 DHEA-S를 분비하고, 태반은 이를 에스트리올로 전환합니다."
          ],
          "maternalPhysiology": "태아 체중 증가와 요추 전만으로 무게중심이 앞으로 이동합니다. 편안한 신발과 골반 기울이기 스트레칭이 허리 부담을 줄여줍니다.",
          "doctorCheckIn": "이번 주는 정기 진찰이 없는 주간입니다(2주 간격: 다음 진찰은 30주). 매일 태동 측정과 혈압/증상 관찰을 지속하세요.",
          "clinicalPearl": "임신 후기에 태아는 전체 골격 칼슘과 철분 저장량의 80%를 축적하므로 하루 1,000 mg의 칼슘과 꾸준한 철분 섭취가 중요합니다."
        },
        "30": {
          "phaseLabel": "임신 후기 — 대뇌 피질 주름 형성 및 골수 조혈 확립",
          "stageTitle": "대뇌 피질 뇌회 심화, 골수 조혈 완성 및 양수량 정점",
          "biologicalStage": "태아",
          "lengthMetric": "39.9 cm (15.7 in 전체키)",
          "weightMetric": "1,320 g (2.91 lbs)",
          "heartRateBpm": "115 – 155 BPM",
          "keyOrgans": [
            "2차 및 3차 대뇌 고랑(뇌구)",
            "골수 조혈 기능 주도",
            "횡격막 호흡양 운동 주기",
            "배냇솜털 탈락 시작"
          ],
          "fetalMilestones": [
            "대뇌 피질의 주름 형성(뇌회화)이 빠르게 진행되어 고차원적 인지 기능을 담당하는 깊은 2차 고랑이 형성됩니다.",
            "이제 골수가 주된 조혈 기관으로 기능하며, 태아 적혈구는 약 60–90일의 수명으로 순환합니다.",
            "피하 지방이 두꺼워지면서 초기 배냇솜털(라누고)이 양수 속으로 조금씩 빠지기 시작합니다."
          ],
          "maternalPhysiology": "양수량이 생리적 최고치(임신 30–34주 사이 약 800–1,000 mL)에 근접하며 이후 만삭에 가까워지면서 서서히 감소합니다.",
          "doctorCheckIn": "30주 격주 산전 진찰: 혈압 측정, 소변 단백/포도당 검사, 자궁저부 높이 측정(약 28–32 cm), 도플러 태아 심음 확인 및 조기 진통 주의사항 점검.",
          "clinicalPearl": "자궁저부 높이가 임신 주수보다 3 cm 이상 크거나 작으면 태아 성장 및 양수량 확인을 위한 정밀 초음파를 시행합니다."
        },
        "31": {
          "phaseLabel": "임신 후기 — 시냅스 생성 및 피하지방 급증",
          "stageTitle": "수조 개의 시냅스 연결 형성 및 태아 뇌 DHA 축적",
          "biologicalStage": "태아",
          "lengthMetric": "41.1 cm (16.2 in 전체키)",
          "weightMetric": "1,500 g (3.31 lbs)",
          "heartRateBpm": "115 – 155 BPM",
          "keyOrgans": [
            "망막-시각피질 신경회로",
            "DHA 인지질 신경막",
            "신장 사구체 여과",
            "흡철-연하 협응 반사"
          ],
          "fetalMilestones": [
            "태아의 뇌는 신경세포막과 망막 광수용체 발달을 위해 하루 약 50–70 mg의 오메가-3 DHA를 축적합니다.",
            "오감(시각, 청각, 미각, 양수 내 향기 분자를 통한 후각, 촉각)이 모두 기능적으로 활성화됩니다.",
            "지금부터 만삭까지 태아는 매주 약 150~200 g(0.35~0.5 파운드)씩 체중이 증가합니다."
          ],
          "maternalPhysiology": "유선 꽈리에서 면역글로불린 A(IgA)가 풍부한 초유가 합성되며 간혹 몇 방울이 비칠 수 있습니다.",
          "doctorCheckIn": "고위험 임신(35~40세 이상 고령 임신, 약물 치료 중인 임신성 당뇨, 만성 고혈압, 쌍태아 등)의 경우 보통 임신 32주부터 주 1~2회 비수축검사(NST) 또는 생물리학적 계수(BPP) 검사를 시작합니다.",
          "clinicalPearl": "자궁 내 미각 학습: 엄마 식단의 향미 성분이 양수로 전달되어 태아가 맛을 경험하며, 이는 출생 후 이유식 적응에 긍정적인 영향을 줍니다."
        },
        "32": {
          "phaseLabel": "임신 후기 — 두위 회전 및 RSV 예방접종 시기",
          "stageTitle": "두정위 회전, 손톱 완성 및 임신부 RSV 백신 접종 시기",
          "biologicalStage": "태아 (두위 전환 단계)",
          "lengthMetric": "42.4 cm (16.7 in 전체키)",
          "weightMetric": "1,700 g (3.75 lbs)",
          "heartRateBpm": "110 – 155 BPM",
          "keyOrgans": [
            "두위 (머리 아래 자세)",
            "폐 계면활성제 포스파티딜글리세롤 (PG)",
            "손톱 바닥 완성",
            "모체-태아 IgG 항체 전달 급증"
          ],
          "fetalMilestones": [
            "약 85–90%의 태아가 서양배 모양의 자궁강에 맞춰 머리를 아래로 향하는 두정위(머리 위치)로 자세를 잡습니다.",
            "손톱이 손가락 끝까지 자라며, 백색 지방 조직이 체중의 약 7–8%에 달해 피부가 매끄럽고 불투명해집니다.",
            "활동 수면 시간의 30–40% 동안 태아 호흡 운동이 나타나며, 이는 생물리학계수(BPP) 초음파의 핵심 평가 지표입니다."
          ],
          "maternalPhysiology": "모체 혈장량이 최대치(임신 전 대비 +45–50%)에 도달하여 심혈관계 부담이 정점에 이릅니다.",
          "doctorCheckIn": "임신 32주 격주 산전 진찰 + 모체 RSV 백신 접종 기간 시작(임신 32~36주): CDC와 ACOG는 신생아의 중증 RSV 모세기관지염 예방을 위해 유행철(9~1월) 동안 32w0d~36w6d 사이에 모체 RSV 백신(아브리스보) 1회 접종을 권장합니다.",
          "clinicalPearl": "32주 이후 태동 느낌이 달라지는 이유: 자궁 내 공간이 좁아지면서 날카로운 발차기 대신 힘찬 구르기, 기지개, 팔꿈치/발뒤꿈치 밀기로 바뀌지만 전체 태동 횟수는 줄어들지 않아야 합니다!"
        },
        "33": {
          "phaseLabel": "임신 후기 — 모체 IgG 항체 전달 및 두개골 유연성",
          "stageTitle": "두개골 천문, 경태반 IgG 항체 전달 정점 및 흡철 협응",
          "biologicalStage": "태아",
          "lengthMetric": "43.7 cm (17.2 in 전체키)",
          "weightMetric": "1,920 g (4.23 lbs)",
          "heartRateBpm": "110 – 155 BPM",
          "keyOrgans": [
            "앞숫구멍(대천문) 및 뒤숫구멍(소천문)",
            "흡철-연하-호흡 3중 협응",
            "네프론 형성 완료 임박",
            "태반 IgG 항체 수송"
          ],
          "fetalMilestones": [
            "팔다리 긴뼈는 단단히 칼슘화되지만, 두개골 판들은 산도를 안전하게 통과할 수 있도록 섬유성 봉합선과 천문(‘숨구멍’)으로 분리되어 유연성을 유지합니다.",
            "태반을 통해 전달된 태아 혈중 IgG 항체 농도가 산모 혈청 농도에 근접하며 곧 산모 수치를 넘어섭니다.",
            "뇌간 신경핵이 ‘빨기-삼키기-호흡하기’의 리듬감 있는 삼중 협응 작용을 조율하기 시작합니다."
          ],
          "maternalPhysiology": "자궁저부가 명치(검상돌기) 가까이에 이르므로 소량씩 자주 식사하고 상체를 약간 높여 주무시면 역류성 식도염 완화에 도움이 됩니다.",
          "doctorCheckIn": "신생아 진료를 담당할 소아청소년과를 정하고, 뒤보기형 신생아 카시트를 차량에 미리 장착해 보세요.",
          "clinicalPearl": "태동 시 나타나는 태아 심박수 상승(15초 이상, 15 BPM 이상 증가)은 태아 자율신경계가 건강하고 산소 공급이 원활하다는 핵심 지표입니다."
        },
        "34": {
          "phaseLabel": "임신 후기 — 후기 조산 진입 및 신장 네프론 완성",
          "stageTitle": "평생 네프론 생성 완료 및 폐 계면활성제 급증",
          "biologicalStage": "후기 조산 진입 태아",
          "lengthMetric": "45.0 cm (17.7 in 전체키)",
          "weightMetric": "2,150 g (4.74 lbs)",
          "heartRateBpm": "110 – 155 BPM",
          "keyOrgans": [
            "신장당 100만 개 네프론 완성",
            "포스파티딜콜린 폐 계면활성제",
            "태지(버닉스)층 두꺼워짐",
            "고환 음낭 하강"
          ],
          "fetalMilestones": [
            "신장의 여과 단위인 네프론 생성(nephrogenesis)이 양쪽 신장당 약 100만 개로 임신 34–36주 사이에 평생 분량 완성을 마칩니다.",
            "폐 계면활성제 분비가 급증하며, 34주 이후 출생아의 생존율은 98% 이상이고 장기적인 호흡기 합병증 위험이 매우 낮습니다.",
            "태지(버닉스) 층이 두껍고 크림처럼 덮여 있으며 손발톱이 잘 형성되어 있습니다."
          ],
          "maternalPhysiology": "저녁 무렵 발목이 약간 붓는 것은 흔하지만, 얼굴이나 손이 갑자기 붓고 두통이나 시야 장애가 동반되면 즉시 혈압을 측정해야 합니다.",
          "doctorCheckIn": "34주 격주 산전 진찰: 혈압 및 전자간증 증상 확인, 자궁저부 높이, 태아 심음, 레오폴드 촉진법을 통한 태아 위치 확인 및 분만 계획/무통분만 상담.",
          "clinicalPearl": "임신 34주는 산과학적으로 중요한 분기점입니다. 34주 0일 이후에는 태아 폐와 전신 성숙도가 높아 조기 진통이 오더라도 자궁수축억제제를 드물게 사용합니다."
        },
        "35": {
          "phaseLabel": "임신 후기 — 간 기능 및 대사 성숙",
          "stageTitle": "간 글리코겐 비축, 철분 저장 및 빠른 지방 증가",
          "biologicalStage": "태아",
          "lengthMetric": "46.2 cm (18.2 in 전체키)",
          "weightMetric": "2,385 g (5.25 lbs)",
          "heartRateBpm": "110 – 150 BPM",
          "keyOrgans": [
            "간 글리코겐 및 철분 저장",
            "빌리루빈 포합 효소 (UGT1A1)",
            "피하 지방 (체중의 10%)",
            "협응 흡철 반사"
          ],
          "fetalMilestones": [
            "태아의 간은 탯줄 결찰 직후부터 모유 수유 전까지 혈당을 유지하기 위한 글리코겐과 페리틴(저장철)을 빠르게 비축합니다.",
            "신장과 간은 구조적으로 완성되었으며 빌리루빈 대사 효소(UGT1A1) 등 효소 경로가 성숙합니다.",
            "태아는 매일 약 30 g(1 온스)의 피하지방을 축적합니다."
          ],
          "maternalPhysiology": "자궁 하부가 얇아지고 태아 머리가 골반 쪽으로 내려오면서 골반 압박감과 빈뇨가 다시 늘어납니다.",
          "doctorCheckIn": "다음 주(임신 36주)부터는 매주(주 1회) 산전 진찰을 받게 되며, B군 연쇄상구균(GBS) 균배양 검사와 태아 위치 확인을 시행합니다.",
          "clinicalPearl": "35주차까지 출산 가방(신분증, 산모수첩, 수유 브라, 충전기, 아기 배냇저고리 및 속싸개 등)을 준비하고 분만 병원 입원 절차를 확인해 두세요."
        },
        "36": {
          "phaseLabel": "임신 후기 — 매주 진찰 시작 및 GBS 균 선별검사",
          "stageTitle": "폐포기 진입, B군 연쇄상구균(GBS) 선별검사 및 태아 하강",
          "biologicalStage": "후기 조산기 태아 (매주 진찰 전환)",
          "lengthMetric": "47.4 cm (18.7 in 전체키)",
          "weightMetric": "2,620 g (5.78 lbs)",
          "heartRateBpm": "110 – 150 BPM",
          "keyOrgans": [
            "진성 폐포 형성",
            "양수 내 태지 탈락",
            "태아 머리 골반 진입",
            "대장 내 태변 충만"
          ],
          "fetalMilestones": [
            "폐가 최종 발달 단계인 ‘폐포기(Alveolar Stage, 36주~유아기)’에 진입하여 가스 교환을 위한 얇은 벽의 진짜 폐포를 형성합니다.",
            "떨어져 나온 태지와 배냇솜털이 양수에 섞여 태아가 삼키면서 검록색의 첫 대변(태변)을 만듭니다.",
            "초산모의 경우 태아 머리가 골반 입구로 내려앉는 ‘태아 하강(lightening)’이 흔히 일어납니다."
          ],
          "maternalPhysiology": "태아 하강이 일어나면 윗배와 갈비뼈 아래 압박이 줄어 숨쉬기와 식사가 한결 편해지는 반면, 골반 바닥과 치골 압박감은 커집니다.",
          "doctorCheckIn": "36주 산전 진찰(매주 진찰 시작!): B군 연쇄상구균(GBS) 직장-질 도말 검사(36주 0일~37주 6일 시행) 및 태아 머리 위치(두정위) 확인.",
          "clinicalPearl": "임신 36–37주에 GBS 검사를 하는 이유: 건강한 성인의 약 25%가 무증상 보균자이며, 양성일 때 분만 중 페니실린 정맥주사를 맞으면 신생아 GBS 패혈증 위험을 80% 이상 줄일 수 있습니다. 또한 36주에 둔위(역아)라면 37주 둔위교정술(ECV)을 상의합니다."
        },
        "37": {
          "phaseLabel": "임신 후기 — 조기 만삭 (37주0일–38주6일)",
          "stageTitle": "초기 만삭 이정표, 둔위교정술(ECV) 시기 및 진통 내원 규칙(5-1-1)",
          "biologicalStage": "조기 만삭 태아",
          "lengthMetric": "48.6 cm (19.1 in 전체키)",
          "weightMetric": "2,860 g (6.30 lbs)",
          "heartRateBpm": "110 – 150 BPM",
          "keyOrgans": [
            "성숙 폐 계면활성제 L/S 비율 ≥2:1",
            "피질척수로 수초화",
            "동맥관 개존 유지",
            "볼 지방패드 (흡철 패드)"
          ],
          "fetalMilestones": [
            "임신 37주 0일이 되면 ‘초기 만삭(Early Term, 37주 0일~38주 6일; 완전 만삭은 39주 0일~40주 6일)’ 단계에 진입합니다.",
            "볼의 지방 패드가 통통하게 차올라 모유나 젖병을 빨 때 안정적인 흡입력을 제공합니다.",
            "태아 부신 코르티솔 급증이 폐액 재흡수 채널(ENaC)을 활성화하여 출생 직후 폐 속 수분을 빠르게 흡수하도록 준비합니다."
          ],
          "maternalPhysiology": "자궁경부 숙화가 조용히 시작됩니다. 콜라겐 섬유가 재구성되면서 자궁경부가 코끝처럼 단단한 상태에서 입술처럼 부드럽게 변합니다.",
          "doctorCheckIn": "임신 37주 주간 산전 진찰: GBS 검사 결과, 혈압, 태아 심음을 확인하고 '5-1-1 / 4-1-1' 진통 규칙, 양막 파수('양수 터짐') 및 분만실 내원 시점을 점검합니다.",
          "clinicalPearl": "의학적 적응증 없이 39주 0일 이전 선택적 분만을 피하는 이유: 37주에서 39주 사이에 태아 뇌 무게가 약 30% 더 증가하고 호흡기 적응이 완성되기 때문입니다."
        },
        "38": {
          "phaseLabel": "임신 후기 — 조기 만삭 (38주)",
          "stageTitle": "폐 계면활성제 포스파티딜글리세롤(PG) 정점, 성대 및 원시 반사 완성",
          "biologicalStage": "조기 만삭 태아",
          "lengthMetric": "49.8 cm (19.6 in 전체키)",
          "weightMetric": "3,080 g (6.79 lbs)",
          "heartRateBpm": "110 – 150 BPM",
          "keyOrgans": [
            "포스파티딜글리세롤 (PG) 양성",
            "태아 심장 단락 (난원공)",
            "눈물샘 및 침샘 성숙",
            "체지방률 15%"
          ],
          "fetalMilestones": [
            "양수 내 포스파티딜글리세롤(PG)의 출현은 태아 폐의 생화학적 성숙이 완전히 끝났음을 의미합니다.",
            "체지방이 전체 태아 체중의 약 15%를 차지하여 출생 후 독립적인 체온 조절이 가능해집니다.",
            "성대와 신생아 원시 반사(모로 반사, 찾기 반사, 빨기 반사, 쥐기 반사) 및 감각 기관이 자궁 밖 생활을 위한 준비를 마칩니다."
          ],
          "maternalPhysiology": "점액마개 배출(‘이슬’—분홍빛이나 갈색 점액성 분비물)과 골반 압박감 증가, 불규칙한 가진통이 진진통 수일~수주 전에 나타날 수 있습니다.",
          "doctorCheckIn": "38주 주간 산전 진찰: 혈압, 소변 검사, 태아 심박수, 자궁저부 높이 확인 및 산후 회복, 모유 수유 지원, 산후 피임 계획 상담.",
          "clinicalPearl": "진진통 vs 가진통(브랙스턴 힉스): 가진통은 불규칙하고 수분 섭취나 휴식으로 사라지지만, 진진통은 자세를 바꾸어도 점점 더 길어지고 강해지며 간격이 짧아집니다."
        },
        "39": {
          "phaseLabel": "임신 후기 — 완전 만삭 (39주0일–40주6일)",
          "stageTitle": "완전 만삭 이정표, 비숍(Bishop) 점수 및 ARRIVE 연구 유도분만 상담",
          "biologicalStage": "완전 만삭 태아",
          "lengthMetric": "50.7 cm (20.0 in 전체키)",
          "weightMetric": "3,290 g (7.25 lbs)",
          "heartRateBpm": "110 – 150 BPM",
          "keyOrgans": [
            "만삭 대뇌 피질",
            "표피 재생 완성",
            "태반 옥시토신 분만 신호",
            "성숙 간 대사 효소"
          ],
          "fetalMilestones": [
            "축하합니다—임신 39주 0일이 되어 ACOG 및 SMFM 기준 공식 ‘완전 만삭(Full Term, 39주 0일~40주 6일)’에 도달했습니다!",
            "태아 폐에서 양수로 분비되는 계면활성제 단백질이 양막 대식세포와 모체 자궁의 옥시토신 수용체를 활성화하여 자연 진통을 시작하는 생물학적 신호가 됩니다.",
            "새로운 표피층이 형성되고 태지는 주로 피부 접히는 부위에만 남게 됩니다."
          ],
          "maternalPhysiology": "자궁경부 소실(두께가 0%에서 100%로 얇아짐)과 개대(자궁문이 0 cm에서 10 cm까지 열림)가 분만 제1기 동안 진행됩니다.",
          "doctorCheckIn": "39주 주간 산전 진찰: 선택적 내진(비숍 점수: 개대, 소실, 하강도 등 평가), 선택적 양막박리술 또는 ARRIVE 연구에 근거한 39주 선택적 유도분만 상담.",
          "clinicalPearl": "ARRIVE 연구(NEJM 2018): 저위험 초산모에서 임신 39w0d~39w4d의 선택적 유도분만은 기대요법에 비해 제왕절개율(18.6% 대 22.2%)과 임신성 고혈압 위험이 약간 낮아, 자연 진통 대기와 39주 유도분만 모두 안전하고 타당한 선택입니다."
        },
        "40": {
          "phaseLabel": "임신 후기 — 분만예정일 (EDD / 40주)",
          "stageTitle": "분만예정일(40w0d) 및 출생 시 심폐 순환 전환 준비 완료",
          "biologicalStage": "완전 만삭 태아",
          "lengthMetric": "51.2 cm (20.2 in 전체키)",
          "weightMetric": "3,460 g (7.63 lbs)",
          "heartRateBpm": "110 – 150 BPM",
          "keyOrgans": [
            "난원공 및 동맥관 출생 후 폐쇄 준비 완료",
            "약 300개의 골화 중심",
            "모체 유래 IgG 수동 면역",
            "산도 통과를 위한 두개골 봉합선"
          ],
          "fetalMilestones": [
            "출생 시 아기의 첫 울음이 폐를 팽창시키고 폐혈관 저항을 80% 낮추어 난원공(타원구멍)과 동맥관이 기능적으로 닫히게 됩니다.",
            "만삭 신생아는 약 300개의 뼈/연골 중심(성장하며 성인의 206개 뼈로 유합됨)을 가지고 태어나며, 생후 1일차 위 용적은 체리 크기(약 5–7 mL)로 초유 양에 정확히 맞춰져 있습니다.",
            "출생 시 시력은 정확히 20~30 cm(8~12 인치) 거리에 초점이 맞춰져 있는데, 이는 품에 안기거나 수유할 때 부모의 얼굴까지의 거리와 일치합니다."
          ],
          "maternalPhysiology": "정확히 분만예정일 당일에 태어나는 아기는 약 4–5%뿐이며, 자연 진통을 기다릴 경우 초산모의 약 50%는 40주 0일~41주 3일 사이에 출산합니다.",
          "doctorCheckIn": "40주 분만예정일 산전 진찰: 혈압, 태아 심음, 내진 및 필요시 양막박리술 시행, 그리고 41주 태아 안녕 검사(NST + 양수지수 AFI 또는 BPP) 및 유도분만 일정을 계획합니다.",
          "clinicalPearl": "양수 파수 시 확인할 4가지(COAT): 양수가 터지면 색깔(Color: 맑은지 녹갈색 태변 착색인지), 냄새(Odor), 양(Amount), 시간(Time)을 확인하고 진통이 없더라도 즉시 분만실로 연락하세요."
        },
        "41": {
          "phaseLabel": "만삭 후기 — 집중 태아 감시 (41주0일–41주6일)",
          "stageTitle": "후기 만삭 산전 태아 감시(NST / BPP) 및 유도분만 계획",
          "biologicalStage": "만삭 후기 태아",
          "lengthMetric": "51.7 cm (20.4 in 전체키)",
          "weightMetric": "3,600 g (7.94 lbs)",
          "heartRateBpm": "110 – 150 BPM",
          "keyOrgans": [
            "태반 예비능 감시",
            "양수지수 (AFI) 감시",
            "건조/박리 피부 (태지 감소)",
            "손끝을 넘는 긴 손톱"
          ],
          "fetalMilestones": [
            "임신 41주 0일부터 41주 6일 사이는 ACOG 기준 ‘후기 만삭(Late-Term)’으로 분류됩니다.",
            "대부분의 태지(버닉스)가 재흡수되어 이 시기에 태어나는 신생아는 손바닥과 발바닥 피부가 약간 건조하거나 벗겨지고 손톱이 긴 편입니다.",
            "태아의 각성도와 신경학적 성숙도는 최고조에 달해 있습니다."
          ],
          "maternalPhysiology": "태반 혈관의 성숙과 석회화가 서서히 진행되면서 후기 만삭에는 양수량이 자연스럽게 감소합니다.",
          "doctorCheckIn": "임신 41주 후기 만삭 진찰 및 주 2회 태아 감시: 비수축검사(NST)와 양수지수(AFI)/최대수직포켓(MVP ≥2 cm) 또는 생물리학적 계수(BPP, 8점 또는 10점 만점)를 시행하고, 42w0d 이전에 유도분만을 계획합니다.",
          "clinicalPearl": "ACOG 지침은 만삭 후 태반 기능 부전을 피하기 위해 41w0d부터 태아 안녕 검사를 시작하고 41w0d~41w6d 사이에 분만할 것을 권장합니다."
        },
        "42": {
          "phaseLabel": "만삭 후기 유도분만 권장 창 (42주0일)",
          "stageTitle": "적극적 유도분만, 아기 탄생 및 골든 아워(캥거루 케어)",
          "biologicalStage": "출산 및 탄생 이정표",
          "lengthMetric": "52.0 cm (20.5 in 전체키)",
          "weightMetric": "3,685 g (8.12 lbs)",
          "heartRateBpm": "110 – 150 BPM",
          "keyOrgans": [
            "지연 탯줄 결찰 (30–60초)",
            "출생 직후 골든아워 캥거루 케어(피부 접촉)",
            "아프가(APGAR) 점수 평가 (1분 & 5분)",
            "신생아 비타민 K 주사 및 안염 예방"
          ],
          "fetalMilestones": [
            "ACOG는 늦어도 임신 42주 0일까지는 분만할 것을 권장합니다(자연 진통이 없는 경우 자궁경부 숙화 및 옥시토신 유도분만 시행).",
            "출생 시 ACOG는 30–60초간 지연 탯줄 결찰을 권장하며, 이를 통해 약 80 mL의 태반 혈액이 전달되어 생후 첫 6개월간 아기의 철분 저장량을 높여줍니다.",
            "출생 직후 즉각적인 피부 맞대기(‘골든 아워’ 캥거루 케어)는 신생아의 체온, 혈당, 심박수를 안정시키고 첫 모유 수유와 산모의 옥시토신 분비를 촉진합니다."
          ],
          "maternalPhysiology": "분만 제3기에는 출생 후 5–30분 이내에 태반이 배출되며, 자궁 수축(자궁퇴축)이 나선동맥을 압박하여 산후 출혈을 예방합니다.",
          "doctorCheckIn": "분만 및 직후 산후 관리: 신생아 아프가(APGAR) 점수(1분 및 5분), 신생아 비타민 K 주사(출혈성 질환 예방), B형 간염 예방접종, 청각/대사이상 선별검사, 그리고 산후 2–3주 혈압/기분 점검 및 6주 산후 진찰 예약.",
          "clinicalPearl": "산후 위험 징후('POST-BIRTH' 경고): 출산 후 6주 이내에 흉통/호흡곤란, 경련, 자해 생각, 2시간 연속 시간당 패드 1개 이상 적시는 출혈, 절개 부위 감염, 종아리 통증/발적, 38.0°C(100.4°F) 이상의 발열, 또는 심한 두통 및 혈압 ≥140/90이 나타나면 즉시 응급실로 가세요."
        }
      },
      "appointments": {
        "appt-w6-8": {
          "cadenceLabel": "초기 임신 확인",
          "title": "임신 확인 및 분만 예정일 산정 초음파 진료",
          "summary": "자궁 내 정상 임신 위치, 태아극(배아), 심박동, 단태아/다태아 여부를 확인하고 머리엉덩이길이(CRL)로 정확한 분만 예정일을 산정합니다.",
          "procedures": [
            "경질 또는 복부 초음파 검사 (CRL 측정으로 분만 예정일을 ±3~5일 오차 내로 확정)",
            "난황낭, 임신낭 및 태아 심박수(100~165 BPM) 확인",
            "내과적, 외과적, 산과적 과거력 및 가족 유전력 문진",
            "초기 입덧(오심/구토) 관리 및 산전 비타민(엽산 ≥400~800 mcg) 복용 확인"
          ],
          "questionsToAsk": [
            "초음파상 머리엉덩이길이(CRL)가 마지막 생리일 기준 예정일과 일치하나요, 아니면 공식 예정일을 조정하나요?",
            "분만은 어느 병원 분만실에서 진행하며, 당직 산부인과 전문의 시스템은 어떻게 운영되나요?",
            "야간이나 휴일에 출혈이나 심한 증상이 있을 때 연락할 수 있는 응급 전화번호는 무엇인가요?"
          ],
          "highRiskAddition": "고령 임신(35세+) / 유산력 / 시험관 시술(IVF): 임신 5.5~6주 조기 초음파 확인 및 황체호르몬(프로게스테론) 보조 요법 검토."
        },
        "appt-w8-10": {
          "cadenceLabel": "4주마다 (q4w)",
          "title": "산전 종합 문진 및 초기 기본 혈액·소변 검사 패널",
          "summary": "전신 신체검진과 산모의 기초 혈액 및 소변 검사 패널을 시행합니다.",
          "procedures": [
            "일반혈액검사 (CBC: 혈색소, 적혈구용적률, 혈소판 수치)",
            "혈액형 (ABO, Rh(D) 인자) 및 비예기 항체 선별검사 (간접 쿰스 검사)",
            "면역 항체 및 감염성 질환 검사: 풍진 IgG, 수두 IgG, B형 간염(HBsAg), C형 간염, HIV, 매독(RPR)",
            "소변 배양 및 감수성 검사 (급성 신우신염 예방을 위한 무증상 세균뇨 선별)",
            "갑상선자극호르몬 TSH(갑상선 병력 시), 당화혈색소 HbA1c(당뇨 고위험/BMI ≥25) 및 유전 질환 보인자 선별검사"
          ],
          "questionsToAsk": [
            "제 혈액형이 Rh 양성인가요 음성인가요? 풍진과 수두 면역 항체는 충분한가요?",
            "조기 임신성 당뇨병 선별검사나 임신 12주 저용량 아스피린 복용 대상에 해당하나요?",
            "비침습적 산전 기형아 검사(NIPT)와 1삼분기 목투명대(NT) 초음파 일정은 어떻게 조율하나요?"
          ],
          "highRiskAddition": "임신성 당뇨 고위험 / 이전 임신성 당뇨 / 다낭성난소증후군(PCOS) / BMI ≥25: 첫 방문 시 조기 1시간 당부하 검사(GCT) 또는 HbA1c 시행."
        },
        "appt-w10-13": {
          "cadenceLabel": "4주마다 (q4w)",
          "title": "NIPT (세포유리 DNA) 및 목투명대 (NT) 정밀 유전 선별검사 시기",
          "summary": "염색체 이수성 선별검사, 초기 태아 구조 평가 및 임신 12주 전자간증(임신중독증) 예방 요법을 시작합니다.",
          "procedures": [
            "산모 혈액 비침습적 산전 검사 (NIPT, 10주 0일 이후): 21, 18, 13번 삼염색체증 및 성염색체 이상 선별",
            "목투명대 (NT) 정밀 초음파 (11주 0일~13주 6일): 태아 목 뒤 투명대 두께(<3.0 mm 정상) 및 코뼈 유무 확인",
            "휴대용 도플러를 통한 태아 심음 확인 (140~165 BPM) 및 산모 혈압/소변 검사",
            "ACOG 전자간증 고위험/중등도 기준 충족 시 임신 12주부터 저용량 아스피린(매일 81 mg) 복용 시작"
          ],
          "questionsToAsk": [
            "제 상태에서 전자간증 예방을 위해 임신 12주부터 저용량 아스피린(81 mg) 복용을 시작해야 하나요?",
            "NIPT 결과는 언제 나오며(보통 7~10일 소요), 결과는 어떤 방식으로 안내받게 되나요?",
            "임신 중기(2삼분기)로 접어들면서 운동이나 여행 시 주의해야 할 사항이 있나요?"
          ],
          "highRiskAddition": "고령(35세+) / 쌍태아: 정밀 유전 상담; 확진을 원할 경우 융모막 융모 생검(CVS, 10~13주) 가능; 쌍태아의 융모막성(이란성/일란성 막 구분)은 14주 이전에 반드시 확인."
        },
        "appt-w16": {
          "cadenceLabel": "4주마다 (q4w)",
          "title": "임신 16주 2삼분기 정기 검진 및 모체 혈청 알파태아단백 (MSAFP) 검사",
          "summary": "산모와 태아의 건강 상태 점검 및 개방성 신경관 결손 혈청 표지자 선별검사를 시행합니다.",
          "procedures": [
            "혈압, 산모 체중 변화 추이 및 소변 스틱 검사 (단백뇨/당뇨/백혈구)",
            "휴대용 도플러를 통한 태아 심박수 확인",
            "개방성 신경관 결손(이분척추/무뇌아) 선별을 위한 모체 혈청 알파태아단백(MSAFP, 15~20주) 채혈 (NIPT를 시행하지 않은 경우 쿼드 검사)",
            "임신 20주 정밀 태아 기형아(Level II) 초음파 예약 안내"
          ],
          "questionsToAsk": [
            "NIPT가 저위험군이었더라도 개방성 신경관 결손 선별을 위해 오늘 단독 MSAFP 혈액검사를 해야 하나요?",
            "제 태반 위치를 고려할 때 언제부터 규칙적인 태동을 느끼기 시작할까요?"
          ],
          "highRiskAddition": "이전 자발적 조산 과거력: 임신 16주부터 24주까지 2주 간격으로 경질 자궁경부 길이 초음파 연속 측정."
        },
        "appt-w18-22": {
          "cadenceLabel": "4주마다 (q4w)",
          "title": "Level II 정밀 태아 기형아 초음파 및 임신 20주 산전 진찰",
          "summary": "머리부터 발끝까지 태아 주요 장기 구조를 정밀 확인하고 태반 위치, 양수량 및 자궁경부 길이를 측정합니다.",
          "procedures": [
            "Level II 정밀 해부학 초음파 (45~60분): 뇌실, 소뇌, 맥락총, 얼굴 옆모습/입술, 4방실 심장 및 좌우 심실 유출로, 횡격막, 위장, 신장, 3혈관 탯줄 부착부, 척추 및 사지(4지) 전체",
            "태반 위치 평가 (전치태반 및 전치혈관 배제)",
            "자궁경부 길이 측정 (18~24주 정상 기준 ≥25 mm)",
            "자궁저부 높이 측정 (20주에 배꼽 높이에서 시작), 혈압 및 소변 검사"
          ],
          "questionsToAsk": [
            "오늘 심장 유출로와 척추 단면이 모두 선명하게 확인되었나요, 아니면 추가 촬영이 필요한가요?",
            "제 태반은 전벽, 후벽, 기저부 중 어디에 위치하며 자궁경부 내구에서 충분히(>2 cm) 떨어져 있나요?",
            "제 자궁경부 길이는 몇 mm로 측정되었나요?"
          ],
          "highRiskAddition": "시험관 시술(IVF) / 당뇨병 합병 / 선천성 심장병 고위험: 임신 20~22주에 소아심장전문의 또는 모체태아의학 전문의를 통한 정밀 태아 심장초음파 시행."
        },
        "appt-w24-28": {
          "cadenceLabel": "28주부터 2주 간격으로 전환",
          "title": "임신성 당뇨병 선별검사(당부하), 빈혈 검사, 로감(RhoGAM) 및 백일해(Tdap) 예방접종",
          "summary": "임신 2삼분기와 3삼분기를 잇는 대사·혈액·면역학적 핵심 이정표 진찰입니다.",
          "procedures": [
            "임신성 당뇨병 선별을 위한 1시간 50g 경구 당부하 검사 (24~28주; ≥135~140 mg/dL 시 3시간 100g 정밀 당부하 검사)",
            "3삼분기 일반혈액검사(CBC) 재검 (철결핍성 빈혈 및 임신성 혈소판감소증 선별)",
            "산모가 Rh 음성인 경우 임신 28주에 비예기 항체 재검 및 로감(RhoGAM 300 mcg 근육주사) 투여",
            "신생아 백일해 수동면역 형성을 위해 임신 27~36주(이상적으로 27~30주)에 백일해(Tdap) 백신 접종",
            "산과 지침에 따른 3삼분기 매독 및 HIV 선별검사 재시행"
          ],
          "questionsToAsk": [
            "1시간 당부하 검사 수치와 혈색소/페리틴 수치는 어떤가요? 경구 철분제를 증량해야 할까요?",
            "오늘 Tdap 예방접종을 맞을 수 있나요? 배우자와 조부모님은 언제까지 접종해야 하나요(아기 대면 최소 2주 전)?",
            "임신 28주부터 매일 태동 횟수 측정(킥 카운트)은 어떻게 기록하면 되나요?"
          ],
          "highRiskAddition": "단일융모막 쌍태아: 쌍태아간 수혈증후군(TTTS) 감시를 위해 2주마다 초음파; 이융모막 쌍태아: 4주마다 성장 초음파 시행."
        },
        "appt-w30": {
          "cadenceLabel": "2주마다 (q2w)",
          "title": "임신 30주 격주 산전 진찰 및 태동 횟수 점검",
          "summary": "태아 성장 곡선과 전자간증 감시에 중점을 두는 3삼분기 첫 2주 간격 정기 검진입니다.",
          "procedures": [
            "혈압 및 소변 스틱 검사 (임신성 고혈압 / 단백뇨 선별)",
            "자궁저부 높이 측정(예상 28~32 cm) 및 도플러 태아 심박수 확인",
            "일일 태동 횟수(킥 카운트: 2시간 내 10회 이상) 패턴 점검",
            "조기 진통 경고 증상 교육 및 분만실 사전 입원 등록 안내"
          ],
          "questionsToAsk": [
            "자궁저부 높이가 임신 주수에 맞게 잘 자라고 있나요?",
            "분만실 입원 사전 등록은 어떻게 하며, 야간에 응급 분만실 출입구는 어디로 가야 하나요?"
          ],
          "highRiskAddition": "고령(≥35세) / 비만 / 임신성 당뇨 / 고혈압: 3삼분기 성장 초음파 및 임신 32주부터 매주 비수축검사(NST)/생물리학계수(BPP) 계획."
        },
        "appt-w32": {
          "cadenceLabel": "2주마다 (q2w)",
          "title": "임신 32주 산전 진찰, RSV 백신 접종 시기 및 태아 성장 초음파 확인",
          "summary": "태아 위치(태위) 평가, 계절성 호흡기세포융합바이러스(RSV) 산모 예방접종 및 고위험 산전 감시를 시작합니다.",
          "procedures": [
            "신생아 중증 RSV 하기도 감염 예방을 위한 산모 RSV 백신 (Abrysvo, 9~1월 시즌 중 32주 0일~36주 6일) 접종",
            "혈압, 소변 검사, 자궁저부 높이(30~34 cm) 및 태아 심음 확인",
            "이전 저치태반, 고령 임신, 임신성 당뇨 또는 자궁저부 높이 불일치 시 태반 위치 재확인 및 성장 초음파 시행"
          ],
          "questionsToAsk": [
            "오늘 산모용 RSV 백신(아브리스보)을 맞을 수 있는 시기인가요(아니면 출생 후 아기가 베이포투스를 맞나요)?",
            "아기가 머리를 아래로 향한 자세(두정위)로 자리 잡기 시작했는지 알 수 있나요?"
          ],
          "highRiskAddition": "고령(≥35~40세) / 임신성 당뇨 / 만성 고혈압 / 태아 성장지연(FGR): 주 1~2회 비수축검사(NST) 및 생물리학계수(BPP) 시작."
        },
        "appt-w34": {
          "cadenceLabel": "2주마다 (q2w)",
          "title": "임신 34주 후기 조산 이정표 진찰 및 출산 계획(Birth Plan) 상담",
          "summary": "분만 진통 완화 옵션(무통주사 등), 출산 선호도, 회음부 마사지 및 전자간증 위험 신호를 점검합니다.",
          "procedures": [
            "혈압, 소변 단백뇨 검사, 자궁저부 높이(32~36 cm) 및 태아 심음 확인",
            "레오폴드 촉진법(Leopold maneuvers)을 통한 태아 축(종위 vs 횡위) 및 선진부 확인",
            "출산 계획 상담: 경막외 마취(무통분만), 간헐적 vs 지속적 태아 심박동 모니터링, 지연 제대 결찰 및 출생 직후 골든아워 캥거루 케어"
          ],
          "questionsToAsk": [
            "지연 제대 결찰, 출생 직후 피부 맞닿기(골든아워), 모유수유 전문가 회진에 대한 병원의 표준 절차는 어떠한가요?",
            "어떤 임상적 상황에서 제왕절개나 흡입/겸자 분만을 권유하시게 되나요?"
          ],
          "highRiskAddition": "전치태반 / 이전 고전적 제왕절개력: ACOG 지침에 따라 계획 분만 시기(전치태반은 통상 36주 0일~37주 6일) 확정."
        },
        "appt-w36": {
          "cadenceLabel": "매주 정기 검진 시작 (q1w)",
          "title": "임신 36주 B군 연쇄상구균 (GBS) 균배양 검사 및 태아 위치(두정위) 확인",
          "summary": "매주 정기 검진으로 전환하며, 전 산모 대상 GBS 균배양 선별검사와 두정위(머리 아래) 여부를 공식 확인합니다.",
          "procedures": [
            "질 하부 및 직장 B군 연쇄상구균(GBS) 도말 배양 검사 (36주 0일~37주 6일 시행; 5주간 유효)",
            "레오폴드 촉진법 및 필요 시 현장 초음파를 통해 두정위(머리 아래 자세) 확인",
            "36주에 둔위(역아)인 경우: 임신 37주 둔위교정술(외회전술, ECV) 시행 여부 상담",
            "지침에 따라 36주에 저용량 아스피린 중단; 단순포진바이러스(HSV) 병력이 있는 경우 36주부터 경구 아시클로버/발라시클로버 억제 요법 시작"
          ],
          "questionsToAsk": [
            "아기가 머리를 아래로 향한 자세(두정위)로 확정되었나요?",
            "만약 GBS 균 검사가 양성으로 나오면, 출산 최소 4시간 전에 페니실린 정맥주사를 맞기 위해 진통 시작이나 양수 파수 후 얼마나 빨리 분만실에 도착해야 하나요?"
          ],
          "highRiskAddition": "음부 포진(HSV) 과거력: 분만 시 활성 병변 및 제왕절개 필요성을 예방하기 위해 36주 0일부터 매일 경구 발라시클로버/아시클로버 예방 복용 시작."
        },
        "appt-w37": {
          "cadenceLabel": "매주 (q1w)",
          "title": "임신 37주 조기 만삭 진찰 및 분만실 내원 기준 안내",
          "summary": "GBS 배양 결과 확인, 조기 만삭의 생리적 준비 상태 점검 및 정확한 분만실 내원 기준을 교육합니다.",
          "procedures": [
            "혈압, 소변 검사, 자궁저부 높이 및 태아 심박수 확인",
            "GBS 균배양 검사 결과 확인 및 산모 수첩 기록",
            "분만실 내원 기준 확인(초산모 5-1-1 규칙: 5분 간격, 1분 지속 진통이 1시간 이상 지속될 때 또는 4-1-1 규칙; 양수 파수·질 출혈·태동 감소 시에는 즉시 내원)"
          ],
          "questionsToAsk": [
            "제 GBS 균배양 검사 결과는 어떻게 나왔나요?",
            "집에서 진통 없이 양수가 먼저 터지면 즉시 분만실로 와야 하나요?"
          ],
          "highRiskAddition": "임신성 고혈압 / 중증 징후 없는 경증 전자간증 / 임신성 담즙정체증 / 이융모막 쌍태아: ACOG 지침에 따라 통상 37주 0일~38주 0일에 분만 계획."
        },
        "appt-w38": {
          "cadenceLabel": "매주 (q1w)",
          "title": "임신 38주 주간 정기 검진 및 산후조리(4삼분기) 계획 수립",
          "summary": "지속적인 산모 혈압 및 태아 감시와 더불어 출산 후 4삼분기(산욕기) 준비를 진행합니다.",
          "procedures": [
            "혈압, 소변 스틱 검사, 자궁저부 높이 및 태아 심음 확인",
            "가진통이 있거나 자궁경부 개대/소실 상태를 확인하고 싶은 경우 선택적 내진 시행",
            "산후 회복, 골반저근 건강, 산후 우울증 선별(에든버러 척도 안내) 및 산후 피임 상담"
          ],
          "questionsToAsk": [
            "퇴원 후 모유수유 도움이 필요할 때 누구에게 연락하면 되나요?",
            "산후 검진 일정은 언제 잡히나요(ACOG는 출산 후 3주 이내 초기 점검 및 6~12주 종합 진찰을 권장합니다)?"
          ],
          "highRiskAddition": "식이 조절 임신성 당뇨 / 40세 이상 고령 임신: 39주 0일~39주 6일경 분만 시기에 대해 상의."
        },
        "appt-w39": {
          "cadenceLabel": "매주 (q1w)",
          "title": "임신 39주 완전 만삭 진찰, 양막박리술 및 유도분만 옵션 상담",
          "summary": "완전 만삭 이정표 평가, 선택적 자궁경부 비숍 점수(Bishop score) 확인 및 자연 진통 대기 vs. 39주 유도분만에 대한 공동 의사결정을 진행합니다.",
          "procedures": [
            "혈압, 소변 검사, 자궁저부 높이 및 태아 심음 확인",
            "비숍 점수(개대, 소실, 하강도, 경도, 위치) 평가를 위한 선택적 내진",
            "선택적 양막박리술(내진 자극술: 자궁경부가 ≥1 cm 열려 있는 경우 내인성 프로스타글란딘 분비를 촉진하여 48시간 내 자연 진통 유도)",
            "자연 진통 대기 요법 vs. 39주 선택적 유도분만(ARRIVE 임상시험 프로토콜)에 대한 상담"
          ],
          "questionsToAsk": [
            "현재 자궁경부 개대, 소실 및 태아 하강도는 어떠하며, 오늘 양막박리술을 받을 수 있나요?",
            "40주 예정일까지 자연 진통이 오지 않으면 언제 태아 안녕 검사(NST)와 유도분만 일정을 잡는 것이 좋을까요?"
          ],
          "highRiskAddition": "약물 조절 임신성 당뇨 / 35~40세 이상 고령 임신: ACOG는 임신 39주(39주 0일~39주 6일) 분만을 권장."
        },
        "appt-w40": {
          "cadenceLabel": "매주 (q1w)",
          "title": "임신 40주 분만 예정일 (EDD) 진찰 및 예정일 경과 관리 계획",
          "summary": "분만 예정일 상태 평가, 자궁경부 재확인 및 임신 41주 태아 안녕 감시 검사 일정을 예약합니다.",
          "procedures": [
            "혈압, 소변 단백뇨 검사 및 태아 심음 확인",
            "자궁경부 내진 및 선택적 양막박리술 재시행",
            "임신 41주 비수축검사(NST) 및 양수지수(AFI) / 생물리학계수(BPP) 초음파 처방",
            "41주 0일~41주 6일 사이 유도분만 입원 예정일 잠정 예약"
          ],
          "questionsToAsk": [
            "다음 주에 유도분만을 예약하게 되면, 자궁경부 숙화(폴리 카테터 풍선이나 프로스타글란딘 질정)를 위해 전날 저녁에 입원하나요, 아니면 당일 아침에 입원해 옥시토신을 투여하나요?"
          ],
          "highRiskAddition": "대부분의 고위험 임신 및 40세 이상 고령 임신은 ACOG/SMFM 합의에 따라 39주 0일~40주 0일 사이에 분만을 진행합니다."
        },
        "appt-w41-42": {
          "cadenceLabel": "주 2회 (41주 이상)",
          "title": "임신 41주 후기 만삭 NST / BPP 태아 감시 및 유도분만 입원",
          "summary": "주 2회 태아 안녕 및 양수량 검사를 시행하며 늦어도 42주 0일까지는 분만을 완료합니다.",
          "procedures": [
            "비수축검사 (NST): 20~40분간 외부 태아 심박동 모니터를 통해 기본 심박수(110~160 BPM), 중등도 변이성 및 20분 내 2회 이상의 심박수 상승(15x15) 확인",
            "생물리학계수 (BPP) / 양수 초음파: 최대 수직 양수 포켓(MVP ≥2 cm) 또는 양수지수(AFI ≥5 cm), 태아 호흡 운동, 근긴장도 및 움직임 확인",
            "42주 0일 이전에 자궁경부 숙화 및 유도분만을 위해 분만실 입원"
          ],
          "questionsToAsk": [
            "오늘 제 양수 포켓(MVP/AFI)과 태아 심박동 모니터(NST) 결과가 모두 정상 반응성(Reactive)인가요?",
            "예약된 유도분만을 위해 몇 시까지 분만실로 입원하면 되나요?"
          ],
          "highRiskAddition": "양수과소증(MVP <2 cm) 또는 비반응성 NST 소견: 즉시 분만실로 입원하여 분만 진행."
        }
      },
      "symptoms": {
        "sym-1": {
          "urgencyLabel": "즉시 분만실 내원 / 산부인과 연락",
          "trimesterScope": "3삼분기 (임신 28~42주)",
          "title": "태동 감소 (임신 28주 이상에서 2시간 동안 10회 미만의 태동)",
          "clinicalExplanation": "태동이 갑자기 줄어들거나 집중 태동 측정 시 2시간 이내에 10회의 뚜렷한 움직임에 도달하지 못하는 경우 태반 기능 부전이나 탯줄 압박의 조기 징후일 수 있습니다.",
          "actionSteps": "찬물을 마시고 조용한 방에서 왼쪽으로 누워 태동에 집중하세요. 내일까지 기다리거나 가정용 태아 심음기에 의존하지 말고, 즉시 분만실로 내원하여 20분간의 연속 비수축검사(NST)를 받으세요."
        },
        "sym-2": {
          "urgencyLabel": "즉시 분만실 / 응급실 내원",
          "trimesterScope": "임신 2·3삼분기(20주 이상) 및 산후",
          "title": "심하고 지속되는 두통, 시야 변화(번쩍임/흐릿함), 또는 우상복부/명치 통증",
          "clinicalExplanation": "아세트아미노펜과 수분 섭취로도 호전되지 않는 심한 두통, 시야 장애(번쩍임/흐려짐), 우상복부/명치 통증, 갑작스러운 얼굴·손 부종은 중증 전자간증 또는 HELLP 증후군의 대표적 징후입니다.",
          "actionSteps": "혈압계가 있다면 즉시 혈압을 측정하세요(≥140/90 상승; ≥160/110 고혈압 응급). 즉시 분만실 응급실로 내원하여 혈압 모니터링, 소변 단백뇨, 혈소판 및 간수치 검사를 받으세요."
        },
        "sym-3": {
          "urgencyLabel": "즉시 분만실 내원 / 산부인과 연락",
          "trimesterScope": "전 임신 기간 (1~42주)",
          "title": "질 출혈 (선홍색 출혈 또는 핏덩어리 배출)",
          "clinicalExplanation": "임신 1삼분기(초기)의 다량 출혈이나 한쪽 골반 통증을 동반한 출혈은 자궁외임신 또는 절박유산 평가가 필요합니다. 임신 2·3삼분기(중·후기)의 출혈은 전치태반이나 태반조기박리를 배제하기 위해 즉각적인 초음파 검사가 필요합니다.",
          "actionSteps": "즉시 분만실이나 응급실로 내원하세요. 산모가 Rh 음성 혈액형인 경우 출혈 발생 후 72시간 이내에 로감(RhoGAM) 주사를 맞아야 합니다."
        },
        "sym-4": {
          "urgencyLabel": "즉시 분만실로 내원",
          "trimesterScope": "임신 2·3삼분기(중·후기)",
          "title": "맑거나 분홍빛 또는 녹색빛 액체가 왈칵 쏟아지거나 지속적으로 흐르는 증상 (양수 파수)",
          "clinicalExplanation": "만삭 양막파수(ROM) 또는 37주 이전 조기양막파수(PPROM)는 감염에 대한 양막 방어벽을 소실시키며, 태아 머리가 진입되지 않은 경우 제대탈출(탯줄 탈출)의 위험이 있습니다.",
          "actionSteps": "액체의 색깔, 냄새, 양, 시간(COAT)을 기억하세요. 질 내에 아무것도 넣지 말고 즉시 분만실로 내원하여 멸균 질경 검사를 받으세요."
        },
        "sym-5": {
          "urgencyLabel": "1~2시간 이내에 산부인과 / 분만실 연락",
          "trimesterScope": "임신 2·3삼분기(20~36주)",
          "title": "임신 37주 이전의 규칙적인 자궁 수축 (1시간 동안 시간당 4~6회 이상 지속)",
          "clinicalExplanation": "37주 0일 이전에 생리통 같은 아랫배 통증, 골반 압박감, 둔한 허리 통증 또는 점액성 분비물을 동반한 규칙적인 배 뭉침은 조기 진통의 징후일 수 있습니다.",
          "actionSteps": "방광을 비우고 물 500 mL(16~24 온스)를 마신 뒤 왼쪽으로 누워 쉬세요. 1시간 동안 수축이 4~6회 초과하여 지속되면 즉시 분만실에 연락해 태아 파이브로넥틴 및 자궁경부 길이 평가를 받으세요."
        },
        "sym-6": {
          "urgencyLabel": "오늘 산부인과 연락 및 아세트아미노펜으로 해열",
          "trimesterScope": "전 임신 기간 (1~42주)",
          "title": "38.0°C (100.4°F) 이상의 발열 또는 오한",
          "clinicalExplanation": "임신 초기의 지속적인 산모 고열은 신경관 결손 위험을 높이며, 임신 중·후기에는 조기 자궁 수축을 유발하거나 급성 신우신염, 독감, 코로나19, 융모양막염의 신호일 수 있습니다.",
          "actionSteps": "아세트아미노펜(타이레놀 650~1000 mg)을 복용하여 심부 체온을 낮추고 수분을 섭취한 뒤, 오늘 산부인과에 연락하여 감염 원인을 진료받으세요."
        },
        "sym-7": {
          "urgencyLabel": "즉시 응급실(ER) 방문",
          "trimesterScope": "전 임신 기간 및 산후 6주",
          "title": "한쪽 종아리만 붓거나 붉어짐·열감, 또는 흉통 / 호흡곤란",
          "clinicalExplanation": "임신 중에는 출산 시 출혈을 막기 위해 혈액 응고 인자가 증가하는 과응고 상태가 되므로, 심부정맥혈전증(DVT, 장골동맥 압박으로 왼쪽 다리에 흔함) 및 폐색전증(PE) 위험이 높아집니다.",
          "actionSteps": "절대 종아리를 마사지하지 마세요(마사지 금지). 하지 정맥 도플러 초음파 검사를 위해 즉시 응급실로 내원하세요."
        },
        "sym-8": {
          "urgencyLabel": "24시간 이내에 산부인과 외래 연락",
          "trimesterScope": "임신 2삼분기 후반 및 3삼분기",
          "title": "손바닥과 발바닥의 심한 가려움증 (특히 밤에 심해지며 피부 발진이 없는 경우)",
          "clinicalExplanation": "일차적인 피부 발진 없이 손바닥과 발바닥이 심하게 가려운 증상은 혈청 담즙산 수치 상승으로 인한 임신성 간내 담즙정체증(ICP)의 전형적인 증상입니다.",
          "actionSteps": "산부인과에 연락하여 혈청 총담즙산 및 간기능 검사(AST/ALT)를 받으세요. 확진 시 우르소데옥시콜산(우루사) 복용으로 가려움증과 담즙산 수치를 낮춥니다."
        },
        "sym-9": {
          "urgencyLabel": "오늘 산부인과 외래로 연락",
          "trimesterScope": "전 임신 기간",
          "title": "배뇨 시 통증/작열감(배뇨통), 탁하거나 냄새 나는 소변 또는 옆구리 통증",
          "clinicalExplanation": "프로게스테론 호르몬이 요관을 확장시키므로 하부 요로감염(방광염)이 급성 신우신염(신장 감염)으로 쉽게 번질 수 있으며, 이는 조기 진통을 유발할 수 있습니다.",
          "actionSteps": "오늘 산부인과 외래로 연락하여 소변 검사 및 소변 배양 검사를 받고 임신 중 안전한 항생제(세팔렉신, 포스포마이신 등) 치료를 신속히 시작하세요."
        },
        "sym-10": {
          "urgencyLabel": "정상적인 생리적 변화 (정기 검진 시 상담)",
          "trimesterScope": "임신 2·3삼분기(중·후기)",
          "title": "돌아누울 때, 일어설 때 또는 기침할 때 사타구니(서혜부)의 짧고 찌릿한 통증",
          "clinicalExplanation": "전형적인 자궁 원인대 통증입니다. 자궁이 골반 위로 커지면서 자궁을 지탱하는 한 쌍의 원인대가 팽팽한 고무줄처럼 늘어나 갑작스러운 움직임에 일시적으로 경련을 일으킵니다.",
          "actionSteps": "기침이나 재채기 전에 고관절을 살짝 굽히고, 일어날 때는 천천히 옆으로 돌아누운 뒤 일어나며, 뜨겁지 않은 따뜻한 온찜질이나 산전 복대를 사용하세요."
        },
        "sym-11": {
          "urgencyLabel": "정상적인 생리적 변화 (브랙스턴 힉스 가진통)",
          "trimesterScope": "임신 2·3삼분기(중·후기)",
          "title": "수분 섭취와 휴식으로 가라앉는 불규칙하고 통증 없는 배 뭉침 (브랙스턴 힉스 수축)",
          "clinicalExplanation": "브랙스턴 힉스(\"연습\") 수축은 자궁경부를 열지 않으면서 자궁 평활근을 단련시킵니다. 주기가 불규칙하고 강도가 세지지 않으며, 흔히 탈수나 방광이 찼을 때 유발됩니다.",
          "actionSteps": "물 2잔을 마시고 소변을 본 뒤 왼쪽으로 누워 쉬세요. 만약 5~10분 간격으로 규칙적이 되거나 통증이 동반되면 산부인과로 연락하세요."
        },
        "sym-12": {
          "urgencyLabel": "정상적인 생리적 변화",
          "trimesterScope": "전 임신 기간",
          "title": "가벼운 코막힘 (\"임신성 비염\") 또는 간헐적인 코피",
          "clinicalExplanation": "에스트로겐에 의한 점막 충혈과 +45% 혈액량 증가로 인해 임산부의 최대 30%에서 비갑개가 붓고 코점막 모세혈관이 약해집니다.",
          "actionSteps": "멸균 생리식염수 코 스프레이, 침실 가습기 및 코확장 밴드를 사용하세요. 슈도에페드린이나 페닐레프린 같은 경구 코막힘 약(특히 임신 초기나 고혈압이 있는 경우)은 피하세요."
        }
      },
      "safety": {
        "med-1": {
          "category": "통증 및 해열",
          "statusLabel": "1차 승인 안전 약물 (ACOG)",
          "name": "아세트아미노펜 (타이레놀)",
          "dosageNote": "필요시 6시간마다 325–650 mg (24시간 최대 3,000 mg); 최소 유효 용량으로 최단 기간 복용.",
          "clinicalGuidance": "ACOG와 SMFM은 아세트아미노펜을 임신 전 기간에 걸쳐 가장 안전한 1차 진통·해열제로 확인합니다. 38.0°C(100.4°F) 이상의 모체 발열을 치료하는 것은 배아와 태아를 보호하는 데 임상적으로 중요합니다."
        },
        "med-2": {
          "category": "통증 및 해열",
          "statusLabel": "임신 중 복용 금기",
          "name": "이부프로펜(애드빌/부루펜), 나프록센 및 고용량 아스피린 (비스테로이드성 소염진통제 NSAIDs)",
          "dosageNote": "임신 기간 중 복용 피하기 (참고: 전자간증 예방을 위해 산부인과에서 처방한 저용량 81 mg 아스피린은 예외이며 안전합니다).",
          "clinicalGuidance": "경구 NSAIDs는 태아 프로스타글란딘 합성을 억제하여 임신 20주 이후 태아 동맥관 조기 폐쇄, 태아 신장 기능 저하 및 양수과소증을 유발할 수 있습니다."
        },
        "med-3": {
          "category": "입덧 및 오심·구토",
          "statusLabel": "ACOG 1차 표준 요법",
          "name": "비타민 B6 (피리독신) + 독실아민 (유니솜 / 디클렉틴)",
          "dosageNote": "비타민 B6 10–25 mg 하루 3회 + 취침 전 독실아민 숙신산염 12.5–25 mg.",
          "clinicalGuidance": "산과학에서 가장 광범위하게 입증된 입덧 1차 치료제입니다(20만 건 이상의 임신 연구에서 기형 유발 신호 없음)."
        },
        "med-4": {
          "category": "속쓰림 및 위식도 역류",
          "statusLabel": "1/2차 안전 승인",
          "name": "탄산칼슘 제산제 (텀스/Tums) 및 파모티딘 (펩시드/Pepcid)",
          "dosageNote": "탄산칼슘 필요시 500–1,000 mg; 제산제로 부족할 경우 파모티딘 10–20 mg 하루 1~2회 복용.",
          "clinicalGuidance": "칼슘 제산제는 안전하게 위산을 중화하고 칼슘을 보충해 줍니다(철분제와는 2시간 간격 유지). 비스무트 차살리실산염(Pepto-Bismol)은 살리실산 흡수 위험이 있으므로 피하세요."
        },
        "med-5": {
          "category": "변비 및 위장관",
          "statusLabel": "승인 (전신 흡수 극소)",
          "name": "폴리에틸렌글리콜 3350 (미라락스), 차전자피 (메타무실) 및 도큐세이트 (콜라스)",
          "dosageNote": "폴리에틸렌글리콜(MiraLAX) 17 g을 매일 물 240 mL(8 온스)에 타서 복용하고 수분 및 식이섬유 섭취를 늘리세요.",
          "clinicalGuidance": "프로게스테론은 장운동을 늦추고 철분제는 변비를 악화시킵니다. 삼투성 완하제와 팽창성 완하제는 전신 순환으로 흡수되지 않아 임신 전 기간에 안전합니다. 피마자유는 피하세요."
        },
        "med-6": {
          "category": "알레르기 및 감기",
          "statusLabel": "임신 중 1차 알레르기 완화제",
          "name": "로라타딘 (클라리틴), 세티리진 (지르텍) 및 플루티카손 비강 스프레이 (플로나제)",
          "dosageNote": "로라타딘 하루 10 mg 또는 세티리진 하루 10 mg; 코막힘 약이 복합된 '-D' 제품은 피하세요.",
          "clinicalGuidance": "2세대 항히스타민제와 스테로이드 나잘 스프레이는 임신 중 안전성이 잘 입증되어 있습니다. 1삼분기나 고혈압이 있는 경우 경구 슈도에페드린/페닐레프린 복용을 피하세요."
        },
        "med-7": {
          "category": "피부과 / 스킨케어",
          "statusLabel": "절대 금기 (기형 유발)",
          "name": "이소트레티노인 (로아큐탄/아큐탄) 및 바르는 레티노이드 (트레티노인 / 스티바A / 레티놀)",
          "dosageNote": "임신 전 복용 및 사용 중단 필수; 대신 아젤라산, 글리콜산(<10%) 또는 나이아신아마이드를 사용하세요.",
          "clinicalGuidance": "경구 레티노이드(비타민 A 유도체)는 심각한 두개안면, 심장 및 흉선 기형을 유발합니다. 안전을 위해 피부과 및 산부인과에서는 트레티노인, 아다팔렌, 레티놀 등 바르는 레티노이드도 임신 중 중단하도록 권고합니다."
        },
        "med-8": {
          "category": "영양 및 음료",
          "statusLabel": "하루 200 mg 미만 안전 (ACOG)",
          "name": "카페인 (커피, 에스프레소, 말차, 차)",
          "dosageNote": "하루 총 카페인 섭취량을 200 mg 이하(약 350 mL / 12 온스 드립 커피 1잔 또는 에스프레소 2샷)로 제한하세요.",
          "clinicalGuidance": "ACOG 위원회 지침은 하루 200 mg 미만의 적당한 카페인 섭취가 유산이나 조산 위험을 높이지 않음을 확인합니다. 홍차, 녹차, 콜라, 다크 초콜릿의 카페인도 하루 총량에 포함하세요."
        },
        "med-9": {
          "category": "영양 및 음료",
          "statusLabel": "강력 권장 (주 2–3회 섭취)",
          "name": "저수은 오메가-3 풍부 생선 (자연산 연어, 정어리, 송어, 대구, 새우)",
          "dosageNote": "완전히 익힌 저수은 해산물을 주당 225–340 g (8–12 oz) 섭취 (하루 약 200–300 mg의 DHA 공급).",
          "clinicalGuidance": "FDA와 ACOG는 태아 두뇌 및 망막 DHA 발달을 위해 주 2–3회 완전히 익힌 저수은 생선 섭취를 적극 권장합니다. 고수은 대형 포식 어류(상어, 황새치, 왕고등어, 청새치, 눈다랑어)는 엄격히 피하세요."
        },
        "med-10": {
          "category": "영양 및 음료",
          "statusLabel": "비가열 / 비살균 식품 피하기",
          "name": "비살균 유제품, 가열하지 않은 델리미트(햄/소시지) 및 날 숙주·새싹채소 (리스테리아 위험)",
          "dosageNote": "치즈 라벨에서 '살균 우유(Pasteurized Milk)로 제조' 문구를 확인하고, 델리미트와 핫도그는 김이 모락모락 날 때까지(74°C / 165°F) 가열하세요.",
          "clinicalGuidance": "임신 중에는 세포 매개 면역이 감소하여 태반을 통과하는 리스테리아균(Listeria monocytogenes)에 감염될 위험이 10배 높아집니다. 대형 마트에서 판매되는 대부분의 연성 치즈(페타, 브리 등)는 살균 처리되어 있으니 라벨을 확인하세요!"
        }
      },
      "photos": {
        "0": {
          "caption": "임신 1–2주: 배란기의 제2난모세포(약 120 µm) — 유리처럼 투명한 투명대와 방사관 난구세포가 파열된 난포에서 배출되는 모습.",
          "alt": "투명대와 주변 난구세포에 둘러싸여 난소 표면에서 배출되는 인간 난자의 초고화질 렌더링 이미지."
        },
        "1": {
          "caption": "임신 3주: 수정 후 4일차의 16세포 밀착 상실배(Morula) — 투명대 내부의 할구들과 극체.",
          "alt": "투명한 투명대 내부에 반투명 할구 세포들이 치밀하게 뭉쳐 있는 인간 상실배(morula)의 초고화질 렌더링 이미지."
        },
        "2": {
          "caption": "임신 4주: 부화하여 혈관이 풍부한 자궁내막에 착상 중인 배반포 — 영양막 고리, 배반포강 및 내세포괴.",
          "alt": "미세한 영양막 돌기를 뻗어 분홍빛 자궁내막에 부착하는 인간 배반포의 초고화질 렌더링 이미지."
        },
        "3": {
          "caption": "임신 5–6주: C자형으로 굽은 카네기 단계 초기 배아 — 등쪽 체절, 심장 융기 및 황금빛 난황낭.",
          "alt": "양막 내부에서 반투명한 피부, 뚜렷한 체절 및 난황낭을 보여주는 초기 인간 배아의 초고화질 렌더링 이미지."
        },
        "4": {
          "caption": "임신 7–9주: 후기 배아 단계 — 대뇌 소포, 색소성 안배, 4심방·심실 심장, 손판 디지털 광선 및 2차 난황낭.",
          "alt": "반투명 혈관 피부, 어두운 안배, 팔다리 싹 및 황금빛 난황낭을 보여주는 후기 인간 배아의 자궁 내 접사 사진."
        },
        "5": {
          "caption": "임신 10–15주: 임신 초기 태아 — 분리된 손발가락, 융합된 눈꺼풀, 반투명 관자놀이 혈관 및 왼쪽 태반에 연결된 3혈관 탯줄.",
          "alt": "3혈관 탯줄과 왼쪽 태반 원반이 연결된 양막 내 12주 인간 태아의 자궁 내 접사 사진."
        },
        "6": {
          "caption": "임신 16–25주: 임신 중기 태아 (20주 정밀 초음파 이정표) — 태지(버닉스) 윤기, 굴곡된 팔다리 및 왼쪽 태반과 연결된 3혈관 탯줄.",
          "alt": "왼쪽 태반 원반과 함께 양막 내에 떠 있는 20주 중기 인간 태아의 자궁 내 접사 사진."
        },
        "7": {
          "caption": "임신 26–33주: 임신 후기 초반 태아 — 평온하게 감은 눈꺼풀과 속눈썹, 빠르게 축적되는 피하 지방.",
          "alt": "양막 안에서 평온하게 쉬고 있는 28주 임신 후기 인간 태아의 자궁 내 접사 사진."
        },
        "8": {
          "caption": "임신 34–42주: 만삭 태아 — 통통한 볼, 성숙한 피하 지방과 폐 계면활성제를 갖추고 출생을 준비하는 모습.",
          "alt": "왼쪽 태반과 나선형 탯줄이 연결된 채 양막 안에 포근히 안겨 있는 만삭 인간 태아의 자궁 내 접사 사진."
        }
      }
    },
    "it": {
      "weeks": {
        "1": {
          "phaseLabel": "Periconcezionale (Fase Mestruale / Follicolare)",
          "stageTitle": "Reclutamento Follicolare e Reset Endometriale",
          "biologicalStage": "Coorte di Follicoli Ovarici",
          "lengthMetric": "0.04 mm (Follicolo Primordiale)",
          "weightMetric": "< 0,001 g",
          "heartRateBpm": "Non ancora formato (Preconcezionale)",
          "keyOrgans": [
            "Asse Ipotalamo-Ipofisi-Ovaio",
            "Strato Basale Endometriale",
            "Selezione del Follicolo Dominante"
          ],
          "fetalMilestones": [
            "La datazione ostetrica inizia il 1° giorno dell’Ultima Mestruazione (UM), circa 2 settimane prima del concepimento effettivo.",
            "L’ormone follicolo-stimolante (FSH) recluta una coorte di follicoli antrali; emerge un follicolo dominante di Graaf.",
            "L’aumento dell’estradiolo fa proliferare l’endometrio funzionale preparando un letto di impianto vascolarizzato."
          ],
          "maternalPhysiology": "Lo sfaldamento mestruale passa alla fase follicolare proliferativa. La temperatura basale resta nel range pre-ovulatorio inferiore.",
          "doctorCheckIn": "Controllo Preconcezionale: Assumere 400–800 mcg/die di acido folico (4 mg se pregresso difetto del tubo neurale), verificare l’immunità a rosolia/varicella e rivalutare i farmaci cronici.",
          "clinicalPearl": "L’ACOG calcola la gravidanza dal 1° giorno dell’UM (40 settimane / 280 giorni totali) poiché l’ovulazione varia, mentre l’età embrionale è inferiore di ~2 settimane (38 settimane / 266 giorni)."
        },
        "2": {
          "phaseLabel": "Periconcezionale (Fase Periovulatoria)",
          "stageTitle": "Picco di LH, Ovulazione e Captazione Tubarica",
          "biologicalStage": "Ovocita Secondario (Metafase II)",
          "lengthMetric": "0.12 mm (Ovocita di 120 µm)",
          "weightMetric": "< 0,001 g",
          "heartRateBpm": "Non ancora formato (Finestra ovulatoria)",
          "keyOrgans": [
            "Complesso Cumulo-Ovocita",
            "Zona pellucida dell'ovocita",
            "Formazione del Corpo Luteo"
          ],
          "fetalMilestones": [
            "Il picco di ormone luteinizzante (LH) a metà ciclo innesca la ripresa della Meiosi I e l’espulsione del primo globulo polare.",
            "L’ovulazione rilascia l’ovocita secondario fermato in Metafase II, catturato nell’ampolla tubarica dalle fimbrie.",
            "Il follicolo scoppiato si trasforma nel Corpo Luteo, secernendo progesterone per rendere l’endometrio secretivo."
          ],
          "maternalPhysiology": "Il picco di estrogeni stimola l'ispessimento endometriale e il muco cervicale fertile; la temperatura basale aumenta di ~0,3 °C (~0,5 °F) dopo l'ovulazione.",
          "doctorCheckIn": "Finestra Fertile: La massima fecondabilità si registra nei 5 giorni precedenti l’ovulazione e nel giorno stesso dell’ovulazione (vitalità ovocitaria 12–24 ore).",
          "clinicalPearl": "In caso di FIVET, il trasferimento di una blastocisti in 5ª giornata corrisponde a 2 settimane + 5 giorni di età gestazionale nel giorno del transfer."
        },
        "3": {
          "phaseLabel": "1° Trimestre — Stadio Germinale",
          "stageTitle": "Fecondazione, Segmentazione dello Zigote e Morula",
          "biologicalStage": "Zigote → Morula a 16 Cellule",
          "lengthMetric": "0.15 – 0.20 mm",
          "weightMetric": "< 0,001 g",
          "heartRateBpm": "Stadio di segmentazione avascolare",
          "keyOrgans": [
            "Genoma Diploide (46 Cromosomi)",
            "Compattazione dei Blastomeri",
            "Segregazione della Massa Cellulare Interna"
          ],
          "fetalMilestones": [
            "Fecondazione nell'ampolla della tuba di Falloppio con formazione di uno zigote diploide a 46 cromosomi.",
            "I pronuclei maschile e femminile si fondono nello zigote diploide (46,XX o 46,XY) avviando rapide divisioni mitotiche ogni 12–24 ore.",
            "Al 4° giorno dal concepimento, la morula a 16–32 cellule si compatta ed entra nella cavità uterina, cavitandosi in blastocisti."
          ],
          "maternalPhysiology": "Il Fattore Precoce di Gravidanza (EPF) modula la tolleranza immunitaria materna; il progesterone del corpo luteo sostiene l’endometrio.",
          "doctorCheckIn": "Non è ancora necessaria una visita. Evitare i FANS (ibuprofene, naprossene), poiché l’inibizione delle prostaglandine può ostacolare l’impianto.",
          "clinicalPearl": "Le esposizioni prima della 4ª settimana (14 giorni dal concepimento) seguono generalmente la legge del «tutto o nulla» (prima dell'organogenesi classica delle settimane 3–8 embrionali / 5–10 gestazionali), ma i teratogeni noti vanno sospesi subito."
        },
        "4": {
          "phaseLabel": "1° Trimestre — Impianto",
          "stageTitle": "Impianto della Blastocisti e hCG del Sinciziotrofoblasto",
          "biologicalStage": "Blastocisti Bilaminare in Impianto",
          "lengthMetric": "0.4 – 1.0 mm",
          "weightMetric": "< 0,01 g",
          "heartRateBpm": "Circolazione lacunare primitiva",
          "keyOrgans": [
            "Disco Epiblasto e Ipoblasto",
            "Cavità Amniotica",
            "Sacco Vitellino Primario",
            "Lacune Trofoblastiche"
          ],
          "fetalMilestones": [
            "La blastocisti si schiude dalla zona pellucida e invade l’endometrio uterino decidualizzato (Giorni 6–10 post-ovulazione).",
            "La Massa Cellulare Interna si differenzia nel disco embrionale bilaminare (epiblasto e ipoblasto).",
            "Il sinciziotrofoblasto invade i capillari spirali materni e secerne beta-hCG, sostenendo il corpo luteo nella produzione di progesterone."
          ],
          "maternalPhysiology": "Amenorrea; la beta-hCG sierica è rilevabile 8–11 giorni dopo l’ovulazione e raddoppia ogni 48–72 ore in una gravidanza intrauterina evolutiva.",
          "doctorCheckIn": "Test di gravidanza positivo! Contatta il ginecologo o l’ostetrica per fissare la prima visita prenatale e l’ecografia di datazione (di solito tra le Settimane 6 e 9).",
          "clinicalPearl": "Un lieve spotting («perdite da impianto») è frequente e benigno, mentre dolore pelvico unilaterale con perdite richiede dosaggi seriati di beta-hCG per escludere una gravidanza extrauterina."
        },
        "5": {
          "phaseLabel": "1° Trimestre — Organogenesi Iniziale",
          "stageTitle": "Gastrulazione, Placca Neurale e Tubo Cardiaco Primitivo",
          "biologicalStage": "Embrione Trilaminare (Stadio di Carnegie 9–10)",
          "lengthMetric": "1.5 – 2.5 mm (CRL)",
          "weightMetric": "0,02 g",
          "heartRateBpm": "85 – 100 BPM (Contrazioni iniziali)",
          "keyOrgans": [
            "Ectoderma / Mesoderma / Endoderma",
            "Doccia Neurale",
            "Semiluna Cardiogena",
            "Somiti"
          ],
          "fetalMilestones": [
            "La gastrulazione definisce i tre foglietti embrionali: Ectoderma (sistema nervoso/epidermide), Mesoderma (cuore/ossa/reni) ed Endoderma (intestino/polmoni/fegato).",
            "La placca neurale si ripiega nella doccia neurale fiancheggiata dai somiti del mesoderma parassiale.",
            "I tubi endocardici si fondono in un singolo tubo cardiaco primitivo che avvia contrazioni peristaltiche intorno al 22° giorno dal concepimento."
          ],
          "maternalPhysiology": "Il rapido aumento di hCG, estrogeni e progesterone provoca le prime nausee, tensione mammaria, olfatto accentuato e stanchezza.",
          "doctorCheckIn": "In caso di pregressa gravidanza extrauterina, poliabortività o FIVET, il medico può prescrivere beta-hCG seriate ogni 48 ore e un’ecografia precoce.",
          "clinicalPearl": "All’ecografia transvaginale della Settimana 5, camera gestazionale e sacco vitellino sono visibili quando la beta-hCG supera la zona discriminatoria (~1.500–2.000 mUI/mL)."
        },
        "6": {
          "phaseLabel": "1° Trimestre — Organogenesi",
          "stageTitle": "Chiusura del Tubo Neurale, Ripiegamento Cardiaco e Abbozzi degli Arti",
          "biologicalStage": "Embrione (Stadio di Carnegie 12–13)",
          "lengthMetric": "4 – 6 mm (CRL)",
          "weightMetric": "0,1 g",
          "heartRateBpm": "100 – 115 BPM",
          "keyOrgans": [
            "Neuropori Anteriore e Posteriore",
            "Tubo Cardiaco ad S",
            "Vescicole Ottiche",
            "Placodi Otici"
          ],
          "fetalMilestones": [
            "I neuropori anteriore (craniale) e posteriore (caudale) si chiudono completamente entro il 28° giorno dal concepimento, sigillando vescicole cerebrali e midollo spinale.",
            "Il tubo cardiaco primitivo compie il ripiegamento a S, definendo atri e ventricoli con battito cardiaco visibile all’ecografia transvaginale.",
            "Compaiono gli abbozzi degli arti superiori e inferiori insieme agli archi faringei (futura mandibola, palato e orecchio medio)."
          ],
          "maternalPhysiology": "Il flusso ematico renale aumenta del 25–30%, causando minzione frequente ancor prima che l’utero comprima la vescica.",
          "doctorCheckIn": "Finestra Ecografica di Vitalità e Datazione (Settimane 6–8): Conferma il polo embrionale intrauterino, misura la Lunghezza Vertice-Sacro (CRL ±3–5 giorni) e documenta l’attività cardiaca.",
          "clinicalPearl": "Poiché la chiusura del tubo neurale termina alla Settimana 6, i difetti del tubo neurale (spina bifida) insorgono prima della prima visita, rendendo fondamentale l’acido folico precoce."
        },
        "7": {
          "phaseLabel": "1° Trimestre — Organogenesi",
          "stageTitle": "Espansione del Telencefalo, Piastre delle Mani e Metanefro",
          "biologicalStage": "Embrione (Stadio di Carnegie 15–16)",
          "lengthMetric": "9 – 11 mm (CRL)",
          "weightMetric": "0,5 g",
          "heartRateBpm": "120 – 140 BPM",
          "keyOrgans": [
            "Emisferi Cerebrali",
            "Rene Definitivo (Metanefro)",
            "Raggi Digitali (Piastre della Mano)",
            "Abbozzi Pancreatici"
          ],
          "fetalMilestones": [
            "Il prosencefalo si divide nelle vescicole telencefaliche pari (futura corteccia cerebrale), generando ~100.000 nuovi neuroni al minuto.",
            "Le piastre delle mani si appiattiscono formando i raggi digitali; s’invaginano le vescicole del cristallino e compare il pigmento retinico.",
            "La gemma ureterica invade il mesenchima metanefrico per formare i reni definitivi (metanefro)."
          ],
          "maternalPhysiology": "Le ghiandole cervicali secernono uno spesso tappo mucoso che sigilla il canale endocervicale contro i batteri ascendenti.",
          "doctorCheckIn": "Per nausea e vomito gravidico, la terapia di prima linea ACOG è la Vitamina B6 (piridossina 10–25 mg 3 volte/die) associata a doxilamina (12,5–25 mg).",
          "clinicalPearl": "Inizia l’erniazione fisiologica dell’intestino medio: le anse intestinali in rapida crescita sporgono temporaneamente nel funicolo ombelicale fino alle Settimane 10–11."
        },
        "8": {
          "phaseLabel": "1° Trimestre — Organogenesi",
          "stageTitle": "Settazione del Cuore a 4 Camere e Dita Palmate",
          "biologicalStage": "Embrione (Stadio di Carnegie 18–20)",
          "lengthMetric": "15 – 17 mm (CRL)",
          "weightMetric": "1,1 g",
          "heartRateBpm": "145 – 165 BPM",
          "keyOrgans": [
            "Valvole Atrioventricolari",
            "Setto Interventricolare",
            "Centri di Condrificazione",
            "Padiglioni Auricolari Esterni"
          ],
          "fetalMilestones": [
            "I cuscinetti endocardici si fondono e il setto interventricolare si chiude, completando l’architettura cardiaca a 4 camere.",
            "L’apoptosi (morte cellulare programmata) modella gli spazi tra le dita palmate di mani e piedi; gomiti e ginocchia si flettono.",
            "Si formano i modelli scheletrici cartilaginei primari e iniziano i primi movimenti spontanei del tronco e degli arti."
          ],
          "maternalPhysiology": "L’utero cresce dalle dimensioni di un pugno a quelle di un grosso limone; la gittata cardiaca materna aumenta del 20%.",
          "doctorCheckIn": "Prima Visita Ostetrica (Settimane 8–10): Ecografia transvaginale per confermare vitalità e CRL, datazione della DPP, esami ematochimici prenatali (gruppo ABO/Rh, test di Coombs, emocromo, rosolia, HBsAg, HIV, sifilide, urinocoltura) e Pap test.",
          "clinicalPearl": "La Lunghezza Vertice-Sacro (CRL) misurata tra 7 e 13 settimane è il parametro più accurato per stabilire o ridatare la Data Presunta del Parto (DPP)."
        },
        "9": {
          "phaseLabel": "1° Trimestre — Stadio Embrionale Tardivo",
          "stageTitle": "Picco della Frequenza Cardiaca Embrionale, Fusione Palpebrale e Diaframma",
          "biologicalStage": "Embrione Tardivo (Stadio di Carnegie 21–22)",
          "lengthMetric": "22 – 25 mm (2.3 cm CRL)",
          "weightMetric": "2,0 g",
          "heartRateBpm": "155 – 175 BPM (Picco Fisiologico)",
          "keyOrgans": [
            "Diaframma Pleuroperitoneale",
            "Palpebre Fuse",
            "Ipofisi e Corteccia Surrenale",
            "Legamenti Vocali"
          ],
          "fetalMilestones": [
            "La frequenza cardiaca embrionale raggiunge il picco fisiologico (~165–175 BPM) mentre matura l’innervazione parasimpatica.",
            "Le membrane pleuroperitoneali si fondono con il setto trasverso completando il diaframma toracico.",
            "Le palpebre coprono gli occhi e si fondono (restando chiuse fino alle Settimane 25–26 per proteggere le cornee)."
          ],
          "maternalPhysiology": "Il picco sierico di beta-hCG (~90.000–100.000 mUI/mL) coincide spesso con l’apice della nausea gravidica tra le Settimane 9 e 10.",
          "doctorCheckIn": "Discuti con il ginecologo le opzioni di screening genetico: DNA fetale circolante (NIPT) dalla Settimana 10+0, screening del portatore ed ecografia della Translucenza Nucale.",
          "clinicalPearl": "Se il vomito severo causa perdita >5% del peso pre-gravidico, chetonuria o incapacità di trattenere liquidi per 24 ore (iperemesi gravidica), contatta il medico per idratazione EV."
        },
        "10": {
          "phaseLabel": "1° Trimestre — Transizione Embrione-Feto",
          "stageTitle": "Completamento dell’Organogenesi e Finestra per il NIPT",
          "biologicalStage": "Transizione Embrione → Feto (Stadio di Carnegie 23)",
          "lengthMetric": "31 – 35 mm (3.3 cm CRL)",
          "weightMetric": "4,0 g",
          "heartRateBpm": "150 – 170 BPM",
          "keyOrgans": [
            "Ossificazione Endocondrale",
            "Filtrazione Glomerulare dei Nefroni",
            "Gemme dei Denti Decidui",
            "Villi Coriali"
          ],
          "fetalMilestones": [
            "La fine della Settimana 10 segna il passaggio formale da Embrione a Feto: tutti i principali apparati sono formati.",
            "I reni metanefrici iniziano a produrre urina fetale diluita, che diventerà presto il componente principale del liquido amniotico.",
            "La coda embrionale regredisce completamente; si formano le unghie delle mani e le gemme dei denti da latte."
          ],
          "maternalPhysiology": "Il trofoblasto placentare inizia a subentrare al corpo luteo nella sintesi di progesterone ed estradiolo («shift luteo-placentare»).",
          "doctorCheckIn": "Si apre la finestra per il prelievo del NIPT (DNA fetale libero, Settimana 10+0): esegue lo screening per Trisomia 21 (sindrome di Down), Trisomia 18, Trisomia 13 e cromosomi sessuali con sensibilità >99% per T21.",
          "clinicalPearl": "Poiché l’organogenesi strutturale maggiore termina alla fine della Settimana 10, la suscettibilità ai principali teratogeni strutturali si riduce sensibilmente."
        },
        "11": {
          "phaseLabel": "1° Trimestre — Periodo Fetale Iniziale",
          "stageTitle": "Rientro dell’Intestino Medio, Fusione Palatina e Tappi Nasali",
          "biologicalStage": "Feto Iniziale",
          "lengthMetric": "4.1 – 4.5 cm (CRL)",
          "weightMetric": "7,5 g",
          "heartRateBpm": "145 – 165 BPM",
          "keyOrgans": [
            "Chiusura della Parete Addominale",
            "Fusione del Palato Secondario",
            "Eritropoiesi Epatica",
            "Follicoli Piliferi"
          ],
          "fetalMilestones": [
            "L’erniazione fisiologica dell’intestino medio si risolve con la rotazione intestinale di 270° in senso antiorario e il rientro completo nell’addome fetale.",
            "I processi palatini mascellari si sollevano e si fondono sulla linea mediana separando cavità orale e nasale.",
            "Le gemme dentarie di tutti i 20 denti decidui (da latte) sono già formate sotto le gengive."
          ],
          "maternalPhysiology": "Le resistenze vascolari sistemiche materne calano per effetto di progesterone e ossido nitrico, causando talvolta lievi capogiri alzandosi rapidamente.",
          "doctorCheckIn": "Finestra per l’Ecografia della Translucenza Nucale (TN, Settimane 11+0–13+6) e per la Villocentesi (CVS, Settimane 10–13) se indicata.",
          "clinicalPearl": "L’Emoglobina Fetale (HbF, alfa-2/gamma-2) ha maggiore affinità per l’ossigeno rispetto all’emoglobina adulta (HbA), favorendo lo scambio placentare."
        },
        "12": {
          "phaseLabel": "1° Trimestre — Settimana Traguardo (Translucenza Nucale)",
          "stageTitle": "Riflesso di Deglutizione, Peristalsi e Finestra per l’Aspirina a Basso Dosaggio",
          "biologicalStage": "Feto",
          "lengthMetric": "5.3 – 5.8 cm (CRL)",
          "weightMetric": "14 g (0,5 oz)",
          "heartRateBpm": "140 – 160 BPM",
          "keyOrgans": [
            "Peristalsi Gastrointestinale",
            "Ormoni Ipofisari (ACTH/TSH)",
            "Linfopoiesi Splenica",
            "Clavicole e Femori Ossificati"
          ],
          "fetalMilestones": [
            "Il feto deglutisce attivamente il liquido amniotico; la muscolatura liscia intestinale avvia la peristalsi e l’assorbimento del glucosio.",
            "Compaiono i centri di ossificazione primaria nel cranio, nelle ossa lunghe e nelle vertebre.",
            "I genitali esterni iniziano la differenziazione morfologica sotto lo stimolo del DHT (maschio) o in sua assenza (femmina)."
          ],
          "maternalPhysiology": "Il fondo uterino supera la sinfisi pubica, passando da organo pelvico a organo addominale; si riduce temporaneamente la pressione sulla vescica.",
          "doctorCheckIn": "Visita della 12ª Settimana + Prevenzione Preeclampsia: ACOG e USPSTF raccomandano di iniziare aspirina a basso dosaggio (81 mg al giorno dalla Settimana 12 fino al parto) in presenza di ≥1 fattore ad alto rischio o ≥2 fattori moderati (es. prima gravidanza, età ≥35, BMI >30).",
          "clinicalPearl": "Una volta confermato il battito cardiaco fetale a 12 settimane con screening genetico normale, il rischio statistico di aborto spontaneo scende sotto l’1–2%."
        },
        "13": {
          "phaseLabel": "1° Trimestre — Ultima Settimana del 1° Trimestre",
          "stageTitle": "Maturazione delle Corde Vocali, Dermatoglifi e Autonomia Placentare",
          "biologicalStage": "Feto",
          "lengthMetric": "6.7 – 7.4 cm (CRL)",
          "weightMetric": "25 g (0,9 oz)",
          "heartRateBpm": "140 – 160 BPM",
          "keyOrgans": [
            "Unità Feto-Placentare",
            "Impronte Digitali (Creste Dermiche)",
            "Pancreas (Secrezione di Insulina)",
            "Follicoli Ovarici Primordiali"
          ],
          "fetalMilestones": [
            "Sui polpastrelli iniziano a formarsi le creste epidermiche uniche (impronte digitali).",
            "Nei feti di sesso femminile, gli ovogoni proliferano rapidamente nelle ovaie (~2 milioni di follicoli primordiali a metà gestazione).",
            "La crescita della testa rallenta rispetto al tronco, rappresentando ora circa un terzo della Lunghezza Vertice-Sacro."
          ],
          "maternalPhysiology": "I livelli di hCG si stabilizzano e calano poiché la placenta assume piena autonomia endocrina; la nausea si attenua e torna l’energia.",
          "doctorCheckIn": "Ultima settimana utile per la Translucenza Nucale (entro 13s6g / CRL ≤84 mm). Programma un controllo odontoiatrico e igiene dentale (sicura e raccomandata).",
          "clinicalPearl": "La gengivite gravidica è frequente per l'aumentata permeabilità vascolare; l'igiene dentale professionale e l'anestesia locale con lidocaina (senza sovraccarico sistemico di adrenalina) sono sicure."
        },
        "14": {
          "phaseLabel": "2° Trimestre — Ingresso nel 2° Trimestre",
          "stageTitle": "Comparsa della Lanugine, Sintesi degli Ormoni Tiroidei ed Espressioni Facciali",
          "biologicalStage": "Feto del 2° Trimestre",
          "lengthMetric": "8.5 cm (CRL) / ~12 cm (CHL)",
          "weightMetric": "45 g (1,6 oz)",
          "heartRateBpm": "135 – 155 BPM",
          "keyOrgans": [
            "Tiroide Fetale (Tiroxina T4)",
            "Nervo Cranico VII (Facciale)",
            "Lanugine Fetale",
            "Prostata / Discesa Ovarica"
          ],
          "fetalMilestones": [
            "La tiroide fetale inizia a captare lo iodio e a sintetizzare tiroxina endogena (T4) per guidare il neurosviluppo.",
            "Il VII nervo cranico (facciale) innerva i muscoli mimici, consentendo riflessi come corrugare la fronte.",
            "Inizia a spuntare una peluria finissima (lanugine) che ancorerà la vernice caseosa protettiva alla pelle."
          ],
          "maternalPhysiology": "Benvenuta nel Secondo Trimestre («trimestre d’oro»). Torna l’appetito; la gittata cardiaca materna è superiore del 30–40% rispetto ai valori pre-gravidici.",
          "doctorCheckIn": "In caso di pregressa insufficienza cervicale o parto pretermine spontaneo <34 settimane, valutare con il medico la cervicometria seriata o il cerchiaggio profilattico (solitamente posizionato a 12–14 settimane).",
          "clinicalPearl": "Un adeguato apporto di iodio (220 mcg/die in gravidanza) è essenziale ora che la tiroide fetale diventa funzionalmente attiva alla Settimana 14."
        },
        "15": {
          "phaseLabel": "2° Trimestre — Sviluppo Scheletrico e Uditivo",
          "stageTitle": "Ossicini dell’Orecchio Medio, Movimenti Respiratori Amniotici e Finestra MSAFP",
          "biologicalStage": "Feto",
          "lengthMetric": "10.1 cm (CRL) / ~14.5 cm (CHL)",
          "weightMetric": "70 g (2,5 oz)",
          "heartRateBpm": "135 – 155 BPM",
          "keyOrgans": [
            "Martello / Incudine / Staffa",
            "Albero Tracheobronchiale",
            "Diafisi delle Ossa Lunghe",
            "Papille Gustative"
          ],
          "fetalMilestones": [
            "I tre ossicini dell’orecchio medio (martello, incudine, staffa) iniziano a ossificarsi, preparando la via uditiva trasmissiva.",
            "I movimenti respiratori fetali episodici muovono il liquido amniotico nell’albero bronchiale, stimolando lo sviluppo polmonare.",
            "L’innervazione muscolare scheletrica si rafforza; le gambe sono ora più lunghe delle braccia."
          ],
          "maternalPhysiology": "L’attività melanocitaria stimolata dagli estrogeni può causare la linea nigra addominale e il cloasma (melasma) sul viso.",
          "doctorCheckIn": "Finestra per il dosaggio dell’Alfa-Fetoproteina Sierica Materna (MSAFP, Settimane 15–20) per lo screening dei difetti aperti del tubo neurale.",
          "clinicalPearl": "Posizione nel sonno: Dalla metà del secondo trimestre, prediligi il fianco (soprattutto il decubito laterale sinistro) per evitare la compressione della vena cava inferiore."
        },
        "16": {
          "phaseLabel": "2° Trimestre — Traguardo del 4° Mese (Primi Movimenti)",
          "stageTitle": "Movimenti Oculari Saccadici, Flessione Coordinata e Primi Movimenti Fetali",
          "biologicalStage": "Feto",
          "lengthMetric": "11.6 cm (CRL) / ~16.5 cm (CHL)",
          "weightMetric": "100 g (3,5 oz)",
          "heartRateBpm": "130 – 155 BPM",
          "keyOrgans": [
            "Muscoli Estraoculari",
            "Gelatina di Wharton del Cordone",
            "Ciclo Vescicale Fetale",
            "Recettori Sensoriali Cutanei"
          ],
          "fetalMilestones": [
            "Sotto le palpebre fuse iniziano lenti movimenti oculari saccadici grazie alla maturazione dei nuclei oculomotori.",
            "Il cuore fetale pompa ~24 litri (~25 qt) di sangue al giorno attraverso il cordone ombelicale a 3 vasi (2 arterie e 1 vena avvolte nella gelatina di Wharton).",
            "La vescica fetale si riempie e si svuota ogni 30–45 minuti, mantenendo costante il volume del liquido amniotico."
          ],
          "maternalPhysiology": "Le pluripare (e chi ha una placenta posteriore) possono iniziare a percepire i primi lievi movimenti fetali tra le Settimane 16 e 20.",
          "doctorCheckIn": "Visita Ostetrica delle 16 Settimane: Pressione arteriosa, peso, esame urine, battito cardiaco fetale col Doppler e prenotazione dell’Ecografia Morfologica delle 20 settimane.",
          "clinicalPearl": "In presenza di placenta anteriore (inserita sulla parete anteriore dell'utero), essa agisce come un cuscinetto e spesso ritarda la percezione dei primi movimenti fino alle Settimane 20–22: è del tutto normale."
        },
        "17": {
          "phaseLabel": "2° Trimestre — Maturazione Adiposa e Immunitaria",
          "stageTitle": "Deposito di Tessuto Adiposo Bruno e Avvio del Trasferimento Transplacentare di IgG",
          "biologicalStage": "Feto",
          "lengthMetric": "13.0 cm (CRL) / ~18.5 cm (CHL)",
          "weightMetric": "140 g (5,0 oz)",
          "heartRateBpm": "130 – 155 BPM",
          "keyOrgans": [
            "Tessuto Adiposo Bruno (BAT)",
            "Cellule Ciliate Cocleari",
            "Ghiandole Sudoripare",
            "Recettori Placentari FcRn per IgG"
          ],
          "fetalMilestones": [
            "Il Tessuto Adiposo Bruno (BAT) inizia a depositarsi attorno a collo, sterno e reni per la termogenesi neonatale.",
            "I recettori placentari FcRn avviano il trasporto attivo degli anticorpi IgG materni nella circolazione fetale.",
            "Le cellule ciliate cocleari si allineano nell’organo del Corti; i suoni materni interni stimolano l’orecchio interno."
          ],
          "maternalPhysiology": "Lo stiramento del legamento rotondo lungo la pelvi può causare brevi fitte inguinali girandosi nel letto, tossendo o alzandosi.",
          "doctorCheckIn": "Finestra Diagnostica per l’Amniocentesi (Settimane 15–20): Proposta in caso di screening ad alto rischio o per diagnosi citogenetica definitiva.",
          "clinicalPearl": "Il dolore del legamento rotondo dura pochi secondi ed è legato al movimento. Crampi persistenti, ritmici o associati a perdite richiedono valutazione medica."
        },
        "18": {
          "phaseLabel": "2° Trimestre — Espansione Neuro-Sensoriale",
          "stageTitle": "Avvio della Mielinizzazione, Vernice Caseosa e Finestra Ecografica Morfologica",
          "biologicalStage": "Feto",
          "lengthMetric": "14.2 cm (CRL) / ~20.5 cm (CHL)",
          "weightMetric": "190 g (6,7 oz)",
          "heartRateBpm": "125 – 155 BPM",
          "keyOrgans": [
            "Mielinizzazione delle Cellule di Schwann",
            "Ghiandole Sebacee (Vernice Caseosa)",
            "Tratti di Efflusso Cardiaco",
            "Corpo Calloso"
          ],
          "fetalMilestones": [
            "Le ghiandole sebacee secernono la Vernice Caseosa, un biofilm lipidico e antimicrobico che protegge la pelle fetale dal liquido amniotico.",
            "Le cellule di Schwann e gli oligodendrociti avviano la mielinizzazione assonale per accelerare la conduzione nervosa.",
            "Le 4 camere cardiache e i tratti di efflusso sono ora chiaramente visualizzabili all'ecografia."
          ],
          "maternalPhysiology": "Nadir fisiologico della pressione arteriosa a metà gravidanza: la vasodilatazione porta la pressione al punto più basso (~5–10 mmHg sotto il basale) verso le Settimane 18–20.",
          "doctorCheckIn": "Si apre la finestra dell’Ecografia Morfologica di II Livello (Settimane 18–22), idealmente programmata tra 19s0g e 21s0g.",
          "clinicalPearl": "Durante la Morfologica viene misurata anche la Lunghezza Cervicale (normale ≥25 mm a 18–24 settimane) per valutare il rischio di parto pretermine."
        },
        "19": {
          "phaseLabel": "2° Trimestre — Mappatura Corticale Sensoriale",
          "stageTitle": "Mappatura della Corteccia Somatosensoriale e Concentrazione Tubulare Renale",
          "biologicalStage": "Feto",
          "lengthMetric": "15.3 cm (CRL) / ~22.5 cm (CHL)",
          "weightMetric": "240 g (8,5 oz)",
          "heartRateBpm": "125 – 155 BPM",
          "keyOrgans": [
            "Corteccia Somatosensoriale",
            "Anse di Henle Renali",
            "Gemme dei Denti Permanenti",
            "Ramificazione Bronchiolare"
          ],
          "fetalMilestones": [
            "Le proiezioni talamo-corticali raggiungono la sottoplacca della corteccia cerebrale, ponendo le basi per l’elaborazione uditiva, visiva e tattile.",
            "Le gemme dei denti permanenti si formano in profondità dietro quelle dei denti decidui nella mascella e mandibola.",
            "Inizia lo stadio canalicolare dello sviluppo polmonare: i bronchioli respiratori si dividono e i capillari proliferano."
          ],
          "maternalPhysiology": "Il volume ematico materno è aumentato del 30–35%; il maggiore fabbisogno di ferro richiede un apporto costante.",
          "doctorCheckIn": "Prepara le domande per la visita delle 20 settimane e l’Ecografia Morfologica (posizione placentare rispetto al collo uterino, funicolo a 3 vasi).",
          "clinicalPearl": "Se a 19–20 settimane viene segnalata una placenta «bassa», oltre il 90% risale spontaneamente entro la Settimana 32 con l’allungamento del segmento uterino inferiore."
        },
        "20": {
          "phaseLabel": "2° Trimestre — Traguardo di Metà Gravidanza",
          "stageTitle": "Traguardo di Metà Gravidanza: Ecografia Morfologica di II Livello e Fondo Uterino all’Ombelico",
          "biologicalStage": "Feto di Metà Gestazione",
          "lengthMetric": "25.5 cm (10.0 in Lunghezza Vertice-Tallone)",
          "weightMetric": "300 g (10,6 oz)",
          "heartRateBpm": "120 – 155 BPM",
          "keyOrgans": [
            "Scansione 4 Camere e Tratti di Efflusso",
            "Fossa Posteriore / Cervelletto",
            "Accumulo di Meconio",
            "Strato Corneo Epidermico"
          ],
          "fetalMilestones": [
            "Dalla Settimana 20 in poi, gli ostetrici misurano la lunghezza totale vertice-tallone (CHL) anziché la lunghezza vertice-sacro poiché le gambe del feto si distendono.",
            "Il meconio sterile (cellule epiteliali desquamate, lanugine, pigmenti biliari e liquido amniotico) si accumula nel colon fetale.",
            "Emergono cicli sonno-veglia: il feto alterna periodi di 20–40 minuti di movimento attivo e riposo."
          ],
          "maternalPhysiology": "Il fondo uterino raggiunge il livello dell’ombelico materno. Dalla Settimana 20 alla 36, l’altezza sinfisi-fondo in centimetri corrisponde circa alle settimane di gestazione (±2 cm).",
          "doctorCheckIn": "Visita delle 20 Settimane ed Ecografia Morfologica di II Livello (Settimane 18–22): Studio anatomico completo di encefalo, profilo/labbra, cuore a 4 camere ed efflussi, stomaco, reni, vescica, colonna, funicolo a 3 vasi, placenta e cervice.",
          "clinicalPearl": "Perché la pressione dopo la Settimana 20 è fondamentale: L’ipertensione di nuova insorgenza (PA ≥140/90) a partire dalla 20ª settimana è la soglia diagnostica per Ipertensione Gestazionale o Preeclampsia."
        },
        "21": {
          "phaseLabel": "2° Trimestre — Transizione Ematopoietica Midollare",
          "stageTitle": "Ematopoiesi del Midollo Osseo e Maturazione degli Enzimi Digestivi",
          "biologicalStage": "Feto",
          "lengthMetric": "26.7 cm (10.5 in CHL)",
          "weightMetric": "360 g (12,7 oz)",
          "heartRateBpm": "120 – 155 BPM",
          "keyOrgans": [
            "Eritropoiesi del Midollo Osseo",
            "Villi dell’Intestino Tenue",
            "Polpa Rossa Splenica",
            "Labirinto Vestibolare"
          ],
          "fetalMilestones": [
            "Il tratto digerente assorbe acqua e zuccheri dal liquido amniotico deglutito (~24 L / ~25 qt filtrati nel corso della gravidanza).",
            "I microvilli intestinali esprimono gli enzimi disaccaridasi (lattasi, saccarasi), assorbendo acqua ed elettroliti dal liquido amniotico.",
            "I canali semicircolari vestibolari dell’orecchio interno percepiscono il movimento materno, cullando il feto quando cammini."
          ],
          "maternalPhysiology": "L’ormone relaxina ammorbidisce la sinfisi pubica e le articolazioni sacroiliache per preparare il bacino, causando talvolta lieve indolenzimento pelvico.",
          "doctorCheckIn": "Se durante la Morfologica delle 20 settimane alcune strutture erano in ombra per la posizione fetale, si programma un breve completamento ecografico dopo 2–4 settimane.",
          "clinicalPearl": "Perché il bambino sembra più attivo di notte: Camminare durante il giorno lo culla nel sonno; quando ti sdrai a riposo la sera, la veglia fetale raggiunge il picco."
        },
        "22": {
          "phaseLabel": "2° Trimestre — Integrazione Uditiva e Tattile",
          "stageTitle": "Riconoscimento Uditivo della Voce, Sopracciglia e Riflesso di Prensione",
          "biologicalStage": "Feto",
          "lengthMetric": "27.8 cm (10.9 in CHL)",
          "weightMetric": "430 g (15,2 oz)",
          "heartRateBpm": "120 – 155 BPM",
          "keyOrgans": [
            "Via Coclea-Corteccia Uditiva",
            "Riflesso di Prensione Palmare",
            "Dotti Lacrimali",
            "Primordi dei Dotti Alveolari"
          ],
          "fetalMilestones": [
            "Maturano le risposte uditive del tronco encefalico; il feto ascolta e inizia a riconoscere la cadenza della voce materna.",
            "Si sviluppa il riflesso di prensione palmare: il feto afferra spesso il cordone ombelicale (protetto dalla gelatina di Wharton).",
            "Sopracciglia e capelli fini sono visibili, anche se il pigmento melanico non è ancora completamente depositato."
          ],
          "maternalPhysiology": "Emodiluizione fisiologica: il volume plasmatico cresce più rapidamente (~45–50%) della massa eritrocitaria (~25–30%), riducendo fisiologicamente l’emoglobina.",
          "doctorCheckIn": "Se indicato (FIVET, diabete pregravidico o familiarità per cardiopatie congenite), tra le Settimane 20–22 si esegue un’Ecocardiografia Fetale.",
          "clinicalPearl": "Nella seconda metà della gravidanza possono comparire contrazioni di Braxton Hicks (indurimenti uterini indolori e irregolari <30 secondi) che si risolvono con riposo e idratazione."
        },
        "23": {
          "phaseLabel": "2° Trimestre — Soglia Polmonare Perivitale",
          "stageTitle": "Pneumociti di Tipo II e Sintesi Iniziale delle Lipoproteine del Surfattante",
          "biologicalStage": "Feto (Finestra di Vitalità Neonatale)",
          "lengthMetric": "28.9 cm (11.4 in CHL)",
          "weightMetric": "500 g (1,1 lb)",
          "heartRateBpm": "120 – 155 BPM",
          "keyOrgans": [
            "Pneumociti Alveolari di Tipo II",
            "Letto Capillare Polmonare",
            "Sonno REM",
            "Isole di Langerhans"
          ],
          "fetalMilestones": [
            "I pneumociti cuboidali di Tipo II si differenziano nelle vie aeree distali e iniziano a sintetizzare i corpi lamellari del surfactante.",
            "I capillari polmonari si accostano all’epitelio respiratorio, formando la barriera emato-aerea primitiva.",
            "Iniziano i cicli di sonno REM (Rapid Eye Movement), fondamentali per lo sviluppo dei circuiti neurali corticali."
          ],
          "maternalPhysiology": "Lo spostamento verso l’alto dello stomaco e il rilasciamento dello sfintere esofageo inferiore da progesterone possono causare reflusso (pirosi).",
          "doctorCheckIn": "Riconosci i segni di Travaglio Pretermine: pressione pelvica o contrazioni regolari (>4–6 all’ora), mal di schiena basso continuo o perdite vaginali anomale.",
          "clinicalPearl": "Le Settimane 23–24 rappresentano la soglia di vitalità neonatale nelle TIN di III/IV livello, dove la profilassi corticosteroidea (betametasone) accelera la maturazione polmonare."
        },
        "24": {
          "phaseLabel": "2° Trimestre — Vitalità Neonatale e Screening Glicemico",
          "stageTitle": "Transizione Polmonare Sacculare, Traguardo di Vitalità e Apertura Screening Diabete (GCT)",
          "biologicalStage": "Feto",
          "lengthMetric": "30.0 cm (11.8 in CHL)",
          "weightMetric": "600 g (1,32 lb)",
          "heartRateBpm": "120 – 155 BPM",
          "keyOrgans": [
            "Sacculi Terminali (Polmoni)",
            "Sistema Vestibolare dell’Orecchio Interno",
            "Cellule Beta Pancreatiche Fetali",
            "Capillari Cutanei"
          ],
          "fetalMilestones": [
            "I polmoni passano dallo stadio canalicolare a quello sacculare: all’estremità dei bronchioli respiratori si formano i sacculi terminali.",
            "L’apparato vestibolare dell’orecchio interno è strutturalmente maturo, fornendo al feto il senso dell’orientamento spaziale.",
            "I letti capillari sottocutanei si riempiono di sangue, rendendo la cute fetale rosea."
          ],
          "maternalPhysiology": "La secrezione placentare di lattogeno placentare umano (hPL) e cortisolo aumenta, creando una fisiologica insulino-resistenza materna per inviare glucosio al feto.",
          "doctorCheckIn": "Visita della 24ª Settimana + Apertura Finestra Screening Diabete Gestazionale (Settimane 24–28): Prescrizione del test di carico orale di glucosio a 1 ora con 50 g (GCT) ed emocromo/test di Coombs del 3° trimestre.",
          "clinicalPearl": "Perché il Diabete Gestazionale (GDM) si ricerca a 24–28 settimane: Gli ormoni contro-insulari placentari (hPL) aumentano nettamente alla 24ª settimana, smascherando un'insufficienza beta-pancreatica nel ~6–9% delle gravidanze."
        },
        "25": {
          "phaseLabel": "2° Trimestre — Vascolarizzazione Polmonare e Pervietà Nasale",
          "stageTitle": "Dissoluzione dei Tappi Nasali, Arborizzazione Capillare e Ossificazione Spinale",
          "biologicalStage": "Feto",
          "lengthMetric": "34.6 cm (13.6 in CHL)",
          "weightMetric": "660 g (1,45 lb)",
          "heartRateBpm": "120 – 155 BPM",
          "keyOrgans": [
            "Narici Pervie",
            "Surfactante Polmonare (SP-B/SP-C)",
            "Ossificazione dell’Arco Vertebrale",
            "Circuiti di Dominanza Manuale"
          ],
          "fetalMilestones": [
            "I tappi epiteliali nelle narici si dissolvono, aprendo le cavità nasali per i movimenti respiratori nel liquido amniotico.",
            "Le proteine del surfactante B e C (SP-B, SP-C) aumentano nei pneumociti di Tipo II.",
            "Le strutture della colonna vertebrale (33 anelli, 150 articolazioni, 1.000 legamenti) si rafforzano."
          ],
          "maternalPhysiology": "La pressione venosa agli arti inferiori aumenta, causando talvolta crampi notturni ai polpacci o lieve gonfiore alle caviglie a fine giornata.",
          "doctorCheckIn": "Programmare il test di screening del glucosio a 1 ora (50 g) o la curva da carico tra la 24ª e la 28ª settimana. Non è necessario il digiuno per il test di screening a 1 ora salvo diversa indicazione.",
          "clinicalPearl": "Se il test di screening a 1 ora risulta ≥135–140 mg/dL, non allarmarsi: è un test di screening, non una diagnosi. Circa il 75–80% delle pazienti che eseguono la curva diagnostica a 3 ore con 100 g a digiuno risulta normale."
        },
        "26": {
          "phaseLabel": "2° Trimestre — Risveglio Visivo e Apertura Palpebrale",
          "stageTitle": "Separazione delle Palpebre, Riflesso di Ammiccamento-Trasussalto e Bastoncelli Retinici",
          "biologicalStage": "Feto",
          "lengthMetric": "35.6 cm (14.0 in CHL)",
          "weightMetric": "760 g (1,68 lb)",
          "heartRateBpm": "120 – 155 BPM",
          "keyOrgans": [
            "Fotorecettori Retinici",
            "Mielinizzazione del Nervo Ottico",
            "Riflesso di Trasaltamento Vibroacustico",
            "Discesa Inguinale Testicolare"
          ],
          "fetalMilestones": [
            "Le palpebre fuse si separano e si aprono per la prima volta dalla Settimana 9; il feto sbatte le palpebre in risposta a luci o suoni intensi.",
            "I bastoncelli e i coni retinici si differenziano nella retina posteriore.",
            "Nei feti maschi, il gubernaculum guida i testicoli nel canale inguinale verso lo scroto."
          ],
          "maternalPhysiology": "La circonferenza della gabbia toracica si espande di 5–7 cm mentre il diaframma si solleva di ~4 cm; il volume corrente aumenta del 30–40%.",
          "doctorCheckIn": "Controlla con il ginecologo i valori di emoglobina/ematocrito e ferritina per escludere anemia sideropenica (Hb <10,5 g/dL nel 2° tri o <11,0 g/dL nel 3° tri).",
          "clinicalPearl": "Assumere il ferro orale con Vitamina C (spremuta d’arancia) a stomaco vuoto o a giorni alterni migliora l’assorbimento duodenale e riduce la stipsi."
        },
        "27": {
          "phaseLabel": "2° Trimestre — Ultima Settimana del 2° Trimestre",
          "stageTitle": "Vie Talamocorticali del Dolore, Singhiozzo Fetale e Apertura Finestra Vaccino dTpa (Tdap)",
          "biologicalStage": "Feto",
          "lengthMetric": "36.6 cm (14.4 in CHL)",
          "weightMetric": "875 g (1,93 lb)",
          "heartRateBpm": "120 – 155 BPM",
          "keyOrgans": [
            "Inizio delle Circonvoluzioni Cerebrali",
            "Nervo Frenico / Diaframma",
            "Milza e Timo Fetale",
            "Grasso Bianco Sottocutaneo"
          ],
          "fetalMilestones": [
            "Gli spasmi diaframmatici ritmici (singhiozzo fetale) diventano frequenti e percepibili come piccoli colpetti regolari ogni pochi secondi.",
            "Gli emisferi cerebrali iniziano a formare i solchi e le circonvoluzioni primarie per ampliare la superficie corticale.",
            "I linfociti T maturano nel timo fetale."
          ],
          "maternalPhysiology": "Alla fine del secondo trimestre, il fondo uterino si trova ~7 cm sopra l’ombelico; la ritenzione idrica può dare un lieve formicolio al tunnel carpale.",
          "doctorCheckIn": "Apertura Finestra Vaccino dTpa (Settimane 27–36): CDC e ACOG raccomandano il vaccino dTpa in OGNI gravidanza tra 27 e 36 settimane (idealmente a 27–30 settimane) per massimizzare il trasferimento di anticorpi IgG anti-pertosse al neonato.",
          "clinicalPearl": "Il singhiozzo fetale è un segno normale di maturazione del nervo frenico e del centro respiratorio; si avverte come un battito ritmico per 5–15 minuti."
        },
        "28": {
          "phaseLabel": "3° Trimestre — Inizio e Passaggio a Visite Bisettimanali",
          "stageTitle": "Ingresso nel 3° Trimestre, Profilassi con RhoGAM e Conteggio Giornaliero dei Movimenti",
          "biologicalStage": "Feto del 3° Trimestre",
          "lengthMetric": "37.6 cm (14.8 in CHL)",
          "weightMetric": "1.005 g (2,22 lb — Traguardo 1 kg!)",
          "heartRateBpm": "115 – 155 BPM",
          "keyOrgans": [
            "Riflesso Fotomotore Pupillare",
            "Sintesi di Lecitina del Surfactante",
            "Folia Cerebellari",
            "Espressione dell’Antigene Rh(D)"
          ],
          "fetalMilestones": [
            "Il feto supera il traguardo di 1 chilogrammo (2,2 lb); il tessuto adiposo bianco sottocutaneo raggiunge il ~2–3% del peso corporeo.",
            "Le pupille si contraggono e dilatano alla luce; i cicli del sonno mostrano pattern distinti REM e non-REM.",
            "La produzione di surfactante polmonare accelera, innalzando il rapporto lecitina/sfingomielina (L/S)."
          ],
          "maternalPhysiology": "Benvenuta nel Terzo Trimestre. Il flusso ematico uterino raggiunge ~500–700 mL/minuto (~80% diretto alla placenta).",
          "doctorCheckIn": "Visita Ostetrica della 28ª Settimana (Passaggio a controlli ogni 2 settimane): Valutare il test del glucosio a 1 ora, somministrare il vaccino dTpa, somministrare Immunoglobuline Anti-D (RhoGAM 300 mcg IM) se madre Rh-negativa e iniziare il conteggio quotidiano dei movimenti fetali.",
          "clinicalPearl": "Protocollo ACOG per il Conteggio dei Movimenti Fetali (Dalla 28ª Settimana): Una volta al giorno (dopo un pasto), sdraiarsi sul fianco e cronometrare il tempo necessario per avvertire 10 movimenti distinti (calci, capriole — non il singhiozzo). Il tempo normale è <2 ore (spesso <30 min). Se <10 movimenti in 2 ore, contattare subito il reparto ostetrico."
        },
        "29": {
          "phaseLabel": "3° Trimestre — Mineralizzazione Scheletrica Accelerata",
          "stageTitle": "Rapido Accumulo di Calcio e Termoregolazione Ipotalamica",
          "biologicalStage": "Feto",
          "lengthMetric": "38.6 cm (15.2 in CHL)",
          "weightMetric": "1.150 g (2,54 lb)",
          "heartRateBpm": "115 – 155 BPM",
          "keyOrgans": [
            "Accrescimento di Calcio Osteoblastico",
            "Nucleo Preottico Ipotalamico",
            "Sintesi Surrenalica di DHEA-S",
            "Settazione Alveolare"
          ],
          "fetalMilestones": [
            "La placenta pompa attivamente ~250–300 mg di calcio al giorno dalla circolazione materna allo scheletro fetale.",
            "L’ipotalamo matura i circuiti centrali della termoregolazione.",
            "I surreni fetali si ingrandiscono e secernono DHEA-S, convertito in estriolo dalla placenta."
          ],
          "maternalPhysiology": "L’aumento del peso fetale e la lordosi lombare spostano il baricentro in avanti; calzature adeguate ed esercizi pelvici alleviano il carico lombosacrale.",
          "doctorCheckIn": "Non è prevista una visita standard questa settimana (cadenza quindicinale: prossima visita alla Settimana 30). Monitorare pressione e movimenti fetali ogni giorno.",
          "clinicalPearl": "Nel terzo trimestre il feto accumula l’80% delle riserve totali di calcio osseo e ferro: assicura 1.000 mg/die di calcio e un apporto costante di ferro."
        },
        "30": {
          "phaseLabel": "3° Trimestre — Ripiegamento Corticale e Dominio Midollare",
          "stageTitle": "Approfondimento delle Circonvoluzioni Cerebrali, Dominanza Midollare e Picco Amniotico",
          "biologicalStage": "Feto",
          "lengthMetric": "39.9 cm (15.7 in CHL)",
          "weightMetric": "1.320 g (2,91 lb)",
          "heartRateBpm": "115 – 155 BPM",
          "keyOrgans": [
            "Solchi Cerebrali Secondari e Terziari",
            "Midollo Osseo Medullare",
            "Cicli Respiratori Diaframmatici",
            "Inizio della Caduta della Lanugine"
          ],
          "fetalMilestones": [
            "La corteccia cerebrale subisce una rapida girificazione, formando profondi solchi secondari a supporto delle funzioni cognitive.",
            "Il midollo osseo è ora il principale organo ematopoietico; i globuli rossi fetali hanno un’emivita di ~60–90 giorni.",
            "Con l’ispessimento del grasso sottocutaneo, la lanugine inizia a staccarsi nel liquido amniotico."
          ],
          "maternalPhysiology": "Il volume del liquido amniotico si avvicina al picco fisiologico (~800–1.000 mL tra le Settimane 30 e 34) prima di ridursi gradualmente a termine.",
          "doctorCheckIn": "Visita Quindicinale delle 30 Settimane: Pressione arteriosa, esame urine, misurazione sinfisi-fondo (~28–32 cm), battito fetale e verifica dei movimenti fetali.",
          "clinicalPearl": "Se la misura sinfisi-fondo si discosta di >3 cm rispetto alla settimana gestazionale, il ginecologo prescriverà un’ecografia di accrescimento e flussimetria."
        },
        "31": {
          "phaseLabel": "3° Trimestre — Sinaptogenesi e Aumento del Tessuto Adiposo",
          "stageTitle": "Trilioni di Connessioni Sinaptiche e Accumulo Cerebrale di DHA",
          "biologicalStage": "Feto",
          "lengthMetric": "41.1 cm (16.2 in CHL)",
          "weightMetric": "1.500 g (3,31 lb)",
          "heartRateBpm": "115 – 155 BPM",
          "keyOrgans": [
            "Circuito Retina-Corteccia Visiva",
            "Membrane Fosfolipidiche DHA",
            "Filtrazione Glomerulare Renale",
            "Coordinazione Suzione-Deglutizione"
          ],
          "fetalMilestones": [
            "Il cervello fetale accumula ~50–70 mg/die di omega-3 DHA nelle membrane neuronali e nei fotorecettori retinici.",
            "Tutti e cinque i sensi (vista, udito, gusto, olfatto tramite il liquido amniotico e tatto) sono funzionalmente attivi.",
            "Il feto acquisisce circa 150–200 grammi (0,35–0,5 lb) a settimana da ora fino al termine."
          ],
          "maternalPhysiology": "Il colostro (pre-latte ricco di immunoglobuline A) viene sintetizzato negli alveoli mammari; possono fuoriuscire piccole gocce.",
          "doctorCheckIn": "In caso di gravidanza ad alto rischio (età ≥35–40 anni, diabete gestazionale in terapia medica, ipertensione cronica o gemellarità), il monitoraggio cardiotocografico (NST) o profilo biofisico (BPP) settimanale inizia solitamente alla 32ª settimana.",
          "clinicalPearl": "Apprendimento dei sapori in utero: I composti aromatici della dieta materna passano nel liquido amniotico e vengono percepiti dal feto."
        },
        "32": {
          "phaseLabel": "3° Trimestre — Posizionamento Cefalico e Protezione VRS",
          "stageTitle": "Versione Cefalica, Unghie delle Mani Complete e Finestra per il Vaccino VRS",
          "biologicalStage": "Feto (Fase di Posizionamento Cefalico)",
          "lengthMetric": "42.4 cm (16.7 in CHL)",
          "weightMetric": "1.700 g (3,75 lb)",
          "heartRateBpm": "110 – 155 BPM",
          "keyOrgans": [
            "Presentazione Cefalica",
            "Fosfatidilglicerolo del Surfactante",
            "Letto Ungueale Completo",
            "Picco di Trasferimento IgG Materno-Fetale"
          ],
          "fetalMilestones": [
            "Circa l’85–90% dei feti ruota in presentazione cefalica (a testa in giù) per adattarsi alla cavità uterina.",
            "Le unghie delle mani raggiungono la punta delle dita; la cute diventa liscia mentre il grasso sottocutaneo tocca il ~7–8% del peso.",
            "I movimenti respiratori fetali occupano il 30–40% del sonno attivo, parametro chiave del Profilo Biofisico."
          ],
          "maternalPhysiology": "Il volume plasmatico materno raggiunge la massima espansione (+45–50% rispetto al pre-gravidico).",
          "doctorCheckIn": "Visita della 32ª Settimana + Finestra Vaccino Materno VRS (Settimane 32–36): CDC e ACOG raccomandano 1 dose di vaccino materno contro il VRS (Abrysvo) tra 32w0d e 36w6d durante la stagione epidemica per proteggere il neonato dalla bronchiolite grave.",
          "clinicalPearl": "Perché i movimenti cambiano a 32+ settimane: Con meno spazio libero, i calci ampi diventano rotolamenti e stiramenti decisi, ma la frequenza totale NON deve diminuire!"
        },
        "33": {
          "phaseLabel": "3° Trimestre — Immunità Passiva IgG e Plasticità Cranica",
          "stageTitle": "Fontanelle Craniche, Picco di Trasferimento di IgG e Coordinazione della Suzione",
          "biologicalStage": "Feto",
          "lengthMetric": "43.7 cm (17.2 in CHL)",
          "weightMetric": "1.920 g (4,23 lb)",
          "heartRateBpm": "110 – 155 BPM",
          "keyOrgans": [
            "Fontanelle Anteriore e Posteriore",
            "Triade Suzione-Deglutizione-Respirazione",
            "Nefrogenesi Quasi Completa",
            "Trasporto Placentare di IgG"
          ],
          "fetalMilestones": [
            "Mentre le ossa lunghe sono ben calcificate, le ossa craniche restano separate da suture fibrose e fontanelle per modellarsi nel canale del parto.",
            "I livelli fetali di anticorpi IgG transplacentari raggiungono e presto supereranno quelli materni.",
            "I nuclei del tronco encefalico iniziano a coordinare la triade suzione-deglutizione-respirazione."
          ],
          "maternalPhysiology": "Il fondo uterino si avvicina al processo xifoideo; pasti piccoli e frequenti e sollevare la testata del letto riducono il reflusso.",
          "doctorCheckIn": "Individua il Pediatra di riferimento, verifica le procedure per la registrazione del neonato e installa l’ovetto auto in senso contrario di marcia.",
          "clinicalPearl": "Le accelerazioni del battito cardiaco fetale (aumenti ≥15 BPM per ≥15 secondi col movimento) indicano un’ottima ossigenazione fetale."
        },
        "34": {
          "phaseLabel": "3° Trimestre — Soglia Pretermine Tardivo e Nefrogenesi Completa",
          "stageTitle": "Completamento della Nefrogenesi Permanente e Picco di Surfattante",
          "biologicalStage": "Feto in Soglia Pretermine Tardivo",
          "lengthMetric": "45.0 cm (17.7 in CHL)",
          "weightMetric": "2.150 g (4,74 lb)",
          "heartRateBpm": "110 – 155 BPM",
          "keyOrgans": [
            "1 Milione di Nefroni per Rene",
            "Surfactante Fosfatidilcolina",
            "Ispessimento della Vernice Caseosa",
            "Discesa Testicolare nello Scroto"
          ],
          "fetalMilestones": [
            "La nefrogenesi umana (formazione di nuovi nefroni) si completa definitivamente tra le Settimane 34 e 36 con ~1 milione di nefroni per rene.",
            "La secrezione di surfactante polmonare aumenta nettamente; i nati a ≥34 settimane hanno una sopravvivenza >98%.",
            "Lo strato di vernice caseosa è denso e cremoso; le unghie di mani e piedi sono ben formate."
          ],
          "maternalPhysiology": "Il gonfiore serale alle caviglie è fisiologico, mentre un edema improvviso a volto o mani con cefalea o disturbi visivi richiede il controllo immediato della pressione.",
          "doctorCheckIn": "Visita Quindicinale delle 34 Settimane: Pressione arteriosa, altezza sinfisi-fondo, battito fetale, manovre di Leopold per valutare la presentazione e discussione del piano del parto.",
          "clinicalPearl": "La Settimana 34 segna un traguardo clinico importante: dopo 34s0g i tocolitici per frenare il travaglio sono raramente necessari grazie alla maturità polmonare raggiunta."
        },
        "35": {
          "phaseLabel": "3° Trimestre — Maturità Epatica e Riserva Metabolica",
          "stageTitle": "Riserva Epatica di Glicogeno, Scorte di Ferro e Rapido Aumento Adiposo",
          "biologicalStage": "Feto",
          "lengthMetric": "46.2 cm (18.2 in CHL)",
          "weightMetric": "2.385 g (5,25 lb)",
          "heartRateBpm": "110 – 150 BPM",
          "keyOrgans": [
            "Riserve Epatiche di Glicogeno e Ferro",
            "Coniugazione della Bilirubina (UGT1A1)",
            "Grasso Sottocutaneo (10% Peso)",
            "Riflesso di Suzione Coordinato"
          ],
          "fetalMilestones": [
            "Il fegato fetale accumula rapidamente glicogeno (per mantenere la glicemia dopo il clampaggio del cordone) e ferritina.",
            "Reni e fegato sono strutturalmente completi e maturano gli enzimi metabolici come la UGT1A1 per la bilirubina.",
            "Il feto accumula ~30 grammi (1 oz) di tessuto adiposo ogni singolo giorno."
          ],
          "maternalPhysiology": "La pressione pelvica aumenta mentre il segmento uterino inferiore si assottiglia; torna la minzione frequente con l’impegno della testa fetale.",
          "doctorCheckIn": "Dalla prossima settimana (Settimana 36) iniziano i controlli SETTIMANALI, con il tampone per lo Streptococco di Gruppo B (SGB) e la verifica della presentazione.",
          "clinicalPearl": "Prepara la valigia per il parto entro la Settimana 35 (documenti, cartella clinica della gravidanza, piano del parto, reggiseni da allattamento, caricabatterie e corredino)."
        },
        "36": {
          "phaseLabel": "3° Trimestre — Visite Settimanali e Tampone SGB",
          "stageTitle": "Stadio Polmonare Alveolare, Tampone SGB (GBS) e Impegno della Testa Fetale",
          "biologicalStage": "Feto Pretermine Tardivo (Passaggio a Visite Settimanali)",
          "lengthMetric": "47.4 cm (18.7 in CHL)",
          "weightMetric": "2.620 g (5,78 lb)",
          "heartRateBpm": "110 – 150 BPM",
          "keyOrgans": [
            "Alveoli Polmonari Veri",
            "Distacco di Vernice nel Liquido Amniotico",
            "Impegno Cefalico nella Pelvi",
            "Colon Pieno di Meconio"
          ],
          "fetalMilestones": [
            "I polmoni entrano nello Stadio Alveolare finale (dalla Settimana 36 alla prima infanzia), formando veri alveoli pronti per gli scambi gassosi.",
            "Vernice caseosa e lanugine desquamate nel liquido amniotico vengono deglutite dal feto formando il meconio.",
            "Nelle prime gravidanze la testa fetale inizia spesso a impegnarsi nello stretto superiore del bacino."
          ],
          "maternalPhysiology": "Con l’impegno della testa fetale si riduce la pressione sottocostale (si respira meglio), mentre aumenta il peso sul pavimento pelvico.",
          "doctorCheckIn": "Visita delle 36 Settimane (Inizio Visite Settimanali!): Tampone vagino-rettale per lo Streptococco di Gruppo B (SGB, tra 36s0g e 37s6g) e verifica della presentazione cefalica.",
          "clinicalPearl": "Perché eseguire il tampone per Streptococco di gruppo B (SGB) a 36–37 settimane: circa il 25% delle donne sane è portatrice asintomatica. Se positivo, la profilassi antibiotica endovenosa in travaglio riduce il rischio di sepsi neonatale di oltre l'80%. Inoltre, se il feto è podalico a 36 settimane, si discute il rivolgimento per manovre esterne (ECV) per la 37ª settimana."
        },
        "37": {
          "phaseLabel": "3° Trimestre — Termine Precoce (37s0g–38s6g)",
          "stageTitle": "Traguardo del Termine Precoce, Finestra VCE e Regola del Travaglio (5-1-1)",
          "biologicalStage": "Feto a Termine Precoce",
          "lengthMetric": "48.6 cm (19.1 in CHL)",
          "weightMetric": "2.860 g (6,30 lb)",
          "heartRateBpm": "110 – 150 BPM",
          "keyOrgans": [
            "Rapporto L/S del Surfactante Maturo ≥2:1",
            "Tratti Corticospinali Mielinizzati",
            "Pervietà del Dotto Arterioso",
            "Cuscinetti Adiposi Buccali di Suzione"
          ],
          "fetalMilestones": [
            "A 37s0g la gravidanza entra nel «Termine Precoce» (ACOG definisce Termine Precoce 37s0g–38s6g e Termine Completo 39s0g–40s6g).",
            "I cuscinetti adiposi buccali riempiono le guance, garantendo stabilità meccanica per la suzione al seno o al biberon.",
            "Il picco di cortisolo surrenalico fetale attiva i canali di riassorbimento del liquido polmonare (ENaC) per la nascita."
          ],
          "maternalPhysiology": "La maturazione cervicale inizia silenziosamente: le fibre di collagene si rimodellano ammorbidendo il collo dell’utero.",
          "doctorCheckIn": "Visita Settimanale della 37ª Settimana: Controllo esito tampone SGB, pressione arteriosa, battito cardiaco fetale e ripasso della regola del travaglio «5-1-1 / 4-1-1», rottura delle membrane e quando recarsi in ospedale.",
          "clinicalPearl": "Perché l’ACOG sconsiglia il parto elettivo prima di 39s0g senza indicazione medica: Tra le Settimane 37 e 39 il cervello fetale cresce del ~30% in peso."
        },
        "38": {
          "phaseLabel": "3° Trimestre — Termine Precoce (38 Settimane)",
          "stageTitle": "Picco di Fosfatidilglicerolo del Surfattante, Corde Vocali e Riflessi",
          "biologicalStage": "Feto a Termine Precoce",
          "lengthMetric": "49.8 cm (19.6 in CHL)",
          "weightMetric": "3.080 g (6,79 lb)",
          "heartRateBpm": "110 – 150 BPM",
          "keyOrgans": [
            "Fosfatidilglicerolo (PG) Positivo",
            "Shunt Cardiaci Fetali (Forame Ovale)",
            "Ghiandole Lacrimali e Salivari",
            "15% di Grasso Corporeo"
          ],
          "fetalMilestones": [
            "La presenza di fosfatidilglicerolo (PG) nel liquido amniotico conferma la completa maturità biochimica polmonare.",
            "Il grasso corporeo costituisce ora il ~15% del peso fetale totale, garantendo la termoregolazione autonoma dopo la nascita.",
            "Corde vocali, riflessi neonatali (Moro, ricerca, suzione, prensione) e organi di senso sono pronti per la vita extrauterina."
          ],
          "maternalPhysiology": "La perdita del tappo mucoso e contrazioni prodromiche irregolari possono verificarsi giorni prima del travaglio attivo.",
          "doctorCheckIn": "Visita Settimanale delle 38 Settimane: Pressione arteriosa, esame urine, battito fetale, altezza sinfisi-fondo e colloquio su puerperio e allattamento.",
          "clinicalPearl": "Travaglio Vero vs. Braxton Hicks: Le contrazioni di Braxton Hicks sono irregolari e cessano col riposo. Le contrazioni del travaglio vero diventano progressivamente più lunghe, intense e ravvicinate."
        },
        "39": {
          "phaseLabel": "3° Trimestre — Termine Completo (39s0g–40s6g)",
          "stageTitle": "Traguardo del Termine Completo, Indice di Bishop e Studio ARRIVE",
          "biologicalStage": "Feto a Termine Completo",
          "lengthMetric": "50.7 cm (20.0 in CHL)",
          "weightMetric": "3.290 g (7,25 lb)",
          "heartRateBpm": "110 – 150 BPM",
          "keyOrgans": [
            "Corteccia Cerebrale a Termine",
            "Rinnovamento Epidermico",
            "Segnalazione Placentare di Ossitocina",
            "Enzimi Epatici Maturi"
          ],
          "fetalMilestones": [
            "Congratulazioni: a 39s0g il tuo bambino ha raggiunto ufficialmente il «TERMINE COMPLETO» secondo le linee guida ACOG e SMFM!",
            "I polmoni fetali secernono proteine del surfactante nel liquido amniotico, attivando i recettori uterini dell’ossitocina che avviano il travaglio spontaneo.",
            "Un nuovo strato epidermico sostituisce le cellule desquamate; la vernice caseosa resta soprattutto nelle pieghe cutanee."
          ],
          "maternalPhysiology": "L’appianamento cervicale (0–100%) e la dilatazione (0–10 cm) progrediscono prima e durante il primo stadio del travaglio.",
          "doctorCheckIn": "Visita Settimanale delle 39 Settimane: Valutazione cervicale opzionale (indice di Bishop), scollamento delle membrane opzionale o colloquio sull’induzione a 39 settimane secondo lo studio ARRIVE.",
          "clinicalPearl": "Studio ARRIVE (NEJM 2018): Nelle nullipare a basso rischio, l'induzione elettiva del travaglio tra 39w0d e 39w4d ha mostrato un tasso di taglio cesareo leggermente inferiore (18,6% vs 22,2%) e minor rischio di ipertensione gestazionale rispetto alla condotta di attesa, rendendo sia l'attesa spontanea sia l'induzione a 39 settimane scelte sicure."
        },
        "40": {
          "phaseLabel": "3° Trimestre — Data Presunta del Parto (DPP / 40 Settimane)",
          "stageTitle": "Data Presunta del Parto (40w0d) e Prontezza alla Transizione Cardopolmonare",
          "biologicalStage": "Feto a Termine Completo",
          "lengthMetric": "51.2 cm (20.2 in CHL)",
          "weightMetric": "3.460 g (7,63 lb)",
          "heartRateBpm": "110 – 150 BPM",
          "keyOrgans": [
            "Forame Ovale e Dotto Arterioso Pronti alla Chiusura",
            "300 Centri di Ossificazione",
            "Immunità Passiva Materna IgG",
            "Suture Craniche per il Modellamento"
          ],
          "fetalMilestones": [
            "Alla nascita, il primo vagito espande i polmoni e riduce le resistenze vascolari polmonari dell’80%, chiudendo funzionalmente Forame Ovale e Dotto di Botallo.",
            "Un neonato a termine possiede ~300 centri ossei/cartilaginei (che si fondono nelle 206 ossa dell'adulto) e una capacità gastrica grande quanto una ciliegia (~5–7 mL al 1° giorno, perfetta per il colostro).",
            "L'acuità visiva alla nascita mette a fuoco con precisione a 20–30 cm (8–12 pollici), l'esatta distanza tra le braccia e il viso dei genitori."
          ],
          "maternalPhysiology": "Solo il ~4–5% dei bambini nasce esattamente nella Data Presunta del Parto; circa il 50% delle primipare partorisce spontaneamente tra 40s0g e 41s3g.",
          "doctorCheckIn": "Visita delle 40 Settimane (DPP): Pressione arteriosa, battito fetale, valutazione cervicale se desiderata e programmazione dei monitoraggi della Settimana 41 (NST + AFI/BPP) e della data di induzione.",
          "clinicalPearl": "Ricorda i 4 parametri della Rottura delle Membrane (COAT): Se si rompono le acque, annota Colore (limpido vs tinto di meconio), Odore, Quantità e Orario, e contatta subito il reparto di Ostetricia anche se le contrazioni non sono iniziate."
        },
        "41": {
          "phaseLabel": "Termine Tardivo — Sorveglianza Fetale (41s0g–41s6g)",
          "stageTitle": "Monitoraggio Antenatale del Termine Tardivo (NST / BPP) e Programmazione dell’Induzione",
          "biologicalStage": "Feto di Termine Tardivo",
          "lengthMetric": "51.7 cm (20.4 in CHL)",
          "weightMetric": "3.600 g (7,94 lb)",
          "heartRateBpm": "110 – 150 BPM",
          "keyOrgans": [
            "Monitoraggio della Riserva Placentare",
            "Indice del Liquido Amniotico (AFI)",
            "Pelle Secca/Desquamata (Vernice Ridotta)",
            "Unghie Lunghe oltre i Polpastrelli"
          ],
          "fetalMilestones": [
            "Tra 41s0g e 41s6g la gravidanza è classificata dall’ACOG come «Termine Tardivo» (Late-Term).",
            "Gran parte della vernice caseosa è stata riassorbita, perciò i neonati a termine tardivo presentano spesso cute lievemente secca su palmi e piante e unghie lunghe.",
            "La reattività e la maturità neurologica fetale sono pienamente sviluppate."
          ],
          "maternalPhysiology": "Il volume di liquido amniotico tende fisiologicamente a ridursi nel termine tardivo.",
          "doctorCheckIn": "Visita della 41ª Settimana e Sorveglianza Bisettimanale: Eseguire Cardiotocografia (NST) più Indice di Liquido Amniotico (AFI) / Tasca Massima Verticale (≥2 cm) o Profilo Biofisico completo (BPP, punteggio su 8 o 10). Programmare l'induzione del travaglio prima di 42w0d.",
          "clinicalPearl": "Le linee guida ACOG raccomandano di iniziare la sorveglianza fetale a 41w0d e di espletare il parto tra 41w0d e 41w6d per evitare l'insufficienza placentare post-termine."
        },
        "42": {
          "phaseLabel": "Finestra di Parto Post-Termine (42s0g)",
          "stageTitle": "Induzione Attiva del Travaglio, Nascita e Golden Hour (Pelle a Pelle)",
          "biologicalStage": "Traguardo Post-Termine / Nascita",
          "lengthMetric": "52.0 cm (20.5 in CHL)",
          "weightMetric": "3.685 g (8,12 lb)",
          "heartRateBpm": "110 – 150 BPM",
          "keyOrgans": [
            "Clampaggio Tardivo del Cordone (30–60 s)",
            "Golden Hour Pelle a Pelle",
            "Punteggio di APGAR (1 e 5 min)",
            "Vitamina K e Profilassi Oculare Neonatale"
          ],
          "fetalMilestones": [
            "L’ACOG raccomanda il parto entro e non oltre 42s0g (tramite maturazione cervicale e induzione con ossitocina se il travaglio spontaneo non è iniziato).",
            "Alla nascita, l'ACOG raccomanda il Clampaggio Tardivo del Cordone Ombelicale per 30–60 secondi, trasferendo ~80 mL di sangue placentare per incrementare le riserve di ferro del neonato nei primi 6 mesi.",
            "Il Contatto Pelle a Pelle immediato («Golden Hour») stabilizza temperatura, glicemia e frequenza cardiaca del neonato, favorendo l’avvio dell’allattamento."
          ],
          "maternalPhysiology": "Il terzo stadio del travaglio (secondamento) espelle la placenta entro 5–30 minuti dalla nascita; la contrazione uterina previene l’emorragia post-partum.",
          "doctorCheckIn": "Parto e Cure Post-Partum Immediate: Punteggio di Apgar (a 1 e 5 min), iniezione neonatale di Vitamina K (previene la malattia emorragica), vaccino Epatite B, screening uditivo/metabolico, controllo materno a 2–3 settimane (pressione/umore) e visita ostetrica completa a 6 settimane.",
          "clinicalPearl": "Segnali di Allarme Post-Partum («POST-BIRTH»): Nelle 6 settimane successive al parto, recarsi subito in pronto soccorso per dolore toracico/dispnea, convulsioni, pensieri autolesionistici, perdita ematica >1 assorbente/ora per 2 ore, infezione della ferita, dolore/arrossamento al polpaccio, febbre ≥38,0 °C (100,4 °F) o cefalea intensa con PA ≥140/90."
        }
      },
      "appointments": {
        "appt-w6-8": {
          "cadenceLabel": "Conferma Iniziale",
          "title": "Visita Ecografica di Vitalità e Datazione",
          "summary": "Conferma la sede intrauterina, il polo embrionale, l’attività cardiaca, la gravidanza singola vs. gemellare e la datazione precisa tramite Lunghezza Vertice-Sacro (CRL).",
          "procedures": [
            "Ecografia transvaginale o transaddominale di datazione (la CRL stabilisce la DPP con precisione di ±3–5 giorni)",
            "Verifica del sacco vitellino, della camera gestazionale e della frequenza cardiaca embrionale (100–165 BPM)",
            "Anamnesi medica, chirurgica, ostetrica e genetica familiare completa",
            "Gestione precoce di nausea/vomito e verifica dell’integrazione prenatale (Acido Folico ≥400–800 mcg)"
          ],
          "questionsToAsk": [
            "La Lunghezza Vertice-Sacro (CRL) corrisponde alla DPP calcolata dall’ultima mestruazione o ridateremo ufficialmente la gravidanza?",
            "In quale ospedale o punto nascita avviene il parto e come funziona la turnazione di guardia ostetrica?",
            "Qual è il recapito telefonico di triage fuori orario in caso di perdite ematiche o sintomi acuti?"
          ],
          "highRiskAddition": "Età Materna ≥35 / Poliabortività / PMA (FIVET): Ecografia precoce a 5,5–6 settimane e valutazione del supporto luteale con progesterone."
        },
        "appt-w8-10": {
          "cadenceLabel": "Ogni 4 Settimane (q4w)",
          "title": "Prima Visita Ostetrica Completa e Pannello Esami Prenatali Iniziali",
          "summary": "Esame obiettivo completo e profilo ematochimico e urinario materno basale.",
          "procedures": [
            "Emocromo completo (emoglobina, ematocrito, piastrine)",
            "Gruppo Sanguigno (ABO), Fattore Rh(D) e Test di Coombs Indiretto",
            "Titoli anticorpali e screening infettivologico: Rosolia IgG, Varicella IgG, Epatite B (HBsAg), Epatite C, HIV, Sifilide, Toxoplasmosi",
            "Urinocoltura con antibiogramma (screening della batteriuria asintomatica per prevenire la pielonefrite)",
            "TSH (se anamnesi tiroidea), HbA1c/glicemia (se rischio diabete/BMI ≥25) e Screening del Portatore Genetico (Fibrosi Cistica, SMA, Emoglobinopatie)"
          ],
          "questionsToAsk": [
            "Sono Rh positiva o negativa e i miei titoli anticorpali vaccinali (Rosolia/Varicella) sono protettivi?",
            "Presento fattori di rischio per lo screening precoce del diabete gestazionale o per la cardioaspirina dalla 12ª settimana?",
            "Come programmeremo il test del DNA fetale (NIPT) e l’ecografia della Translucenza Nucale?"
          ],
          "highRiskAddition": "Rischio di Diabete Gestazionale / Pregresso DG / PCOS / BMI ≥25: Test di screening del glucosio a 1 ora o glicemia/HbA1c prescritto già alla prima visita."
        },
        "appt-w10-13": {
          "cadenceLabel": "Ogni 4 Settimane (q4w)",
          "title": "Finestra Genetica: DNA Fetale (NIPT) e Translucenza Nucale (TN)",
          "summary": "Screening delle aneuploidie cromosomiche, valutazione morfologica precoce e avvio della profilassi per la preeclampsia alla 12ª settimana.",
          "procedures": [
            "Prelievo materno per DNA Fetale Libero (NIPT, da 10s0g): screening per Trisomie 21, 18, 13 e cromosomi sessuali",
            "Ecografia della Translucenza Nucale (TN, 11s0g–13s6g): misura la plica nucale fetale (<3,0 mm normale) e visualizza l’osso nasale",
            "Auscultazione del battito cardiaco fetale con Doppler (140–165 BPM) e controllo pressione arteriosa / urine",
            "Avvio di Aspirina a Basso Dosaggio (81–100 mg/die dalla 12ª settimana) in presenza di criteri di rischio per preeclampsia"
          ],
          "questionsToAsk": [
            "Devo iniziare l'aspirina a basso dosaggio (81 mg) alla 12ª settimana per la prevenzione della preeclampsia in base al mio profilo?",
            "Quando arriveranno i risultati del NIPT (di solito 7–10 giorni) e come verranno comunicati?",
            "Ci sono indicazioni particolari su attività fisica o viaggi entrando nel secondo trimestre?"
          ],
          "highRiskAddition": "Età ≥35 / Gemelli: Consulenza genetica approfondita; Villocentesi (CVS, 10–13s) disponibile per diagnosi invasiva; confermare la corionicità gemellare entro la 14ª settimana."
        },
        "appt-w16": {
          "cadenceLabel": "Ogni 4 Settimane (q4w)",
          "title": "Controllo di 16 Settimane (2° Trimestre) e Alfa-Fetoproteina (MSAFP)",
          "summary": "Controllo del benessere materno-fetale e screening sierologico dei difetti aperti del tubo neurale.",
          "procedures": [
            "Pressione arteriosa, andamento del peso materno e stick urinario (proteine/glucosio/leucociti)",
            "Verifica del Battito Cardiaco Fetale tramite Doppler portatile",
            "Prelievo per Alfa-Fetoproteina Sierica Materna (MSAFP, 15–20s) per lo screening dei difetti aperti del tubo neurale (spina bifida/anencefalia) o Quad Test se il NIPT non è stato eseguito",
            "Impegnativa e programmazione dell’Ecografia Morfologica di II Livello (20 settimane)"
          ],
          "questionsToAsk": [
            "Anche se il NIPT è risultato a basso rischio, è opportuno dosare oggi l’Alfa-Fetoproteina (MSAFP) per i difetti del tubo neurale?",
            "Quando inizierò a percepire chiaramente i movimenti fetali, tenendo conto della posizione della placenta?"
          ],
          "highRiskAddition": "Pregresso Parto Pretermine Spontaneo: Cervicometria ecografica transvaginale seriata ogni 2 settimane dalla 16ª alla 24ª settimana."
        },
        "appt-w18-22": {
          "cadenceLabel": "Ogni 4 Settimane (q4w)",
          "title": "Ecografia Morfologica di II Livello e Visita Ostetrica di 20 Settimane",
          "summary": "Studio strutturale dettagliato di tutti gli organi fetali, localizzazione placentare, liquido amniotico e cervicometria.",
          "procedures": [
            "Ecografia Morfologica di II Livello (45–60 min): ventricoli cerebrali, cervelletto, plessi corioidei, profilo/labbra, cuore a 4 camere + tratti di efflusso VS/VD, diaframma, stomaco, reni, inserzione cordonale, cordone ombelicale a 3 vasi, colonna vertebrale e tutti i 4 arti",
            "Valutazione della sede placentare (escludendo placenta previa o vasa previa)",
            "Misurazione della lunghezza cervicale (normale ≥25 mm a 18–24 settimane)",
            "Misurazione dell’altezza sinfisi-fondo (inizia a 20 settimane all’ombelico), pressione arteriosa ed esame urine"
          ],
          "questionsToAsk": [
            "I tratti di efflusso cardiaci e la colonna vertebrale sono stati visualizzati completamente oggi o serve un completamento?",
            "La mia placenta è anteriore, posteriore o fundica, ed è ben distante (>2 cm) dall’orifizio uterino interno?",
            "Qual è la misura della mia lunghezza cervicale?"
          ],
          "highRiskAddition": "PMA (FIVET) / Diabete Preesistente / Rischio Cardiopatia Congenita: Ecocardiografia Fetale specialistica a 20–22 settimane."
        },
        "appt-w24-28": {
          "cadenceLabel": "Passaggio a Ogni 2 Settimane a 28s",
          "title": "Curva da Carico di Glucosio, Emocromo, Immunoprofilassi Anti-D e Vaccino dTpa",
          "summary": "Tappa metabolica, ematologica e immunologica fondamentale tra il 2° e il 3° trimestre.",
          "procedures": [
            "Test di carico orale di glucosio a 1 ora con 50 g (GCT) per Diabete Gestazionale (24–28 settimane; se ≥135–140 mg/dL, curva a 3 ore con 100 g)",
            "Ripetizione dell’Emocromo nel 3° trimestre (screening dell’anemia sideropenica e della piastrinopenia gestazionale)",
            "Test di Coombs Indiretto e Immunoprofilassi Anti-D (RhoGAM 300 mcg IM) alla 28ª settimana se la madre è Rh negativa",
            "Vaccinazione materna dTpa (Difterite, Tetano, Pertosse acellulare) tra 27 e 36 settimane (idealmente 27–30s) per proteggere il neonato dalla pertosse",
            "Ripetizione dello screening per Sifilide e HIV nel 3° trimestre"
          ],
          "questionsToAsk": [
            "Quali sono i risultati del mio screening del glucosio a 1 ora e i valori di emoglobina/ferritina del terzo trimestre? Devo assumere ferro orale?",
            "Posso ricevere il vaccino dTpa oggi e quando devono vaccinarsi il partner e i nonni (almeno 2 settimane prima della nascita)?",
            "Come devo eseguire e annotare il conteggio giornaliero dei movimenti fetali a partire dalla 28ª settimana?"
          ],
          "highRiskAddition": "Gemelli Monocoriali: Ecografia ogni 2 settimane per la Sindrome da Trasfusione Feto-Fetale (TTTS); Bicoriali: ecografia di accrescimento ogni 4 settimane."
        },
        "appt-w30": {
          "cadenceLabel": "Ogni 2 Settimane (q2w)",
          "title": "Visita Quindicinale di 30 Settimane e Verifica dei Movimenti Fetali",
          "summary": "Primo controllo quindicinale del terzo trimestre incentrato sulla curva di crescita fetale e sulla sorveglianza della preeclampsia.",
          "procedures": [
            "Pressione arteriosa e stick urinario (screening di ipertensione gestazionale / proteinuria)",
            "Misurazione dell’altezza sinfisi-fondo in cm (attesa 28–32 cm) e BCF con Doppler",
            "Revisione del conteggio giornaliero dei Movimenti Attivi Fetali (≥10 movimenti entro 2 ore)",
            "Ripasso dei segnali di parto pretermine e preregistrazione per il ricovero in sala parto"
          ],
          "questionsToAsk": [
            "L’altezza del fondo uterino procede regolarmente rispetto alla settimana gestazionale?",
            "Come funziona la pre-accettazione per il ricovero e dov’è l’ingresso del pronto soccorso ostetrico notturno?"
          ],
          "highRiskAddition": "Età ≥35 / Obesità / GDM / Ipertensione: Programmare ecografia di accrescimento del 3° trimestre e monitoraggi NST/BPP settimanali dalla 32ª settimana."
        },
        "appt-w32": {
          "cadenceLabel": "Ogni 2 Settimane (q2w)",
          "title": "Visita di 32 Settimane, Finestra Vaccino VRS e Controllo dell’Accrescimento",
          "summary": "Valutazione della presentazione fetale, immunizzazione materna contro il VRS e avvio del monitoraggio prenatale nei casi a rischio.",
          "procedures": [
            "Vaccino Materno contro il Virus Respiratorio Sinciziale (Abrysvo, 32s0g–36s6g nel periodo stagionale) per prevenire la bronchiolite grave neonatale",
            "Pressione arteriosa, controllo urine, altezza fondo uterino (30–34 cm) e battito cardiaco fetale",
            "Ecografia di controllo per localizzazione placentare o accrescimento in caso di placenta bassa, età ≥35, GDM o discrepanza biometrica"
          ],
          "questionsToAsk": [
            "Sono nella finestra indicata per ricevere oggi il vaccino materno Abrysvo contro il VRS (o il neonato riceverà Nirsevimab alla nascita)?",
            "Si riesce già a sentire se il bambino si sta orientando a testa in giù (presentazione cefalica)?"
          ],
          "highRiskAddition": "Età ≥35–40 / GDM / Ipertensione Cronica / FGR: Avviare monitoraggi cardiotocografici (NST) e/o Profilo Biofisico (BPP) settimanali o bisettimanali."
        },
        "appt-w34": {
          "cadenceLabel": "Ogni 2 Settimane (q2w)",
          "title": "Controllo di 34 Settimane e Revisione del Piano del Parto",
          "summary": "Revisione delle opzioni di analgesia del travaglio, preferenze sul parto, massaggio perineale e segnali di preeclampsia.",
          "procedures": [
            "Pressione arteriosa, controllo proteinuria, altezza sinfisi-fondo (32–36 cm) e battito cardiaco fetale",
            "Manovre di Leopold per valutare situazione (longitudinale vs. trasversa) e presentazione fetale",
            "Discussione del piano del parto: analgesia epidurale, protossido d’azoto, monitoraggio continuo vs. intermittente, clampaggio tardivo del cordone e Golden Hour pelle a pelle"
          ],
          "questionsToAsk": [
            "Quali sono le prassi standard del punto nascita per il clampaggio tardivo del cordone, il pelle a pelle immediato e il supporto all’allattamento?",
            "In quali scenari clinici raccomanderebbe un taglio cesareo o un parto operativo?"
          ],
          "highRiskAddition": "Placenta Previa / Pregresso Cesareo Classico: Confermare l’epoca del parto programmato (di solito 36s0g–37s6g per placenta previa)."
        },
        "appt-w36": {
          "cadenceLabel": "Inizio Visite Settimanali (q1w)",
          "title": "Tampone Vaginale-Rettale Streptococco Beta-Emolitico (SGB) a 36 Settimane e Presentazione",
          "summary": "Inizio dei controlli settimanali, screening universale con tampone SGB e verifica della presentazione cefalica.",
          "procedures": [
            "Tampone vaginale e rettale per Streptococco di Gruppo B (SGB / GBS, eseguito tra 36s0g e 37s6g; valido 5 settimane)",
            "Manovre di Leopold + ecografia office per confermare la presentazione Cefalica di vertice",
            "In caso di presentazione Podalica a 36 settimane: colloquio informativo sul Rivolgimento per Manovre Esterne (RME) a 37 settimane",
            "Sospensione della cardioaspirina a 36 settimane secondo protocollo; se anamnesi di Herpes Genitale (HSV), avvio di profilassi orale con Aciclovir/Valaciclovir a 36 settimane"
          ],
          "questionsToAsk": [
            "È confermato che il bambino si trova in presentazione cefalica (a testa in giù)?",
            "Se il tampone per lo Streptococco risulta positivo, quando devo recarmi in ospedale all’inizio del travaglio o a membrane rotte per ricevere almeno 4 ore di profilassi antibiotica EV?"
          ],
          "highRiskAddition": "Anamnesi di Herpes Genitale (HSV): Avviare profilassi antivirale orale giornaliera a 36s0g per prevenire recidive al parto."
        },
        "appt-w37": {
          "cadenceLabel": "Settimanale (q1w)",
          "title": "Visita di 37 Settimane (Termine Precoce) e Criteri di Accesso in Sala Parto",
          "summary": "Verifica dell’esito del tampone SGB, maturità a termine precoce e criteri precisi per recarsi al pronto soccorso ostetrico.",
          "procedures": [
            "Pressione arteriosa, esame urine, altezza sinfisi-fondo e frequenza cardiaca fetale",
            "Controllo del referto del tampone per Streptococco B (SGB) e registrazione in cartella",
            "Conferma della regola per il ricovero in travaglio (5-1-1 per il primo figlio: contrazioni ogni 5 min, della durata di 1 min, per 1 ora; oppure 4-1-1; o accesso immediato in caso di rottura delle acque / sanguinamento / riduzione dei movimenti fetali)"
          ],
          "questionsToAsk": [
            "Qual è stato l’esito del mio tampone per lo Streptococco di Gruppo B?",
            "Se mi si rompono le acque a casa senza contrazioni, devo venire subito in ospedale?"
          ],
          "highRiskAddition": "Ipertensione Gestazionale / Preeclampsia senza criteri di gravità / Colestasi / Gemelli Bicoriali: Parto spesso programmato tra 37s0g e 38s0g."
        },
        "appt-w38": {
          "cadenceLabel": "Settimanale (q1w)",
          "title": "Controllo Settimanale di 38 Settimane e Piano per il Post-Partum",
          "summary": "Sorveglianza continua della pressione materna e del benessere fetale, più preparazione al 4° Trimestre (puerperio).",
          "procedures": [
            "Pressione arteriosa, stick urinario, altezza fondo uterino e battito cardiaco fetale",
            "Visita ostetrica cervicale opzionale se la paziente avverte contrazioni preparatorie o desidera conoscere dilatazione/appianamento",
            "Counseling su recupero post-partum, pavimento pelvico, benessere emotivo (Scala di Edimburgo) e contraccezione"
          ],
          "questionsToAsk": [
            "A chi posso rivolgermi per il supporto all’allattamento una volta tornati a casa?",
            "Quando verranno programmate le mie visite post-partum (l'ACOG raccomanda un controllo iniziale entro 3 settimane e una visita completa entro 6–12 settimane)?"
          ],
          "highRiskAddition": "GDM in Terapia Dietetica / Età ≥40: Discutere la tempistica del parto intorno a 39s0g–39s6g."
        },
        "appt-w39": {
          "cadenceLabel": "Settimanale (q1w)",
          "title": "Visita di 39 Settimane (Termine Completo), Sciping delle Membrane e Opzioni di Induzione",
          "summary": "Valutazione a termine completo, indice di Bishop cervicale opzionale e decisione condivisa tra attesa vigile e induzione a 39 settimane.",
          "procedures": [
            "Pressione arteriosa, controllo urine, altezza fondo uterino e battito cardiaco fetale",
            "Esplorazione vaginale opzionale per valutare il Punteggio di Bishop (dilatazione, appianamento, livello della parte presentata, consistenza, posizione)",
            "Scollamento delle Membrane opzionale (se il collo è dilatato ≥1 cm; rilascia prostaglandine endogene favorendo il travaglio spontaneo entro 48 ore)",
            "Decisione condivisa tra condotta di attesa e induzione elettiva a 39 settimane (studio ARRIVE)"
          ],
          "questionsToAsk": [
            "Quali sono attualmente dilatazione, appianamento e livello della testa fetale, e posso fare oggi lo scollamento delle membrane?",
            "Se non entro in travaglio spontaneo entro le 40 settimane, quando programmeremo i monitoraggi e l’induzione?"
          ],
          "highRiskAddition": "GDM in Terapia Farmacologica / Età ≥35–40: Le linee guida raccomandano il parto nella 39ª settimana (39s0g–39s6g)."
        },
        "appt-w40": {
          "cadenceLabel": "Settimanale (q1w)",
          "title": "Visita della Data Presunta del Parto (40 Settimane) e Piano Oltre il Termine",
          "summary": "Valutazione alla DPP, rivalutazione cervicale e programmazione dei monitoraggi della 41ª settimana.",
          "procedures": [
            "Pressione arteriosa, controllo proteinuria e battito cardiaco fetale",
            "Visita ostetrica e ripetizione opzionale dello scollamento delle membrane",
            "Programmazione per la 41ª settimana di Cardiotocografia (NST) e valutazione del Liquido Amniotico (AFI / Tasca Massima) o Profilo Biofisico (BPP)",
            "Pianificazione della data di ricovero per induzione del travaglio tra 41s0g e 41s6g"
          ],
          "questionsToAsk": [
            "Se programmiamo l’induzione la prossima settimana, il ricovero avverrà la sera prima per la maturazione cervicale (palloncino di Foley o prostaglandine) o la mattina per l’ossitocina?"
          ],
          "highRiskAddition": "La maggior parte delle gravidanze ad alto rischio e con età materna ≥40 espleta il parto entro 39s0g–40s0g."
        },
        "appt-w41-42": {
          "cadenceLabel": "Due Volte a Settimana (41s+)",
          "title": "Sorveglianza a Termine Tardivo (41 Settimane NST / BPP) e Induzione del Travaglio",
          "summary": "Controlli bisettimanali del benessere fetale e del liquido amniotico, con espletamento del parto entro 42s0g.",
          "procedures": [
            "Cardiotocografia (NST): monitoraggio esterno di 20–40 min per verificare FCF basale (110–160 bpm), variabilità moderata e ≥2 accelerazioni (15x15) in 20 min",
            "Profilo Biofisico (BPP) / Ecografia del Liquido Amniotico: verifica Tasca Massima Verticale (MVP ≥2 cm) o AFI ≥5 cm, movimenti respiratori, tono e movimenti fetali",
            "Ricovero in Sala Parto per maturazione cervicale e induzione del travaglio prima di 42s0g"
          ],
          "questionsToAsk": [
            "La tasca di liquido amniotico (MVP/AFI) e il tracciato cardiotocografico (NST) sono completamente reattivi oggi?",
            "A che ora dobbiamo presentarci in reparto per il ricovero programmato di induzione?"
          ],
          "highRiskAddition": "Oligoamnios (MVP <2 cm) o Tracciato Non Rassicurante: Ricovero immediato in Sala Parto per l’espletamento del parto."
        }
      },
      "symptoms": {
        "sym-1": {
          "urgencyLabel": "Recarsi Subito in Pronto Soccorso Ostetrico",
          "trimesterScope": "3° Trimestre (Settimane 28–42)",
          "title": "Riduzione dei Movimenti Fetali (<10 Movimenti in 2 Ore a ≥28 Settimane)",
          "clinicalExplanation": "Un calo improvviso dei movimenti fetali o il mancato raggiungimento di 10 movimenti distinti entro 2 ore può essere un segno precoce di insufficienza placentare o compressione del cordone ombelicale.",
          "actionSteps": "Bere acqua fresca, sdraiarsi sul fianco sinistro in una stanza silenziosa e concentrarsi sui movimenti. NON aspettare domani e non affidarsi a un Doppler domestico: recarsi immediatamente al pronto soccorso ostetrico per un monitoraggio cardiotocografico (NST) continuo di 20 minuti."
        },
        "sym-2": {
          "urgencyLabel": "Recarsi Subito in Pronto Soccorso Ostetrico / Generale",
          "trimesterScope": "2° e 3° Trimestre (≥20 Settimane) e Post-Partum",
          "title": "Cefalea Intensa e Persistente, Disturbi Visivi (Lampi/Macchie) o Dolore Epigastrico / Ipocondrio Destro",
          "clinicalExplanation": "Una cefalea intensa che non si risolve con paracetamolo e idratazione, scotomi visivi (lampi di luce/visione offuscata), dolore epigastrico o all'ipocondrio destro, o gonfiore improvviso di viso e mani sono segni distintivi di Preeclampsia con Caratteristiche di Gravità o sindrome HELLP.",
          "actionSteps": "Misuri la pressione arteriosa se dispone di uno sfigmomanometro (≥140/90 è elevata; ≥160/110 è un’emergenza ipertensiva). Si rechi subito in Pronto Soccorso Ostetrico per il controllo di PA, proteinuria, piastrine e transaminasi."
        },
        "sym-3": {
          "urgencyLabel": "Recarsi Subito in Pronto Soccorso Ostetrico",
          "trimesterScope": "Tutti i Trimestri (Settimane 1–42)",
          "title": "Perdite Ematiche Vaginali (Sangue Rosso Vivo o Coaguli)",
          "clinicalExplanation": "Nel 1° trimestre, un sanguinamento abbondante o associato a dolore pelvico unilaterale richiede la valutazione per gravidanza ectopica o minaccia d’aborto. Nel 2°/3° trimestre richiede un’ecografia immediata per escludere Placenta Previa o Distacco di Placenta.",
          "actionSteps": "Si rechi immediatamente in Pronto Soccorso Ostetrico. Se è Rh negativa, dovrà inoltre ricevere l’immunoprofilassi Anti-D entro 72 ore dall’episodio di sanguinamento."
        },
        "sym-4": {
          "urgencyLabel": "Recarsi Subito in Sala Parto / Pronto Soccorso Ostetrico",
          "trimesterScope": "2° e 3° Trimestre",
          "title": "Perdita Improvvisa o Continua di Liquido Chiaro, Rosato o Verdastro (Rottura delle Acque)",
          "clinicalExplanation": "La Rottura delle Membrane a termine o Pretermine (pPROM, prima di 37 settimane) rimuove la barriera amniotica contro le infezioni e comporta un rischio di prolasso di funicolo se la testa non è impegnata.",
          "actionSteps": "Annoti Colore, Odore, Quantità e Ora. Non inserisca nulla in vagina e si rechi subito in Sala Parto per la valutazione sterile."
        },
        "sym-5": {
          "urgencyLabel": "Contattare l’Ostetrico / Reparto entro 1–2 Ore",
          "trimesterScope": "2° e 3° Trimestre (Settimane 20–36)",
          "title": "Contrazioni Regolari Prima di 37 Settimane (>4–6 all’Ora per 1 Ora)",
          "clinicalExplanation": "Indurimenti uterini ritmici accompagnati da crampi simil-mestruali, pressione pelvica, mal di schiena lombare o perdite mucose prima di 37s0g possono indicare una minaccia di parto pretermine.",
          "actionSteps": "Svuotare la vescica, bere 500 mL (16–24 oz) di acqua e sdraiarsi sul fianco sinistro. Se persistono >4–6 contrazioni in 1 ora, contattare subito il reparto di maternità per valutare la cervicometria e la fibronettina fetale."
        },
        "sym-6": {
          "urgencyLabel": "Contattare Oggi l’Ostetrico e Trattare la Febbre con Paracetamolo",
          "trimesterScope": "Tutti i Trimestri (Settimane 1–42)",
          "title": "Febbre ≥38,0°C (100,4°F) o Brividi",
          "clinicalExplanation": "L'ipertermia materna prolungata nel 1° trimestre aumenta il rischio di difetti del tubo neurale e nei trimestri successivi può innescare contrazioni pretermine o indicare pielonefrite, influenza, COVID-19 o corioamnionite.",
          "actionSteps": "Assumere Paracetamolo (650–1.000 mg) per abbassare la temperatura corporea, idratarsi e contattare il ginecologo per ricercare la causa infettiva."
        },
        "sym-7": {
          "urgencyLabel": "Recarsi Immediatamente in Pronto Soccorso",
          "trimesterScope": "Tutti i Trimestri e 6 Settimane Post-Partum",
          "title": "Gonfiore, Arrossamento o Calore a un Solo Polpaccio, oppure Dolore Toracico / Fiato Corto",
          "clinicalExplanation": "La gravidanza è uno stato di ipercoagulabilità fisiologica, che aumenta il rischio di Trombosi Venosa Profonda (TVP, più frequente alla gamba sinistra) ed Embolia Polmonare (EP).",
          "actionSteps": "Non massaggi il polpaccio. Si rechi immediatamente in Pronto Soccorso per eseguire un’ecocolordoppler venoso degli arti inferiori."
        },
        "sym-8": {
          "urgencyLabel": "Contattare lo Studio Ostetrico entro 24 Ore",
          "trimesterScope": "Fine 2° e 3° Trimestre",
          "title": "Prurito Intenso ai Palmi delle Mani e alle Piante dei Piedi (Soprattutto Notturno, Senza Eruzione Cutanea)",
          "clinicalExplanation": "Il prurito palmo-plantare intenso senza eruzione cutanea primaria è il sintomo classico della Colestasi Intraepatica Gravidica (ICP), causata dall'aumento degli acidi biliari sierici.",
          "actionSteps": "Contatti l’ostetrico per prescrivere il dosaggio degli Acidi Biliari Totali e delle Transaminasi (AST/ALT). Se confermata, la terapia con acido ursodesossicolico riduce prurito e acidi biliari."
        },
        "sym-9": {
          "urgencyLabel": "Contattare Oggi lo Studio Ostetrico",
          "trimesterScope": "Tutti i Trimestri",
          "title": "Bruciore durante la Minzione (Disuria), Urine Torbide o Dolore al Fianco",
          "clinicalExplanation": "Il progesterone dilata gli ureteri, rendendo le infezioni delle basse vie urinarie (cistiti) molto più inclini a risalire causando pielonefrite acuta, che può innescare un travaglio pretermine.",
          "actionSteps": "Contatti oggi lo studio ostetrico per eseguire esame urine e urinocoltura, così da iniziare tempestivamente un antibiotico sicuro in gravidanza (es. cefalexina o fosfomicina)."
        },
        "sym-10": {
          "urgencyLabel": "Normale Adattamento Fisiologico (Parlarne alla Visita)",
          "trimesterScope": "2° e 3° Trimestre",
          "title": "Fitta Breve e Acuta all’Inguine quando ci si Gira nel Letto, ci si Alza o si Tossisce",
          "clinicalExplanation": "Classico Dolore del Legamento Rotondo: man mano che l’utero cresce fuori dalla pelvi, i legamenti rotondi si tendono come elastici e si contraggono brevemente con i movimenti improvvisi.",
          "actionSteps": "Flettere le anche prima di tossire o starnutire, ruotare lentamente sul fianco prima di alzarsi, applicare un impacco tiepido (non bollente) o utilizzare una fascia di supporto maternità."
        },
        "sym-11": {
          "urgencyLabel": "Normale Adattamento Fisiologico (Braxton Hicks)",
          "trimesterScope": "2° e 3° Trimestre",
          "title": "Indurimento Addominale Irregolare e Indolore che si Risolve con Idratazione e Riposo",
          "clinicalExplanation": "Le contrazioni di Braxton Hicks (\"di preparazione\") tonificano la muscolatura uterina senza dilatare il collo. Sono irregolari, non aumentano di intensità e sono spesso favorite da disidratazione o vescica piena.",
          "actionSteps": "Beva 2 bicchieri d’acqua, svuoti la vescica e riposi sul fianco sinistro. Contatti l’ostetrico se diventano regolari (ogni 5–10 min) o dolorose."
        },
        "sym-12": {
          "urgencyLabel": "Normale Adattamento Fisiologico",
          "trimesterScope": "Tutti i Trimestri",
          "title": "Lieve Congestione Nasale (\"Rinite Gravidica\") o Epistassi Occasionale",
          "clinicalExplanation": "La congestione mucosa mediata dagli estrogeni e l’espansione del +45% del volume plasmatico gonfiano i turbinati nasali fino al 30% delle gestanti.",
          "actionSteps": "Utilizzi spray nasali con soluzione fisiologica sterile, un umidificatore ambientale e cerottini nasali. Eviti decongestionanti orali come fenilefrina o pseudoefedrina (specialmente nel 1° trimestre o in caso di ipertensione)."
        }
      },
      "safety": {
        "med-1": {
          "category": "Dolore e Febbre",
          "statusLabel": "Prima Linea Approvata (ACOG)",
          "name": "Paracetamolo / Acetaminofene (Tachipirina / Tylenol)",
          "dosageNote": "325–650 mg ogni 6 ore al bisogno (Max 3.000 mg/24h); dose minima efficace per la durata più breve.",
          "clinicalGuidance": "ACOG e SMFM confermano il paracetamolo come l'analgesico e antipiretico di prima scelta più sicuro in tutti e tre i trimestri. Trattare la febbre materna ≥38,0 °C (100,4 °F) è clinicamente importante per proteggere l'embrione/feto."
        },
        "med-2": {
          "category": "Dolore e Febbre",
          "statusLabel": "Controindicato in Gravidanza",
          "name": "Ibuprofene (Moment/Brufen), Naprossene e Aspirina ad Alto Dosaggio (FANS)",
          "dosageNote": "Evitare in gravidanza (Nota: l’aspirina a basso dosaggio da 81–100 mg prescritta dall’ostetrico per prevenire la preeclampsia fa eccezione ed È sicura).",
          "clinicalGuidance": "I FANS orali inibiscono la sintesi delle prostaglandine fetali, causando chiusura prematura del dotto arterioso di Botallo, compromissione renale fetale e oligoamnios dopo la 20ª settimana."
        },
        "med-3": {
          "category": "Nausea e Vomito",
          "statusLabel": "Terapia di Prima Linea ACOG",
          "name": "Vitamina B6 (Piridossina) + Dossilamina (Nuperal / Diclegis)",
          "dosageNote": "Vitamina B6 10–25 mg 3 volte/die + Dossilamina succinato 12,5–25 mg prima di coricarsi.",
          "clinicalGuidance": "La terapia antiemetica più studiata in ostetricia (>200.000 gravidanze esposte senza alcun segnale teratogeno)."
        },
        "med-4": {
          "category": "Bruciore di Stomaco e Reflusso",
          "statusLabel": "Prima/Seconda Linea Approvata",
          "name": "Carbonato di Calcio (Tums) e Famotidina (Pepcid)",
          "dosageNote": "Carbonato di calcio 500–1.000 mg al bisogno; Famotidina 10–20 mg 1–2 volte al giorno se gli antiacidi non bastano.",
          "clinicalGuidance": "Gli antiacidi a base di calcio neutralizzano l’acidità in sicurezza (distanziare di 2 ore dal ferro). Evitare il bismuto subsalicilato (Pepto-Bismol)."
        },
        "med-5": {
          "category": "Stitichezza e Gastrointestinale",
          "statusLabel": "Approvato (Assorbimento Sistemico Minimo)",
          "name": "Polietilenglicole 3350 / Macrogol (MiraLAX), Psyllium (Metamucil) e Docusato (Colace)",
          "dosageNote": "Macrogol (MiraLAX) 17 g al giorno in 240 mL (8 oz) d'acqua associato a maggiore idratazione e fibre alimentari.",
          "clinicalGuidance": "Il progesterone rallenta la motilità intestinale e il ferro prenatale accentua la stipsi. I lassativi osmotici e formanti massa non vengono assorbiti a livello sistemico e sono sicuri in gravidanza. Evitare l’olio di ricino."
        },
        "med-6": {
          "category": "Allergie e Raffreddore",
          "statusLabel": "Antistaminico di Prima Linea Approvato",
          "name": "Loratadina (Clarityn), Cetirizina (Zirtec) e Fluticasone Spray Nasale (Flonase)",
          "dosageNote": "Loratadina 10 mg al giorno o Cetirizina 10 mg al giorno; evitare le formulazioni con decongestionante associato.",
          "clinicalGuidance": "Gli antistaminici di seconda generazione e gli spray nasali corticosteroidei hanno un ottimo profilo di sicurezza in gravidanza. Evitare pseudoefedrina/fenilefrina orale nel 1° trimestre o in caso di ipertensione."
        },
        "med-7": {
          "category": "Dermatologia / Cura della Pelle",
          "statusLabel": "Strettamente Controindicato (Teratogeno)",
          "name": "Isotretinoina (Roaccutan) e Retinoidi Topici (Tretinoina / Retin-A / Retinolo)",
          "dosageNote": "Sospendere prima del concepimento; utilizzare invece Acido Azelaico, Acido Glicolico (<10%) o Niacinamide.",
          "clinicalGuidance": "I retinoidi sistemici causano grave embriopatia cranio-facciale, cardiaca e timica. Per prudenza clinica, dermatologi e ostetrici raccomandano di sospendere anche i retinoidi topici (tretinoina, adapalene, retinolo) in gravidanza."
        },
        "med-8": {
          "category": "Nutrizione e Bevande",
          "statusLabel": "Sicuro Sotto <200 mg / Giorno (ACOG)",
          "name": "Caffeina (Caffè, Espresso, Matcha, Tè)",
          "dosageNote": "Limitare l'assunzione totale giornaliera di caffeina a ≤200 mg (circa una tazza da 350 mL / 12 oz di caffè americano o due espressi).",
          "clinicalGuidance": "Le linee guida ACOG confermano che un consumo moderato di caffeina (<200 mg/giorno) non aumenta il rischio di aborto spontaneo o parto pretermine. Ricordare di includere tè, bevande a base di cola e cioccolato fondente."
        },
        "med-9": {
          "category": "Nutrizione e Bevande",
          "statusLabel": "Fortemente Raccomandato (2–3 Porzioni/Sett.)",
          "name": "Pesce Ricco di Omega-3 a Basso Mercurio (Salmone Selvaggio, Sardine, Trota, Merluzzo, Gamberi)",
          "dosageNote": "225–340 g (8–12 oz) a settimana di pesce a basso contenuto di mercurio ben cotto (fornisce ~200–300 mg/die di DHA).",
          "clinicalGuidance": "FDA e ACOG raccomandano 2–3 porzioni/settimana di pesce cotto a basso mercurio per lo sviluppo cerebrale e retinico fetale. EVITARE rigorosamente i predatori ad alto mercurio: Squalo, Pesce Spada, Sgombro Reale, Marlin e Tonno Obeso."
        },
        "med-10": {
          "category": "Nutrizione e Bevande",
          "statusLabel": "Evitare Crudi / Non Pastorizzati",
          "name": "Latticini Non Pastorizzati, Affettati Non Riscaldati e Germogli Crudi (Rischio Listeria)",
          "dosageNote": "Verificare sull’etichetta del formaggio la dicitura \"Latte Pastorizzato\"; scaldare gli affettati/würstel fino al vapore (74°C / 165°F).",
          "clinicalGuidance": "L’immunità cellulo-mediata si riduce in gravidanza, aumentando di 10 volte la suscettibilità a Listeria monocytogenes, che attraversa la placenta. La maggior parte dei formaggi freschi confezionati (feta, mozzarella, stracchino) È pastorizzata: basta controllare l’etichetta!"
        }
      },
      "photos": {
        "0": {
          "caption": "Settimane 1–2: Ovocita secondario (≈120 µm) all’ovulazione — zona pellucida vitrea e cellule della corona radiata che emergono dal follicolo ovarico.",
          "alt": "Render iperrealistico di un ovocita umano con zona pellucida e cellule del cumulo che emerge dalla superficie ovarica."
        },
        "1": {
          "caption": "Settimana 3: Morula compattata a 16 cellule (4° giorno post-fecondazione) con globuli polari all’interno della zona pellucida.",
          "alt": "Render iperrealistico di una morula umana con blastomeri traslucidi compattati all’interno di un guscio trasparente."
        },
        "2": {
          "caption": "Settimana 4: Blastocisti schiusa che si impianta nell’endometrio vascolarizzato — anello trofoblastico, blastocele e massa cellulare interna.",
          "alt": "Render iperrealistico di una blastocisti umana che aderisce alla mucosa uterina con sottili proiezioni trofoblastiche."
        },
        "3": {
          "caption": "Settimane 5–6: Embrione allo stadio di Carnegie con somiti dorsali, prominenza cardiaca primitiva e sacco vitellino dorato.",
          "alt": "Render iperrealistico di un embrione umano precoce con cute traslucida, somiti visibili e sacco vitellino nella membrana amniotica."
        },
        "4": {
          "caption": "Settimane 7–9: Stadio embrionale tardivo con vescicole cerebrali, calice ottico pigmentato, cuore a 4 camere, piastre delle mani e sacco vitellino.",
          "alt": "Fotografia macro intrauterina di un embrione umano tardivo con cute vascolare traslucida, calice ottico scuro, abbozzi degli arti e sacco vitellino dorato."
        },
        "5": {
          "caption": "Settimane 10–15: Feto del 1° trimestre con dita separate, palpebre fuse, vasi temporali traslucidi e cordone ombelicale a 3 vasi collegato alla placenta sinistra.",
          "alt": "Fotografia macro intrauterina di un feto umano di 12 settimane nel sacco amniotico con cordone ombelicale a 3 vasi e disco placentare sinistro."
        },
        "6": {
          "caption": "Settimane 16–25: Feto di metà gestazione (Ecografia Morfologica di 20 Settimane) con vernice caseosa, arti flessi e cordone ombelicale a 3 vasi collegato alla placenta sinistra.",
          "alt": "Fotografia macro intrauterina di un feto umano di 20 settimane a metà gestazione nel sacco amniotico con disco placentare sinistro."
        },
        "7": {
          "caption": "Settimane 26–33: Feto dell’inizio del 3° trimestre con palpebre e ciglia formate e rapido deposito di tessuto adiposo sottocutaneo.",
          "alt": "Fotografia macro intrauterina di un feto umano di 28 settimane del terzo trimestre che riposa serenamente nel sacco amniotico."
        },
        "8": {
          "caption": "Settimane 34–42: Feto a termine completo con guance paffute, grasso sottocutaneo maturo e surfactante polmonare pronto per la nascita.",
          "alt": "Fotografia macro intrauterina di un feto umano a termine accolto nel sacco amniotico con placenta sinistra e cordone ombelicale spiralizzato."
        }
      }
    },
    "fr": {
      "weeks": {
        "1": {
          "phaseLabel": "Périconceptionnel (Phase Menstruelle / Folliculaire)",
          "stageTitle": "Recrutement Folliculaire et Régénération Endométriale",
          "biologicalStage": "Cohorte de Follicules Ovariens",
          "lengthMetric": "0.04 mm (Follicule Primordial)",
          "weightMetric": "< 0,001 g",
          "heartRateBpm": "Pas encore formé (Pré-conception)",
          "keyOrgans": [
            "Axe Hypothalamo-Hypophyso-Ovarien",
            "Couche Basale Endométriale",
            "Sélection du Follicule Dominant"
          ],
          "fetalMilestones": [
            "La datation obstétricale débute au 1er jour des Dernières Règles (DDR), environ 2 semaines avant la fécondation réelle.",
            "L’hormone folliculo-stimulante (FSH) recrute une cohorte de follicules antraux ; un follicule dominant de De Graaf émerge.",
            "La hausse de l’œstradiol fait proliférer l’endomètre fonctionnel afin de préparer un lit d’implantation vascularisé."
          ],
          "maternalPhysiology": "La desquamation menstruelle laisse place à la phase folliculaire proliférative. La température basale reste sur le plateau bas pré-ovulatoire.",
          "doctorCheckIn": "Bilan Préconceptionnel : Confirmer 400–800 mcg/j d’acide folique (4 mg en cas d’antécédent d’anomalie du tube neural), vérifier l’immunité rubéole/varicelle et réviser les traitements chroniques.",
          "clinicalPearl": "L’ACOG date la grossesse à partir du 1er jour des DDR (40 SA / 280 jours), tandis que l’âge embryonnaire réel est plus court d’environ 2 semaines (38 semaines / 266 jours)."
        },
        "2": {
          "phaseLabel": "Périconceptionnel (Phase Péri-ovulatoire)",
          "stageTitle": "Pic de LH, Ovulation et Captation Tubaire",
          "biologicalStage": "Ovocyte Secondaire (Métaphase II)",
          "lengthMetric": "0.12 mm (Ovocyte de 120 µm)",
          "weightMetric": "< 0,001 g",
          "heartRateBpm": "Pas encore formé (Fenêtre d’ovulation)",
          "keyOrgans": [
            "Complexe Cumulus-Ovocyte",
            "Zone Pellucide",
            "Formation du Corps Jaune"
          ],
          "fetalMilestones": [
            "Le pic d’hormone lutéinisante (LH) en milieu de cycle déclenche la reprise de la Méiose I et l’expulsion du premier globule polaire.",
            "L’ovulation libère l’ovocyte secondaire bloqué en Métaphase II, capté vers l’ampoule tubaire par les franges du pavillon.",
            "Le follicule rompu se transforme en Corps Jaune, sécrétant de la progestérone pour rendre l’endomètre sécrétoire."
          ],
          "maternalPhysiology": "Le pic d’œstrogènes stimule l’épaississement de l’endomètre et la glaire cervicale fertile ; la température basale augmente de ~0,3 °C (~0,5 °F) après l’ovulation.",
          "doctorCheckIn": "Fenêtre de Fertilité : La fécondabilité maximale se situe pendant les 5 jours précédant l’ovulation et le jour même de l’ovulation (survie ovocytaire de 12 à 24 h).",
          "clinicalPearl": "En cas de FIV, le transfert d’un blastocyste à J5 correspond exactement à 2 semaines + 5 jours d’aménorrhée le jour du transfert."
        },
        "3": {
          "phaseLabel": "1er Trimestre — Stade Germinal",
          "stageTitle": "Fécondation, Segmentation du Zygote et Morula",
          "biologicalStage": "Zygote → Morula à 16 Cellules",
          "lengthMetric": "0.15 – 0.20 mm",
          "weightMetric": "< 0,001 g",
          "heartRateBpm": "Stade de segmentation avasculaire",
          "keyOrgans": [
            "Génome Diploïde (46 Chromosomes)",
            "Compaction des Blastomères",
            "Ségrégation de la Masse Cellulaire Interne"
          ],
          "fetalMilestones": [
            "Fécondation dans l’ampoule de la trompe de Fallope formant un zygote diploïde à 46 chromosomes.",
            "Les pronucléi mâle et femelle fusionnent en un zygote diploïde (46,XX ou 46,XY) et entament des divisions mitotiques toutes les 12 à 24 h.",
            "Au 4e jour post-conception, la morula de 16 à 32 cellules se compacte, entre dans la cavité utérine et forme le blastocyste précoce."
          ],
          "maternalPhysiology": "Le facteur précoce de grossesse (EPF) module la tolérance immunitaire maternelle ; la progestérone du corps jaune maintient l’endomètre.",
          "doctorCheckIn": "Aucune consultation requise à ce stade. Évitez les AINS (ibuprofène, naproxène) car l’inhibition des prostaglandines peut gêner l’implantation.",
          "clinicalPearl": "Les expositions avant 4 SA (14 jours post-conception) suivent généralement la loi du « tout ou rien » (avant l’organogenèse classique des semaines 3–8 embryonnaires / 5–10 SA), mais tout tératogène connu doit être arrêté sans délai."
        },
        "4": {
          "phaseLabel": "1er Trimestre — Implantation",
          "stageTitle": "Implantation du Blastocyste et hCG du Syncytiotrophoblaste",
          "biologicalStage": "Blastocyste Bilaminaire en Implantation",
          "lengthMetric": "0.4 – 1.0 mm",
          "weightMetric": "< 0,01 g",
          "heartRateBpm": "Circulation lacunaire primitive",
          "keyOrgans": [
            "Disque Épiblaste & Hypoblaste",
            "Cavité Amniotique",
            "Vésicule Vitelline Primaire",
            "Lacunes Trophoblastiques"
          ],
          "fetalMilestones": [
            "Le blastocyste éclot de la zone pellucide et envahit l’endomètre utérin décidualisé (Jours 6 à 10 post-ovulation).",
            "La Masse Cellulaire Interne se différencie en disque embryonnaire bilaminaire (épiblaste et hypoblaste).",
            "Le syncytiotrophoblaste envahit les capillaires spiralés maternels et sécrète la bêta-hCG, maintenant le corps jaune et la progestérone."
          ],
          "maternalPhysiology": "Retard de règles ; la bêta-hCG sérique est détectable 8 à 11 jours après l’ovulation et double toutes les 48 à 72 h lors d’une grossesse évolutive.",
          "doctorCheckIn": "Test de grossesse positif ! Contactez votre obstétricien ou sage-femme pour planifier la première consultation et l’échographie de datation (généralement entre 6 et 9 SA).",
          "clinicalPearl": "Un léger spotting (« saignement d’implantation ») est fréquent et bénin, mais une douleur pelvienne unilatérale avec saignement impose des dosages répétés de bêta-hCG pour écarter une grossesse extra-utérine."
        },
        "5": {
          "phaseLabel": "1er Trimestre — Organogenèse Précoce",
          "stageTitle": "Gastrulation, Plaque Neurale et Tube Cardiaque Primitif",
          "biologicalStage": "Embryon Trilaminaire (Stade de Carnegie 9–10)",
          "lengthMetric": "1.5 – 2.5 mm (LCC)",
          "weightMetric": "0,02 g",
          "heartRateBpm": "85 – 100 BPM (Contractions naissantes)",
          "keyOrgans": [
            "Ectoderme / Mésoderme / Endoderme",
            "Gouttière Neurale",
            "Croissant Cardiogénique",
            "Somites embryonnaires"
          ],
          "fetalMilestones": [
            "La gastrulation établit les trois feuillets embryonnaires : Ectoderme (système nerveux/épiderme), Mésoderme (cœur/os/reins) et Endoderme (intestin/poumons/foie).",
            "La plaque neurale se plie en gouttière neurale bordée par les somites du mésoderme para-axial.",
            "Les tubes endocardiques fusionnent en un tube cardiaque primitif unique qui débute ses battements vers le 22e jour post-conception."
          ],
          "maternalPhysiology": "L’ascension rapide de l’hCG, des œstrogènes et de la progestérone provoque nausées précoces, tension mammaire, hyperosmie et fatigue.",
          "doctorCheckIn": "En cas d’antécédent de grossesse extra-utérine, de fausses couches répétées ou de FIV, des dosages de bêta-hCG à 48 h et une échographie précoce de localisation peuvent être prescrits.",
          "clinicalPearl": "À l’échographie endovaginale de la Semaine 5, le sac gestationnel et la vésicule vitelline sont visibles dès que la bêta-hCG dépasse le seuil discriminatoire (~1 500–2 000 mUI/mL)."
        },
        "6": {
          "phaseLabel": "1er Trimestre — Organogenèse",
          "stageTitle": "Fermeture du Tube Neural, Boucle Cardiaque et Bourgeons des Membres",
          "biologicalStage": "Embryon (Stade de Carnegie 12–13)",
          "lengthMetric": "4 – 6 mm (LCC)",
          "weightMetric": "0,1 g",
          "heartRateBpm": "100 – 115 BPM",
          "keyOrgans": [
            "Neuropores Antérieur et Postérieur",
            "Tube Cardiaque en Boucle S",
            "Vésicules Optiques",
            "Placodes Otiques"
          ],
          "fetalMilestones": [
            "Les neuropores antérieur (crânien) et postérieur (caudal) se ferment complètement au 28e jour post-conception, scellant les vésicules cérébrales et la moelle épinière.",
            "Le tube cardiaque primitif effectue sa boucle en S, établissant oreillettes et ventricules avec une activité cardiaque visible à l’échographie.",
            "Les bourgeons des membres supérieurs et inférieurs apparaissent sous forme de petites palettes, ainsi que les placodes optiques et otiques."
          ],
          "maternalPhysiology": "Le débit sanguin rénal augmente de 25 à 30 %, entraînant des envies fréquentes d’uriner avant même que l’utérus ne comprime la vessie.",
          "doctorCheckIn": "Échographie de Viabilité et de Datation (Semaines 6–8) : Confirme l’embryon intra-utérin, mesure la Longueur Cranio-Caudale (LCC ±3–5 jours) et documente le rythme cardiaque.",
          "clinicalPearl": "La fermeture du tube neural s’achevant à la Semaine 6, la supplémentation précoce en acide folique est essentielle pour prévenir le spina bifida."
        },
        "7": {
          "phaseLabel": "1er Trimestre — Organogenèse",
          "stageTitle": "Expansion du Télencéphale, Palettes des Mains et Métanéphros",
          "biologicalStage": "Embryon (Stade de Carnegie 15–16)",
          "lengthMetric": "9 – 11 mm (LCC)",
          "weightMetric": "0,5 g",
          "heartRateBpm": "120 – 140 BPM",
          "keyOrgans": [
            "Hémisphères Cérébraux",
            "Rein Définitif (Métanéphros)",
            "Rayons Digitaux (Palettes des Mains)",
            "Bourgeons Pancréatiques"
          ],
          "fetalMilestones": [
            "Le prosencéphale se divise en vésicules télencéphaliques paires (futur cortex cérébral), produisant ~100 000 nouveaux neurones par minute.",
            "Les palettes des mains s’aplatissent et forment des rayons digitaux ; les vésicules cristalliniennes s’invaginent et le pigment rétinien apparaît.",
            "Le bourgeon urétéral envahit le mésenchyme métanéphrique pour former les reins définitifs (métanéphros)."
          ],
          "maternalPhysiology": "Les glandes cervicales sécrètent un bouchon muqueux dense qui scelle le canal endocervical contre les bactéries ascendantes.",
          "doctorCheckIn": "Pour les nausées et vomissements gravidiques, le traitement de première intention (ACOG) associe la vitamine B6 (pyridoxine 10–25 mg 3x/j) et la doxylamine (12,5–25 mg).",
          "clinicalPearl": "La hernie physiologique de l’intestin moyen débute cette semaine : la croissance intestinale rapide pousse temporairement les anses dans la base du cordon ombilical jusqu’aux Semaines 10–11."
        },
        "8": {
          "phaseLabel": "1er Trimestre — Organogenèse",
          "stageTitle": "Cloisonnement du Cœur à 4 Cavités et Doigts Palmés",
          "biologicalStage": "Embryon (Stade de Carnegie 18–20)",
          "lengthMetric": "15 – 17 mm (LCC)",
          "weightMetric": "1,1 g",
          "heartRateBpm": "145 – 165 BPM",
          "keyOrgans": [
            "Valves Atrio-Ventriculaires",
            "Septum Interventriculaire",
            "Centres de Chondrification",
            "Pavillons Auriculaires Externes"
          ],
          "fetalMilestones": [
            "Les coussinets endocardiques fusionnent et le septum interventriculaire se ferme, achevant l’architecture cardiaque à 4 cavités.",
            "L’apoptose (mort cellulaire programmée) sculpte les espaces entre les doigts et les orteils palmés ; les coudes et genoux se fléchissent.",
            "Les maquettes cartilagineuses du squelette se forment et les premiers mouvements spontanés du tronc et des membres débutent."
          ],
          "maternalPhysiology": "L’utérus passe de la taille d’un poing à celle d’un gros citron ; le débit cardiaque maternel augmente de 20 %.",
          "doctorCheckIn": "Première Consultation Prénatale (8–10 SA) : Échographie endovaginale pour confirmer la vitalité et la LCC (CRL), datation du terme (DPA), bilan sanguin prénatal (groupe ABO/Rh, RAI, NFS, rubéole, Ag HBs, VIH, syphilis, ECBU) et frottis cervical.",
          "clinicalPearl": "La Longueur Cranio-Caudale (LCC) mesurée entre 7 et 13 SA constitue la méthode la plus fiable pour déterminer la Date Prévue d’Accouchement (DPA)."
        },
        "9": {
          "phaseLabel": "1er Trimestre — Stade Embryonnaire Tardif",
          "stageTitle": "Pic de Fréquence Cardiaque Embryonnaire, Fusion des Paupières et Diaphragme",
          "biologicalStage": "Embryon Tardif (Stade de Carnegie 21–22)",
          "lengthMetric": "22 – 25 mm (2.3 cm LCC)",
          "weightMetric": "2,0 g",
          "heartRateBpm": "155 – 175 BPM (Pic Physiologique)",
          "keyOrgans": [
            "Diaphragme Pleuropéritonéal",
            "Paupières Fusionnées",
            "Hypophyse & Cortex Surrénalien",
            "Ligaments Vocaux"
          ],
          "fetalMilestones": [
            "La fréquence cardiaque embryonnaire atteint son pic physiologique (~165–175 BPM) tandis que l’innervation parasympathique arrive à maturité.",
            "Les membranes pleuropéritonéales fusionnent avec le septum transversum pour former le diaphragme thoracique.",
            "Les paupières recouvrent les yeux et fusionnent (restant fermées jusqu’aux Semaines 25–26 pour protéger les cornées)."
          ],
          "maternalPhysiology": "Le pic sérique de bêta-hCG (~90 000–100 000 mUI/mL) coïncide souvent avec le pic des nausées matinales entre 9 et 10 SA.",
          "doctorCheckIn": "Abordez les options de dépistage génétique avec votre praticien : ADN fœtal libre (DPNI / NIPT) dès 10+0 SA, dépistage de porteurs (mucoviscidose, SMA, hémoglobinopathies) et échographie de clarté nucale.",
          "clinicalPearl": "Si des vomissements sévères entraînent une perte de poids >5 %, une cétonurie ou une intolérance aux liquides sur 24 h (hyperémèse gravidique), consultez pour une réhydratation IV."
        },
        "10": {
          "phaseLabel": "1er Trimestre — Transition Embryon-Fœtus",
          "stageTitle": "Fin de l’Organogenèse et Ouverture du Dépistage par ADN Fœtal Libre (NIPT)",
          "biologicalStage": "Transition Embryon → Fœtus (Stade de Carnegie 23)",
          "lengthMetric": "31 – 35 mm (3.3 cm LCC)",
          "weightMetric": "4,0 g",
          "heartRateBpm": "150 – 170 BPM",
          "keyOrgans": [
            "Ossification Endochondrale",
            "Filtration Glomérulaire des Néphrons",
            "Bourgeons des Dents Lactéales",
            "Villosités Choriales"
          ],
          "fetalMilestones": [
            "La fin de la Semaine 10 marque la transition officielle de l’Embryon au Fœtus : tous les grands systèmes d’organes sont en place.",
            "Les reins métanéphriques commencent à produire une urine fœtale diluée, futur composant principal du liquide amniotique.",
            "L’appendice caudal embryonnaire régresse totalement ; les ongles des doigts et les bourgeons des dents de lait se forment."
          ],
          "maternalPhysiology": "Le trophoblaste placentaire prend progressivement le relais du corps jaune pour la synthèse de progestérone et d’œstradiol (« relais lutéo-placentaire »).",
          "doctorCheckIn": "Ouverture de la fenêtre du test ADN fœtal libre (DPNI / NIPT dès 10+0 SA) : dépiste la trisomie 21 (syndrome de Down, sensibilité >99 % pour la T21), la trisomie 18, la trisomie 13 et les aneuploïdies des chromosomes sexuels.",
          "clinicalPearl": "L’organogenèse structurelle majeure s’achevant à la fin de la Semaine 10, la vulnérabilité aux grands agents tératogènes structurels diminue nettement."
        },
        "11": {
          "phaseLabel": "1er Trimestre — Période Fœtale Précoce",
          "stageTitle": "Réintégration de l’Intestin Moyen, Fusion Palatine et Bouchons Nasaux",
          "biologicalStage": "Fœtus Précoce",
          "lengthMetric": "4.1 – 4.5 cm (LCC)",
          "weightMetric": "7,5 g",
          "heartRateBpm": "145 – 165 BPM",
          "keyOrgans": [
            "Fermeture de la Paroi Abdominale",
            "Fusion du Palais Secondaire",
            "Érythropoïèse Hépatique",
            "Follicules Pileux"
          ],
          "fetalMilestones": [
            "La hernie physiologique de l’intestin moyen se résorbe lorsque l’intestin pivote de 270° dans le sens antihoraire et réintègre l’abdomen fœtal.",
            "Les processus palatins maxillaires s’élèvent et fusionnent sur la ligne médiane pour séparer les cavités buccale et nasale.",
            "Les bourgeons dentaires des 20 dents lactéales (dents de lait) sont formés sous les gencives."
          ],
          "maternalPhysiology": "La résistance vasculaire systémique maternelle diminue sous l’effet de la progestérone et du monoxyde d’azote, pouvant causer de légers vertiges orthostatiques.",
          "doctorCheckIn": "Fenêtre de l’Échographie de Clarté Nucale (CN, de 11+0 à 13+6 SA) et de la biopsie de trophoblaste (PVC, 10–13 SA) si indiquée.",
          "clinicalPearl": "L’hémoglobine fœtale (HbF, alpha-2/gamma-2) possède une affinité pour l’oxygène supérieure à celle de l’adulte (HbA), optimisant le transfert transplacentaire."
        },
        "12": {
          "phaseLabel": "1er Trimestre — Semaine Clé (Clarté Nucale)",
          "stageTitle": "Réflexe de Déglutition, Péristaltisme et Fenêtre de l’Aspirine à Faible Dose",
          "biologicalStage": "Fœtus",
          "lengthMetric": "5.3 – 5.8 cm (LCC)",
          "weightMetric": "14 g (0,5 oz)",
          "heartRateBpm": "140 – 160 BPM",
          "keyOrgans": [
            "Péristaltisme Gastro-Intestinal",
            "Hormones Hypophysaires (ACTH/TSH)",
            "Lymphopoïèse Splénique",
            "Clavicules & Fémurs Ossifiés"
          ],
          "fetalMilestones": [
            "Le fœtus déglutit activement le liquide amniotique ; le muscle lisse intestinal initie le péristaltisme et l’absorption du glucose.",
            "Les centres d’ossification primaire apparaissent dans le crâne, les os longs et les vertèbres.",
            "Les organes génitaux externes débutent leur différenciation morphologique sous l’influence de la DHT."
          ],
          "maternalPhysiology": "Le fond utérin dépasse la symphyse pubienne, devenant un organe abdominal ; la compression vésicale s’atténue temporairement.",
          "doctorCheckIn": "Consultation de 12 SA + Prévention de la pré-éclampsie : L’ACOG et l’USPSTF recommandent de débuter l’aspirine à faible dose (81 mg/jour de 12 SA jusqu’à l’accouchement) en présence de ≥1 facteur de haut risque ou ≥2 facteurs modérés (ex. 1re grossesse, âge ≥35 ans, IMC >30).",
          "clinicalPearl": "Une fois l’activité cardiaque fœtale et l’échographie du 1er trimestre normales à 12 SA, le risque statistique de fausse couche descend sous 1 à 2 %."
        },
        "13": {
          "phaseLabel": "1er Trimestre — Dernière Semaine du 1er Trimestre",
          "stageTitle": "Maturation des Cordes Vocales, Dermatoglyphes et Autonomie Placentaire",
          "biologicalStage": "Fœtus",
          "lengthMetric": "6.7 – 7.4 cm (LCC)",
          "weightMetric": "25 g (0,9 oz)",
          "heartRateBpm": "140 – 160 BPM",
          "keyOrgans": [
            "Unité Fœto-Placentaire",
            "Empreintes Digitales (Crêtes Dermiques)",
            "Pancréas (Sécrétion d’Insuline)",
            "Follicules Ovariens Primordiaux"
          ],
          "fetalMilestones": [
            "Les crêtes épidermiques uniques (empreintes digitales) commencent à se dessiner sur la pulpe des doigts.",
            "Chez les fœtus féminins, les ovogonies prolifèrent dans les ovaires (~2 millions de follicules primordiaux à mi-grossesse).",
            "La croissance de la tête ralentit par rapport au tronc ; la tête représente désormais environ un tiers de la Longueur Cranio-Caudale."
          ],
          "maternalPhysiology": "Les taux d’hCG plafonnent puis diminuent tandis que le placenta assure son autonomie endocrinienne ; les nausées s’estompent et l’énergie revient.",
          "doctorCheckIn": "Dernière semaine pour la mesure de la Clarté Nucale (jusqu’à 13 SA + 6j / LCC ≤84 mm). Planifiez un bilan bucco-dentaire (sûr et recommandé).",
          "clinicalPearl": "La gingivite gravidique est fréquente en raison de la perméabilité vasculaire ; le détartrage et l’anesthésie locale par lidocaïne (sans surcharge systémique en adrénaline) sont tout à fait sûrs."
        },
        "14": {
          "phaseLabel": "2e Trimestre — Entrée dans le 2e Trimestre",
          "stageTitle": "Apparition du Lanugo, Synthèse des Hormones Thyroïdiennes et Expressions Faciales",
          "biologicalStage": "Fœtus du 2e Trimestre",
          "lengthMetric": "8.5 cm (LCC) / ~12 cm (LCT)",
          "weightMetric": "45 g (1,6 oz)",
          "heartRateBpm": "135 – 155 BPM",
          "keyOrgans": [
            "Thyroïde Fœtale (Thyroxine T4)",
            "Nerf Crânien VII (Facial)",
            "Lanugo (Duvet Fœtal)",
            "Prostate / Descente Ovarienne"
          ],
          "fetalMilestones": [
            "La glande thyroïde fœtale commence à capter l’iode et à synthétiser la thyroxine endogène (T4) indispensable au neurodéveloppement.",
            "Le VIIe nerf crânien (nerf facial) innerve les muscles du visage, permettant les premières mimiques et froncements de sourcils.",
            "Un duvet ultra-fin (le lanugo) apparaît pour retenir le vernix caseosa protecteur sur l’épiderme."
          ],
          "maternalPhysiology": "Bienvenue dans le Deuxième Trimestre. L’appétit revient ; le débit cardiaque maternel dépasse de 30 à 40 % son niveau pré-grossesse.",
          "doctorCheckIn": "En cas d’antécédent d’incompétence cervicale ou d’accouchement prématuré spontané <34 SA, discutez de la surveillance de la longueur cervicale ou d’un cerclage prophylactique (généralement posé entre 12 et 14 SA).",
          "clinicalPearl": "Un apport suffisant en iode (220 mcg/jour pendant la grossesse) est essentiel dès la Semaine 14, lorsque la thyroïde fœtale devient active."
        },
        "15": {
          "phaseLabel": "2e Trimestre — Développement Squelettique et Auditif",
          "stageTitle": "Osselets de l’Oreille Moyenne, Mouvements Respiratoires Amniotiques et Fenêtre MSAFP",
          "biologicalStage": "Fœtus",
          "lengthMetric": "10.1 cm (LCC) / ~14.5 cm (LCT)",
          "weightMetric": "70 g (2,5 oz)",
          "heartRateBpm": "135 – 155 BPM",
          "keyOrgans": [
            "Marteau / Enclume / Étrier",
            "Arbre Trachéobronchique",
            "Diaphyses des Os Longs",
            "Bourgeons du Goût"
          ],
          "fetalMilestones": [
            "Les trois osselets de l’oreille moyenne (marteau, enclume, étrier) commencent à s’ossifier, préparant la transmission auditive.",
            "Des mouvements respiratoires fœtaux épisodiques font circuler le liquide amniotique dans l’arbre bronchique, stimulant la croissance pulmonaire.",
            "L’innervation musculaire squelettique se renforce ; les jambes sont désormais plus longues que les bras."
          ],
          "maternalPhysiology": "La stimulation mélanocytaire par les œstrogènes peut faire apparaître la linea nigra abdominale et un masque de grossesse (mélasma).",
          "doctorCheckIn": "Ouverture de la fenêtre du dosage de l’alpha-fœtoprotéine sérique maternelle (MSAFP, Semaines 15–20) pour dépister les anomalies ouvertes du tube neural.",
          "clinicalPearl": "Position de sommeil : Dès le milieu du 2e trimestre, privilégiez le couchage sur le côté (surtout gauche) afin d’éviter la compression de la veine cave inférieure."
        },
        "16": {
          "phaseLabel": "2e Trimestre — Cap du 4e Mois (Premiers Mouvements)",
          "stageTitle": "Mouvements Oculaires Saccadiques, Flexion Coordonnée et Premiers Mouvements Fœtaux",
          "biologicalStage": "Fœtus",
          "lengthMetric": "11.6 cm (LCC) / ~16.5 cm (LCT)",
          "weightMetric": "100 g (3,5 oz)",
          "heartRateBpm": "130 – 155 BPM",
          "keyOrgans": [
            "Muscles Extra-Oculaires",
            "Gelée de Wharton du Cordon",
            "Cycle Vésical Fœtal",
            "Récepteurs Sensoriels Cutanés"
          ],
          "fetalMilestones": [
            "De lents mouvements oculaires saccadiques débutent sous les paupières fusionnées à mesure que les noyaux oculomoteurs mûrissent.",
            "Le cœur fœtal pompe ~24 litres (~25 qt) de sang par jour dans le cordon ombilical à 3 vaisseaux (2 artères et 1 veine protégées par la gelée de Wharton).",
            "La vessie fœtale se remplit et se vide toutes les 30 à 45 minutes, maintenant le volume de liquide amniotique."
          ],
          "maternalPhysiology": "Les multipares (ou en cas de placenta postérieur) peuvent percevoir les premiers mouvements fœtaux subtils entre 16 et 20 SA.",
          "doctorCheckIn": "Consultation de 16 SA : Tension artérielle, poids, bandelette urinaire, écoute du rythme cardiaque fœtal au Doppler et prise de rendez-vous pour l’échographie morphologique de 20 SA.",
          "clinicalPearl": "Si vous avez un placenta antérieur (inséré sur la paroi avant de l’utérus), il agit comme un coussin et retarde souvent la perception des premiers mouvements jusqu’à 20–22 SA — c’est tout à fait normal."
        },
        "17": {
          "phaseLabel": "2e Trimestre — Maturation Adipeuse et Immunitaire",
          "stageTitle": "Dépôt de Tissu Adipeux Brun et Début du Transfert Transplacentaire d’IgG",
          "biologicalStage": "Fœtus",
          "lengthMetric": "13.0 cm (LCC) / ~18.5 cm (LCT)",
          "weightMetric": "140 g (5,0 oz)",
          "heartRateBpm": "130 – 155 BPM",
          "keyOrgans": [
            "Tissu Adipeux Brun (TAB)",
            "Cellules Ciliées Cochléaires",
            "Glandes Sudoripares",
            "Récepteurs Placentaires FcRn d’IgG"
          ],
          "fetalMilestones": [
            "Le Tissu Adipeux Brun commence à se déposer autour du cou, du sternum et des reins pour la thermogenèse postnatale.",
            "Les récepteurs placentaires FcRn initient le transport actif des anticorps IgG maternels vers la circulation fœtale.",
            "Les cellules ciliées cochléaires s’alignent dans l’organe de Corti ; les bruits internes maternels stimulent l’oreille interne."
          ],
          "maternalPhysiology": "L’étirement du ligament rond peut provoquer de brèves douleurs vives à l’aine en se retournant, en toussant ou en se levant.",
          "doctorCheckIn": "Fenêtre Diagnostique d’Amniocentèse (Semaines 15–20) : Proposée en cas de dépistage à risque élevé ou d’anomalie échographique.",
          "clinicalPearl": "La douleur ligamentaire est brève (quelques secondes) et liée au mouvement. Des contractions régulières ou accompagnées de saignements imposent un avis médical."
        },
        "18": {
          "phaseLabel": "2e Trimestre — Expansion Neuro-Sensorielle",
          "stageTitle": "Début de la Myélinisation, Vernix Caseosa et Ouverture de l’Échographie Morphologique",
          "biologicalStage": "Fœtus",
          "lengthMetric": "14.2 cm (LCC) / ~20.5 cm (LCT)",
          "weightMetric": "190 g (6,7 oz)",
          "heartRateBpm": "125 – 155 BPM",
          "keyOrgans": [
            "Myélinisation des Cellules de Schwann",
            "Glandes Sébacées (Vernix)",
            "Voies d’Éjection Cardiaques",
            "Corps Calleux"
          ],
          "fetalMilestones": [
            "Les glandes sébacées sécrètent le Vernix Caseosa, un biofilm lipidique et antimicrobien qui protège la peau fœtale.",
            "Les cellules de Schwann et les oligodendrocytes débutent la myélinisation des axones pour accélérer la conduction nerveuse.",
            "Les 4 cavités cardiaques et les voies d’éjection sont désormais nettement visibles à l’échographie."
          ],
          "maternalPhysiology": "Nadir physiologique de la tension artérielle à mi-grossesse : la vasodilatation abaisse la pression artérielle de 5 à 10 mmHg vers 18–20 SA.",
          "doctorCheckIn": "Ouverture de la fenêtre de l’Échographie Morphologique du 2e Trimestre (Semaines 18–22), idéalement réalisée entre 19 SA et 21 SA.",
          "clinicalPearl": "Lors de l’échographie morphologique, la mesure de la longueur cervicale (normale ≥25 mm entre 18 et 24 SA) permet de dépister le risque d’accouchement prématuré."
        },
        "19": {
          "phaseLabel": "2e Trimestre — Cartographie Corticale Sensorielle",
          "stageTitle": "Cartographie du Cortex Somatosensoriel et Concentration Tubulaire Rénale",
          "biologicalStage": "Fœtus",
          "lengthMetric": "15.3 cm (LCC) / ~22.5 cm (LCT)",
          "weightMetric": "240 g (8,5 oz)",
          "heartRateBpm": "125 – 155 BPM",
          "keyOrgans": [
            "Cortex Somatosensoriel",
            "Anses de Henlé Rénales",
            "Bourgeons des Dents Définitives",
            "Ramification Bronchiolaire"
          ],
          "fetalMilestones": [
            "Les projections thalamocorticales atteignent la sous-plaque du cortex cérébral, posant les bases du traitement auditif, visuel et tactile.",
            "Les bourgeons des dents définitives se forment derrière ceux des dents de lait dans les maxillaires.",
            "Le stade canaliculaire du développement pulmonaire débute : les bronchioles respiratoires se divisent et les capillaires prolifèrent."
          ],
          "maternalPhysiology": "Le volume sanguin maternel a augmenté de 30 à 35 % ; les besoins accrus en fer nécessitent un apport régulier.",
          "doctorCheckIn": "Préparez vos questions pour la consultation de 20 SA et l’échographie morphologique (position du placenta par rapport au col, cordon à 3 vaisseaux).",
          "clinicalPearl": "Si un placenta est dit « bas inséré » à 19–20 SA, plus de 90 % remontent spontanément d’ici 32 SA grâce à l’étirement du segment inférieur de l’utérus."
        },
        "20": {
          "phaseLabel": "2e Trimestre — Cap de la Mi-Grossesse",
          "stageTitle": "Cap de la Mi-Grossesse : Échographie Morphologique de Niveau II et Fond Utérin à l’Ombilic",
          "biologicalStage": "Fœtus de Mi-Grossesse",
          "lengthMetric": "25.5 cm (10.0 in Longueur Tête-Talon)",
          "weightMetric": "300 g (10,6 oz)",
          "heartRateBpm": "120 – 155 BPM",
          "keyOrgans": [
            "Coupe des 4 Cavités & Gros Vaisseaux",
            "Fosse Postérieure / Cervelet",
            "Accumulation de Méconium",
            "Stratum Corneum Épidermique"
          ],
          "fetalMilestones": [
            "À partir de 20 SA, les obstétriciens mesurent la longueur totale tête-talons (CHL) plutôt que la longueur cranio-caudale car les jambes du fœtus se déplient.",
            "Le méconium stérile (cellules épithéliales desquamées, lanugo, pigments biliaires et liquide amniotique) s’accumule dans le côlon fœtal.",
            "Des cycles veille-sommeil émergent : le fœtus alterne des périodes de 20 à 40 minutes d’activité et de sommeil calme."
          ],
          "maternalPhysiology": "Le fond utérin atteint le niveau du nombril maternel. Entre 20 et 36 SA, la hauteur utérine en centimètres correspond approximativement au terme (±2 cm).",
          "doctorCheckIn": "Consultation de 20 SA et Échographie Morphologique du 2e Trimestre (18–22 SA) : Examen anatomique complet du cerveau, du profil/lèvres, du cœur (4 cavités et gros vaisseaux), de l’estomac, des reins, de la colonne, du cordon à 3 vaisseaux, du placenta et du col.",
          "clinicalPearl": "Pourquoi la tension artérielle après 20 SA est déterminante : Une hypertension apparue à partir de 20 SA (TA ≥140/90) définit le seuil diagnostique de l’hypertension gravidique ou de la pré-éclampsie."
        },
        "21": {
          "phaseLabel": "2e Trimestre — Transition Hématopoïétique Médullaire",
          "stageTitle": "Hématopoïèse Médullaire et Maturation des Enzymes Digestives",
          "biologicalStage": "Fœtus",
          "lengthMetric": "26.7 cm (10.5 in LCT)",
          "weightMetric": "360 g (12,7 oz)",
          "heartRateBpm": "120 – 155 BPM",
          "keyOrgans": [
            "Érythropoïèse Médullaire",
            "Villosités de l’Intestin Grêle",
            "Pulpe Rouge Splénique",
            "Labyrinthe Vestibulaire"
          ],
          "fetalMilestones": [
            "Le tube digestif absorbe l’eau et les sucres du liquide amniotique dégluti (~24 L / ~25 qt filtrés au cours de la grossesse).",
            "Les microvillosités intestinales expriment des enzymes disaccharidases (lactase, sucrase), absorbant l’eau et les électrolytes du liquide amniotique.",
            "Les canaux semi-circulaires vestibulaires de l’oreille interne perçoivent les mouvements maternels, berçant le fœtus lorsque vous marchez."
          ],
          "maternalPhysiology": "L’hormone relaxine assouplit la symphyse pubienne et les articulations sacro-iliaques, pouvant occasionner une légère gêne pelvienne.",
          "doctorCheckIn": "Si certaines structures étaient masquées par la position fœtale lors de l’échographie de 20 SA, un contrôle ciblé est programmé sous 2 à 4 semaines.",
          "clinicalPearl": "Pourquoi bébé semble plus actif le soir : La marche diurne le berce et l’endort ; lorsque vous vous allongez au calme, son éveil est maximal."
        },
        "22": {
          "phaseLabel": "2e Trimestre — Intégration Auditive et Tactile",
          "stageTitle": "Reconnaissance Auditive de la Voix, Sourcils et Réflexe d’Agrippement",
          "biologicalStage": "Fœtus",
          "lengthMetric": "27.8 cm (10.9 in LCT)",
          "weightMetric": "430 g (15,2 oz)",
          "heartRateBpm": "120 – 155 BPM",
          "keyOrgans": [
            "Voie Cochlée-Cortex Auditif",
            "Réflexe d’Agrippement Palmaire",
            "Canaux Lacrymaux",
            "Ébauches des Canaux Alvéolaires"
          ],
          "fetalMilestones": [
            "Les réponses auditives du tronc cérébral mûrissent ; le fœtus entend et commence à reconnaître l’intonation de la voix maternelle.",
            "Le réflexe d’agrippement palmaire se développe — le fœtus saisit souvent le cordon ombilical (protégé par la gelée de Wharton).",
            "Les sourcils et les cheveux fins sont visibles, bien que la mélanine ne soit pas encore totalement déposée."
          ],
          "maternalPhysiology": "Hémodilution physiologique : le volume plasmatique augmente plus vite (~45–50 %) que la masse érythrocytaire (~25–30 %), abaissant physiologiquement l’hémoglobine.",
          "doctorCheckIn": "Si indiqué (FIV, diabète préexistant ou antécédent familial de cardiopathie), une échocardiographie fœtale spécialisée est réalisée vers 20–22 SA.",
          "clinicalPearl": "Des contractions de Braxton Hicks (durcissements utérins indolores et irréguliers <30 s) peuvent apparaître et cèdent au repos et à l’hydratation."
        },
        "23": {
          "phaseLabel": "2e Trimestre — Seuil Pulmonaire Périviable",
          "stageTitle": "Pneumocytes de Type II et Synthèse Initiale des Lipoprotéines du Surfactant",
          "biologicalStage": "Fœtus (Seuil de Viabilité)",
          "lengthMetric": "28.9 cm (11.4 in LCT)",
          "weightMetric": "500 g (1,1 lb)",
          "heartRateBpm": "120 – 155 BPM",
          "keyOrgans": [
            "Pneumocytes Alvéolaires de Type II",
            "Lit Capillaire Pulmonaire",
            "Sommeil Paradoxal (REM)",
            "Îlots de Langerhans"
          ],
          "fetalMilestones": [
            "Les pneumocytes de Type II se différencient dans les voies aériennes distales et commencent à synthétiser les corps lamellaires du surfactant.",
            "Les capillaires pulmonaires s’accolent à l’épithélium respiratoire, établissant la barrière alvéolo-capillaire primitive.",
            "Les cycles de sommeil paradoxal (REM) débutent, essentiels à la maturation des circuits neuronaux du cortex."
          ],
          "maternalPhysiology": "Le refoulement de l’estomac et le relâchement du sphincter inférieur de l’œsophage par la progestérone peuvent provoquer un reflux gastro-œsophagien.",
          "doctorCheckIn": "Connaissez les signes de menace d’accouchement prématuré : contractions régulières (>4–6 par heure), douleurs lombaires basses ou modification des pertes vaginales.",
          "clinicalPearl": "Les Semaines 23–24 correspondent au seuil de viabilité périnatale, où la corticothérapie anténatale (bétaméthasone) accélère la maturation pulmonaire en cas de menace d’accouchement prématuré."
        },
        "24": {
          "phaseLabel": "2e Trimestre — Seuil de Viabilité & Dépistage Glycémique",
          "stageTitle": "Transition Pulmonaire Sacculaire, Seuil de Viabilité et Ouverture du Dépistage du Diabète (GCT)",
          "biologicalStage": "Fœtus",
          "lengthMetric": "30.0 cm (11.8 in LCT)",
          "weightMetric": "600 g (1,32 lb)",
          "heartRateBpm": "120 – 155 BPM",
          "keyOrgans": [
            "Saccules Terminaux (Poumons)",
            "Système Vestibulaire de l’Oreille Interne",
            "Cellules Bêta Pancréatiques Fœtales",
            "Capillaires Cutanés"
          ],
          "fetalMilestones": [
            "Les poumons passent du stade canaliculaire au stade sacculaire : des saccules terminaux bourgeonnent au bout des bronchioles respiratoires.",
            "L’appareil vestibulaire de l’oreille interne est mature, donnant au fœtus le sens de l’orientation spatiale.",
            "Les lits capillaires sous-cutanés se remplissent de sang, donnant à la peau fœtale une teinte rosée."
          ],
          "maternalPhysiology": "La sécrétion placentaire d’hormone lactogène placentaire (hPL) et de cortisol augmente, créant une insulinorésistance physiologique pour transférer le glucose au fœtus.",
          "doctorCheckIn": "Consultation de 24 SA + Ouverture du Dépistage du Diabète Gestationnel (24–28 SA) : Prescription du test oral de charge en glucose à 1 heure avec 50 g (GCT) et de la NFS / RAI du 3e trimestre.",
          "clinicalPearl": "Pourquoi dépister le diabète gestationnel entre 24 et 28 SA : Les hormones placentaires anti-insuline (hPL) augmentent fortement à 24 SA, révélant une insuffisance bêta-pancréatique dans ~6–9 % des grossesses."
        },
        "25": {
          "phaseLabel": "2e Trimestre — Vascularisation Pulmonaire & Perméabilité Nasale",
          "stageTitle": "Dissolution des Bouchons Nasaux, Arborisation Capillaire et Ossification Vertébrale",
          "biologicalStage": "Fœtus",
          "lengthMetric": "34.6 cm (13.6 in LCT)",
          "weightMetric": "660 g (1,45 lb)",
          "heartRateBpm": "120 – 155 BPM",
          "keyOrgans": [
            "Narines Perméables",
            "Surfactant Pulmonaire (SP-B/SP-C)",
            "Ossification de l’Arc Vertébral",
            "Circuits de Latéralité Manuelle"
          ],
          "fetalMilestones": [
            "Les bouchons épithéliaux des narines se dissolvent, ouvrant les voies nasales pour les mouvements respiratoires amniotiques.",
            "Les protéines du surfactant B et C (SP-B, SP-C) augmentent au sein des pneumocytes de Type II.",
            "La colonne vertébrale (33 vertèbres, 150 articulations, 1 000 ligaments) se consolide pour soutenir la croissance corporelle."
          ],
          "maternalPhysiology": "La pression veineuse dans les membres inférieurs augmente, pouvant causer des crampes nocturnes aux mollets ou un léger œdème des chevilles le soir.",
          "doctorCheckIn": "Réalisez votre test de dépistage du glucose à 1 heure (50 g) ou HGPO entre 24 et 28 SA. Vous n’avez pas besoin d’être à jeun pour le test de dépistage à 1 heure sauf avis contraire.",
          "clinicalPearl": "Si le test de dépistage à 1 heure est ≥135–140 mg/dL, ne paniquez pas : il s’agit d’un test de dépistage et non d’un diagnostic. Environ 75 à 80 % des patientes qui passent l’HGPO diagnostique de 3 heures avec 100 g à jeun ont un résultat normal."
        },
        "26": {
          "phaseLabel": "2e Trimestre — Éveil Visuel & Ouverture des Paupières",
          "stageTitle": "Ouverture des Paupières, Réflexe de Clignement-Sursaut et Bâtonnets Rétiniens",
          "biologicalStage": "Fœtus",
          "lengthMetric": "35.6 cm (14.0 in LCT)",
          "weightMetric": "760 g (1,68 lb)",
          "heartRateBpm": "120 – 155 BPM",
          "keyOrgans": [
            "Photorécepteurs Rétiniens",
            "Myélinisation du Nerf Optique",
            "Réflexe de Sursaut Vibro-Acoustique",
            "Descente Inguinale Testiculaire"
          ],
          "fetalMilestones": [
            "Les paupières fusionnées s’ouvrent pour la première fois depuis la Semaine 9 ; le fœtus cligne des yeux en réponse à la lumière ou aux sons.",
            "Les bâtonnets et les cônes rétiniens se différencient au fond de l’œil.",
            "Chez les fœtus masculins, le gubernaculum guide les testicules dans le canal inguinal vers le scrotum."
          ],
          "maternalPhysiology": "La circonférence de la cage thoracique s’élargit de 5 à 7 cm tandis que le diaphragme remonte de ~4 cm ; le volume courant augmente de 30 à 40 %.",
          "doctorCheckIn": "Vérifiez avec votre praticien vos résultats d’hémoglobine et de ferritine pour dépister une anémie ferriprive (Hb <10,5 g/dL au 2e trimestre ou <11,0 g/dL au 3e).",
          "clinicalPearl": "Prendre le fer oral avec de la vitamine C ou un jour sur deux améliore son absorption duodénale et limite la constipation."
        },
        "27": {
          "phaseLabel": "2e Trimestre — Dernière Semaine du 2e Trimestre",
          "stageTitle": "Voies Thalamocorticales de la Douleur, Hoquet Fœtal et Ouverture de la Vaccination dTca (Tdap)",
          "biologicalStage": "Fœtus",
          "lengthMetric": "36.6 cm (14.4 in LCT)",
          "weightMetric": "875 g (1,93 lb)",
          "heartRateBpm": "120 – 155 BPM",
          "keyOrgans": [
            "Début des Circonvolutions Cérébrales",
            "Nerf Phrénique / Diaphragme",
            "Rate & Thymus Fœtaux",
            "Tissu Adipeux Blanc Sous-Cutané"
          ],
          "fetalMilestones": [
            "Les spasmes diaphragmatiques rythmiques (hoquet fœtal) deviennent fréquents et sont perçus comme de petits soubresauts réguliers.",
            "Les hémisphères cérébraux commencent à former des sillons et circonvolutions primaires pour accroître la surface corticale.",
            "Les lymphocytes T mûrissent dans le thymus fœtal."
          ],
          "maternalPhysiology": "À la fin du 2e trimestre, le fond utérin se situe ~7 cm au-dessus de l’ombilic ; une rétention d’eau peut provoquer de légers fourmillements du canal carpien.",
          "doctorCheckIn": "Ouverture de la Fenêtre Vaccinale dTca (27–36 SA) : Le CDC et l’ACOG recommandent le vaccin dTca à CHAQUE grossesse entre 27 et 36 SA (idéalement entre 27 et 30 SA) pour maximiser le transfert d’anticorps IgG maternels contre la coqueluche au nouveau-né.",
          "clinicalPearl": "Le hoquet fœtal est un signe tout à fait normal de maturation du nerf phrénique ; il se ressent comme des secousses régulières durant 5 à 15 minutes."
        },
        "28": {
          "phaseLabel": "3e Trimestre — Entrée dans le 3e Trimestre & Suivi Bimensuel",
          "stageTitle": "Entrée dans le 3e Trimestre, Prophylaxie RhoGAM et Comptage Quotidien des Mouvements",
          "biologicalStage": "Fœtus du 3e Trimestre",
          "lengthMetric": "37.6 cm (14.8 in LCT)",
          "weightMetric": "1 005 g (2,22 lb — Cap de 1 kg !)",
          "heartRateBpm": "115 – 155 BPM",
          "keyOrgans": [
            "Réflexe Pupillaire à la Lumière",
            "Synthèse de Lécithine du Surfactant",
            "Folias Cérébelleuses",
            "Expression de l’Antigène Rh(D)"
          ],
          "fetalMilestones": [
            "Le fœtus franchit le cap de 1 kilogramme (2,2 lb) ; le tissu adipeux blanc sous-cutané atteint ~2–3 % du poids corporel.",
            "Les pupilles réagissent à la lumière ; les cycles de sommeil montrent des tracés distincts de sommeil paradoxal (REM) et calme.",
            "La production de surfactant pulmonaire s’accélère, augmentant le rapport lécithine/sphingomyéline (L/S)."
          ],
          "maternalPhysiology": "Bienvenue dans le Troisième Trimestre. Le débit sanguin utérin atteint ~500–700 mL/minute (~80 % perfusant le placenta).",
          "doctorCheckIn": "Consultation de 28 SA (Passage à un suivi toutes les 2 semaines) : Analyse du test de glycémie à 1 heure, vaccination dTca, injection d’immunoglobulines anti-D (RhoGAM 300 mcg IM) si mère Rhésus négatif et début du comptage quotidien des mouvements fœtaux.",
          "clinicalPearl": "Protocole ACOG de Comptage des Mouvements (Dès 28 SA) : Une fois par jour (après un repas), allongez-vous sur le côté et notez le temps nécessaire pour percevoir 10 mouvements distincts (coups, roulades — sans compter le hoquet). Le délai normal est <2 heures (souvent <30 min). Si <10 mouvements en 2 heures, consultez immédiatement la maternité."
        },
        "29": {
          "phaseLabel": "3e Trimestre — Minéralisation Squelettique Accélérée",
          "stageTitle": "Accrétion Rapide du Calcium et Thermorégulation Hypothalamique",
          "biologicalStage": "Fœtus",
          "lengthMetric": "38.6 cm (15.2 in LCT)",
          "weightMetric": "1 150 g (2,54 lb)",
          "heartRateBpm": "115 – 155 BPM",
          "keyOrgans": [
            "Accrétion Calcique Ostéoblastique",
            "Noyau Préoptique Hypothalamique",
            "Synthèse Surrénalienne de DHEA-S",
            "Septation Alvéolaire"
          ],
          "fetalMilestones": [
            "Le placenta transfère activement ~250–300 mg de calcium par jour de la circulation maternelle vers le squelette fœtal.",
            "L’hypothalamus affine ses circuits centraux de thermorégulation.",
            "Les glandes surrénales fœtales sécrètent du DHEA-S, converti en œstriol par le placenta."
          ],
          "maternalPhysiology": "La prise de poids fœtale et la lordose lombaire déplacent votre centre de gravité ; des chaussures adaptées et des bascules du bassin soulagent le dos.",
          "doctorCheckIn": "Pas de consultation programmée cette semaine (suivi bi-mensuel : prochain rendez-vous à 30 SA). Poursuivez le comptage quotidien des mouvements fœtaux.",
          "clinicalPearl": "Au 3e trimestre, le fœtus constitue 80 % de ses réserves en calcium osseux et en fer — visez 1 000 mg/jour de calcium alimentaire et un apport régulier en fer."
        },
        "30": {
          "phaseLabel": "3e Trimestre — Plissement Cortical & Dominance Médullaire",
          "stageTitle": "Approfondissement des Circonvolutions Cérébrales, Dominance Médullaire et Pic Amniotique",
          "biologicalStage": "Fœtus",
          "lengthMetric": "39.9 cm (15.7 in LCT)",
          "weightMetric": "1 320 g (2,91 lb)",
          "heartRateBpm": "115 – 155 BPM",
          "keyOrgans": [
            "Sillons Cérébraux Secondaires et Tertiaires",
            "Moelle Osseuse Hématopoïétique",
            "Cycles Respiratoires Diaphragmatiques",
            "Début de la Chute du Lanugo"
          ],
          "fetalMilestones": [
            "Le cortex cérébral connaît une gyrification rapide, formant de profonds sillons secondaires nécessaires aux fonctions cognitives.",
            "La moelle osseuse est désormais l’organe hématopoïétique principal ; les globules rouges fœtaux ont une durée de vie de ~60–90 jours.",
            "À mesure que le tissu adipeux s’épaissit, le lanugo commence à se détacher dans le liquide amniotique."
          ],
          "maternalPhysiology": "Le volume de liquide amniotique approche de son pic physiologique (~800–1 000 mL entre 30 et 34 SA) avant de diminuer doucement jusqu’au terme.",
          "doctorCheckIn": "Consultation de 30 SA : Tension artérielle, bandelette urinaire, mesure de la hauteur utérine (~28–32 cm), rythme cardiaque fœtal et prévention de la prématurité.",
          "clinicalPearl": "Si la hauteur utérine s’écarte de plus de 3 cm par rapport au terme, une échographie de croissance fœtale et de mesure du liquide amniotique sera prescrite."
        },
        "31": {
          "phaseLabel": "3e Trimestre — Synaptogenèse & Essor Lipidique",
          "stageTitle": "Des Milliers de Milliards de Connexions Synaptiques et Accrétion Cérébrale de DHA",
          "biologicalStage": "Fœtus",
          "lengthMetric": "41.1 cm (16.2 in LCT)",
          "weightMetric": "1 500 g (3,31 lb)",
          "heartRateBpm": "115 – 155 BPM",
          "keyOrgans": [
            "Boucle Rétine-Cortex Visuel",
            "Membranes Phospholipidiques riches en DHA",
            "Filtration Glomérulaire Rénale",
            "Coordination Succion-Déglutition"
          ],
          "fetalMilestones": [
            "Le cerveau fœtal accumule ~50–70 mg/jour d’oméga-3 DHA dans les membranes neuronales et les photorécepteurs rétiniens.",
            "Les cinq sens (vue, ouïe, goût, odorat via le liquide amniotique et toucher) sont fonctionnellement actifs.",
            "Le fœtus prend environ 150–200 grammes (0,35–0,5 lb) par semaine d’ici le terme."
          ],
          "maternalPhysiology": "Le colostrum (riche en immunoglobulines A) est synthétisé dans les alvéoles mammaires ; quelques gouttes peuvent parfois perler.",
          "doctorCheckIn": "En cas de grossesse à haut risque (âge ≥35–40 ans, diabète gestationnel sous traitement, hypertension chronique ou grossesse gémellaire), la surveillance par monitoring fœtal (NST) ou profil biophysique (BPP) hebdomadaire débute généralement à 32 SA.",
          "clinicalPearl": "Éveil gustatif in utero : Les arômes de l’alimentation maternelle passent dans le liquide amniotique et familiarisent déjà le fœtus aux saveurs."
        },
        "32": {
          "phaseLabel": "3e Trimestre — Présentation Céphalique & Protection VRS",
          "stageTitle": "Version Céphalique, Ongles des Mains Complets et Fenêtre du Vaccin VRS",
          "biologicalStage": "Fœtus (Phase de Présentation Céphalique)",
          "lengthMetric": "42.4 cm (16.7 in LCT)",
          "weightMetric": "1 700 g (3,75 lb)",
          "heartRateBpm": "110 – 155 BPM",
          "keyOrgans": [
            "Présentation Céphalique",
            "Phosphatidylglycérol du Surfactant",
            "Lit Unguéal Complet",
            "Pic de Transfert Materno-Fœtal d’IgG"
          ],
          "fetalMilestones": [
            "Environ 85 à 90 % des fœtus se placent en présentation céphalique (tête en bas) pour épouser la forme de l’utérus.",
            "Les ongles des mains atteignent le bout des doigts ; la peau devient lisse tandis que le tissu adipeux représente ~7–8 % du poids.",
            "Les mouvements respiratoires fœtaux surviennent 30 à 40 % du temps de sommeil actif, un critère clé du profil biophysique."
          ],
          "maternalPhysiology": "Le volume plasmatique maternel atteint son expansion maximale (+45 à 50 % par rapport à l’état pré-gravidique).",
          "doctorCheckIn": "Consultation de 32 SA + Ouverture de la Fenêtre Vaccinale VRS Maternel (32–36 SA) : Le CDC et l’ACOG recommandent 1 dose du vaccin maternel contre le VRS (Abrysvo) entre 32w0d et 36w6d durant la saison épidémique pour protéger le nouveau-né contre les bronchiolites graves.",
          "clinicalPearl": "Pourquoi les mouvements changent après 32 SA : L’espace utérin se réduisant, les grands coups laissent place à des étirements et roulements amples — mais la fréquence quotidienne ne doit PAS diminuer !"
        },
        "33": {
          "phaseLabel": "3e Trimestre — Immunité IgG & Souplesse Crânienne",
          "stageTitle": "Fontanelles Crâniennes, Pic de Transfert d’IgG et Coordination de la Succion",
          "biologicalStage": "Fœtus",
          "lengthMetric": "43.7 cm (17.2 in LCT)",
          "weightMetric": "1 920 g (4,23 lb)",
          "heartRateBpm": "110 – 155 BPM",
          "keyOrgans": [
            "Fontanelles Antérieure et Postérieure",
            "Triade Succion-Déglutition-Respiration",
            "Néphrogenèse Presque Complète",
            "Transport Placentaire d’IgG"
          ],
          "fetalMilestones": [
            "Tandis que les os longs sont bien calcifiés, les os du crâne restent séparés par des sutures fibreuses et des fontanelles pour faciliter le passage dans la filière pelvienne.",
            "Les taux d’anticorps IgG transplacentaires chez le fœtus atteignent et dépasseront bientôt ceux de la mère.",
            "Les anticorps maternels IgG traversent activement le placenta, offrant une immunité passive au nouveau-né pour ses 6 premiers mois."
          ],
          "maternalPhysiology": "Le fond utérin approche de l’appendice xiphoïde ; fractionner les repas et surélever la tête du lit soulagent le reflux.",
          "doctorCheckIn": "Choisissez le pédiatre qui suivra votre enfant et installez le siège-auto dos à la route.",
          "clinicalPearl": "Les accélérations du rythme cardiaque fœtal (hausse ≥15 BPM durant ≥15 secondes lors d’un mouvement) témoignent d’une excellente oxygénation fœtale."
        },
        "34": {
          "phaseLabel": "3e Trimestre — Seuil Prématuré Tardif & Néphrogenèse Complète",
          "stageTitle": "Achèvement de la Néphrogenèse Définitive et Poussée de Surfactant",
          "biologicalStage": "Fœtus Prématuré Tardif",
          "lengthMetric": "45.0 cm (17.7 in LCT)",
          "weightMetric": "2 150 g (4,74 lb)",
          "heartRateBpm": "110 – 155 BPM",
          "keyOrgans": [
            "1 Million de Néphrons par Rein",
            "Surfactant de Phosphatidylcholine",
            "Épaississement du Vernix Caseosa",
            "Descente Testiculaire dans le Scrotum"
          ],
          "fetalMilestones": [
            "La néphrogenèse humaine (formation des néphrons) s’achève définitivement entre 34 et 36 SA avec ~1 million de néphrons par rein.",
            "La sécrétion de surfactant pulmonaire bondit ; les enfants nés à partir de 34 SA ont un taux de survie >98 %.",
            "L’enduit de vernix caseosa est épais et crémeux ; les ongles des mains et des pieds sont bien formés."
          ],
          "maternalPhysiology": "Un léger œdème des chevilles le soir est fréquent, mais un gonflement brutal du visage ou des mains avec céphalées ou troubles visuels impose un contrôle tensionnel immédiat.",
          "doctorCheckIn": "Consultation de 34 SA : Tension artérielle, hauteur utérine, bruits du cœur, manœuvres de Leopold pour vérifier la présentation et revue du projet de naissance.",
          "clinicalPearl": "34 SA marque un cap obstétrical majeur : au-delà de 34 SA, la tocolyse pour freiner un travail spontané n’est généralement plus indiquée."
        },
        "35": {
          "phaseLabel": "3e Trimestre — Maturité Hépatique & Réserve Métabolique",
          "stageTitle": "Réserves Hépatiques de Glycogène, Stocks de Fer et Prise Adipeuse Rapide",
          "biologicalStage": "Fœtus",
          "lengthMetric": "46.2 cm (18.2 in LCT)",
          "weightMetric": "2 385 g (5,25 lb)",
          "heartRateBpm": "110 – 150 BPM",
          "keyOrgans": [
            "Réserves Hépatiques en Glycogène et Fer",
            "Conjugaison de la Bilirubine (UGT1A1)",
            "Graisse Sous-Cutanée (10 % du Poids)",
            "Réflexe de Succion Coordonné"
          ],
          "fetalMilestones": [
            "Le foie fœtal stocke rapidement du glycogène (pour maintenir la glycémie après le clampage du cordon) et de la ferritine.",
            "Les reins et le foie sont structurellement complets et affinent leurs voies enzymatiques (comme l’UGT1A1 pour la bilirubine).",
            "Le fœtus gagne ~30 grammes (1 oz) de tissu adipeux chaque jour."
          ],
          "maternalPhysiology": "La pesanteur pelvienne augmente à mesure que le segment inférieur s’étire ; les envies fréquentes d’uriner reviennent avec la descente de la tête.",
          "doctorCheckIn": "La semaine prochaine (36 SA) marque le passage aux consultations HEBDOMADAIRES et inclut le prélèvement du Streptocoque du Groupe B (SGB).",
          "clinicalPearl": "Préparez votre valise de maternité dès 35 SA (pièce d’identité, dossier obstétrical, projet de naissance, soutiens-gorge d’allaitement, chargeur, trousseau de naissance)."
        },
        "36": {
          "phaseLabel": "3e Trimestre — Consultations Hebdomadaires & Dépistage SGB",
          "stageTitle": "Stade Pulmonaire Alvéolaire, Dépistage du SGB (GBS) et Engagement Fœtal",
          "biologicalStage": "Fœtus Prématuré Tardif (Passage au Suivi Hebdomadaire)",
          "lengthMetric": "47.4 cm (18.7 in LCT)",
          "weightMetric": "2 620 g (5,78 lb)",
          "heartRateBpm": "110 – 150 BPM",
          "keyOrgans": [
            "Alvéoles Pulmonaires Vraies",
            "Desquamation du Vernix dans le Liquide Amniotique",
            "Engagement Céphalique Pelvien",
            "Côlon Rempli de Méconium"
          ],
          "fetalMilestones": [
            "Les poumons entrent dans le Stade Alvéolaire final (de 36 SA à la petite enfance), formant de véritables alvéoles prêtes pour les échanges gazeux.",
            "Le vernix et le lanugo détachés dans le liquide amniotique sont déglutis par le fœtus pour former le méconium.",
            "Lors d’une première grossesse, la tête fœtale commence souvent à descendre dans le bassin."
          ],
          "maternalPhysiology": "Lorsque le bébé descend, la pression sous les côtes s’allège (facilitant la respiration), tandis que la pesanteur pelvienne augmente.",
          "doctorCheckIn": "Consultation de 36 SA (Début du suivi hebdomadaire !) : Prélèvement vaginal du Streptocoque du Groupe B (SGB, réalisé entre 36w0d et 37w6d) et confirmation de la présentation céphalique.",
          "clinicalPearl": "Pourquoi dépister le Streptocoque B (SGB) entre 36 et 37 SA : ~25 % des adultes en bonne santé sont porteurs asymptomatiques. En cas de positivité, l’antibioprophylaxie IV pendant le travail réduit de >80 % le risque d’infection néonatale précoce. Si le fœtus est en siège à 36 SA, une version par manœuvre externe (VME) est discutée pour 37 SA."
        },
        "37": {
          "phaseLabel": "3e Trimestre — Terme Précoce (37 SA–38 SA + 6j)",
          "stageTitle": "Cap du Terme Précoce, Fenêtre de VME et Règle du Travail Actif (5-1-1)",
          "biologicalStage": "Fœtus à Terme Précoce",
          "lengthMetric": "48.6 cm (19.1 in LCT)",
          "weightMetric": "2 860 g (6,30 lb)",
          "heartRateBpm": "110 – 150 BPM",
          "keyOrgans": [
            "Rapport L/S du Surfactant Mature ≥2:1",
            "Faisceaux Corticospinaux Myélinisés",
            "Perméabilité du Canal Artériel",
            "Boules Graisseuses de Bichat (Succion)"
          ],
          "fetalMilestones": [
            "À 37 SA + 0j, la grossesse atteint le « Terme Précoce » (l’ACOG distingue le Terme Précoce de 37 à 38 SA+6j et le Terme Complet de 39 à 40 SA+6j).",
            "Les boules graisseuses de Bichat remplissent les joues, assurant une succion efficace dès la naissance.",
            "Le pic de cortisol surrénalien fœtal active les canaux de réabsorption du liquide pulmonaire (ENaC) pour l’adaptation à la vie aérienne."
          ],
          "maternalPhysiology": "La maturation cervicale débute : les fibres de collagène se remodèlent, assouplissant progressivement le col utérin.",
          "doctorCheckIn": "Consultation Hebdomadaire de 37 SA : Vérification du résultat du prélèvement SGB, de la tension artérielle, des bruits du cœur fœtal et rappel de la règle « 5-1-1 / 4-1-1 » du travail, de la rupture des membranes et du départ à la maternité.",
          "clinicalPearl": "Pourquoi éviter un déclenchement ou une césarienne programmée avant 39 SA sans indication médicale : Entre 37 et 39 SA, le poids du cerveau fœtal augmente d’environ 30 %."
        },
        "38": {
          "phaseLabel": "3e Trimestre — Terme Précoce (38 SA)",
          "stageTitle": "Pic de Phosphatidylglycérol du Surfactant, Cordes Vocales et Réflexes",
          "biologicalStage": "Fœtus à Terme Précoce",
          "lengthMetric": "49.8 cm (19.6 in LCT)",
          "weightMetric": "3 080 g (6,79 lb)",
          "heartRateBpm": "110 – 150 BPM",
          "keyOrgans": [
            "Phosphatidylglycérol (PG) Positif",
            "Shunts Cardiaques Fœtaux (Foramen Ovale)",
            "Glandes Lacrymales & Salivaires",
            "15 % de Masse Grasse Corporelle"
          ],
          "fetalMilestones": [
            "La présence de phosphatidylglycérol (PG) dans le liquide amniotique confirme la maturité biochimique complète des poumons.",
            "La masse grasse représente désormais ~15 % du poids fœtal, permettant une thermorégulation autonome après la naissance.",
            "Les cordes vocales, les réflexes archaïques (Moro, fouissement, succion, agrippement) et les organes sensoriels sont prêts pour la vie extra-utérine."
          ],
          "maternalPhysiology": "La perte du bouchon muqueux et des contractions de faux travail peuvent survenir plusieurs jours avant le travail actif.",
          "doctorCheckIn": "Consultation Hebdomadaire de 38 SA : Mesure de la tension artérielle, de la hauteur utérine, présentation fœtale, bruits du cœur et validation du projet de naissance.",
          "clinicalPearl": "Vrai Travail vs Braxton Hicks : Les contractions de Braxton Hicks sont irrégulières et cèdent au repos. Les contractions du vrai travail deviennent progressivement plus longues, plus intenses et plus rapprochées."
        },
        "39": {
          "phaseLabel": "3e Trimestre — Terme Complet (39 SA–40 SA + 6j)",
          "stageTitle": "Cap du Terme Complet, Score de Bishop et Discussion de l’Étude ARRIVE",
          "biologicalStage": "Fœtus à Terme Complet",
          "lengthMetric": "50.7 cm (20.0 in LCT)",
          "weightMetric": "3 290 g (7,25 lb)",
          "heartRateBpm": "110 – 150 BPM",
          "keyOrgans": [
            "Cortex Cérébral à Terme",
            "Renouvellement Épidermique",
            "Signalisation Placentaire d’Ocytocine",
            "Enzymes Hépatiques Matures"
          ],
          "fetalMilestones": [
            "Félicitations — à 39 SA + 0j, votre bébé atteint officiellement le « TERME COMPLET » selon les définitions de l’ACOG et de la SMFM !",
            "Les poumons fœtaux sécrètent des protéines du surfactant dans le liquide amniotique, activant les récepteurs utérins à l’ocytocine qui déclenchent le travail spontané.",
            "Une couche épidermique neuve remplace les cellules desquamées ; le vernix subsiste principalement dans les plis cutanés."
          ],
          "maternalPhysiology": "L’effacement du col (de 0 à 100 %) et la dilatation (de 0 à 10 cm) progressent avant et pendant la première phase du travail.",
          "doctorCheckIn": "Consultation Hebdomadaire de 39 SA : Examen cervical optionnel (score de Bishop), décollement des membranes optionnel ou discussion d’un déclenchement à 39 SA selon l’étude ARRIVE.",
          "clinicalPearl": "Étude ARRIVE (NEJM 2018) : Chez les nullipares à bas risque, le déclenchement électif entre 39w0d et 39w4d a montré un taux de césarienne légèrement inférieur (18,6 % vs 22,2 %) et moins d’hypertension gestationnelle par rapport à l’attitude expectative, faisant de l’attente spontanée comme du déclenchement à 39 SA deux options sûres."
        },
        "40": {
          "phaseLabel": "3e Trimestre — Date Prévue d’Accouchement (DPA / 40 SA)",
          "stageTitle": "Date Prévue du Terme (40w0d) et Préparation à la Transition Cardiopulmonaire",
          "biologicalStage": "Fœtus à Terme Complet",
          "lengthMetric": "51.2 cm (20.2 in LCT)",
          "weightMetric": "3 460 g (7,63 lb)",
          "heartRateBpm": "110 – 150 BPM",
          "keyOrgans": [
            "Foramen Ovale & Canal Artériel Prêts à se Fermer",
            "300 Centres d’Ossification",
            "Immunité Passive Maternelle IgG",
            "Sutures Crâniennes Modelables"
          ],
          "fetalMilestones": [
            "À la naissance, le premier cri déplisse les poumons et abaisse la résistance vasculaire pulmonaire de 80 %, fermant fonctionnellement le Foramen Ovale et le Canal Artériel.",
            "Un nouveau-né à terme possède ~300 centres osseux/cartilagineux (qui fusionnent ensuite en 206 os adultes) et un estomac de la taille d’une cerise (~5–7 mL au Jour 1, parfaitement adapté au colostrum).",
            "L’acuité visuelle à la naissance est réglée précisément à 20–30 cm (8–12 pouces), la distance exacte entre les bras et le visage des parents."
          ],
          "maternalPhysiology": "Seuls ~4 à 5 % des bébés naissent le jour exact du terme prévu ; environ 50 % des primipares accouchent spontanément entre 40 SA et 41 SA + 3j.",
          "doctorCheckIn": "Consultation du Terme (40 SA) : Tension artérielle, rythme cardiaque fœtal, examen du col et planification de la surveillance de 41 SA (monitoring RCF + liquide amniotique) et de la date de déclenchement.",
          "clinicalPearl": "Retenez les 4 paramètres en cas de perte des eaux (COAT) : notez la Couleur (claire vs teintée de méconium), l’Odeur, la Quantité et l’Heure, et appelez immédiatement la maternité même sans contractions."
        },
        "41": {
          "phaseLabel": "Terme Tardif — Surveillance Fœtale (41 SA–41 SA + 6j)",
          "stageTitle": "Surveillance Fœtale de Terme Tardif (NST / BPP) et Planification du Déclenchement",
          "biologicalStage": "Fœtus de Terme Tardif",
          "lengthMetric": "51.7 cm (20.4 in LCT)",
          "weightMetric": "3 600 g (7,94 lb)",
          "heartRateBpm": "110 – 150 BPM",
          "keyOrgans": [
            "Surveillance de la Réserve Placentaire",
            "Indice de Liquide Amniotique (ILA)",
            "Peau Sèche/Desquamée (Peu de Vernix)",
            "Ongles Longs dépassant le Bout des Doigts"
          ],
          "fetalMilestones": [
            "Entre 41 SA + 0j et 41 SA + 6j, la grossesse est qualifiée de « Terme Tardif » (Late-Term).",
            "La majeure partie du vernix caseosa ayant été résorbée, la peau du nouveau-né est souvent un peu sèche sur les paumes et les plantes, avec des ongles longs.",
            "L’éveil fœtal et la maturité neurologique sont optimaux."
          ],
          "maternalPhysiology": "Le volume de liquide amniotique diminue physiologiquement en fin de grossesse avec la sénescence placentaire.",
          "doctorCheckIn": "Consultation de 41 SA et Surveillance Bi-Hebdomadaire : Réalisation d’un monitoring fœtal (NST) couplé à l’Indice de Liquide Amniotique (ILA) / Grande Citerne (≥2 cm) ou Profil Biophysique complet (BPP, noté sur 8 ou 10). Programmation du déclenchement avant 42w0d.",
          "clinicalPearl": "Les recommandations de l’ACOG préconisent une surveillance fœtale dès 41w0d et un accouchement entre 41w0d et 41w6d afin d’éviter toute insuffisance placentaire post-terme."
        },
        "42": {
          "phaseLabel": "Fenêtre d’Accouchement Post-Terme (42 SA)",
          "stageTitle": "Déclenchement Actif du Travail, Naissance et « Golden Hour » (Peau à Peau)",
          "biologicalStage": "Cap Post-Terme / Naissance",
          "lengthMetric": "52.0 cm (20.5 in LCT)",
          "weightMetric": "3 685 g (8,12 lb)",
          "heartRateBpm": "110 – 150 BPM",
          "keyOrgans": [
            "Clampage Tardif du Cordon (30–60 s)",
            "Heure Dorée Peau à Peau",
            "Score d’APGAR (1 et 5 min)",
            "Vitamine K & Prophylaxie Oculaire Néonatale"
          ],
          "fetalMilestones": [
            "L’ACOG recommande l’accouchement au plus tard à 42 SA (par maturation cervicale et déclenchement à l’ocytocine si le travail spontané n’a pas débuté).",
            "À la naissance, le Clampage Tardif du Cordon Ombilical (30 à 60 secondes) transfère ~80 mL de sang placentaire, renforçant les réserves en fer du nourrisson pour ses 6 premiers mois.",
            "Le Peau à Peau immédiat (« Golden Hour ») stabilise la température, la glycémie et le rythme cardiaque du nouveau-né et favorise la première tétée."
          ],
          "maternalPhysiology": "La délivrance (troisième phase du travail) expulse le placenta dans les 5 à 30 minutes suivant la naissance ; la rétraction utérine assure l’hémostase.",
          "doctorCheckIn": "Naissance et Soins Post-Partum Immédiats : Score d’Apgar (à 1 et 5 min), vitamine K néonatale, vaccin Hépatite B, dépistages néonataux (audition et métabolique), suivi maternel précoce à 2–3 semaines (tension/humeur) et visite post-natale globale à 6 semaines.",
          "clinicalPearl": "Signes d’Alerte Post-Partum (« POST-BIRTH ») : Dans les 6 semaines suivant l’accouchement, consultez en urgence en cas de douleur thoracique/essoufflement, convulsions, pensées d’automutilation, hémorragie (>1 garniture/heure pendant 2 h), infection de cicatrice, douleur/rougeur au mollet, fièvre ≥38,0 °C (100,4 °F) ou céphalées intenses avec TA ≥140/90."
        }
      },
      "appointments": {
        "appt-w6-8": {
          "cadenceLabel": "Confirmation Initiale",
          "title": "Consultation d’Échographie de Viabilité et de Datation",
          "summary": "Confirme la localisation intra-utérine, l’embryon, l’activité cardiaque, le caractère unique ou gémellaire et la datation précise par la Longueur Cranio-Caudale (LCC).",
          "procedures": [
            "Échographie de datation endovaginale ou pelvienne (la LCC établit la DPA à ±3–5 jours près)",
            "Vérification de la vésicule vitelline, du sac gestationnel et du rythme cardiaque embryonnaire (100–165 BPM)",
            "Recueil des antécédents médicaux, chirurgicaux, obstétricaux et génétiques familiaux",
            "Prise en charge précoce des nausées/vomissements et vérification de la supplémentation en Acide Folique (≥400–800 mcg)"
          ],
          "questionsToAsk": [
            "Ma Longueur Cranio-Caudale (LCC) correspond-elle à ma date de dernières règles ou ajustons-nous la DPA officielle ?",
            "Dans quelle maternité accouche le cabinet et comment fonctionne le tour de garde obstétrical ?",
            "Quel est le numéro d’urgence en dehors des heures d’ouverture en cas de saignement ou de symptômes intenses ?"
          ],
          "highRiskAddition": "Âge Maternel ≥35 ans / Antécédent de fausse couche / FIV : Échographie précoce de localisation à 5,5–6 SA et évaluation du soutien lutéal par progestérone."
        },
        "appt-w8-10": {
          "cadenceLabel": "Toutes les 4 Semaines (q4s)",
          "title": "Première Consultation Obstétricale Complète & Bilan Prénatal Initial",
          "summary": "Examen clinique complet et bilan biologique maternel sanguin et urinaire de référence.",
          "procedures": [
            "Numération Formule Sanguine (NFS : hémoglobine, hématocrite, plaquettes)",
            "Groupe Sanguin (ABO), Facteur Rhésus Rh(D) et Recherche d’Agglutinines Irrégulières (RAI)",
            "Sérologies et immunité : Rubéole IgG, Varicelle IgG, Toxoplasmose, Hépatite B (Ag HBs), Hépatite C, VIH, Syphilis (TPHA/VDRL)",
            "Examen Cytobactériologique des Urines (ECBU) pour dépister une bactériurie asymptomatique",
            "TSH (si antécédent thyroïdien), Glycémie/HbA1c (si facteur de risque/IMC ≥25) et dépistage génétique des porteurs sains"
          ],
          "questionsToAsk": [
            "Suis-je Rhésus positif ou négatif et mes sérologies vaccinales (Rubéole/Varicelle) sont-elles protectrices ?",
            "Ai-je des facteurs de risque justifiant un dépistage précoce du diabète gestationnel ou de l’aspirine à 12 SA ?",
            "Comment organiserons-nous le DPNI (ADN fœtal libre) et l’échographie du 1er trimestre (Clarté Nucale) ?"
          ],
          "highRiskAddition": "Risque de DG / Antécédent de DG / SOPK / IMC ≥25 : Test précoce à 1 heure (GCT) ou glycémie/HbA1c prescrit dès cette première visite."
        },
        "appt-w10-13": {
          "cadenceLabel": "Toutes les 4 Semaines (q4s)",
          "title": "Fenêtre Génétique : DPNI (ADN Fœtal Libre) & Clarté Nucale (CN)",
          "summary": "Dépistage des aneuploïdies chromosomiques, étude morphologique du 1er trimestre et début de la prophylaxie de la pré-éclampsie à 12 SA.",
          "procedures": [
            "Prise de sang maternelle pour ADN Fœtal Libre (DPNI, dès 10 SA) : dépiste les Trisomies 21, 18, 13 et les chromosomes sexuels",
            "Échographie de Clarté Nucale (11 SA–13 SA + 6j) : mesure la clarté nucale (<3,0 mm normale) et vérifie les os propres du nez",
            "Écoute des bruits du cœur fœtal au Doppler (140–165 BPM) et contrôle tensionnel / urinaire",
            "Instauration d’Aspirine à Faible Dose (81–100 mg/jour dès 12 SA) si les critères de prévention de la pré-éclampsie sont réunis"
          ],
          "questionsToAsk": [
            "Dois-je débuter l’aspirine à faible dose (81 mg) à 12 SA pour prévenir la pré-éclampsie selon mon profil ?",
            "Sous quel délai les résultats du DPNI reviennent-ils (généralement 7 à 10 jours) et comment me seront-ils transmis ?",
            "Y a-t-il des adaptations concernant le sport ou les voyages à l’entrée du deuxième trimestre ?"
          ],
          "highRiskAddition": "Âge ≥35 ans / Jumeaux : Conseil génétique approfondi ; Biopsie de Trophoblaste (PVC, 10–13 SA) possible si diagnostic formel souhaité ; chorionicité gémellaire à confirmer avant 14 SA."
        },
        "appt-w16": {
          "cadenceLabel": "Toutes les 4 Semaines (q4s)",
          "title": "Consultation de 16 SA (2e Trimestre) & Marqueurs Sériques / AFP",
          "summary": "Suivi clinique materno-fœtal et dépistage sérique des anomalies de fermeture du tube neural.",
          "procedures": [
            "Tension artérielle, courbe de poids maternel et bandelette urinaire (protéinurie/glycosurie/leucocytes)",
            "Vérification des bruits du cœur fœtal au Doppler obstétrical",
            "Dosage de l’Alpha-Fœtoprotéine Sérique Maternel (MSAFP, 15–20 SA) pour dépister le spina bifida ou dépistage sérique combiné si le DPNI n’a pas été réalisé",
            "Prescription et prise de rendez-vous pour l’Échographie Morphologique du 2e Trimestre (20–22 SA)"
          ],
          "questionsToAsk": [
            "Même avec un DPNI à bas risque, faut-il doser l’AFP aujourd’hui pour dépister les anomalies ouvertes du tube neural ?",
            "À partir de quand vais-je sentir nettement les mouvements actifs du bébé, compte tenu de la position de mon placenta ?"
          ],
          "highRiskAddition": "Antécédent d’Accouchement Prématuré Spontané : Mesure échographique endovaginale de la longueur cervicale toutes les 2 semaines de 16 à 24 SA."
        },
        "appt-w18-22": {
          "cadenceLabel": "Toutes les 4 Semaines (q4s)",
          "title": "Échographie Morphologique du 2e Trimestre & Consultation de 20 SA",
          "summary": "Examen morphologique complet de tous les organes fœtaux, localisation placentaire, liquide amniotique et mesure du col.",
          "procedures": [
            "Échographie Morphologique (45–60 min) : ventricules cérébraux, cervelet, plexus choroïdes, profil/lèvres, cœur (4 cavités et voies d’éjection VG/VD), diaphragme, estomac, reins, cordon à 3 vaisseaux, rachis et 4 membres",
            "Évaluation de l’insertion placentaire (écartant un placenta prævia ou vasa prævia)",
            "Mesure de la longueur cervicale (normale ≥25 mm entre 18 et 24 SA)",
            "Mesure de la hauteur utérine (débute à 20 SA au niveau de l’ombilic), tension artérielle et bandelette urinaire"
          ],
          "questionsToAsk": [
            "Les voies d’éjection cardiaques et le rachis ont-ils tous été parfaitement visualisés aujourd’hui ?",
            "Mon placenta est-il antérieur, postérieur ou fundique, et est-il bien à distance (>2 cm) de l’orifice interne du col ?",
            "Quelle est la mesure de ma longueur cervicale ?"
          ],
          "highRiskAddition": "FIV / Diabète Préexistant / Risque Cardiaque Congénital : Échocardiographie fœtale spécialisée entre 20 et 22 SA."
        },
        "appt-w24-28": {
          "cadenceLabel": "Passage à Toutes les 2 Semaines à 28 SA",
          "title": "Dépistage du Diabète Gestationnel (HGPO), NFS, Rophylac & Vaccin dTcaP",
          "summary": "Étape métabolique, hématologique et immunologique majeure à la charnière des 2e et 3e trimestres.",
          "procedures": [
            "Test de dépistage du diabète gestationnel à 1 heure avec 50 g de glucose (GCT, 24–28 SA ; si ≥135–140 mg/dL, test HGPO de 3 heures avec 100 g)",
            "Contrôle de la NFS au 3e trimestre (dépistage de l’anémie ferriprive et de la thrombopénie gestationnelle)",
            "Contrôle des RAI et injection d’Immunoglobulines Anti-D (Rophylac 300 mcg) à 28 SA si la mère est Rhésus négatif",
            "Vaccination maternelle contre la Coqueluche (dTcaP) entre 27 et 36 SA (idéalement 27–30 SA) pour protéger le nouveau-né",
            "Contrôle des sérologies Syphilis et VIH au 3e trimestre selon les recommandations"
          ],
          "questionsToAsk": [
            "Quels sont mes résultats du test de glycémie à 1 heure et d’hémoglobine/ferritine du 3e trimestre ? Dois-je prendre du fer oral ?",
            "Puis-je recevoir le vaccin dTca contre la coqueluche aujourd’hui, et quand mon conjoint et les grands-parents doivent-ils faire leur rappel (au moins 2 semaines avant la naissance) ?",
            "Comment dois-je effectuer et noter le comptage quotidien des mouvements fœtaux à partir de 28 SA ?"
          ],
          "highRiskAddition": "Jumeaux Monochoriaux : Échographie toutes les 2 semaines pour dépister le syndrome transfuseur-transfusé (STT) ; Bichoriaux : croissance toutes les 4 semaines."
        },
        "appt-w30": {
          "cadenceLabel": "Toutes les 2 Semaines (q2s)",
          "title": "Consultation Bimensuelle de 30 SA & Suivi des Mouvements Fœtaux",
          "summary": "Première visite bimensuelle du troisième trimestre axée sur la croissance fœtale et le dépistage de la pré-éclampsie.",
          "procedures": [
            "Tension artérielle et bandelette urinaire (dépistage de l’hypertension gravidique / protéinurie)",
            "Mesure de la hauteur utérine en cm (attendue entre 28 et 32 cm) et bruits du cœur au Doppler",
            "Vérification du suivi quotidien des mouvements actifs fœtaux (≥10 mouvements en 2 heures)",
            "Rappel des signes d’alerte de menace d’accouchement prématuré et inscription à la maternité"
          ],
          "questionsToAsk": [
            "Ma hauteur utérine évolue-t-elle conformément à mon terme ?",
            "Comment finaliser ma pré-admission à la maternité et où se situe l’entrée des urgences obstétricales la nuit ?"
          ],
          "highRiskAddition": "Âge ≥35 ans / Obésité / DG / Hypertension : Prévoir l’échographie de croissance du 3e trimestre et une surveillance monitoring hebdomadaire dès 32 SA."
        },
        "appt-w32": {
          "cadenceLabel": "Toutes les 2 Semaines (q2s)",
          "title": "Consultation de 32 SA, Vaccination VRS & Échographie de Croissance (T3)",
          "summary": "Évaluation de la présentation fœtale, vaccination maternelle contre le VRS et suivi de la croissance du 3e trimestre.",
          "procedures": [
            "Vaccin Maternel contre le VRS (Abrysvo, entre 32 SA et 36 SA + 6j pendant la saison épidémique) pour prévenir la bronchiolite grave du nourrisson",
            "Tension artérielle, bandelette urinaire, hauteur utérine (30–34 cm) et bruits du cœur fœtal",
            "Échographie du 3e trimestre : contrôle de la croissance fœtale et de la localisation placentaire"
          ],
          "questionsToAsk": [
            "Suis-je dans la fenêtre saisonnière pour recevoir le vaccin maternel Abrysvo contre le VRS aujourd’hui (ou le bébé recevra-t-il le Beyfortus à la naissance) ?",
            "Sent-on déjà si le bébé commence à se placer tête en bas (présentation céphalique) ?"
          ],
          "highRiskAddition": "Âge ≥35–40 ans / DG / HTA Chronique / RCIU : Débuter la surveillance par monitoring fœtal (RCF) et profil biophysique 1 à 2 fois par semaine."
        },
        "appt-w34": {
          "cadenceLabel": "Toutes les 2 Semaines (q2s)",
          "title": "Consultation de 34 SA & Projet de Naissance",
          "summary": "Revue des options d’analgésie obstétricale, du projet de naissance, du massage périnéal et des signes d’alerte de pré-éclampsie.",
          "procedures": [
            "Tension artérielle, contrôle de la protéinurie, hauteur utérine (32–36 cm) et bruits du cœur fœtal",
            "Manœuvres de Leopold pour palper l’orientation et la présentation fœtale",
            "Échange sur le projet de naissance : péridurale, protoxyde d’azote, monitoring intermittent vs continu, clampage retardé du cordon et peau à peau de la Golden Hour"
          ],
          "questionsToAsk": [
            "Quelles sont les pratiques habituelles de la maternité pour le clampage retardé du cordon, le peau à peau immédiat et l’accompagnement à l’allaitement ?",
            "Dans quelles situations cliniques recommanderiez-vous une césarienne ou une extraction instrumentale ?"
          ],
          "highRiskAddition": "Placenta Prævia / Antécédent de Césarienne Corporéale : Confirmer la date de césarienne programmée (généralement entre 36 SA et 37 SA + 6j)."
        },
        "appt-w36": {
          "cadenceLabel": "Début des Visites Hebdomadaires (q1s)",
          "title": "Prélèvement Streptocoque B (36 SA) & Vérification de la Présentation",
          "summary": "Début du suivi hebdomadaire, dépistage systématique du Streptocoque du Groupe B et confirmation de la présentation céphalique.",
          "procedures": [
            "Prélèvement vaginal et rectal pour dépistage du Streptocoque du Groupe B (SGB, réalisé entre 36 SA et 37 SA + 6j ; valable 5 semaines)",
            "Manœuvres de Leopold + échographie au cabinet si besoin pour confirmer la présentation Céphalique (sommet)",
            "Si le fœtus est en Siège à 36 SA : information sur la Version par Manœuvre Externe (VME) à 37 SA",
            "Arrêt de l’aspirine à faible dose à 36 SA selon protocole ; si antécédent d’herpès génital (HSV), début de la prophylaxie orale par Aciclovir/Valaciclovir à 36 SA"
          ],
          "questionsToAsk": [
            "Est-il bien confirmé que le bébé a la tête en bas (présentation du sommet) ?",
            "Si mon prélèvement Streptocoque B est positif, à quel moment dois-je arriver à la maternité pour recevoir au moins 4 heures d’antibioprophylaxie IV avant la naissance ?"
          ],
          "highRiskAddition": "Antécédent d’Herpès Génital (HSV) : Débuter le traitement préventif oral quotidien à 36 SA pour éviter une poussée à l’accouchement."
        },
        "appt-w37": {
          "cadenceLabel": "Hebdomadaire (q1s)",
          "title": "Consultation de 37 SA (Début du Terme) & Consignes de Départ à la Maternité",
          "summary": "Résultat du prélèvement Streptocoque B, entrée dans le terme et critères précis de départ en salle de naissance.",
          "procedures": [
            "Tension artérielle, bandelette urinaire, hauteur utérine et rythme cardiaque fœtal",
            "Vérification et inscription du résultat du prélèvement Streptocoque B (SGB) dans le dossier obstétrical",
            "Rappel de la règle de départ à la maternité (5-1-1 pour un premier bébé : contractions toutes les 5 min, durant 1 min, depuis 1 heure ; ou 4-1-1 ; ou départ immédiat si perte des eaux / saignement / baisse des mouvements fœtaux)"
          ],
          "questionsToAsk": [
            "Quel est le résultat de mon prélèvement de Streptocoque B ?",
            "Si je perds les eaux à domicile sans contractions, dois-je venir immédiatement à la maternité ?"
          ],
          "highRiskAddition": "Hypertension Gravidique / Pré-éclampsie sans signes de gravité / Cholestase / Jumeaux Bichoriaux : Accouchement souvent programmé entre 37 et 38 SA."
        },
        "appt-w38": {
          "cadenceLabel": "Hebdomadaire (q1s)",
          "title": "Consultation Hebdomadaire de 38 SA & Préparation du Post-Partum",
          "summary": "Surveillance tensionnelle et fœtale continue, et préparation au 4e Trimestre (suites de couches).",
          "procedures": [
            "Tension artérielle, bandelette urinaire, hauteur utérine et bruits du cœur fœtal",
            "Examen cervical optionnel si la patiente ressent des contractions ou souhaite connaître l’état du col",
            "Information sur la récupération post-partum, la rééducation périnéale, le bien-être psychologique (échelle d’Édimbourg) et la contraception"
          ],
          "questionsToAsk": [
            "Qui puis-je contacter pour un accompagnement à l’allaitement après la sortie de la maternité ?",
            "Quand auront lieu mes visites post-natales (l’ACOG recommande un contrôle précoce sous 3 semaines et une visite complète entre 6 et 12 semaines) ?"
          ],
          "highRiskAddition": "DG équilibré par le régime / Âge ≥40 ans : Discuter d’un accouchement autour de 39 SA–39 SA + 6j."
        },
        "appt-w39": {
          "cadenceLabel": "Hebdomadaire (q1s)",
          "title": "Consultation de 39 SA (Terme Complet), Décollement des Membranes & Options de Déclenchement",
          "summary": "Bilan à terme complet, évaluation optionnelle du score de Bishop et décision partagée entre expectative et déclenchement à 39 SA.",
          "procedures": [
            "Tension artérielle, bandelette urinaire, hauteur utérine et bruits du cœur fœtal",
            "Toucher vaginal optionnel pour évaluer le Score de Bishop (dilatation, effacement, hauteur de la présentation, consistance, position)",
            "Décollement des Membranes optionnel (si le col est ouvert à ≥1 cm ; libère des prostaglandines naturelles favorisant la mise en travail sous 48h)",
            "Décision médicale partagée sur la prise en charge expectative vs déclenchement à 39 SA (protocole de l’étude ARRIVE)"
          ],
          "questionsToAsk": [
            "Quels sont ma dilatation, mon effacement et la hauteur de la tête fœtale, et suis-je candidate à un décollement des membranes aujourd’hui ?",
            "Si le travail spontané ne démarre pas d’ici 40 SA, quand prévoyons-nous la surveillance du terme et un éventuel déclenchement ?"
          ],
          "highRiskAddition": "DG sous Insuline / Âge ≥35–40 ans : Les recommandations préconisent un accouchement au cours de la 39e SA (39 SA–39 SA + 6j)."
        },
        "appt-w40": {
          "cadenceLabel": "Hebdomadaire (q1s)",
          "title": "Consultation du Terme (40 SA) & Organisation de la Surveillance de Terme Dépassé",
          "summary": "Évaluation du terme, réévaluation cervicale et programmation de la surveillance fœtale de la 41e SA.",
          "procedures": [
            "Tension artérielle, contrôle de la protéinurie et bruits du cœur fœtal",
            "Examen du col et nouveau décollement des membranes si souhaité",
            "Programmation du monitoring fœtal (RCF) et de l’échographie de quantité de liquide amniotique (ILA / Grande Citerne) à 41 SA",
            "Planification prévisionnelle de la date de déclenchement entre 41 SA et 41 SA + 6j"
          ],
          "questionsToAsk": [
            "Si nous programmons un déclenchement la semaine prochaine, rentrerai-je la veille pour une maturation cervicale (ballonnet de Foley ou prostaglandines) ou le matin même pour l’ocytocine ?"
          ],
          "highRiskAddition": "La majorité des grossesses à haut risque et d’âge maternel ≥40 ans accouchent entre 39 et 40 SA selon les recommandations."
        },
        "appt-w41-42": {
          "cadenceLabel": "Deux Fois par Semaine (41 SA+)",
          "title": "Surveillance de Terme Dépassé (41 SA Monitoring / Écho) & Déclenchement du Travail",
          "summary": "Surveillance bi-hebdomadaire du bien-être fœtal et du liquide amniotique, aboutissant à l’accouchement au plus tard à 42 SA.",
          "procedures": [
            "Monitoring Fœtal (RCF / NST) : enregistrement externe de 20–40 min vérifiant le rythme de base (110–160 BPM), la variabilité modérée et ≥2 accélérations (15x15) en 20 min",
            "Profil Biophysique / Échographie du Liquide Amniotique : vérifie la Grande Citerne (≥2 cm) ou l’ILA (≥5 cm), les mouvements respiratoires, le tonus et les mouvements fœtaux",
            "Admission en Salle de Naissance pour maturation cervicale et déclenchement du travail avant 42 SA"
          ],
          "questionsToAsk": [
            "Ma quantité de liquide amniotique et mon monitoring fœtal sont-ils parfaitement rassurants aujourd’hui ?",
            "À quelle heure devons-nous nous présenter à la maternité pour notre déclenchement programmé ?"
          ],
          "highRiskAddition": "Oligoamnios (Grande Citerne <2 cm) ou RCF non rassurant : Admission immédiate en salle de naissance pour accouchement."
        }
      },
      "symptoms": {
        "sym-1": {
          "urgencyLabel": "Aller aux Urgences Maternité / Appeler Immédiatement",
          "trimesterScope": "3e Trimestre (Semaines 28–42)",
          "title": "Diminution des Mouvements Actifs Fœtaux (<10 Mouvements en 2 Heures dès 28 SA)",
          "clinicalExplanation": "Une baisse brutale des mouvements du bébé ou l’absence de 10 mouvements distincts en 2 heures peut être un signe précoce d’insuffisance placentaire ou de compression funiculaire.",
          "actionSteps": "Buvez de l’eau fraîche, allongez-vous sur le côté gauche au calme et comptez les mouvements. N’attendez PAS le lendemain et ne vous fiez pas à un Doppler domestique : rendez-vous immédiatement aux urgences maternité pour un monitoring (NST) continu de 20 minutes."
        },
        "sym-2": {
          "urgencyLabel": "Aller Immédiatement aux Urgences Maternité / Hôpital",
          "trimesterScope": "2e & 3e Trimestres (≥20 SA) et Post-Partum",
          "title": "Céphalée Intense et Persistante, Troubles Visuels (Mouches Volantes/Éclairs) ou Douleur en Barre Épigastrique",
          "clinicalExplanation": "Des maux de tête violents ne cédant pas au paracétamol et à l’hydratation, des phosphènes (éclairs visuels/flou), une douleur épigastrique ou de l’hypocondre droit, ou un œdème brutal du visage et des mains sont les signes cardinaux d’une Pré-éclampsie Sévère ou d’un syndrome HELLP.",
          "actionSteps": "Contrôlez votre tension artérielle si vous avez un tensiomètre (≥140/90 est élevée ; ≥160/110 est une urgence hypertensive). Rendez-vous immédiatement aux urgences maternité pour un bilan tensionnel, urinaire et biologique."
        },
        "sym-3": {
          "urgencyLabel": "Aller aux Urgences Maternité / Appeler Immédiatement",
          "trimesterScope": "Tous les Trimestres (Semaines 1–42)",
          "title": "Saignement Vaginal (Sang Rouge Vif ou Caillots)",
          "clinicalExplanation": "Au 1er trimestre, un saignement abondant ou associé à une douleur pelvienne latéralisée impose d’éliminer une grossesse extra-utérine. Aux 2e et 3e trimestres, il nécessite une échographie urgente pour écarter un Placenta Prævia ou un Hématome Rétroplacentaire.",
          "actionSteps": "Rendez-vous immédiatement aux urgences maternité. Si vous êtes de groupe Rhésus négatif, une injection d’immunoglobulines Anti-D (Rophylac) sera nécessaire dans les 72 heures."
        },
        "sym-4": {
          "urgencyLabel": "Se Rendre Immédiatement aux Urgences Maternité",
          "trimesterScope": "2e & 3e Trimestres",
          "title": "Écoulement Franc ou Continu de Liquide Clair, Rosé ou Verdâtre (Perte des Eaux)",
          "clinicalExplanation": "La Rupture des Membranes à terme ou Prématurée avant 37 SA (RPM) supprime la barrière amniotique contre l’infection et expose au risque de procidence du cordon si la tête n’est pas engagée.",
          "actionSteps": "Notez la Couleur, l’Odeur, l’Abondance et l’Heure. N’introduisez rien dans le vagin et présentez-vous directement à la maternité."
        },
        "sym-5": {
          "urgencyLabel": "Appeler la Maternité / l’Obstétricien sous 1 à 2 Heures",
          "trimesterScope": "2e & 3e Trimestres (Semaines 20–36)",
          "title": "Contractions Régulières Avant 37 SA (>4 à 6 par Heure Pendant 1 Heure)",
          "clinicalExplanation": "Des contractions utérines rythmées accompagnées de douleurs de type menstruel, de pesanteur pelvienne ou de lombalgies sourdes avant 37 SA peuvent traduire une menace d’accouchement prématuré.",
          "actionSteps": "Videz votre vessie, buvez 500 mL (16–24 oz) d’eau et allongez-vous sur le côté gauche. Si >4 à 6 contractions persistent sur 1 heure, appelez immédiatement la maternité pour évaluer la fibronectine fœtale et la longueur cervicale."
        },
        "sym-6": {
          "urgencyLabel": "Appeler l’Obstétricien Aujourd’hui & Traiter la Fièvre par Paracétamol",
          "trimesterScope": "Tous les Trimestres (Semaines 1–42)",
          "title": "Fièvre ≥38,0 °C (100,4 °F) ou Frissons",
          "clinicalExplanation": "L’hyperthermie maternelle au 1er trimestre augmente le risque d’anomalie du tube neural et peut, plus tard, déclencher des contractions prématurées ou révéler une pyélonéphrite, une grippe, la COVID-19 ou une chorioamniotite.",
          "actionSteps": "Prenez du Paracétamol (650–1 000 mg) pour faire baisser la température centrale, hydratez-vous et contactez votre obstétricien pour rechercher l’origine infectieuse."
        },
        "sym-7": {
          "urgencyLabel": "Service d’Accueil des Urgences Immédiatement",
          "trimesterScope": "Tous les Trimestres & 6 Semaines Post-Partum",
          "title": "Gonflement, Rougeur ou Chaleur d’un Seul Mollet, ou Douleur Thoracique / Essoufflement",
          "clinicalExplanation": "La grossesse est un état d’hypercoagulabilité physiologique, ce qui augmente le risque de Thrombose Veineuse Profonde (phlébite, surtout à gauche) et d’Embolie Pulmonaire (EP).",
          "actionSteps": "Ne massez pas le mollet. Rendez-vous immédiatement aux Urgences pour réaliser un écho-Doppler veineux des membres inférieurs."
        },
        "sym-8": {
          "urgencyLabel": "Contacter le Cabinet Obstétrical sous 24 Heures",
          "trimesterScope": "Fin du 2e & 3e Trimestres",
          "title": "Démangeaisons Intenses des Paumes des Mains et Plantes des Pieds (Surtout la Nuit, Sans Éruption)",
          "clinicalExplanation": "Un prurit palmo-plantaire sévère sans lésion dermatologique est le signe classique de la Cholestase Gravidique, liée à une élévation des acides biliaires.",
          "actionSteps": "Contactez votre obstétricien pour doser les Acides Biliaires Totaux et les Transaminases (ASAT/ALAT). Si confirmée, l’acide ursodésoxycholique soulage le prurit et protège le fœtus."
        },
        "sym-9": {
          "urgencyLabel": "Appeler le Cabinet Obstétrical Aujourd’hui",
          "trimesterScope": "Tous les Trimestres",
          "title": "Brûlures Mictionnelles, Urines Troubles/Malodorantes ou Douleur Lombaire",
          "clinicalExplanation": "La progestérone dilate les uretères, ce qui favorise l’ascension rapide des infections urinaires basses (cystites) vers une pyélonéphrite aiguë pouvant déclencher des contractions prématurées.",
          "actionSteps": "Contactez votre cabinet obstétrical aujourd’hui pour réaliser une bandelette urinaire et un ECBU afin de débuter rapidement un antibiotique adapté à la grossesse."
        },
        "sym-10": {
          "urgencyLabel": "Modification Physiologique Normale (À Évoquer en Visite)",
          "trimesterScope": "2e & 3e Trimestres",
          "title": "Tiraillement Vif et Bref dans l’Aine en se Retournant, en se Levant ou en Toussant",
          "clinicalExplanation": "Douleur Ligamentaire Classique (Ligament Rond) : à mesure que l’utérus grandit hors du bassin, les ligaments ronds s’étirent comme des élastiques tendus et se spasment brièvement lors des mouvements brusques.",
          "actionSteps": "Fléchissez les hanches avant de tousser ou d’éternuer, roulez doucement sur le côté avant de vous asseoir, utilisez une compresse tiède (pas brûlante) ou portez une ceinture de maintien."
        },
        "sym-11": {
          "urgencyLabel": "Modification Physiologique Normale (Braxton Hicks)",
          "trimesterScope": "2e & 3e Trimestres",
          "title": "Durcissement Abdominal Irrégulier et Indolore Cédant au Repos et à l’Hydratation",
          "clinicalExplanation": "Les contractions de Braxton Hicks (« d’entraînement ») tonifient le muscle utérin sans modifier le col. Elles sont irrégulières, n’augmentent pas d’intensité et sont souvent favorisées par la déshydratation ou une vessie pleine.",
          "actionSteps": "Buvez 2 grands verres d’eau, videz votre vessie et reposez-vous sur le côté gauche. Appelez la maternité si elles deviennent régulières (toutes les 5–10 min) ou douloureuses."
        },
        "sym-12": {
          "urgencyLabel": "Modification Physiologique Normale",
          "trimesterScope": "Tous les Trimestres",
          "title": "Congestion Nasale Légère (« Rhinite Gravidique ») ou Saignements de Nez Occasionnels",
          "clinicalExplanation": "L’imprégnation œstrogénique des muqueuses et l’augmentation de +45 % du volume sanguin entraînent un gonflement des cornets nasaux chez près de 30 % des femmes enceintes.",
          "actionSteps": "Utilisez un spray nasal d’eau de mer stérile et un humidificateur dans la chambre. Évitez formellement les décongestionnants vasoconstricteurs oraux comme la pseudoéphédrine."
        }
      },
      "safety": {
        "med-1": {
          "category": "Douleur et Fièvre",
          "statusLabel": "Première Intention Autorisée (ACOG)",
          "name": "Paracétamol / Acétaminophène (Doliprane / Tylenol)",
          "dosageNote": "325–650 mg toutes les 6 heures si besoin (Max 3 000 mg/24h) ; dose minimale efficace sur la durée la plus courte.",
          "clinicalGuidance": "L’ACOG et la SMFM confirment le paracétamol comme l’antalgique et antipyrétique de première intention le plus sûr aux trois trimestres. Traiter une fièvre maternelle ≥38,0 °C (100,4 °F) est essentiel pour protéger l’embryon et le fœtus."
        },
        "med-2": {
          "category": "Douleur et Fièvre",
          "statusLabel": "Contre-indiqué pendant la Grossesse",
          "name": "Ibuprofène (Advil/Nurofen), Naproxène et Aspirine à Forte Dose (AINS)",
          "dosageNote": "À éviter pendant toute la grossesse (Note : l’aspirine à faible dose 81 mg prescrite par l’obstétricien pour prévenir la pré-éclampsie fait exception et EST sûre).",
          "clinicalGuidance": "Les AINS oraux inhibent la synthèse des prostaglandines fœtales, entraînant une fermeture prématurée du canal artériel, une atteinte rénale fœtale et un oligoamnios après 20 SA."
        },
        "med-3": {
          "category": "Nausées et Vomissements",
          "statusLabel": "Traitement de Première Intention ACOG",
          "name": "Vitamine B6 (Pyridoxine) + Doxylamine (Cariban / Donormyl / Diclegis)",
          "dosageNote": "Vitamine B6 10–25 mg 3x/jour + Succinate de doxylamine 12,5–25 mg au coucher.",
          "clinicalGuidance": "Le traitement anti-nauséeux le plus étudié en obstétrique (>200 000 grossesses suivies sans aucun signal tératogène)."
        },
        "med-4": {
          "category": "Brûlures d’Estomac et Reflux",
          "statusLabel": "Première/Deuxième Intention Autorisée",
          "name": "Carbonate de Calcium (Tums) et Famotidine (Pepcid)",
          "dosageNote": "Carbonate de calcium 500–1 000 mg si besoin ; Famotidine 10–20 mg 1 à 2 fois/jour si les antiacides sont insuffisants.",
          "clinicalGuidance": "Les antiacides calciques neutralisent l’acidité en toute sécurité (espacer de 2 heures de la prise de fer). Évitez le sous-salicylate de bismuth."
        },
        "med-5": {
          "category": "Constipation et Transit",
          "statusLabel": "Autorisé (Absorption Systémique Minime)",
          "name": "Polyéthylène Glycol 3350 / Macrogol (MiraLAX / Forlax), Psyllium (Metamucil) et Docusate (Colace)",
          "dosageNote": "Macrogol (MiraLAX) 17 g par jour dans 240 mL (8 oz) d’eau avec une hydratation accrue et des fibres alimentaires.",
          "clinicalGuidance": "La progestérone ralentit le transit et le fer prénatal majore la constipation. Les laxatifs osmotiques et de lest ne passent pas dans le sang et sont sûrs toute la grossesse. Évitez l’huile de ricin."
        },
        "med-6": {
          "category": "Allergies et Rhume",
          "statusLabel": "Antiallergique de Première Intention Autorisé",
          "name": "Loratadine (Clarityne), Cétirizine (Zyrtec) et Fluticasone en Spray Nasal (Flixonase)",
          "dosageNote": "Loratadine 10 mg/jour ou Cétirizine 10 mg/jour ; évitez les formules associées à un décongestionnant oral.",
          "clinicalGuidance": "Les antihistaminiques de 2e génération et les corticoïdes nasaux disposent d’un solide recul de sécurité pendant la grossesse. Évitez la pseudoéphédrine ou la phényléphrine orale."
        },
        "med-7": {
          "category": "Dermatologie / Soins de la Peau",
          "statusLabel": "Strictement Contre-indiqué (Tératogène)",
          "name": "Isotrétinoïne (Roaccutane) et Rétinoïdes Topiques (Trétinoïne / Retin-A / Rétinol)",
          "dosageNote": "Arrêter avant la conception ; privilégiez l’Acide Azélaïque, l’Acide Glycolique (<10 %) ou la Niacinamide.",
          "clinicalGuidance": "Les rétinoïdes oraux provoquent de graves malformations crânio-faciales, cardiaques et thymiques. Par principe de précaution, les dermatologues et obstétriciens recommandent également d’arrêter les rétinoïdes topiques et le rétinol."
        },
        "med-8": {
          "category": "Nutrition et Boissons",
          "statusLabel": "Sûr en Dessous de <200 mg / Jour (ACOG)",
          "name": "Caféine (Café, Expresso, Matcha, Thé)",
          "dosageNote": "Limitez l’apport quotidien total en caféine à ≤200 mg (environ une tasse de 350 mL / 12 oz de café filtre ou deux expressos).",
          "clinicalGuidance": "L’ACOG confirme qu’une consommation modérée de caféine (<200 mg/jour) n’augmente pas le risque de fausse couche ou d’accouchement prématuré. Pensez à comptabiliser le thé, les sodas et le chocolat noir."
        },
        "med-9": {
          "category": "Nutrition et Boissons",
          "statusLabel": "Fortement Recommandé (2–3 Portions/Semaine)",
          "name": "Poissons Oméga-3 Pauvres en Mercure (Saumon Sauvage, Sardines, Truite, Cabillaud, Crevettes)",
          "dosageNote": "225–340 g (8–12 oz) par semaine de poissons/fruits de mer pauvres en mercure bien cuits (apporte ~200–300 mg/j de DHA).",
          "clinicalGuidance": "La FDA et l’ACOG recommandent 2 à 3 portions/semaine de poisson bien cuit pauvre en mercure pour le développement cérébral et rétinien fœtal. ÉVITEZ strictement les prédateurs riches en mercure : Requin, Espadon, Thazard, Marlin et Thon Obèse."
        },
        "med-10": {
          "category": "Nutrition et Boissons",
          "statusLabel": "Éviter Crus / Non Pasteurisés",
          "name": "Produits Laitiers au Lait Cru, Charcuteries Non Réchauffées et Graines Germées Crues (Risque Listéria)",
          "dosageNote": "Vérifiez que l’étiquette du fromage mentionne « Au Lait Pasteurisé » ; réchauffez la charcuterie jusqu’à ce qu’elle soit fumante (74 °C / 165 °F).",
          "clinicalGuidance": "L’immunité cellulaire diminue pendant la grossesse, rendant les femmes enceintes 10 fois plus sensibles à Listeria monocytogenes, qui traverse le placenta. Privilégiez les fromages au lait pasteurisé et vérifiez systématiquement l’étiquette."
        }
      },
      "photos": {
        "0": {
          "caption": "Semaines 1–2 : Ovocyte secondaire (≈120 µm) à l’ovulation — zone pellucide translucide et corona radiata émergeant du follicule ovarien.",
          "alt": "Rendu hyperréaliste d’un ovocyte humain avec sa zone pellucide et ses cellules du cumulus émergeant de la surface ovarienne."
        },
        "1": {
          "caption": "Semaine 3 : Morula compactée à 16 cellules (4e jour post-fécondation) avec globules polaires dans la zone pellucide.",
          "alt": "Rendu hyperréaliste d’une morula humaine montrant des blastomères translucides compactés dans une enveloppe transparente."
        },
        "2": {
          "caption": "Semaine 4 : Blastocyste éclos s’implantant dans l’endomètre vasculaire — anneau trophoblastique, blastocèle et masse cellulaire interne.",
          "alt": "Rendu hyperréaliste d’un blastocyste humain s’implantant dans la muqueuse utérine rosée grâce à de fines projections trophoblastiques."
        },
        "3": {
          "caption": "Semaines 5–6 : Embryon au stade de Carnegie avec somites dorsaux, proéminence cardiaque primitive et vésicule vitelline dorée.",
          "alt": "Rendu hyperréaliste d’un embryon humain précoce à la peau translucide, aux somites visibles et au sac vitellin dans la membrane amniotique."
        },
        "4": {
          "caption": "Semaines 7–9 : Stade embryonnaire tardif montrant les vésicules cérébrales, la cupule optique pigmentée, le cœur à 4 cavités, les palettes des mains et la vésicule vitelline.",
          "alt": "Photographie macro intra-utérine d’un embryon humain tardif à la peau vasculaire translucide, cupule optique sombre, bourgeons des membres et sac vitellin doré."
        },
        "5": {
          "caption": "Semaines 10–15 : Fœtus du 1er trimestre avec doigts séparés, paupières fusionnées, vaisseaux temporaux translucides et cordon ombilical à 3 vaisseaux relié au placenta gauche.",
          "alt": "Photographie macro intra-utérine d’un fœtus humain de 12 semaines dans le sac amniotique avec cordon ombilical à 3 vaisseaux et disque placentaire gauche."
        },
        "6": {
          "caption": "Semaines 16–25 : Fœtus de mi-grossesse (Échographie Morphologique de 20 SA) avec vernix caseosa, membres fléchis et cordon ombelical à 3 vaisseaux relié au placenta gauche.",
          "alt": "Photographie macro intra-utérine d’un fœtus humain de 20 semaines à mi-grossesse flottant dans le sac amniotique avec disque placentaire gauche."
        },
        "7": {
          "caption": "Semaines 26–33 : Fœtus du début du 3e trimestre avec paupières et cils formés et dépôt accéléré de tissu adipeux sous-cutané.",
          "alt": "Photographie macro intra-utérine d’un fœtus humain de 28 semaines au troisième trimestre reposant paisiblement dans le sac amniotique."
        },
        "8": {
          "caption": "Semaines 34–42 : Fœtus à terme complet avec joues rebondies, graisse sous-cutanée mature et surfactant pulmonaire prêt pour la naissance.",
          "alt": "Photographie macro intra-utérine d’un fœtus humain à terme blotti dans le sac amniotique avec placenta gauche et cordon ombilical hélicoïdal."
        }
      }
    }
  }
};

  const SUPPORTED_LANGUAGES = I18N_BUNDLE.SUPPORTED_LANGUAGES;
  const UI_STRINGS = I18N_BUNDLE.UI_STRINGS;
  const DATA = I18N_BUNDLE.DATA;

  function getUiStrings(lang) {
    return UI_STRINGS[lang] || UI_STRINGS.en;
  }

  function formatTemplate(template, params) {
    if (typeof template !== 'string') return '';
    if (!params || typeof params !== 'object') return template;
    let out = template;
    const keys = Object.keys(params);
    for (let i = 0; i < keys.length; i += 1) {
      const k = keys[i];
      const token = '{' + k + '}';
      out = out.split(token).join(String(params[k]));
    }
    return out;
  }

  function getLocaleForLang(lang) {
    for (let i = 0; i < SUPPORTED_LANGUAGES.length; i += 1) {
      if (SUPPORTED_LANGUAGES[i].code === lang) {
        return SUPPORTED_LANGUAGES[i].locale;
      }
    }
    return 'en-US';
  }

  function localizeWeekEntry(entry, lang) {
    if (!entry || lang === 'en') return entry;
    const langData = DATA[lang];
    const tr = (langData && langData.weeks && langData.weeks[String(entry.week)]) || null;
    if (!tr) return entry;

    return {
      week: entry.week,
      trimester: entry.trimester,
      phaseLabel: tr.phaseLabel || entry.phaseLabel,
      stageTitle: tr.stageTitle || entry.stageTitle,
      biologicalStage: tr.biologicalStage || entry.biologicalStage,
      lengthMetric: tr.lengthMetric || entry.lengthMetric,
      weightMetric: tr.weightMetric || entry.weightMetric,
      heartRateBpm: tr.heartRateBpm || entry.heartRateBpm,
      keyOrgans: Array.isArray(tr.keyOrgans) ? tr.keyOrgans : entry.keyOrgans,
      fetalMilestones: Array.isArray(tr.fetalMilestones) ? tr.fetalMilestones : entry.fetalMilestones,
      maternalPhysiology: tr.maternalPhysiology || entry.maternalPhysiology,
      doctorCheckIn: tr.doctorCheckIn || entry.doctorCheckIn,
      clinicalPearl: tr.clinicalPearl || entry.clinicalPearl,
      visualStage: entry.visualStage,
      scaleFactor: entry.scaleFactor,
      hasScheduledVisit: entry.hasScheduledVisit
    };
  }

  function localizePhotoStill(still, index, lang) {
    if (!still || lang === 'en') return still;
    const langData = DATA[lang];
    const tr = (langData && langData.photos && langData.photos[String(index)]) || null;
    if (!tr) return still;
    return {
      minWeek: still.minWeek,
      maxWeek: still.maxWeek,
      file: still.file,
      caption: tr.caption || still.caption,
      alt: tr.alt || tr.caption || still.alt
    };
  }

  function localizeAppointment(appt, lang) {
    if (!appt || lang === 'en') return appt;
    const langData = DATA[lang];
    const tr = (langData && langData.appointments && langData.appointments[appt.id]) || null;
    if (!tr) return appt;
    return {
      id: appt.id,
      weekStart: appt.weekStart,
      weekEnd: appt.weekEnd,
      trimester: appt.trimester,
      cadenceLabel: tr.cadenceLabel || appt.cadenceLabel,
      title: tr.title || appt.title,
      summary: tr.summary || appt.summary,
      procedures: Array.isArray(tr.procedures) ? tr.procedures : appt.procedures,
      questionsToAsk: Array.isArray(tr.questionsToAsk) ? tr.questionsToAsk : appt.questionsToAsk,
      highRiskAddition: tr.highRiskAddition || appt.highRiskAddition
    };
  }

  function localizeSymptom(sym, lang) {
    if (!sym || lang === 'en') return sym;
    const langData = DATA[lang];
    const tr = (langData && langData.symptoms && langData.symptoms[sym.id]) || null;
    if (!tr) return sym;
    return {
      id: sym.id,
      urgency: sym.urgency,
      urgencyLabel: tr.urgencyLabel || sym.urgencyLabel,
      trimesterScope: tr.trimesterScope || sym.trimesterScope,
      title: tr.title || sym.title,
      clinicalExplanation: tr.clinicalExplanation || sym.clinicalExplanation,
      actionSteps: tr.actionSteps || sym.actionSteps
    };
  }

  function localizeMedItem(item, lang) {
    if (!item || lang === 'en') return item;
    const langData = DATA[lang];
    const tr = (langData && langData.safety && langData.safety[item.id]) || null;
    if (!tr) return item;
    return {
      id: item.id,
      status: item.status,
      category: tr.category || item.category,
      statusLabel: tr.statusLabel || item.statusLabel,
      name: tr.name || item.name,
      dosageNote: tr.dosageNote || item.dosageNote,
      clinicalGuidance: tr.clinicalGuidance || item.clinicalGuidance
    };
  }

  globalScope.CLINICAL_I18N = {
    SUPPORTED_LANGUAGES: SUPPORTED_LANGUAGES,
    getUiStrings: getUiStrings,
    formatTemplate: formatTemplate,
    getLocaleForLang: getLocaleForLang,
    localizeWeekEntry: localizeWeekEntry,
    localizePhotoStill: localizePhotoStill,
    localizeAppointment: localizeAppointment,
    localizeSymptom: localizeSymptom,
    localizeMedItem: localizeMedItem
  };
})(window);
