# Product: Racha Vault

## 1. Product Overview

Racha Vault is a verifiable, encrypted research and evidence vault built on Storacha, designed for secure artifact storage, provenance tracking, and capability-based access control.

Unlike generic storage tools, Racha Vault treats each vault as a first-class entity with its own identity (Vault DID) and governs access through UCAN capability delegations. This enables tamper-evident, privacy-first workflows for research datasets, evidence files, and critical artifacts.

The product combines:

* Client-side encryption
* Storacha Spaces for decentralized storage
* CID-based immutable versioning
* UCAN capability-based authorization
* Provenance-aware audit trails

---

## 2. Problem Statement

Modern research and evidence workflows rely on centralized storage systems that lack:

* verifiable integrity
* cryptographic provenance
* fine-grained access control
* auditability of artifact history

This creates significant risks:

* Data tampering and unverifiable modifications
* Loss of artifact lineage and provenance
* Overexposed access through coarse role-based permissions
* Dependence on centralized infrastructure for sensitive data

For researchers, developers, and compliance-driven teams, the ability to securely store and verify artifacts is increasingly critical.

---

## 3. Product Vision

To provide a privacy-first, capability-secured vault for research and evidence artifacts where every file is:

* Encrypted before leaving the client
* Stored on decentralized infrastructure (Storacha)
* Immutably versioned via CID
* Governed by UCAN capability delegations
* Traceable through cryptographic audit logs

Racha Vault aims to become a foundational integrity layer for research, AI artifacts, and evidence preservation workflows.

---

## 4. Target Users

### Primary Users

* Researchers and academic labs
* AI and data science teams
* Web3 research groups
* investigative journalists
* compliance and legal teams

### Secondary Users

* Developers managing research artifacts
* DAOs handling documentation and datasets
* auditors and verification-focused organizations

---

## 5. Core Use Cases

### 5.1 Research Dataset Archiving

Securely store datasets with CID-based version history and verifiable provenance on decentralized storage.

### 5.2 Evidence Preservation

Maintain tamper-evident records of documents and files with cryptographic audit trails tied to Vault DID and Actor DID.

### 5.3 AI Experiment Artifact Management

Track experiment outputs, logs, and model artifacts with immutable lineage and encrypted storage.

### 5.4 Provenance-Aware Artifact Ingestion

Import GitHub release assets (datasets, archives, research files) and convert them into encrypted, verifiable vault entries.

---

## 6. Core Product Features

| Feature                     | Description                                                       | Product Value                    |
| --------------------------- | ----------------------------------------------------------------- | -------------------------------- |
| Vault as Entity (Vault DID) | Each vault has its own identity and capability scope              | Clean ownership and traceability |
| UCAN Capability Access      | Delegated permissions for vault operations (read, upload, manage) | Cryptographic access control     |
| Encrypted Vault Spaces      | Private containers mapped to Storacha Spaces                      | Secure artifact isolation        |
| CID-Based Versioning        | Immutable version history per artifact                            | Verifiable provenance            |
| Audit Trail Dashboard       | Timeline of uploads, actors, and artifact lineage                 | Transparency and accountability  |
| GitHub Release Import       | Import research artifacts from public repositories                | Real-world workflow integration  |
| Client-Side Encryption      | Files encrypted before upload                                     | Zero-knowledge storage model     |
| Artifact Categorization     | Dataset, Paper, Evidence, Logs, Documents                         | Domain-specific UX               |

---

## 7. Product Differentiation

Racha Vault is not a generic decentralized storage interface. It is a provenance and integrity focused vault designed for sensitive and verifiable artifacts.

Key differentiators:

* Vault-centric identity model (Vault DID)
* Capability-based access using UCAN instead of RBAC
* CID-native versioning for tamper-evident storage
* Research and evidence focused artifact workflows
* Zero-knowledge encrypted ingestion pipeline

This positions the product as infrastructure-grade rather than a simple storage dashboard.

---

## 8. Identity & Access Model (Vault DID + UCAN)

Racha Vault follows a capability-native product design.

Core concepts:

* Each vault is assigned a unique Vault DID
* Users interact with vaults through UCAN delegations
* Capabilities are scoped (vault/read, vault/upload, vault/manage)
* Audit logs record both Vault DID and Actor DID

This model enables:

* Fine-grained collaboration without centralized role systems
* Verifiable permission boundaries
* Cryptographically auditable access control

---

## 9. Why Storacha is Core to the Product

Storacha is not used as a generic storage backend but as a foundational infrastructure layer.

It provides:

* Content addressed storage via CIDs
* Durable decentralized persistence (IPFS + Filecoin pipeline)
* Space-based logical isolation for vault entities
* Native compatibility with capability-based workflows
* Verifiable and portable data ownership

This makes Storacha ideal for research artifacts and provenance-critical datasets.

---

## 10. MVP Scope (PL Genesis Submission)

The MVP focuses on delivering a complete, non-trivial verifiable vault workflow:

* Vault creation with Vault DID
* UCAN capability delegation to vault owner
* Client-side encrypted artifact uploads
* Storacha Space integration for storage
* GitHub release artifact import
* CID generation and version tracking
* Audit trail with actor and vault attribution

This demonstrates a real-world, infrastructure-aligned use of Storacha beyond basic file uploads.

---

## 11. Product Roadmap Direction

* Multi-collaborator vaults with delegated UCAN permissions
* Revocable capability management
* Lit Protocol encrypted sharing
* Private repository import via OAuth
* CLI ingestion for research pipelines
* Advanced provenance analytics and visualization

---

## 12. Strategic Positioning

Racha Vault is positioned as a capability-secured, verifiable data vault built on Storacha, enabling encrypted, tamper-evident, and provenance-aware artifact management for research and evidence workflows.

Rather than competing with generic storage tools, it serves as an integrity layer for decentralized research infrastructure and verifiable data systems.
