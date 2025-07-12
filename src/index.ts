import path from "path";
import { fileURLToPath } from "url";

// Fix for ESM import of compiled JS
const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);
import { QueryPerformanceAnalyzer } from "./QueryPerformanceAnalyzer.js";
import { Knex } from "knex";

// Example Knex config (replace with your own DB credentials)
const knexConfig: Knex.Config = {
  client: "pg",
  connection: {
    host: "localhost",
    user: "postgres",
    password: "postgres",
    database: "postgres",
    port: 5432,
  },
};

const queries: string[] = [
  "SELECT NOW();",
  "SELECT * FROM information_schema.tables LIMIT 5;",
  // Add more queries here
];

async function main() {
  const analyzer = new QueryPerformanceAnalyzer(knexConfig);
  const results = await analyzer.analyzeQueries(queries);
  console.table(results);
  await analyzer.close();
}

main();
