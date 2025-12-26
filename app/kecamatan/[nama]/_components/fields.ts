/* nama dan label field*/
export const fieldInformasiKecamatan = [
  {
    name: "nama_camat",
    label: "Nama Camat",
  },
  {
    name: "luas_kecamatan",
    label: "Luas Kecamatan",
  },
  {
    name: "ketinggian_permukaan_laut",
    label: "Ketinggian Permukaan Laut",
  },

  {
    name: "batas_kec_barat",
    label: "Batas Barat",
  },
  {
    name: "batas_kec_selatan",
    label: "Batas Selatan",
  },
  {
    name: "batas_kec_timur",
    label: "Batas Timur",
  },
  {
    name: "batas_kec_utara",
    label: "Batas Utara",
  },
] as const;

export const JmlhnagariFields = [
  {
    name: "jmlh_nagari",
    label: "Jumlah Nagari",
  },
  {
    name: "jmlh_jorong",
    label: "Jumlah Jorong",
  },
] as const;

export const saranaPendidikanFields = [
  { name: "jumlahTK", label: "Jumlah TK" },
  { name: "jumlahRA", label: "Jumlah RA" },
  { name: "jumlahSD", label: "Jumlah SD" },
  { name: "jumlahMI", label: "Jumlah MI" },
  { name: "jumlahSMP", label: "Jumlah SMP" },
  { name: "jumlahMTsn", label: "Jumlah MTs" },
  { name: "jumlahSMA", label: "Jumlah SMA" },
  { name: "jumlahSMK", label: "Jumlah SMK" },
  { name: "jumlahMAN", label: "Jumlah MAN" },
] as const;

export const saranaPeribadatanFields = [
  { name: "jumlahMesjid", label: "Jumlah Mesjid" },
  { name: "jumlahMushala", label: "Jumlah Mushala" },
  { name: "jumlahGerejaProtestan", label: "Jumlah Gereja Protestan" },
  { name: "jumlahGerejaKatolik", label: "Jumlah Gereja Katolik" },
  { name: "jumlahWihara", label: "Jumlah Wihara" },
  

] as const;

export const saranaKesehatanFields = [
  { name: "jumlahApotik", label: "Jumlah Apotik" },
  { name: "jumlahPoliklinikBalaiKesehatan", label: "Jumlah Poliklinik" },
  { name: "jumlahPolindes", label: "Jumlah Polindes" },
  { name: "jumlahPosyandu", label: "Jumlah Posyandu" },
  { name: "jumlahPuskesmasPembantu", label: "Jumlah Pustu" },
  { name: "jumlahPuskesmasRawatInap", label: "Jumlah Puskesmas Rawat Inap" },
  {
    name: "jumlahPuskesmasTanpaRawatInap",
    label: "Jumlah Puskesmas Non Rawat Inap",
  },
  { name: "jumlahRumahSakit", label: "Jumlah Rumah Sakit" },
  { name: "jumlahRumahSakitBersalin", label: "Jumlah RS Bersalin" },
] as const;
