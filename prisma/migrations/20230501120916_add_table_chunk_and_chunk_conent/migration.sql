-- CreateTable
CREATE TABLE "Chunk" (
    "id" SERIAL NOT NULL,
    "name" VARCHAR(50) NOT NULL,
    "preface" TEXT NOT NULL,
    "endnote" TEXT NOT NULL,
    "isRefine" BOOLEAN NOT NULL DEFAULT false,
    "isDel" BOOLEAN NOT NULL DEFAULT false,
    "authorId" VARCHAR(20) NOT NULL,
    "createTime" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,
    "updateTime" TIMESTAMP(3) NOT NULL,

    CONSTRAINT "Chunk_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "ChunkContent" (
    "chunkId" INTEGER NOT NULL,
    "pointId" INTEGER NOT NULL,
    "order" INTEGER NOT NULL,

    CONSTRAINT "ChunkContent_pkey" PRIMARY KEY ("chunkId","order")
);

-- AddForeignKey
ALTER TABLE "Chunk" ADD CONSTRAINT "Chunk_authorId_fkey" FOREIGN KEY ("authorId") REFERENCES "Learner"("id") ON DELETE CASCADE ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "ChunkContent" ADD CONSTRAINT "ChunkContent_chunkId_fkey" FOREIGN KEY ("chunkId") REFERENCES "Chunk"("id") ON DELETE CASCADE ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "ChunkContent" ADD CONSTRAINT "ChunkContent_pointId_fkey" FOREIGN KEY ("pointId") REFERENCES "Point"("id") ON DELETE CASCADE ON UPDATE CASCADE;
