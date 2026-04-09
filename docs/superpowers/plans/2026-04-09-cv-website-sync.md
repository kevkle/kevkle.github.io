# CV → Website Sync Implementation Plan

> **For agentic workers:** REQUIRED SUB-SKILL: Use superpowers:subagent-driven-development (recommended) or superpowers:executing-plans to implement this plan task-by-task. Steps use checkbox (`- [ ]`) syntax for tracking.

**Goal:** Sync `index.html` with the new `Kevin_Klein_ML_Engineer.pdf` CV — richer metrics, corrected degree, restructured skills, updated experience bullets, fixed CV download links.

**Architecture:** Content-only edits to `index.html` plus one small CSS addition to `css/style.css` for grouped skill labels. No structural changes, no new files, no JS changes.

**Tech Stack:** Static HTML/CSS. Verify changes by opening `index.html` in browser.

---

## Files Modified

- `index.html` — all content edits (CV links, About, skills, experience, projects, education)
- `css/style.css` — add `.skill-group-label` style (4 lines)

---

### Task 1: Fix broken CV download links

The CV was renamed from `Kevin_Klein_Senior_GenAI_Engineer.pdf` to `Kevin_Klein_ML_Engineer.pdf`. Two links are broken.

**Files:**
- Modify: `index.html`

- [ ] **Step 1: Update header CV link**

In `index.html` line ~74, replace:
```html
<a href="assets/Kevin_Klein_Senior_GenAI_Engineer.pdf" target="_blank" rel="noopener noreferrer" class="cv-btn">Download CV <span aria-hidden="true">&darr;</span></a>
```
With:
```html
<a href="assets/Kevin_Klein_ML_Engineer.pdf" target="_blank" rel="noopener noreferrer" class="cv-btn">Download CV <span aria-hidden="true">&darr;</span></a>
```

- [ ] **Step 2: Update connect panel CV link**

In `index.html` line ~364, replace:
```html
<a class="contact-link" style="--i:4" href="assets/Kevin_Klein_Senior_GenAI_Engineer.pdf" target="_blank" rel="noopener noreferrer"><span class="contact-link-icon">Resume</span><span class="contact-link-val">Download CV (PDF)</span></a>
```
With:
```html
<a class="contact-link" style="--i:4" href="assets/Kevin_Klein_ML_Engineer.pdf" target="_blank" rel="noopener noreferrer"><span class="contact-link-icon">Resume</span><span class="contact-link-val">Download CV (PDF)</span></a>
```

- [ ] **Step 3: Verify**

Open `index.html` in browser. Click "Download CV" in header — confirm it loads the PDF without a 404. Click "Download CV (PDF)" in Connect tab — same check.

- [ ] **Step 4: Commit**

```bash
git add index.html
git commit -m "fix: update CV download links to Kevin_Klein_ML_Engineer.pdf"
```

---

### Task 2: Update About paragraphs

**Files:**
- Modify: `index.html` lines ~138–146

- [ ] **Step 1: Replace the three About paragraphs**

Find the three `<p class="about-body reveal">` blocks and replace with:

```html
<p class="about-body reveal">
  7+ years building production ML and LLM systems in high-stakes environments. Designed and deployed a clinical AI platform &mdash; RAG over a 500K-word knowledge base, tool-calling agents over live patient data (FHIR, labs, vitals), multi-model serving &mdash; from zero to hospital deployment in 5 months, used daily by 50+ clinicians in regulated settings.
</p>
<p class="about-body reveal">
  Deep hands-on ML experience across the full lifecycle. Owned a transformer predicting postoperative cardiac complications on a 20,000-patient cohort (recall &gt;80%, precision 60&ndash;70%) &mdash; parallelising distributed training across an 8-GPU cluster via Ray for a ~10&times; wallclock speedup, with 50+ Bayesian hyperparameter trials completed within 24 hours.
</p>
<p class="about-body reveal">
  Strong mathematical foundations and deep analytical skills from ETH Z&uuml;rich. This first-principles thinking shapes how I approach system design &mdash; from model architecture decisions to production infrastructure.
</p>
```

- [ ] **Step 2: Verify**

Open browser, navigate to About tab. Confirm all three paragraphs render with correct text and no broken HTML entities.

- [ ] **Step 3: Commit**

```bash
git add index.html
git commit -m "content: update About paragraphs with CV metrics"
```

