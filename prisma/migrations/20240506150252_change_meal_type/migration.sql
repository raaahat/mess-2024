-- RedefineTables
PRAGMA foreign_keys=OFF;
CREATE TABLE "new_DailyMeal" (
    "id" TEXT NOT NULL PRIMARY KEY,
    "date" DATETIME NOT NULL,
    "breakfast" INTEGER NOT NULL DEFAULT 0,
    "lunch" INTEGER NOT NULL DEFAULT 0,
    "dinner" INTEGER NOT NULL DEFAULT 0,
    "friday" INTEGER NOT NULL DEFAULT 0,
    "memberId" TEXT NOT NULL,
    "createdAt" DATETIME NOT NULL DEFAULT CURRENT_TIMESTAMP,
    "updatedAt" DATETIME NOT NULL,
    CONSTRAINT "DailyMeal_memberId_fkey" FOREIGN KEY ("memberId") REFERENCES "Member" ("id") ON DELETE CASCADE ON UPDATE CASCADE
);
INSERT INTO "new_DailyMeal" ("breakfast", "createdAt", "date", "dinner", "friday", "id", "lunch", "memberId", "updatedAt") SELECT coalesce("breakfast", 0) AS "breakfast", "createdAt", "date", coalesce("dinner", 0) AS "dinner", coalesce("friday", 0) AS "friday", "id", coalesce("lunch", 0) AS "lunch", "memberId", "updatedAt" FROM "DailyMeal";
DROP TABLE "DailyMeal";
ALTER TABLE "new_DailyMeal" RENAME TO "DailyMeal";
CREATE UNIQUE INDEX "DailyMeal_date_memberId_key" ON "DailyMeal"("date", "memberId");
PRAGMA foreign_key_check;
PRAGMA foreign_keys=ON;
