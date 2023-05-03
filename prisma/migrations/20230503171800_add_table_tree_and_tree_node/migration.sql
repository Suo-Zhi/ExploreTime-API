-- CreateTable
CREATE TABLE "Tree" (
    "id" SERIAL NOT NULL,
    "preface" TEXT NOT NULL,
    "isPublic" BOOLEAN NOT NULL DEFAULT false,
    "isDel" BOOLEAN NOT NULL DEFAULT false,
    "authorId" VARCHAR(20) NOT NULL,
    "createTime" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,
    "updateTime" TIMESTAMP(3) NOT NULL,

    CONSTRAINT "Tree_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "TreeNode" (
    "id" SERIAL NOT NULL,
    "treeId" INTEGER NOT NULL,
    "parentNodeId" INTEGER,
    "order" INTEGER NOT NULL,
    "nodeId" INTEGER NOT NULL,

    CONSTRAINT "TreeNode_pkey" PRIMARY KEY ("id")
);

-- AddForeignKey
ALTER TABLE "Tree" ADD CONSTRAINT "Tree_authorId_fkey" FOREIGN KEY ("authorId") REFERENCES "Learner"("id") ON DELETE CASCADE ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "TreeNode" ADD CONSTRAINT "TreeNode_treeId_fkey" FOREIGN KEY ("treeId") REFERENCES "Tree"("id") ON DELETE CASCADE ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "TreeNode" ADD CONSTRAINT "TreeNode_parentNodeId_fkey" FOREIGN KEY ("parentNodeId") REFERENCES "TreeNode"("id") ON DELETE CASCADE ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "TreeNode" ADD CONSTRAINT "TreeNode_nodeId_fkey" FOREIGN KEY ("nodeId") REFERENCES "Chunk"("id") ON DELETE CASCADE ON UPDATE CASCADE;
