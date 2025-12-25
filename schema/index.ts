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

export const FasilitasIbnuSinaSchema = z.object({
  fasilitas: z.string(),
  dua_ribu_20: z.float64().min(0),
  dua_ribu_21: z.float64().min(0),
  dua_ribu_22: z.float64().min(0),
  dua_ribu_23: z.float64().min(0),
  dua_ribu_24: z.float64().min(0),
});

export type FasilitasIbnuSinaForm = z.infer<typeof FasilitasIbnuSinaSchema>;
