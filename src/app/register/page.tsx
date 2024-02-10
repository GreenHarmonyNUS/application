"use client";
import type { SubmitHandler } from "react-hook-form";
import CreateUserForm from "./_components/CreateUserForm";
import type { CreateUserInputs } from "./_components/CreateUserForm";
import { api } from "~/trpc/react";
import dayjs from "dayjs";
import { signIn, useSession } from "next-auth/react";
import { useEffect, useState } from "react";
import { useRouter } from "next/navigation";

const NewUserPage = () => {
  const { status } = useSession();
  const router = useRouter();

  useEffect(() => {
    if (status === "authenticated") router.push("/dashboard");
  }, [status, router]);

  const { mutate: createUserMutation, isSuccess } =
    api.user.create.useMutation();
  const [userEmail, setUserEmail] = useState("");
  useEffect(() => {
    async function executeEmailSignIn() {
      await signIn("email", { email: userEmail });
    }
    if (isSuccess)
      executeEmailSignIn().catch(() => {
        console.error("Failed to request magic link.");
      });
  }, [isSuccess, userEmail]);

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
    setUserEmail(email);

    createUserMutation({
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
  };

  return (
    <main className="md: p-4 px-32">
      <h1 className="py-4 text-center text-2xl">Volunteer Registration</h1>
      <CreateUserForm submitHandler={onCreateUser} />
    </main>
  );
};

export default NewUserPage;
