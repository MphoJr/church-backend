-- CreateTable
CREATE TABLE "Member" (
    "id" SERIAL NOT NULL,
    "title" TEXT,
    "name" TEXT NOT NULL,
    "surname" TEXT NOT NULL,
    "homeLanguage" TEXT,
    "gender" TEXT,
    "occupation" TEXT,
    "serviceArea" TEXT,
    "address" TEXT,
    "cell" TEXT,
    "maritalStatus" TEXT,
    "spouseSaved" BOOLEAN,
    "familyMembers" JSONB,
    "status" TEXT NOT NULL DEFAULT 'active',
    "createdAt" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,

    CONSTRAINT "Member_pkey" PRIMARY KEY ("id")
);
