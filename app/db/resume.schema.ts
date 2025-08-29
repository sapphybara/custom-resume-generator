import { sql } from "drizzle-orm";
import {
  authenticatedRole,
  authUid,
  crudPolicy,
  usersSync,
} from "drizzle-orm/neon";
import { date, integer, pgTable, text } from "drizzle-orm/pg-core";

export const resumes = pgTable(
  "resumes",
  {
    id: integer("id").generatedAlwaysAsIdentity().primaryKey(),
    userId: text("user_id")
      .references(() => usersSync.id, { onDelete: "cascade" })
      .notNull(),
    location: text("location"),
    website: text("website"),
    linkedIn: text("linked_in"),
    pronouns: text("pronouns"),
    summary: text("summary"),
    createdAt: date("created_at").default(sql`NOW()`),
    updatedAt: date("updated_at").default(sql`NOW()`),
  },
  (table) => [
    crudPolicy({
      role: authenticatedRole,
      read: authUid(table.userId),
      modify: authUid(table.userId),
    }),
  ]
);

export const experiences = pgTable(
  "experiences",
  {
    id: integer("id").generatedAlwaysAsIdentity().primaryKey(),
    resumeId: integer("resume_id")
      .references(() => resumes.id, { onDelete: "cascade" })
      .notNull(),
    company: text("company").notNull(),
    jobTitle: text("job_title").notNull(),
    location: text("location"),
    startDate: date("start_date"),
    endDate: date("end_date").default(sql`CURRENT_DATE`),
    createdAt: date("created_at").default(sql`NOW()`),
    updatedAt: date("updated_at").default(sql`NOW()`),
  },
  (table) => [
    crudPolicy({
      role: authenticatedRole,
      read: sql`${table.resumeId} IN (SELECT id FROM resumes WHERE ${authUid(
        resumes.userId
      )})`,
      modify: sql`resumeId IN (SELECT id FROM resumes WHERE ${authUid(
        resumes.userId
      )})`,
    }),
  ]
);

export const educations = pgTable(
  "education",
  {
    id: integer("id").generatedAlwaysAsIdentity().primaryKey(),
    resumeId: integer("resume_id")
      .references(() => resumes.id, { onDelete: "cascade" })
      .notNull(),
    institution: text("institution").notNull(),
    degreeName: text("degree_name").notNull(),
    startDate: date("start_date"),
    endDate: date("end_date"),
    description: text("description"),
    createdAt: date("created_at").default(sql`NOW()`),
    updatedAt: date("updated_at").default(sql`NOW()`),
  },
  (table) => [
    crudPolicy({
      role: authenticatedRole,
      read: sql`${table.resumeId} IN (SELECT id FROM resumes WHERE ${authUid(
        resumes.userId
      )})`,
      modify: sql`resumeId IN (SELECT id FROM resumes WHERE ${authUid(
        resumes.userId
      )})`,
    }),
  ]
);

export const skills = pgTable(
  "skills",
  {
    id: integer("id").generatedAlwaysAsIdentity().primaryKey(),
    resumeId: integer("resume_id")
      .references(() => resumes.id, { onDelete: "cascade" })
      .notNull(),
    skillName: text("skill_name").notNull(),
    createdAt: date("created_at").default(sql`NOW()`),
    updatedAt: date("updated_at").default(sql`NOW()`),
  },
  (table) => [
    crudPolicy({
      role: authenticatedRole,
      read: sql`${table.resumeId} IN (SELECT id FROM resumes WHERE ${authUid(
        resumes.userId
      )})`,
      modify: sql`resumeId IN (SELECT id FROM resumes WHERE ${authUid(
        resumes.userId
      )})`,
    }),
  ]
);
