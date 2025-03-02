import React from 'react';
import { OtpForm } from '@/components/forms';
import { AuthCct } from '../../../../../public/scss/components/auth';

const Otp = () => {
  return (
    <AuthCct
      title={'Enter OTP'}
      description={
        'We sent a one-time-password to your email address. Enter the code below.'
      }
    >
      <OtpForm />
    </AuthCct>
  );
};

export default Otp;
