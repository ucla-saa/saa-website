import { LocalizationProvider, DatePicker } from "@mui/x-date-pickers";
import { Controller } from "react-hook-form";
import {AdapterDateFns} from '@mui/x-date-pickers/AdapterDateFns'

interface FormInputProps {
    name: string;
    control: any;
    label: string;
    setValue?: any;
}

export const FormInputDate = ({ name, control, label }: FormInputProps) => {
  return (
    <LocalizationProvider dateAdapter={AdapterDateFns}>
      <Controller 
        name={name}
        control={control}
        render={({ field: { onChange, value } }) => (
          <DatePicker value={value} onChange={onChange} />
        )}
      />
    </LocalizationProvider>
  );
};