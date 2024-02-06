import { permanentRedirect } from 'next/navigation'
import type { Metadata } from 'next'

export const metadata: Metadata = {
    title: 'Rudy Orre Resume',
    description: 'Take a look at my resume.',
};

export default function ResumePage() {
    permanentRedirect('https://drive.google.com/file/d/1p8nSZYy8jgPrRdBCm4CZ3DQBhIJKudbN/view?usp=sharing');
    return <>
        Redirecting to Resume...
    </>;
}
