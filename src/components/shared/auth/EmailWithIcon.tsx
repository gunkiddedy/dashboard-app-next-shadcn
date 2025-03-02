import React from 'react';
import Image from 'next/image';

import authAssets from '@/lib/assets/auth';

interface IProps {
  userEmail: string;
}

const EmailWithIcon = (props: IProps) => {
  const { userEmail } = props;
  return (
    <span className="bg-neutral-800 rounded-2xl px-[10px] py-1 flex items-center gap-1 text-neutral-600 w-fit mx-auto text-sm font-medium leading-5 mt-[28px] mb-3">
      {userEmail}
    </span>
  );
};

export default EmailWithIcon;
