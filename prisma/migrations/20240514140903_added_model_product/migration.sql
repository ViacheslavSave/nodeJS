-- CreateTable
CREATE TABLE "Product" (
    "id" SERIAL NOT NULL,
    "brand" TEXT NOT NULL,
    "model" TEXT NOT NULL,
    "VoWiFi" BOOLEAN NOT NULL,
    "RAMCapacity" TEXT NOT NULL,
    "OSVersion" TEXT NOT NULL,
    "NumberOfSIMCards" TEXT NOT NULL,
    "FrontCamera" TEXT NOT NULL,
    "BuiltInMemory" TEXT NOT NULL,
    "MainCamera" TEXT NOT NULL,
    "added" INTEGER NOT NULL,

    CONSTRAINT "Product_pkey" PRIMARY KEY ("id")
);

-- AddForeignKey
ALTER TABLE "Product" ADD CONSTRAINT "Product_added_fkey" FOREIGN KEY ("added") REFERENCES "UserModel"("id") ON DELETE RESTRICT ON UPDATE CASCADE;
