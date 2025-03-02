import React from 'react';

export default async function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <div className="app_auth_layout">
      <div className="app_auth_layout__bg"></div>
      <div className="app_auth_layout__cct">{children}</div>
    </div>
  );
}
