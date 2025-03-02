/* eslint-disable @typescript-eslint/no-unused-vars */
'use client';
import React from 'react';
import Image from 'next/image';

import cx from 'classnames';
import { type FieldError, type UseFormRegister } from 'react-hook-form';

import { Input as ShadInput } from '../ui/input';
import { FormMessage } from '@/components/ui/form';

interface InputProps<T extends object>
  extends React.InputHTMLAttributes<HTMLInputElement> {
  label?: string;
  containerClass?: string;
  register?: UseFormRegister<T>;
  error?: FieldError;
  subText?: string;
  iconBefore?: boolean;
  icon?: any;
}

const Input = ({
  label,
  containerClass,
  error,
  id,
  required,
  type = 'text',
  subText,
  icon,
  iconBefore,
  ...rest
}: InputProps<object>) => {
  return (
    <div
      className={cx(
        'space-y-0',
        { 'flex flex-col gap-1': !!label },
        { [`${containerClass}`]: !!containerClass },
      )}
    >
      {label ? (
        <label
          className={cx(
            'text-sm font-medium leading-[1.4rem] text-secondary-100',
            {
              'text-danger-100': !!error,
            },
          )}
          htmlFor={id}
        >
          {label} {required && <span className="text-danger-50">*</span>}
        </label>
      ) : null}
      <div className="relative">
        {iconBefore && icon && (
          <span className="absolute top-[50%] translate-y-[-50%] left-6">
            <Image src={icon} alt="icon" />
          </span>
        )}
        <ShadInput
          className={cx(' bg-white rounded-lg !mt-0 border ', {
            'pl-[55px]': iconBefore,
          })}
          id={id}
          {...rest}
        />
      </div>
      {!!error && <FormMessage className="text-xs" />}
      {subText && (
        <p className="mt-0.5 text-xs font-normal leading-4 text-neutral-600">
          {subText}
        </p>
      )}
    </div>
  );
};

export default Input;
