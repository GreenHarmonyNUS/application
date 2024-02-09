"use client";
import {
  FormControl,
  FormHelperText,
  InputLabel,
  OutlinedInput,
  Select,
  Input,
  MenuItem,
  Button,
} from "@mui/material";
import { Controller, useForm } from "react-hook-form";
import type { SubmitHandler } from "react-hook-form";
import { UserSchema } from "prisma/generated/zod";

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

const NewUserPage = () => {
  const {
    register,
    handleSubmit,
    watch,
    control,
    formState: { errors },
  } = useForm<Inputs>();
  const onSubmit: SubmitHandler<Inputs> = (data) => console.log(data);

  const getUser = () => {
    return UserSchema.parse({});
  };

  // console.log(watch("example")); // watch input value by passing the email of it

  return (
    /* "handleSubmit" will validate your inputs before invoking "onSubmit" */
    <form onSubmit={handleSubmit(onSubmit)} className="m-2">
      <Controller
        name="email"
        control={control}
        rules={{
          required: "This field is required",
          pattern: {
            value: /^[^\s@]+@[^\s@]+\.[^\s@]+$/,
            message: "Please enter a valid email address",
          },
        }}
        render={({ field }) => (
          <FormControl fullWidth sx={{ m: 1 }}>
            <InputLabel htmlFor="email">Email</InputLabel>
            <OutlinedInput type="email" id="email" label="Email" {...field} />
            {errors.email && (
              <FormHelperText id="component-error-text">
                {errors.email.message}
              </FormHelperText>
            )}
          </FormControl>
        )}
      />

      <Controller
        name="phone"
        control={control}
        rules={{
          required: "This field is required",
          pattern: {
            value: /^\d{8}$/,
            message: "Please enter a valid 8-digit phone number",
          },
        }}
        render={({ field }) => (
          <FormControl fullWidth sx={{ m: 1 }}>
            <InputLabel htmlFor="phone">Phone</InputLabel>
            <OutlinedInput id="phone" label="Phone" {...field} />
            {errors.phone && (
              <FormHelperText id="component-error-text">
                {errors.phone.message}
              </FormHelperText>
            )}
          </FormControl>
        )}
      />

      <Controller
        name="name"
        control={control}
        render={({ field }) => {
          return (
            <FormControl fullWidth sx={{ m: 1 }}>
              <InputLabel htmlFor="name">Full name</InputLabel>
              <OutlinedInput id="name" label="Name" type="text" {...field} />
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
                type="text"
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
        name="gender"
        control={control}
        render={({ field }) => (
          <FormControl fullWidth sx={{ m: 1 }}>
            <InputLabel htmlFor="gender">Gender</InputLabel>
            <Select id="gender" label="Gender" {...field}>
              <MenuItem value="male">Male</MenuItem>
              <MenuItem value="female">Female</MenuItem>
              <MenuItem value="other">Other</MenuItem>
            </Select>
            {errors.gender && (
              <FormHelperText id="component-error-text">
                This field is required
              </FormHelperText>
            )}
          </FormControl>
        )}
      />
      <Controller
        name="preferredCommunication"
        control={control}
        render={({ field }) => (
          <FormControl fullWidth sx={{ m: 1 }}>
            <InputLabel htmlFor="preferredCommunication">
              Preferred Communication
            </InputLabel>
            <Select
              id="preferredCommunication"
              label="Preferred Communication"
              {...field}
            >
              <MenuItem value="whatsapp">WhatsApp</MenuItem>
              <MenuItem value="telegram">Telegram</MenuItem>
            </Select>
            {errors.preferredCommunication && (
              <FormHelperText id="component-error-text">
                This field is required
              </FormHelperText>
            )}
          </FormControl>
        )}
      />

      <Controller
        name="birthYear"
        control={control}
        rules={{
          required: "This field is required",
          pattern: {
            value: /^\d{4}$/,
            message: "Please enter a valid 4-digit year",
          },
          validate: {
            validYear: (value) => {
              const currentYear = new Date().getFullYear();
              const enteredYear = parseInt(value, 10);
              return (
                enteredYear <= currentYear ||
                "Year cannot be later than the current year"
              );
            },
          },
        }}
        render={({ field }) => (
          <FormControl fullWidth sx={{ m: 1 }}>
            <InputLabel htmlFor="birthYear">Birth year YYYY </InputLabel>
            <OutlinedInput
              id="birthYear"
              label="BirthYear"
              type="text"
              inputProps={{ inputMode: "numeric", pattern: "[0-9]*" }}
              {...field}
            />
            {errors.birthYear && (
              <FormHelperText id="component-error-text">
                {errors.birthYear.message}
              </FormHelperText>
            )}
          </FormControl>
        )}
      />

      <Controller
        name="preferredStartDate"
        control={control}
        rules={{
          required: "This field is required",
          pattern: {
            value: /^(0[1-9]|[12][0-9]|3[01])\/(0[1-9]|1[0-2])\/\d{4}$/,
            message: "Please enter a valid date in DD/MM/YYYY format",
          },
        }}
        render={({ field }) => (
          <FormControl fullWidth sx={{ m: 1 }}>
            <InputLabel htmlFor="preferredStartDate">
              Preferred Start Date
            </InputLabel>
            <OutlinedInput
              id="preferredStartDate"
              label="Preferred Start Date"
              {...field}
            />
            {errors.preferredStartDate && (
              <FormHelperText id="component-error-text">
                {errors.preferredStartDate.message}
              </FormHelperText>
            )}
          </FormControl>
        )}
      />

      <Controller
        name="residentialDistrict"
        control={control}
        render={({ field }) => (
          <FormControl fullWidth sx={{ m: 1 }}>
            <InputLabel htmlFor="residentialDistrict">
              Residential District
            </InputLabel>
            <Select
              id="residentialDistrict"
              label="Residential District"
              {...field}
            >
              <MenuItem value="north">North</MenuItem>
              <MenuItem value="south">South</MenuItem>
              <MenuItem value="east">East</MenuItem>
              <MenuItem value="west">West</MenuItem>
            </Select>
            {errors.residentialDistrict && (
              <FormHelperText id="component-error-text">
                This field is required
              </FormHelperText>
            )}
          </FormControl>
        )}
      />

      <Controller
        name="emergencyName"
        control={control}
        render={({ field }) => (
          <FormControl fullWidth sx={{ m: 1 }}>
            <InputLabel htmlFor="emergencyName">Emergency Name</InputLabel>
            <OutlinedInput
              id="emergencyName"
              label="Emergency Name"
              {...field}
            />
            {errors.emergencyName && (
              <FormHelperText id="component-error-text">
                This field is required
              </FormHelperText>
            )}
          </FormControl>
        )}
      />

      <Controller
        name="emergencyRelationship"
        control={control}
        render={({ field }) => (
          <FormControl fullWidth sx={{ m: 1 }}>
            <InputLabel htmlFor="emergencyRelationship">
              Emergency Relationship
            </InputLabel>
            <OutlinedInput
              id="emergencyRelationship"
              label="Emergency Relationship"
              {...field}
            />
            {errors.emergencyRelationship && (
              <FormHelperText id="component-error-text">
                This field is required
              </FormHelperText>
            )}
          </FormControl>
        )}
      />

      <Controller
        name="emergencyPhone"
        control={control}
        rules={{
          required: "This field is required",
          pattern: {
            value: /^\d{8}$/,
            message: "Please enter a valid 8-digit emergency phone number",
          },
        }}
        render={({ field }) => (
          <FormControl fullWidth sx={{ m: 1 }}>
            <InputLabel htmlFor="emergencyPhone">Emergency Phone</InputLabel>
            <OutlinedInput
              id="emergencyPhone"
              label="Emergency Phone"
              {...field}
            />
            {errors.emergencyPhone && (
              <FormHelperText id="component-error-text">
                {errors.emergencyPhone.message}
              </FormHelperText>
            )}
          </FormControl>
        )}
      />

      {/* register your input into the hook by invoking the "register" function
      <input defaultValue="test" {...register("example")} /> */}
      {/* include validation with required or other standard HTML validation rules */}
      {/* <input {...register("exampleRequired", { required: true })} /> */}
      {/* errors will return when field validation fails  */}
      {/* {errors.exampleRequired && <span>This field is required</span>} */}

      <Button type="submit" variant="contained">
        Submit
      </Button>
    </form>
  );
};

export default NewUserPage;
