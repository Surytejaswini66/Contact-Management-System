// testConnection.js

import { PrismaClient } from "@prisma/client";

const prisma = new PrismaClient();

async function testConnection() {
  try {
    await prisma.$connect();
    console.log("Prisma connected to the SQLite database successfully.");
  } catch (error) {
    console.error("Prisma failed to connect:", error);
  } finally {
    await prisma.$disconnect();
  }
}

testConnection();
