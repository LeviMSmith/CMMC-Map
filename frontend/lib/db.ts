import Database from "better-sqlite3";
import { getEnvVar } from "@/lib/utils";
import fs from "fs";
import path from "path";

let db;
let migrationLock = false;

function handleMigrations(db) {
  if (migrationLock) {
    console.log("Migrations already running. Skipping.");
    return;
  }

  migrationLock = true;
  const env = getEnvVar("NODE_ENV");

  var migrationsDir;
  if (env == "development") {
    migrationsDir = "./src/lib/migrations";
  } else {
    migrationsDir = "/app/migrations";
  }
  const migrationIdPattern = /([0-9a-fA-F]{3})[\S]*\.sql/;

  // Ensure the migration table exists
  // console.log("Migration table existance script");
  db.prepare(
    "CREATE TABLE IF NOT EXISTS migration (id integer NOT NULL PRIMARY KEY, date datetime NOT NULL)",
  ).run();

  // Get all completed migrations
  const rows = db.prepare("SELECT id FROM migration").all();
  const completedMigrations = rows.map((row) => row.id);

  const insertStmt = db.prepare(
    "INSERT INTO migration (id, date) VALUES (?, datetime('now'))",
  );
  // Read migration files from the directory
  const migrationFiles = fs.readdirSync(migrationsDir);
  for (const migrationFile of migrationFiles) {
    // console.log(`Migration file ${migrationFile}`);
    const migMatch = migrationFile.match(migrationIdPattern);
    if (!migMatch) {
      console.warn(
        `Invalid migration script (doesn't match the expected pattern): ${migrationFile}`,
      );
      continue;
    }

    const migId = parseInt(migMatch[1], 16);
    if (completedMigrations.includes(migId)) {
      console.log(`Skipping migration ${migrationFile} already completed.`);
      continue;
    }

    const fullPath = path.join(migrationsDir, migrationFile);
    const sql = fs.readFileSync(fullPath, "utf-8");

    // Run migration inside a transaction
    try {
      const transaction = db.transaction(() => {
        db.exec(sql);
        insertStmt.run(migId);

        console.log(`Completed migration ${migrationFile} successfully.`);
      });

      transaction();
    } catch (error) {
      console.error(`Error running migration ${migrationFile}:`, error);
      // throw error; // Stop further migrations if one fails
    }
  }

  migrationLock = false;
}

export function getDB() {
  if (db) {
    return db;
  }

  const dataPath = getEnvVar("CM_DATA");

  if (!fs.existsSync(dataPath)) {
    fs.mkdirSync(dataPath, { recursive: true });
  }

  db = new Database(path.join(dataPath, "db.sqlite"));
  handleMigrations(db);
  return db;
}
