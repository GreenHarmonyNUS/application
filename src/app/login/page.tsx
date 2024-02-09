"use client";
import {
  Button,
  FormControl,
  FormHelperText,
  Input,
  InputLabel,
  OutlinedInput,
} from "@mui/material";
import { signIn } from "next-auth/react";
import Image from "next/image";
import { useState } from "react";
import type { ChangeEvent } from "react";
import { VALID_EMAIL_REGEX } from "../_constants/valid-email";
import Link from "next/link";

const LoginPage = () => {
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

  const handleSignInWithEmail = async () => {
    await signIn("email", { email });
  };

  return (
    <main className="mx-8 flex flex-col justify-around gap-4 py-32 md:mx-12 lg:mx-48 xl:px-72">
      <Image
        src="/assets/web_light_sq_SI.svg"
        height="50"
        width="250"
        alt="Sign In with Google"
        onClick={() => signIn("google")}
        className="mx-auto cursor-pointer"
      />
      <hr />

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
