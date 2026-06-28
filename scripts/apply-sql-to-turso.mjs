import { readFileSync } from "node:fs";
import { createClient } from "@libsql/client";

const sqlFilePath = process.argv[2];

if (!sqlFilePath) {
  throw new Error("Missing SQL file path argument.");
}

const url = process.env.TURSO_DATABASE_URL || process.env.DATABASE_URL;
const authToken = process.env.TURSO_AUTH_TOKEN;

if (!url) {
  throw new Error("Missing TURSO_DATABASE_URL or DATABASE_URL.");
}

const client = createClient({ url, authToken });
const statements = readFileSync(sqlFilePath, "utf8")
  .split(/;\s*\r?\n/g)
  .map((statement) => statement.trim())
  .filter(Boolean);

for (const statement of statements) {
  try {
    await client.execute(statement);
  } catch (error) {
    const message = error instanceof Error ? error.message : String(error);

    if (message.includes("already exists")) {
      continue;
    }

    throw error;
  }
}

console.log(`Applied ${statements.length} statements to ${url}.`);

await client.close();
