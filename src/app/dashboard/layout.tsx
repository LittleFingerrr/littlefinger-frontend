'use client';

import Link from 'next/link';
import { usePathname } from 'next/navigation';
import HeaderLayout from '@/components/dashboard/HeaderLayout';
import { Fingerprint } from 'lucide-react';

const routeTitles: Record<string, string> = {
  '/dashboard': 'Dashboard',
  '/dashboard/members': 'Members',
  '/dashboard/schedule': 'Disbursement Schedule',
  '/dashboard/vault': 'Vault',
  '/dashboard/settings': 'Settings',
};

export default function DashboardLayout({ children }: { children: React.ReactNode }) {
  const pathname = usePathname();
  const heading = routeTitles[pathname] || 'Dashboard';

  return (
    <div className="flex min-h-screen">
      {/* Sidebar */}
      <aside className="w-64 border-[#3B3B45] border-r px-4 py-6">
        <a href="/dashboard" className="flex items-center gap-2 text-2xl font-bold mb-6 uppercase">
          <Fingerprint/> Little finger
        </a>
        <nav className="space-y-4">
          <Link href="/dashboard" className="block hover:underline">Dashboard</Link>
          <Link href="/dashboard/members" className="block hover:underline">Members</Link>
          <Link href="/dashboard/schedule" className="block hover:underline">Schedule</Link>
          <Link href="/dashboard/vault" className="block hover:underline">Vault</Link>
          <Link href="/dashboard/settings" className="block hover:underline">Settings</Link>
        </nav>
      </aside>

      {/* Content Area */}
      <main className="flex-1 p-6 md:p-10">
        <HeaderLayout heading={heading} />
        <div className="mt-6 lg:mt-8 xl:mt-12">{children}</div>
      </main>
    </div>
  );
}
