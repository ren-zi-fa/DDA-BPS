-- CreateTable
CREATE TABLE "JumlahJorongNagariKecamatan" (
    "id" SERIAL NOT NULL,
    "kecamatanId" INTEGER NOT NULL,
    "jumlah_jorong" TEXT NOT NULL,
    "jumlah_nagari" TEXT NOT NULL,

    CONSTRAINT "JumlahJorongNagariKecamatan_pkey" PRIMARY KEY ("id")
);

-- CreateIndex
CREATE UNIQUE INDEX "JumlahJorongNagariKecamatan_kecamatanId_key" ON "JumlahJorongNagariKecamatan"("kecamatanId");

-- AddForeignKey
ALTER TABLE "JumlahJorongNagariKecamatan" ADD CONSTRAINT "JumlahJorongNagariKecamatan_kecamatanId_fkey" FOREIGN KEY ("kecamatanId") REFERENCES "Kecamatan"("id") ON DELETE RESTRICT ON UPDATE CASCADE;
