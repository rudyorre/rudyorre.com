import { permanentRedirect } from 'next/navigation'
import Link from 'next/link'
import type { Metadata } from 'next'
import { links } from '@/constants/links'

export const metadata: Metadata = {
    title: "Rudy's Personal Zoom Meeting",
    description: 'Click to join meeting.',
};

export default function ResumePage() {
    permanentRedirect(links.zoom);
    return (
        <div className="flex flex-col items-center justify-center text-center flex-grow">
            <p>Redirecting to Zoom...</p>
            <p>If you don't see a dialog, click the redirect button below.</p>
            <Link
                href={links.zoom}
                className="mt-4 px-4 py-2 bg-primary text-background rounded"
            >
                Redirect
            </Link>
        </div>
    );
}
