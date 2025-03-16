import { Hono } from "jsr:@hono/hono";

const app = new Hono();

// Маршрут для главной страницы
app.get('/', (c) => {
    return c.html(`
      <!DOCTYPE html>
      <html lang="en">
      <head>
        <meta charset="UTF-8">
        <meta name="viewport" content="width=device-width, initial-scale=1.0">
        <title>Articles</title>
        <script src="https://unpkg.com/htmx.org@2.0.4"></script>
      </head>
      <body>
        <h1>Articles</h1>
        <button hx-get="/articles" hx-target="#articles-list" hx-swap="innerHTML">Загрузить все статьи</button>
        <div id="articles-list"></div>
      </body>
      </html>
    `);
  });

  // Маршрут для получения списка всех статей
  app.get('/articles', async (c) => {
    // Здесь вы можете подключиться к вашей базе данных и получить статьи
    const articles = [
      { title: 'Статья 1' },
      { title: 'Статья 2' },
      { title: 'Статья 3' },
    ];

    const articlesHtml = await articles.map(article => `<li>${article.title}</li>`).join('');
    return c.html(`<ul>${articlesHtml}</ul>`);
  });

Deno.serve(app.fetch);
