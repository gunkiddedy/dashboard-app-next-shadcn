import React from 'react';
import { Button } from '@/components/ui/button';
import Link from 'next/link';
import routes from '@/lib/routes';
import { permanentRedirect } from 'next/navigation';

export default function Home() {
  permanentRedirect(routes.auth.login.path);

  return (
    <div className="app_survey_container">
      <p> Redirects to login page for now</p>
    </div>
  );
}
