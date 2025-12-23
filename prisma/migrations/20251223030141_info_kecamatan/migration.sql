-- CreateTable
CREATE TABLE "kecamatan" (
    "id" SERIAL NOT NULL,
    "kecamatan" TEXT NOT NULL,
    "luas_kecamatan" TEXT NOT NULL,
    "batas_utara" TEXT NOT NULL,
    "batas_selatan" TEXT NOT NULL,
    "batas_barat" TEXT NOT NULL,
    "batas_timur" TEXT NOT NULL,
    "ketinggian_dari_permukaan_laut" TEXT NOT NULL,

    CONSTRAINT "kecamatan_pkey" PRIMARY KEY ("id")
);

-- CreateIndex
CREATE UNIQUE INDEX "kecamatan_kecamatan_key" ON "kecamatan"("kecamatan");
