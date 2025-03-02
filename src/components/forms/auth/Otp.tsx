/* eslint-disable @typescript-eslint/no-unused-vars */
'use client';

import React, { useState } from 'react';
import Link from 'next/link';
import { useRouter } from 'next/navigation';

import { zodResolver } from '@hookform/resolvers/zod';
import { useForm } from 'react-hook-form';
import { type z } from 'zod';

import {
  Form,
  FormControl,
  FormField,
  FormItem,
  FormMessage,
} from '@/components/ui/form';

import routes from '@/lib/routes';
import { login } from '@/lib/auth';
import FormInput from '@/components/FormInput';
import Button from '@/components/Button';
import Checkbox from '@/components/Checkbox';
import { otpSchema } from '@/schema/auth/otp';
import OtpInput from '@/components/OtpInput';

type Totp = z.infer<typeof otpSchema>;
const OtpForm = () => {
  const navigate = useRouter();
  const [loading, setLoading] = useState<boolean>(false);
  const [isChecked, setIsChecked] = useState<boolean>(false);

  const form = useForm<Totp>({
    resolver: zodResolver(otpSchema),
  });
  const {
    handleSubmit,
    control,
    formState: { errors },
    getValues,
    trigger,
  } = form;

  const onSubmit = (values: Totp) => {
    console.log('values', values);
  };

  const handleResend = async () => {
    // TODO: validate that it is a valid email
    const isValid = await trigger('pin');
    if (!getValues('pin') || !isValid) return;
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
            console.log('error is', err);
          })}
        >
          <FormField
            control={form.control}
            name="pin"
            render={({ field }) => (
              <FormItem>
                <FormControl>
                  <OtpInput className="my-4" length={5} {...field} />
                </FormControl>
                {!!errors.pin && <FormMessage className="text-xs" />}
              </FormItem>
            )}
          />

          <p className="text-center text-neutral-250 text-sm font-medium leading-[1.4rem] mt-7">
            Didn't receive an email?
            <span
              role="button"
              onClick={handleResend}
              className="text-primary-50 pl-2 underline inline-block"
            >
              Click to resend
            </span>
          </p>

          <Button
            size="lg"
            label="Continue"
            className="w-full mt-7"
            loading={loading}
          />
        </form>
      </Form>
    </div>
  );
};

export default OtpForm;
