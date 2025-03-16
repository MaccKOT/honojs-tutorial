import { Hono } from "jsr:@hono/hono";

const app = new Hono();

app.get('/', (c) => c.text('Hello, Hono!'));

app.get('/about', (c) => c.json({ message: 'This is an about page' }));

app.post('/data', async (c) => {
  const data = await c.req.json();
  return c.json({ received: true, data });
});

Deno.serve(app.fetch);
