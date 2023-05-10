-- CreateTable
CREATE TABLE "Explain" (
    "id" SERIAL NOT NULL,
    "title" VARCHAR(50) NOT NULL,
    "content" TEXT NOT NULL,
    "isPublic" BOOLEAN NOT NULL DEFAULT false,
    "isDel" BOOLEAN NOT NULL DEFAULT false,
    "authorId" VARCHAR(20) NOT NULL,
    "createTime" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,
    "updateTime" TIMESTAMP(3) NOT NULL,

    CONSTRAINT "Explain_pkey" PRIMARY KEY ("id")
);

-- AddForeignKey
ALTER TABLE "Explain" ADD CONSTRAINT "Explain_authorId_fkey" FOREIGN KEY ("authorId") REFERENCES "Learner"("id") ON DELETE CASCADE ON UPDATE CASCADE;
