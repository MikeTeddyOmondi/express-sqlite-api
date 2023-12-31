CREATE TABLE `tasks` (
	`id` integer PRIMARY KEY NOT NULL,
	`public_id` text NOT NULL,
	`title` text NOT NULL,
	`description` text NOT NULL,
	`completed` integer DEFAULT false NOT NULL
);
--> statement-breakpoint
CREATE UNIQUE INDEX `tasks_id_unique` ON `tasks` (`id`);