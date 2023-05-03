/*
  Warnings:

  - Added the required column `name` to the `Tree` table without a default value. This is not possible if the table is not empty.

*/
-- AlterTable
ALTER TABLE "Tree" ADD COLUMN     "name" VARCHAR(50) NOT NULL;
