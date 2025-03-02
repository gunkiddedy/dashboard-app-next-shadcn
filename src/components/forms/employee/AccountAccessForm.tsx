"use client";

import React, { useRef, useState } from "react";

import { zodResolver } from "@hookform/resolvers/zod";
import { useForm } from "react-hook-form";
import { type z } from "zod";

import { Form, FormField } from "@/components/ui/form";

import FormInput from "@/components/FormInput";
import Button from "@/components/Button";
import { accountAccessSchema } from "@/schema/employee/accountAccess";
import { AlertDialog } from "@/components/Alert";
import dashboardIcons from "@/lib/assets/dashboard";

const AccountAccessForm = () => {
  const [loading, setLoading] = useState<boolean>(false);

  const form = useForm<z.infer<typeof accountAccessSchema>>({
    resolver: zodResolver(accountAccessSchema),
    defaultValues: {
      slackId: "",
      githubId: "",
      skypeId: "",
      trelloId: "",
    },
  });

  const {
    handleSubmit,
    control,
    formState: { errors },
  } = form;

  const alertDialogRef = useRef<{ openDialog: () => void }>(null);

  const onSubmit = async (values: z.infer<typeof accountAccessSchema>) => {
    setLoading(true);
    try {
      console.log("Account Access Form", values);
      if (alertDialogRef.current) {
        alertDialogRef.current.openDialog(); // Open the dialog
      }
    } catch (error) {
      // TODO: show toast
    } finally {
      setLoading(false);
    }
  };

  return (
    <div>
      <Form {...form}>
        <form
          onSubmit={handleSubmit(onSubmit, (err) => {
            console.log("error is", err);
          })}
          className="flex flex-col space-y-8"
        >
          <div className="grid grid-cols-2 gap-8">
            <FormField
              control={control}
              name="slackId"
              render={({ field }) => (
                <FormInput
                  required
                  error={errors.slackId}
                  placeholder="Enter Slack ID"
                  containerClass=""
                  {...field}
                  className="w-full"
                />
              )}
            />
            <FormField
              control={control}
              name="githubId"
              render={({ field }) => (
                <FormInput
                  required
                  error={errors.githubId}
                  placeholder="Enter Github ID"
                  containerClass=""
                  {...field}
                  className="w-full"
                />
              )}
            />
          </div>
          <div className="grid grid-cols-2 gap-8">
            <FormField
              control={control}
              name="skypeId"
              render={({ field }) => (
                <FormInput
                  required
                  error={errors.skypeId}
                  placeholder="Enter Skype ID"
                  containerClass=""
                  {...field}
                  className="w-full"
                />
              )}
            />
            <FormField
              control={control}
              name="trelloId"
              render={({ field }) => (
                <FormInput
                  required
                  error={errors.trelloId}
                  placeholder="Enter Trello ID"
                  containerClass=""
                  {...field}
                  className="w-full"
                />
              )}
            />
          </div>
          <div className="flex items-center justify-end flex-wrap lg:space-x-3 xl:space-y-0 space-y-3">
            <Button
              label="Cancel"
              className="w-full xl:w-[163px]"
              variant="outline"
            />
            <Button
              label="Add Employee"
              className="w-full xl:w-[163px]"
              loading={loading}
            />
          </div>
        </form>
      </Form>
      <AlertDialog
        ref={alertDialogRef}
        icon={dashboardIcons.welcomebackFabianaIcon}
        title="Employee Added!"
        description="Tobiloba Martins has been added to your employee database."
        actionText="View Employee Profile"
      />
    </div>
  );
};

export default AccountAccessForm;
