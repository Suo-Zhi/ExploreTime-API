-- CreateTable
CREATE TABLE "Like" (
    "id" SERIAL NOT NULL,
    "userId" VARCHAR(20) NOT NULL,
    "createTime" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,

    CONSTRAINT "Like_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "_FeedbackToLike" (
    "A" INTEGER NOT NULL,
    "B" INTEGER NOT NULL
);

-- CreateTable
CREATE TABLE "_LikeToReply" (
    "A" INTEGER NOT NULL,
    "B" INTEGER NOT NULL
);

-- CreateIndex
CREATE UNIQUE INDEX "_FeedbackToLike_AB_unique" ON "_FeedbackToLike"("A", "B");

-- CreateIndex
CREATE INDEX "_FeedbackToLike_B_index" ON "_FeedbackToLike"("B");

-- CreateIndex
CREATE UNIQUE INDEX "_LikeToReply_AB_unique" ON "_LikeToReply"("A", "B");

-- CreateIndex
CREATE INDEX "_LikeToReply_B_index" ON "_LikeToReply"("B");

-- AddForeignKey
ALTER TABLE "Like" ADD CONSTRAINT "Like_userId_fkey" FOREIGN KEY ("userId") REFERENCES "Learner"("id") ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "_FeedbackToLike" ADD CONSTRAINT "_FeedbackToLike_A_fkey" FOREIGN KEY ("A") REFERENCES "Feedback"("id") ON DELETE CASCADE ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "_FeedbackToLike" ADD CONSTRAINT "_FeedbackToLike_B_fkey" FOREIGN KEY ("B") REFERENCES "Like"("id") ON DELETE CASCADE ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "_LikeToReply" ADD CONSTRAINT "_LikeToReply_A_fkey" FOREIGN KEY ("A") REFERENCES "Like"("id") ON DELETE CASCADE ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "_LikeToReply" ADD CONSTRAINT "_LikeToReply_B_fkey" FOREIGN KEY ("B") REFERENCES "Reply"("id") ON DELETE CASCADE ON UPDATE CASCADE;
