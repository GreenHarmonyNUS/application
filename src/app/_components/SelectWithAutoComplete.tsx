import { Autocomplete, TextField } from "@mui/material";
import type { AutocompleteRenderInputParams } from "@mui/material";
import type { InputFieldProps } from "./InputField";
import { nanoid } from "nanoid";
import { Controller } from "react-hook-form";
import { camelCase } from "lodash";

interface AutoCompleteOption {
  label: string;
  value: string;
}

interface SelectWithAutoCompleteProps extends InputFieldProps {
  options: AutoCompleteOption[];
}

const SelectWithAutoComplete = ({
  options,
  control,
  label,
}: SelectWithAutoCompleteProps) => {
  return (
    <Controller
      name={camelCase(label)}
      control={control}
      render={({ field }) => {
        return (
          <Autocomplete
            key={nanoid()}
            disablePortal
            id={camelCase(label)}
            options={options}
            sx={{ width: 300 }}
            renderInput={(params: AutocompleteRenderInputParams) => (
              <TextField {...params} label={params.id} />
            )}
            getOptionLabel={(option: AutoCompleteOption) => option.value || ""}
            fullWidth={true}
            autoHighlight={true}
            {...field}
          />
        );
      }}
    />
  );
};

export default SelectWithAutoComplete;
