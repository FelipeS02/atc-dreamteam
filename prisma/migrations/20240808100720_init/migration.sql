/*
  Warnings:

  - Added the required column `default` to the `Player` table without a default value. This is not possible if the table is not empty.

*/
-- RedefineTables
PRAGMA defer_foreign_keys=ON;
PRAGMA foreign_keys=OFF;
CREATE TABLE "new_Player" (
    "id" INTEGER NOT NULL PRIMARY KEY AUTOINCREMENT,
    "name" TEXT NOT NULL,
    "img" TEXT NOT NULL,
    "rating" TEXT NOT NULL,
    "age" TEXT NOT NULL,
    "position" TEXT NOT NULL,
    "goals" TEXT NOT NULL,
    "default" BOOLEAN NOT NULL,
    "teamId" INTEGER NOT NULL,
    CONSTRAINT "Player_teamId_fkey" FOREIGN KEY ("teamId") REFERENCES "Team" ("id") ON DELETE CASCADE ON UPDATE NO ACTION
);
INSERT INTO "new_Player" ("age", "goals", "id", "img", "name", "position", "rating", "teamId") SELECT "age", "goals", "id", "img", "name", "position", "rating", "teamId" FROM "Player";
DROP TABLE "Player";
ALTER TABLE "new_Player" RENAME TO "Player";
PRAGMA foreign_keys=ON;
PRAGMA defer_foreign_keys=OFF;
