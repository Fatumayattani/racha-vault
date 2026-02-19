# Roadmap: Racha Vault

## 1. Roadmap Overview

This roadmap outlines the phased development of Racha Vault as a verifiable, encrypted research and evidence vault built natively on Storacha. The roadmap prioritizes a capability-native architecture using Vault DIDs, UCAN delegations, and CID-based provenance rather than generic storage features.

The development strategy focuses on:

* Real Storacha integration
* Capability-based authorization (UCAN)
* Verifiable artifact workflows
* Incremental but production-aligned milestones

---

## 2. Phase 0 — Documentation & System Design (Completed)

Status: Completed

### Objectives

* Define product scope and architecture
* Align documentation with Vault DID + UCAN model
* Establish repository structure
* Design storage and capability flow around Storacha Spaces

### Deliverables

* README with updated system narrative
* Architecture documentation (Vault DID + UCAN)
* Product documentation aligned with Storacha positioning
* Initial roadmap and module planning

---

## 3. Phase 1 — Core MVP: Capability-Native Vault (Current Priority)

Status: In Progress

### Goals

Deliver a functional encrypted vault that demonstrates non-trivial Storacha integration and UCAN-based capability control.

### Key Features

* Vault creation with Vault DID generation
* UCAN delegation to vault owner (vault/manage, vault/upload)
* Client-side encrypted artifact uploads
* Storacha Space integration for encrypted storage
* CID generation and display per artifact
* Metadata indexing and audit trail logging

### Technical Milestones

* Implement Vault DID identity module
* Integrate UCAN delegation flow
* Build Storacha upload client
* Implement client-side encryption (AES-GCM)
* Create vault dashboard UI
* Record audit logs (Vault DID + Actor DID)

---

## 4. Phase 2 — GitHub Artifact Integration (Real-World Workflow Layer)

Status: Planned

### Goals

Enable provenance-aware ingestion of real research artifacts from external sources.

### Key Features

* GitHub Releases API integration
* Import public release assets (datasets, archives, research files)
* Source attribution (Local vs GitHub)
* CID snapshot for imported artifacts
* Audit entries linked to artifact origin

### Impact

Demonstrates meaningful external integration and aligns Racha Vault with real research and developer workflows.

---

## 5. Phase 3 — Versioning & Provenance Layer

Status: Planned

### Goals

Strengthen data integrity and traceability using CID-native version tracking.

### Key Features

* Immutable artifact version history
* CID lineage tracking per artifact
* Integrity verification via CID comparison
* Enhanced audit trail visualization

### Outcome

Transforms Racha Vault into a provenance-aware vault rather than a simple encrypted storage interface.

---

## 6. Phase 4 — Collaborative Vaults & Delegated Capabilities

Status: Future

### Goals

Enable multi-user vault workflows using UCAN capability delegation.

### Planned Features

* Delegating vault/read and vault/upload to collaborators
* Scoped capability permissions per vault
* Delegation chain tracking in audit logs
* Team-based vault management

This phase expands the Vault DID model into full collaborative capability control.

---

## 7. Phase 5 — Advanced Privacy & Secure Sharing

Status: Future Extension

### Planned Enhancements

* Lit Protocol integration for encrypted shared access
* Revocable decryption permissions
* Time-bound access conditions
* Secure multi-party vault environments

This introduces programmable privacy without compromising the zero-knowledge storage model.

---

## 8. Phase 6 — Developer Tooling & Ecosystem Expansion

Status: Long-Term

### Planned Features

* CLI uploader for research and dataset pipelines
* Public API for artifact ingestion
* Automation hooks for CI-based dataset archiving
* Additional data source integrations beyond GitHub
* Provenance graph visualization

---

## 9. Demo & Submission Milestones (PL Genesis)

| Milestone        | Description                                                                     |
| ---------------- | ------------------------------------------------------------------------------- |
| MVP Demo         | Create vault → encrypt artifact → upload to Storacha → generate CID → audit log |
| Integration Demo | Import GitHub release artifact with provenance tracking                         |
| Capability Demo  | Vault DID + UCAN delegation controlling vault operations                        |

---

## 10. Strategic Alignment with Storacha

The roadmap is intentionally designed to:

* Showcase Storacha Spaces as core storage infrastructure
* Demonstrate UCAN capability-native workflows
* Highlight CID lifecycle and verifiable data storage
* Avoid trivial file upload demos in favor of real artifact pipelines

Racha Vault positions Storacha as a foundational layer for verifiable research and evidence storage rather than a generic backend.

---

## 11. Long-Term Vision

Racha Vault evolves into a capability-secured, verifiable data infrastructure layer for research artifacts, AI datasets, and evidence preservation, built around Vault DIDs, UCAN delegations, and Storacha’s decentralized storage primitives.
