import { integer, text, pgTable, timestamp, serial, date } from "drizzle-orm/pg-core";

export const adaProjects = pgTable("ada_projects", {
  id: serial("id").primaryKey(),
  slug: text("slug").notNull().unique(),
  projectName: text("project_name").notNull(),
  description: text("description"),
  imageUrl: text("image_url")
});


export const adaPromotions = pgTable("ada_promotions", {
  id: serial("id").primaryKey(),
  slug: text("slug").notNull().unique(),
  promotionName: text("promotion_name").notNull(),
  imageUrl: text("image_url"),
  startDate: date("start_date").notNull(),
  bio: text("bio"),
});

export const studentProjects = pgTable("student_projects", {
  id: serial("id").primaryKey(),
  slug: text("slug").notNull().unique(),
  imageUrl: text("image_url"),
  title: text("title").notNull(),
  githubUrl: text("github_url").notNull(),
  projectUrl: text("project_url").notNull(),
  createdAt: timestamp("created_at").defaultNow().notNull(),
  publishedAt: timestamp("published_at"),
  promoId: integer("promo_id").references(()=> adaPromotions.id).notNull(),
  adaProjectId: integer("ada_project_id").references(()=> adaProjects.id).notNull(),

});
