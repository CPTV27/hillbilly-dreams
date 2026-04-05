# Studio C Call Sheet Management App

This document outlines the architecture and financial model for the Studio C native operations platform that replaces the current Asana workflow.

## Application Architecture
The platform is built to act as the primary workboard and digital call sheet for Studio C productions. 

### Core Features
A strictly managed digital call sheet interface must track:
- Session Date
- Client details
- Assigned Audio Engineer / Producer
- Talent (Musicians/Session players)
- Required Equipment matrix
- Catering allocations

### Database Footprint
This system natively integrates with the Sovereign Engine database, mapping directly to the existing `StudioCRequest` Prisma model to pull leads/pipeline data into active sessions.

## Business & Subscription Model
The software is licensed hierarchically:
- **App-Only Tier:** $99/mo
- **Partner Tier (Year 1):** $500/mo
- **Partner Tier (Year 2+):** $1,000/mo

### Auxiliary Revenue Add-Ons
To scale average order value inside the call-sheet interface, the platform supports the automated selection of modular studio add-ons:
- **EPK Deliverable:** $100–$150 premium
- **Equipment Rentals:** Specific line-item checkouts natively routed to inventory.
- **Crew Overages:** Base rate vs. extended session tracking.
- **Rush Delivery:** Calculated at exactly a 2x rate multiplier.
