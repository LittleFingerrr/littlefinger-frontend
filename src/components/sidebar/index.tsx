import { Sheet, SheetContent } from '@/components/ui/sheet';
import { cn } from '@/lib/utils';
import { NavLinks } from '@/components/sidebar/nav';
import { Logo } from '../logo';

export function Sidebar({
    isCollapsed,
    isMobileMenuOpen,
    setMobileMenuOpen,
}: {
    isCollapsed: boolean;
    isMobileMenuOpen: boolean;
    setMobileMenuOpen: (isOpen: boolean) => void;
}) {
    const desktopSidebarContent = (
        <>
            <div className="absolute w-[50%] h-[20%] bottom-0 -left-10  bg-primary-glow rounded-[5.21875rem] blur-[3.125rem] pointer-events-none" />
            <Logo isCollapsed={isCollapsed} />
            <div className="flex-grow">
                <NavLinks isCollapsed={isCollapsed} />
            </div>
        </>
    );

    const mobileSidebarContent = (
        <>
            <Logo isCollapsed={false} />
            <NavLinks isCollapsed={false} onLinkClick={() => setMobileMenuOpen(false)} />
        </>
    );

    return (
        <>
            {/* Mobile sidebar */}
            <div className="lg:hidden">
                <Sheet open={isMobileMenuOpen} onOpenChange={setMobileMenuOpen}>
                    <SheetContent side="left" className="w-64 p-0">
                        {mobileSidebarContent}
                    </SheetContent>
                </Sheet>
            </div>

            {/* Desktop sidebar */}
            <aside
                className={cn(
                    'hidden lg:fixed overflow-hidden lg:inset-y-0 lg:flex lg:flex-col lg:h-full bg-secondary transition-all duration-300 ease-in-out z-20 border-r border-tertiary shadow-[0.1875rem_0_0.25rem_0_rgba(0,0,0,0.41)]',
                    isCollapsed ? 'lg:w-20' : 'lg:w-64'
                )}
            >
                {desktopSidebarContent}
            </aside>
        </>
    );
}
