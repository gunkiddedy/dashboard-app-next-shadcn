'use client';
import React from 'react';
import Image from 'next/image';

import { usePathname, useRouter } from 'next/navigation';
import routes from '@/lib/routes';
import { RenderIf } from '@/components/shared';
import authAssets from '@/lib/assets/auth';
import logos from '@/lib/assets/logos';
import Link from 'next/link';
import Button from '@/components/Button';

interface Props {
  title: string;
  description: string;
  children: React.ReactNode;
}

const AuthCct: React.FC<Props> = ({ title, description, children }) => {
  const path = usePathname();
  const navigate = useRouter();

  const logoConditional = path.includes(routes.auth.login.path);
  const backwardNavigationConditional = !path.includes(routes.auth.login.path);

  return (
    <div className="app_auth_container">
      <div className="w-full">
        <RenderIf condition={logoConditional}>
          <Image
            className="app_auth_container__applogo"
            src={logos.appLogo}
            alt={'App Logo'}
            width={107}
            height={107}
          />
        </RenderIf>
        <RenderIf condition={backwardNavigationConditional}>
          <Button
            variant="ghost"
            className="p-0"
            onClick={() => navigate.back()}
            iconBefore={authAssets.arrowLeftCircle}
            label="Back"
          />
        </RenderIf>
      </div>
      <div className="app_auth_container__body">
        <div className="app_auth_container__body__upper">
          <h1 className="app_auth_container__body__upper__header">{title}</h1>
          <p className="app_auth_container__body_upper__description">
            {description}
          </p>
        </div>
        <div className=" app_auth_container__body__lower">
          <div>{children}</div>
        </div>
      </div>
    </div>
  );
};

export default AuthCct;
