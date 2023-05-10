-- CreateTable
CREATE TABLE "Exercise" (
    "id" SERIAL NOT NULL,
    "question" VARCHAR(50) NOT NULL,
    "detail" TEXT NOT NULL,
    "answer" TEXT NOT NULL,
    "analysis" TEXT NOT NULL,
    "isRefine" BOOLEAN NOT NULL DEFAULT false,
    "isDel" BOOLEAN NOT NULL DEFAULT false,
    "authorId" VARCHAR(20) NOT NULL,
    "createTime" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,
    "updateTime" TIMESTAMP(3) NOT NULL,

    CONSTRAINT "Exercise_pkey" PRIMARY KEY ("id")
);

-- AddForeignKey
ALTER TABLE "Exercise" ADD CONSTRAINT "Exercise_authorId_fkey" FOREIGN KEY ("authorId") REFERENCES "Learner"("id") ON DELETE CASCADE ON UPDATE CASCADE;
