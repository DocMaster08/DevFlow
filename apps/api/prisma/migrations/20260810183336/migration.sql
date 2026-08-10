-- CreateEnum
CREATE TYPE "ActivityType" AS ENUM ('UPDATED', 'CLEARED');

-- CreateEnum
CREATE TYPE "ActivityField" AS ENUM ('TITLE', 'DESCRIPTION', 'STATUS', 'PRIORITY', 'DUE_DATE');

-- CreateTable
CREATE TABLE "Activity" (
    "id" TEXT NOT NULL,
    "taskId" TEXT NOT NULL,
    "type" "ActivityType" NOT NULL,
    "field" "ActivityField",
    "oldValue" TEXT,
    "newValue" TEXT,
    "createdAt" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,

    CONSTRAINT "Activity_pkey" PRIMARY KEY ("id")
);

-- CreateIndex
CREATE INDEX "Activity_taskId_createdAt_idx" ON "Activity"("taskId", "createdAt");

-- AddForeignKey
ALTER TABLE "Activity" ADD CONSTRAINT "Activity_taskId_fkey" FOREIGN KEY ("taskId") REFERENCES "Task"("id") ON DELETE CASCADE ON UPDATE CASCADE;
