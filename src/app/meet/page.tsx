import { permanentRedirect } from 'next/navigation'

export default function ResumePage() {
    permanentRedirect('https://meet.google.com/her-pqgs-ovd');
    return <>
        Redirecting to Google Meet...
    </>;
}
