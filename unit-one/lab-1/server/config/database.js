import pg from "pg";

const config = {
  connectionString: process.env.CONNECTION_URL,
};

export const pool = new pg.Pool(config);
