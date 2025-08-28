import { relations, sql } from "drizzle-orm";
import {
  authenticatedRole,
  authUid,
  crudPolicy,
  usersSync,
} from "drizzle-orm/neon";
import { date, integer, pgTable, serial, text } from "drizzle-orm/pg-core";

export const resumes = pgTable(
  "resumes",
  {
    id: serial("id").primaryKey(),
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

export const resumesRelations = relations(resumes, ({ many }) => ({
  experiences: many(experiences),
  educations: many(educations),
  skills: many(skills),
}));

export const experiences = pgTable(
  "experiences",
  {
    id: serial("id").primaryKey(),
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

export const experiencesRelations = relations(experiences, ({ one }) => ({
  resume: one(resumes, {
    fields: [experiences.resumeId],
    references: [resumes.id],
  }),
}));

export const educations = pgTable(
  "education",
  {
    id: serial("id").primaryKey(),
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

export const educationsRelations = relations(educations, ({ one }) => ({
  resume: one(resumes, {
    fields: [educations.resumeId],
    references: [resumes.id],
  }),
}));

export const skills = pgTable(
  "skills",
  {
    id: serial("id").primaryKey(),
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

export const skillsRelations = relations(skills, ({ one }) => ({
  resume: one(resumes, {
    fields: [skills.resumeId],
    references: [resumes.id],
  }),
}));
