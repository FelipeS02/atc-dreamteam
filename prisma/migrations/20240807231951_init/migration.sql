/*
  Warnings:

  - Added the required column `alignmentL` to the `Alignment` table without a default value. This is not possible if the table is not empty.
  - Added the required column `alignmentR` to the `Alignment` table without a default value. This is not possible if the table is not empty.

*/
-- RedefineTables
PRAGMA defer_foreign_keys=ON;
PRAGMA foreign_keys=OFF;
CREATE TABLE "new_Alignment" (
    "id" INTEGER NOT NULL PRIMARY KEY AUTOINCREMENT,
    "name" TEXT NOT NULL,
    "img" TEXT NOT NULL,
    "alignmentL" TEXT NOT NULL,
    "alignmentR" TEXT NOT NULL
);
INSERT INTO "new_Alignment" ("id", "img", "name") SELECT "id", "img", "name" FROM "Alignment";
DROP TABLE "Alignment";
ALTER TABLE "new_Alignment" RENAME TO "Alignment";
PRAGMA foreign_keys=ON;
PRAGMA defer_foreign_keys=OFF;
