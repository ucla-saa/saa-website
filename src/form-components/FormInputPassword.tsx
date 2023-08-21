import { Controller } from "react-hook-form";
import TextField from "@mui/material/TextField";

interface FormInputProps {
    name: string;
    control: any;
    label: string;
    setValue?: any;
}

export const FormInputPassword = ({ name, control, label }: FormInputProps) => {
  return (
    <Controller
      name={name}
      control={control}
      render={({
        field: { onChange, value },
        fieldState: { error },
        formState,
      }) => (
        <TextField
          helperText={error ? error.message : null}
          size="small"
          error={!!error}
          onChange={onChange}
          value={value}
          fullWidth
          label={label}
          variant="outlined"
          type="password"
        />
      )}
    />
  );
};