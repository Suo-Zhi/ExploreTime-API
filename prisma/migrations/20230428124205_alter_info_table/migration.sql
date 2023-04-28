-- DropForeignKey
ALTER TABLE "Info" DROP CONSTRAINT "Info_authorId_fkey";

-- AddForeignKey
ALTER TABLE "Info" ADD CONSTRAINT "Info_authorId_fkey" FOREIGN KEY ("authorId") REFERENCES "Learner"("id") ON DELETE CASCADE ON UPDATE CASCADE;
