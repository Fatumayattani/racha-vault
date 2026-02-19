# Repository Structure

## Overview

This document describes the code structure of Racha Vault. The repository is organized to clearly separate frontend UI, core logic, backend services, and documentation.

The structure is intentionally minimal and modular to support maintainability and clear development flow.

---

## Root Structure

```
racha-vault/
├── frontend/        # React + TypeScript UI (vault interface)
├── lib/             # Core logic (storacha, crypto, ucan, integrations)
├── server/          # Metadata and audit backend
├── docs/            # Project documentation
├── public/          # Static assets (images, visuals, demo assets)
└── README.md        # Project overview and entry documentation
```

---

## frontend/

Contains the React + TypeScript application.

Responsibilities:

* Vault UI and dashboard
* File upload and artifact import
* UCAN delegation handling (client side)
* Encryption orchestration
* Audit trail and version history display

This is the main user-facing layer of the project.

---

## lib/

Contains reusable core modules used across the application.

Typical modules:

* storacha client (upload, space interaction)
* crypto utilities (client-side encryption)
* ucan utilities (delegations and capability proofs)
* github integration (release artifact ingestion)
* audit utilities (metadata handling)

This layer implements the core vault pipeline.

---

## server/

Lightweight backend service for non-sensitive operations.

Responsibilities:

* Metadata indexing
* Audit log storage (CID, Vault ID, timestamps)
* Artifact record management

Note:
No plaintext files or encryption keys are stored on the server.

---

## docs/

Contains all project documentation.

Includes:

* architecture.md
* product.md
* roadmap.md
* structure.md
* extras.md

This folder is intended for reviewers, contributors, and technical reference.

---

## public/

Stores static assets such as:

* images
* demo visuals
* documentation graphics
* branding assets
