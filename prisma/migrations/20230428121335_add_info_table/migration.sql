-- CreateTable
CREATE TABLE "Info" (
    "id" SERIAL NOT NULL,
    "content" TEXT NOT NULL,
    "isRefine" BOOLEAN NOT NULL DEFAULT false,
    "authorId" VARCHAR(20) NOT NULL,
    "createTime" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,
    "updateTime" TIMESTAMP(3) NOT NULL,

    CONSTRAINT "Info_pkey" PRIMARY KEY ("id")
);

-- AddForeignKey
ALTER TABLE "Info" ADD CONSTRAINT "Info_authorId_fkey" FOREIGN KEY ("authorId") REFERENCES "Learner"("id") ON DELETE RESTRICT ON UPDATE CASCADE;
