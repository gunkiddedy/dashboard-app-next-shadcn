import React from 'react';
import { ForgotPasswordForm, LoginForm } from '@/components/forms';
import { AuthCct } from '../../../../public/scss/components/auth';

const ForgotPassword = () => {
  return (
    <AuthCct
      title={'Forgot Password'}
      description={
        'Enter your registered email address. we’ll send you a code to reset your password.'
      }
    >
      <ForgotPasswordForm />
    </AuthCct>
  );
};

export default ForgotPassword;
