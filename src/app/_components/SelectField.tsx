import {
  FormControl,
  FormHelperText,
  InputLabel,
  ListItemText,
  MenuItem,
  Select,
} from "@mui/material";
import { camelCase } from "lodash";
import { nanoid } from "nanoid";
import { Controller } from "react-hook-form";
import type { Control } from "react-hook-form";

interface SelectOption {
  label: string;
  value: string | number;
}

export interface SelectFieldProps {
  // eslint-disable-next-line @typescript-eslint/no-explicit-any
  control: Control<any>;
  label: string;
  errorMessage?: string;
  className?: string;
  options: SelectOption[];
  multiple?: boolean;
}

const SelectField = ({
  control,
  label,
  className,
  options,
  multiple,
}: SelectFieldProps) => {
  return (
    <div className={className ?? ""}>
      <Controller
        name={camelCase(label)}
        control={control}
        defaultValue={options[0]?.value}
        render={({ field, fieldState }) => {
          return (
            <FormControl fullWidth sx={{ m: 1 }}>
              <InputLabel htmlFor={camelCase(label)}>{label}</InputLabel>
              <Select
                id={camelCase(label)}
                label={label}
                defaultValue={[]}
                fullWidth
                multiple={multiple ?? false}
                {...(multiple && {
                  // eslint-disable-next-line @typescript-eslint/no-explicit-any
                  renderValue: (selected: Array<any>) => selected.join(","),
                })}
                {...field}
              >
                {options.map((option) => {
                  return (
                    <MenuItem key={nanoid()} value={option.value}>
                      <ListItemText primary={option.label} />
                    </MenuItem>
                  );
                })}
              </Select>
              {fieldState.invalid && (
                <FormHelperText
                  id={`${camelCase(label)}-error`}
                  error={fieldState.invalid}
                >
                  {fieldState.error?.message ?? "This field is required"}
                </FormHelperText>
              )}
            </FormControl>
          );
        }}
      />
    </div>
  );
};

export default SelectField;
