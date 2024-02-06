import { permanentRedirect } from 'next/navigation'

export default function ResumePage() {
    permanentRedirect('https://drive.google.com/file/d/1p8nSZYy8jgPrRdBCm4CZ3DQBhIJKudbN/view?usp=sharing');
    return <>
        Redirecting to Resume...
    </>;
}
