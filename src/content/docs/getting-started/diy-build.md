---
title: "DIY Build Guide"
description: "Step-by-step guide to building your own RV-Link hardware and flashing the pre-configured Home Assistant OS image."
---

Build your own RV-Link hardware and flash our pre-configured Home Assistant OS image. This is the perfect balance between hands-on building and convenience.

## Overview

This path involves:
1. **Purchasing the hardware components** (see Bill of Materials below)
2. **Assembling the hardware** following our step-by-step guide
3. **Flashing the pre-configured image** to your NVME drive
4. **Connecting to your RV** and configuring WiFi

Total cost: Approximately **$177-$232** depending on which Raspberry Pi and case you choose.

## Bill of Materials (BOM)

| Component | Price | Link |
|-----------|-------|------|
| **Raspberry Pi 5 (4GB)** | $70 | [CanaKit](https://www.canakit.com/raspberry-pi-5-4gb.html) |
| **Waveshare 2-CH CAN HAT +** | $29 | [Waveshare](https://www.waveshare.com/2-ch-can-hat-plus.htm) |
| **Waveshare PCIe to M.2 Adapter Board (E)** | $22 | [Amazon](https://a.co/d/0w0WuaM) |
| **NVME Drive (256GB)** | $26 | [Amazon](https://a.co/d/c9OCTZB) |
| **CAN Cable** | $5 | [Various vendors] |
| **Total (Base)** | **$152** | |

### Case Options

Choose one of these cases:

| Case Option | Price | Link | Notes |
|-------------|-------|------|-------|
| **Case 1** (Recommended) | $25 | [Amazon](https://a.co/d/ix35YAY) | Best cooling, professional look |
| **Case 2** (Budget) | $18 | [Amazon](https://a.co/d/iQtNZHq) | Good value |
| **Case 3** (Minimal) | $6 | [Waveshare](https://www.waveshare.com/pi5-case-d.htm) | Basic protection |

### Optional Upgrades

| Component | Price | Link | Why Upgrade? |
|-----------|-------|------|-----------:|
| **Raspberry Pi 5 (8GB)** | $80 | [Amazon](https://a.co/d/h6j9GHp) | More headroom for future features |

## Assembly Guide

Follow our detailed [Hardware Assembly Guide](/hardware/assembly/) for step-by-step instructions with photos.

### Assembly Overview

1. Prepare the Raspberry Pi (apply thermal pads, install heatsink)
2. Install the PCIe to M.2 adapter and NVME drive
3. Connect the PCIe ribbon cable
4. Mount the Pi in the case with standoffs
5. Install the CAN HAT on top of the Pi
6. Connect power cable from PCIe adapter to CAN HAT
7. Configure CAN HAT jumpers (120Ω termination)
8. Final assembly and testing

**Estimated assembly time**: 30-45 minutes

## Software Installation

### Step 1: Download the Pre-Configured Image

Download the latest RV-Link HAOS image from GitHub Releases:

**[Download Latest Image](https://github.com/Backroads4Me/rv-link-haos-image/releases/latest)**

Direct download link (always gets the latest version):
```
https://github.com/Backroads4Me/rv-link-haos-image/releases/latest/download/rvlink-haos-pi5.img.zst
```

The image includes:
- ✅ Home Assistant OS (latest stable)
- ✅ Mosquitto MQTT broker (pre-configured)
- ✅ CAN-to-MQTT Bridge add-on (configured for can0)
- ✅ Node-RED with RV-Link flows (imported and ready)
- ✅ All add-ons configured and tested

**File size**: Approximately 2-4GB compressed

:::tip Verify Your Download
Each release includes a `SHA256SUMS.txt` file. Download it and verify your image file:

**Windows (PowerShell):**
```powershell
Get-FileHash rvlink-haos-pi5-*.img.zst -Algorithm SHA256
```

**Linux/Mac:**
```bash
sha256sum -c SHA256SUMS.txt
```

Compare the checksum to ensure your download is complete and intact.
:::

### Step 2: Flash the Image to NVME

**Using Raspberry Pi Imager 2.0** (Recommended):

1. Download [Raspberry Pi Imager 2.0](https://www.raspberrypi.com/software/)
2. Open Raspberry Pi Imager
3. **Choose Device**: Select "Raspberry Pi 5"
4. **Choose OS**: Scroll down → "Use custom" → Select your downloaded `.img.zst` file
5. **Choose Storage**: Select your NVME drive (double-check it's the correct drive!)
6. Click **"Next"**
7. When prompted "Would you like to apply OS customisation settings?", click **"No"** (already configured)
8. Confirm and wait for completion (5-10 minutes)

:::tip Why Raspberry Pi Imager 2.0?
The official Raspberry Pi Imager 2.0 is designed specifically for Raspberry Pi and automatically handles compressed images. It's the easiest tool for most users.
:::

**Alternative**: If you prefer [balenaEtcher](https://www.balena.io/etcher/), it works too - just select the image, select the drive, and click Flash.

### Step 3: Initial Boot

1. Insert the NVME into your assembled Pi
2. Connect via Ethernet to your network (WiFi configuration comes later)
3. Connect the CAN cable to your RV's RV-C network
4. Power on the Raspberry Pi
5. Wait 2-3 minutes for initial boot

### Step 4: Access Home Assistant

1. Open a web browser
2. Navigate to `http://homeassistant.local:8123`
3. Follow the Home Assistant onboarding wizard
4. Create your user account

### Step 5: Configure WiFi

:::info
You'll need to configure WiFi through the Home Assistant OS interface:

1. Go to **Settings** → **System** → **Network**
2. Select your WiFi network
3. Enter your WiFi password
4. Once connected, you can disconnect Ethernet (though we recommend keeping it connected)
:::

## Verify RV-Link is Running

1. In Home Assistant, go to **Settings** → **Add-ons**
2. You should see:
   - Mosquitto broker (running)
   - CAN-to-MQTT Bridge (running)
   - Node-RED (running)
   - RV-Link (stopped - this is normal, it's an orchestrator)

3. Go to **Settings** → **Devices & Services** → **MQTT**
4. You should start seeing auto-discovered devices appearing as you use switches in your RV

## What's Next?

- [Identify your switches](/configuration/identifying-switches/) by toggling them in your RV
- [Create custom dashboards](/configuration/dashboards/) tailored to your needs
- [Join the community](https://forum.rvlink.app) to share your dashboard configuration

## Troubleshooting

If you run into issues, check our [Troubleshooting Guide](/troubleshooting/common-issues/) or ask for help on the [forum](https://forum.rvlink.app).

Common issues:
- **Can't access Home Assistant**: Make sure you're on the same network, try `http://homeassistant.local:8123` or find the Pi's IP address
- **No devices discovered**: Verify CAN connection, check CAN HAT jumpers
- **WiFi not working**: Use Ethernet for initial setup
