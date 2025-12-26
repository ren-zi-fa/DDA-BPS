"use client";
import {
  InputNumericField,
  InputTextField,
} from "@/components/common/boilerplate/InputField";
import { Button } from "@/components/ui/button";
import { useFormPersistSession } from "@/helper/sessionField";
import { KecamatanForm, KecamatanSchema } from "@/schema";
import { zodResolver } from "@hookform/resolvers/zod";
import { FormProvider, useForm } from "react-hook-form";
import { motion } from "framer-motion";
import {
  fieldInformasiKecamatan,
  JmlhnagariFields,
  saranaKesehatanFields,
  saranaPendidikanFields,
  saranaPeribadatanFields,
} from "./fields";
import NagariField from "./NagariField";
import JorongField from "./JorongField";
import PasarField from "./pasarField";
import { toast } from "sonner";
import {
  AlertDialog,
  AlertDialogTrigger,
  AlertDialogContent,
  AlertDialogHeader,
  AlertDialogTitle,
  AlertDialogDescription,
  AlertDialogFooter,
  AlertDialogCancel,
  AlertDialogAction,
} from "@/components/ui/alert-dialog";
import { useState } from "react";

interface Iprops {
  nama_kec: string;
}

const URL = "/api/kecamatan";
export default function FormKecamatan({ nama_kec }: Iprops) {
  const [open, setOpen] = useState(false);
  const [loading, setLoading] = useState(false);
  const form = useForm<KecamatanForm>({
    resolver: zodResolver(KecamatanSchema),
    defaultValues: {
      luas_kecamatan: "",
      ketinggian_permukaan_laut: "",
      batas_kec_barat: "",
      batas_kec_selatan: "",
      batas_kec_timur: "",
      batas_kec_utara: "",
      jmlh_nagari: 0,
      jmlh_jorong: 0,
      nama_camat: "",
      nagari: [{ kepala_nagari: "", nama_nagari: "" }],
      jorong: [{ kepala_jorong: "", nama_jorong: "" }],

      sarana_peribadatan: {
        jumlahMesjid: 0,
        jumlahGerejaKatolik: 0,
        jumlahGerejaProtestan: 0,
        jumlahMushala: 0,
        jumlahWihara: 0,
      },
      gizi_buruk: { jumlah_gizi_buruk: 0 },
      sarana_kesehatan: {
        jumlahApotik: 0,
        jumlahPoliklinikBalaiKesehatan: 0,
        jumlahPolindes: 0,
        jumlahPosyandu: 0,
        jumlahPuskesmasPembantu: 0,
        jumlahPuskesmasRawatInap: 0,
        jumlahPuskesmasTanpaRawatInap: 0,
        jumlahRumahSakit: 0,
        jumlahRumahSakitBersalin: 0,
      },
      sarana_pendidikan: {
        jumlahMAN: 0,
        jumlahMI: 0,
        jumlahMTsn: 0,
        jumlahRA: 0,
        jumlahSD: 0,
        jumlahSMA: 0,
        jumlahSMK: 0,
        jumlahSMP: 0,
        jumlahTK: 0,
      },
      pasar: [{ nama: "", hari: "" }],
    },
  });

  useFormPersistSession(form, `formKecamatan ${nama_kec}`);
  const onSubmit = async (data: KecamatanForm) => {
    try {
      setLoading(true);

      const res = await fetch(`${URL}/${nama_kec}`, {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(data),
      });

      const result = await res.json();

      if (!res.ok) {
        throw new Error(result.message || "Terjadi kesalahan server");
      }

      setOpen(false);

      toast.success(result.message || "Berhasil", {
        className: "bg-green-600 text-white",
        position: "top-center",
      });

      form.reset();
    } catch (err: any) {
      setOpen(false);
      toast.error(err.message || "Gagal mengirim data", {
        className: "bg-red-600 text-white",
        position: "top-center",
      });
    } finally {
      setLoading(false);
    }
  };

  return (
    <>
      <div className="flex flex-col">
        <div className="sticky top-0 z-30 bg-white border-b px-6 py-4">
          <h1 className="text-xl font-semibold capitalize text-slate-800">
            Input Data Kecamatan: {nama_kec}
          </h1>
          <p className="text-sm text-slate-500">
            Isi data secara berurutan. Semua kolom wajib diisi.
          </p>
          <p className="text-sm text-red-500">
            Data Kecamatan Tidak Bisa Di Inputkan 2 x pada form yg sama, harap
            hati hati
          </p>
        </div>

        <motion.div
          className=" p-4"
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ duration: 0.3 }}
        >
          <div className="">
            <FormProvider {...form}>
              <form
                className="mx-auto space-y-6 bg-white p-6 rounded-xl shadow-sm"
                onSubmit={form.handleSubmit(onSubmit)}
              >
                <section>
                  <h2 className="text-lg font-medium text-slate-700 border-b pb-2">
                    Informasi Umum Kecamatan
                  </h2>

                  <div className="border rounded-sm space-y-4 p-4 shadow-sm">
                    {fieldInformasiKecamatan.map((field) => (
                      <InputTextField
                        key={field.name}
                        name={field.name}
                        label={field.label}
                        form={form}
                      />
                    ))}
                  </div>
                </section>
                <section>
                  <h2 className="text-lg font-medium text-slate-700 border-b pb-2">
                    Informasi Jumlah Nagari dan Jorong {nama_kec}
                  </h2>
                  <div className="border rounded-sm space-y-4 p-4 shadow-sm">
                    {JmlhnagariFields.map((field) => (
                      <InputNumericField
                        key={field.name}
                        name={field.name}
                        label={field.label}
                        form={form}
                      />
                    ))}
                  </div>
                </section>
                {/* nagari */}
                <NagariField form={form} nama_kec={nama_kec} />
                {/* jorong */}
                <JorongField form={form} nama_kec={nama_kec} />
                {/* Sarana Pendidikan  */}
                <section>
                  <h2 className="text-lg font-medium text-slate-700 border-b pb-2">
                    Informasi Jumlah Sarana Pendidikan {nama_kec}
                  </h2>
                  <div className="border rounded-sm space-y-4 p-4 shadow-sm">
                    {saranaPendidikanFields.map((item) => (
                      <InputNumericField
                        key={item.name}
                        name={`sarana_pendidikan.${item.name}`}
                        label={item.label}
                        form={form}
                      />
                    ))}
                  </div>
                </section>

                {/* Sarana Kesehatan  */}
                <section>
                  <h2 className="text-lg font-medium text-slate-700 border-b pb-2">
                    Informasi Jumlah Sarana Kesehatan {nama_kec}
                  </h2>
                  <div className="border rounded-sm space-y-4 p-4 shadow-sm">
                    {saranaKesehatanFields.map((item) => (
                      <InputNumericField
                        key={item.name}
                        name={`sarana_kesehatan.${item.name}`}
                        label={item.label}
                        form={form}
                      />
                    ))}
                  </div>
                </section>
                <section>
                  <h2 className="text-lg font-medium text-slate-700 border-b pb-2">
                    Informasi Jumlah Gizi Buruk {nama_kec}
                  </h2>
                  <div className="border rounded-sm space-y-4 p-4 shadow-sm">
                    <InputNumericField
                      name="gizi_buruk.jumlah_gizi_buruk"
                      label="Jumlah Gizi Buruk"
                      form={form}
                    />
                  </div>
                </section>
                {/* Gizi Buruk */}

                {/* Sarana Peribadatan  */}
                <section>
                  <h2 className="text-lg font-medium text-slate-700 border-b pb-2">
                    Informasi Jumlah Peribadatan {nama_kec}
                  </h2>
                  <div className="border rounded-sm space-y-4 p-4 shadow-sm">
                    {saranaPeribadatanFields.map((item) => (
                      <InputNumericField
                        key={item.name}
                        name={`sarana_peribadatan.${item.name}`}
                        label={item.label}
                        form={form}
                      />
                    ))}
                  </div>
                </section>
                {/* Pasar */}
                <PasarField form={form} nama_kec={nama_kec} />
                {/* end field */}
                <AlertDialog open={open} onOpenChange={setOpen}>
                  <AlertDialogTrigger asChild>
                    <Button type="button" className="w-full">
                      Simpan Data
                    </Button>
                  </AlertDialogTrigger>

                  <AlertDialogContent>
                    <AlertDialogHeader>
                      <AlertDialogTitle>
                        Konfirmasi Penyimpanan
                      </AlertDialogTitle>
                      <AlertDialogDescription>
                        Data kecamatan <b>{nama_kec}</b> tidak bisa diinput dua
                        kali. Pastikan semua data sudah benar.
                      </AlertDialogDescription>
                    </AlertDialogHeader>

                    <AlertDialogFooter>
                      <AlertDialogCancel disabled={loading}>
                        Batal
                      </AlertDialogCancel>

                      <AlertDialogAction
                        disabled={loading}
                        onClick={form.handleSubmit(onSubmit)}
                      >
                        {loading ? "Menyimpan..." : "Ya, Simpan"}
                      </AlertDialogAction>
                    </AlertDialogFooter>
                  </AlertDialogContent>
                </AlertDialog>
              </form>
            </FormProvider>
          </div>
        </motion.div>
      </div>
    </>
  );
}
