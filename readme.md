# Hono.js with Deno tutorial

Just simple server with Supabase integration

1. Create Supabase database, create RMS policies for write access, fill `.env` file.
2. Run migrations file to create table: `deno migrations.js`
3. Run server: `deno run dev`

Table:

```sql
create table public.articles (
  id bigint generated by default as identity not null,
  created_at timestamp with time zone not null default now(),
  title text null,
  content text null,
  constraint articles_pkey primary key (id),
  constraint articles_id_key unique (id)
) TABLESPACE pg_default;
```

Things todo:

* add more error checks
* 'show article' link with article page
