// import pg from "pg";

// const config = {
//   user: process.env.PGUSER,
//   password: process.env.PGPASSWORD,
//   host: process.env.PGHOST,
//   port: process.env.PGPORT,
//   database: process.env.PGDATABASE,
// };

// export const pool = new pg.Pool(config);

import pg from "pg";
import dotenv from "dotenv";

dotenv.config();

console.log("url", process.env.CONNECTION_URL);

const config = {
  connectionString:
    "postgresql://postgres:BEQmTGzqJXDYqYstZvwsIFdUKsiogXBt@junction.proxy.rlwy.net:56773/railway",
  ssl: {
    rejectUnauthorized: false,
  },
};

export const pool = new pg.Pool(config);
