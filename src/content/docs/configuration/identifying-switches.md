---
title: "Identifying Your Switches"
description: "Walk through your RV to identify and map auto-discovered switches to their physical controls using Home Assistant's dashboard."
---

After installing RV-Link, your RV-C switches will be auto-discovered and appear in Home Assistant as generic entities like `switch_1`, `switch_2`, etc. This guide helps you identify what each switch controls.

## The Challenge

RV-Link can detect that switches exist on your RV-C network, but it has no way of knowing what those switches control. Is `switch_5` the patio light or the bedroom fan? Only you can determine that by testing.

## The Process

### Step 1: Open the Overview Dashboard

1. In Home Assistant, go to **Settings** → **Dashboards**
2. Find the **Overview** dashboard (this is where all auto-discovered switches appear)
3. Open the dashboard on your phone or tablet

### Step 2: Walk Your RV

Now comes the fun part:

1. **Take your phone/tablet with you** as you walk around your RV
2. **Physically toggle each switch** in your RV (wall switches, control panels, etc.)
3. **Watch your Home Assistant dashboard** on your phone
4. **When you see a switch turn on/off**, you've identified it!
5. **Take notes** on what each switch controls

### Example Walkthrough

```
Physical Switch          →  Home Assistant Entity  →  What It Controls
┌─────────────────────┐
│ Galley Light (ON)   │  →  switch_12 turns ON   →  "Galley Light"
└─────────────────────┘

┌─────────────────────┐
│ Patio Light (ON)    │  →  switch_7 turns ON    →  "Patio Light"
└─────────────────────┘

┌─────────────────────┐
│ Bedroom Fan (ON)    │  →  switch_23 turns ON   →  "Bedroom Fan"
└─────────────────────┘
```

### Pro Tips

- **Go methodically**: Start at the front of your RV and work toward the back
- **Toggle twice**: Sometimes switches take a second to update—turn on, then off, then on again
- **Use zones**: RV-C often groups lights by zone. If you see multiple switches turn on together, they're likely in the same zone
- **Check both states**: Test both ON and OFF to confirm the mapping
- **Take photos**: Take pictures of your physical switches and the corresponding Home Assistant entities

## Step 3: Rename Your Entities

Once you've identified a switch:

1. In Home Assistant, go to **Settings** → **Devices & Services** → **MQTT**
2. Find the entity (e.g., `switch_12`)
3. Click on it
4. Click the gear icon (⚙️) in the top right
5. Change the **Name** to something meaningful (e.g., "Galley Light")
6. Change the **Entity ID** if desired (e.g., `switch.galley_light`)
7. Click **Update**

### Naming Conventions

Use clear, descriptive names:

**Good Names:**
- `Galley Light`
- `Bedroom Fan`
- `Patio Awning`
- `Fresh Water Pump`

**Bad Names:**
- `Light 1`
- `Switch Front`
- `The thing`

## Step 4: Document Your Mapping

Create a spreadsheet or document mapping your RV's switches:

| Entity ID | Original Name | New Name | Location | Type |
|-----------|---------------|----------|----------|------|
| `switch_7` | `switch_7` | Patio Light | Exterior | Light |
| `switch_12` | `switch_12` | Galley Light | Galley | Light |
| `switch_23` | `switch_23` | Bedroom Fan | Bedroom | Fan |

This documentation will be helpful for:
- Sharing with the community (if you want to help others with your RV model)
- Troubleshooting issues later
- Recreating your setup if needed

## Other Device Types

Switches aren't the only devices that RV-Link discovers:

### Tank Sensors
Tank sensors appear as `sensor.tank_fresh_water`, `sensor.tank_grey_water`, etc. These are usually self-explanatory.

### Thermostats
Thermostats appear as `climate.thermostat_1`, `climate.thermostat_2`, etc. Walk to each thermostat and change the temperature—watch which entity updates in Home Assistant.

### Battery Monitors
Battery and power devices typically have descriptive names already, but you may want to verify which battery is which (e.g., house vs. chassis).

### Shades and Awnings
These may appear as `cover.shade_1`, `cover.awning_1`, etc. Activate them physically and watch the dashboard.

## Sharing Your Configuration

Once you've identified all your switches, consider sharing your configuration with the community!

### Why Share?

- **Help others**: Someone with your RV model can use your mapping
- **Build community**: Contribute to the collective knowledge
- **Get feedback**: Others might catch mistakes or suggest improvements

### How to Share

1. Export your dashboard YAML (see [Creating Dashboards](dashboards))
2. Create a post on the [forum](https://forum.rvlink.app) in your RV manufacturer's category
3. Include:
   - Your RV make, model, and year
   - Screenshots of your dashboard
   - The YAML configuration
   - Any notes or tips

### Finding Existing Configurations

Before starting from scratch, check if someone with your RV model has already shared their configuration:

1. Visit the [forum](https://forum.rvlink.app)
2. Browse to your RV manufacturer's category
3. Search for your model and year
4. Download the YAML and import it into Home Assistant

## Troubleshooting

### No switches appear
- Verify RV-Link is running (check add-on status)
- Ensure CAN cable is connected to your RV
- Check CAN-to-MQTT Bridge logs
- Verify Mosquitto and Node-RED are running

### Switch appears but doesn't control anything
- The physical switch in your RV may be disconnected or broken
- Check wiring in your RV
- Verify the entity in Home Assistant is actually sending commands (check Node-RED debug)

### Multiple switches turn on at once
- RV-C zone lighting: Multiple lights are grouped into a single zone
- This is normal RV-C behavior
- You can rename the entity to reflect the zone (e.g., "Living Area Lights")

### Entity keeps changing back
- MQTT discovery may be recreating the entity
- Set a persistent friendly name in your YAML configuration
- Or customize the MQTT discovery message in Node-RED

## What's Next?

Now that you've identified your switches, you can:

- [Create custom dashboards](dashboards) tailored to your RV layout
- [Set up automations](../automation/examples) (e.g., "Good Night" turns off all lights)
- Share your configuration on the [forum](https://forum.rvlink.app)
