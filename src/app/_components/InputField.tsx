import {
  FormControl,
  FormHelperText,
  InputAdornment,
  InputLabel,
  OutlinedInput,
} from "@mui/material";
import dayjs from "dayjs";
import { camelCase } from "lodash";
import { Controller } from "react-hook-form";
import type { Control } from "react-hook-form";

export interface InputFieldProps {
  // eslint-disable-next-line @typescript-eslint/no-explicit-any
  control: Control<any>;
  label: string;
  isTextbox?: boolean;
  type?: "textbox" | "date" | "time" | "number";
  className?: string;
  disabled?: boolean;
  // eslint-disable-next-line @typescript-eslint/no-explicit-any
  validation: Record<string, any>;
  endAdornment?: string;
}

const InputField = ({
  control,
  label,
  type,
  className,
  disabled,
  validation,
  endAdornment,
}: InputFieldProps) => {
  return (
    <div className={className ?? ""}>
      <Controller
        name={camelCase(label)}
        control={control}
        rules={validation}
        defaultValue={
          type === "date"
            ? dayjs(new Date()).add(1, "day").format("YYYY-MM-DD")
            : undefined
        }
        render={({ field, fieldState }) => {
          return (
            <FormControl fullWidth sx={{ m: 1 }}>
              <InputLabel htmlFor={camelCase(label)} shrink>
                {label}
              </InputLabel>
              <OutlinedInput
                id={camelCase(label)}
                multiline={type === "textbox"}
                rows={type === "textbox" ? 5 : undefined}
                type={type !== "textbox" ? type : undefined}
                fullWidth
                disabled={disabled ?? false}
                endAdornment={
                  endAdornment ? (
                    <InputAdornment position="end">
                      {endAdornment}
                    </InputAdornment>
                  ) : undefined
                }
                {...field}
              />
              {fieldState.invalid && (
                <FormHelperText
                  id={`${camelCase(label)}-error`}
                  error={fieldState.invalid}
                >
                  {fieldState.error?.message ?? "This field is required."}
                </FormHelperText>
              )}
            </FormControl>
          );
        }}
      />
    </div>
  );
};

export default InputField;
