# Don't just stare at your Linux terminal

Switching to **Linux** as my primary operating system has been one of my best decisions. It not only gives you complete control of your system but also lets you learn a lot about how operating systems work underneath.

Of course, you will break your system, a lot of things may not work if you are going with distributions like **Arch**, and you will be frustrated for a few months — but trust me, it's worth it.

---

## Getting Started

Assuming you have installed your Linux flavor and have been staring at the terminal for a while, I will start with some basics.

When you first start the terminal, it should look similar to this:

```
01:25:01 nishant@localhost ~ →
```

- The 1st part is **time**.
- The 2nd is your **username**.
- The part after `@` is your **hostname**.
- The last is a sign `~` called a **tilde**.

---

## First Command: `ls`

Let's do a small exercise here. Execute the following command:

```
ls
```

**1st rule of fight club**: I want you to run this command after every command in this article.

This command will list all the **directories and files** in your current directory.  
A **directory** is just another name for a **folder**.  
You should see `Desktop`, `Downloads`, `Pictures`, `Music`, or anything else.

---

## Change Directory

I want you to go inside a directory. Execute the following command:

```
cd <folder_name>
```

`cd` stands for **change directory** – it will take you inside the pointed directory.

---

## Create a New Directory

Now create a new directory here. Execute the following command:

```
mkdir <name_your_folder>
```

Go into the created directory:

```
cd <name_your_folder>
```

Create a new file:

```
touch trump.sh
```

---

## Go Back Home

Execute the following command:

```
cd ~
```

**Don't forget rule 1.** You're back to the beginning.

So a **tilde (~)** references the current user – it will always take you back to the user’s **home directory**, no matter where you are.

---

## Root Directory and Users

You may be wondering what I mean by "user's home directory".

Execute:

```
cd /
```

Now you should see a bunch of new directories like:

```
bin  boot  dev  etc  home  lib  lib64  root  ...
```

Go into the **home** directory:

```
cd home
```

When viewing the contents of this directory, you’ll find your **username** there.  
The home directory contains the directory of each user.  
So when you create a new user in Linux and log in as that user, you will be inside one of these directories as per your username.

The `/` is the **root directory** – the starting point of everything. All directories are inside `/`.

Now you may be wondering why we see another **root** directory when doing `ls`.  
This is because the `root` directory inside `/` is the **home directory of the root user**.  
Like `jason` inside `home` is the home directory of the `jason` user. Below is an image for reference.
![Linux Directory Tree](https://www.linuxtrainingacademy.com/wp-content/uploads/2014/03/linux-directory-tree.jpg)


---

## Root User

The **root user** has the power to do basically anything – block a user’s access to a directory or even delete the whole Linux system.

To login as root:

```
su -
```

Enter the password and now you are a **super user**.

---

## Going Back to Normal User

We will continue the exploration in another article.  
We will explore what the directories inside `/` are meant for.

Let’s do another exercise.

Change back to a normal user:

```
su <your_username>
```

Now go to the directory where the `trump.sh` file was created.  
By now, you should be able to do that.

---

## Executing Shell Scripts

`.sh` files are **shell scripts** that can be coded to execute a certain program.

To run a script:

```
./trump.sh
```

This will throw an error: **permission denied**.  
You need to make this script **executable**.

Modify permission using:

```
chmod 755 trump.sh
```

The script should change color to green.  
The `chmod` command is used to **change permissions** of a file (we’ll explain in detail soon).

Now it’s executable, run the script again:

```
./trump.sh
```

It will not output anything yet.  
We need to write bash code inside. To do that, open it in **vim**:

```
vim trump.sh
```

This opens the editor.  
Press `i` to start writing (insert mode).  
Now write:

```
#!/bin/bash

echo "Hello World"
```

To exit vim:

- Press `Esc`
- Then type `:wq`
- Press `Enter`

You’ll see `:wq` in the bottom left.

Now execute the script again:

```
./trump.sh
```

You should see:

```
Hello World
```

---

## Conclusion

Congrats! You’ve learned about:

- Basic Linux commands
- Navigating directories
- Shell scripts and permissions

This is just the beginning but very essential.  
We’ll meet in the next article.
