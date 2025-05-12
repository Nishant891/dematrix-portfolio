# Linux Directories Explained

Let's go to the root directory.

`cd /`

Now list all the file and directories inside root using 

    ls
    

You will get to see a bunch of directories here

    bin  boot  cpp  dev  etc  home  lib  lib64  lost+found  mnt  opt  proc  root  run  sbin  srv  sys  tmp  usr  var


Let's go through each one of these and learn what they do in detail. If says permission denied at any point try running the command with elevated privileges using `sudo <command>`.

## bin
The first one is **bin** or bianries these contains the binaries or executable or the compiled code for every command you run in linux environment. Commands such as **mkdir**, **cd**, **ls** or **chmod** etc.

## boot
The next directory is **boot** and as the name suggests this directory contains the boot file for your linux. 

![enter image description here](https://files.codingninjas.in/article_images/linux-directories-4-1666993157.webp)

The files here are vmlinux which is a compressed image of your linux kernel, then we have the initramfs image this is also an important file but just know that it is important during the boot process. We also have the grub directory here grub is the bootloader that loads the kernel image during the boot process. The windows counterpart for this is Windows Boot Manager. 

## dev

The **dev** directory has the devices listed. You can see nvme over here which stands for your SSD's. There are many nvme's you could see these corresponds to your partitions. Imagine partitions as different tracks in a race track. The SSD's are divided into partitions to make it easy for lookups and mount your directories. There is also cpu directory that has your cores listed. Explore it as much as you want.

![enter image description here](https://i.pinimg.com/736x/3a/2f/4b/3a2f4ba3855322cfecebb6ad1fe7fc61.jpg)

Now comes the etc there could be a dedicated article on this one. 

The `cat` command is used to view the contents of a file. I want you to use these commands to see the content of the following files.

***hostname*** - This file contains your host name. 

***host*** - Whenever you type a domain name in your google browser it has to be translated to an ip address this is typically done by a DNS server but, before reaching out to DNS your computer looks into this file for translation.

![enter image description here](https://www.computernetworkingnotes.com/wp-content/uploads/linux-tutorials/images/lt57-02-etc-hosts-file.png)


***gshadow*** - This contains the groups you create. Used in organizations to assign permissions to users. You can see your username as well here like Json, or Amanda that is because each user is a member of his/her own group.

***shadow*** -  This contains the information on all the users in your system. 

***resolv.conf*** - This file has the IP of your DNS server. The DNS server as said translates any domain name to it's corresponding IP address. The IP addresses are the one that is used to identify machines on the internet uniquely.

![enter image description here](https://www.ricmedia.com/images/216.webp)


***sudoers*** - This is another important file as it contains permissions for the users, you can tweek permissions here. Research and learn more about this file.

***fstab*** -  This file contains the information about the partitions and where they need to be mounted. This file is very important as it is read during the boot up to correctly mount your partitions. Now mounting is the process which is required inorder to read the data in the disk. Any changes made to this file can mess up your boot process and render the OS useless. 

## home

Now comes the **home** directory this directory contains the home directories of all the users in your system. Try creating a new user `sudo useradd -m username` and check the directory again you could see a new directory appear for your new user.

The **root** directory is the home directory of your root users. When you run a command with sudo which is "super user do" you are basically running the command as root. So as any other user like Json or Amanda root is also a user and thus should have a directory like any other directory inside home. This is that directory. 

## usr

Lastly, **usr** directory contains the user binaries. This has it's own bin folder which are again executable. 

I would recommend you to explore them as much as you can. These will really help you out for understanding how the linux system works. 
