"use client";
import type { SubmitHandler } from "react-hook-form";
import CreateUserForm from "./_components/CreateUserForm";
import type { CreateUserInputs } from "./_components/CreateUserForm";

const NewUserPage = () => {
  // const router = useRouter();
  // const { data: session, status } = useSession();
  // useEffect(() => {
  //   if (status === "unauthenticated") {
  //     router.push("/");
  //   }
  // }, [status, router]);

  const onCreateUser: SubmitHandler<CreateUserInputs> = async (
    user: CreateUserInputs,
  ) => {
    console.log(user);
    // router.push("/dashboard");
  };

  return (
    <>
      <h1 className="py-4 text-center text-2xl">Volunteer Registration</h1>
      <CreateUserForm submitHandler={onCreateUser} />
    </>
  );
};

export default NewUserPage;
