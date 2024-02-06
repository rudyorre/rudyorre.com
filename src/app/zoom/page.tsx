import { permanentRedirect } from 'next/navigation'

export default function ResumePage() {
    permanentRedirect('https://us05web.zoom.us/j/8749675790?pwd=K2w4aFJ4eHBKQzV3d3pUcXBjT2dHUT09');
    return <>
        Redirecting to Zoom...
    </>;
}
