/*
  Warnings:

  - You are about to drop the column `blurImg` on the `Alignment` table. All the data in the column will be lost.

*/
-- RedefineTables
PRAGMA defer_foreign_keys=ON;
PRAGMA foreign_keys=OFF;
CREATE TABLE "new_Alignment" (
    "id" INTEGER NOT NULL PRIMARY KEY AUTOINCREMENT,
    "name" TEXT NOT NULL,
    "img" TEXT NOT NULL
);
INSERT INTO "new_Alignment" ("id", "img", "name") SELECT "id", "img", "name" FROM "Alignment";
DROP TABLE "Alignment";
ALTER TABLE "new_Alignment" RENAME TO "Alignment";
PRAGMA foreign_keys=ON;
PRAGMA defer_foreign_keys=OFF;
