"use client";

import React from "react";
import Link from "next/link";
import { useRouter } from "next/navigation";

import { zodResolver } from "@hookform/resolvers/zod";
import { useForm } from "react-hook-form";
import { type z } from "zod";

import { Form, FormField } from "@/components/ui/form";

// import { useResendResetEmail, useResetPassword } from '@/services/queries/auth';
import Button from "@/components/Button";
import FormInput from "@/components/FormInput";
import { forgotPasswordSchema } from "@/schema/auth/forgotPassword";
import routes from "@/lib/routes";

type TResetPassword = z.infer<typeof forgotPasswordSchema>;
const ForgotPasswordForm = () => {
  const navigate = useRouter();
  // const { mutate, isPending } = useResetPassword();
  // const { mutate: resendMutate } = useResendResetEmail();
  const form = useForm<TResetPassword>({
    resolver: zodResolver(forgotPasswordSchema),
    defaultValues: {
      email: process?.env?.NEXT_PUBLIC_CLIENT_EMAIL || "",
    },
  });
  const {
    handleSubmit,
    control,
    formState: { errors },
    getValues,
    trigger,
  } = form;

  const onSubmit = (values: TResetPassword) => {
    const { email } = values;
    console.log(email);
    // if (!getValues('email') || !isValid) return; //TODO: conform this code and apply
    navigate.push(routes.auth.forgotPassword.otp.path);

    // mutate({ url: '/auth/reset-password', data: { email } });
  };

  const handleResend = async () => {
    // TODO: validate that it is a valid email
    const isValid = await trigger("email");
    if (!getValues("email") || !isValid) return;
    navigate.push(routes.auth.forgotPassword.otp.path);
    /*  resendMutate({
      url: '/auth/resend-verification-email',
      data: { email: getValues('email') },
    }); */
  };

  return (
    <div>
      <Form {...form}>
        <form
          onSubmit={handleSubmit(onSubmit, (err) => {
            console.log("error is", err);
          })}
        >
          <FormField
            control={control}
            name="email"
            render={({ field }) => (
              <FormInput
                label="Email Address"
                required
                error={errors.email}
                placeholder="example@company.com"
                containerClass="mb-4"
                {...field}
              />
            )}
          />

          <Button
            size="lg"
            label="Send OTP"
            className="w-full" /* loading={isPending} */
          />
        </form>
      </Form>

      <p className="text-center text-neutral-250 text-sm font-medium leading-[1.4rem] mt-[72px]">
        Didn't receive a code?
        <span
          role="button"
          onClick={handleResend}
          className="text-primary ml-1 !underline inline-block"
        >
          Resend
        </span>
      </p>
    </div>
  );
};

export default ForgotPasswordForm;
