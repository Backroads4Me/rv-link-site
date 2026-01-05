---
title: "Hardware Assembly Guide"
description: "Detailed hardware assembly instructions with photos for building RV-Link using Raspberry Pi 5, CAN HAT, and NVMe components."
---

Follow this step-by-step guide to assemble your RV-Link hardware. Take your time—proper assembly ensures reliable operation.

## Required Tools

- Phillips screwdriver (small)
- Tweezers or small pliers (helpful but not required)
- Clean, static-free workspace

## Components Overview

Before starting, verify you have all components:

- Raspberry Pi 5 (4GB or 8GB)
- Waveshare 2-CH CAN HAT +
- Waveshare PCIe to M.2 Adapter Board (E)
- NVME drive
- Case with standoffs, screws, and thermal pads
- Fan (usually included with case)
- CAN cable

## Step 1: Prepare the Raspberry Pi

### Apply Thermal Pads

![Thermal pads before installation](/img/assembly/assembly_8.jpg)

1. Remove the Raspberry Pi from its packaging
2. Apply thermal transfer pads to the CPU and other hot components
3. Remove the thin plastic backing from the thermal pads (see image below)

![Removing backing from thermal pads](/img/assembly/assembly_9.jpg)

### Prepare Fan Connection

The Raspberry Pi fan connector has a small plastic cover that must be removed.

![Fan connector with cover](/img/assembly/assembly_6.jpg)

Gently remove the cover using tweezers or fingernail:

![Fan connector with cover removed](/img/assembly/assembly_7.jpg)

## Step 2: Install PCIe to M.2 Adapter

### Mount the NVME Drive

![PCIe adapter with NVME installed](/img/assembly/assembly_12.jpg)

1. Insert your NVME drive into the M.2 slot on the Waveshare PCIe adapter at a 30-degree angle
2. Press down gently and secure with the included screw

### Connect the PCIe Ribbon

![Lifting the PCIe connector clip](/img/assembly/assembly_15.jpg)

1. Locate the PCIe connector on the Raspberry Pi
2. Gently lift the black clip to open the connector
3. Insert the ribbon cable from the Waveshare adapter

![PCIe ribbon fully connected](/img/assembly/assembly_16.jpg)

4. Press down the black clip to secure the ribbon
5. The other end should be connected to the Waveshare PCIe adapter

### Mount the PCIe Adapter

![Bottom view showing screw positions](/img/assembly/assembly_13.jpg)

1. Position the PCIe adapter on the bottom of the Raspberry Pi
2. Align the mounting holes
3. Secure with the included screws

![Top view of adapter installed](/img/assembly/assembly_14.jpg)

## Step 3: Install Case Standoffs

![Standoffs installed in all 4 corners](/img/assembly/assembly_18.jpg)

1. Insert brass standoffs into all 4 corners of the case
2. These will support the Raspberry Pi inside the case

![Pi with standoffs installed](/img/assembly/assembly_20.jpg)

## Step 4: Connect the Fan

![Fan cable connected](/img/assembly/assembly_19.jpg)

1. Connect the fan cable to the fan connector on the Raspberry Pi (cover already removed)
2. Route the cable so it won't interfere with the CAN HAT installation

## Step 5: Install the CAN HAT

### Configure the 120Ω Termination Jumpers

:::warning Important
The CAN HAT has two jumpers for 120Ω termination resistors. Configure these based on your RV's CAN network:

- **If your RV-C network already has termination**: Remove **both** jumpers
- **If your RV-C network needs termination**: Install **one** jumper (usually the right one)
- **Consult your RV's documentation** if unsure

![CAN HAT jumper configuration](/img/assembly/assembly_1.jpg)

The image shows:
- **Left jumper**: Incorrect position (off)
- **Right jumper**: Correct position (resistor installed)
:::

### Mount the CAN HAT

![CAN HAT installed on Pi](/img/assembly/assembly_22.jpg)

1. Carefully align the CAN HAT with the 40-pin GPIO header on the Raspberry Pi
2. Press down gently but firmly until fully seated

![Side view showing header connection](/img/assembly/assembly_23.jpg)

3. The HAT should sit flush on top of the standoffs

### Connect Power from PCIe Adapter

![Power cable connected from PCIe adapter to CAN HAT](/img/assembly/assembly_24.jpg)

1. Locate the power cable from the PCIe adapter
2. Connect it to the power input on the CAN HAT
3. This provides stable power to the CAN interface

## Step 6: Final Assembly

### Place Pi in Case

![Pi installed in case](/img/assembly/assembly_5.jpg)

1. Carefully lower the assembled Pi into the case
2. Align the mounting holes with the standoffs
3. Secure with screws through the CAN HAT into the standoffs

### Install Top Cover

![Various screws for case](/img/assembly/assembly_3.jpg)

1. Place the top cover with installed heatsink/fan onto the case
2. Ensure the fan is oriented correctly (airflow direction)
3. Secure with the remaining screws

![Fully assembled unit](/img/assembly/assembly_21.jpg)

## Step 7: Verify Assembly

Before powering on:

1. **Check all connections**:
   - PCIe ribbon cable secure
   - CAN HAT fully seated
   - Fan connected
   - Power cable from PCIe adapter to CAN HAT connected

2. **Verify jumper settings** on CAN HAT

3. **Inspect for loose screws or debris**

## What's Next?

Your hardware is now assembled! Continue to:

- [Flash the pre-configured image](../getting-started/diy-build#software-installation) (DIY path)
- [Manual software installation](../getting-started/manual-install) (Advanced path)
- [Connect to your RV's CAN network](../installation/can-connection)

## Troubleshooting

### Pi won't boot
- Verify NVME is properly seated
- Check that PCIe ribbon cable is secure
- Ensure power supply is adequate (5V, 3A minimum)

### CAN HAT not detected
- Verify the HAT is fully seated on the GPIO header
- Check power cable connection from PCIe adapter
- Review jumper settings

### Overheating
- Ensure thermal pads are properly installed
- Verify fan is connected and spinning
- Check that heatsink makes contact with thermal pads

Need help? Ask on the [forum](https://forum.rvlink.app)!
