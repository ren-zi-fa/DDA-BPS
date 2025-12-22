import { InformasiKecamatanProps } from "@/type";

const dataRanahBatahan: InformasiKecamatanProps = {
  title: "Ranah Batahan",
  luas_kecamatan: "466,44 KM²",
  batas_kecamatan: {
    utara: "Kab. Madina, Provinsi Sumatera Utara",
    selatan: "Kecamatan Koto Balingka, Kecamatan Sungai Beremas",
    barat: "Kab. Madina, Provinsi Sumatera Utara",
    timur: "Kecamatan Koto Balingka",
  },
  nama_kecamatan: "Ranah Batahan",
  ketinggian_dari_permukaan_laut: "20 Mdpl s/d 1.573 Mdpl",
};
const dataKotoBalingka: InformasiKecamatanProps = {
  title: "Koto Balingka",
  luas_kecamatan: "340,78 M²",
  batas_kecamatan: {
    utara: "Kec. Ranah Batahan",
    selatan: "Samudera Indonesia",
    barat: "Kec.Sungai Beremas",
    timur: "Kec. Lembah Melintang",
  },
  nama_kecamatan: "Koto Balingka",
  ketinggian_dari_permukaan_laut: "8.77 mdpl",
};
const dataGunungTuleh: InformasiKecamatanProps = {
  title: "Gunung Tuleh",
  luas_kecamatan: "453,97 KM²",
  batas_kecamatan: {
    utara: "Kabupaten Mandahiling Natal (Sumatera Utara)	",
    selatan: "Kecamatan Pasaman",
    barat: "Kecamatan Sungai Aur",
    timur: "KecamatanTalamau dan Kabupaten Pasaman",
  },
  nama_kecamatan: "Gunung Tuleh",
  ketinggian_dari_permukaan_laut: "26 - 1.875 Mdpl",
};
const dataTalamau: InformasiKecamatanProps = {
  title: "Talamau",
  luas_kecamatan: "324,24 KM²",
  batas_kecamatan: {
    utara: "Kabupaten Pasaman	",
    selatan: "Kabupaten Pasaman	",
    barat: "Kecamatan Gunuang Tuleh	",
    timur: "Kabupaten Pasaman	",
  },
  nama_kecamatan: "Talamau",
  ketinggian_dari_permukaan_laut: "225-2019 MPPL	",
};
const dataPasaman: InformasiKecamatanProps = {
  title: "Pasaman",
  luas_kecamatan: "508,93 km2",
  batas_kecamatan: {
    utara: "Kecamatan Gunung Tuleh	",
    selatan: "Kecamatan Luhak Nan Duo	",
    barat: "Kecamatan Sasak Ranah Pasisie",
    timur: "Kecamatan Talamau",
  },
  nama_kecamatan: "Pasaman",
  ketinggian_dari_permukaan_laut: "15-2.913 meter di atas permukaan laut",
};
const dataKinali: InformasiKecamatanProps = {
  title: "Kinali",
  luas_kecamatan: "482,64 km2",
  batas_kecamatan: {
    utara: "Kecamatan Luhak Nan Duo",
    selatan: "Kecamatan III Nagari, Kab. Agam	",
    barat: "Samudera Indonesia",
    timur: "Kecamatan III Nagari",
  },
  nama_kecamatan: "Pasaman",
  ketinggian_dari_permukaan_laut: "15-2.913 meter di atas permukaan laut",
};
export {
  dataRanahBatahan,
  dataKinali,
  dataPasaman,
  dataGunungTuleh,
  dataKotoBalingka,
  dataTalamau,
};
