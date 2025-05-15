/*
  Warnings:

  - You are about to drop the column `createdAt` on the `Task` table. All the data in the column will be lost.
  - You are about to drop the column `description` on the `Task` table. All the data in the column will be lost.
  - You are about to drop the column `done` on the `Task` table. All the data in the column will be lost.
  - You are about to drop the column `createdAt` on the `TaskList` table. All the data in the column will be lost.

*/
-- RedefineTables
PRAGMA defer_foreign_keys=ON;
PRAGMA foreign_keys=OFF;
CREATE TABLE "new_Task" (
    "id" INTEGER NOT NULL PRIMARY KEY AUTOINCREMENT,
    "title" TEXT NOT NULL,
    "completed" BOOLEAN NOT NULL DEFAULT false,
    "dueDate" DATETIME,
    "taskListId" INTEGER NOT NULL,
    CONSTRAINT "Task_taskListId_fkey" FOREIGN KEY ("taskListId") REFERENCES "TaskList" ("id") ON DELETE CASCADE ON UPDATE CASCADE
);
INSERT INTO "new_Task" ("dueDate", "id", "taskListId", "title") SELECT "dueDate", "id", "taskListId", "title" FROM "Task";
DROP TABLE "Task";
ALTER TABLE "new_Task" RENAME TO "Task";
CREATE TABLE "new_TaskList" (
    "id" INTEGER NOT NULL PRIMARY KEY AUTOINCREMENT,
    "name" TEXT NOT NULL,
    "userId" INTEGER NOT NULL,
    CONSTRAINT "TaskList_userId_fkey" FOREIGN KEY ("userId") REFERENCES "User" ("id") ON DELETE RESTRICT ON UPDATE CASCADE
);
INSERT INTO "new_TaskList" ("id", "name", "userId") SELECT "id", "name", "userId" FROM "TaskList";
DROP TABLE "TaskList";
ALTER TABLE "new_TaskList" RENAME TO "TaskList";
CREATE UNIQUE INDEX "TaskList_name_key" ON "TaskList"("name");
PRAGMA foreign_keys=ON;
PRAGMA defer_foreign_keys=OFF;
