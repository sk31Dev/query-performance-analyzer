import knex, { Knex } from "knex";

export interface QueryResult {
  query: string;
  executionTimeMs: number;
  rowCount: number;
  error: string | null;
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
      try {
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
      });
    }
    return results;
  }

  async close(): Promise<void> {
    await this.db.destroy();
  }
}
