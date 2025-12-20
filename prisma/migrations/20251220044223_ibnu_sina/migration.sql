-- CreateTable
CREATE TABLE "bpjs_kelompok_kecamatan" (
    "id" SERIAL NOT NULL,
    "kecamatan" TEXT NOT NULL,
    "pbi" INTEGER NOT NULL,
    "non_pbi" INTEGER NOT NULL,
    "jumlah" INTEGER NOT NULL,

    CONSTRAINT "bpjs_kelompok_kecamatan_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "ibnu_sina_rawat_jalan" (
    "id" SERIAL NOT NULL,
    "bulan" TEXT NOT NULL,
    "bedah" INTEGER NOT NULL,
    "kesehatan_anak" INTEGER NOT NULL,
    "poli_kebidanan" INTEGER NOT NULL,
    "gigi" INTEGER NOT NULL,
    "umum" INTEGER NOT NULL,

    CONSTRAINT "ibnu_sina_rawat_jalan_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "lanjutan_ibnu_sina_rawat_jalan" (
    "id" SERIAL NOT NULL,
    "bulan" TEXT NOT NULL,
    "penyakit_dalam" INTEGER NOT NULL,
    "jiwa" INTEGER NOT NULL,
    "tht" INTEGER NOT NULL,
    "mata" INTEGER NOT NULL,
    "neurologi" INTEGER NOT NULL,
    "fisioterapi" INTEGER NOT NULL,

    CONSTRAINT "lanjutan_ibnu_sina_rawat_jalan_pkey" PRIMARY KEY ("id")
);

-- CreateIndex
CREATE UNIQUE INDEX "bpjs_kelompok_kecamatan_kecamatan_key" ON "bpjs_kelompok_kecamatan"("kecamatan");

-- CreateIndex
CREATE UNIQUE INDEX "ibnu_sina_rawat_jalan_bulan_key" ON "ibnu_sina_rawat_jalan"("bulan");

-- CreateIndex
CREATE UNIQUE INDEX "lanjutan_ibnu_sina_rawat_jalan_bulan_key" ON "lanjutan_ibnu_sina_rawat_jalan"("bulan");
