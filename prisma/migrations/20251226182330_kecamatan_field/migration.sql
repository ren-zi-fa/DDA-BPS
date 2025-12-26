/*
  Warnings:

  - You are about to drop the column `jumlah` on the `gizi_buruk` table. All the data in the column will be lost.
  - You are about to drop the column `tahun` on the `gizi_buruk` table. All the data in the column will be lost.
  - You are about to drop the column `apotik` on the `sarana_kesehatan` table. All the data in the column will be lost.
  - You are about to drop the column `poliklinikBalaiKesehatan` on the `sarana_kesehatan` table. All the data in the column will be lost.
  - You are about to drop the column `polindes` on the `sarana_kesehatan` table. All the data in the column will be lost.
  - You are about to drop the column `posyandu` on the `sarana_kesehatan` table. All the data in the column will be lost.
  - You are about to drop the column `puskesmasPembantu` on the `sarana_kesehatan` table. All the data in the column will be lost.
  - You are about to drop the column `puskesmasRawatInap` on the `sarana_kesehatan` table. All the data in the column will be lost.
  - You are about to drop the column `puskesmasTanpaRawatInap` on the `sarana_kesehatan` table. All the data in the column will be lost.
  - You are about to drop the column `rumahSakit` on the `sarana_kesehatan` table. All the data in the column will be lost.
  - You are about to drop the column `rumahSakitBersalin` on the `sarana_kesehatan` table. All the data in the column will be lost.
  - You are about to drop the column `MAN` on the `sarana_pendidikan` table. All the data in the column will be lost.
  - You are about to drop the column `MI` on the `sarana_pendidikan` table. All the data in the column will be lost.
  - You are about to drop the column `MTsn` on the `sarana_pendidikan` table. All the data in the column will be lost.
  - You are about to drop the column `RA` on the `sarana_pendidikan` table. All the data in the column will be lost.
  - You are about to drop the column `SD` on the `sarana_pendidikan` table. All the data in the column will be lost.
  - You are about to drop the column `SMA` on the `sarana_pendidikan` table. All the data in the column will be lost.
  - You are about to drop the column `SMK` on the `sarana_pendidikan` table. All the data in the column will be lost.
  - You are about to drop the column `SMP` on the `sarana_pendidikan` table. All the data in the column will be lost.
  - You are about to drop the column `TK` on the `sarana_pendidikan` table. All the data in the column will be lost.
  - You are about to drop the column `mesjid` on the `sarana_peribadatan` table. All the data in the column will be lost.
  - You are about to drop the column `mushala` on the `sarana_peribadatan` table. All the data in the column will be lost.
  - Added the required column `jumlah_gizi_buruk` to the `gizi_buruk` table without a default value. This is not possible if the table is not empty.
  - Added the required column `jumlahGerejaKatolik` to the `sarana_peribadatan` table without a default value. This is not possible if the table is not empty.
  - Added the required column `jumlahGerejaProtestan` to the `sarana_peribadatan` table without a default value. This is not possible if the table is not empty.
  - Added the required column `jumlahWihara` to the `sarana_peribadatan` table without a default value. This is not possible if the table is not empty.

*/
-- AlterTable
ALTER TABLE "gizi_buruk" DROP COLUMN "jumlah",
DROP COLUMN "tahun",
ADD COLUMN     "jumlah_gizi_buruk" INTEGER NOT NULL;

-- AlterTable
ALTER TABLE "sarana_kesehatan" DROP COLUMN "apotik",
DROP COLUMN "poliklinikBalaiKesehatan",
DROP COLUMN "polindes",
DROP COLUMN "posyandu",
DROP COLUMN "puskesmasPembantu",
DROP COLUMN "puskesmasRawatInap",
DROP COLUMN "puskesmasTanpaRawatInap",
DROP COLUMN "rumahSakit",
DROP COLUMN "rumahSakitBersalin";

-- AlterTable
ALTER TABLE "sarana_pendidikan" DROP COLUMN "MAN",
DROP COLUMN "MI",
DROP COLUMN "MTsn",
DROP COLUMN "RA",
DROP COLUMN "SD",
DROP COLUMN "SMA",
DROP COLUMN "SMK",
DROP COLUMN "SMP",
DROP COLUMN "TK";

-- AlterTable
ALTER TABLE "sarana_peribadatan" DROP COLUMN "mesjid",
DROP COLUMN "mushala",
ADD COLUMN     "jumlahGerejaKatolik" INTEGER NOT NULL,
ADD COLUMN     "jumlahGerejaProtestan" INTEGER NOT NULL,
ADD COLUMN     "jumlahWihara" INTEGER NOT NULL;
