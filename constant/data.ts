const uraian = [
  { key: 1, label: "VIP" },
  { key: 2, label: "Inap Klas" },
  { key: 3, label: "Inap Interne" },
  { key: 4, label: "Inap Bedah" },
  { key: 5, label: "Inap Mata" },
  { key: 6, label: "Inap Anak" },
  { key: 7, label: "Inap Bayi" },
  { key: 8, label: "Inap Obstetri" },
  { key: 9, label: "Inap Paru" },
];
// gunugn tuleh
// ranah batahan
// koto balingka
// talamau
// pasaman
// kinali
type Jorong = {
  nama: string;
};

type Nagari = {
  nama: string;
  jorong: Jorong[];
};

type Wilayah = {
  kecamatan: string;
  nagari: Nagari[];
};

const wilayah: Wilayah[] = [
  {
    kecamatan: "Gunung Tuleh",
    nagari: [
      {
        nama: "Rabi Jonggor",
        jorong: [
          { nama: "Paraman Ampalu" },
          { nama: "Paraman Ampalu Selatan" },
          { nama: "Paraman Ampalu Utara" },
          { nama: "Paraman Ampalu Barat" },
        ],
      },
      {
        nama: "Seberang Kenaikan",
        jorong: [
          { nama: "Tanjung Durian" },
          { nama: "Sungai Aur I" },
          { nama: "Sungai Aur II" },
          { nama: "Bulu Laga" },
          { nama: "Talang Kuning" },
          { nama: "Guo" },
          { nama: "Siligawan Gadang" },
        ],
      },
      {
        nama: "Bahoras",
        jorong: [
          { nama: "Bandar" },
          { nama: "Huta Tonga" },
          { nama: "Rabi Jonggor" },
          { nama: "Sitabu" },
        ],
      },
      {
        nama: "Ranah Sungai Magelang",
        jorong: [
          { nama: "Sungai Magelang" },
          { nama: "Air Dingin" },
          { nama: "Kampung Pinang" },
          { nama: "Siligawan Kecil" },
        ],
      },
      {
        nama: "Muara Kiawai",
        jorong: [{ nama: "Sudirman" }],
      },
      {
        nama: "Muara Kiawai Barat",
        jorong: [
          { nama: "Simpang Tiga Alin" },
          { nama: "Simpang Tiga Alin Tagak" },
          { nama: "Kampung Alang" },
          { nama: "Kampung Alang Tuleh" },
        ],
      },
      {
        nama: "Muara Kiawai Hilir",
        jorong: [
          { nama: "Kartini" },
          { nama: "Kartini Lobuah Baru" },
          { nama: "Kartini Singkarak" },
          { nama: "Rawa Bangun" },
          { nama: "Kartini Boncah Kobun" },
        ],
      },
    ],
  },
  {
    kecamatan: "Ranah Batahan",
    nagari: [
      {
        nama: "Nagari Batahan",
        jorong: [
          { nama: "Silaping" },
          { nama: "Silaping Baru" },
          { nama: "Silaping Utama" },
          { nama: "Rao-Rao" },
          { nama: "Pagaran Tengah" },
          { nama: "Paninjauan" },
        ],
      },
      {
        nama: "Nagari Batahan Utara",
        jorong: [
          { nama: "Sawah Mudik" },
          { nama: "Sigantang" },
          { nama: "Tanjung Larangan" },
          { nama: "Taming Julu" },
          { nama: "Paraman Sawah" },
          { nama: "Taming Tengah" },
          { nama: "Silayang Julu" },
        ],
      },
      {
        nama: "Nagari Batahan Selatan",
        jorong: [
          { nama: "Siduampan" },
          { nama: "Air Talang" },
          { nama: "Muara Air Talang" },
        ],
      },
      {
        nama: "Nagari Batahan Tengah",

        jorong: [
          { nama: "Muara Mais" },
          { nama: "Silayang" },
          { nama: "Lubuk Gobing" },
          { nama: "Lubuk Gobing Damai" },
          { nama: "Simpang Tolang Baru" },
          { nama: "Simpang Tolang" },
          { nama: "Pintu Padang" },
          { nama: "Gunung Tua" },
        ],
      },
      {
        nama: "Nagari Batahan Barat",

        jorong: [
          { nama: "Kampung Baru" },
          { nama: "Kampung Mesjid" },
          { nama: "Air Napal" },
          { nama: "Taming Batahan" },
          { nama: "Pasir Panjang" },
        ],
      },
      {
        nama: "Nagari Desa Baru",

        jorong: [
          { nama: "Sidomulyo" },
          { nama: "Dadi Mulyo" },
          { nama: "Sepakat Madani" },
          { nama: "Mulyo Rejo Barat" },
          { nama: "Mulyorejo" },
        ],
      },
      {
        nama: "Nagari Desa Baru Barat",

        jorong: [
          { nama: "Karang Rejo" },
          { nama: "Sukorejo" },
          { nama: "Serumpun Saiyo" },
          { nama: "Sukadamai" },
          { nama: "Banjar Jaya" },
        ],
      },
    ],
  },
  {
    kecamatan: "Koto Balingka",
    nagari: [
      {
        nama: "Nagari Parit",
        jorong: [
          { nama: "Parit" },
          { nama: "Batang Lapu" },
          { nama: "Sigalangan" },
          { nama: "Pemukiman Baru I" },
          { nama: "Pemukiman Baru II" },
        ],
      },
      {
        nama: "Nagari Koto Tangah",
        jorong: [
          {
            nama: "Lubuk Gadang",
          },
          { nama: "Lubuk Gadang Utara" },
          { nama: "Lubuk Gadang Selatan" },
          { nama: "Tamiang Ampalu" },
          { nama: "Tamiang Ampalu Utara" },
          { nama: "Ulu Simpang" },
          { nama: "Labuai" },
        ],
      },
      {
        nama: "Nagari koto Tuo",
        jorong: [
          {
            nama: "Setia Baru",
          },
          { nama: "Air Balam" },
          { nama: "Siduampan" },
          { nama: "Kampung Randah" },
          { nama: "batas Tarok" },
          { nama: "PT.BPP II Air Balam" },
        ],
      },
      {
        nama: "Nagari koto Nan Duo",
        jorong: [{ nama: "Simpang" }, { nama: "Air runding" }],
      },
      {
        nama: "Nagari Pematang Panjang",
        jorong: [
          { nama: "Tambang Padang" },
          { nama: "Aek Nabirong" },
          { nama: "Jorong Simaninggir" },
          { nama: "Jorong Aek Garingging" },
          { nama: "Jorong Pegambiran" },
          { nama: "Jorong Rura patontang" },
        ],
      },
      {
        nama: "Nagari Ranah Koto Tinggi",
        jorong: [
          { nama: "Sukarame" },
          { nama: "Air Jernih" },
          { nama: "Tanah Datar" },
        ],
      },
    ],
  },
  {
    kecamatan: "Talamau",
    nagari: [
      {
        nama: "Sinuruik",
        jorong: [
          { nama: "Tombang" },
          { nama: "Harapan Tinggam" },
          { nama: "Paroman" },
          { nama: "Benteng" },
          { nama: "Kemajuan" },
          { nama: "Sianok Pasar Baru" },
          { nama: "Kemakmuran" },
        ],
      },
      {
        nama: "Talu",
        jorong: [
          { nama: "Patomuan" },
          { nama: "Perhimpunan" },
          { nama: "Merdeka" },
        ],
      },
      {
        nama: "Tabek Sirah",
        jorong: [
          { nama: "Tabek Sirah" },
          { nama: "Koto Tinggi" },
          { nama: "Koto Malau" },
        ],
      },
      {
        nama: "Sungai Janiah",
        jorong: [
          { nama: "Sungai Janiah" },
          { nama: "Sungai Janiah Mudiak" },
          { nama: "Sungai Janiah Ilia" },
        ],
      },
      {
        nama: "Kajai",
        jorong: [
          { nama: "Kp. Alang" },
          { nama: "Limpato" },
          { nama: "Lubuak Sariak" },
        ],
      },
      {
        nama: "Kajai Selatan",
        jorong: [
          { nama: "Pasa Lamo" },
          { nama: "Rimbo Batu" },
          { nama: "Kp. Sawah Kajai" },
        ],
      },
      {
        nama: "Simpang Timbo Abu Kajai",
        jorong: [
          { nama: "Mudiak Simpang" },
          { nama: "Timbo Abu" },
          { nama: "Tanjuang Aro" },
          { nama: "Timbo Abu Sepakat Lengkap" },
        ],
      },
    ],
  },
  {
    kecamatan: "Pasaman",
    nagari: [
      {
        nama: "Lingkuang Aua",
        jorong: [
          { nama: "Simpang Ampek" },
          { nama: "Simpang Ampek Kaplingan" },
          { nama: "Simpang Ampek Batang Toman" },
          { nama: "Simpang Ampek Lintang Selatan" },
          { nama: "Kampuang Pasia Simpang Ampek" },
          { nama: "Padang Durian Hijau" },
        ],
      },
      {
        nama: "Lingkuang Aua Timur",
        jorong: [
          { nama: "Kampung Cubadak" },
          { nama: "Kampung Cubadak Timur" },
          { nama: "Kampung Cubadak Barat" },
          { nama: "Kampung Cubadak Baru" },
          { nama: "Rimbo Binuang" },
          { nama: "Rimbo Binuang Timur" },
        ],
      },
      {
        nama: "Lingkuang Aua Baru",
        jorong: [
          { nama: "Pasaman Baru" },
          { nama: "Pasaman Baru Utara" },
          { nama: "Pasaman Baru Selatan" },
          { nama: "Rimbo Janduang" },
        ],
      },
      {
        nama: "Lingkuang Aua Bandarajo",
        jorong: [
          { nama: "Bandarejo" },
          { nama: "Bandarejo Timur" },
          { nama: "Bandarejo Barat" },
        ],
      },
      {
        nama: "Lingkuang Aua Jambak",
        jorong: [
          { nama: "Jambak" },
          { nama: "Padang Sari" },
          { nama: "Budi Luhur" },
        ],
      },
      {
        nama: "Lingkuang Aua Koto Dalam",
        jorong: [
          { nama: "Katimaha" },
          { nama: "Katimaha Utara" },
          { nama: "Katimaha Hilia" },
        ],
      },
      {
        nama: "Lingkuang Aua Barat",
        jorong: [
          { nama: "Batang Biyu" },
          { nama: "Batang Biyu Timur" },
          { nama: "Batang Biyu Tangah Padang" },
          { nama: "Batang Biyu Rimbo Gantiang" },
        ],
      },
      {
        nama: "Lingkuang Aua Hilia",
        jorong: [{ nama: "Tanjung Pangka" }, { nama: "Tanjung Pangka Hilia" }],
      },
      {
        nama: "Aua Kuniang",
        jorong: [
          { nama: "Padang Tujuah" },
          { nama: "Guguak Tigo Talao" },
          { nama: "Jambu Baru" },
          { nama: "Koto Alam Padang Buli-Buli" },
        ],
      },
      {
        nama: "Pinaga Aua Kuniang",
        jorong: [
          { nama: "Pinaga" },
          { nama: "Pinaga Amanah" },
          { nama: "Pinaga Sakato" },
          { nama: "Pinaga Aia Parik" },
          { nama: "Pinaga Baru" },
        ],
      },
      {
        nama: "Sukomananti Aua Kuniang",
        jorong: [
          { nama: "Sukomananti" },
          { nama: "Sukomananti Mudiak" },
          { nama: "Tapalan Mudiak Sukomananti" },
          { nama: "Tapalan Ilia Sukomananti" },
        ],
      },
      {
        nama: "Lubuak Landua Aua Kuniang",
        jorong: [
          { nama: "Lubuak Landua" },
          { nama: "Kampuang Baru Lubuak Landua" },
          { nama: "Ladang Rimbo Lubuak Landua" },
        ],
      },
      {
        nama: "Lembah Binuang Aua Kuniang",
        jorong: [
          { nama: "Lembah Binuang" },
          { nama: "Simpang Patai Lembah Binuang" },
          { nama: "Bukik Nilam" },
          { nama: "Plasma Tigo Bukik Nilam" },
        ],
      },
      {
        nama: "Aia Gadang",
        jorong: [{ nama: "Durian Hutan" }, { nama: "Batang Umpai" }],
      },
      {
        nama: "Aia Gadang Barat",
        jorong: [
          { nama: "Pasia Bintungan" },
          { nama: "Pasia Bintungan Timur" },
          { nama: "Pasia Bintungan Barat" },
          { nama: "Labuah Luruih" },
          { nama: "Labuah Luruih Baru" },
        ],
      },
      {
        nama: "Aia Gadang Timur",
        jorong: [
          { nama: "Batang Lingkin" },
          { nama: "Batang Lingkin Utara" },
          { nama: "Batang Lingkin Selatan" },
          { nama: "Batang Lingkin Timur" },
          { nama: "Tongar" },
        ],
      },
    ],
  },
  {
    kecamatan: "Kinali",
    nagari: [
      {
        nama: "Kinali",
        jorong: [
          { nama: "Langgam Sejati" },
          { nama: "Durian Kilangan" },
          { nama: "Langgam" },
          { nama: "Kinali" },
          { nama: "Langgam Jaya" },
        ],
      },
      {
        nama: "Langgam Sepakat",
        jorong: [
          { nama: "Langgam Sepakat Timur" },
          { nama: "Langgam Sepakat Tengah" },
          { nama: "Langgam Sepakat Barat" },
        ],
      },
      {
        nama: "Langgam Saiyo",
        jorong: [
          { nama: "Langgam Saiyo" },
          { nama: "Balero Langgam" },
          { nama: "Panco Saiyo" },
        ],
      },
      {
        nama: "Ampek Koto",
        jorong: [
          { nama: "Japau Tempurung" },
          { nama: "Sungai Paku" },
          { nama: "Kampuang Pisang" },
        ],
      },
      {
        nama: "Ampek Koto Barat",
        jorong: [
          { nama: "Ampek Koto Barat" },
          { nama: "Durian Batu Saiyo" },
          { nama: "Tampunik Padang Rajo Sakato" },
          { nama: "Tambun Air Putih Sepakat" },
        ],
      },
      {
        nama: "Mudiak Labuah",
        jorong: [{ nama: "Sidomulyo" }, { nama: "Mudiak Labuah" }],
      },
      {
        nama: "Tandikek",
        jorong: [{ nama: "Tandikek" }, { nama: "Sumber Agung" }],
      },
      {
        nama: "Bancah Kariang",
        jorong: [
          { nama: "Kampung Baru" },
          { nama: "Wonosari" },
          { nama: "Mekar Sari" },
        ],
      },
      {
        nama: "Bunuik",
        jorong: [
          { nama: "Bunuik" },
          { nama: "Bunuik Raya" },
          { nama: "Padang Jiraik" },
        ],
      },
      {
        nama: "Padang Candauh",
        jorong: [
          { nama: "Padang Candauh" },
          { nama: "Padang Candauh Sarimulyo" },
          { nama: "Padang Candauh Sidomukti" },
        ],
      },
      {
        nama: "Limau Puruik",
        jorong: [
          { nama: "Limau Puruik" },
          { nama: "Limau Puruik Timur" },
          { nama: "Limau Puruik Barat" },
        ],
      },
      {
        nama: "Koto Gadang Jaya",
        jorong: [
          { nama: "Koto Gadang" },
          { nama: "Mulyosari Koto Gadang" },
          { nama: "Tirto Rahayu Koto Gadang" },
          { nama: "Margo Rejo Koto Gadang" },
        ],
      },
      {
        nama: "Anam Koto Selatan",
        jorong: [
          { nama: "Anam Koto Selatan" },
          { nama: "Limpato" },
          { nama: "Kembar Sari" },
        ],
      },
      {
        nama: "Bandua Balai",
        jorong: [
          { nama: "Bandua Balai" },
          { nama: "Tanjung Medan" },
          { nama: "Ujung Pandang" },
        ],
      },
      {
        nama: "Sigunanti",
        jorong: [
          { nama: "Aia Maruwok" },
          { nama: "Koto Palanduak" },
          { nama: "Durian Kandang Koto Marapak" },
          { nama: "Bancah Sopan" },
        ],
      },
      {
        nama: "Anam Koto Utara",
        jorong: [
          { nama: "Anam Koto Utara" },
          { nama: "Koto Batagak" },
          { nama: "Pilihan" },
          { nama: "Famili" },
        ],
      },
      {
        nama: "Katiagan",
        jorong: [{ nama: "Katiagan" }, { nama: "Mandangin" }],
      },
    ],
  },
];

export { uraian, wilayah };