---

### Task 3: Update impact stats (Key Results)

**Files:**
- Modify: `index.html` lines ~108–136

- [ ] **Step 1: Update the "6h" impact row sub-label**

Find:
```html
<span class="impact-sub">Complication forecasting deployed in clinical production</span>
```
Replace with:
```html
<span class="impact-sub">Transformer on 20K-patient cohort &middot; recall &gt;80%</span>
```

- [ ] **Step 2: Update the "PROD" impact row sub-label**

Find:
```html
<span class="impact-sub">Trusted in regulated hospital environments</span>
```
Replace with:
```html
<span class="impact-sub">50+ clinicians &middot; 5 months zero-to-prod</span>
```

- [ ] **Step 3: Verify**

Open browser → About tab. Confirm the "6h" row shows "Transformer on 20K-patient cohort · recall >80%" and the "PROD" row shows "50+ clinicians · 5 months zero-to-prod".

- [ ] **Step 4: Commit**

```bash
git add index.html
git commit -m "content: update Key Results sub-labels with CV metrics"
```

---

### Task 4: Restructure skills into grouped categories

**Files:**
- Modify: `index.html` (about-bottom pill-row section, lines ~156–175)
- Modify: `css/style.css` (add `.skill-group-label`)

- [ ] **Step 1: Add skill-group-label CSS**

In `css/style.css`, after the `.pill:hover` rule (~line 364), add:

```css
.skill-groups { display: flex; flex-direction: column; gap: 16px; margin-top: 0; }
.skill-group-label { display: block; font-family: 'DM Mono', monospace; font-size: 0.65rem; letter-spacing: 0.14em; text-transform: uppercase; color: var(--muted); margin-bottom: 6px; }
```

- [ ] **Step 2: Replace flat pill-row with grouped structure**

Find the existing `<div class="pill-row reveal stagger">` block in the about-bottom section (the one with LLM Systems, Agentic AI / MCP, etc. pills). Replace the entire div with:

```html
<div class="skill-groups reveal">
  <div class="skill-group">
    <span class="skill-group-label">LLM Systems</span>
    <div class="pill-row">
      <span class="pill" style="--i:0">vLLM</span>
      <span class="pill" style="--i:1">RAG Pipelines</span>
      <span class="pill" style="--i:2">Agentic AI</span>
      <span class="pill" style="--i:3">Multi-agent</span>
      <span class="pill" style="--i:4">LangGraph</span>
      <span class="pill" style="--i:5">MCP</span>
      <span class="pill" style="--i:6">Qdrant</span>
      <span class="pill" style="--i:7">KV-cache</span>
    </div>
  </div>
  <div class="skill-group">
    <span class="skill-group-label">Core ML</span>
    <div class="pill-row">
      <span class="pill" style="--i:0">PyTorch</span>
      <span class="pill" style="--i:1">Transformers</span>
      <span class="pill" style="--i:2">HuggingFace</span>
      <span class="pill" style="--i:3">Ray</span>
      <span class="pill" style="--i:4">Time-series</span>
      <span class="pill" style="--i:5">Imbalanced Classification</span>
      <span class="pill" style="--i:6">Scikit-learn</span>
    </div>
  </div>
  <div class="skill-group">
    <span class="skill-group-label">Evals &amp; Ops</span>
    <div class="pill-row">
      <span class="pill" style="--i:0">LLM Evals</span>
      <span class="pill" style="--i:1">MLflow</span>
      <span class="pill" style="--i:2">DVC</span>
      <span class="pill" style="--i:3">Observability</span>
      <span class="pill" style="--i:4">Guardrails</span>
      <span class="pill" style="--i:5">Human-in-the-loop</span>
    </div>
  </div>
  <div class="skill-group">
    <span class="skill-group-label">Infra</span>
    <div class="pill-row">
      <span class="pill" style="--i:0">Kubernetes</span>
      <span class="pill" style="--i:1">Docker</span>
      <span class="pill" style="--i:2">GCP</span>
      <span class="pill" style="--i:3">Terraform</span>
      <span class="pill" style="--i:4">Argo CD</span>
      <span class="pill" style="--i:5">CI/CD</span>
      <span class="pill" style="--i:6">Linux</span>
    </div>
  </div>
</div>
```

- [ ] **Step 3: Verify**

