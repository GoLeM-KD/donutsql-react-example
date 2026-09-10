import { DonutSQL } from "donutsql";

const config = {
  username: import.meta.env.VITE_DONUTSQL_USERNAME,
  database: import.meta.env.VITE_DONUTSQL_DATABASE,
  databaseKey: import.meta.env.VITE_DONUTSQL_DATABASE_KEY,
};

export async function connectDatabase() {
  try {
    const db = new DonutSQL(config);

    await db.connect();

    return db;
  } catch (err) {
    console.log("CONNECTION POOL ERROR...", err);
    return null;
  }
}
