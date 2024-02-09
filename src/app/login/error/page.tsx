import { redirect } from "next/navigation";

const LoginErrorPage = () => {
  redirect("/register");
};

export default LoginErrorPage;