Open browser → About tab → scroll to skills. Confirm 4 labelled groups appear, each with the correct pills. Confirm pills still have hover effect.

- [ ] **Step 4: Commit**

```bash
git add index.html css/style.css
git commit -m "feat: restructure skills into 4 grouped categories"
```

---

### Task 5: Update Experience — X-cardiac bullets

**Files:**
- Modify: `index.html` lines ~192–198

- [ ] **Step 1: Replace X-cardiac bullet list**

Find the `<ul class="exp-bullets">` inside the X-cardiac `exp-item` and replace its entire contents with:

```html
<li>Built and deployed a production clinical AI platform &mdash; RAG over a 500K-word clinical knowledge base, tool-calling agents over live patient data (FHIR, labs, vitals), multi-model serving &mdash; zero to production in 5 months, used daily by 50+ clinicians in regulated hospital environments. <a class="proj-link" href="#projects" data-tab="tab-projects" data-project="proj-clinical-agent">case study <span aria-hidden="true">&rarr;</span></a></li>
<li>Achieved &lt;300ms TTFT and 3,000+ tok/s across a multi-model stack (GPT-OSS 120B &middot; Kimi 2.5 &middot; Qwen Coder) on 8&times;H200 GPUs via vLLM &mdash; KV-cache tuning and continuous batching to sustain throughput under concurrent clinical load. <a class="proj-link" href="#projects" data-tab="tab-projects" data-project="proj-clinical-agent">case study <span aria-hidden="true">&rarr;</span></a></li>
<li>Designed eval framework covering tool-call accuracy, retrieval relevance, and clinical safety &mdash; with human-in-the-loop review for high-risk decisions and distributed tracing for multi-agent debugging. <a class="proj-link" href="#projects" data-tab="tab-projects" data-project="proj-clinical-agent">case study <span aria-hidden="true">&rarr;</span></a></li>
<li>Owned the full ML lifecycle for a transformer predicting postoperative cardiac complications on a 20,000-patient cohort (recall &gt;80%, precision 60&ndash;70%) &mdash; directly enabling intervention up to 6h earlier. <a class="proj-link" href="#projects" data-tab="tab-projects" data-project="proj-complication-prediction">case study <span aria-hidden="true">&rarr;</span></a></li>
<li>Parallelised distributed training across an 8-GPU cluster via Ray (~10&times; wallclock speedup), running 50+ Bayesian hyperparameter trials within 24h via Ray Tune; experiment reproducibility enforced with MLflow and DVC. <a class="proj-link" href="#projects" data-tab="tab-projects" data-project="proj-complication-prediction">case study <span aria-hidden="true">&rarr;</span></a></li>
```

- [ ] **Step 2: Verify**

Open browser → Experience tab. Confirm X-cardiac shows 5 bullets with all new metrics. Click each "case study →" link — confirm it navigates to the correct project card.

- [ ] **Step 3: Commit**

```bash
git add index.html
git commit -m "content: update X-cardiac experience bullets with CV metrics"
```

---

### Task 6: Update Experience — 4flow bullets

**Files:**
- Modify: `index.html` lines ~213–216

- [ ] **Step 1: Update the email classification bullet**

Find:
```html
<li>Led an email classification project end-to-end &mdash; from stakeholder interviews with the support team through model deployment &mdash; cutting manual triage effort by 25%. <a class="proj-link" href="#projects" data-tab="tab-projects" data-project="proj-email-classification">case study <span aria-hidden="true">&rarr;</span></a></li>
```
Replace with:
```html
<li>Drove a previously stalled email classification project to production, leading 2 junior engineers &mdash; multi-class intent classifier routing 300 emails/day cut manual triage by 25%; RNN-based auto-fill eliminated data entry for ~50% of incoming tickets. <a class="proj-link" href="#projects" data-tab="tab-projects" data-project="proj-email-classification">case study <span aria-hidden="true">&rarr;</span></a></li>
```

- [ ] **Step 2: Verify**

Open browser → Experience tab → 4flow entry. Confirm the email bullet now includes "leading 2 junior engineers", "300 emails/day", and "RNN-based auto-fill".

- [ ] **Step 3: Commit**

```bash
git add index.html
git commit -m "content: update 4flow email classification bullet with CV details"
```

---

### Task 7: Update Education — ETH Zürich degree

