# Utopia Campus Wi-Fi Solution
## Bearsville Infrastructure Deployment (Issue #81)

This document specifies the wireless infrastructure protocol for the Bearsville Utopia campus.

### Equipment Specifications
- **Central Node:** U7 Pro Outdoor AP over central exterior location ($279)
- **Extension Nodes:** 2x AC Mesh UAP-AC-M for perimeter and extended coverage ($99 each)

### Antenna Placement Strategy
1. **U7 Pro Outdoor AP:** Central mounting matrix for primary courtyard/exterior throughput.
2. **AC Mesh #1:** Parking/entrance radius.
3. **AC Mesh #2:** Secondary tracking buildings.

### VLAN Architecture
The network must be explicitly partitioned into three isolated VLANs:
- **Public VLAN:** Bound to the guest portal (see Captive Portal spec below).
- **Production VLAN:** High-throughput access exclusively for Studio operations.
- **Client VLAN:** Dedicated, bandwidth-managed partition for sessions and client device offload.

### Captive Portal
Public access will run through a splash page/captive portal. The two options under final evaluation are:
- Managed **Beambox** subscription ($40/mo).
- Custom Sovereign Engine walled-garden system routed at `/welcome/wifi`.

### Installation Steps for Elijah
1. Ruck/mount the central U7 AP and establish the primary gateway uplink.
2. Power and join the AC Mesh endpoints to the central controller.
3. Provision the three distinct VLAN pipelines in the routing manifest.
4. Test failover loops between the U7 and Mesh nodes at the physical perimeters of the property.
5. Stand up the `/welcome/wifi` portal for validation testing alongside the Public VLAN configuration.
