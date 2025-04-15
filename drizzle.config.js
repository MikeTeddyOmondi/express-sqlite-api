import { config } from "dotenv";

config();
const { LIBSQL_URI, DATABASE_AUTH_TOKEN } = process.env;

export default {
  schema: "./src/schema.js",
  out: "./drizzle",
  dialect: "turso",
  dbCredentials: {
    url: LIBSQL_URI,
    authToken: DATABASE_AUTH_TOKEN,
  }
};
