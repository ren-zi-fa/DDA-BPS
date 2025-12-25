import Form1 from "./_components/form1";
import Form2 from "./_components/form2";
import ButtonBack from "@/components/common/boilerplate/ButtonBack";

export default function Page() {
  return (
    <div className="my-10">
      <h1 className="text-xl text-center font-semibold">PASIEN RAWAT JALAN</h1>
      <ButtonBack linkUrl="/bumn-dan-swasta?tab=ibnu-sina-yarsi" />
      <Form1 />
      <Form2 />
    </div>
  );
}
