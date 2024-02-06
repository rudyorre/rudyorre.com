import { permanentRedirect } from 'next/navigation'
import type { Metadata } from 'next'

export const metadata: Metadata = {
    title: "Rudy's Personal Zoom Meeting",
    description: 'Click to join meeting.',
};

export default function ResumePage() {
    permanentRedirect('https://us05web.zoom.us/j/8749675790?pwd=K2w4aFJ4eHBKQzV3d3pUcXBjT2dHUT09');
    return <>
        Redirecting to Zoom...
    </>;
}
