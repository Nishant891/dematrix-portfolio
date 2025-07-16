# 🧨 Firecracker MicroVM installation and boot up

This guide walks you through installing Firecracker, setting up the network, and running a virtual machine using a simple bash script.

---

## Step 1: Install Firecracker

1. **Download Firecracker:**

   ```bash
   wget https://github.com/firecracker-microvm/firecracker/releases/download/v1.10.0/firecracker-v1.10.0-x86_64.tgz
   ```

2. **Extract, Rename, and Move:**

   ```bash
   tar -xvzf firecracker-v1.10.0-x86_64.tgz
   mv firecracker-v1.10.0-x86_64/firecracker firecracker
   sudo mv firecracker /usr/bin/
   ```

3. **Verify Installation:**

   ```bash
   firecracker --version
   ```

---

## Step 2: Download Kernel and RootFS

Download a compatible kernel and root filesystem:
[Link from StackOverflow](https://stackoverflow.com/questions/57380799/how-to-login-after-following-the-steps-in-firecracker-custom-rootfs-using-alpi)

Make sure you're in the same directory where `hello-vmlinux.bin` and `hello-rootfs.ext4` are located. It is important when we run the bash script and export them.

---

## Step 3: Start Firecracker API

In one terminal (preferably a tmux session):

```bash
API_SOCKET="/tmp/firecracker.socket"
sudo rm -f $API_SOCKET
sudo firecracker --api-sock "${API_SOCKET}"
```

---

## Step 4: Run the Firecracker VM

Create a bash script (e.g. `start-vm.sh`) with the following contents:
This script exports the kernel and file system. Create a tap interface and assign an IP to it. Boots the kernel and setup the rootfs. It also cleans up and call the firecracker API.

<details>
<summary>Click to expand the full bash script</summary>

```bash
#!/bin/bash

# === Environment Variables ===
export KERNEL_FILE="hello-vmlinux.bin"
export ROOTFS_FILE="hello-rootfs.ext4"
TAP_DEV="tap0"
TAP_IP="172.16.0.1"
MASK_SHORT="/30"
API_SOCKET="/tmp/firecracker.socket"
LOGFILE="./firecracker.log"
FC_MAC="06:00:AC:10:00:02"

# === Kill previous processes and cleanup ===
sudo pkill -f firecracker
sudo rm -f $API_SOCKET
sudo ip link delete $TAP_DEV 2>/dev/null || true

# === Network Setup ===
sudo ip tuntap add dev $TAP_DEV mode tap
sudo ip addr add "${TAP_IP}${MASK_SHORT}" dev $TAP_DEV
sudo ip link set dev $TAP_DEV up
sudo sh -c "echo 1 > /proc/sys/net/ipv4/ip_forward"
sudo iptables -P FORWARD ACCEPT

HOST_IFACE=$(ip -j route list default | jq -r '.[0].dev')
sudo iptables -t nat -D POSTROUTING -o "$HOST_IFACE" -j MASQUERADE || true
sudo iptables -t nat -A POSTROUTING -o "$HOST_IFACE" -j MASQUERADE

# === Logging ===
touch $LOGFILE
sudo curl -X PUT --unix-socket "${API_SOCKET}"   -H "Content-Type: application/json"   -d '{
        "log_path": "'"${LOGFILE}"'",
        "level": "Debug",
        "show_level": true,
        "show_log_origin": true
      }'   http://localhost/logger

# === Kernel Boot ===
if [ ! -f "$KERNEL_FILE" ]; then echo "❌ Kernel not found"; exit 1; fi
KERNEL_BOOT_ARGS="console=ttyS0 reboot=k panic=1 pci=off"
sudo curl -X PUT --unix-socket "${API_SOCKET}"   -H "Content-Type: application/json"   -d '{
        "kernel_image_path": "'"$KERNEL_FILE"'",
        "boot_args": "'"$KERNEL_BOOT_ARGS"'"
      }'   http://localhost/boot-source

# === RootFS Setup ===
if [ ! -f "$ROOTFS_FILE" ]; then echo "❌ Rootfs not found"; exit 1; fi
sudo curl -X PUT --unix-socket "${API_SOCKET}"   -H "Content-Type: application/json"   -d '{
        "drive_id": "rootfs",
        "path_on_host": "'"$ROOTFS_FILE"'",
        "is_root_device": true,
        "is_read_only": false
      }'   http://localhost/drives/rootfs

# === Network Interface in VM ===
sudo curl -X PUT --unix-socket "${API_SOCKET}"   -H "Content-Type: application/json"   -d '{
        "iface_id": "net1",
        "guest_mac": "'"$FC_MAC"'",
        "host_dev_name": "'"$TAP_DEV"'"
      }'   http://localhost/network-interfaces/net1

sleep 0.015

# === Start VM ===
sudo curl -X PUT --unix-socket "${API_SOCKET}"   -H "Content-Type: application/json"   -d '{"action_type": "InstanceStart"}'   http://localhost/actions

sleep 2

# === SSH Config ===
KEY_NAME=./$(ls *.id_rsa | tail -1)
if [ ! -f "$KEY_NAME" ]; then echo "❌ SSH key not found"; exit 1; fi

# === Setup Internet in VM ===
ssh -i $KEY_NAME root@172.16.0.2 "ip route add default via 172.16.0.1 dev eth0"
ssh -i $KEY_NAME root@172.16.0.2 "echo 'nameserver 8.8.8.8' > /etc/resolv.conf"

# === SSH into VM ===
ssh -i $KEY_NAME root@172.16.0.2
```

</details>

---

## Optional: Use `tmux` for Terminal Management

Using `tmux` allows the API to run in a separate session.

1. **Kill Existing Session (if any):**

   ```bash
   tmux kill-session -t firecracker-vm
   ```

2. **Start New Session and Run Firecracker:**

   ```bash
   tmux new-session -d -s firecracker-vm
   sleep 2
   ```

3. **Call API and Run VM Script in `tmux`:**

   Inside `tmux`:
   ```bash
   sudo firecracker --api-sock /tmp/firecracker.socket
   ```

---

## Inside the MicroVM

Once inside the VM terminal:

Use `root` as both **username** and **password**.  
Use `reboot` to exit the microVM.

Set up networking for your VM to be able to communicate with public internet.

```bash
ip addr add 172.16.0.2/24 dev eth0
ip link set eth0 up
ip route add default via 172.16.0.1 dev eth0
```
---

## Cleanup and Restart

To reset the environment:

```bash
sudo pkill -f firecracker
sudo rm -f /tmp/firecracker.socket
sudo ip link delete tap0
```

Then restart your `tmux` session -> Call the API -> Execute the script -> Setup network in the VM.

---

## Done!

You're now running a Firecracker microVM with internet access and full network isolation. 🎉