**Files:**
- Modify: `index.html` lines ~332–334

- [ ] **Step 1: Fix degree name**

Find:
```html
<div class="edu-degree">M.Sc. in Quantitative Finance</div>
```
Replace with:
```html
<div class="edu-degree">M.Sc. in Applied Mathematics</div>
```

- [ ] **Step 2: Verify**

Open browser → Education tab. Confirm ETH Zürich shows "M.Sc. in Applied Mathematics".

- [ ] **Step 3: Commit**

```bash
git add index.html
git commit -m "fix: correct ETH Zürich degree to M.Sc. in Applied Mathematics"
```

---

### Task 8: Update Project card — Clinical Agentic AI System

**Files:**
- Modify: `index.html` lines ~253–266 (proj-clinical-agent card)

- [ ] **Step 1: Replace proj-desc paragraph**

Find the `<p class="proj-desc">` inside `#proj-clinical-agent` and replace with:

```html
<p class="proj-desc">Clinicians needed conversational, real-time access to structured patient records &mdash; but existing tools couldn&rsquo;t meet the auditability and accuracy demands of a regulated clinical environment. Built a production clinical AI platform: RAG over a 500K-word clinical knowledge base, tool-calling agents over live patient data (FHIR, labs, vitals), and multi-model serving &mdash; zero to production in 5 months, used daily by 50+ clinicians. Achieved &lt;300ms TTFT and 3,000+ tok/s on 8&times;H200 GPUs via vLLM (KV-cache tuning, continuous batching). Eval framework covering tool-call accuracy, retrieval relevance, and clinical safety; human-in-the-loop review for high-risk decisions; distributed tracing for multi-agent debugging.</p>
```

- [ ] **Step 2: Verify**

Open browser → Projects tab → Clinical Agentic AI System card. Confirm the description includes "500K-word", "50+ clinicians", "5 months", "<300ms TTFT", "8×H200 GPUs".

- [ ] **Step 3: Commit**

```bash
git add index.html
git commit -m "content: update Clinical AI project card with CV metrics"
```

---

### Task 9: Update Project card — Postoperative Complication Prediction

**Files:**
- Modify: `index.html` lines ~272–284 (proj-complication-prediction card)

- [ ] **Step 1: Replace proj-desc paragraph**

Find the `<p class="proj-desc">` inside `#proj-complication-prediction` and replace with:

```html
<p class="proj-desc">Post-cardiac-surgery complications were detected too late for optimal intervention. Owned the full ML development cycle for a transformer predicting postoperative complications (bleeding, acute renal failure) on a 20,000-patient cohort &mdash; recall &gt;80%, precision 60&ndash;70%. Key design decisions: multi-label temporal offsets, focal loss for class imbalance, and a published time-series transformer as research baseline. Parallelised distributed training across an 8-GPU cluster via Ray (~10&times; wallclock speedup), enabling 50+ Bayesian hyperparameter trials within 24h via Ray Tune. Full experiment reproducibility via MLflow and DVC.</p>
```

- [ ] **Step 2: Verify**

Open browser → Projects tab → Postoperative Complication Prediction card. Confirm "20,000-patient cohort", "recall >80%", "10× wallclock speedup", "50+ Bayesian hyperparameter trials" all appear.

- [ ] **Step 3: Commit**

```bash
git add index.html
git commit -m "content: update Complication Prediction project card with CV metrics"
```

---

### Task 10: Final cross-check

- [ ] **Step 1: Open site in browser and walk all tabs**

Check each tab in order:
- **About:** 3 paragraphs correct, 5 impact rows correct, 4 grouped skill categories correct
- **Experience:** X-cardiac has 5 bullets with new metrics; 4flow email bullet updated; BDO unchanged
- **Projects:** Both updated cards show new metrics; 4flow cards unchanged
- **Education:** ETH shows "M.Sc. in Applied Mathematics"
- **Connect:** CV download link works (no 404)

- [ ] **Step 2: Check no regressions**

- All "case study →" links in Experience navigate to the correct project card
- Skills pills still have hover animation
- Reveal animations still fire on tab switch
- No broken HTML entities visible (stray `&`, `<`, `>`)

- [ ] **Step 3: Final commit if any tweaks made**

```bash
git add index.html css/style.css
git commit -m "chore: final cross-check tweaks"
```
