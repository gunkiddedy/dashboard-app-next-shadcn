/* eslint-disable @typescript-eslint/no-unused-vars */
'use client';

import React, { useState } from 'react';
import Link from 'next/link';
import { useRouter } from 'next/navigation';

import { zodResolver } from '@hookform/resolvers/zod';
import { useForm } from 'react-hook-form';
import { type z } from 'zod';

import { Form, FormField } from '@/components/ui/form';

import routes from '@/lib/routes';
import { login } from '@/lib/auth';
import FormInput from '@/components/FormInput';
import Button from '@/components/Button';
import { loginSchema } from '@/schema/auth/login';
import Checkbox from '@/components/Checkbox';

type TLogin = z.infer<typeof loginSchema>;
const LoginForm = () => {
  const navigate = useRouter();
  const [loading, setLoading] = useState<boolean>(false);
  const [isChecked, setIsChecked] = useState<boolean>(false);

  const form = useForm<TLogin>({
    resolver: zodResolver(loginSchema),
    defaultValues: {
      email: process?.env?.NEXT_PUBLIC_CLIENT_EMAIL || '',
      password: process?.env?.NEXT_PUBLIC_CLIENT_PASSWORD || '',
    },
  });
  const {
    handleSubmit,
    control,
    formState: { errors },
  } = form;

  const onSubmit = async (values: TLogin) => {
    setLoading(true);
    try {
      await login(values);

      navigate.push(routes.dashboard.entry.path);
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
            console.log('error is', err);
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
          <FormField
            control={control}
            name="password"
            render={({ field }) => (
              <>
                <FormInput
                  label="Password"
                  required
                  error={errors.email}
                  placeholder="Enter your password"
                  type="password"
                  containerClass=""
                  {...field}
                />
              </>
            )}
          />
          <div className="flex justify-between my-4">
            <div className="flex gap-1">
              <Checkbox
                id="rememberMe"
                onChange={() => {
                  setIsChecked((prev) => !prev);
                  console.log(isChecked);
                }}
                isChecked={isChecked}
                disabled={loading}
              />
              <p>Remember Me</p>
            </div>
            <Link
              className="text-primary text-sm font-medium leading-[1.4rem]"
              href={routes.auth.forgotPassword.path}
            >
              Forgot Password?
            </Link>
          </div>

          <Button
            size="lg"
            label="Login"
            className="w-full"
            loading={loading}
          />
        </form>
      </Form>
    </div>
  );
};

export default LoginForm;
