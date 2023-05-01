/*
  Warnings:

  - The primary key for the `Relate` table will be changed. If it partially fails, the table could be left without primary key constraint.
  - You are about to drop the column `id` on the `Relate` table. All the data in the column will be lost.

*/
-- AlterTable
ALTER TABLE "Relate" DROP CONSTRAINT "Relate_pkey",
DROP COLUMN "id",
ADD CONSTRAINT "Relate_pkey" PRIMARY KEY ("targetId", "targetType", "relateId", "relateType");
