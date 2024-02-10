"use client";
import type { SubmitHandler } from "react-hook-form";
import CreateUserForm from "./_components/CreateUserForm";
import type { CreateUserInputs } from "./_components/CreateUserForm";
import { api } from "~/trpc/react";
import dayjs from "dayjs";
import { signIn } from "next-auth/react";
import { useRouter } from "next/navigation";

const NewUserPage = () => {
  const router = useRouter();
  const createUserMutation = api.user.create.useMutation();

  const onCreateUser: SubmitHandler<CreateUserInputs> = async (
    user: CreateUserInputs,
  ) => {
    const {
      email,
      mobile,
      name,
      preferredName,
      birthYear,
      gender,
      maritalStatus,
      residentialArea,
      skills,
      volunteerStatus,
      preferredStartDate,
      preferredCommunication,
      emergencyName,
      emergencyRelationship,
      emergencyPhone,
    } = user;

    createUserMutation.mutate({
      email,
      phone: mobile,
      name,
      preferredName,
      birthYear: +birthYear,
      gender,
      maritalStatus,
      residentialArea: +residentialArea.substring(1),
      skills: {
        createMany: {
          data: skills.map((skill) => ({
            name: skill,
          })),
        },
      },
      volunteerStatus,
      preferredStartDate: dayjs(preferredStartDate, "YYYY-MM-DD").toDate(),
      preferredCommunication,
      emergencyName,
      emergencyRelationship,
      emergencyPhone,
    });
    console.log("created user in db");

    signIn("email", {
      email,
      callbackUrl: "/api/auth/verify-request?provider=email&type=email",
    }).catch((err) => console.error(err));
    console.log("email signin request complete");
  };

  return (
    <main className="md: p-4 px-32">
      <h1 className="py-4 text-center text-2xl">Volunteer Registration</h1>
      <CreateUserForm submitHandler={onCreateUser} />
    </main>
  );
};

export default NewUserPage;
