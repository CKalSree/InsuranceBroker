import type { ResultSetHeader, RowDataPacket } from 'mysql2';
import { getPool } from '../config/database.js';

export class BaseRepository {
  protected async execute<T = unknown>(query: string, params: unknown[] = []): Promise<T[]> {
    const pool = await getPool();
    const [rows] = await pool.execute<RowDataPacket[]>(query, params as any[]);
    return rows as T[];
  }

  protected async executeSingle<T = unknown>(query: string, params: unknown[] = []): Promise<T | null> {
    const rows = await this.execute<T>(query, params);
    return rows[0] ?? null;
  }

  protected async executeScalar<T = unknown>(query: string, params: unknown[] = []): Promise<T> {
    const rows = await this.execute<Record<string, unknown>>(query, params);
    const firstRow = rows[0];

    if (!firstRow) {
      return undefined as T;
    }

    const value = Object.values(firstRow)[0];
    return value as T;
  }

  protected async executeNonQuery(query: string, params: unknown[] = []): Promise<ResultSetHeader> {
    const pool = await getPool();
    const [result] = await pool.execute<ResultSetHeader>(query, params as any[]);
    return result;
  }
}
