-- AlterTable
ALTER TABLE "Feedback" ADD COLUMN     "isDel" BOOLEAN NOT NULL DEFAULT false;

-- AlterTable
ALTER TABLE "Reply" ADD COLUMN     "isDel" BOOLEAN NOT NULL DEFAULT false;
