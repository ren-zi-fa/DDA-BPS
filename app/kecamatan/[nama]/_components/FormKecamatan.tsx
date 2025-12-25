"use client";
import {
  InputNumericField,
  InputTextField,
} from "@/components/common/boilerplate/InputField";
import { Button } from "@/components/ui/button";
import { useFormPersistSession } from "@/helper/sessionField";
import { KecamatanForm, KecamatanSchema } from "@/schema";
import { zodResolver } from "@hookform/resolvers/zod";
import { FormProvider, useFieldArray, useForm } from "react-hook-form";
import { motion } from "framer-motion";
import { NagariFieldCompletion } from "./NagariField";
import { wilayah } from "@/constant/data";
import { fieldInformasiKecamatan, JmlhnagariFields } from "./fields";
import {
  FormControl,
  FormField,
  FormItem,
  FormLabel,
  FormMessage,
} from "@/components/ui/form";
import { Input } from "@/components/ui/input";

interface Iprops {
  nama_kec: string;
}

const URL = "/api/";
export default function FormKecamatan({ nama_kec }: Iprops) {
  console.log(nama_kec);
  const form = useForm<KecamatanForm>({
    resolver: zodResolver(KecamatanSchema),
    defaultValues: {
      nama_kecamatan: "",
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
    },
  });

  useFormPersistSession(form, `formKecamatan ${nama_kec}`);

  const onSubmit = async (data: KecamatanForm) => {
    alert(JSON.stringify(data));

    await fetch(URL, {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify(data),
    });
    form.reset();
  };

  console.log(form.formState.errors);
  const { fields, append, remove } = useFieldArray({
    control: form.control,
    name: "nagari",
  });

  const {
    fields: jorongFileds,
    append: appendJorong,
    remove: removeJorong,
  } = useFieldArray({
    control: form.control,
    name: "jorong",
  });

  return (
    <>
      <div className="flex flex-col">
        <div className="sticky top-0 z-10 bg-white border-b px-6 py-4">
          <h1 className="text-xl font-semibold capitalize text-slate-800">
            Input Data Kecamatan: {nama_kec}
          </h1>
          <p className="text-sm text-slate-500">
            Isi data secara berurutan. Semua kolom wajib diisi.
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
              <form className="mx-auto space-y-6 bg-white p-6 rounded-xl shadow-sm">
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
                <section>
                  <h2 className="text-lg font-medium text-slate-700 border-b pb-2">
                    Informasi Nama dan Kepala Nagari {nama_kec}
                  </h2>
                  <div className="grid grid-cols-1 gap-2 ">
                    {fields.map((item, index) => (
                      <div key={item.id} className="space-y-2 border p-4 ">
                        <FormField
                          control={form.control}
                          name={`nagari.${index}.nama_nagari`}
                          render={({ field }) => (
                            <>
                              <h1>{index + 1} </h1>
                              <FormItem className="border-t pt-2">
                                <FormLabel> Nama Nagari</FormLabel>
                                <FormControl>
                                  <Input {...field} />
                                </FormControl>
                                <FormMessage />
                              </FormItem>
                            </>
                          )}
                        />

                        <FormField
                          control={form.control}
                          name={`nagari.${index}.kepala_nagari`}
                          render={({ field }) => (
                            <FormItem>
                              <FormLabel>Kepala Nagari</FormLabel>
                              <FormControl>
                                <Input {...field} />
                              </FormControl>
                              <FormMessage />
                            </FormItem>
                          )}
                        />

                        <Button
                          type="button"
                          variant="destructive"
                          onClick={() => remove(index)}
                        >
                          Hapus
                        </Button>
                      </div>
                    ))}
                    <Button
                      type="button"
                      variant="outline"
                      className="bg-blue-600 hover:bg-blue-500 text-white"
                      onClick={() =>
                        append({
                          nama_nagari: "",
                          kepala_nagari: "",
                        })
                      }
                    >
                      + Tambah Nagari
                    </Button>
                  </div>
                  {/* end nagari */}
                </section>
                {/* jorong */}
                <section>
                  <h2 className="text-lg font-medium text-slate-700 border-b pb-2">
                    Informasi Nama dan Kepala Jorong {nama_kec}
                  </h2>
                  <div className="grid grid-cols-1 gap-2">
                    {jorongFileds.map((item, index) => (
                      <div key={item.id} className="space-y-2 border p-4 ">
                        <FormField
                          control={form.control}
                          name={`jorong.${index}.nama_jorong`}
                          render={({ field }) => (
                            <>
                              <h1>{index + 1} </h1>
                              <FormItem className="border-t pt-2">
                                <FormLabel>Nama Jorong</FormLabel>
                                <FormControl>
                                  <Input {...field} />
                                </FormControl>
                                <FormMessage />
                              </FormItem>
                            </>
                          )}
                        />

                        <FormField
                          control={form.control}
                          name={`jorong.${index}.kepala_jorong`}
                          render={({ field }) => (
                            <FormItem>
                              <FormLabel>Kepala Jorong</FormLabel>
                              <FormControl>
                                <Input {...field} />
                              </FormControl>
                              <FormMessage />
                            </FormItem>
                          )}
                        />

                        <Button
                          type="button"
                          variant="destructive"
                          onClick={() => removeJorong(index)}
                        >
                          Hapus
                        </Button>
                      </div>
                    ))}

                    <Button
                      type="button"
                      variant="outline"
                      className="bg-green-600 hover:bg-green-500 text-white"
                      onClick={() =>
                        appendJorong({
                          nama_jorong: "",
                          kepala_jorong: "",
                        })
                      }
                    >
                      + Tambah Jorong
                    </Button>
                  </div>
                </section>

                <Button type="submit" className="w-full">
                  Simpan Data
                </Button>
              </form>
            </FormProvider>
          </div>
        </motion.div>
      </div>
    </>
  );
}
