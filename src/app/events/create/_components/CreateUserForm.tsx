import {
  FormControl,
  FormHelperText,
  InputLabel,
  OutlinedInput,
  Select,
  Input,
} from "@mui/material";
import { Controller, useForm } from "react-hook-form";
import type { SubmitHandler } from "react-hook-form";

type Inputs = {
  email: string;
  mobile: string;
  name: string;
  preferredName: string;
  birthYear: string;
  gender: string;
  maritalStatus: string;
  residentialDistrict: number;
  skills: string[];
  volunteerStatus: string;
  preferredStartDate: Date;
  preferredCommunication: string;
  emergencyName: string;
  emergencyRelationship: string;
  emergencyPhone: string;
};

const CreateUserForm = () => {
  const {
    register,
    handleSubmit,
    watch,
    control,
    formState: { errors },
  } = useForm<Inputs>();
  const onSubmit: SubmitHandler<Inputs> = (data) => console.log(data);

  // console.log(watch("example")); // watch input value by passing the email of it

  return (
    /* "handleSubmit" will validate your inputs before invoking "onSubmit" */
    <form onSubmit={handleSubmit(onSubmit)}>
      <Controller
        name="email"
        control={control}
        render={({ field }) => {
          return (
            <FormControl fullWidth sx={{ m: 1 }}>
              <InputLabel htmlFor="email">Email</InputLabel>
              <OutlinedInput id="email" label="Email" {...field} />
              {errors.email && (
                <FormHelperText id="component-error-text">
                  This field is required
                </FormHelperText>
              )}
            </FormControl>
          );
        }}
      />

      <Controller
        name="name"
        control={control}
        render={({ field }) => {
          return (
            <FormControl fullWidth sx={{ m: 1 }}>
              <InputLabel htmlFor="name">Full name</InputLabel>
              <OutlinedInput id="name" label="Name" {...field} />
              {errors.name && (
                <FormHelperText id="component-error-text">
                  This field is required
                </FormHelperText>
              )}
            </FormControl>
          );
        }}
      />

      <Controller
        name="preferredName"
        control={control}
        render={({ field }) => {
          return (
            <FormControl fullWidth sx={{ m: 1 }}>
              <InputLabel htmlFor="preferredName">Preferred name</InputLabel>
              <OutlinedInput
                id="preferredName"
                label="PreferredName"
                {...field}
              />
              {errors.preferredName && (
                <FormHelperText id="component-error-text">
                  This field is required
                </FormHelperText>
              )}
            </FormControl>
          );
        }}
      />

      <Controller
        name="birthYear"
        control={control}
        render={({ field }) => {
          return (
            <FormControl fullWidth sx={{ m: 1 }}>
              <InputLabel htmlFor="birthYear">Birth year</InputLabel>
              <OutlinedInput
                id="birthYear"
                label="BirthYear"
                type="number"
                {...field}
              />
              {errors.birthYear && (
                <FormHelperText id="component-error-text">
                  This field is required
                </FormHelperText>
              )}
            </FormControl>
          );
        }}
      />
      {/* <Controller
        name="gender"
        control={control}
        render={({ field }) => (
          <Select
            {...field}
            options={[
              { value: "male", label: "male" },
              { value: "female", label: "feamle" },
              { value: "other", label: "other" },
            ]}
          />
        )}
      /> */}

      {/* register your input into the hook by invoking the "register" function
      <input defaultValue="test" {...register("example")} /> */}

      {/* include validation with required or other standard HTML validation rules */}
      {/* <input {...register("exampleRequired", { required: true })} /> */}
      {/* errors will return when field validation fails  */}
      {/* {errors.exampleRequired && <span>This field is required</span>} */}

      <input type="submit" />
    </form>
  );
};

export default CreateUserForm;
