import { Hono } from "jsr:@hono/hono";
import { createClient } from "jsr:@supabase/supabase-js";
import "jsr:@std/dotenv/load";

// Инициализируйте Supabase клиент
const supabase = createClient(
  Deno.env.get("supabaseUrl"),
  Deno.env.get("API_KEY"),
);

const app = new Hono();

// Main page
app.get("/", (c) => {
  return c.html(`
      <!DOCTYPE html>
      <html lang="en">
      <head>
        <meta charset="UTF-8">
        <meta name="viewport" content="width=device-width, initial-scale=1.0">
        <title>Hono.js with Supabase</title>
        <link rel="stylesheet" href="https://cdn.jsdelivr.net/npm/holiday.css@0.11.2" />
        <script src="https://unpkg.com/htmx.org@2.0.4"></script>
      </head>
      <body style="margin: 20px">
        <h1>Articles</h1>
        <button hx-get="/articles" hx-target="#articles-list" hx-swap="innerHTML">Load all articles</button>
        <div id="articles-list"></div>
      </body>
      </html>
    `);
});

// Get all articles from Supabase
app.get("/articles", async (c) => {
  const { data: articles, error } = await supabase
    .from("articles")
    .select("*");

  if (error) {
    return c.json({ error: error.message }, 500);
  }

  const articlesHtml = articles.map((article) => `<li>${article.title}</li>`)
    .join("");
  return c.html(`<ul>${articlesHtml}</ul>`);
});

// Server run
Deno.serve(app.fetch);
