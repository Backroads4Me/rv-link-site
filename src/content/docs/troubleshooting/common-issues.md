---
title: "Common Issues and Solutions"
description: "Solutions to common RV-Link issues including CAN connection problems, device discovery failures, and WiFi connectivity."
---

Having trouble with RV-Link? Check these common issues and solutions before posting on the forum.

## Installation Issues

### Can't Access Home Assistant

**Symptom**: Browser can't reach `http://homeassistant.local:8123`

**Solutions**:

1. **Wait longer**: Initial boot takes 2-3 minutes
2. **Check network**: Ensure your device and computer are on the same network
3. **Use IP address**: Find the Pi's IP address and try `http://192.168.1.xxx:8123`
4. **Check Ethernet**: Ensure Ethernet cable is connected (WiFi configuration comes later)
5. **Power supply**: Use a quality 5V 3A power supply

**How to find the IP address**:
- Check your router's DHCP client list
- Use a network scanner like Fing or Angry IP Scanner
- If you have SSH access: `ha network info`

### CAN Interface Not Found

**Symptom**: CAN-to-MQTT Bridge shows `can0: interface not found` in logs

**Solutions**:

1. **Check hardware**: Verify CAN HAT is properly seated on GPIO pins
2. **Check power**: Ensure power cable from PCIe adapter to CAN HAT is connected
3. **Enable interface**: The CAN interface may need to be enabled in Host OS (see [Manual Installation Guide](../getting-started/manual-install#enable-can-interface-in-host-os))

### Add-ons Won't Start

**Symptom**: Mosquitto, Node-RED, or CAN-to-MQTT Bridge won't start

**Solutions**:

1. **Check logs**: Go to the add-on's Log tab for specific error messages
2. **Restart**: Sometimes a simple restart fixes startup issues
3. **Check configuration**: Verify YAML configuration is valid (no typos, correct indentation)
4. **Port conflicts**: Ensure no other add-ons are using the same ports
5. **Storage space**: Check that your NVME isn't full

## Discovery Issues

### No Devices Discovered

**Symptom**: No switches, sensors, or other devices appear in Home Assistant

**Solutions**:

1. **Check RV power**: Ensure your RV's 12V system is on
2. **Check CAN connection**: Verify CAN cable is connected to your RV
3. **Check bitrate**: Try changing from 250k to 125k (or vice versa) in CAN-to-MQTT Bridge configuration
4. **Check termination**: Verify CAN HAT jumpers are configured correctly
5. **Toggle switches**: Physically toggle switches in your RV to generate CAN traffic
6. **Check logs**:
   - CAN-to-MQTT Bridge: Should show incoming CAN messages
   - Node-RED debug: Should show decoded messages
   - MQTT integration: Should show discovery messages

### Devices Discovered But Won't Control

**Symptom**: Switches appear but toggling them doesn't do anything

**Solutions**:

1. **Check bidirectional communication**: Verify Node-RED flows include both receive and send logic
2. **Check MQTT send topic**: Ensure CAN-to-MQTT Bridge is listening on the correct send topic
3. **Check entity state**: In Home Assistant, verify the entity changes state when you toggle the physical switch
4. **Check Node-RED flows**: Ensure flows are deployed (solid blue dot, not hollow)
5. **Check for errors**: Node-RED debug should show messages being sent

### Only Some Devices Discovered

**Symptom**: Some switches work but others don't appear

**Solutions**:

1. **Toggle all switches**: Some devices only appear after you use them
2. **Wait**: Discovery can take time as devices wake up and send status
3. **Check DGN support**: Some device types may not be supported yet
4. **Check instance numbers**: Devices may be using unusual instance IDs
5. **Post on forum**: Share which devices are missing to help improve RV-Link

## Performance Issues

### Slow Dashboard Response

**Symptom**: Dashboards take a long time to load or update

**Solutions**:

1. **Reduce entities**: Remove unused entities from your dashboard
2. **Use conditional cards**: Hide cards that aren't always needed
3. **Optimize Node-RED**: Remove debug nodes that aren't needed
4. **Check network**: Ensure strong WiFi or use Ethernet
5. **Restart Home Assistant**: Sometimes helps clear up sluggishness

### High CPU Usage

**Symptom**: Raspberry Pi is hot and fans are loud

**Solutions**:

1. **Check for loops**: Ensure Node-RED flows don't have infinite loops
2. **Reduce polling**: If you added custom polling, reduce frequency
3. **Check thermal pads**: Verify heatsink is making good contact
4. **Improve airflow**: Ensure case fan is running and has clear airflow
5. **Consider Pi 5 8GB**: If you have the 4GB model and added many add-ons

### WiFi Disconnects

**Symptom**: RV-Link loses WiFi connection frequently

**Solutions**:

1. **Use Ethernet**: Ethernet is more reliable than WiFi
2. **Improve signal**: Move Pi closer to WiFi router or use a WiFi extender
3. **Check power**: Ensure power supply is adequate (low voltage can cause WiFi issues)
4. **Update firmware**: Ensure Home Assistant OS is up to date
5. **Static IP**: Configure a static IP to avoid DHCP issues

## Configuration Issues

### Can't Identify a Switch

**Symptom**: Toggling a physical switch doesn't show anything in Home Assistant

**Solutions**:

1. **Check device type**: It may not be a switch (could be a dimmer, thermostat, etc.)
2. **Check zones**: Some lights are grouped into zones—one switch may control multiple lights
3. **Check Node-RED debug**: See if any messages arrive when you toggle
4. **Check manufacturer**: Some devices may use proprietary protocols, not RV-C
5. **Post on forum**: Others with your RV may know the answer

### Dashboard Import Fails

**Symptom**: Importing someone else's dashboard YAML doesn't work

**Solutions**:

1. **Update entity IDs**: Their entity IDs won't match yours—find and replace them
2. **Check YAML syntax**: Ensure YAML is valid (indentation matters!)
3. **Missing cards**: Install any required custom cards (e.g., from HACS)
4. **Version mismatch**: Dashboard may require a newer version of Home Assistant
5. **Start simple**: Import one view at a time to isolate issues

## Hardware Issues

### Pi Won't Boot

**Symptom**: No lights, no activity, Pi appears dead

**Solutions**:

1. **Check power**: Use a quality 5V 3A USB-C power supply
2. **Check NVME**: Ensure NVME is properly seated
3. **Check PCIe ribbon**: Verify ribbon cable is secure
4. **Try different power supply**: Some cheap USB-C supplies don't work well
5. **Check for shorts**: Inspect for metal shavings or screws causing shorts

### Overheating

**Symptom**: Pi shuts down or throttles due to heat

**Solutions**:

1. **Check fan**: Ensure fan is spinning
2. **Check thermal pads**: Verify contact between CPU and heatsink
3. **Improve airflow**: Ensure case vents aren't blocked
4. **Check ambient temperature**: RVs can get hot—provide additional cooling if needed
5. **Reduce load**: Stop unnecessary add-ons or services

### CAN HAT Not Detected

**Symptom**: CAN interface doesn't appear in Home Assistant

**Solutions**:

1. **Check seating**: Remove and reseat the CAN HAT on the GPIO header
2. **Check power cable**: Verify power from PCIe adapter to CAN HAT
3. **Check for damage**: Inspect GPIO pins for bent or broken pins
4. **Test without HAT**: Verify Pi boots without the CAN HAT installed
5. **Contact manufacturer**: The CAN HAT itself may be defective

## Software Issues

### Add-on Update Fails

**Symptom**: Can't update an add-on, or update breaks functionality

**Solutions**:

1. **Check logs**: Look for specific error messages
2. **Restart before updating**: Sometimes helps
3. **Check storage**: Ensure enough space for update
4. **Restore backup**: If update broke something, restore from backup
5. **Report issue**: File a bug report if update consistently fails

### Node-RED Flows Disappeared

**Symptom**: Flows are missing after a restart

**Solutions**:

1. **Check Node-RED storage**: Flows are stored in `/config/node-red/`
2. **Restore from backup**: Use Home Assistant backup to restore
3. **Reimport flows**: Import from the RV-Link repository
4. **Check logs**: Look for errors during Node-RED startup
5. **Post on forum**: This shouldn't happen—report it!

### MQTT Messages Not Received

**Symptom**: MQTT integration shows connected but no messages

**Solutions**:

1. **Check Mosquitto**: Ensure it's running
2. **Check credentials**: Verify username/password in all add-ons
3. **Check topics**: Ensure CAN-to-MQTT and Node-RED use matching topics
4. **Check discovery prefix**: Should be `homeassistant` (default)
5. **Check firewall**: Some networks block MQTT ports

## Getting Help

If you've tried these solutions and still have issues:

### 1. Gather Information

Before asking for help, collect:
- Home Assistant version
- Add-on versions
- Relevant logs (CAN-to-MQTT Bridge, Node-RED, Mosquitto)
- Screenshots of errors
- Description of what you expected vs. what happened

### 2. Search the Forum

Someone may have already solved your issue:
- [Forum](https://forum.rvlink.app)
- Search for error messages or symptoms

### 3. Ask for Help

Post in the appropriate forum category:
- Include all gathered information
- Be specific about what you've tried
- Describe your setup (RV model, hardware, etc.)

### 4. Report Bugs

If you've found a bug:
- [GitHub Issues](https://github.com/Backroads4Me)
- Include reproduction steps
- Include logs and version info

## Prevention Tips

### Regular Backups

Home Assistant has built-in backup:
- **Settings** → **System** → **Backups**
- Create backups before major changes
- Download backups to your computer periodically

### Update Gradually

- Don't update everything at once
- Read release notes before updating
- Test in non-critical periods (not while traveling!)

### Document Your Setup

- Keep notes on customizations
- Save copies of your dashboards
- Document any unusual configuration

### Join the Community

- [Forum](https://forum.rvlink.app) - Stay informed and get help
- [GitHub](https://github.com/Backroads4Me) - Follow development
- [Sponsor](https://github.com/sponsors/Backroads4Me) - Support ongoing development
