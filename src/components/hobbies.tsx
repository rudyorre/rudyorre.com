import {Card, CardHeader, CardBody, CardFooter, Image, Button} from "@nextui-org/react";
import { cn } from "@/lib/utils";

interface HobbiesProps {
    className?: string,
};

export const Hobbies = ({ className }: HobbiesProps) => {
    return (
        <div className="items-center flex justify-center">
            <div className="max-w-[900px] gap-2 grid grid-cols-12 grid-rows-2 px-8">
            <Card className="col-span-12 sm:col-span-4 h-[300px]">
            <CardHeader className="absolute z-10 top-1 flex-col !items-start">
                <p className="text-tiny text-white/60 uppercase font-bold">Favorite Artist</p>
                <h4 className="text-white font-medium text-large">Kendrick Lamar</h4>
                <h3 className="text-tiny text-white/60 font-bold">The Heart Part 5</h3>
            </CardHeader>
            <Image
                removeWrapper
                alt="Card background"
                className="z-0 w-full h-full object-cover"
                src="/images/theheartpart5.png"
            />
            <CardFooter className="absolute bottom-0 z-10 justify-between">
                <div>
                <p className="text-white/60 text-tiny">I'm a top 0.1% listener on Spotify ;)</p>
                </div>
            </CardFooter>
            </Card>
            <Card className="col-span-12 sm:col-span-4 h-[300px]">
            <CardHeader className="absolute z-10 top-1 flex-col !items-start">
                <p className="text-tiny text-white/60 uppercase font-bold">Playing and Watching</p>
                <h4 className="text-white font-medium text-large">Basketball</h4>
            </CardHeader>
            <Image
                removeWrapper
                alt="Card background"
                className="z-0 w-full h-full object-cover"
                src="/images/basketball.png"
            />
            <CardFooter className="absolute bottom-0 z-10 justify-between">
                <div>
                <p className="text-white/60 text-tiny">Clips are getting a ring this year</p>
                </div>
            </CardFooter>
            </Card>
            <Card className="col-span-12 sm:col-span-4 h-[300px]">
            <CardHeader className="absolute z-10 top-1 flex-col !items-start">
                <p className="text-tiny text-white/60 uppercase font-bold">Lifting, Calisthenics, Cardio, etc</p>
                <h4 className="text-white font-medium text-large">Working Out</h4>
            </CardHeader>
            <Image
                removeWrapper
                alt="Card background"
                className="z-0 w-full h-full object-cover"
                src="/images/spartan.jpg"
            />
            <CardFooter className="absolute bottom-0 z-10 justify-between">
                <div>
                <p className="text-white text-tiny">I'm on the right.</p>
                </div>
            </CardFooter>
            </Card>
            <Card className="w-full h-[300px] col-span-12 sm:col-span-5">
            <CardHeader className="absolute z-10 top-1 flex-col items-start">
                <p className="text-tiny text-white/60 uppercase font-bold">Survival Multiplayer</p>
                <h4 className="text-white font-medium text-2xl">Minecraft</h4>
            </CardHeader>
            <Image
                removeWrapper
                alt="Card example background"
                className="z-0 w-full h-full scale-125 -translate-y-6 object-cover"
                src="/images/minecraft.png"
            />
            <CardFooter className="absolute bottom-0 z-10 justify-between">
                <div>
                <p className="text-white/60 text-tiny">This image is from my 6-year-old server.</p>
                <p className="text-white/60 text-tiny">I'm also a Redstone enthusiast.</p>
                </div>
            </CardFooter>
            </Card>
            <Card isFooterBlurred className="w-full h-[300px] col-span-12 sm:col-span-7">
                <CardHeader className="absolute z-10 top-1 flex-col items-start">
                    <div className="w-full text-right">
                        <p className="text-tiny text-white/90 uppercase font-bold">My doge</p>
                        <h4 className="text-gray-200 font-extrabold text-3xl">Yoshi the Shiba</h4>
                    </div>
                </CardHeader>
            <Image
                removeWrapper
                alt="Relaxing app background"
                className="z-0 w-full h-full object-cover"
                src="/images/yoshi.jpg"
            />
            <CardFooter className="absolute bg-black/40 bottom-0 z-10 border-t-1 border-default-600 dark:border-default-100">
                <div className="flex flex-grow gap-2 items-center">
                <Image
                    alt="Breathing app icon"
                    className="rounded-full w-10 h-11 bg-black"
                    src="/images/yoshi_pfp.jpg"
                />
                <div className="flex flex-col">
                    <p className="text-tiny text-white/60">@mr.yoshiba</p>
                    <p className="text-tiny text-white/60">Follow my dog on instagram!</p>
                </div>
                </div>
                <a href="https://www.instagram.com/mr.yoshiba/" target="_blank">
                    <Button radius="full" size="sm">Open Instagram</Button>
                </a>
            </CardFooter>
            </Card>
        </div>
        </div>
      );
};
