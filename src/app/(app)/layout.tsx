import { SidebarNav } from '@/components/shared/sidebar-nav';
import { SidebarProvider } from '@/components/ui/sidebar';

export default function AppLayout({ children }: { children: React.ReactNode }) {
  return (
    <SidebarProvider>
      <div className="flex min-h-screen">
        <SidebarNav />
        <main className="flex-1 p-4 sm:p-6 lg:p-8 bg-muted/30">
          {children}
        </main>
      </div>
    </SidebarProvider>
  );
}
