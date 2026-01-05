---
title: "Full Manual Installation"
description: "Advanced installation guide for manually setting up Mosquitto, CAN-to-MQTT Bridge, and Node-RED on Home Assistant OS."
---

This guide is for advanced users who want complete control over their installation. You'll build the hardware and manually install each Home Assistant add-on.

## Prerequisites

- **Assembled hardware** following the [Hardware Assembly Guide](../hardware/assembly)
- **Home Assistant OS installed** on your NVME drive
- **Basic understanding** of Home Assistant add-ons and YAML configuration
- **SSH access** configured (optional but helpful)

## Installation Overview

1. Install and configure Mosquitto MQTT broker
2. Install and configure CAN-to-MQTT Bridge add-on
3. Install and configure Node-RED
4. Import RV-Link flows into Node-RED
5. Configure MQTT integration in Home Assistant

## Step 1: Install Mosquitto Broker

The Mosquitto broker handles MQTT communication between the CAN bridge and Node-RED.

### Installation

1. In Home Assistant, go to **Settings** → **Add-ons** → **Add-on Store**
2. Search for "Mosquitto broker"
3. Click **Install**

### Configuration

1. Go to the **Configuration** tab
2. Add a user for RV-Link:

```yaml
logins:
  - username: rvlink
    password: your_secure_password_here
```

3. Click **Save**
4. Go to the **Info** tab and click **Start**
5. Enable **Start on boot**

## Step 2: Install CAN-to-MQTT Bridge

:::info Add-on Repository
The CAN-to-MQTT Bridge is available in the RV-Link add-on repository.

Add the repository: `https://github.com/Backroads4Me/ha-addons`

