-- CreateTable
CREATE TABLE "jumlah_nagari_jorong" (
    "id" SERIAL NOT NULL,
    "kecamatan" TEXT NOT NULL,
    "jumlah_nagari" INTEGER NOT NULL,
    "jumlah_jorong" INTEGER NOT NULL,

    CONSTRAINT "jumlah_nagari_jorong_pkey" PRIMARY KEY ("id")
);

-- CreateIndex
CREATE UNIQUE INDEX "jumlah_nagari_jorong_kecamatan_key" ON "jumlah_nagari_jorong"("kecamatan");
