CREATE TABLE "ada_projects" (
	"id" serial PRIMARY KEY NOT NULL,
	"slug" text NOT NULL,
	"project_name" text NOT NULL,
	"description" text,
	"image_url" text,
	CONSTRAINT "ada_projects_slug_unique" UNIQUE("slug")
);
--> statement-breakpoint
CREATE TABLE "ada_promotions" (
	"id" serial PRIMARY KEY NOT NULL,
	"slug" text NOT NULL,
	"promotion_name" text NOT NULL,
	"image_url" text,
	"start_date" date NOT NULL,
	"bio" text,
	CONSTRAINT "ada_promotions_slug_unique" UNIQUE("slug")
);
--> statement-breakpoint
CREATE TABLE "student_projects" (
	"id" serial PRIMARY KEY NOT NULL,
	"slug" text NOT NULL,
	"image_url" text,
	"title" text NOT NULL,
	"github_url" text NOT NULL,
	"project_url" text NOT NULL,
	"created_at" timestamp DEFAULT now() NOT NULL,
	"published_at" timestamp,
	"promo_id" integer NOT NULL,
	"ada_project_id" integer NOT NULL,
	CONSTRAINT "student_projects_slug_unique" UNIQUE("slug")
);
--> statement-breakpoint
ALTER TABLE "student_projects" ADD CONSTRAINT "student_projects_promo_id_ada_promotions_id_fk" FOREIGN KEY ("promo_id") REFERENCES "public"."ada_promotions"("id") ON DELETE no action ON UPDATE no action;--> statement-breakpoint
ALTER TABLE "student_projects" ADD CONSTRAINT "student_projects_ada_project_id_ada_projects_id_fk" FOREIGN KEY ("ada_project_id") REFERENCES "public"."ada_projects"("id") ON DELETE no action ON UPDATE no action;