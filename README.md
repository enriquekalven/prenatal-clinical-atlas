# Prenatal Clinical Atlas (Weeks 1–42)

**Live Demo:** [https://prenatal-clinical-atlas.web.app](https://prenatal-clinical-atlas.web.app)

An interactive, physician-aligned (ACOG / SMFM / CDC) Conception-to-Birthday OB/GYN & Embryology Clinical Reference spanning **Weeks 1 through 42** of gestation, with full localization across **8 languages** (`en`, `es`, `zh`, `pt`, `ja`, `ko`, `it`, `fr`).

## Key Capabilities

1. **Tri-Modal Anatomical & Embryological Visualizer (1-to-1 Aligned)**
   - **3D Interactive (WebGL)**: Real-time procedural 3D embryology and fetal anatomy with interactive camera orbit/zoom, X-Ray internal organ view (beating 4-chamber heart, cerebral cortex, hepatic silhouette, dorsal spine), gentle fetal kick reflex (`K`), and synthesized OB ultrasound Doppler heartbeat audio at each week's exact BPM.
   - **Photoreal Still**: High-resolution clinical in-utero photography matched to the active developmental stage.
   - **Schematic SVG**: Pure `createElementNS` vector clinical schematic with localized anatomical callouts (`Zona Pellucida`, `Inner Cell Mass`, `Forebrain & Optic Cup`, `Cardiac Prominence`, `Secondary Yolk Sac`, `Placental Disc`, `3-Vessel Umbilical Cord`, `Cerebral Cortex`, `4-Chamber Heart`).

2. **Patient Gestational Calculator & Clinical Care Pathway Overlays**
   - Supports **LMP**, **Ultrasound EDD**, **Ovulation/Conception Date**, **IVF Day-5 Blastocyst Transfer**, and **IVF Day-3 Embryo Transfer** dating.
   - Dynamic clinical overlays for **Standard Low-Risk Singleton**, **Advanced Maternal Age (35+ / AMA)**, **High-Risk / Gestational Diabetes / HTN**, and **Twin / Multiples Gestation**.

3. **4 Clinical Reference Modules**
   - **Tab 1 — Week-by-Week Atlas (Weeks 1–42)**: Biometrics (CRL/CHL length, estimated fetal weight, expected FHR), active organ systems, doctor check-in guidance, embryological milestones, and maternal physiology + MD clinical pearls.
   - **Tab 2 — ACOG Prenatal Care Roadmap (15 Visits)**: Complete schedule of exams, labs, ultrasounds, vaccines (Tdap, RSV, Flu), and questions to ask your OB/Midwife with persistent completion checkboxes.
   - **Tab 3 — Red-Flag Symptom Triage (12 Scenarios)**: Color-coded 3-tier obstetric triage (`Immediate L&D / Emergency`, `Same-Day OB Call`, `Physiological Adaptation`).
   - **Tab 4 — Safe Medication, Supplement & Nutrition Lookup (10 Categories)**: ACOG and FDA PLLR-aligned safety guidance and dosing limits.

4. **8-Language Localization (Zero Unlocalized Strings)**
   - **English (`en`)**: `https://prenatal-clinical-atlas.web.app/?lang=en`
   - **Español (`es`)**: `https://prenatal-clinical-atlas.web.app/?lang=es`
   - **中文 (`zh`)**: `https://prenatal-clinical-atlas.web.app/?lang=zh`
   - **Português (`pt`)**: `https://prenatal-clinical-atlas.web.app/?lang=pt`
   - **日本語 (`ja`)**: `https://prenatal-clinical-atlas.web.app/?lang=ja`
   - **한국어 (`ko`)**: `https://prenatal-clinical-atlas.web.app/?lang=ko`
   - **Italiano (`it`)**: `https://prenatal-clinical-atlas.web.app/?lang=it`
   - **Français (`fr`)**: `https://prenatal-clinical-atlas.web.app/?lang=fr`

## Security & Privacy Architecture

- **100% Client-Side & Offline-Capable**: All due-date calculations and visit checklists run locally in the browser (`localStorage`) with zero external tracking or backend PII storage.
- **Strict DOM Safety**: Zero use of `innerHTML`, `outerHTML`, `insertAdjacentHTML`, or `document.write`; all DOM and SVG nodes are constructed via `createElement`, `createElementNS`, `textContent`, and `replaceChildren`.
- **Strict Content Security Policy (CSP)**: Enforces `default-src 'self'; object-src 'none'; base-uri 'self'; form-action 'none'`.

## Deployment

Deployed on **Firebase Hosting** (`project-maui` → site `prenatal-clinical-atlas`):

```bash
firebase deploy --only hosting:prenatal-clinical-atlas --project project-maui
```
