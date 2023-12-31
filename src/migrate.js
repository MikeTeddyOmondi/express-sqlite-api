<<<<<<< HEAD
import { migrate } from "drizzle-orm/better-sqlite3/migrator";
import { drizzle } from "drizzle-orm/better-sqlite3";
import Database from "better-sqlite3";
import { config } from "dotenv";

config();
const { DB_URI } = process.env;

const sqlite = new Database(DB_URI);
const db = drizzle(sqlite);

migrate(db, { migrationsFolder: "drizzle"})

sqlite.close();
=======
import { migrate } from "drizzle-orm/better-sqlite3/migrator";
import { drizzle } from "drizzle-orm/better-sqlite3";
import Database from "better-sqlite3";
import { config } from "dotenv";

config();
const { DB_URI } = process.env;

const sqlite = new Database(DB_URI);
const db = drizzle(sqlite);

migrate(db, { migrationsFolder: "drizzle"})

sqlite.close();
>>>>>>> 3d115e4 (Updates commit)
