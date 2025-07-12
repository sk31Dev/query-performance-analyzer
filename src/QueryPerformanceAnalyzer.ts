import knex, { Knex } from "knex";

export interface QueryResult {
  query: string;
  executionTimeMs: number;
  rowCount: number;
  error: string | null;
  plan?: string;
}

export class QueryPerformanceAnalyzer {
  private db: Knex;

  constructor(knexConfig: Knex.Config) {
    this.db = knex(knexConfig);
  }

  async analyzeQueries(queries: string[]): Promise<QueryResult[]> {
    const results: QueryResult[] = [];
    for (const query of queries) {
      const start = process.hrtime.bigint();
      let rowCount = 0;
      let error: string | null = null;
      let plan: string | undefined = undefined;
      try {
        // Get query plan
        const planResult = await this.db.raw(`EXPLAIN ${query}`);
        if (Array.isArray(planResult.rows)) {
          plan = planResult.rows
            .map((row: any) => row["QUERY PLAN"] || Object.values(row)[0])
            .join("\n");
        } else if (Array.isArray(planResult)) {
          plan = planResult
            .map((row: any) => row["QUERY PLAN"] || Object.values(row)[0])
            .join("\n");
        }
        // Run the actual query
        const result = await this.db.raw(query);
        if (Array.isArray(result.rows)) {
          rowCount = result.rows.length;
        } else if (Array.isArray(result)) {
          rowCount = result.length;
        }
      } catch (err: any) {
        error = err.message;
      }
      const end = process.hrtime.bigint();
      results.push({
        query,
        executionTimeMs: Number(end - start) / 1e6,
        rowCount,
        error,
        plan,
      });
    }
    return results;
  }

  async close(): Promise<void> {
    await this.db.destroy();
  }
}
