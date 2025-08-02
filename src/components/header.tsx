'use client';
import { ConnectWallet } from './connect-wallet';
import { Button } from './ui/button';
import { Menu, PanelLeft } from 'lucide-react';
import { usePathname } from 'next/navigation';
import { cn } from '@/lib/utils';

const titleMap: { [key: string]: string } = {
    '/dashboard': 'Dashboard',
    '/dashboard/members': 'Members',
    '/dashboard/schedule': 'Disbursement Schedule',
    '/dashboard/vault': 'Vault',
    '/dashboard/settings': 'Settings',
};

export function Header({
    onMenuClick,
    onToggleCollapse,
    isCollapsed,
}: {
    onMenuClick: () => void;
    onToggleCollapse: () => void;
    isCollapsed: boolean;
}) {
    const pathname = usePathname();
    const Title = titleMap[pathname] || 'Dashboard';

    return (
        <header
            className={cn(
                'sticky top-0 z-10 flex items-center gap-4 px-4 backdrop-blur-sm md:px-6 transition-all duration-300',
                isCollapsed ? 'pb-4 pt-5' : 'pb-8 pt-9'
            )}
        >
            <Button variant="outline" size="icon" className="lg:hidden" onClick={onMenuClick}>
                <Menu className="h-6 w-6" />
                <span className="sr-only">Open Menu</span>
            </Button>

            <Button
                variant="ghost"
                size="icon"
                className="hidden lg:flex"
                onClick={onToggleCollapse}
            >
                <PanelLeft className="h-5 w-5" />
                <span className="sr-only">Toggle Sidebar</span>
            </Button>

            <h1 className="flex-1 font-lato text-[1rem] md:text-[2rem] font-semibold text-white">
                {Title}
            </h1>
            <ConnectWallet />
        </header>
    );
}
