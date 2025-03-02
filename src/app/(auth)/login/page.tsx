import React from "react";
import { LoginForm } from "@/components/forms";
import { AuthCct } from "../../../../public/scss/components/auth";

const Login = () => {
  return (
    <AuthCct title={"Welcome 👋🏻"} description={" Please login here"}>
      <LoginForm />
    </AuthCct>
  );
};

export default Login;
