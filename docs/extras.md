# Extras: Demo, Pitch, and Submission Context

## 1. Demo Overview

Racha Vault demonstrates a capability-secured, encrypted research and evidence vault built natively on Storacha. The demo focuses on the full artifact lifecycle from vault creation to CID-based provenance tracking using a vault-as-entity architecture.

Core flow shown in demo:

* Vault creation with Vault DID
* UCAN capability delegation to vault owner
* Client-side encrypted artifact ingestion
* Storage on Storacha Spaces
* CID generation and audit trail verification

---

## 2. Demo Scenario

Primary Use Case: Verifiable Research Artifact Archiving

A user creates a vault, imports a dataset (local file or GitHub release), encrypts it locally, uploads it to Storacha, and verifies integrity through CID and audit logs tied to Vault DID and Actor DID.

---

## 3. End-to-End Demo Flow

1. Create a new vault (Vault DID generated)
2. Issue UCAN delegation with scoped capabilities (vault/manage, vault/upload)
3. Upload a local artifact or import from GitHub Releases
4. Encrypt artifact client-side (AES-GCM)
5. Upload encrypted artifact to Storacha Space
6. Receive CID from storage layer
7. Record metadata and audit log (Vault DID + Actor DID)
8. Display version history, provenance, and integrity status in dashboard

---

## 4. Pitch Summary

Racha Vault is a verifiable, encrypted vault for research datasets, evidence files, and critical artifacts built on Storacha.

Unlike generic storage tools, it uses:

* Vault DID identity model
* UCAN capability-based authorization
* Client-side encryption (zero-knowledge)
* CID-native provenance tracking

This positions the product as an integrity-first infrastructure layer rather than a simple file storage interface.

---

## 5. What Makes This Project Non-Trivial

* Native Storacha Space integration (not basic file upload)
* Capability-based access using UCAN
* Vault-as-entity architecture with dedicated DID
* Provenance-aware artifact pipeline
* GitHub release artifact ingestion
* CID-based immutable versioning and audit logs

---

## 6. Storacha Alignment

Racha Vault is architected around Storacha primitives:

* Content addressed storage via CIDs
* Decentralized persistence for encrypted artifacts
* Space-based vault isolation
* Capability-aligned workflows with UCAN

Storacha is used as a foundational infrastructure layer rather than a generic backend.

---

## 7. Submission Context (PL Genesis)

This project demonstrates a real-world, infrastructure-grade use of decentralized storage by focusing on verifiable research and evidence workflows.

Instead of a generic storage dashboard, Racha Vault showcases:

* Encrypted artifact ingestion
* Capability-native authorization
* CID provenance tracking
* External integration (GitHub Releases)

---

## 8. Links (To Be Updated)

* Demo Video: [Add link]
* Live Demo: [Add link]
* Repository: [Add repo link]
* Pitch Deck: [Add link]

