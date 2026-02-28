import { Outlet } from '@tanstack/react-router';

import { Navbar } from './Navbar';

export function AppShell() {
  return (
    <>
      <Navbar />
      <main>
        <Outlet />
      </main>
    </>
  );
}
