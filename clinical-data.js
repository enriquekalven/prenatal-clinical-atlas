/**
 * Clinical Obstetrics & Embryology Reference Dataset (Weeks 1–42)
 * Aligned with ACOG (American College of Obstetricians and Gynecologists),
 * SMFM (Society for Maternal-Fetal Medicine), and CDC Perinatal Guidelines.
 */
(function initClinicalData(globalScope) {
  'use strict';

  const WEEKS_DATA = [
    {
      week: 1,
      trimester: 1,
      phaseLabel: 'Periconceptional (Menstrual / Follicular Phase)',
      stageTitle: 'Follicular Recruitment & Endometrial Reset',
      biologicalStage: 'Ovarian Follicle Cohort',
      lengthMetric: '0.04 mm (Primordial Follicle)',
      weightMetric: '< 0.001 g',
      heartRateBpm: 'Not yet formed (Pre-conception)',
      clinicalComparison: 'Microscopic oocyte inside ovarian cortex',
      keyOrgans: ['Hypothalamic-Pituitary-Ovarian Axis', 'Endometrial Basal Layer', 'Dominant Follicle Selection'],
      fetalMilestones: [
        'Obstetric dating begins on Day 1 of the Last Menstrual Period (LMP), roughly 2 weeks before actual fertilization.',
        'Follicle-Stimulating Hormone (FSH) recruits a cohort of antral ovarian follicles; one dominant Graafian follicle emerges.',
        'Rising estradiol proliferates the functional endometrium to prepare a vascularized implantation bed.'
      ],
      maternalPhysiology: 'Menstrual shedding transitions to the proliferative follicular phase. Basal body temperature remains in the lower pre-ovulatory range.',
      doctorCheckIn: 'Preconception Checklist: Confirm 400–800 mcg daily Folic Acid (4 mg if prior neural tube defect), verify Rubella/Varicella immunity, and review chronic medications for teratogenicity.',
      clinicalPearl: 'ACOG dates pregnancy from LMP Day 1 (40 weeks / 280 days total) because ovulation timing varies, whereas embryonic age is ~2 weeks shorter (38 weeks / 266 days).',
      visualStage: 'follicle',
      scaleFactor: 0.18,
      hasScheduledVisit: false
    },
    {
      week: 2,
      trimester: 1,
      phaseLabel: 'Periconceptional (Periovulatory Phase)',
      stageTitle: 'LH Surge, Ovulation & Tubal Capture',
      biologicalStage: 'Secondary Oocyte (Metaphase II)',
      lengthMetric: '0.12 mm (120 µm Oocyte)',
      weightMetric: '< 0.001 g',
      heartRateBpm: 'Not yet formed (Ovulation window)',
      keyOrgans: ['Cumulus-Oocyte Complex', 'Zona Pellucida', 'Corpus Luteum Formation'],
      fetalMilestones: [
        'Mid-cycle Luteinizing Hormone (LH) surge triggers resumption of Meiosis I and extrusion of the first polar body.',
        'Ovulation releases the secondary oocyte Arrested in Metaphase II, swept into the fallopian ampulla by fimbriae.',
        'The ruptured follicle luteinizes into the Corpus Luteum, secreting progesterone to transform the endometrium into a secretory state.'
      ],
      maternalPhysiology: 'Cervical mucus becomes thin, alkaline, and stretchy (spinnbarkeit) to facilitate sperm capacitation and transit; basal body temperature rises ~0.5°F after ovulation.',
      doctorCheckIn: 'Fertile Window Optimization: Peak fecundability occurs during the 5 days preceding ovulation and the day of ovulation itself (oocyte viability is 12–24 hours).',
      clinicalPearl: 'If conception occurs via IVF, a Day-5 blastocyst transfer corresponds to 2 weeks + 5 days gestational age on the very day of transfer.',
      visualStage: 'follicle',
      scaleFactor: 0.24,
      hasScheduledVisit: false
    },
    {
      week: 3,
      trimester: 1,
      phaseLabel: '1st Trimester — Germinal Stage',
      stageTitle: 'Fertilization, Zygote Cleavage & Morula',
      biologicalStage: 'Zygote → 16-Cell Morula',
      lengthMetric: '0.15 – 0.20 mm',
      weightMetric: '< 0.001 g',
      heartRateBpm: 'Avacular cleavage stage',
      keyOrgans: ['Diploid Genome (46 Chromosomes)', 'Blastomere Compaction', 'Inner Cell Mass Segregation'],
      fetalMilestones: [
        'Fertilization in the fallopian ampulla triggers the cortical reaction, blocking polyspermy and completing Meiosis II.',
        'Male and female pronuclei fuse into a diploid zygote (46,XX or 46,XY) and begin rapid mitotic cleavage divisions every 12–24 hours.',
        'By Day 4 post-conception, the 16-to-32 cell Morula compacts and enters the uterine cavity, cavitating into an early blastocyst.'
      ],
      maternalPhysiology: 'Early Pregnancy Factor (EPF) modulates maternal immune tolerance; progesterone from the corpus luteum prevents endometrial sloughing.',
      doctorCheckIn: 'No clinic visit required yet. Avoid NSAIDs (ibuprofen, naproxen), as prostaglandin inhibition can impair blastocyst implantation.',
      clinicalPearl: 'During Weeks 3–4 ("all-or-none" period), totipotent blastomeres can compensate for isolated cellular injury, before organogenesis begins at Week 5.',
      visualStage: 'fertilization',
      scaleFactor: 0.30,
      hasScheduledVisit: false
    },
    {
      week: 4,
      trimester: 1,
      phaseLabel: '1st Trimester — Implantation',
      stageTitle: 'Blastocyst Implantation & Syncytiotrophoblast hCG',
      biologicalStage: 'Implanting Bilaminar Blastocyst',
      lengthMetric: '0.4 – 1.0 mm',
      weightMetric: '< 0.01 g',
      heartRateBpm: 'Primitive lacunar circulation',
      keyOrgans: ['Epiblast & Hypoblast Disc', 'Amniotic Cavity', 'Primary Yolk Sac', 'Trophoblast Lacunae'],
      fetalMilestones: [
        'The blastocyst hatches from the zona pellucida and apposes/invades the decidualized uterine endometrium (Days 6–10 post-ovulation).',
        'Inner Cell Mass differentiates into the bilaminar embryonic disc (epiblast and hypoblast).',
        'Syncytiotrophoblast invades maternal spiral capillaries and secretes beta-hCG, rescuing the corpus luteum to maintain progesterone production.'
      ],
      maternalPhysiology: 'Missed menses; serum beta-hCG becomes detectable 8–11 days post-ovulation and doubles every 48–72 hours in a viable intrauterine pregnancy.',
      doctorCheckIn: 'Positive Home Urine Pregnancy Test! Call your OB/GYN or CNM office to schedule your initial prenatal confirmation and dating visit (typically scheduled between Weeks 6 and 9).',
      clinicalPearl: 'Light spotting around expected menses ("implantation bleeding") is common and benign, whereas unilateral pelvic pain with spotting requires quantitative serial beta-hCGs to rule out ectopic pregnancy.',
      visualStage: 'blastocyst',
      scaleFactor: 0.35,
      hasScheduledVisit: false
    },
    {
      week: 5,
      trimester: 1,
      phaseLabel: '1st Trimester — Early Organogenesis',
      stageTitle: 'Gastrulation, Neural Plate & Primitive Heart Tube',
      biologicalStage: 'Trilaminar Embryo (Carnegie Stage 9–10)',
      lengthMetric: '1.5 – 2.5 mm (CRL)',
      weightMetric: '0.02 g',
      heartRateBpm: '85 – 100 BPM (Nascent contractions)',
      keyOrgans: ['Ectoderm / Mesoderm / Endoderm', 'Neural Groove', 'Cardiogenic Crescent', 'Somites'],
      fetalMilestones: [
        'Gastrulation establishes the three germ layers: Ectoderm (nervous system/epidermis), Mesoderm (heart/bones/kidneys/blood), and Endoderm (gut/lungs/liver).',
        'The neural plate folds into the neural groove flanked by paraxial mesoderm somites.',
        'Paired endocardial tubes fuse into a single primitive tubular heart that begins peristaltic contractions around Day 22 post-conception.'
      ],
      maternalPhysiology: 'Rapidly rising hCG, estrogen, and progesterone trigger early nausea, breast tenderness, heightened olfaction, and profound fatigue.',
      doctorCheckIn: 'If you have a history of ectopic pregnancy, recurrent pregnancy loss, or IVF conception, your doctor may order serial 48-hour serum beta-hCGs and an early placement scan.',
      clinicalPearl: 'On transvaginal ultrasound (TVUS) at Week 5, the Gestational Sac and Yolk Sac ("double decidual sac sign") are visible once beta-hCG exceeds the discriminatory zone (~1,500–2,000 mIU/mL).',
      visualStage: 'embryo_early',
      scaleFactor: 0.40,
      hasScheduledVisit: false
    },
    {
      week: 6,
      trimester: 1,
      phaseLabel: '1st Trimester — Organogenesis',
      stageTitle: 'Neural Tube Closure, Cardiac Looping & Limb Buds',
      biologicalStage: 'Embryo (Carnegie Stage 12–13)',
      lengthMetric: '4 – 6 mm (CRL)',
      weightMetric: '0.1 g',
      heartRateBpm: '100 – 115 BPM',
      keyOrgans: ['Anterior & Posterior Neuropores', 'Looping S-Shaped Heart', 'Optic Vesicles', 'Otic Placodes'],
      fetalMilestones: [
        'Anterior (cranial) and posterior (caudal) neuropores close completely by Day 28 post-conception, sealing the brain vesicles and spinal cord.',
        'The primitive heart tube undergoes dextro-looping, establishing atrial and ventricular chambers with measurable cardiac flicker on TVUS.',
        'Upper and lower limb buds emerge alongside pharyngeal arches (future jaw, palate, and middle ear structures).'
      ],
      maternalPhysiology: 'Renal blood flow increases by 25–30%, causing frequent urination even before uterine enlargement compresses the bladder.',
      doctorCheckIn: 'Early Viability & Dating Ultrasound Window (Weeks 6–8): Confirms intrauterine fetal pole, measures Crown-Rump Length (CRL ±3–5 days accuracy), and documents cardiac activity.',
      clinicalPearl: 'Because neural tube closure finishes at Week 6, neural tube defects (spina bifida, anencephaly) originate before many patients have their first prenatal visit—highlighting why early folate is vital.',
      visualStage: 'embryo_early',
      scaleFactor: 0.45,
      hasScheduledVisit: true
    },
    {
      week: 7,
      trimester: 1,
      phaseLabel: '1st Trimester — Organogenesis',
      stageTitle: 'Telencephalon Expansion, Hand Plates & Metanephros',
      biologicalStage: 'Embryo (Carnegie Stage 15–16)',
      lengthMetric: '9 – 11 mm (CRL)',
      weightMetric: '0.5 g',
      heartRateBpm: '120 – 140 BPM',
      keyOrgans: ['Cerebral Hemispheres', 'Definitive Kidney (Metanephros)', 'Digital Rays (Hand Plates)', 'Pancreatic Buds'],
      fetalMilestones: [
        'Prosencephalon divides into paired telencephalic vesicles (future cerebral cortex), generating ~100,000 new neurons per minute.',
        'Hand plates flatten and develop digital rays; lens vesicles invaginate and retinal pigment appears.',
        'The ureteric bud invades metanephric mesenchyme to form the permanent kidneys (metanephros).'
      ],
      maternalPhysiology: 'Cervical glands secrete a thick mucoid plug (operculum) that seals the endocervical canal against ascending bacteria.',
      doctorCheckIn: 'For nausea and vomiting of pregnancy (NVP), ACOG First-Line therapy is Vitamin B6 (Pyridoxine 10–25 mg TID) plus Doxylamine (12.5–25 mg).',
      clinicalPearl: 'Physiological midgut herniation begins this week: rapid intestinal looping temporarily pushes the midgut into the proximal umbilical cord until Week 10–11.',
      visualStage: 'embryo_late',
      scaleFactor: 0.50,
      hasScheduledVisit: false
    },
    {
      week: 8,
      trimester: 1,
      phaseLabel: '1st Trimester — Organogenesis',
      stageTitle: 'Four-Chambered Heart Septation & Webbed Digits',
      biologicalStage: 'Embryo (Carnegie Stage 18–20)',
      lengthMetric: '15 – 17 mm (CRL)',
      weightMetric: '1.1 g',
      heartRateBpm: '145 – 165 BPM',
      keyOrgans: ['Atrioventricular Valves', 'Interventricular Septum', 'Chondrification Centers', 'External Ear Pinnae'],
      fetalMilestones: [
        'Endocardial cushions fuse and the interventricular septum closes, completing the 4-chambered cardiac architecture.',
        'Apoptosis (programmed cell death) sculpts notches between webbed fingers and toes; elbow and knee joints flex.',
        'Primary cartilaginous skeletal templates form and spontaneous trunk/limb twitching begins (too gentle to feel maternally).'
      ],
      maternalPhysiology: 'Uterus expands from fist-sized to the size of a large lemon; maternal cardiac output rises 20% via increased stroke volume and heart rate.',
      doctorCheckIn: 'Comprehensive Initial OB Intake Visit & Full Prenatal Blood Panel (Weeks 8–10): CBC, Blood Type/Rh/Antibody screen, Rubella, Hep B/C, HIV, Syphilis, Urine Culture, and Pap/STI screen if due.',
      clinicalPearl: 'First-trimester Crown-Rump Length (CRL) between 7 and 13 weeks is the single most accurate method for establishing or revising your official Estimated Due Date (EDD).',
      visualStage: 'embryo_late',
      scaleFactor: 0.54,
      hasScheduledVisit: true
    },
    {
      week: 9,
      trimester: 1,
      phaseLabel: '1st Trimester — Late Embryonic Stage',
      stageTitle: 'Peak Embryonic Heart Rate, Eyelid Fusion & Diaphragm',
      biologicalStage: 'Late Embryo (Carnegie Stage 21–22)',
      lengthMetric: '22 – 25 mm (2.3 cm CRL)',
      weightMetric: '2.0 g',
      heartRateBpm: '155 – 175 BPM (Physiological Peak)',
      keyOrgans: ['Pleuroperitoneal Diaphragm', 'Fused Eyelids', 'Pituitary & Adrenal Cortex', 'Vocal Ligaments'],
      fetalMilestones: [
        'Embryonic heart rate reaches its physiological peak (~165–175 BPM) as autonomic parasympathetic innervation is still maturing.',
        'Pleuroperitoneal membranes fuse with the septum transversum to complete the thoracic diaphragm.',
        'Eyelids grow over the eyes and fuse shut (remaining closed until Weeks 25–26 to protect developing corneas).'
      ],
      maternalPhysiology: 'Peak serum beta-hCG (~90,000–100,000 mIU/mL) often coincides with peak morning sickness between Weeks 9 and 10.',
      doctorCheckIn: 'Discuss Genetic Screening Options with your OB: Cell-free placental DNA (NIPT) starting at Week 10+0, Carrier Screening (CF, SMA, Hemoglobinopathies), and Nuchal Translucency ultrasound.',
      clinicalPearl: 'If severe vomiting causes >5% pre-pregnancy weight loss, ketonuria, or inability to keep fluids down for 24h (Hyperemesis Gravidarum), contact your OB for IV hydration and antiemetics.',
      visualStage: 'embryo_late',
      scaleFactor: 0.58,
      hasScheduledVisit: false
    },
    {
      week: 10,
      trimester: 1,
      phaseLabel: '1st Trimester — Embryo-to-Fetus Transition',
      stageTitle: 'Completion of Organogenesis & NIPT Eligibility',
      biologicalStage: 'Embryo → Fetus Transition (Carnegie Stage 23)',
      lengthMetric: '31 – 35 mm (3.3 cm CRL)',
      weightMetric: '4.0 g',
      heartRateBpm: '150 – 170 BPM',
      keyOrgans: ['Endochondral Ossification', 'Nephron Glomerular Filtration', 'Deciduous Tooth Buds', 'Chorionic Villi'],
      fetalMilestones: [
        'End of Week 10 marks the formal transition from Embryo to Fetus: all major organ systems are established in their anatomical locations.',
        'Metanephric kidneys begin producing dilute fetal urine, which will soon become the primary component of amniotic fluid.',
        'Embryonic tail completely regresses; fingernails and deciduous tooth buds form inside the jaws.'
      ],
      maternalPhysiology: 'Placental trophoblast begins taking over progesterone and estradiol synthesis from the corpus luteum ("luteo-placental shift").',
      doctorCheckIn: 'NIPT (Cell-Free DNA) Blood Draw Window Opens (Week 10+0): Screens for Trisomy 21 (Down syndrome), Trisomy 18, Trisomy 13, and sex chromosome aneuploidies with >99% sensitivity for T21.',
      clinicalPearl: 'Because major structural organogenesis is complete by the end of Week 10, susceptibility to major structural teratogens decreases significantly as the fetal growth phase begins.',
      visualStage: 'fetus_early',
      scaleFactor: 0.62,
      hasScheduledVisit: true
    },
    {
      week: 11,
      trimester: 1,
      phaseLabel: '1st Trimester — Early Fetal Period',
      stageTitle: 'Midgut Retraction, Palatal Fusion & Nasal Plugs',
      biologicalStage: 'Early Fetus',
      lengthMetric: '4.1 – 4.5 cm (CRL)',
      weightMetric: '7.5 g',
      heartRateBpm: '145 – 165 BPM',
      keyOrgans: ['Abdominal Wall Closure', 'Secondary Palate Fusion', 'Hepatic Erythropoiesis', 'Hair Follicles'],
      fetalMilestones: [
        'Physiological midgut herniation resolves as the intestines rotate 270° counterclockwise and retract fully into the fetal abdomen.',
        'Maxillary palatal shelves elevate and fuse at the midline to separate the oral and nasal cavities.',
        'The fetal liver becomes the primary site of hematopoiesis (red blood cell synthesis), producing fetal hemoglobin (HbF).'
      ],
      maternalPhysiology: 'Maternal systemic vascular resistance drops due to progesterone and nitric oxide, occasionally causing orthostatic lightheadedness when standing rapidly.',
      doctorCheckIn: 'First-Trimester Nuchal Translucency (NT) Ultrasound Window (Weeks 11+0 to 13+6) & Chorionic Villus Sampling (CVS) diagnostic window (Weeks 10–13) if indicated.',
      clinicalPearl: 'Fetal Hemoglobin (HbF, alpha-2/gamma-2) has a higher affinity for oxygen than adult hemoglobin (HbA), enabling efficient oxygen transfer across the intervillous placental space.',
      visualStage: 'fetus_early',
      scaleFactor: 0.65,
      hasScheduledVisit: false
    },
    {
      week: 12,
      trimester: 1,
      phaseLabel: '1st Trimester — Milestone Week',
      stageTitle: 'Swallowing Reflex, Peristalsis & Low-Dose Aspirin Window',
      biologicalStage: 'Fetus',
      lengthMetric: '5.3 – 5.8 cm (CRL)',
      weightMetric: '14 g (0.5 oz)',
      heartRateBpm: '140 – 160 BPM',
      keyOrgans: ['Gastrointestinal Peristalsis', 'Pituitary Hormones (ACTH/TSH)', 'Spleen Lymphopoiesis', 'Ossified Clavicles/Femurs'],
      fetalMilestones: [
        'Fetus actively swallows amniotic fluid; intestinal smooth muscle initiates coordinated peristaltic contractions and glucose absorption.',
        'Primary ossification centers appear in the skull, long bones, and vertebrae.',
        'External genitalia begin morphological differentiation under DHT (male) or absence of DHT (female) signaling.'
      ],
      maternalPhysiology: 'The uterine fundus rises above the pubic symphysis, transitioning from a pelvic organ to an abdominal organ; bladder compression temporarily eases.',
      doctorCheckIn: '12-Week OB Visit + Preeclampsia Prevention Check: ACOG & USPSTF recommend starting Low-Dose Aspirin (81 mg daily from Week 12 until delivery) if you have ≥1 high risk factor or ≥2 moderate risk factors (e.g., first pregnancy, age ≥35, BMI >30).',
      clinicalPearl: 'Once a normal fetal heart rate is confirmed at 12 weeks with normal genetic screening, the statistical risk of spontaneous miscarriage drops below 1–2%.',
      visualStage: 'fetus_early',
      scaleFactor: 0.68,
      hasScheduledVisit: true
    },
    {
      week: 13,
      trimester: 1,
      phaseLabel: '1st Trimester — Final Week of 1st Trimester',
      stageTitle: 'Vocal Cord Maturation, Dermatoglyphics & Placental Autonomy',
      biologicalStage: 'Fetus',
      lengthMetric: '6.7 – 7.4 cm (CRL)',
      weightMetric: '25 g (0.9 oz)',
      heartRateBpm: '140 – 160 BPM',
      keyOrgans: ['Feto-Placental Unit', 'Fingerprints (Dermal Ridges)', 'Exocrine Pancreas (Insulin)', 'Ovarian Primordial Follicles'],
      fetalMilestones: [
        'Unique epidermal friction ridges (fingerprints) begin forming on the volar pads of the fingertips.',
        'In female fetuses, oogonia proliferate rapidly inside the developing ovaries (~2 million primordial follicles by mid-gestation).',
        'Head growth slows relative to trunk growth; the head now accounts for roughly one-third of Crown-Rump Length.'
      ],
      maternalPhysiology: 'hCG levels plateau and decline as the placenta assumes full endocrine autonomy; nausea typically begins to subside and energy returns.',
      doctorCheckIn: 'Last week for Nuchal Translucency (NT) measurement (must be completed by 13w6d / CRL ≤84 mm). Schedule dental cleaning (safe and recommended during pregnancy).',
      clinicalPearl: 'Periodontal gingivitis is common in pregnancy due to vascular permeability; routine dental hygiene and local lidocaine (without systemic epinephrine overload) are completely safe.',
      visualStage: 'fetus_early',
      scaleFactor: 0.71,
      hasScheduledVisit: false
    },
    {
      week: 14,
      trimester: 2,
      phaseLabel: '2nd Trimester — Entry',
      stageTitle: 'Lanugo Emergence, Thyroid Hormone Synthesis & Facial Expressions',
      biologicalStage: '2nd Trimester Fetus',
      lengthMetric: '8.5 cm (CRL) / ~12 cm (CHL)',
      weightMetric: '45 g (1.6 oz)',
      heartRateBpm: '135 – 155 BPM',
      keyOrgans: ['Fetal Thyroid (Thyroxine T4)', 'Cranial Nerve VII (Facial)', 'Lanugo Downy Hair', 'Prostate / Ovarian Descent'],
      fetalMilestones: [
        'Fetal thyroid gland begins trapping iodine and synthesizing endogenous thyroxine (T4) to drive neurodevelopment.',
        'Cranial nerve VII innervates facial muscles, allowing squinting, frowning, and grimacing reflexes.',
        'Ultra-fine downy hair (lanugo) begins sprouting to anchor protective vernix caseosa to the skin.'
      ],
      maternalPhysiology: 'Welcome to the Second Trimester ("golden trimester"). Appetite rebounds; cardiac output is now ~30–40% above pre-pregnancy baseline.',
      doctorCheckIn: 'If you have history of cervical insufficiency or prior spontaneous preterm birth <34 weeks, discuss cervical length surveillance or prophylactic cerclage (typically placed at 12–14 weeks).',
      clinicalPearl: 'Adequate dietary iodine (220 mcg/day total in pregnancy; check that your prenatal vitamin includes potassium iodide) is essential as the fetal thyroid becomes active at Week 14.',
      visualStage: 'fetus_mid',
      scaleFactor: 0.74,
      hasScheduledVisit: false
    },
    {
      week: 15,
      trimester: 2,
      phaseLabel: '2nd Trimester — Skeletal & Auditory Development',
      stageTitle: 'Middle Ear Ossicles, Amniotic Breathing Movements & MSAFP Window',
      biologicalStage: 'Fetus',
      lengthMetric: '10.1 cm (CRL) / ~14.5 cm (CHL)',
      weightMetric: '70 g (2.5 oz)',
      heartRateBpm: '135 – 155 BPM',
      keyOrgans: ['Malleus / Incus / Stapes', 'Tracheobronchial Tree', 'Long Bone Diaphyses', 'Taste Buds'],
      fetalMilestones: [
        'The three middle ear ossicles (malleus, incus, stapes) begin ossifying, preparing the conductive auditory pathway.',
        'Episodic fetal breathing movements draw amniotic fluid in and out of the developing bronchial tree, stimulating lung growth.',
        'Skeletal muscle innervation strengthens; legs are now longer than arms.'
      ],
      maternalPhysiology: 'Estrogen-stimulated melanocyte activity may cause linea nigra on the abdomen, darkening of areolae, and facial melasma (chloasma).',
      doctorCheckIn: 'Quad Screen / Maternal Serum Alpha-Fetoprotein (MSAFP) Window Opens (Weeks 15–20): MSAFP screens for open neural tube defects and ventral wall defects even if you already had NIPT.',
      clinicalPearl: 'Sleep positioning: Starting in the mid-second trimester, favor side-sleeping (especially left lateral) to prevent the gravid uterus from compressing the inferior vena cava.',
      visualStage: 'fetus_mid',
      scaleFactor: 0.76,
      hasScheduledVisit: false
    },
    {
      week: 16,
      trimester: 2,
      phaseLabel: '2nd Trimester — 4-Month Milestone',
      stageTitle: 'Saccadic Eye Movements, Coordinated Limb Flexion & Quickening Window',
      biologicalStage: 'Fetus',
      lengthMetric: '11.6 cm (CRL) / ~16.5 cm (CHL)',
      weightMetric: '100 g (3.5 oz)',
      heartRateBpm: '130 – 155 BPM',
      keyOrgans: ['Extraocular Muscles', 'Umbilical Cord Wharton Jelly', 'Fetal Bladder Cycling', 'Cutaneous Sensory Receptors'],
      fetalMilestones: [
        'Slow saccadic eye movements begin beneath fused eyelids as midbrain oculomotor nuclei mature.',
        'The fetal heart pumps ~25 quarts of blood per day through the 3-vessel umbilical cord (2 arteries, 1 vein encased in Wharton’s jelly).',
        'Fetal bladder fills and empties every 30–45 minutes, maintaining amniotic fluid volume and cushioning.'
      ],
      maternalPhysiology: 'Multiparous parents (and those with a posterior placenta) may begin noticing the first subtle flutterings of fetal movement ("quickening") between Weeks 16 and 20.',
      doctorCheckIn: '16-Week Routine OB Visit: Blood pressure, weight, urine dipstick, fetal heart tones via handheld Doppler, and MSAFP / Quad Screen blood draw if elected. Schedule your 20-week Anatomy Scan!',
      clinicalPearl: 'If you have an anterior placenta (placenta attached to the front uterine wall), it acts as a cushion and commonly delays feeling first kicks until Weeks 20–22—this is completely normal.',
      visualStage: 'fetus_mid',
      scaleFactor: 0.78,
      hasScheduledVisit: true
    },
    {
      week: 17,
      trimester: 2,
      phaseLabel: '2nd Trimester — Adipose & Immune Maturation',
      stageTitle: 'Brown Adipose Tissue Deposition & Transplacental IgG Initiation',
      biologicalStage: 'Fetus',
      lengthMetric: '13.0 cm (CRL) / ~18.5 cm (CHL)',
      weightMetric: '140 g (5.0 oz)',
      heartRateBpm: '130 – 155 BPM',
      keyOrgans: ['Brown Adipose Tissue (BAT)', 'Cochlear Hair Cells', 'Sweat Glands', 'FcRn Placental IgG Receptors'],
      fetalMilestones: [
        'Specialized Brown Adipose Tissue (BAT) begins depositing around the neck, sternum, and kidneys for non-shivering thermogenesis after birth.',
        'Syncytiotrophoblast FcRn receptors initiate active transport of maternal IgG antibodies into fetal circulation.',
        'Cochlear hair cells align in the organ of Corti; low-frequency internal maternal sounds (heartbeat, aortic blood flow) begin stimulating the inner ear.'
      ],
      maternalPhysiology: 'Round ligament stretching along the lateral pelvis can cause brief, sharp groins twinges ("round ligament pain") when rolling over, coughing, or standing.',
      doctorCheckIn: 'Amniocentesis Diagnostic Window (Weeks 15–20): Offered if NIPT/Quad screen was high-risk, ultrasound shows an anomaly, or parents desire diagnostic microarray/karyotype certainty.',
      clinicalPearl: 'Round ligament pain is sharp, brief (seconds), and triggered by movement. Persistent, worsening, or rhythmic cramping accompanied by bleeding or fever always warrants an OB evaluation.',
      visualStage: 'fetus_mid',
      scaleFactor: 0.80,
      hasScheduledVisit: false
    },
    {
      week: 18,
      trimester: 2,
      phaseLabel: '2nd Trimester — Neuro-Sensory Expansion',
      stageTitle: 'Myelination Initiation, Vernix Caseosa & Early Anatomy Window',
      biologicalStage: 'Fetus',
      lengthMetric: '14.2 cm (CRL) / ~20.5 cm (CHL)',
      weightMetric: '190 g (6.7 oz)',
      heartRateBpm: '125 – 155 BPM',
      keyOrgans: ['Schwann Cell Myelination', 'Sebaceous Glands (Vernix)', 'Cardiac Outflow Tracts', 'Corpus Callosum'],
      fetalMilestones: [
        'Sebaceous glands secrete Vernix Caseosa—a lipid-rich, antimicrobial biofilm that waterproofs fetal skin against amniotic fluid maceration.',
        'Peripheral Schwann cells and central oligodendrocytes begin wrapping axons in myelin to accelerate nerve impulse conduction.',
        'The corpus callosum bridges the left and right cerebral hemispheres; cardiac outflow tracts (aorta and pulmonary artery) are clearly distinguishable on ultrasound.'
      ],
      maternalPhysiology: 'Mid-pregnancy physiological blood pressure nadir: systemic vasodilation causes blood pressure to reach its lowest point (~5–10 mmHg below baseline) around Weeks 18–20.',
      doctorCheckIn: 'Level II Comprehensive Anatomy Ultrasound Window Opens (Weeks 18–22): Most OBs and MFMs prefer scheduling between 19w0d and 21w0d for optimal visualization of the fetal heart and spine.',
      clinicalPearl: 'During your Anatomy Scan, the sonographer will also measure transvaginal or transabdominal Cervical Length (normal ≥25 mm at 18–24 weeks) to screen for preterm birth risk.',
      visualStage: 'fetus_mid',
      scaleFactor: 0.82,
      hasScheduledVisit: false
    },
    {
      week: 19,
      trimester: 2,
      phaseLabel: '2nd Trimester — Sensory Cortical Mapping',
      stageTitle: 'Somatosensory Cortex Mapping & Renal Tubular Concentration',
      biologicalStage: 'Fetus',
      lengthMetric: '15.3 cm (CRL) / ~22.5 cm (CHL)',
      weightMetric: '240 g (8.5 oz)',
      heartRateBpm: '125 – 155 BPM',
      keyOrgans: ['Somatosensory Cortex', 'Loops of Henle', 'Permanent Tooth Buds', 'Bronchiolar Branching'],
      fetalMilestones: [
        'Thalamocortical projections reach the subplate of the cerebral cortex, laying the foundation for auditory, visual, and tactile processing.',
        'Permanent adult tooth buds form deep behind the primary (baby) tooth buds in the maxilla and mandible.',
        'Canalicular stage of lung development begins: respiratory bronchioles divide and pulmonary capillaries proliferate.'
      ],
      maternalPhysiology: 'Maternal blood volume has expanded by ~30–35%; increased iron demand for maternal RBC mass expansion requires steady dietary and prenatal iron intake.',
      doctorCheckIn: 'Prepare questions for your 20-week OB visit and Anatomy Scan (e.g., placental location relative to the cervix, umbilical cord vessel count, and childbirth education class registration).',
      clinicalPearl: 'If a placenta is noted to be "low-lying" or marginal at 19–20 weeks, >90% resolve spontaneously ("placental trophotropism") as the lower uterine segment elongates by Week 32.',
      visualStage: 'fetus_mid',
      scaleFactor: 0.84,
      hasScheduledVisit: false
    },
    {
      week: 20,
      trimester: 2,
      phaseLabel: '2nd Trimester — Halfway Milestone',
      stageTitle: 'Midpoint Milestone: Level II Anatomy Scan & Fundus at Umbilicus',
      biologicalStage: 'Mid-Gestation Fetus',
      lengthMetric: '25.5 cm (10.0 in Crown-Heel Length)',
      weightMetric: '300 g (10.6 oz)',
      heartRateBpm: '120 – 155 BPM',
      keyOrgans: ['4-Chamber Heart & Outflow Views', 'Posterior Fossa / Cerebellum', 'Meconium Accumulation', 'Epidermal Stratum Corneum'],
      fetalMilestones: [
        'From Week 20 onward, obstetricians measure total Crown-Heel Length (CHL) rather than Crown-Rump Length because fetal legs uncurl.',
        'Sterile meconium (sloughed intestinal epithelial cells, lanugo, bile pigments, and amniotic fluid) accumulates in the fetal colon.',
        'Circadian sleep-wake cycles emerge: the fetus alternates between 20–40 minute periods of active movement and quiet rest.'
      ],
      maternalPhysiology: 'The uterine fundus reaches the level of the maternal umbilicus (belly button). From Week 20 to 36, fundal height in centimeters roughly equals gestational age in weeks (±2 cm).',
      doctorCheckIn: '20-Week OB Visit & Level II Anatomy Ultrasound (Weeks 18–22): Detailed head-to-toe structural survey of brain ventricles, profile/lips, 4-chamber heart, outflow tracts, stomach, kidneys, bladder, spine, 3-vessel cord, placenta, and cervical length.',
      clinicalPearl: 'Why blood pressure after Week 20 matters: New-onset hypertension (BP ≥140/90) developing at or after Week 20 is the diagnostic threshold for Gestational Hypertension or Preeclampsia.',
      visualStage: 'fetus_mid',
      scaleFactor: 0.86,
      hasScheduledVisit: true
    },
    {
      week: 21,
      trimester: 2,
      phaseLabel: '2nd Trimester — Hematopoietic Shift',
      stageTitle: 'Bone Marrow Hematopoiesis & Digestive Enzyme Maturation',
      biologicalStage: 'Fetus',
      lengthMetric: '26.7 cm (10.5 in CHL)',
      weightMetric: '360 g (12.7 oz)',
      heartRateBpm: '120 – 155 BPM',
      keyOrgans: ['Bone Marrow Erythropoiesis', 'Small Intestinal Villi', 'Spleen Red Pulp', 'Vestibular Labyrinth'],
      fetalMilestones: [
        'Bone marrow begins taking over red and white blood cell production from the liver and spleen.',
        'Intestinal microvilli express disaccharidase enzymes (lactase, sucrase), absorbing water and electrolytes from swallowed amniotic fluid.',
        'Vestibular semicircular canals in the inner ear sense maternal motion, rocking when you walk and often becoming more active when you lie down.'
      ],
      maternalPhysiology: 'Relaxin hormone softens the pubic symphysis and sacroiliac joints to prepare the pelvic ring for birth, which can cause mild pelvic girdle ache.',
      doctorCheckIn: 'If the 20-week scan had suboptimal views due to fetal position (e.g., spine or outflow tracts shadowed), a brief follow-up ultrasound is routinely scheduled in 2–4 weeks.',
      clinicalPearl: 'Why babies seem most active at night: Walking gently rocks the fetus to sleep; when you lie quietly in bed and have an evening snack, fetal alertness peaks.',
      visualStage: 'fetus_mid',
      scaleFactor: 0.87,
      hasScheduledVisit: false
    },
    {
      week: 22,
      trimester: 2,
      phaseLabel: '2nd Trimester — Auditory & Tactile Integration',
      stageTitle: 'Auditory Voice Recognition, Eyebrows & Grip Reflex',
      biologicalStage: 'Fetus',
      lengthMetric: '27.8 cm (10.9 in CHL)',
      weightMetric: '430 g (15.2 oz)',
      heartRateBpm: '120 – 155 BPM',
      keyOrgans: ['Cochlear-Auditory Cortex Pathway', 'Palmar Grasp Reflex', 'Lacrimal Tear Ducts', 'Alveolar Duct Primordia'],
      fetalMilestones: [
        'Auditory brainstem responses mature; the fetus can hear and begin learning the cadence of the maternal voice and low-pitched external voices.',
        'Palmar grasp reflex develops—the fetus frequently grasps the umbilical cord (Wharton’s jelly protects the vessels from compression).',
        'Eyebrows and fine scalp hair are visible, though melanin pigment is not yet fully deposited.'
      ],
      maternalPhysiology: 'Physiological hemodilution: plasma volume increases faster (~45–50%) than red blood cell mass (~25–30%), causing a normal dip in hemoglobin/hematocrit.',
      doctorCheckIn: 'If indicated (e.g., IVF conception, maternal pre-existing diabetes, or family history of congenital heart disease), a specialized Fetal Echocardiogram is performed around Weeks 20–22.',
      clinicalPearl: 'Occasional painless, irregular tightening of the uterus lasting <30 seconds (Braxton Hicks contractions) can begin in the second half of pregnancy; hydration and rest resolve them.',
      visualStage: 'fetus_late',
      scaleFactor: 0.88,
      hasScheduledVisit: false
    },
    {
      week: 23,
      trimester: 2,
      phaseLabel: '2nd Trimester — Periviable Pulmonary Threshold',
      stageTitle: 'Type II Pneumocytes & Early Surfactant Lipoprotein Synthesis',
      biologicalStage: 'Fetus (Periviable Window)',
      lengthMetric: '28.9 cm (11.4 in CHL)',
      weightMetric: '500 g (1.1 lbs)',
      heartRateBpm: '120 – 155 BPM',
      keyOrgans: ['Type II Alveolar Pneumocytes', 'Pulmonary Capillary Bed', 'Rapid Eye Movement (REM) Sleep', 'Islets of Langerhans'],
      fetalMilestones: [
        'Cuboidal Type II pneumocytes differentiate in the distal airways and begin synthesizing early surfactant lamellar bodies.',
        'Pulmonary capillaries move into close apposition with the airway epithelium, establishing the primitive blood-air barrier.',
        'Rapid Eye Movement (REM) sleep cycles begin, essential for endogenous neural circuit wiring in the visual and sensorimotor cortices.'
      ],
      maternalPhysiology: 'Upward displacement of the stomach and lower esophageal sphincter relaxation by progesterone can trigger gastroesophageal reflux (heartburn).',
      doctorCheckIn: 'Know the signs of Preterm Labor: Regular pelvic pressure or cramping (>4–6 contractions/hour), low dull backache, change in vaginal discharge (watery/mucoid/bloody).',
      clinicalPearl: 'Weeks 23–24 represent the periviable threshold in modern Level III/IV NICUs, where antenatal corticosteroids (betamethasone) dramatically accelerate fetal lung maturation if preterm delivery threatens.',
      visualStage: 'fetus_late',
      scaleFactor: 0.89,
      hasScheduledVisit: false
    },
    {
      week: 24,
      trimester: 2,
      phaseLabel: '2nd Trimester — Viability & Glucose Screening Window',
      stageTitle: 'Saccular Lung Transition, Viability Milestone & GCT Window Opens',
      biologicalStage: 'Fetus',
      lengthMetric: '30.0 cm (11.8 in CHL)',
      weightMetric: '600 g (1.32 lbs)',
      heartRateBpm: '120 – 155 BPM',
      keyOrgans: ['Terminal Saccules (Lungs)', 'Inner Ear Vestibular System', 'Fetal Pancreatic Beta Cells', 'Cutaneous Capillaries'],
      fetalMilestones: [
        'Lungs transition from the canalicular to the saccular stage: terminal saccules bud at the ends of respiratory bronchioles.',
        'Inner ear vestibular apparatus is structurally mature, giving the fetus a complete sense of spatial orientation in the amniotic sac.',
        'Subcutaneous capillary beds fill with blood, shifting fetal skin from translucent to pink-red.'
      ],
      maternalPhysiology: 'Placental secretion of Human Placental Lactogen (hPL), cortisol, and growth hormone peaks in the late 2nd trimester, creating physiological maternal insulin resistance to shuttle glucose to the fetus.',
      doctorCheckIn: '24-Week OB Visit + Gestational Diabetes Screening Window Opens (Weeks 24–28): Order set given for the 1-Hour 50g Oral Glucose Challenge Test (GCT) and repeat 3rd-trimester CBC/Antibody screen.',
      clinicalPearl: 'Why Gestational Diabetes (GDM) is screened at 24–28 weeks: Placental anti-insulin hormones (hPL) rise sharply at Week 24, unmasking pancreatic beta-cell insufficiency in ~6–9% of pregnancies.',
      visualStage: 'fetus_late',
      scaleFactor: 0.90,
      hasScheduledVisit: true
    },
    {
      week: 25,
      trimester: 2,
      phaseLabel: '2nd Trimester — Vascular & Nasal Patency',
      stageTitle: 'Nasal Plug Dissolution, Capillary Arborization & Spinal Ossification',
      biologicalStage: 'Fetus',
      lengthMetric: '34.6 cm (13.6 in CHL)',
      weightMetric: '660 g (1.45 lbs)',
      heartRateBpm: '120 – 155 BPM',
      keyOrgans: ['Patent Nares (Nostrils)', 'Pulmonary Surfactant (SP-B/SP-C)', 'Vertebral Arch Ossification', 'Hand Dominance Circuits'],
      fetalMilestones: [
        'Epithelial plugs inside the nostrils dissolve, opening the nasal passages for practice amniotic breathing.',
        'Surfactant proteins B and C (SP-B, SP-C) increase inside Type II pneumocytes.',
        'Spinal column structures (33 rings, 150 joints, 1,000 ligaments) strengthen to support growing body mass.'
      ],
      maternalPhysiology: 'Lower extremity venous pressure rises, occasionally causing nocturnal calf cramps or mild ankle edema at the end of the day.',
      doctorCheckIn: 'Complete your 1-Hour Glucose Challenge Test (50g Glucola) between Weeks 24 and 28. You do not need to fast for the 1-hour screening test unless instructed by your OB.',
      clinicalPearl: 'If your 1-hour GCT is ≥135–140 mg/dL, do not panic: it is a screening test, not a diagnosis. About 75–80% of patients who take the follow-up fasting 3-hour 100g GTT pass normally.',
      visualStage: 'fetus_late',
      scaleFactor: 0.91,
      hasScheduledVisit: false
    },
    {
      week: 26,
      trimester: 2,
      phaseLabel: '2nd Trimester — Visual Awakening',
      stageTitle: 'Eyelid Separation, Blink-Startle Reflex & Retinal Rods',
      biologicalStage: 'Fetus',
      lengthMetric: '35.6 cm (14.0 in CHL)',
      weightMetric: '760 g (1.68 lbs)',
      heartRateBpm: '120 – 155 BPM',
      keyOrgans: ['Retinal Photoreceptors', 'Optic Nerve Myelination', 'Vibroacoustic Startle Reflex', 'Testicular Inguinal Descent'],
      fetalMilestones: [
        'Fused eyelids unzip and open for the first time since Week 9; the fetus blinks in response to bright transabdominal light or loud sounds (vibroacoustic startle reflex).',
        'Retinal rods and cones differentiate in the posterior eye.',
        'In male fetuses, the gubernaculum guides the testes down into the inguinal canal toward the scrotum.'
      ],
      maternalPhysiology: 'Ribcage circumference expands by 5–7 cm as the diaphragm elevates ~4 cm; non-pregnant tidal volume increases by 30–40%, which can cause mild physiological awareness of breathing.',
      doctorCheckIn: 'Review your third-trimester CBC hemoglobin/hematocrit and ferritin results with your provider to check for iron-deficiency anemia (Hb <10.5 g/dL in 2nd trimester or <11.0 g/dL in 3rd trimester).',
      clinicalPearl: 'Taking oral iron supplements with Vitamin C (orange juice) on an empty stomach or every other day improves duodenal absorption and reduces constipation.',
      visualStage: 'fetus_late',
      scaleFactor: 0.92,
      hasScheduledVisit: false
    },
    {
      week: 27,
      trimester: 2,
      phaseLabel: '2nd Trimester — Final Week of 2nd Trimester',
      stageTitle: 'Thalamocortical Pain Pathways, Hiccups & Tdap Window Opens',
      biologicalStage: 'Fetus',
      lengthMetric: '36.6 cm (14.4 in CHL)',
      weightMetric: '875 g (1.93 lbs)',
      heartRateBpm: '120 – 155 BPM',
      keyOrgans: ['Cerebral Gyri Beginning', 'Phrenic Nerve / Diaphragm', 'Fetal Spleen & Thymus', 'Subcutaneous White Fat'],
      fetalMilestones: [
        'Rhythmic fetal diaphragmatic spasms (fetal hiccups) become frequent and palpable as regular, gentle taps every few seconds.',
        'Smooth (lissencephalic) cerebral hemispheres begin forming primary sulci and gyri (grooves and folds) to expand cortical surface area.',
        'T-lymphocytes mature in the fetal thymus.'
      ],
      maternalPhysiology: 'As the second trimester concludes, uterine fundus sits ~7 cm above the umbilicus; mild carpal tunnel tingling can occur from fluid retention in the wrist flexor retinaculum.',
      doctorCheckIn: 'Tdap Vaccine Window Opens (Weeks 27–36): CDC & ACOG recommend Tdap during EVERY pregnancy between 27 and 36 weeks (ideally 27–30w) to maximize maternal pertussis IgG transfer to the newborn.',
      clinicalPearl: 'Fetal hiccups are a completely normal sign of phrenic nerve and brainstem respiratory center maturation—unlike kicks, they feel like a steady rhythmic pulse for 5–15 minutes.',
      visualStage: 'fetus_late',
      scaleFactor: 0.93,
      hasScheduledVisit: false
    },
    {
      week: 28,
      trimester: 3,
      phaseLabel: '3rd Trimester — Entry & Bi-Weekly Care Transition',
      stageTitle: '3rd Trimester Entry, Rhogam Prophylaxis & Daily Kick Counts',
      biologicalStage: '3rd Trimester Fetus',
      lengthMetric: '37.6 cm (14.8 in CHL)',
      weightMetric: '1,005 g (2.22 lbs — 1 kg Milestone!)',
      heartRateBpm: '115 – 155 BPM',
      keyOrgans: ['Pupillary Light Reflex', 'Surfactant Lecithin Synthesis', 'Cerebellar Folia', 'Rh(D) Antigen Expression'],
      fetalMilestones: [
        'Fetus crosses the 1-kilogram (2.2 lb) milestone; subcutaneous white adipose tissue reaches ~2–3% of body weight.',
        'Pupils constrict and dilate in response to light; sleep cycles show distinct REM and non-REM brainwave patterns.',
        'Bronchopulmonary surfactant production accelerates, raising the lecithin-to-sphingomyelin (L/S) ratio.'
      ],
      maternalPhysiology: 'Welcome to the Third Trimester. Uterine blood flow now reaches ~500–700 mL/minute (~80% perfusing the placenta).',
      doctorCheckIn: '28-Week OB Visit (Transition to Every-2-Week Visits): Finalize 1-hour GCT, administer Tdap vaccine, administer Rho(D) Immune Globulin (RhoGAM 300 mcg IM) if maternal blood type is Rh-negative, and start Daily Kick Counts.',
      clinicalPearl: 'ACOG Kick Count Protocol (Starting at Week 28): Once daily (ideally after a meal), lie on your side and time how long it takes to feel 10 distinct movements (kicks, rolls, jabs—not hiccups). Normal is <2 hours (often <30 mins). If <10 movements in 2 hours, call L&D immediately for a Non-Stress Test.',
      visualStage: 'fetus_late',
      scaleFactor: 0.94,
      hasScheduledVisit: true
    },
    {
      week: 29,
      trimester: 3,
      phaseLabel: '3rd Trimester — Skeletal Mineralization',
      stageTitle: 'Rapid Calcium Accretion & Hypothalamic Thermoregulation',
      biologicalStage: 'Fetus',
      lengthMetric: '38.6 cm (15.2 in CHL)',
      weightMetric: '1,150 g (2.54 lbs)',
      heartRateBpm: '115 – 155 BPM',
      keyOrgans: ['Osteoblast Calcium Accretion', 'Hypothalamic Preoptic Nucleus', 'Adrenal DHEA-S Synthesis', 'Alveolar Septation'],
      fetalMilestones: [
        'The placenta actively pumps ~250–300 mg of elemental calcium per day from maternal circulation into the fetal skeleton.',
        'The hypothalamus matures its central thermoregulatory circuits.',
        'Fetal adrenal glands enlarge and secrete DHEA-S, which the placenta converts into estriol.'
      ],
      maternalPhysiology: 'Growing fetal weight and lumbar lordosis shift your center of gravity forward; supportive footwear and pelvic tilts reduce lumbosacral strain.',
      doctorCheckIn: 'No standard visit this week (bi-weekly cadence: next visit at Week 30). Monitor blood pressure and fetal kick counts daily.',
      clinicalPearl: 'In the third trimester, the fetus acquires 80% of its total bone calcium and iron stores—ensure 1,000 mg/day of dietary calcium and steady iron intake.',
      visualStage: 'fetus_late',
      scaleFactor: 0.95,
      hasScheduledVisit: false
    },
    {
      week: 30,
      trimester: 3,
      phaseLabel: '3rd Trimester — Cortical Folding & Bone Marrow Dominance',
      stageTitle: 'Deepening Cerebral Gyri, Bone Marrow Dominance & Amniotic Peak',
      biologicalStage: 'Fetus',
      lengthMetric: '39.9 cm (15.7 in CHL)',
      weightMetric: '1,320 g (2.91 lbs)',
      heartRateBpm: '115 – 155 BPM',
      keyOrgans: ['Secondary & Tertiary Sulci', 'Medullary Bone Marrow', 'Diaphragmatic Breathing Cycles', 'Lanugo Shedding Begins'],
      fetalMilestones: [
        'Cerebral cortex undergoes rapid gyrification, forming deep secondary sulci that support higher-order cognition.',
        'Bone marrow is now the primary hematopoietic organ; fetal red blood cells circulate with a ~60–90 day lifespan.',
        'As subcutaneous fat thickens, early lanugo hair begins shedding into the amniotic fluid.'
      ],
      maternalPhysiology: 'Amniotic fluid volume approaches its physiological peak (~800–1,000 mL between Weeks 30 and 34) before gradually tapering near term.',
      doctorCheckIn: '30-Week Bi-Weekly OB Visit: Blood pressure, urine protein/glucose screen, fundal height measurement (~28–32 cm), fetal heart rate via Doppler, and review of preterm labor precautions.',
      clinicalPearl: 'If fundal height measures >3 cm above or below gestational week (size-dates discrepancy), your OB will order a targeted third-trimester growth and amniotic fluid ultrasound.',
      visualStage: 'fetus_late',
      scaleFactor: 0.96,
      hasScheduledVisit: true
    },
    {
      week: 31,
      trimester: 3,
      phaseLabel: '3rd Trimester — Synaptogenesis & Lipid Surge',
      stageTitle: 'Trillions of Synaptic Connections & DHA Brain Accretion',
      biologicalStage: 'Fetus',
      lengthMetric: '41.1 cm (16.2 in CHL)',
      weightMetric: '1,500 g (3.31 lbs)',
      heartRateBpm: '115 – 155 BPM',
      keyOrgans: ['Retinal-Visual Cortex Loop', 'DHA Phospholipid Membranes', 'Renal Glomerular Filtration', 'Suck-Swallow Coordination'],
      fetalMilestones: [
        'The fetal brain accumulates ~50–70 mg/day of omega-3 DHA into neuronal cell membranes and retinal photoreceptors.',
        'All five special senses (vision, hearing, taste, olfaction via amniotic fluid odorants, and touch) are functionally active.',
        'Fetus gains roughly 150–200 grams (0.35–0.5 lbs) per week from now until term.'
      ],
      maternalPhysiology: 'Colostrum (immunoglobulin A-rich pre-milk) is synthesized in mammary alveoli; occasional drops may express spontaneously.',
      doctorCheckIn: 'If you have high-risk conditions (e.g., AMA ≥35–40, medication-controlled GDM, chronic hypertension, or twins), weekly or twice-weekly Non-Stress Tests (NST) / Biophysical Profiles (BPP) typically begin at Week 32.',
      clinicalPearl: 'Flavor learning in utero: Aromatic compounds from your diet (garlic, vanilla, carrot, mint) cross into amniotic fluid and are tasted by the fetus, shaping postnatal food familiarity.',
      visualStage: 'fetus_late',
      scaleFactor: 0.97,
      hasScheduledVisit: false
    },
    {
      week: 32,
      trimester: 3,
      phaseLabel: '3rd Trimester — Cephalic Positioning & RSV Protection',
      stageTitle: 'Cephalic Version, Fingernails Complete & RSV Vaccine Window',
      biologicalStage: 'Fetus (Cephalic Engagement Phase)',
      lengthMetric: '42.4 cm (16.7 in CHL)',
      weightMetric: '1,700 g (3.75 lbs)',
      heartRateBpm: '110 – 155 BPM',
      keyOrgans: ['Cephalic Presentation', 'Surfactant Phosphatidylglycerol', 'Complete Fingernail Bed', 'Maternal-Fetal IgG Surge'],
      fetalMilestones: [
        'Approximately 85–90% of fetuses rotate into the head-down (cephalic/vertex) presentation to accommodate the pear-shaped uterine cavity.',
        'Fingernails reach the tips of the fingers; skin becomes smooth and opaque as white adipose tissue reaches ~7–8% of body weight.',
        'Fetal breathing movements occur 30–40% of the time during active sleep, a key marker scored on Biophysical Profile ultrasounds.'
      ],
      maternalPhysiology: 'Maternal plasma volume reaches its maximum expansion (+45–50% above non-pregnant baseline), placing peak workload on the cardiovascular system.',
      doctorCheckIn: '32-Week Bi-Weekly OB Visit + RSV Maternal Vaccine Window Opens (Weeks 32–36): CDC & ACOG recommend 1 dose of maternal RSV vaccine (Abrysvo) between 32w0d and 36w6d during RSV season (Sept–Jan) to protect newborns against severe RSV bronchiolitis.',
      clinicalPearl: 'Why movements feel different at 32+ weeks: As uterine space tightens, sharp high-amplitude kicks transition into forceful rolls, stretches, and elbow/heel presses—total movement frequency should NOT decrease!',
      visualStage: 'fetus_term',
      scaleFactor: 0.98,
      hasScheduledVisit: true
    },
    {
      week: 33,
      trimester: 3,
      phaseLabel: '3rd Trimester — Immune & Cranial Pliability',
      stageTitle: 'Cranial Fontanelles, Peak IgG Transfer & sucking Coordination',
      biologicalStage: 'Fetus',
      lengthMetric: '43.7 cm (17.2 in CHL)',
      weightMetric: '1,920 g (4.23 lbs)',
      heartRateBpm: '110 – 155 BPM',
      keyOrgans: ['Anterior & Posterior Fontanelles', 'Suck-Swallow-Breathe Triad', 'Nephron Completion Soon', 'Placental IgG Transport'],
      fetalMilestones: [
        'While long bones are well-calcified, cranial skull plates remain separated by fibrous sutures and fontanelles ("soft spots") so the head can mold safely through the birth canal.',
        'Transplacental IgG levels in the fetus approach and will soon exceed maternal serum concentrations.',
        'Brainstem nuclei begin coordinating the rhythmic suck-swallow-breathe triad.'
      ],
      maternalPhysiology: 'Uterine fundus approaches the xiphoid process; smaller, more frequent meals and elevating the head of the bed help relieve reflux and post-prandial fullness.',
      doctorCheckIn: 'Select and confirm your Pediatrician practice, verify insurance coverage for newborn admission, and install your rear-facing infant car seat.',
      clinicalPearl: 'Fetal heart rate accelerations (increases of ≥15 BPM lasting ≥15 seconds in response to fetal movement) are the hallmark of a well-oxygenated, reactive fetal autonomic nervous system.',
      visualStage: 'fetus_term',
      scaleFactor: 0.99,
      hasScheduledVisit: false
    },
    {
      week: 34,
      trimester: 3,
      phaseLabel: '3rd Trimester — Late Preterm Threshold & Nephrogenesis Completion',
      stageTitle: 'Completion of Lifelong Nephrogenesis & Surfactant Surge',
      biologicalStage: 'Late Preterm Threshold Fetus',
      lengthMetric: '45.0 cm (17.7 in CHL)',
      weightMetric: '2,150 g (4.74 lbs)',
      heartRateBpm: '110 – 155 BPM',
      keyOrgans: ['1 Million Nephrons per Kidney', 'Phosphatidylcholine Surfactant', 'Vernix Thickening', 'Testicular Scrotal Descent'],
      fetalMilestones: [
        'Human nephrogenesis (formation of new kidney filtering units) permanently completes between Weeks 34 and 36 with ~1 million nephrons per kidney.',
        'Pulmonary surfactant secretion surges; infants born at or after 34 weeks have >98% survival with minimal long-term respiratory morbidity.',
        'Vernix caseosa coating is thick and creamy; fingernails and toenails are well-formed.'
      ],
      maternalPhysiology: 'Physiological ankle/foot swelling is common in the evening, whereas sudden facial/hand swelling paired with headache or visual spots requires an immediate blood pressure check.',
      doctorCheckIn: '34-Week Bi-Weekly OB Visit: Blood pressure & preeclampsia symptom screen, fundal height, fetal heart tones, Leopold maneuvers to assess presentation, and birth preferences / pain management review.',
      clinicalPearl: 'Week 34 marks a major clinical milestone in obstetrics: after 34w0d, tocolytics to delay preterm labor are rarely needed because fetal lung and systemic maturity are well advanced.',
      visualStage: 'fetus_term',
      scaleFactor: 1.00,
      hasScheduledVisit: true
    },
    {
      week: 35,
      trimester: 3,
      phaseLabel: '3rd Trimester — Hepatic & Metabolic Readiness',
      stageTitle: 'Hepatic Glycogen Storage, Iron Reserves & Rapid Adipose Gain',
      biologicalStage: 'Fetus',
      lengthMetric: '46.2 cm (18.2 in CHL)',
      weightMetric: '2,385 g (5.25 lbs)',
      heartRateBpm: '110 – 150 BPM',
      keyOrgans: ['Hepatic Glycogen & Iron Stores', 'Bilirubin Conjugation (UGT1A1)', 'Subcutaneous Fat (10% BW)', 'Coordinated Sucking Reflex'],
      fetalMilestones: [
        'Fetal liver rapidly stores glycogen (to maintain blood glucose during the gap between umbilical cord clamping and mature milk letdown) and ferritin.',
        'Kidneys and liver are structurally complete and maturing enzymatic pathways (such as UGT1A1 for bilirubin processing).',
        'Fetus gains ~30 grams (1 oz) of fat every single day.'
      ],
      maternalPhysiology: 'Pelvic pressure increases as the lower uterine segment thins and stretches; urinary frequency returns as the fetal head settles deeper.',
      doctorCheckIn: 'Next week (Week 36) transitions to WEEKLY OB visits and includes the Group B Strep (GBS) swab and formal fetal presentation check.',
      clinicalPearl: 'Pack your hospital bag by Week 35 (insurance card, ID, birth preferences, nursing bra, chargers, going-home outfit for baby) and pre-register with your hospital’s Labor & Delivery unit.',
      visualStage: 'fetus_term',
      scaleFactor: 1.01,
      hasScheduledVisit: false
    },
    {
      week: 36,
      trimester: 3,
      phaseLabel: '3rd Trimester — Weekly Visits & GBS Screening',
      stageTitle: 'Alveolar Lung Stage, GBS Screening & Lightening',
      biologicalStage: 'Late Preterm Fetus (Transition to Weekly Care)',
      lengthMetric: '47.4 cm (18.7 in CHL)',
      weightMetric: '2,620 g (5.78 lbs)',
      heartRateBpm: '110 – 150 BPM',
      keyOrgans: ['True Pulmonary Alveoli', 'Vernix Shedding into Amniotic Fluid', 'Cephalic Engagement', 'Meconium-Filled Colon'],
      fetalMilestones: [
        'Lungs enter the final Alveolar Stage (Week 36 through early childhood), forming true thin-walled alveoli primed for gas exchange.',
        'Shed vernix caseosa and lanugo mix into the amniotic fluid, which the fetus swallows to form dark green-black first stool (meconium).',
        'In first pregnancies, the fetal head often descends ("lightening" or engagement) into the pelvic inlet.'
      ],
      maternalPhysiology: 'When "lightening" occurs, upper ribcage pressure eases (making breathing and eating easier) while pelvic floor pressure and sciatic/pubic symphysis sensation increase.',
      doctorCheckIn: '36-Week OB Visit (Start of Weekly Visits!): Group B Streptococcus (GBS) rectovaginal swab (performed between 36w0d and 37w6d) and confirmation of vertex (head-down) presentation via Leopold maneuvers or bedside ultrasound.',
      clinicalPearl: 'Why GBS testing is done at 36–37 weeks: ~25% of healthy adults carry Group B Strep asymptomatically. If positive, simple IV penicillin/ampicillin during labor reduces newborn GBS sepsis risk by >80%. Also: if fetus is breech at 36w, External Cephalic Version (ECV) is discussed for Week 37.',
      visualStage: 'fetus_term',
      scaleFactor: 1.02,
      hasScheduledVisit: true
    },
    {
      week: 37,
      trimester: 3,
      phaseLabel: '3rd Trimester — Early Term (37w0d–38w6d)',
      stageTitle: 'Early Term Milestone, ECV Window & Labor Triage Rule (5-1-1)',
      biologicalStage: 'Early Term Fetus',
      lengthMetric: '48.6 cm (19.1 in CHL)',
      weightMetric: '2,860 g (6.30 lbs)',
      heartRateBpm: '110 – 150 BPM',
      keyOrgans: ['Mature Surfactant L/S Ratio ≥2:1', 'Myelinated Corticospinal Tracts', 'Ductus Arteriosus Patency', 'Buccal Sucking Pads'],
      fetalMilestones: [
        'At 37w0d, pregnancy reaches "Early Term" status (ACOG defines Early Term as 37w0d–38w6d, and Full Term as 39w0d–40w6d).',
        'Prominent buccal fat pads fill out the cheeks, providing mechanical suction stability for breastfeeding or bottle feeding.',
        'Fetal adrenal cortisol surge upregulates pulmonary fluid reabsorption channels (ENaC) to clear lung fluid immediately at birth.'
      ],
      maternalPhysiology: 'Cervical ripening begins silently: collagen fibers remodel through prostaglandin and metalloproteinase activity, softening the cervix from firm (like a nose tip) to soft (like lips) and moving it anteriorly.',
      doctorCheckIn: '37-Week Weekly OB Visit: Review GBS test result, blood pressure, fetal heart tones, and review the "5-1-1 / 4-1-1" Labor Rule, rupture of membranes ("water breaking"), and when to go to L&D.',
      clinicalPearl: 'Why ACOG avoids elective delivery before 39w0d without medical indication: Between Weeks 37 and 39, the fetal brain increases in weight by ~30% and late-preterm/early-term respiratory transition completes.',
      visualStage: 'fetus_term',
      scaleFactor: 1.03,
      hasScheduledVisit: true
    },
    {
      week: 38,
      trimester: 3,
      phaseLabel: '3rd Trimester — Early Term',
      stageTitle: 'Surfactant Phosphatidylglycerol Peak, Vocal Cords & Nesting',
      biologicalStage: 'Early Term Fetus',
      lengthMetric: '49.8 cm (19.6 in CHL)',
      weightMetric: '3,080 g (6.79 lbs)',
      heartRateBpm: '110 – 150 BPM',
      keyOrgans: ['Phosphatidylglycerol (PG) Positive', 'Fetal Heart Shunts (Foramen Ovale)', 'Lacrimal & Salivary Glands', '15% Body Fat'],
      fetalMilestones: [
        'Presence of phosphatidylglycerol (PG) in amniotic fluid confirms complete biochemical lung maturity.',
        'Body fat now comprises ~15% of total fetal weight, enabling independent thermal regulation after delivery.',
        'Fetal vocal cords, neural reflex arcs (Moro startle, rooting, sucking, palmar/plantar grasp), and sensory organs are fully ready for extrauterine life.'
      ],
      maternalPhysiology: 'Loss of the mucus plug ("bloody show"—pink or brownish mucoid discharge) and increased pelvic pressure or irregular prodromal contractions may occur days to weeks before active labor.',
      doctorCheckIn: '38-Week Weekly OB Visit: Blood pressure, urine check, fetal heart rate, fundal height, and discussion of postpartum recovery, infant feeding support, and postpartum contraception options.',
      clinicalPearl: 'True Labor vs. Braxton Hicks: Braxton Hicks contractions are irregular, stay in the front abdomen, and stop with hydration/walking. True labor contractions grow progressively longer, stronger, and closer together regardless of position.',
      visualStage: 'fetus_term',
      scaleFactor: 1.04,
      hasScheduledVisit: true
    },
    {
      week: 39,
      trimester: 3,
      phaseLabel: '3rd Trimester — Full Term (39w0d–40w6d)',
      stageTitle: 'Full Term Milestone, Bishop Score & ARRIVE Trial Discussion',
      biologicalStage: 'Full Term Fetus',
      lengthMetric: '50.7 cm (20.0 in CHL)',
      weightMetric: '3,290 g (7.25 lbs)',
      heartRateBpm: '110 – 150 BPM',
      keyOrgans: ['Full Term Cerebral Cortex', 'Epidermal Renewal', 'Placental Oxytocin Signaling', 'Mature Hepatic Enzymes'],
      fetalMilestones: [
        'Congratulations—at 39w0d, your baby is officially FULL TERM per ACOG and SMFM definitions!',
        'Fetal lungs secrete surfactant proteins into amniotic fluid, which activate amniotic macrophages and maternal uterine oxytocin receptors—one of the biological triggers initiating spontaneous labor.',
        'A fresh outer layer of epidermis replaces the shed outer skin cells; vernix remains primarily in skin creases.'
      ],
      maternalPhysiology: 'Cervical effacement (thinning from 0% to 100%) and dilation (opening from 0 to 10 cm) progress prior to and during the first stage of labor.',
      doctorCheckIn: '39-Week Weekly OB Visit: Optional cervical exam (Bishop score: dilation, effacement, station, consistency, position), optional Membrane Sweep (reduces post-term pregnancy), or discussion of elective 39-week induction per the ARRIVE trial.',
      clinicalPearl: 'The ARRIVE Trial (NEJM 2018): In low-risk first-time pregnancies, elective induction of labor at 39w0d–39w4d showed a slightly lower Cesarean section rate (18.6% vs 22.2%) and lower gestational hypertension risk compared to expectant management, making both spontaneous waiting and 39w induction valid, safe choices.',
      visualStage: 'fetus_term',
      scaleFactor: 1.05,
      hasScheduledVisit: true
    },
    {
      week: 40,
      trimester: 3,
      phaseLabel: '3rd Trimester — Estimated Due Date (EDD)',
      stageTitle: 'Estimated Due Date (40w0d) & Cardiopulmonary Transition Readiness',
      biologicalStage: 'Full Term Fetus',
      lengthMetric: '51.2 cm (20.2 in CHL)',
      weightMetric: '3,460 g (7.63 lbs)',
      heartRateBpm: '110 – 150 BPM',
      keyOrgans: ['Foramen Ovale & Ductus Arteriosus Ready to Close', '300 Ossification Centers', 'Passive Maternal IgG Immunity', 'Cranial Molding Sutures'],
      fetalMilestones: [
        'At birth, the baby’s first cry expands the lungs and drops pulmonary vascular resistance by 80%, functionally closing the Foramen Ovale and Ductus Arteriosus within hours to days.',
        'A full-term newborn has ~300 bones/cartilaginous centers (many fuse later into the 206 adult bones) and a stomach capacity the size of a cherry (~5–7 mL on Day 1, perfectly matched to colostrum).',
        'Visual acuity at birth is focused precisely at 8–12 inches—the exact distance from the breast or arms to a parent’s face.'
      ],
      maternalPhysiology: 'Only ~4–5% of babies arrive on their exact Estimated Due Date; ~50% of first-time parents deliver between 40w0d and 41w3d if awaiting spontaneous labor.',
      doctorCheckIn: '40-Week EDD OB Visit: Blood pressure, fetal heart tones, cervical check/membrane sweep if desired, and scheduling of Week 41 Late-Term Antenatal Testing (NST + Amniotic Fluid Index or BPP) and induction date.',
      clinicalPearl: 'Remember the 4 Cs of Rupture of Membranes (COAT): If your water breaks, note the Color (clear vs green/brown meconium), Odor (odorless vs foul), Amount (gush vs trickle), and Time, and call L&D immediately—even if contractions haven’t started.',
      visualStage: 'fetus_term',
      scaleFactor: 1.06,
      hasScheduledVisit: true
    },
    {
      week: 41,
      trimester: 4,
      phaseLabel: 'Late-Term Surveillance (41w0d–41w6d)',
      stageTitle: 'Late-Term Antenatal Testing (NST / BPP) & Induction Planning',
      biologicalStage: 'Late-Term Fetus',
      lengthMetric: '51.7 cm (20.4 in CHL)',
      weightMetric: '3,600 g (7.94 lbs)',
      heartRateBpm: '110 – 150 BPM',
      keyOrgans: ['Placental Reserve Monitoring', 'Amniotic Fluid Index (AFI)', 'Dry/Peeling Skin (Low Vernix)', 'Long Fingernails'],
      fetalMilestones: [
        'Between 41w0d and 41w6d, pregnancy is classified by ACOG as "Late-Term."',
        'Most vernix caseosa has now been reabsorbed, so late-term newborns often have slightly dry or peeling skin on the palms and soles and longer fingernails.',
        'Fetal alertness and neurological maturity are exceptionally well-developed.'
      ],
      maternalPhysiology: 'Amniotic fluid volume naturally declines in late-term gestation as placental vascular calcification slowly progresses.',
      doctorCheckIn: '41-Week Late-Term Visit & Twice-Weekly Surveillance: Perform Non-Stress Test (NST) plus Amniotic Fluid Index (AFI) / Maximum Vertical Pocket (MVP ≥2 cm) or full Biophysical Profile (BPP, scored out of 8 or 10). Schedule labor induction prior to 42w0d.',
      clinicalPearl: 'ACOG Practice Bulletin on Management of Late-Term and Post-Term Pregnancy recommends antenatal fetal surveillance starting at 41w0d and delivery between 41w0d and 41w6d to avoid post-term placental insufficiency.',
      visualStage: 'fetus_term',
      scaleFactor: 1.06,
      hasScheduledVisit: true
    },
    {
      week: 42,
      trimester: 4,
      phaseLabel: 'Post-Term Delivery Window (42w0d)',
      stageTitle: 'Active Induction of Labor, Birthday & Golden Hour',
      biologicalStage: 'Post-Term / Delivery Milestone',
      lengthMetric: '52.0 cm (20.5 in CHL)',
      weightMetric: '3,685 g (8.12 lbs)',
      heartRateBpm: '110 – 150 BPM',
      keyOrgans: ['Delayed Cord Clamping (30–60s)', 'Skin-to-Skin Golden Hour', 'APGAR Scoring (1 & 5 min)', 'Newborn Vitamin K & Erythromycin'],
      fetalMilestones: [
        'ACOG recommends delivery by 42w0d at the latest (via cervical ripening with Foley balloon/misoprostol and oxytocin induction if spontaneous labor has not occurred).',
        'At birth, ACOG recommends Delayed Umbilical Cord Clamping for 30–60 seconds, transferring ~80 mL of placental blood to boost newborn iron stores for the first 6 months.',
        'Immediate Skin-to-Skin ("Golden Hour") stabilizes newborn temperature, blood glucose, heart rate, and initiates breastfeeding and maternal oxytocin release.'
      ],
      maternalPhysiology: 'Third stage of labor delivers the placenta within 5–30 minutes of birth; uterine contraction (involution) compresses spiral arteries to prevent postpartum hemorrhage.',
      doctorCheckIn: 'Delivery & Immediate Postpartum Care: Newborn APGAR score (1 & 5 mins), Newborn Vitamin K injection (prevents Vitamin K deficiency bleeding), Hepatitis B vaccine, hearing/metabolic screen, and scheduling of maternal 2–3 week blood pressure/mood check and 6-week comprehensive postpartum OB visit.',
      clinicalPearl: 'Postpartum Warning Signs ("POST-BIRTH" Alert): In the 6 weeks after delivery, seek emergency care for chest pain/shortness of breath, seizures, thoughts of self-harm, soaking >1 pad/hour for 2 hours, incision infection, calf pain/redness, temperature ≥100.4°F, or severe headache/BP ≥140/90.',
      visualStage: 'fetus_term',
      scaleFactor: 1.06,
      hasScheduledVisit: true
    }
  ];

  const ACOG_APPOINTMENTS = [
    {
      id: 'appt-w6-8',
      weekStart: 6,
      weekEnd: 8,
      trimester: 1,
      cadenceLabel: 'Initial Confirmation',
      title: 'Viability & Dating Ultrasound Visit',
      summary: 'Confirms intrauterine pregnancy location, fetal pole, cardiac activity, singleton vs. multiples, and accurate Crown-Rump Length (CRL) dating.',
      procedures: [
        'Transvaginal or transabdominal dating ultrasound (CRL establishes EDD within ±3–5 days)',
        'Verification of yolk sac, gestational sac, and fetal heart rate (100–165 BPM)',
        'Review of medical, surgical, obstetric, and family genetic history',
        'Early nausea/vomiting management and prenatal vitamin verification (Folic Acid ≥400–800 mcg)'
      ],
      questionsToAsk: [
        'Does my Crown-Rump Length match my LMP due date, or are we revising my official EDD?',
        'Which hospital or birthing center does this practice deliver at, and how does the on-call OB rotation work?',
        'What is the after-hours triage phone number if I experience spotting or severe symptoms?'
      ],
      highRiskAddition: 'AMA (35+) / Prior Loss / IVF: Earlier 5.5–6w placement ultrasound and progesterone luteal support review.'
    },
    {
      id: 'appt-w8-10',
      weekStart: 8,
      weekEnd: 10,
      trimester: 1,
      cadenceLabel: 'Every 4 Weeks (q4w)',
      title: 'Comprehensive OB Intake & Initial Prenatal Lab Panel',
      summary: 'Full physical exam and baseline maternal blood and urine laboratory workup.',
      procedures: [
        'Complete Blood Count (CBC: hemoglobin, hematocrit, platelets)',
        'Blood Type (ABO), Rh(D) Factor, and Indirect Coombs Antibody Screen',
        'Immunity titers: Rubella IgG, Varicella IgG; Infectious screen: Hepatitis B (HBsAg), Hepatitis C, HIV, Syphilis (RPR)',
        'Urine culture & sensitivity (screens for asymptomatic bacteriuria to prevent pyelonephritis)',
        'TSH (if thyroid history), HbA1c (if diabetes risk/BMI ≥25), and Pan-Ethnic Carrier Screening (Cystic Fibrosis, SMA, Hemoglobinopathies)'
      ],
      questionsToAsk: [
        'Am I Rh-positive or Rh-negative, and are all my vaccine immunity titers (Rubella/Varicella) protective?',
        'Do I have risk factors for early gestational diabetes screening or low-dose aspirin at Week 12?',
        'How will we coordinate NIPT (cell-free DNA) and the First-Trimester Nuchal Translucency scan?'
      ],
      highRiskAddition: 'GDM Risk / Prior GDM / PCOS / BMI ≥25: Early 1-hour GCT or HbA1c ordered at this first visit.'
    },
    {
      id: 'appt-w10-13',
      weekStart: 10,
      weekEnd: 13,
      trimester: 1,
      cadenceLabel: 'Every 4 Weeks (q4w)',
      title: 'NIPT (cfDNA) & Nuchal Translucency (NT) Genetic Window',
      summary: 'Chromosomal aneuploidy screening, early structural evaluation, and preeclampsia prophylaxis initiation at Week 12.',
      procedures: [
        'Cell-Free Placental DNA (NIPT) maternal blood draw (anytime ≥10w0d): screens for Trisomy 21, 18, 13, and sex chromosomes',
        'Nuchal Translucency (NT) ultrasound (11w0d–13w6d): measures fluid fold behind fetal neck (<3.0 mm normal) and checks nasal bone',
        'Fetal heart tones via handheld Doppler (140–165 BPM) & maternal blood pressure / urine check',
        'Initiate Low-Dose Aspirin (81 mg daily starting at Week 12) if ACOG preeclampsia criteria are met'
      ],
      questionsToAsk: [
        'Should I start 81 mg low-dose aspirin at Week 12 for preeclampsia prevention based on my profile?',
        'When will NIPT results return (typically 7–10 calendar days), and how are results shared?',
        'Are there any exercise or travel modifications I should follow entering the second trimester?'
      ],
      highRiskAddition: 'AMA (35+) / Twins: Detailed genetic counseling; Chorionic Villus Sampling (CVS, 10–13w) available if diagnostic certainty is desired; dichorionic vs. monochorionic twin chorionicity must be confirmed before Week 14.'
    },
    {
      id: 'appt-w16',
      weekStart: 16,
      weekEnd: 16,
      trimester: 2,
      cadenceLabel: 'Every 4 Weeks (q4w)',
      title: '16-Week Second Trimester Check & MSAFP / Quad Screen',
      summary: 'Routine maternal-fetal wellness check and neural tube defect serum marker screening.',
      procedures: [
        'Blood pressure, maternal weight trend, and urine dipstick (protein/glucose/leukocytes)',
        'Fetal Heart Rate verification via handheld Doppler',
        'Maternal Serum Alpha-Fetoprotein (MSAFP) blood draw (15–20w) to screen for open neural tube defects (spina bifida/anencephaly) or full Quad Screen if NIPT was not performed',
        'Scheduling order for the 20-week Level II Comprehensive Anatomy Ultrasound'
      ],
      questionsToAsk: [
        'Even since my NIPT was low-risk, should we draw standalone MSAFP today to screen for open neural tube defects?',
        'When should I expect to feel consistent fetal movements ("quickening"), especially given my placental location?'
      ],
      highRiskAddition: 'Prior Spontaneous Preterm Birth: Serial transvaginal cervical length ultrasounds every 2 weeks from Week 16 to 24.'
    },
    {
      id: 'appt-w18-22',
      weekStart: 18,
      weekEnd: 22,
      trimester: 2,
      cadenceLabel: 'Every 4 Weeks (q4w)',
      title: 'Level II Comprehensive Fetal Anatomy Ultrasound & 20-Week OB Visit',
      summary: 'Detailed head-to-toe organ system structural survey, placental localization, amniotic fluid assessment, and cervical length check.',
      procedures: [
        'Level II Anatomy Scan (45–60 mins): Brain ventricles, cerebellum, choroid plexus, profile/lips, 4-chamber heart + LVOT/RVOT outflow tracts, diaphragm, stomach, kidneys, cord insertion, 3-vessel umbilical cord, spine, and all 4 limbs',
        'Placental location assessment (ruling out placenta previa or vasa previa)',
        'Cervical length measurement (normal ≥25 mm at 18–24 weeks)',
        'Fundal height measurement (starts at Week 20 at the umbilicus), blood pressure, and urine check'
      ],
      questionsToAsk: [
        'Were all cardiac outflow tracts and spinal views clearly visualized today, or do we need a follow-up completion scan?',
        'Is my placenta anterior, posterior, or fundal, and is it well clear (>2 cm) of the internal cervical os?',
        'What is my cervical length measurement?'
      ],
      highRiskAddition: 'IVF / Pre-existing Diabetes / Congenital Heart Risk: Specialized Fetal Echocardiogram at Weeks 20–22 with pediatric cardiology or MFM.'
    },
    {
      id: 'appt-w24-28',
      weekStart: 24,
      weekEnd: 28,
      trimester: 2,
      cadenceLabel: 'Transition to Bi-Weekly at 28w',
      title: 'Gestational Diabetes (Glucola) Screen, CBC, Rhogam & Tdap Vaccine',
      summary: 'Major metabolic, hematologic, and immunological milestone bridging the 2nd and 3rd trimesters.',
      procedures: [
        '1-Hour 50g Oral Glucose Challenge Test (GCT) for Gestational Diabetes (24–28 weeks; if ≥135–140 mg/dL, follow-up 3-hour 100g GTT)',
        'Repeat 3rd-Trimester CBC (screen for physiological vs. iron-deficiency anemia and gestational thrombocytopenia)',
        'Repeat Antibody Screen & RhoGAM (Rho(D) Immune Globulin 300 mcg IM) at Week 28 if maternal blood type is Rh-negative',
        'Tdap Vaccine (Tetanus, Diphtheria, Acellular Pertussis) administered between Weeks 27 and 36 (ideally 27–30w) for passive newborn whooping cough immunity',
        'Repeat Syphilis & HIV screen in 3rd trimester per ACOG/state guidelines'
      ],
      questionsToAsk: [
        'What are my 1-hour glucose screen and third-trimester hemoglobin/ferritin numbers? Should I add oral iron?',
        'Can I receive my Tdap vaccine today, and when should my partner/grandparents update theirs (at least 2 weeks before meeting baby)?',
        'How should I perform and log daily fetal kick counts starting at Week 28?'
      ],
      highRiskAddition: 'Monochorionic Twins: Ultrasounds every 2 weeks for Twin-to-Twin Transfusion Syndrome (TTTS); Dichorionic Twins: growth scans every 4 weeks.'
    },
    {
      id: 'appt-w30',
      weekStart: 30,
      weekEnd: 30,
      trimester: 3,
      cadenceLabel: 'Every 2 Weeks (q2w)',
      title: '30-Week Bi-Weekly OB Visit & Kick Count Review',
      summary: 'First bi-weekly third-trimester visit focusing on fetal growth trajectory and preeclampsia surveillance.',
      procedures: [
        'Blood pressure & urine dipstick (screening for gestational hypertension / proteinuria)',
        'Symphysis-Fundal Height measurement in cm (expected 28–32 cm) and FHR Doppler',
        'Review of daily Fetal Movement (Kick Count) patterns (≥10 movements within 2 hours)',
        'Review of preterm labor warning signs and hospital L&D registration'
      ],
      questionsToAsk: [
        'Is my fundal height tracking on curve with my gestational week?',
        'How do I preregister for Labor & Delivery admission, and where is the L&D triage entrance after hours?'
      ],
      highRiskAddition: 'AMA ≥35 / Obesity / GDM / Hypertension: Plan third-trimester growth ultrasound and weekly antenatal testing (NST/BPP) starting at Week 32.'
    },
    {
      id: 'appt-w32',
      weekStart: 32,
      weekEnd: 32,
      trimester: 3,
      cadenceLabel: 'Every 2 Weeks (q2w)',
      title: '32-Week OB Visit, RSV Vaccine Window & Growth Check',
      summary: 'Assessment of fetal presentation, seasonal RSV maternal immunization, and high-risk antenatal surveillance initiation.',
      procedures: [
        'Maternal RSV Vaccine (Abrysvo, 32w0d–36w6d during September–January) to prevent severe newborn RSV lower respiratory tract disease',
        'Blood pressure, urine check, fundal height (30–34 cm), and fetal heart tones',
        'Follow-up Placental Localization or Growth Ultrasound if prior low-lying placenta, AMA, GDM, or size-dates discrepancy'
      ],
      questionsToAsk: [
        'Am I in the seasonal window to receive the Abrysvo maternal RSV vaccine today (or will baby receive Nirsevimab/Beyfortus at birth)?',
        'Can you tell if the baby is starting to settle head-down (cephalic) yet?'
      ],
      highRiskAddition: 'AMA (≥35–40) / GDM / Chronic HTN / FGR: Start weekly or twice-weekly Non-Stress Tests (NST) and/or Biophysical Profiles (BPP).'
    },
    {
      id: 'appt-w34',
      weekStart: 34,
      weekEnd: 34,
      trimester: 3,
      cadenceLabel: 'Every 2 Weeks (q2w)',
      title: '34-Week Late-Preterm Milestone & Birth Preferences Review',
      summary: 'Review of labor analgesia options, birth preferences, perineal massage, and preeclampsia red flags.',
      procedures: [
        'Blood pressure, urine protein check, fundal height (32–36 cm), and fetal heart tones',
        'Leopold maneuvers to palpate fetal lie (longitudinal vs. transverse) and presentation',
        'Discussion of birth preferences: epidural analgesia, nitrous oxide, intermittent vs. continuous fetal monitoring, delayed cord clamping, and Golden Hour skin-to-skin'
      ],
      questionsToAsk: [
        'What are our hospital’s standard practices for delayed cord clamping, immediate skin-to-skin, and lactation consultant rounds?',
        'Under what clinical scenarios would you recommend a Cesarean delivery or operative vaginal delivery?'
      ],
      highRiskAddition: 'Placenta Previa / Prior Classical C-Section: Confirm scheduled delivery timing per ACOG (typically 36w0d–37w6d for previa).'
    },
    {
      id: 'appt-w36',
      weekStart: 36,
      weekEnd: 36,
      trimester: 3,
      cadenceLabel: 'Start of Weekly Visits (q1w)',
      title: '36-Week Group B Strep (GBS) Swab & Presentation Verification',
      summary: 'Transition to weekly visits, universal GBS culture screening, and formal verification of cephalic presentation.',
      procedures: [
        'Group B Streptococcus (GBS) lower vaginal and rectal swab (performed between 36w0d and 37w6d; valid for 5 weeks)',
        'Leopold maneuvers + bedside ultrasound if needed to confirm Vertex (head-down) presentation',
        'If fetus is Breech at 36 weeks: counsel on External Cephalic Version (ECV) procedure at Week 37',
        'Discontinue Low-Dose Aspirin at Week 36 or delivery per provider protocol; if history of HSV, start oral Acyclovir/Valacyclovir suppression at Week 36'
      ],
      questionsToAsk: [
        'Is the baby confirmed head-down (vertex)?',
        'If my GBS swab comes back positive, how early in labor or after my water breaks should I arrive at L&D to receive at least 4 hours of IV penicillin before birth?'
      ],
      highRiskAddition: 'HSV History: Start daily oral valacyclovir/acyclovir prophylaxis at 36w0d to prevent active lesions and need for Cesarean.'
    },
    {
      id: 'appt-w37',
      weekStart: 37,
      weekEnd: 37,
      trimester: 3,
      cadenceLabel: 'Weekly (q1w)',
      title: '37-Week Early Term Visit & Active Labor Triage Briefing',
      summary: 'Review of GBS status, early-term physiological readiness, and exact L&D triage arrival criteria.',
      procedures: [
        'Blood pressure, urine check, fundal height, and fetal heart rate',
        'Review of GBS culture result and documentation on prenatal record',
        'Labor Triage Rule confirmation (5-1-1 for first baby: contractions every 5 mins, lasting 1 min, for 1 hour; or 4-1-1; or immediate arrival if water breaks / vaginal bleeding / decreased movement)'
      ],
      questionsToAsk: [
        'What was my GBS swab result?',
        'If my water breaks at home without contractions, do you want me to come straight to Labor & Delivery?'
      ],
      highRiskAddition: 'Gestational Hypertension / Mild Preeclampsia without severe features / Cholestasis / Dichorionic Twins: Delivery often scheduled at 37w0d–38w0d per ACOG.'
    },
    {
      id: 'appt-w38',
      weekStart: 38,
      weekEnd: 38,
      trimester: 3,
      cadenceLabel: 'Weekly (q1w)',
      title: '38-Week Weekly OB Check & Postpartum Care Plan',
      summary: 'Ongoing maternal blood pressure and fetal surveillance, plus preparation for the 4th Trimester.',
      procedures: [
        'Blood pressure, urine dip, fundal height, and fetal heart tones',
        'Optional cervical exam if patient experiences cramping or wishes to know baseline dilation/effacement',
        'Postpartum recovery, pelvic floor health, mental health (Edinburgh Postnatal Depression Scale overview), and contraception counseling'
      ],
      questionsToAsk: [
        'Who should I call for lactation support once we are discharged home?',
        'When will my postpartum follow-up visits be scheduled (ACOG recommends an initial check within 3 weeks and a comprehensive visit by 6–12 weeks)?'
      ],
      highRiskAddition: 'Diet-Controlled GDM / AMA 40+: Discuss timing of delivery around 39w0d–39w6d.'
    },
    {
      id: 'appt-w39',
      weekStart: 39,
      weekEnd: 39,
      trimester: 3,
      cadenceLabel: 'Weekly (q1w)',
      title: '39-Week Full Term Visit, Membrane Sweep & Induction Options',
      summary: 'Full-term milestone assessment, optional Bishop score cervical check, and shared decision-making on expectant management vs. 39-week induction.',
      procedures: [
        'Blood pressure, urine check, fundal height, and fetal heart tones',
        'Optional digital cervical exam to assess Bishop Score (dilation, effacement, station, consistency, position)',
        'Optional Membrane Sweep (stripping membranes if cervix is ≥1 cm dilated and GBS status/risks are reviewed; releases endogenous prostaglandins to encourage spontaneous labor within 48h)',
        'Shared decision-making on expectant management vs. elective 39-week induction (ARRIVE Trial protocol)'
      ],
      questionsToAsk: [
        'What is my current cervical dilation, effacement, and fetal station, and am I a candidate for a membrane sweep today?',
        'If I don’t go into spontaneous labor by 40 weeks, when do you recommend scheduling antenatal testing and induction?'
      ],
      highRiskAddition: 'Medication-Controlled GDM / AMA ≥35–40: ACOG recommends delivery in the 39th week (39w0d–39w6d).'
    },
    {
      id: 'appt-w40',
      weekStart: 40,
      weekEnd: 40,
      trimester: 3,
      cadenceLabel: 'Weekly (q1w)',
      title: '40-Week Estimated Due Date (EDD) Visit & Post-Dates Plan',
      summary: 'Due date evaluation, cervical reassessment, and scheduling of Week 41 fetal surveillance.',
      procedures: [
        'Blood pressure, urine protein check, and fetal heart tones',
        'Cervical exam and optional repeat membrane sweep',
        'Order placed for Week 41 Non-Stress Test (NST) and Amniotic Fluid Index (AFI) / Biophysical Profile (BPP)',
        'Provisional scheduling of labor induction date between 41w0d and 41w6d'
      ],
      questionsToAsk: [
        'If we schedule an induction next week, will I come in the evening prior for cervical ripening (e.g., Foley balloon or misoprostol) or in the morning for Pitocin?'
      ],
      highRiskAddition: 'Most high-risk and AMA ≥40 pregnancies are delivered by 39w0d–40w0d per ACOG/SMFM consensus.'
    },
    {
      id: 'appt-w41-42',
      weekStart: 41,
      weekEnd: 42,
      trimester: 4,
      cadenceLabel: 'Twice Weekly (41w+)',
      title: '41-Week Late-Term NST / BPP Surveillance & Labor Induction',
      summary: 'Twice-weekly fetal wellbeing and amniotic fluid testing, culminating in delivery by 42w0d.',
      procedures: [
        'Non-Stress Test (NST): 20–40 min external belt monitor verifying baseline FHR (110–160 BPM), moderate variability, and ≥2 accelerations (15x15) in 20 mins',
        'Biophysical Profile (BPP) / Amniotic Fluid Ultrasound: verifies Maximum Vertical Pocket (MVP ≥2 cm) or AFI ≥5 cm, fetal breathing, tone, and movement',
        'Admission to Labor & Delivery for cervical ripening and induction of labor prior to 42w0d'
      ],
      questionsToAsk: [
        'Is my amniotic fluid pocket (MVP/AFI) and NST completely reactive today?',
        'What time should we arrive at Labor & Delivery for our scheduled induction?'
      ],
      highRiskAddition: 'Oligohydramnios (MVP <2 cm) or Non-Reassuring NST: Immediate admission to L&D for delivery.'
    }
  ];

  const SYMPTOM_TRIAGE = [
    {
      id: 'sym-1',
      title: 'Decreased Fetal Movement (<10 Movements in 2 Hours at ≥28 Weeks)',
      urgency: 'emergency',
      urgencyLabel: 'Go to L&D / Call OB Immediately',
      trimesterScope: '3rd Trimester (Weeks 28–42)',
      clinicalExplanation: 'A sudden drop in fetal movement or failure to reach 10 distinct kicks/rolls/flutters within 2 hours during a focused kick count can be an early sign of placental insufficiency or umbilical cord compression.',
      actionSteps: 'Drink cold water, lie on your left side in a quiet room, and focus on movements. Do NOT wait until tomorrow or rely on a home Doppler—go to Labor & Delivery triage immediately for a continuous 20-minute Non-Stress Test (NST).'
    },
    {
      id: 'sym-2',
      title: 'Severe Persistent Headache, Visual Changes (Spots/Flashes), or Upper Right Belly Pain',
      urgency: 'emergency',
      urgencyLabel: 'Go to L&D / ER Immediately',
      trimesterScope: '2nd & 3rd Trimesters (≥20 Weeks) & Postpartum',
      clinicalExplanation: 'A severe headache that does not resolve with acetaminophen and hydration, visual scotomata (flashing lights/blurriness), right upper quadrant/epigastric pain, or sudden facial/hand swelling are hallmark signs of Preeclampsia with Severe Features or HELLP syndrome.',
      actionSteps: 'Check blood pressure if you have a cuff (≥140/90 is elevated; ≥160/110 is a hypertensive emergency). Proceed immediately to Labor & Delivery triage for BP monitoring, urine protein, CBC/platelets, and liver enzymes.'
    },
    {
      id: 'sym-3',
      title: 'Vaginal Bleeding (Bright Red Blood or Passing Clots)',
      urgency: 'emergency',
      urgencyLabel: 'Go to L&D / Call OB Immediately',
      trimesterScope: 'All Trimesters (Weeks 1–42)',
      clinicalExplanation: 'In the 1st trimester, heavy bleeding or bleeding with unilateral pelvic pain requires evaluation for ectopic pregnancy or threatened miscarriage. In the 2nd/3rd trimesters, bleeding requires immediate ultrasound evaluation to rule out Placenta Previa or Placental Abruption.',
      actionSteps: 'Go to L&D or Emergency Triage immediately. If you are Rh-negative, you will also need RhoGAM within 72 hours of any fetomaternal bleeding episode.'
    },
    {
      id: 'sym-4',
      title: 'Gush or Steady Trickle of Clear, Pink, or Greenish Fluid (Water Breaking)',
      urgency: 'emergency',
      urgencyLabel: 'Go to L&D Immediately',
      trimesterScope: '2nd & 3rd Trimesters',
      clinicalExplanation: 'Spontaneous Rupture of Membranes (ROM) at term or Preterm Premature Rupture of Membranes (PPROM) before 37 weeks removes the amniotic barrier against infection and carries a risk of umbilical cord prolapse if the head is not engaged.',
      actionSteps: 'Note the COAT (Color, Odor, Amount, Time). Do not insert anything into the vagina. Head directly to Labor & Delivery for sterile speculum nitrazine/ferning/AmniSure confirmation.'
    },
    {
      id: 'sym-5',
      title: 'Regular Contractions Before 37 Weeks (>4–6 per Hour for 1 Hour)',
      urgency: 'urgent',
      urgencyLabel: 'Call OB / L&D Within 1–2 Hours',
      trimesterScope: '2nd & 3rd Trimesters (Weeks 20–36)',
      clinicalExplanation: 'Rhythmic uterine tightenings accompanied by menstrual-like cramping, pelvic pressure, dull low backache, or mucoid discharge before 37w0d may indicate threatened preterm labor.',
      actionSteps: 'Empty your bladder, drink 16–24 oz of water, and lie on your left side. If >4–6 contractions persist in 1 hour, call L&D immediately for fetal fibronectin/cervical length evaluation.'
    },
    {
      id: 'sym-6',
      title: 'Fever ≥100.4°F (38.0°C) or Chills',
      urgency: 'urgent',
      urgencyLabel: 'Call OB Today & Treat Fever with Acetaminophen',
      trimesterScope: 'All Trimesters (Weeks 1–42)',
      clinicalExplanation: 'Sustained maternal core hyperthermia in the 1st trimester increases neural tube Risk, and in later trimesters can trigger preterm uterine contractions or signal pyelonephritis (kidney infection), influenza, COVID-19, or chorioamnionitis.',
      actionSteps: 'Take Acetaminophen (Tylenol 650–1000 mg) to lower maternal core temperature, hydrate, and call your OB office to evaluate the underlying infectious source.'
    },
    {
      id: 'sym-7',
      title: 'Unilateral Calf Swelling, Redness, Warmth, or Chest Pain / Shortness of Breath',
      urgency: 'emergency',
      urgencyLabel: 'Emergency Department Immediately',
      trimesterScope: 'All Trimesters & 6 Weeks Postpartum',
      clinicalExplanation: 'Pregnancy is a hypercoagulable state (elevated clotting factors to prevent hemorrhage at birth), increasing the risk of Deep Vein Thrombosis (DVT, most commonly in the left leg due to iliac artery compression) and Pulmonary Embolism (PE).',
      actionSteps: 'Do not massage the calf. Seek immediate Emergency Department evaluation for lower-extremity venous Doppler ultrasound.'
    },
    {
      id: 'sym-8',
      title: 'Intense Itching on Palms of Hands and Soles of Feet (Especially at Night, Without Rash)',
      urgency: 'urgent',
      urgencyLabel: 'Call OB Office Within 24 Hours',
      trimesterScope: 'Late 2nd & 3rd Trimesters',
      clinicalExplanation: 'Severe palmar/plantar pruritus without a primary skin rash is the classic symptom of Intrahepatic Cholestasis of Pregnancy (ICP), caused by elevated serum bile acids.',
      actionSteps: 'Call your OB to order serum Total Bile Acids and Liver Function Tests (AST/ALT). If confirmed, ursodiol therapy relieves itching and lowers bile acids.'
    },
    {
      id: 'sym-9',
      title: 'Burning with Urination (Dysuria), Cloudy/Foul Urine, or Flank Pain',
      urgency: 'urgent',
      urgencyLabel: 'Call OB Office Today',
      trimesterScope: 'All Trimesters',
      clinicalExplanation: 'Progesterone dilates the ureters, making lower Urinary Tract Infections (UTIs) much more likely to ascend into acute pyelonephritis (kidney infection), which can trigger preterm labor.',
      actionSteps: 'Contact your OB office for a same-day urinalysis and urine culture so pregnancy-safe antibiotics (e.g., cephalexin, nitrofurantoin in 2nd trimester, or fosfomycin) can be started promptly.'
    },
    {
      id: 'sym-10',
      title: 'Sharp, Brief Groin Twinge When Rolling Over, Standing, or Coughing',
      urgency: 'routine',
      urgencyLabel: 'Normal Physiological Change (Discuss at Visit)',
      trimesterScope: '2nd & 3rd Trimesters',
      clinicalExplanation: 'Classic Round Ligament Pain: as the uterus grows upward out of the pelvis, the paired round ligaments stretch like taut rubber bands and spasm briefly with sudden movement.',
      actionSteps: 'Flex your hips before coughing/sneezing, roll slowly onto your side before sitting up, use a warm (not hot) compress, or wear a maternity support belt.'
    },
    {
      id: 'sym-11',
      title: 'Irregular, Painless Abdominal Tightening That Resolves With Hydration & Rest',
      urgency: 'routine',
      urgencyLabel: 'Normal Physiological Change (Braxton Hicks)',
      trimesterScope: '2nd & 3rd Trimesters',
      clinicalExplanation: 'Braxton Hicks ("practice") contractions tone uterine smooth muscle without dilating the cervix. They are irregular in frequency, do not increase in intensity, and are often triggered by dehydration or a full bladder.',
      actionSteps: 'Drink 2 glasses of water, empty your bladder, and rest on your left side. Call your OB if they become regular (every 5–10 mins) or painful.'
    },
    {
      id: 'sym-12',
      title: 'Mild Nasal Congestion ("Pregnancy Rhinitis") or Occasional Nosebleeds',
      urgency: 'routine',
      urgencyLabel: 'Normal Physiological Change',
      trimesterScope: 'All Trimesters',
      clinicalExplanation: 'Estrogen-mediated mucosal engorgement and +45% blood volume expansion swell the nasal turbinates in up to 30% of pregnant patients.',
      actionSteps: 'Use sterile saline nasal spray, a cool-mist bedroom humidifier, and nasal strips. Avoid oral decongestants like phenylephrine or pseudoephedrine (especially in 1st trimester or if hypertensive).'
    }
  ];

  const SAFETY_DATABASE = [
    {
      id: 'med-1',
      name: 'Acetaminophen (Tylenol / Paracetamol)',
      category: 'Pain & Fever',
      status: 'approved',
      statusLabel: 'First-Line Approved (ACOG)',
      dosageNote: '325–650 mg every 6 hours as needed (Max 3,000 mg/24h); lowest effective dose for shortest duration.',
      clinicalGuidance: 'ACOG and SMFM affirm acetaminophen as the safest first-line analgesic and antipyretic across all three trimesters. Treating maternal fever ≥100.4°F is clinically important to protect the embryo/fetus.'
    },
    {
      id: 'med-2',
      name: 'Ibuprofen (Advil/Motrin), Naproxen (Aleve), & High-Dose Aspirin (NSAIDs)',
      category: 'Pain & Fever',
      status: 'avoid',
      statusLabel: 'Contraindicated in Pregnancy',
      dosageNote: 'Avoid across pregnancy (Note: Low-dose 81 mg aspirin prescribed by OB for preeclampsia prevention is an exception and IS safe).',
      clinicalGuidance: 'Oral NSAIDs inhibit fetal prostaglandin synthesis, causing premature closure of the fetal Ductus Arteriosus, fetal renal impairment, and oligohydramnios (low amniotic fluid) after Week 20, as well as early implantation interference.'
    },
    {
      id: 'med-3',
      name: 'Vitamin B6 (Pyridoxine) + Doxylamine (Unisom SleepTabs / Diclegis)',
      category: 'Nausea & Vomiting',
      status: 'approved',
      statusLabel: 'ACOG First-Line Therapy',
      dosageNote: 'Vitamin B6 10–25 mg 3x/day + Doxylamine succinate 12.5–25 mg at bedtime.',
      clinicalGuidance: 'The most extensively studied anti-nausea regimen in obstetrics (>200,000 exposed pregnancies with zero teratogenic signal). Ensure you purchase Doxylamine succinate rather than multi-symptom formulas.'
    },
    {
      id: 'med-4',
      name: 'Calcium Carbonate (Tums) & Famotidine (Pepcid)',
      category: 'Heartburn & Reflux',
      status: 'approved',
      statusLabel: 'First/Second-Line Approved',
      dosageNote: 'Calcium carbonate 500–1,000 mg PRN; Famotidine 10–20 mg once or twice daily if antacids are insufficient.',
      clinicalGuidance: 'Calcium antacids provide safe acid neutralization and supplemental calcium (space 2 hours apart from iron supplements). Avoid Bismuth Subsalicylate (Pepto-Bismol) due to salicylate/aspirin absorption.'
    },
    {
      id: 'med-5',
      name: 'Polyethylene Glycol 3350 (MiraLAX), Psyllium (Metamucil), & Docusate (Colace)',
      category: 'Constipation & GI',
      status: 'approved',
      statusLabel: 'Approved (Minimal Systemic Absorption)',
      dosageNote: 'MiraLAX 17g daily in 8 oz water with increased hydration and dietary fiber.',
      clinicalGuidance: 'Progesterone slows gut motility and prenatal iron worsens constipation. Osmotic and bulk-forming laxatives are not absorbed into systemic circulation and are safe throughout pregnancy. Avoid castor oil or mineral oil.'
    },
    {
      id: 'med-6',
      name: 'Loratadine (Claritin), Cetirizine (Zyrtec), & Fluticasone Nasal Spray (Flonase)',
      category: 'Allergies & Cold',
      status: 'approved',
      statusLabel: 'Approved First-Line Allergy Relief',
      dosageNote: 'Loratadine 10 mg daily or Cetirizine 10 mg daily; avoid "Claritin-D" or "Zyrtec-D" decongestant combos.',
      clinicalGuidance: 'Second-generation antihistamines and intranasal steroid sprays have strong safety records in pregnancy. Avoid oral pseudoephedrine/phenylephrine ("-D" products) in the 1st trimester or if blood pressure is elevated.'
    },
    {
      id: 'med-7',
      name: 'Isotretinoin (Accutane) & Prescription Topical Retinoids (Tretinoin/Retin-A)',
      category: 'Dermatology / Skincare',
      status: 'avoid',
      statusLabel: 'Strictly Contraindicated (Teratogenic)',
      dosageNote: 'Discontinue prior to conception; use Azelaic Acid, Glycolic Acid (<10%), or Niacinamide instead.',
      clinicalGuidance: 'Systemic retinoids (vitamin A derivatives) cause severe craniofacial, cardiac, and thymic embryopathy. Out of abundance of caution, dermatologists and OBs also advise stopping topical retinoids (tretinoin, adapalene, retinol) during pregnancy.'
    },
    {
      id: 'med-8',
      name: 'Caffeine (Coffee, Espresso, Matcha, Tea)',
      category: 'Nutrition & Beverages',
      status: 'caution',
      statusLabel: 'Safe Under <200 mg / Day (ACOG)',
      dosageNote: 'Limit total daily caffeine to ≤200 mg (approx. one 12-oz brewed coffee or two shots of espresso).',
      clinicalGuidance: 'ACOG Committee Opinion confirms that moderate caffeine consumption (<200 mg/day) does not increase the risk of miscarriage or preterm birth. Remember to count tea, soda, and dark chocolate toward your daily total.'
    },
    {
      id: 'med-9',
      name: 'Low-Mercury Omega-3 Fish (Wild Salmon, Sardines, Trout, Cod, Shrimp)',
      category: 'Nutrition & Beverages',
      status: 'approved',
      statusLabel: 'Strongly Recommended (2–3 Servings/Week)',
      dosageNote: '8–12 oz per week of cooked low-mercury seafood (provides ~200–300 mg/day DHA).',
      clinicalGuidance: 'FDA and ACOG actively recommend eating 2–3 servings/week of cooked low-mercury fish for fetal brain and retinal DHA development. Strictly AVOID high-mercury predatory fish: Shark, Swordfish, King Mackerel, Marlin, Orange Roughy, and Bigeye Tuna.'
    },
    {
      id: 'med-10',
      name: 'Unpasteurized Dairy, Undercooked Deli Meats, & Raw Sprouts (Listeria Risk)',
      category: 'Nutrition & Beverages',
      status: 'avoid',
      statusLabel: 'Avoid Unheated / Unpasteurized',
      dosageNote: 'Verify cheese labels say "Made with Pasteurized Milk"; heat deli meats/hot dogs to steaming (165°F).',
      clinicalGuidance: 'Cell-mediated immunity decreases during pregnancy, making pregnant individuals 10x more susceptible to Listeria monocytogenes, which crosses the placenta. Most soft cheeses sold in major US supermarkets (feta, brie, queso fresco) ARE pasteurized—just check the label!'
    }
  ];

  const PHOTO_STILLS = [
    {
      minWeek: 1,
      maxWeek: 2,
      file: 'assets/wk01_oocyte_ovulation.jpg',
      caption: 'Weeks 1–2: Secondary oocyte (≈120 µm) at ovulation — glassy zona pellucida and corona radiata cumulus cells leaving the ruptured follicle.',
      alt: 'Hyper-realistic render of a human egg cell with its zona pellucida and surrounding cumulus cells emerging from the ovary surface.'
    },
    {
      minWeek: 3,
      maxWeek: 3,
      file: 'assets/wk03_morula_cleavage.jpg',
      caption: 'Week 3: Compacted 16-cell morula (Day 4 post-fertilization) with polar bodies inside the zona pellucida.',
      alt: 'Hyper-realistic render of a human morula showing tightly packed translucent blastomere cells inside a transparent shell.'
    },
    {
      minWeek: 4,
      maxWeek: 4,
      file: 'assets/wk04_blastocyst_implantation.jpg',
      caption: 'Week 4: Hatched blastocyst implanting into the vascular endometrium — trophoblast ring, fluid-filled blastocoel and inner cell mass.',
      alt: 'Hyper-realistic render of a human blastocyst attaching to the pink uterine lining with fine trophoblast projections.'
    },
    {
      minWeek: 5,
      maxWeek: 6,
      file: 'assets/wk05_embryo_neural_tube.jpg',
      caption: 'Weeks 5–6: Curved Carnegie-stage embryo with somites along the back, primitive heart prominence, and golden yolk sac inside the gestational sac.',
      alt: 'Hyper-realistic render of an early human embryo with translucent skin, visible somites and a yolk sac inside the amniotic membrane.'
    },
    {
      minWeek: 7,
      maxWeek: 9,
      file: 'assets/wk08_embryo_limb_buds.jpg',
      caption: 'Weeks 7–9: Late embryonic stage showing telencephalic brain vesicles, pigmented optic cup, four-chambered heart glow, paddle hand plates with digital rays, and secondary yolk sac.',
      alt: 'Macro intrauterine photograph of a late human embryo with translucent vascular skin, dark eye cup, limb buds, and golden yolk sac.'
    },
    {
      minWeek: 10,
      maxWeek: 15,
      file: 'assets/wk12_fetus_first_trimester.jpg',
      caption: 'Weeks 10–15: First-trimester fetus with separated fingers and toes, fused eyelids, translucent temple vessels, and helical 3-vessel umbilical cord attached to the placenta on the left.',
      alt: 'Macro intrauterine photograph of a 12-week human fetus inside the amniotic sac with 3-vessel umbilical cord and left placental disc.'
    },
    {
      minWeek: 16,
      maxWeek: 25,
      file: 'assets/wk20_fetus_anatomy_scan.jpg',
      caption: 'Weeks 16–25: Mid-gestation second-trimester fetus (20-Week Level II Anatomy Scan milestone) with vernix caseosa sheen, flexed limbs, and 3-vessel umbilical cord connected to the left placenta.',
      alt: 'Macro intrauterine photograph of a 20-week mid-gestation human fetus floating in the amniotic sac with left placental disc.'
    },
    {
      minWeek: 26,
      maxWeek: 33,
      file: 'assets/wk28_fetus_third_trimester.jpg',
      caption: 'Weeks 26–33: Early third-trimester fetus with peaceful sleeping eyelids, eyelashes, and accelerating subcutaneous adipose deposition.',
      alt: 'Macro intrauterine photograph of a 28-week third-trimester human fetus resting peacefully inside the amniotic sac.'
    },
    {
      minWeek: 34,
      maxWeek: 42,
      file: 'assets/wk38_full_term_fetus.jpg',
      caption: 'Weeks 34–42: Late-third-trimester and full-term fetus with rounded infant cheeks, mature subcutaneous fat, and pulmonary surfactant readiness for birth.',
      alt: 'Macro intrauterine photograph of a full-term human fetus cradled inside the amniotic sac with left placenta and coiled umbilical cord.'
    }
  ];

  globalScope.CLINICAL_ATLAS_DATA = {
    WEEKS_DATA: WEEKS_DATA,
    ACOG_APPOINTMENTS: ACOG_APPOINTMENTS,
    SYMPTOM_TRIAGE: SYMPTOM_TRIAGE,
    SAFETY_DATABASE: SAFETY_DATABASE,
    PHOTO_STILLS: PHOTO_STILLS
  };
})(window);
