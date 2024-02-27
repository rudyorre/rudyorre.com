import {Image, Snippet} from "@nextui-org/react";
import { cn } from "@/lib/utils";

interface ContactProps {
    className?: string,
};

export const Contact = ({ className }: ContactProps) => {
    return (
        <div className="flex flex-col lg:flex-row">
            <div className="flex-grow flex lg:block justify-center items-center m">
                <Image
                    isBlurred
                    src="/images/coding.png"
                    alt="NextUI Album Cover"
                    className="m-5 max-w-96"
                />
            </div>
            <div className="flex-grow flex flex-col lg:block justify-center items-center my-auto">
                <div className="text-md sm:text-lg">
                    Feel free to contact me at nay time via email. I try to
                    respond to all inquiries within 24 hours.
                </div>
                <Snippet symbol="" className="text-3xl">rudyorre@gmail.com</Snippet>
            </div>
        </div>
    );
};
