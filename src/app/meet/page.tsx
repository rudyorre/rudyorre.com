import { permanentRedirect } from 'next/navigation'
import type { Metadata } from 'next'

export const metadata: Metadata = {
    title: "Rudy's Personal Google Meet",
    description: 'Click to join meeting.',
};
export default function ResumePage() {
    permanentRedirect('https://meet.google.com/her-pqgs-ovd');
    return <>
        Redirecting to Google Meet...
    </>;
}
