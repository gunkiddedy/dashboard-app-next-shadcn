import React from 'react';

import { ControllerRenderProps, FieldError } from 'react-hook-form';
import cx from 'classnames';
import { REGEXP_ONLY_DIGITS } from 'input-otp';

import {
  InputOTP,
  InputOTPGroup,
  InputOTPSlot,
} from '@/components/ui/input-otp';

interface IProps {
  length: number;
  className: string;
  field?: ControllerRenderProps<Record<string, any>, any>;
  label?: string;
  containerClass?: string;
  error?: FieldError;
}

const OtpInput = (props: IProps) => {
  const { length, className, label, containerClass, error, ...rest } = props;
  return (
    <div
      className={cx(
        'space-y-0',
        { 'flex flex-col gap-[10px]': !!label },
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
        >
          {label}
        </label>
      ) : null}
      <InputOTP
        pattern={REGEXP_ONLY_DIGITS}
        maxLength={length}
        containerClassName={cx('gap-[32px]', { [`${className}`]: className })}
        {...rest}
      >
        {Array.from({ length }).map((_, index) => (
          <InputOTPGroup key={index}>
            <InputOTPSlot index={index} className={cx('w-[54px] h-[54px]')} />
          </InputOTPGroup>
        ))}
      </InputOTP>
    </div>
  );
};

export default OtpInput;
