CREATE TABLE `usersData` (
	`id` integer PRIMARY KEY AUTOINCREMENT NOT NULL,
	`username` text NOT NULL,
	`email` text NOT NULL,
	`accountType` text NOT NULL,
	`hashedPassword` text NOT NULL
);
--> statement-breakpoint
CREATE UNIQUE INDEX `usersData_email_unique` ON `usersData` (`email`);