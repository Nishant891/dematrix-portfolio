
# Setup your Node.js project with TypeScript

## Why TypeScript?
- TypeScript is JavaScript with static typing, allowing you to define the type of variables at compile-time.
- This helps you to catch errors during development and reduce run-time bugs.
- Other developers can understand the expected type of variables and function parameters, making it easier to collaborate.
- Excellent support for modern IDEs like VS Code gives you features like autocompletion and real-time error checking.
- Frameworks like **Next.js**, **Vite** come with a built-in TypeScript compiler, although you need to configure it in a Node project.

## How to?
First, start with initializing a Node project:
```bash
npm init -y
```
This will create a `package.json` file. Now install TypeScript as a dev dependency with the command:
```bash
npm install -D typescript
```

In your `package.json` file add:
```json
{
  "name": "server",
  "version": "1.0.0",
  "description": "",
  "main": "index.ts",
  "scripts": {
    "build": "tsc" // This script converts the TypeScript code to JavaScript.
  },
  "keywords": [],
  "author": "",
  "license": "ISC",
  "devDependencies": {
    "typescript": "^5.3.3"
  }
}
```

Now install the types for Node since it won’t be able to find its type declaration. Run:
```bash
npm install ts-node
```

Now create a `src` folder and create an `index.ts` file inside it.

Once done, create a `tsconfig.json` file outside. In the file, add:
```json
{
  "compilerOptions": {
    "module": "NodeNext",
    "moduleResolution": "NodeNext",
    "target": "ES2020",
    "baseUrl": "src",
    "rootDir": "src",
    "outDir": "dist",
    "sourceMap": true,
    "noImplicitAny": true
  },
  "include": ["src/**/*"]
}
```

Now run:
```bash
npm run build
```
This will create a `dist` folder where you can see the converted JavaScript code.

> **NOTE:**  
> Whenever you install dependencies like `express`, `cors`, etc., do install their types as well:

```bash
npm install express
```

```bash
npm install -D @types/express
```