export interface Song {
  id: number;
  title: string;
  artist: string;
}

export interface DB {
  prepare(query: string): {
    all(...params: any[]): Promise<{ results: any[] }>;
    get(...params: any[]): Promise<any>;
    run(...params: any[]): Promise<{ lastRowId: number; changes: number }>;
  };
}

export type D1Database = DB;