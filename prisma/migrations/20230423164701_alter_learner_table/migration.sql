/*
  Warnings:

  - You are about to drop the column `username` on the `Learner` table. All the data in the column will be lost.
  - Added the required column `nickname` to the `Learner` table without a default value. This is not possible if the table is not empty.

*/
-- AlterTable
ALTER TABLE "Learner" DROP COLUMN "username",
ADD COLUMN     "nickname" VARCHAR(15) NOT NULL;
