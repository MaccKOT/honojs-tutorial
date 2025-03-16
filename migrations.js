import { createClient } from "jsr:@supabase/supabase-js";
import "jsr:@std/dotenv/load";

// Инициализируйте Supabase клиент
const supabase = createClient(
  Deno.env.get("supabaseUrl"),
  Deno.env.get("API_KEY"),
);

async function migrate() {
  // Определите данные для вставки
  const articles = [
    { title: "Article 1", content: "Article text 1" },
    { title: "Article 2", content: "Article text 2" },
    { title: "Article 3", content: "Article text 3" },
    { title: "Article 4", content: "Article text 4" },
    { title: "Article 5", content: "Article text 5" },
    { title: "Article 6", content: "Article text 6" },
    { title: "Article 7", content: "Article text 7" },
    { title: "Article 8", content: "Article text 8" },
    { title: "Article 9", content: "Article text 9" },
    { title: "Article 10", content: "Article text 10" },
  ];

  // Вставьте данные в таблицу articles
  const { error } = await supabase
    .from("articles")
    .insert(articles);

  if (error) {
    console.error("Error while inserting data:", error.message);
  } else {
    console.log("Succes! All data added to database");
  }
}

// Запустите миграцию
migrate();
