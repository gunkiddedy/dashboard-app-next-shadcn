/* eslint-disable @typescript-eslint/no-unused-vars */
'use client';

import React from 'react';
import { useRouter } from 'next/navigation';

import { zodResolver } from '@hookform/resolvers/zod';
import { useForm } from 'react-hook-form';
import { type z } from 'zod';

import { Form, FormField } from '@/components/ui/form';

// import { useResendResetEmail, useResetPassword } from '@/services/queries/auth';
import Button from '@/components/Button';
import FormInput from '@/components/FormInput';

import { updatePasswordSchema } from '@/schema/auth/updatePassword';
import { RenderIf } from '@/components/shared';

import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogHeader,
  DialogTitle,
  DialogTrigger,
} from '@/components/ui/dialog';

type TResetPassword = z.infer<typeof updatePasswordSchema>;
const UpdatePasswordForm = () => {
  const navigate = useRouter();
  /*   const { mutate, isPending } = useResetPassword();
  const { mutate: resendMutate } = useResendResetEmail(); */

  const form = useForm<TResetPassword>({
    resolver: zodResolver(updatePasswordSchema),
    defaultValues: {
      password: process?.env?.NEXT_PUBLIC_CLIENT_PASSWORD || '',
      confirmPassword: process?.env?.NEXT_PUBLIC_CLIENT_PASSWORD || '',
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
    const { password, confirmPassword } = values;
    console.log('Password is :', password);
    console.log('Confirrm Password is :', confirmPassword);
    console.log('Confirrm Password is :', confirmPassword === password);

    <RenderIf condition={password === confirmPassword}>
      <Dialog>
        <DialogTrigger>Open</DialogTrigger>
        <DialogContent>
          <DialogHeader>
            <DialogTitle>Are you absolutely sure?</DialogTitle>
            <DialogDescription>
              This action cannot be undone. This will permanently delete your
              account and remove your data from our servers.
            </DialogDescription>
          </DialogHeader>
        </DialogContent>
      </Dialog>
    </RenderIf>;

    // mutate({ url: '/auth/reset-password', data: { email } });
  };

  return (
    <div>
      <Form {...form}>
        <form
          onSubmit={handleSubmit(onSubmit, (err) => {
            console.log('error is', err);
          })}
        >
          <FormField
            control={control}
            name="password"
            render={({ field }) => (
              <>
                <FormInput
                  label="Password"
                  required
                  error={errors.password}
                  placeholder="Enter your password"
                  type="password"
                  containerClass="mb-4"
                  {...field}
                />
              </>
            )}
          />
          <FormField
            control={control}
            name="confirmPassword"
            render={({ field }) => (
              <>
                <FormInput
                  label="Confirm Password"
                  required
                  error={errors.confirmPassword}
                  placeholder="Confirm your new  password"
                  type="password"
                  containerClass="mb-4"
                  {...field}
                />
              </>
            )}
          />

          <Button
            size="lg"
            label="Reset Password"
            className="w-full" /* loading={isPending}  */
          />
        </form>
      </Form>
    </div>
  );
};

export default UpdatePasswordForm;
