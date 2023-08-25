import React from "react";
import { FormControl, InputLabel, Checkbox, Select } from "@mui/material";
import { Controller } from "react-hook-form";

export interface Option {
  label: string;
  value: string;
}

export interface FormInputProps {
    name: string;
    control: any;
    label: string;
    setValue?: any;
    options: Option[]
}

export const FormInputDropdown: React.FC<FormInputProps> = ({
  name,
  control,
  label,
  options
}) => {


  return (
    <div style={{width: "20%"}}>
        <FormControl fullWidth size="small">
            <InputLabel>{label}</InputLabel>
        <Controller
            render={({ field: { onChange, value } }) => (
                <Checkbox defaultChecked />
            )}
            control={control}
            name={name}
        />
        </FormControl>
    </div>
  );
}