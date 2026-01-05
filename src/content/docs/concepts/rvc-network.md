---
title: "Understanding RV-C Networks"
description: "Learn about RV-C networks, supported device types, message structure, termination requirements, and physical connections."
---

RV-C (Recreational Vehicle Controller Area Network) is the communication protocol used in modern RVs to connect and control various systems.

## What is RV-C?

RV-C is based on the CAN (Controller Area Network) protocol, originally developed for automotive applications. It allows devices in your RV to communicate with each other over a simple two-wire network.

### Why RV-C?

Before RV-C, each device in an RV required separate wiring to control panels. With RV-C:

- **Simpler wiring**: Two wires can connect dozens of devices
- **Bi-directional communication**: Devices can send status and receive commands
- **Standardization**: Devices from different manufacturers can work together
- **Scalability**: Easy to add new devices without rewiring

## RV-C Network Topology

```
                         CAN Bus (Two Wires: CAN-H and CAN-L)
    ┌─────────────┬─────────────┬─────────────┬─────────────┬─────────────┐
    │             │             │             │             │             │
[Controller] [Lights]    [Thermostat]  [Tank]     [Battery]  [More...]
  Panel                                  Sensor     Monitor
```

All devices connect to the same two-wire bus. Messages are broadcast to all devices, but only the intended recipient acts on them.

## How RV-C Messages Work

### Message Structure

Each RV-C message contains:

1. **Source Address**: Which device sent the message
2. **Destination Address**: Which device should receive it (or broadcast to all)
3. **Data Group Number (DGN)**: What type of data is being sent
4. **Data**: The actual information (e.g., "Switch 5 is ON")

### Example Message

```
From: Wall Switch Panel (Address: 42)
To: Light Controller (Address: 18)
DGN: DC_DIMMER_COMMAND_2
Data: Instance=5, Status=ON, Brightness=100%
```

## Supported Device Types

RV-C supports a wide variety of device types. RV-Link can interface with most of them:

### Lighting
- DC dimmers
- On/off switches
- Zone controllers
- RGB LED strips

### Climate
- Thermostats
- Heat pumps
- Furnaces
- Fans and vents

### Window Treatments
- Shades
- Blinds
- Awnings

### Security
- Door locks
- Sensors

### Water & Sanitation
- Tank level sensors
- Pumps
- Water heaters

### Power Systems
- Battery monitors
- Chargers/inverters
- Generators
- Solar charge controllers
- AC/DC load centers
- Transfer switches

### Entertainment
- Audio systems (basic control)

## RV-C Termination

CAN networks require proper termination to function correctly. The bus should have a 120Ω resistor at each end of the network.

### Waveshare CAN HAT Configuration

The Waveshare CAN HAT + has jumpers to enable/disable 120Ω termination:

- **If your RV already has termination**: Remove the jumpers (no termination)
- **If your RV needs termination**: Install one jumper (120Ω resistor)

Most modern RVs already have termination at the factory control panel, so you typically **don't need** to enable termination on the CAN HAT.

:::warning
Incorrect termination can cause:
- Intermittent communication
- Missing messages
- Complete communication failure

Consult your RV's documentation or an RV technician if unsure.
:::

## Connecting to Your RV

### Physical Connection

RV-C uses standard 4-pin or 6-pin connectors (often RJ-11 or RJ-12 style, but check your RV).

The two critical wires are:
- **CAN-H** (CAN High)
- **CAN-L** (CAN Low)

Some RVs also provide power on other pins, but RV-Link doesn't use those—it's powered separately.

### Finding the Connection Point

Common locations:
- Behind the factory control panel
- In the basement utility area
- Near the main breaker panel
- Under a dinette seat (sometimes)

Look for a connector labeled "CAN", "RV-C", or a spare port on your existing control panel.

## Bit Rate

RV-C networks typically operate at **250 kbps** (250,000 bits per second). This is the default in RV-Link.

Some older RVs may use 125 kbps. If devices aren't being discovered, try changing the bitrate in the CAN-to-MQTT Bridge configuration.

## Troubleshooting RV-C Issues

### No Devices Discovered

- **Check physical connection**: Verify CAN cable is properly connected
- **Check termination**: Ensure jumpers are configured correctly
- **Check bitrate**: Try 250k vs. 125k
- **Check power**: Ensure your RV's 12V system is on
- **Check bus activity**: Use Node-RED debug to see if any messages are received

### Intermittent Communication

- **Poor connection**: Check cable connections and crimps
- **Incorrect termination**: Add or remove termination as needed
- **Electrical noise**: Route CAN cable away from high-power wires
- **Bad cable**: Replace with a quality shielded cable

### Device Works Physically But Not in RV-Link

- **Not RV-C compliant**: Some RV devices use proprietary protocols
- **Unsupported DGN**: The device may use a message type RV-Link doesn't yet support
- **Wrong instance number**: The device may be configured with an unusual instance ID

Report unsupported devices on the [forum](https://forum.rvlink.app) to help improve RV-Link!

## Learn More

- [RV-C Official Specification](https://www.rv-c.com/) (technical, for advanced users)
- [System Architecture](architecture) - How RV-Link processes RV-C messages
- [Forum](https://forum.rvlink.app) - Ask questions and share experiences
