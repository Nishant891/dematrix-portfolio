# Quick JavaScript Revision Before Interview

![image](https://miro.medium.com/v2/resize:fit:1100/format:webp/1*6CD7PR_sKA1NLiXe-t-Fbw.png)

## Core Concepts

### 1. Hoisting
Hoisting means moving declarations to the top of their scope before code execution.  
Applies to `var` and function declarations (not `let` or `const`).
```js
console.log(a); // undefined
var a = 5;
```

---

### 2. Global Object
The global object is the top-level object in JavaScript that provides the environment.  
Use `globalThis` to access it across all environments (Node, Browser).
```js
console.log(globalThis);
```

---

### 3. Expression Evaluation
JavaScript evaluates expressions from left to right.
```js
console.log(10 + 2 + "9"); // "129"
```

---

### 4. Callback Function
A function passed as an argument to another function.
```js
function greet(name) {
  console.log("Hello " + name);
}

function processUser(callback) {
  const name = "Nishant";
  callback(name); // It is called here
}

processUser(greet);
```

---

### 5. IIFE (Immediately Invoked Function Expression)
```js
(function () {
  console.log("This runs immediately");
})();
```

---

## Useful Methods and Syntax

### 6. Reverse a String
```js
const str = "hello";
console.log(str.split("").reverse().join("")); // "olleh"

// OR using spread for Unicode safety
console.log([...str].reverse().join(""));
```

---

### 7. Rest Parameters
```js
function x(...rest) {
  console.log(rest);
}
x(1, 2, 3); // [1, 2, 3]
```

---

### 8. Array Splice
```js
let arr = [1, 2, 3, 4];
arr.splice(0, 2); // Removes first 2 items → [3, 4]
```

---

## Promises

### 9. Basic Promise
```js
const pro = new Promise((resolve, reject) => {
  let succ = true;
  if (succ) {
    resolve("Success");
  } else {
    reject("Error");
  }
});

pro.then(result => console.log(result))
   .catch(err => console.error(err));
```

---

### 10. Promise Chaining
```js
doSomething()
  .then(result => doSomethingElse(result))
  .then(finalResult => console.log(finalResult))
  .catch(error => console.error(error));
```

---

### 11. Async/Await
```js
async function run() {
  try {
    const res = await pro;
    console.log(res);
  } catch (err) {
    console.error(err);
  }
}
run();
```

---

## Bonus Tips

- `==` vs `===`: Prefer `===` (strict equality checks value and type).
- Use `const` and `let` over `var`.
- Use `map`, `filter`, `reduce` for clean functional code.
- Arrow functions don’t bind their own `this`.

---

Good luck with your interview! 💪