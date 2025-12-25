import { z } from "zod";

export const BPJSKecamatanSchema = z.object({
  kecamatan: z.string(),
  kelas1: z.float64().min(0),
  kelas2: z.float64().min(0),
  kelas3: z.float64().min(0),
});

export type BpjsKecamatanForm = z.infer<typeof BPJSKecamatanSchema>;

export const BPJSKelompokKecamatanSchema = z.object({
  kecamatan: z.string(),
  penerima_bantuan_iuran: z.float64().min(0),
  bukan_penerima_bantuan_iuran: z.float64().min(0),
});

export type BPJSKelompokKecamatanForm = z.infer<
  typeof BPJSKelompokKecamatanSchema
>;

export const RawatJalanSchema = z.object({
  bulan: z.string(),
  bedah: z.float64().min(0),
  kesehatan_anak: z.float64().min(0),
  poli_kebidanan: z.float64().min(0),
  umum: z.float64().min(0),
  gigi: z.float64().min(0),
});
export type RawatJalanForm = z.infer<typeof RawatJalanSchema>;

export const LanjutanIbnuSinaRawatJalanSchema = z.object({
  bulan: z.string(),
  penyakit_dalam: z.float64().min(0),
  jiwa: z.float64().min(0),
  tht: z.float64().min(0),
  mata: z.float64().min(0),
  neurologi: z.float64().min(0),
  fisioterapi: z.float64().min(0),
});

export type LanjutanIbnuSinaRawatJalanForm = z.infer<
  typeof LanjutanIbnuSinaRawatJalanSchema
>;

export const RawatInapSchema = z.object({
  uraian: z.string(),
  jumlah_pasien: z.float64().min(0),
  hari_rawat: z.float64().min(0),
});

export type RawatInapForm = z.infer<typeof RawatInapSchema>;
export const KelahiranKematianSchema = z.object({
  bulan: z.string(),
  bersalin: z.float64().min(0),
  keguguran: z.float64().min(0),
});

export type KelahiranKematianForm = z.infer<typeof KelahiranKematianSchema>;

export const FasilitasIbnuSinaSchema = z.object({
  fasilitas: z.string(),
  dua_ribu_20: z.float64().min(0),
  dua_ribu_21: z.float64().min(0),
  dua_ribu_22: z.float64().min(0),
  dua_ribu_23: z.float64().min(0),
  dua_ribu_24: z.float64().min(0),
});

export type FasilitasIbnuSinaForm = z.infer<typeof FasilitasIbnuSinaSchema>;

export const LanjutanKelahiranKematianSchema = z.object({
  bulan: z.string(),
  hidup_laki_laki: z.float64().min(0),
  hidup_perempuan: z.float64().min(0),
  mati_laki_laki: z.float64().min(0),
  mati_perempuan: z.float64().min(0),
});

export type LanjutanKelahiranKematianForm = z.infer<
  typeof LanjutanKelahiranKematianSchema
>;
export const KecamatanSchema = z.object({
  nama_kecamatan: z.string(),
  luas_kecamatan: z.string().min(1, "wajib diisi"),
  batas_kec_utara: z.string().min(1, "wajib diisi"),
  batas_kec_selatan: z.string().min(1, "wajib diisi"),
  batas_kec_barat: z.string().min(1, "wajib diisi"),
  batas_kec_timur: z.string().min(1, "wajib diisi"),
  ketinggian_permukaan_laut: z.string().min(1, "wajib diisi"),
});

export type KecamatanForm = z.infer<typeof KecamatanSchema>;
