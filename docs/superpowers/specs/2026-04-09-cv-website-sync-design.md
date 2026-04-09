# CV → Website Sync: Design Spec
**Date:** 2026-04-09
**Scope:** Content-only sync of `index.html` to match `Kevin_Klein_ML_Engineer.pdf`

## Overview

The new CV contains significantly richer content than the website: more specific metrics, new skills, corrected degree name, and a broken CV download link. This is a full content sync — no structural or layout changes, no new files except a minor CSS addition for grouped skill pills.

## Change Areas

### 1. CV Download Links (2 occurrences)
- **Header** (`header-contact`): `Kevin_Klein_Senior_GenAI_Engineer.pdf` → `Kevin_Klein_ML_Engineer.pdf`
- **Connect panel** (`contact-links`): same rename

### 2. About Paragraphs (3 paragraphs, adapted for web)
- **Para 1:** Lead with clinical AI platform — zero to hospital deployment in 5 months, used daily by 50+ clinicians. Mention RAG, tool-calling agents, multi-model serving.
- **Para 2:** ML depth — transformer on 20K-patient cohort (recall >80%, precision 60–70%), distributed training across 8-GPU cluster via Ray (~10× wallclock speedup), 50+ Bayesian hyperparameter trials.
- **Para 3:** ETH Zürich mathematical foundation (largely unchanged).

### 3. Impact Stats (Key Results — 5 rows)
- **7+ years:** unchanged
- **6h earlier:** update sub-label to reference "transformer on 20K-patient cohort, recall >80%"
- **40%:** unchanged
- **PROD:** update sub-label to "50+ clinicians, 5 months zero-to-prod"
- **ETH Zürich:** unchanged

### 4. Skills — Grouped Categories (replaces flat pill row)
Restructure the single flat `pill-row` into 4 labelled groups:

| Group | Skills |
|-------|--------|
| LLM Systems | vLLM · RAG Pipelines · Agentic AI · Multi-agent · LangGraph · MCP · Qdrant · KV-cache |
| Core ML | PyTorch · Transformers · HuggingFace · Ray · Time-series · Imbalanced Classification · Scikit-learn |
| Evals & Ops | LLM Evals · MLflow · DVC · Observability · Guardrails · Human-in-the-loop |
| Infra | Kubernetes · Docker · GCP · Terraform · Argo CD · CI/CD · Linux |

Requires a small CSS addition for `.skill-group` label styling.

### 5. Experience: X-cardiac (Machine Learning Engineer, 02/2022–02/2026)

**Risk predictor bullet updates:**
- Add: "transformer predicting postoperative complications (bleeding, acute renal failure) on a 20,000-patient cohort; recall >80%, precision 60–70%"
- Add: "focal loss for class imbalance, multi-label temporal offsets"
- Add: "10× wallclock speedup via Ray across 8-GPU cluster, 50+ Bayesian hyperparameter trials within 24h via Ray Tune"

**Clinical AI platform bullet updates:**
- Add: "RAG over a 500K-word clinical knowledge base"
- Add: "tool-calling agents over live patient data (FHIR, labs, vitals)"
- Add: "zero to production in 5 months, 50+ clinicians"
- Add: "<300ms TTFT and 3,000+ tok/s across GPT-OSS 120B · Kimi 2.5 · Qwen Coder on 8×H200 GPUs"
- Add: "KV-cache tuning and continuous batching"
- Add: "eval framework covering tool-call accuracy, retrieval relevance, and clinical safety"
- Add: "human-in-the-loop review for high-risk decisions, distributed tracing for multi-agent debugging"

### 6. Experience: 4flow (Data Scientist, 06/2019–06/2021)

**Document extraction bullet:** unchanged content, already accurate.

**Email classification bullet updates:**
- Add: "leading 2 junior engineers"
- Add: "routing 300 emails/day"
- Add: "RNN-based auto-fill eliminated data entry for ~50% of incoming tickets"

### 7. Education: ETH Zürich
- Degree: "M.Sc. in Quantitative Finance" → "M.Sc. in Applied Mathematics"
- Thesis subtitle stays: *Order book models and price formation*

### 8. Project Cards

**Clinical Agentic AI System card:**
- Add: "RAG over 500K-word clinical knowledge base"
- Add: "50+ clinicians, zero to production in 5 months"
- Add: "<300ms TTFT, 3,000+ tok/s on 8×H200 GPUs"
- Add: "eval framework covering tool-call accuracy, retrieval relevance, clinical safety"

**Postoperative Complication Prediction card:**
- Add: "20,000-patient cohort, recall >80%, precision 60–70%"
- Add: "focal loss for class imbalance, multi-label temporal offsets"
- Add: "10× wallclock speedup, 50+ Bayesian hyperparameter trials within 24h"

## Files Changed
- `index.html` — all content edits
- `css/style.css` — add `.skill-group` label styles (minor)

## Out of Scope
- Site structure, layout, navigation, animations
- BDO Switzerland experience (unchanged)
- Connect panel (only CV link updated)
- SEO meta tags / JSON-LD (title stays "Senior GenAI Engineer")
