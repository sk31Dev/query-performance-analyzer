# Query Performance Analyzer

A Node.js tool to analyze SQL query performance using Knex and PostgreSQL. It runs a list of queries, measures execution time, and reports basic metrics such as row count and errors.

## Features

- Runs multiple SQL queries against a PostgreSQL database
- Measures execution time for each query
- Reports row count and errors (if any)
- Written in TypeScript, using Knex.js

## Requirements

- Node.js (v18+ recommended)
- PostgreSQL database

## Setup

1. **Clone the repository:**

   ```bash
   git clone https://github.com/<your-username>/<repo-name>.git
   cd <repo-name>
   ```

2. **Install dependencies:**

   ```bash
   npm install
   ```

3. **Configure database connection:**
   Edit `src/index.ts` and update the `knexConfig` object with your PostgreSQL credentials.

4. **Add your queries:**
   Edit the `queries` array in `src/index.ts` to include the SQL queries you want to analyze.

5. **Build the project:**

   ```bash
   npx tsc
   ```

6. **Run the analyzer:**
   ```bash
   node dist/index.js
   ```

## Example Output

```
┌─────────┬─────────────────────────────────────────────┬─────────────────┬──────────┬───────┐
│ (index) │ query                                       │ executionTimeMs │ rowCount │ error │
├─────────┼─────────────────────────────────────────────┼─────────────────┼──────────┼───────┤
│ 0       │ 'SELECT NOW();'                             │ 11.5608         │ 0        │ ''    │
│ 1       │ 'SELECT * FROM information_schema.tables ... │ 0.9985          │ 0        │ ''    │
└─────────┴─────────────────────────────────────────────┴─────────────────┴──────────┴───────┘
```

## License

MIT
