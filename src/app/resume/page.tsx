import { permanentRedirect } from 'next/navigation'
import Link from 'next/link';
import type { Metadata } from 'next'
import { links } from '@/constants/links';

export const metadata: Metadata = {
    title: 'Rudy Orre Resume',
    description: 'Take a look at my resume.',
};

export default function ResumePage() {
    permanentRedirect(links.resume);
    return (
        <div className="flex flex-col items-center justify-center text-center flex-grow">
            <p>Redirecting to Resume...</p>
            <p>If you don't see a dialog, click the redirect button below.</p>
            <Link
                href={links.resume}
                className="mt-4 px-4 py-2 bg-primary text-background rounded"
            >
                Redirect
            </Link>
        </div>
    );
}
