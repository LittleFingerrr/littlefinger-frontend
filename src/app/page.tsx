import { Button } from '@/components/ui/button';
import Link from 'next/link';

export default function Home() {
    return (
        // flex min-h-screen flex-col items-center justify-between p-24
        <main className="min-h-screen bg-black grid place-items-center text-white">
            Starting Page
            <div className="mt-10 flex items-center justify-center gap-x-6">
                <Button asChild>
                    <Link href="/dashboard">Go to Dashboard</Link>
                </Button>
            </div>
        </main>
    );
}
