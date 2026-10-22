import dotenv from 'dotenv';

dotenv.config();

export const env = {
  port: Number(process.env.PORT ?? 4000),
  db: {
    host: process.env.DB_HOST ?? process.env.DB_SERVER ?? 'localhost',
    server: process.env.DB_SERVER ?? process.env.DB_HOST ?? 'localhost',
    port: Number(process.env.DB_PORT ?? 3306),
    database: process.env.DB_NAME ?? 'InsuranceBrokerDB',
    user: process.env.DB_USER ?? 'root',
    password: process.env.DB_PASSWORD ?? '',
    connectionLimit: Number(process.env.DB_CONNECTION_LIMIT ?? 10),
  },
};
