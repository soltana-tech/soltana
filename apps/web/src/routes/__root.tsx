import { HeadContent, Scripts, createRootRoute } from '@tanstack/react-router';
import { type ReactNode, useEffect } from 'react';
import { initSoltana } from 'soltana-ui';

import { AppShell } from '~/shared/components/layout/AppShell';
import soltanaCss from 'soltana-ui/scss?url';
import appCss from '~/shared/styles/main.scss?url';

export const Route = createRootRoute({
  head: () => ({
    meta: [
      { charSet: 'utf-8' },
      { name: 'viewport', content: 'width=device-width, initial-scale=1' },
      { title: 'Soltana \u2014 Academic Scripture Study Platform' },
      {
        name: 'description',
        content:
          'Open-source academic scripture study platform for casual readers, students, seminarians, clergy, and academics.',
      },
    ],
    links: [
      { rel: 'stylesheet', href: soltanaCss },
      { rel: 'stylesheet', href: appCss },
    ],
    scripts: [
      {
        type: 'application/ld+json',
        children: JSON.stringify({
          '@context': 'https://schema.org',
          '@type': 'WebApplication',
          name: 'Soltana',
          description: 'Open-source academic scripture study platform',
          url: 'https://soltana.dev',
          applicationCategory: 'EducationalApplication',
        }),
      },
    ],
  }),
  component: RootComponent,
});

function RootComponent() {
  return (
    <RootDocument>
      <AppShell />
    </RootDocument>
  );
}

function RootDocument({ children }: Readonly<{ children: ReactNode }>) {
  useEffect(() => {
    initSoltana({ theme: 'dark', relief: 'neumorphic', finish: 'frosted', enhancers: false });
  }, []);

  return (
    <html lang="en" data-theme="dark" data-relief="neumorphic" data-finish="frosted">
      <head>
        <HeadContent />
      </head>
      <body>
        {children}
        <Scripts />
      </body>
    </html>
  );
}
