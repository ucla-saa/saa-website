import React from "react";
import { FormControl, InputLabel, MenuItem, Select } from "@mui/material";
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
  const generateSingleOptions = () => {
    return options.map((option: any) => {
      return (
        <MenuItem key={option.value} value={option.value}>
          {option.label}
        </MenuItem>
      );
    });
  };

  return (
    <React.Fragment>
        <FormControl fullWidth size="small">
            <InputLabel>{label}</InputLabel>
        <Controller
            render={({ field: { onChange, value } }) => (
                <Select 
                    label={label} 
                    onChange={onChange} 
                    value={value}
                >
                    {generateSingleOptions()}
                </Select>
            )}
            control={control}
            name={name}
        />
        </FormControl>
    </React.Fragment>
  );
};