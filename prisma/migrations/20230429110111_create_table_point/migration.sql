-- CreateTable
CREATE TABLE "Point" (
    "id" SERIAL NOT NULL,
    "name" VARCHAR(50) NOT NULL,
    "content" TEXT NOT NULL,
    "isRefine" BOOLEAN NOT NULL DEFAULT false,
    "isDel" BOOLEAN NOT NULL DEFAULT false,
    "authorId" VARCHAR(20) NOT NULL,
    "createTime" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,
    "updateTime" TIMESTAMP(3) NOT NULL,

    CONSTRAINT "Point_pkey" PRIMARY KEY ("id")
);

-- AddForeignKey
ALTER TABLE "Point" ADD CONSTRAINT "Point_authorId_fkey" FOREIGN KEY ("authorId") REFERENCES "Learner"("id") ON DELETE CASCADE ON UPDATE CASCADE;
