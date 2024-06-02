"use client";

import { basicData } from "@/components/editor/basic-data";
import { billFrom } from "@/components/editor/bill-from";
import PDFPreview from "@/components/pdf-preview";
import { useDebounce } from "@react-hook/debounce";
import dayjs, { Dayjs } from "dayjs";
import "dayjs/locale/cs";
import "swiper/css";
import "swiper/css/pagination";
import { Pagination } from "swiper/modules";
import { Swiper, SwiperSlide } from "swiper/react";

export interface InvoiceBusiness {
  label: string;
  ico: string;
  dic: string;
  addrLine1:string;
  addrLine2: string;
  street?: string;
  city?: string;
  postalCode: string;
  country: string;
}

export interface Form {
  type: string;
  number: string;
  issueDate: Dayjs | null;
  dueDate: Dayjs | null;
  paymentMethod: string;
  bankAccountNumber: string;
  billFrom: InvoiceBusiness;
  billTo: InvoiceBusiness;
  items: Array<{ name: string; price: string; ammount: string; total: string }>;
}

const steps = [basicData, billFrom];

export default function Editor() {
  const [form, setForm] = useDebounce<Form>(
    {
      type: "bez-dph",
      number: `${dayjs().format("YYYYMM")}0001`,
      issueDate: dayjs(),
      dueDate: dayjs().add(14, "day"),
      paymentMethod: "Bankovní převod",
      bankAccountNumber: "",
      billFrom: {
        label: "",
        ico: "",
        dic: "",
        addrLine1: "",
        addrLine2: "",
        street: "",
        city: "",
        postalCode: "",
        country: "",
      },
      billTo: {
        label: "",
        ico: "",
        dic: "",
        addrLine1: "",
        addrLine2: "",
        street: "",
        city: "",
        postalCode: "",
        country: "",
      },
      items: [],
    },
    500
  );

  return (
    <div className="flex flex-row flex-1">
      <Swiper
        pagination={true}
        modules={[Pagination]}
        className="flex-1 flex flex-col select-none"
      >
        {steps.map((step) => (
          <SwiperSlide key={step.label}>
            <step.body form={form} setForm={setForm} key={step.label} />
          </SwiperSlide>
        ))}
      </Swiper>
      <PDFPreview form={form} />
    </div>
  );
}
