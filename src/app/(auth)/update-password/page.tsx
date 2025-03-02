import React from 'react';

import { AuthCct } from '../../../../public/scss/components/auth';
import { UpdatePasswordForm } from '@/components/forms';

export default function UpdatePassword() {
  return (
    <AuthCct
      title={'Enter New Password'}
      description={
        'Password must be at least 8 characters. Password must include at least one capital letter, one figure and characters ($,%,$,^,@,!)'
      }
    >
      <UpdatePasswordForm />
    </AuthCct>
  );
}
