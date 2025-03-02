"use client";

import React from "react";
import { zodResolver } from "@hookform/resolvers/zod";
import { useForm } from "react-hook-form";
import { type z } from "zod";

import { Form, FormField } from "@/components/ui/form";
import { Button, FormInput } from "@/components";
import { passwordSettingsSchema } from "@/schema/settings/PasswordSettings";

type TTax = z.infer<typeof passwordSettingsSchema>;

const PasswordSettings = () => {
  const form = useForm<TTax>({
    resolver: zodResolver(passwordSettingsSchema),
  });

  const {
    handleSubmit,
    control,
    formState: { errors },
  } = form;

  const onSubmit = () => {};
  return (
    <div className="pt-8">
      <Form {...form}>
        <form
          className=""
          onSubmit={handleSubmit(onSubmit, (err) => {
            console.log("error is", err);
          })}
        >
          <div className="max-w-[600px]">
            <FormField
              control={control}
              name="oldPassword"
              render={({ field }) => (
                <FormInput
                  label="Old Password"
                  error={errors.oldPassword}
                  placeholder=""
                  containerClass="mb-8"
                  className="rounded-none"
                  {...field}
                />
              )}
            />

            <FormField
              control={control}
              name="password"
              render={({ field }) => (
                <FormInput
                  label="New Password"
                  error={errors.password}
                  placeholder=""
                  containerClass="mb-8"
                  className="rounded-none"
                  {...field}
                />
              )}
            />

            <FormField
              control={control}
              name="oldPassword"
              render={({ field }) => (
                <FormInput
                  label="Confirm New Password"
                  error={errors.confirmPassword}
                  placeholder=""
                  containerClass="mb-8"
                  className="rounded-none"
                  {...field}
                />
              )}
            />
          </div>

          <div className="pt-8 mt-4 border-t border-neutral-350 flex items-center gap-6">
            <Button
              label="Cancel"
              className=" rounded-xl w-[108px] h-14 text-primary-50 border-primary-500"
              variant="neutral"
              type="button"
            />
            <Button
              label="Save Changes"
              className=" rounded-xl w-[243px] h-14"
              type="submit"
            />
          </div>
        </form>
      </Form>
    </div>
  );
};

export default PasswordSettings;
