/*
  Warnings:

  - A unique constraint covering the columns `[date,memberId]` on the table `DailyMeal` will be added. If there are existing duplicate values, this will fail.

*/
-- CreateIndex
CREATE UNIQUE INDEX "DailyMeal_date_memberId_key" ON "DailyMeal"("date", "memberId");
