'use client';
import Link from 'next/link';
import { usePathname } from 'next/navigation';
import { Home, Settings, Database, Activity } from 'lucide-react';
import { cn } from '@/lib/utils';

export function Navigation() {
  const pathname = usePathname();

  const links = [
    { href: '/dashboard', label: 'Dashboard', icon: Home },
    { href: '/posts', label: 'Posts', icon: Database },
    { href: '/batch', label: 'Batch Analyse', icon: Activity },
    { href: '/settings', label: 'Settings', icon: Settings },
  ];

  return (
    <nav className="bg-white border-b shadow-sm sticky top-0 z-50">
      <div className="container mx-auto px-6 py-4">
        <div className="flex items-center justify-between">
          <div className="flex items-center gap-2">
            <div className="w-10 h-10 bg-gradient-to-br from-blue-600 to-blue-400 rounded-lg flex items-center justify-center text-white font-bold text-xl">
              F
            </div>
            <div>
              <h1 className="text-xl font-bold">Fish Checker Ultimate</h1>
              <p className="text-xs text-slate-500">AI-Powered Data Validator</p>
            </div>
          </div>
          <div className="flex gap-2">
            {links.map((link) => {
              const Icon = link.icon;
              const isActive = pathname === link.href || pathname?.startsWith(link.href + '/');
              return (
                <Link
                  key={link.href}
                  href={link.href}
                  className={cn(
                    "flex items-center gap-2 px-4 py-2 rounded-lg transition-all",
                    isActive
                      ? "bg-blue-600 text-white shadow-md"
                      : "hover:bg-slate-100 text-slate-700"
                  )}
                >
                  <Icon size={18} />
                  <span className="font-medium">{link.label}</span>
                </Link>
              );
            })}
          </div>
        </div>
      </div>
    </nav>
  );
}