import { PrismaClient } from "@prisma/client";

// Prevent multiple PrismaClient instances in development
declare global {
	var prisma: PrismaClient | undefined;
}
 