import { permanentRedirect } from 'next/navigation'
import type { Metadata } from 'next'
import { links } from '@/constants/links';

export const metadata: Metadata = {
    title: 'Rudy Orre Resume',
    description: 'Take a look at my resume.',
};

export default function ResumePage() {
    permanentRedirect(links.resume);
    return <>
        Redirecting to Resume...
    </>;
}