[![Open your Home Assistant instance and show the add-on repository dialog with a specific repository URL pre-filled.](https://my.home-assistant.io/badges/supervisor_add_addon_repository.svg)](https://my.home-assistant.io/redirect/supervisor_add_addon_repository/?repository_url=https%3A%2F%2Fgithub.com%2FBackroads4Me%2Fha-addons)
:::

### Installation

1. Go to **Settings** → **Add-ons** → **Add-on Store**
2. Click the three dots (⋮) in the top right → **Repositories**
3. Add: `https://github.com/Backroads4Me/ha-addons`
4. Find "CAN to MQTT Bridge" and click **Install**

### Configuration

1. Go to the **Configuration** tab
2. Configure the CAN interface:

```yaml
can_interface: can0
can_bitrate: 250000
mqtt_broker: core-mosquitto
mqtt_port: 1883
mqtt_username: rvlink
mqtt_password: your_secure_password_here
mqtt_topic_receive: can/raw
mqtt_topic_send: can/send
mqtt_topic_status: can/status
```

3. Click **Save**
4. Go to **Info** tab and click **Start**
5. Enable **Start on boot**

### Verify CAN Interface

1. Go to the **Log** tab
2. You should see messages indicating the CAN interface is active
3. If you see errors about `can0` not found, you may need to enable it in the host OS

## Step 3: Install Node-RED

Node-RED processes CAN messages and translates them for Home Assistant.

### Installation

1. Go to **Settings** → **Add-ons** → **Add-on Store**
2. Search for "Node-RED"
3. Click **Install** (this may take several minutes)

### Configuration

1. Go to the **Configuration** tab
2. Configure Node-RED:

```yaml
credential_secret: your_random_secret_here
ssl: false
certfile: fullchain.pem
keyfile: privkey.pem
```

3. Under **System packages**, add any required packages (usually none needed)
4. Under **Node-RED nodes**, add:

```yaml
- node-red-contrib-home-assistant-websocket
```

5. Click **Save**
6. Go to **Info** tab and click **Start**
7. Enable **Start on boot**

### Access Node-RED

1. Click **Open Web UI** from the add-on page
2. You'll be prompted to set a username and password (recommended)

## Step 4: Import RV-Link Flows

Now you'll import the RV-Link automation flows into Node-RED.

### Download the Flows

:::warning Coming Soon
The RV-Link Node-RED flows will be available for download. They are currently in the [rv-link-node-red repository](https://github.com/Backroads4Me/rv-link-node-red).

For now, you can clone the repository or download the `flows.json` file directly.
:::

### Import into Node-RED

1. Open Node-RED web interface
2. Click the menu (☰) in the top right
3. Select **Import**
4. Click **select a file to import**
5. Choose your downloaded `flows.json` file
6. Click **Import**

### Configure MQTT Nodes

1. After importing, you'll see several flows
2. Double-click any MQTT node (they'll have a yellow warning triangle)
3. Click the pencil icon next to "Server"
4. Configure the MQTT broker:
   - **Server**: `core-mosquitto`
   - **Port**: `1883`
   - **Username**: `rvlink`
   - **Password**: `your_secure_password_here`
5. Click **Update** then **Done**
6. Click **Deploy** in the top right

### Verify Flows are Running

1. Go to the **Debug** tab in Node-RED (bug icon on the right)
2. You should see messages flowing as you interact with switches in your RV
3. Check for any error messages in red

## Step 5: Configure MQTT Integration in Home Assistant

1. Go to **Settings** → **Devices & Services**
2. Click **+ Add Integration**
3. Search for "MQTT"
4. Configure:
   - **Broker**: `core-mosquitto`
   - **Port**: `1883`
   - **Username**: `rvlink`
   - **Password**: `your_secure_password_here`
5. Click **Submit**

### Enable MQTT Discovery

1. In **Settings** → **Devices & Services** → **MQTT**
2. Ensure "Enable discovery" is checked
3. Discovery prefix should be `homeassistant` (default)

## Step 6: Verify Everything is Working

1. Go to **Settings** → **Devices & Services** → **MQTT**
2. You should start seeing devices appear as you use switches in your RV
3. Check **Settings** → **Devices & Services** → **Devices**
4. New RV-C devices should be automatically discovered

## Enable CAN Interface in Host OS

If the CAN interface isn't working, you may need to enable it at the host OS level.

:::info SSH Access Required
You'll need SSH access to the Home Assistant host. See [Home Assistant documentation](https://www.home-assistant.io/common-tasks/os/#enabling-ssh) for enabling SSH.
:::

1. SSH into the Home Assistant OS
2. Run the following command:

```bash
ha hardware info
```

3. Look for `can0` in the list
4. If not present, you may need to configure device tree overlays (varies by hardware)

For Raspberry Pi with Waveshare CAN HAT, you typically need to edit `/boot/config.txt` and add:

```
dtoverlay=mcp2515-can0,oscillator=12000000,interrupt=25
dtoverlay=spi0-hw-cs
```

Then reboot.

## Troubleshooting

### No devices discovered
- Verify Mosquitto is running
- Check CAN-to-MQTT Bridge logs for errors
- Ensure `can0` interface is active
- Verify Node-RED flows are deployed
- Check MQTT integration is configured correctly

### Devices discovered but not responding
- Check Node-RED debug logs for errors
- Verify CAN cable is properly connected to your RV
- Check CAN HAT jumper settings (120Ω termination)

### Node-RED won't start
- Check the add-on logs for errors
- Verify configuration is valid YAML
- Ensure there are no port conflicts

## What's Next?

- [Identify your switches](../configuration/identifying-switches)
- [Create custom dashboards](../configuration/dashboards)
- [Join the community](https://forum.rvlink.app)

## Advanced Configuration

### Custom MQTT Topics

You can customize MQTT topics in the CAN-to-MQTT Bridge configuration and update corresponding Node-RED nodes.

### Multiple CAN Interfaces

If you need to monitor multiple CAN networks, you can install multiple instances of the CAN-to-MQTT Bridge with different configurations.

### Custom Node-RED Flows

The RV-Link flows are fully customizable. You can add your own logic, integrations, and automations within Node-RED.

Need help? Ask on the [forum](https://forum.rvlink.app)!
