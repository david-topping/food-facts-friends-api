# Food Facts Friends API

Backend API for handling donations for the Food Facts Friends charity website.

This service is responsible for:

- Creating Stripe PaymentIntents
- Handling Stripe webhooks
- Enforcing donation business rules
- TODO: Providing persistence (DB) and Gift Aid

## Architecture

This API uses **Hexagonal Architecture (Ports & Adapters)**.

```
src/
├── domain/          # Core business rules & interfaces
├── application/     # Use-cases
├── adapters/        # Inbound (HTTP) & outbound (Stripe, DB) adapters
├── infrastructure/  # Express setup & route registration
└── index.ts         # Entry point
```

## Key Flows

### Create a donation

```
POST /donations
→ Validate input
→ Create Donation use-case
→ Create Stripe PaymentIntent
→ Return client_secret
```

### Stripe webhook

```
POST /webhooks/stripe
→ Verify event
→ Reconcile donation state
```

## Running locally

```
npm install
npm run dev
```
