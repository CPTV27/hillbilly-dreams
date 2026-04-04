# Studio C Signal Chain Manual

## 1. Overview
This manual details the standard signal chain and routing protocol for the Studio C live room and control interfaces. The objective is maximum analog warmth paired with zero-latency digital monitoring.

## 2. Default Input Routing
- **Vocal Mics (Channels 1-4):** Neve 1073 preamps -> Distressor EL8-X (Opto mode) -> Apollo x8p Line Inputs 1-4.
- **Acoustic Guitar/Strings (Channels 5-6):** API 3124+ -> Tube-Tech CL 1B -> Apollo x8p Line Inputs 5-6.
- **Bass DI (Channel 7):** Avalon U5 -> Apollo x8p Line Input 7.
- **Keys/Synths (Channels 8-10):** Radial JDI stereo DI -> SSL SuperAnalogue preamps -> Apollo x8p Line Inputs 8-10.

## 3. Bus and Master Routing
- **Mix Bus (Hardware Insert):** Routed from Apollo Line Outputs 7-8 out to the SSL Fusion processor (Vintage Drive engaged, High Frequency compression active) -> return to Apollo Line Inputs 7-8.
- **Monitoring:** Master out to Dangerous Music D-BOX+ for summing and monitor control. Primary monitors: Focal Trio11 Be.

## 4. Safety & Gain Staging
WARNING: Always power down phantom power (+48v) before patching ribbon microphones. Failure to do so will destroy the microphone ribbon elements. Target average recording levels at -18dBFS to preserve headroom for analog emulations.
