# Setting Up an Express Server with TypeScript

![image](https://miro.medium.com/v2/resize:fit:1100/format:webp/1*Kr4nmDsnz64DHdw6X-8miw.webp)

You can initialize the project with TypeScript following my previous article.

This article talks about creating an Express server.

## Step 1: Install Express and Its Types

Once you have installed Express and its type, start with importing it, creating an Express instance, and defining the port in `index.ts`.

```typescript
import express from 'express';

const app = express();
const PORT = 5000;
```

Now we have defined an Express instance in `app`. We can call the functions inside it.

## Step 2: Make the Application Listen

Make your application listen for requests on `localhost:PORT`.

```typescript
app.listen(PORT, (error: any) => {
	if (!error) {
		console.log(`Alpha is online at ${PORT}`);
	} else {
		console.log(`Got an error: ${error}`);
	}
});
```

Also catch and log errors if any.

## Step 3: Define Routes

It’s better to create routes in separate files and import them into your main application.

Create a folder named `routes` and a file `routes.ts`:

```typescript
import { Router } from 'express';

const router = Router();
router.get('/', (req, res) => {
  res.send('<h1>Welcome to the Main Page</h1>');
});
router.get('/about', (req, res) => {
  res.send('<h1>About Page</h1>');
});
export default router;
```

Here we are importing a named export `Router` from Express, then creating an instance of it inside `router`.

Now we can define router functions for GET, POST, PUT, and DELETE.
Each route triggers a specific function, which tells what to do when the API endpoint is called.

## Step 4: Use Routes in Main File

But wait — we need to import this in our main file.

```typescript
import express from 'express';
import router from './routes/routes';

const app = express();
const PORT = 5000;
app.use('/', router);
app.listen(PORT, (error: any) => {
 if (!error) {
  console.log(`Alpha is online at ${PORT}`);
 } else {
  console.log(`Got an error: ${error}`);
 }
});
```

Now we imported the router instance and prompted the app to use it for routing.

Your Express server with TypeScript is now ready and structured properly!