import { createPool } from "mysql2/promise";
import * as url from 'url';
const __dirname = url.fileURLToPath(new URL('.', import.meta.url));

import * as dotenv from 'dotenv'
dotenv.config({path: `${__dirname}/.env`})

const DB_PASSWORD = process.env.DB_PASSWORD
const DB_PORT = process.env.DB_PORT

export const pool = createPool({
  host: "localhost",
  user: "root",
  password: DB_PASSWORD,
  port: DB_PORT,
  database: "mmarkets_app",
});