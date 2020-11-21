import * as dotenv from 'dotenv';
import { Pool } from 'pg';

export default new Pool ({
    user: process.env.PGUSER,
    host: process.env.PGHOST,
    database: process.env.PGDATABASE,
    password: process.env.PGPASSWORD,
    port: parseInt(process.env.PGPORT),
    max: 20,
    idleTimeoutMillis: 30000
});