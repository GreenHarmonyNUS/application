"use client";
import { useForm } from "react-hook-form";
import InputField from "../../../_components/InputField";
import type { EventLocation } from "prisma/generated/zod";
import SelectField from "~/app/_components/SelectField";
import { Button } from "@mui/material";
import dayjs from "dayjs";
import { VALID_URL } from "~/app/_constants/valid-url";

export type EventInput = {
  name: string;
  details: string;
  date: Date;
  startTime: string;
  endTime: string;
  location: number;
  imageUrl: string;
  duration: number;
};

interface CreateEventFormProps {
  locations: EventLocation[];
  submitHandler: (event: EventInput) => void;
}

const CreateEventForm = ({
  locations,
  submitHandler,
}: CreateEventFormProps) => {
  const {
    handleSubmit,
    control,
    // formState: { errors },
  } = useForm<EventInput>();

  return (
    /* "handleSubmit" will validate your inputs before invoking "onSubmit" */
    <form onSubmit={handleSubmit(submitHandler)}>
      <InputField
        control={control}
        label="Name"
        validation={{
          required: true,
          minLength: {
            value: 5,
            message: "Name should be more than 5 characters",
          },
          maxLength: {
            value: 50,
            message: "Name should be less than 50 characters",
          },
        }}
      />
      <InputField
        control={control}
        label="Details"
        type="textbox"
        validation={{
          required: true,
          minLength: {
            value: 10,
            message: "Details should be more than 10 characters.",
          },
          maxLength: {
            value: 200,
            message: "Details should be more than 200 characters.",
          },
        }}
      />
      <InputField
        control={control}
        label="Date"
        type="date"
        validation={{
          required: true,
          validate: (date: Date) =>
            dayjs(date, "YYYY-MM-DD").isAfter(new Date(), "day") ||
            "Event date should be in the future.",
        }}
      />
      <InputField
        control={control}
        label="Duration"
        validation={{
          required: true,
          min: { value: 1, message: "Event duration is too short." },
          max: {
            value: 24,
            message: "Event duration should not exceed one day.",
          },
        }}
        endAdornment="hours"
        type="number"
      />
      <SelectField
        options={locations.map(({ name, id }) => ({ label: name, value: id }))}
        control={control}
        label="Location"
      />
      <InputField
        control={control}
        label="Image URL"
        validation={{
          required: true,
          pattern: {
            value: VALID_URL,
            message: "URL is invalid. Should contain http:// or https://",
          },
        }}
      />
      <Button type="submit">Submit</Button>
    </form>
  );
};

export default CreateEventForm;
