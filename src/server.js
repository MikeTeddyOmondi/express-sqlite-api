<<<<<<< HEAD
import cors from "cors";
import express from "express";
import { config } from "dotenv";
import { eq } from "drizzle-orm";
import { v4 as uuid } from "uuid";
import Database from "better-sqlite3";
import { drizzle } from "drizzle-orm/better-sqlite3";

import { tasks } from "./schema.js";

config();

const { DB_URI } = process.env;
const sqlite = new Database(DB_URI);
const db = drizzle(sqlite);

const app = express();

app.use(express.json());
app.use(
  cors({
    origin: "*",
    credentials: true,
  })
);

// Root route
app.get("/", (req, res) => {
  res.json({ success: true, message: "Application works!" });
});

app.get("/tasks", async (req, res) => {
  const result = await db.select().from(tasks);
  res.json({ success: true, message: "Task(s) read!", data: result });
});

app.post("/tasks", async (req, res) => {
  const public_id = uuid();
  const { title, description } = req.body;
  if (title === "" || description === "") {
    return res.status(400).json({
      success: false,
      message: "Please provide a title & a description!",
    });
  }
  const result = db
    .insert(tasks)
    .values({ public_id, title, description })
    .returning()
    .all();
  res
    .status(201)
    .json({ success: true, message: "Task(s) created!", data: result[0] });
});

app.get("/tasks/:pid", async (req, res) => {
  const { pid } = req.params;
  const result = await db.select().from(tasks).where(eq(tasks.public_id, pid));
  if (result.length === 0) {
    return res.status(404).json({
      success: false,
      message: "Task(s) not found!",
    });
  }
  res.json({ success: true, message: "Task(s) read!", data: result });
});

app.put("/tasks/:pid", async (req, res) => {
  const { pid } = req.params;
  const { title, description } = req.body;
  if (title === "" || description === "") {
    return res.status(400).json({
      success: false,
      message: "Please provide a title & a description to update!",
    });
  }
  const fetchResult = await db
    .select()
    .from(tasks)
    .where(eq(tasks.public_id, pid));
  const result = await db
    .update(tasks)
    .set({ title, description })
    .where(eq(tasks.public_id, pid))
    .returning();
  res.json({
    success: true,
    message: "Task(s) updated!",
    data: result[0],
  });
});

app.put("/tasks/complete/:pid", async (req, res) => {
  const { pid } = req.params;
  const fetchResult = await db
    .select()
    .from(tasks)
    .where(eq(tasks.public_id, pid));
  const result = await db
    .update(tasks)
    .set({ completed: fetchResult[0].completed ? false : true })
    .where(eq(tasks.public_id, pid))
    .returning();
  res.json({
    success: true,
    message: "Task(s) completed!",
    data: result[0],
  });
});

app.delete("/tasks/:pid", async (req, res) => {
  const { pid } = req.params;
  const result = await db
    .delete(tasks)
    .where(eq(tasks.public_id, pid))
    .returning();
  if (result.length === 0) {
    return res.status(404).json({
      success: false,
      message: "Task(s) not found!",
    });
  }
  res.json({ success: true, message: "Task(s) deleted!", data: result });
});

// 404 route
app.get("*", (req, res) => {
  res.json({ success: false, message: "Resource Not Found!" });
});

// Error Middleware
app.use((err, req, res, next) => {
  const errorStatus = err.status || 500;
  const errorMessage = err.message || "Something went wrong!";
  return res.status(errorStatus).json({
    success: false,
    data: {
      message: errorMessage,
    },
    stack: process.env.NODE_ENV === "production" ? {} : err.stack,
  });
});

const PORT = process.env.PORT || 3489;

app.listen(PORT, () => {
  console.log(`Server is running in http://localhost:${PORT}`);
});
=======
import cors from "cors";
import express from "express";
import { config } from "dotenv";
import { eq } from "drizzle-orm";
import { v4 as uuid } from "uuid";
import Database from "better-sqlite3";
import { drizzle } from "drizzle-orm/better-sqlite3";

import { tasks } from "./schema.js";
import { logger } from "./utils.js";

config();

const { DB_URI } = process.env;
const sqlite = new Database(DB_URI);
const db = drizzle(sqlite);

const app = express();

app.use(express.json());
app.use(
  cors({
    origin: "*",
    credentials: true,
  })
);

// Root route
app.get("/", (req, res) => {
  logger.info({ success: true, message: "Application works!" });
  res.json({ success: true, message: "Application works!" });
});

app.get("/tasks", async (req, res) => {
  const result = await db.select().from(tasks);
  res.json({ success: true, message: "Task(s) read!", data: result });
});

app.post("/tasks", async (req, res) => {
  const public_id = uuid();
  const { title, description } = req.body;
  if (title === "" || description === "") {
    return res.status(400).json({
      success: false,
      message: "Please provide a title & a description!",
    });
  }
  const result = db
    .insert(tasks)
    .values({ public_id, title, description })
    .returning()
    .all();
  res
    .status(201)
    .json({ success: true, message: "Task(s) created!", data: result[0] });
});

app.get("/tasks/:pid", async (req, res) => {
  const { pid } = req.params;
  const result = await db.select().from(tasks).where(eq(tasks.public_id, pid));
  if (result.length === 0) {
    return res.status(404).json({
      success: false,
      message: "Task(s) not found!",
    });
  }
  res.json({ success: true, message: "Task(s) read!", data: result });
});

app.put("/tasks/:pid", async (req, res) => {
  const { pid } = req.params;
  const { title, description } = req.body;
  if (title === "" || description === "") {
    return res.status(400).json({
      success: false,
      message: "Please provide a title & a description to update!",
    });
  }
  const fetchResult = await db
    .select()
    .from(tasks)
    .where(eq(tasks.public_id, pid));
  const result = await db
    .update(tasks)
    .set({ title, description })
    .where(eq(tasks.public_id, pid))
    .returning();
  res.json({
    success: true,
    message: "Task(s) updated!",
    data: result[0],
  });
});

app.put("/tasks/complete/:pid", async (req, res) => {
  const { pid } = req.params;
  const fetchResult = await db
    .select()
    .from(tasks)
    .where(eq(tasks.public_id, pid));
  const result = await db
    .update(tasks)
    .set({ completed: fetchResult[0].completed ? false : true })
    .where(eq(tasks.public_id, pid))
    .returning();
  res.json({
    success: true,
    message: "Task(s) completed!",
    data: result[0],
  });
});

app.delete("/tasks/:pid", async (req, res) => {
  const { pid } = req.params;
  const result = await db
    .delete(tasks)
    .where(eq(tasks.public_id, pid))
    .returning();
  if (result.length === 0) {
    return res.status(404).json({
      success: false,
      message: "Task(s) not found!",
    });
  }
  res.json({ success: true, message: "Task(s) deleted!", data: result });
});

// 404 route
app.get("*", (req, res) => {
  res.json({ success: false, message: "Resource Not Found!" });
});

// Error Middleware
app.use((err, req, res, next) => {
  const errorStatus = err.status || 500;
  const errorMessage = err.message || "Something went wrong!";
  return res.status(errorStatus).json({
    success: false,
    data: {
      message: errorMessage,
    },
    stack: process.env.NODE_ENV === "production" ? {} : err.stack,
  });
});

const PORT = process.env.PORT || 3489;

app.listen(PORT, () => {
  console.log(`Server is running in http://localhost:${PORT}`);
});
>>>>>>> 3d115e4 (Updates commit)
