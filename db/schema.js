import { pgTable, text, varchar, timestamp, integer } from "drizzle-orm/pg-core";

export const users = pgTable("users", {
  id: text("id").primaryKey(),         
  name: varchar("name", { length: 100 }),
  email: varchar("email", { length: 255 }).notNull().unique(),
  password: text("password").notNull(),
  createdAt: timestamp('created_at').notNull().defaultNow(),
  updatedAt: timestamp('updated_at')
    .notNull()
    .$onUpdate(() => new Date()),
});

export const patients = pgTable("patients", {
  id: text("id").primaryKey(),
  user_id: text("user_id").references(() => users.id).notNull(),
  name: varchar("name", { length: 100 }).notNull(),
  age: integer("age").notNull(),
  gender: varchar("gender", { length: 10 }),
  contact: varchar("contact", { length: 15 }),
  created_at: timestamp("created_at").defaultNow(),
  updated_at: timestamp("updated_at").defaultNow(),
});

export const doctors = pgTable("doctors", {
  id: text("id").primaryKey(),
  name: varchar("name", { length: 100 }).notNull(),
  specialization: varchar("specialization", { length: 100 }),
  contact: varchar("contact", { length: 15 }),
  created_at: timestamp("created_at").defaultNow(),
  updated_at: timestamp("updated_at").defaultNow(),
});

export const patientDoctorMappings = pgTable("patient_doctor_mappings", {
  id: text("id").primaryKey(),
  patient_id: text("patient_id").references(() => patients.id).notNull(),
  doctor_id: text("doctor_id").references(() => doctors.id).notNull(),
  assigned_at: timestamp("assigned_at").defaultNow(),
});