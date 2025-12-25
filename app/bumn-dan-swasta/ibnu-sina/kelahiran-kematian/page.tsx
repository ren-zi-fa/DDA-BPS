import ButtonBack from "@/components/common/boilerplate/ButtonBack";
import Form1 from "./_components/form1";
import Form2 from "./_components/form2";

export default function Page() {
  return (
    <div className="my-10">
      <h1 className="text-xl text-center font-semibold">DATA KELAHIRAN DAN KEMATIAN IBNU SINA YARSI</h1>
      <ButtonBack linkUrl="/bumn-dan-swasta?tab=ibnu-sina-yarsi" />
      <Form1 />
      <Form2 />
    </div>
  );
}
