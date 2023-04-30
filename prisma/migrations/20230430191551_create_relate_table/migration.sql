-- CreateTable
CREATE TABLE "Relate" (
    "id" SERIAL NOT NULL,
    "targetId" INTEGER NOT NULL,
    "targetType" TEXT NOT NULL,
    "relateId" INTEGER NOT NULL,
    "relateType" TEXT NOT NULL,
    "createTime" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,

    CONSTRAINT "Relate_pkey" PRIMARY KEY ("id")
);
