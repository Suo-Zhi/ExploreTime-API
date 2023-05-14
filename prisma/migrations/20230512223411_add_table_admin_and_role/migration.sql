-- CreateTable
CREATE TABLE "Admin" (
    "id" VARCHAR(20) NOT NULL,
    "nickname" VARCHAR(15) NOT NULL,
    "password" TEXT NOT NULL,
    "avatar" TEXT,

    CONSTRAINT "Admin_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "Role" (
    "id" VARCHAR(20) NOT NULL,
    "name" VARCHAR(15) NOT NULL,
    "permission" TEXT[],

    CONSTRAINT "Role_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "_AdminToRole" (
    "A" VARCHAR(20) NOT NULL,
    "B" VARCHAR(20) NOT NULL
);

-- CreateIndex
CREATE UNIQUE INDEX "Admin_id_key" ON "Admin"("id");

-- CreateIndex
CREATE UNIQUE INDEX "Role_id_key" ON "Role"("id");

-- CreateIndex
CREATE UNIQUE INDEX "_AdminToRole_AB_unique" ON "_AdminToRole"("A", "B");

-- CreateIndex
CREATE INDEX "_AdminToRole_B_index" ON "_AdminToRole"("B");

-- AddForeignKey
ALTER TABLE "_AdminToRole" ADD CONSTRAINT "_AdminToRole_A_fkey" FOREIGN KEY ("A") REFERENCES "Admin"("id") ON DELETE CASCADE ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "_AdminToRole" ADD CONSTRAINT "_AdminToRole_B_fkey" FOREIGN KEY ("B") REFERENCES "Role"("id") ON DELETE CASCADE ON UPDATE CASCADE;
