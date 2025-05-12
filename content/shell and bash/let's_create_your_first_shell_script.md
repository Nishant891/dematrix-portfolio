# Let's Create Your First Linux Shell Script!

Running commands in the Linux terminal is great — but typing the same ones over and over? Not so much.  
That's where **Shell Scripts** shine! A shell script is a plain text file containing a sequence of commands.  
You write it once, and run it anytime — it's all about automation.

---

## Step 1: Create the Script File

Open your terminal and navigate to the folder where you want the script. Create a new `.sh` file:

```bash
touch my_first_script.sh
```

Check it's there:

```bash
ls
```

---

## Step 2: Make the Script Executable

Add execute permissions using `chmod`:

```bash
chmod +x my_first_script.sh
```

Run this to verify:

```bash
ls -l my_first_script.sh
```

---

## Step 3: Write Some Commands Inside

Open the file using a text editor like `nano`:

```bash
nano my_first_script.sh
```

Paste the following code:

```bash
#!/bin/bash

# This is my very first shell script!
echo "Hello from my script!"
echo "Creating a test file..."
touch testfile_from_script.txt
echo "Listing files in this directory:"
ls
echo "Script finished. Bye!"
```

Save and exit:

- `Ctrl + O` → `Enter`  
- `Ctrl + X`

---

## Step 4: Run Your Script!

Run the script using:

```bash
./my_first_script.sh
```

You should see the outputs and a new file created.

---

## Variables in Shell Scripts

### System Variables

Predefined by the system (usually uppercase):

- `$USER` → Your username  
- `$PWD` → Current directory  
- `$HOME` → Home directory  

### User-Defined Variables

You create these yourself:

```bash
#!/bin/bash

echo "Running as: $USER"
my_greeting="Hello there"
user_name="Geek"
echo "$my_greeting, $user_name!"
```

---

## Comparing Things

### Integer Comparisons

- `-eq` → equal  
- `-ne` → not equal  
- `-gt` → greater than  
- `-lt` → less than  
- `-ge` / `-le` → greater/less or equal

### String Comparisons

- `==` or `=` → equal  
- `!=` → not equal  
- `<`, `>` → alphabetical (escaped in [ ])

---

## Making Decisions: if Statements

### Basic if:

```bash
#!/bin/bash
count=10
if [ "$count" -eq 10 ]; then
  echo "Count is ten."
fi
```

### if-else:

```bash
#!/bin/bash
name="Alice"
if [ "$name" == "Bob" ]; then
  echo "Hello Bob!"
else
  echo "You are not Bob. Hello $name!"
fi
```

---

## Loops in Shell

### while Loop:

```bash
#!/bin/bash
counter=1
while [ "$counter" -le 5 ]; do
  echo "Counter is: $counter"
  counter=$((counter + 1))
done
```

### for Loop:

```bash
#!/bin/bash
echo "Processing files:"
for filename in report.txt data.csv image.jpg; do
  echo "-> Found $filename"
done

echo "Counting numbers:"
for i in {1..5}; do
  echo "Number $i"
done
```

---

## Positional Arguments

Run a script with arguments:

```bash
./arguments_script.sh hello world 123
```

Inside the script:

```bash
#!/bin/bash
echo "Script name: $0"
echo "Number of arguments: $#"
echo "First argument: $1"
echo "Second argument: $2"
echo "All arguments: $@"
```

---

## Storing Command Output

Use `$(...)` for command substitution:

```bash
#!/bin/bash

current_dir=$(pwd)
echo "You are currently in: $current_dir"

file_list=$(ls)
echo "Files found: $file_list"
```

---

## Exit Codes

Every command returns an exit code:

- `0` = success  
- Non-zero = error  

Check with `$?`:

```bash
ls /nonexistent
echo "Exit code: $?"
```

Set exit codes in your script:

```bash
#!/bin/bash
if [ ! -f "required_file.txt" ]; then
  echo "Error: required_file.txt not found!"
  exit 1
fi

echo "Everything's good."
exit 0
```

---

## Wrapping Up

You've learned how to:

- Create `.sh` files with `touch`
- Make them executable with `chmod +x`
- Use the `#!/bin/bash` shebang
- Write and run commands
- Use system and user variables
- Perform comparisons and conditionals
- Write loops (`for`, `while`)
- Handle arguments and command output
- Check and set exit codes

This is a solid foundation. Keep practicing and automating tasks — you'll be a scripting pro in no time!