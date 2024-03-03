import { config } from "dotenv";

// import { migrate } from "drizzle-orm/better-sqlite3/migrator";
// import { drizzle } from "drizzle-orm/better-sqlite3";
// import Database from "better-sqlite3";

import { migrate } from "drizzle-orm/libsql/migrator";
import { createClient } from "@libsql/client";
import { drizzle } from "drizzle-orm/libsql";

config();

// const { DB_URI } = process.env;
// const sqlite = new Database(DB_URI);
// const db = drizzle(sqlite);

const { LIBSQL_URI } = process.env;

const libsqlClient = createClient({
  url: LIBSQL_URI,
  // authToken: "DATABASE_AUTH_TOKEN",
});

const db = drizzle(libsqlClient);

migrate(db, { migrationsFolder: "drizzle"})

// sqlite.close();
