# Stop Copy Pasting Linux Commands Without Knowing What They Do

Alright, you’ve installed Linux. You’ve opened the terminal. Maybe you’ve even run a few commands you found online. But let’s be honest — you have no clue what half of them actually do.

Time to change that.

We’re going to go through **all the important Linux commands** that you’ll actually use, and I’ll explain them the way I wish someone had explained them to me when I started out.

No fluff. Just real, beginner-friendly explanations with mini-exercises to help it stick.

----------

## 1. `ls` – List files and directories

This is the most basic command. It shows you what’s inside your current folder.

```
ls
```

**Exercise:** Run it now. You should see folders like `Desktop`, `Downloads`, etc.

Want to see hidden files? Run:

```
ls -a
```

----------

## 2. `cd` – Change directory

Want to go _inside_ a folder? Use `cd` (change directory).

```
cd Desktop
```

Go back home:

```
cd ~
```

Go up one level:

```
cd ..
```

**Rule:** After every `cd`, run `ls` to confirm where you are. Trust me, it helps.

----------

## 3. `pwd` – Print working directory

This command tells you **exactly** where you are in the filesystem.

```
pwd
```

You’ll get something like `/home/yourname/Desktop`.

----------

## 4. `mkdir` – Make a directory (create folder)

Create a new folder:

```
mkdir projects
```

Now go inside it:

```
cd projects
```

----------

## 5. `touch` – Create a new file

Create an empty file:

```
touch myscript.sh
```

**Pro tip:** You can create multiple files at once:

```
touch one.txt two.txt three.txt
```

----------

## 6. `rm` – Delete files

Be careful with this one. There’s no recycle bin.

Delete a file:

```
rm myscript.sh
```

Delete a folder and everything inside:

```
rm -r foldername
```

----------

## 7. `cp` – Copy files

Copy a file:

```
cp source.txt copy.txt
```

Copy a folder:

```
cp -r myFolder backupFolder
```

----------

## 8. `mv` – Move (or rename) files

Move file to another folder:

```
mv notes.txt ~/Documents
```

Rename a file:

```
mv oldname.txt newname.txt
```

----------

## 9. `cat` – Show contents of a file

Print out a file in the terminal:

```
cat myfile.txt
```

----------

## 10. `nano` or `vim` – Edit files

Use `nano` if you’re a beginner:

```
nano myfile.txt
```

To save and exit nano:

-   Press `Ctrl + O` (save)
    
-   Press `Enter`
    
-   Press `Ctrl + X` (exit)
    

If you want to feel like a hacker, try `vim`, but that’s another article 😄

----------

## 11. `chmod` – Change file permissions

Make a script executable:

```
chmod +x myscript.sh
```

----------

## 12. `sudo` – Run as superuser (admin mode)

Sometimes you’ll get permission errors. `sudo` runs the command as the root user.  The apt update part is for Ubuntu users.

```
sudo apt update
```

**But be careful.** You can break your system using this.

----------

## 13. `clear` – Clear your terminal screen

This just wipes your screen clean:

```
clear
```

Feels like a fresh start every time.

----------

## Final Exercise

Open your terminal and try this mini challenge:

```

mkdir practice
cd practice
touch hello.txt
nano hello.txt
```

Write something inside and save it. Then try to `cat` it out.

That’s how you really start learning Linux — one small step at a time.

See you in the next article, where we’ll dive deeper into how Linux actually _thinks_.