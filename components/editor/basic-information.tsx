import { Form } from "@/components/editor";
import { TextField } from "@mui/material";
import FormControl from "@mui/material/FormControl";
import InputLabel from "@mui/material/InputLabel";
import MenuItem from "@mui/material/MenuItem";
import Select from "@mui/material/Select";
import { Dispatch, SetStateAction } from "react";
import DatePickers from "@/components/editor/date-pickers";

export const basicInformation = {
  label: "1. Základní údaje",
  body: ({
    form,
    setForm,
  }: {
    form: Form;
    setForm: Dispatch<SetStateAction<Form>>;
  }) => (
    <div className="flex flex-col divide-y">
      <div className="grid grid-cols-1 md:grid-cols-2 gap-4 p-4">
        <FormControl variant="filled">
          <InputLabel id="type-select">Druh faktury</InputLabel>
          <Select
            label="Druh faktury"
            labelId="type-select"
            value={form.type}
            onChange={(event) => setForm({ ...form, type: event.target.value })}
          >
            <MenuItem value={"bez-dph"}>
              Faktura bez DPH (nejsem plátce DPH)
            </MenuItem>
          </Select>
        </FormControl>
        <TextField
          label="Evidenční číslo"
          variant="filled"
          defaultValue={form.number}
          onChange={(event) => setForm({ ...form, number: event.target.value })}
        />
      </div>
      <DatePickers form={form} setForm={setForm} />
      <div className="grid grid-cols-1 md:grid-cols-2 gap-4 p-4">
        <FormControl variant="filled">
          <InputLabel id="payment-method-label">Forma úhrady</InputLabel>
          <Select
            label="Forma úhrady"
            labelId="payment-method-label"
            value={form.paymentMethod}
            onChange={(event) =>
              setForm({ ...form, paymentMethod: event.target.value as string })
            }
          >
            <MenuItem value={"Hotovost"}>Hotovost</MenuItem>
            <MenuItem value={"Bankovní převod"}>Bankovní převod</MenuItem>
          </Select>
        </FormControl>
        <TextField
          label="Číslo účtu"
          variant="filled"
          defaultValue={form.bankAccountNumber}
          onChange={(event) =>
            setForm({ ...form, bankAccountNumber: event.target.value })
          }
        />
      </div>
    </div>
  ),
};