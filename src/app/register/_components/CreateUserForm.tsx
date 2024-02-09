import { Button } from "@mui/material";
import dayjs from "dayjs";
import { range } from "lodash";
import { useForm } from "react-hook-form";
import InputField from "~/app/_components/InputField";
import SelectField from "~/app/_components/SelectField";
import { EmergencyRelationship } from "~/app/_types/emergency-relationship";
import { Gender } from "~/app/_types/gender.enum";
import { MaritalStatus } from "~/app/_types/marital-status.enum";
import { PreferredCommunication } from "~/app/_types/preferred-communication.enum";
import { ResidentialDistrict } from "~/app/_types/residential-district.enum";
import { UserSkills } from "~/app/_types/user-skills.enum";
import { VolunteerStatus } from "~/app/_types/volunteer-status.enum";

export type CreateUserInputs = {
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

interface CreateUserFormProps {
  submitHandler: (user: CreateUserInputs) => void;
}

const CreateUserForm = ({ submitHandler }: CreateUserFormProps) => {
  const { handleSubmit, control } = useForm<CreateUserInputs>();

  return (
    <form onSubmit={handleSubmit(submitHandler)} className="m-2">
      <InputField
        label="Email"
        control={control}
        validation={{
          required: true,
          pattern: {
            value: /^[^\s@]+@[^\s@]+\.[^\s@]+$/,
            message: "Please enter a valid email address",
          },
        }}
      />

      <InputField
        label="Phone"
        control={control}
        validation={{
          required: true,
          pattern: {
            value: /^[89]\d{7}$/,
            message: "Please enter a valid 8-digit phone number",
          },
        }}
      />

      <InputField
        label="Name"
        control={control}
        validation={{
          required: true,
          minLength: { value: 2, message: "Name is too short!" },
          maxLength: { value: 50, message: "Name is too long!" },
        }}
      />

      <InputField
        label="Preferred Name"
        control={control}
        validation={{
          required: true,
          minLength: { value: 2, message: "Preferred name is too short!" },
          maxLength: { value: 50, message: "Preferred name is too long!" },
        }}
      />

      <SelectField
        label="Birth year"
        control={control}
        options={range(
          new Date().getFullYear() - 12,
          new Date().getFullYear() - 100,
          -1,
        ).map((year) => ({ label: String(year), value: year }))}
      />

      <SelectField
        label="Gender"
        control={control}
        options={Object.entries(Gender).map(([label, value]) => ({
          label,
          value,
        }))}
      />

      <SelectField
        label="Marital Status"
        control={control}
        options={Object.entries(MaritalStatus).map(([label, value]) => ({
          label,
          value,
        }))}
      />

      <SelectField
        label="Residential area"
        control={control}
        options={Object.entries(ResidentialDistrict).map(([label, value]) => ({
          label,
          value,
        }))}
      />

      <SelectField
        label="Skills"
        control={control}
        options={Object.entries(UserSkills).map(([label, value]) => ({
          label,
          value,
        }))}
        multiple={true}
      />

      <SelectField
        label="Volunteer Status"
        control={control}
        options={Object.entries(VolunteerStatus).map(([label, value]) => ({
          label,
          value,
        }))}
      />

      <InputField
        label="Preferred Start Date"
        control={control}
        type="date"
        validation={{
          required: true,
          validate: (date: Date) =>
            dayjs(date, "YYYY-MM-DD").isAfter(new Date(), "day") ||
            "Start date should be in the future.",
        }}
      />

      <SelectField
        label="Preferred communication"
        control={control}
        options={Object.entries(PreferredCommunication).map(
          ([label, value]) => ({ label, value }),
        )}
      />

      <InputField
        label="Emergency Name"
        control={control}
        validation={{
          required: true,
          minLength: { value: 2, message: "Name is too short!" },
          maxLength: { value: 50, message: "Name is too long!" },
        }}
      />

      <SelectField
        label="Emergency relationship"
        control={control}
        options={Object.entries(EmergencyRelationship).map(
          ([label, value]) => ({
            label,
            value,
          }),
        )}
      />

      <InputField
        control={control}
        label="Emergency phone"
        validation={{
          required: true,
          pattern: {
            value: /^[89]\d{7}$/,
            message: "Please enter a valid 8-digit phone number",
          },
        }}
      />

      <Button type="submit" variant="contained">
        Submit
      </Button>
    </form>
  );
};

export default CreateUserForm;
