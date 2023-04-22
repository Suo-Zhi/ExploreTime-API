-- CreateTable
CREATE TABLE "Learner" (
    "id" VARCHAR(20) NOT NULL,
    "username" VARCHAR(15) NOT NULL,
    "password" TEXT NOT NULL,
    "email" TEXT,
    "phone" VARCHAR(11),
    "avatar" TEXT,
    "intro" VARCHAR(30),

    CONSTRAINT "Learner_pkey" PRIMARY KEY ("id")
);

-- CreateIndex
CREATE UNIQUE INDEX "Learner_id_key" ON "Learner"("id");
