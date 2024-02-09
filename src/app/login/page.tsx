"use client";
import {
  Button,
  FormControl,
  FormHelperText,
  InputLabel,
  OutlinedInput,
} from "@mui/material";
import { signIn, useSession } from "next-auth/react";
import { useState } from "react";
import type { ChangeEvent } from "react";
import { VALID_EMAIL_REGEX } from "../_constants/valid-email";
import Link from "next/link";
import { api } from "~/trpc/react";
import { useRouter } from "next/navigation";

const LoginPage = () => {
  const router = useRouter();
  const { status } = useSession();
  if (status === "authenticated") router.push("/");

  const [email, setEmail] = useState<string>("");
  const [isEmailInvalid, setIsEmailInvalid] = useState<boolean>(true);
  const onEmailChange = (event: ChangeEvent<HTMLInputElement>) => {
    event.preventDefault();
    const { value } = event.target;
    const matchResult = value.match(VALID_EMAIL_REGEX);
    if (!matchResult || matchResult.length === 0) {
      setIsEmailInvalid(true);
    } else {
      setIsEmailInvalid(false);
    }
    setEmail(event.target.value);
  };

  const { data: isRegistered, refetch } = api.user.isRegistered.useQuery(email);

  const handleSignInWithEmail = async () => {
    return refetch().then(() => {
      if (!isRegistered) router.push("/register");
      return signIn("email");
    });
  };

  return (
    <main className="mx-8 flex flex-col justify-around gap-4 py-32 md:mx-12 lg:mx-48 xl:px-72">
      <div className="text-center">
        <FormControl fullWidth sx={{ m: 1 }}>
          <InputLabel htmlFor="email" shrink>
            Email
          </InputLabel>
          <OutlinedInput
            id="email"
            fullWidth
            value={email}
            onChange={onEmailChange}
          />
          {isEmailInvalid && (
            <FormHelperText id="email-error" error={isEmailInvalid}>
              {isEmailInvalid ?? "This field is required."}
            </FormHelperText>
          )}
        </FormControl>
        <Button onClick={handleSignInWithEmail} disabled={isEmailInvalid}>
          Sign in with magic link
        </Button>
      </div>
      <hr />
      <div className="text-center">
        <Link href="register">
          <Button>Register</Button>
        </Link>
      </div>
    </main>
  );
};

export default LoginPage;
