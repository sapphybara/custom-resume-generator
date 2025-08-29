// import { usersSync } from "drizzle-orm/neon";
import { config } from "dotenv";
import { drizzle } from "drizzle-orm/node-postgres";
import { seed } from "drizzle-seed";

config({ path: ".env.local" });

import {
  educations,
  experiences,
  resumes,
  skills,
} from "@/app/db/resume.schema";

async function main() {
  const db = drizzle(process.env.DATABASE_URL!);
  await seed(db, { resumes, experiences, educations, skills }).refine(
    (funcs) => ({
      resumes: {
        columns: {
          userId: funcs.valuesFromArray({
            values: [
              "540765ce-115d-457d-a620-a1ae0544c397",
              "9e26349a-4758-4fa2-bc2d-60a2552fe459",
            ],
          }),
        },
      },
    })
  );
}

main();
