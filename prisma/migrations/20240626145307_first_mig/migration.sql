-- CreateTable
CREATE TABLE "UserModel" (
    "id" SERIAL NOT NULL,
    "email" TEXT NOT NULL,
    "password" TEXT NOT NULL,
    "name" TEXT NOT NULL,
    "role" TEXT NOT NULL,

    CONSTRAINT "UserModel_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "ProductModel" (
    "id" SERIAL NOT NULL,
    "price" INTEGER NOT NULL,
    "oldPrice" INTEGER,
    "active" BOOLEAN NOT NULL DEFAULT false,
    "productName" TEXT NOT NULL,
    "category" TEXT NOT NULL,
    "weight" INTEGER NOT NULL,
    "description" TEXT,
    "count" INTEGER NOT NULL DEFAULT 0,
    "userModelId" INTEGER NOT NULL,

    CONSTRAINT "ProductModel_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "DimensionsModel" (
    "id" SERIAL NOT NULL,
    "width" INTEGER NOT NULL,
    "Height" INTEGER NOT NULL,
    "Length" INTEGER NOT NULL,
    "productId" INTEGER NOT NULL,

    CONSTRAINT "DimensionsModel_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "CharacteristicsModel" (
    "id" SERIAL NOT NULL,
    "property" TEXT NOT NULL,
    "value" TEXT NOT NULL,
    "productId" INTEGER NOT NULL,

    CONSTRAINT "CharacteristicsModel_pkey" PRIMARY KEY ("id")
);

-- CreateIndex
CREATE UNIQUE INDEX "UserModel_email_key" ON "UserModel"("email");

-- CreateIndex
CREATE UNIQUE INDEX "DimensionsModel_productId_key" ON "DimensionsModel"("productId");

-- AddForeignKey
ALTER TABLE "ProductModel" ADD CONSTRAINT "ProductModel_userModelId_fkey" FOREIGN KEY ("userModelId") REFERENCES "UserModel"("id") ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "DimensionsModel" ADD CONSTRAINT "DimensionsModel_productId_fkey" FOREIGN KEY ("productId") REFERENCES "ProductModel"("id") ON DELETE CASCADE ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "CharacteristicsModel" ADD CONSTRAINT "CharacteristicsModel_productId_fkey" FOREIGN KEY ("productId") REFERENCES "ProductModel"("id") ON DELETE CASCADE ON UPDATE CASCADE;
