# Shell Scripting Variables: Local, Global, and System Explained

When you're writing shell scripts — or even just working in the terminal — you'll use variables all the time to store information like filenames, counters, usernames, or command outputs.

But not all variables are the same! Understanding the **types of variables** and their **scope** (where they can be accessed) is essential for writing effective scripts.

Let's explore the three main types:

---

## 1. Local Variables: Keeping It Contained

A **local variable** exists only within a specific function. Use the `local` keyword in Bash to declare it. This prevents interference with variables outside the function.

### Example: `local_scope.sh`

```bash
#!/bin/bash

my_var="I am global"

my_function() {
  local my_var="I am local inside the function"
  echo "Inside function: my_var = $my_var"
}

echo "Before function call: my_var = $my_var"
my_function
echo "After function call: my_var = $my_var"
```

Output:

```
Before function call: my_var = I am global
Inside function: my_var = I am local inside the function
After function call: my_var = I am global
```

---

## 2. Global Variables: Script-Level Scope

A **global variable** is declared outside functions, or inside them without using `local`. It's accessible anywhere within the script.

### Example: `global_scope.sh`

```bash
#!/bin/bash

global_message="Hello from the global scope!"

my_function() {
  echo "Inside function: Accessing '$global_message'"
  global_message="Changed by the function!"
}

echo "Before function: $global_message"
my_function
echo "After function: $global_message"
```

Output:

```
Before function: Hello from the global scope!
Inside function: Accessing 'Hello from the global scope!'
After function: Changed by the function!
```

---

## 3. Environment Variables: Truly Global

**Environment variables** are accessible to the script and any child processes. Use `export` to make them available outside the current shell or script.

### Example: `script1.sh`

```bash
#!/bin/bash

regular_var="I live only in script1"
export exported_var="I am exported from script1!"

echo "--- Inside script1 ---"
echo "Regular: $regular_var"
echo "Exported: $exported_var"
echo ""

./script2.sh
```

### Example: `script2.sh`

```bash
#!/bin/bash

echo "--- Inside script2 ---"
echo "Trying to access regular_var: '$regular_var'"
echo "Trying to access exported_var: '$exported_var'"
```

Output:

```
--- Inside script1 ---
Regular: I live only in script1
Exported: I am exported from script1!

--- Inside script2 ---
Trying to access regular_var: ''
Trying to access exported_var: 'I am exported from script1!'
```

---

## 4. Shell/System Variables

These are special variables provided by the shell. They're typically in **ALL CAPS** and often exported automatically.

### Useful System Variables

```bash
echo $SHELL       # Path to current shell
echo $PATH        # Command search path
echo $HOME        # User's home directory
echo $PWD         # Current working directory
echo $USER        # Username
echo $HOSTNAME    # Host machine name
echo $UID         # User ID
echo $RANDOM      # Random number (Bash only)
echo $SECONDS     # Seconds since shell/script started
echo $BASH_VERSION # Bash version
```

To view all environment variables:

```bash
env
# or
printenv
# or
set  # Also shows shell variables and functions
```

---

## Wrapping Up

Understanding variable types and scope is key to writing clean and bug-free scripts.

| Type                | Scope                           | How to Declare                          |
|---------------------|----------------------------------|------------------------------------------|
| Local Variable       | Inside a function only           | `local var_name="value"`                |
| Global Variable      | Entire script                    | `var_name="value"` (outside any function)|
| Environment Variable | Script + child processes         | `export var_name="value"`               |
| Shell/System Variable| Provided by shell, always present| Set by system or shell                  |

Choose the right variable type based on what you need to access — and where!

Keep scripting smart! 