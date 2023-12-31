'use client';

import { Button } from '@/components/ui/button';
import React, { useState, useEffect, useRef } from 'react';
import { useInView } from 'react-intersection-observer';
import { cn } from '@/lib/utils';
import styles from '@/components/styles/cards.module.css';
import { Project as ProjectType } from '@/constants/projects';

interface CardProps {
    project: ProjectType;
    parentMouseX: number;
    parentMouseY: number;
}

export function Cards({projects}: {projects: ProjectType[]}) {
const [mouseX, setMouseX] = useState<number>(0);
const [mouseY, setMouseY] = useState<number>(0);
const cardsRef = useRef<HTMLDivElement>(null);

useEffect(() => {
    const handleMouseMove = (e: MouseEvent) => {
    const rect = cardsRef.current?.getBoundingClientRect();
    if (!rect?.left || !rect?.top) {
        return;
    }
    const x = e.clientX - rect.left;
    const y = e.clientY  - rect.top;
    setMouseX(x);
    setMouseY(y);
    };

    cardsRef.current?.addEventListener('mousemove', handleMouseMove);

    return () => {
    cardsRef.current?.removeEventListener('mousemove', handleMouseMove);
    };
}, [cardsRef]);

return (
    <div className={cn(
    "items-center flex justify-center m-0 overflow-hidden p-0",
    "transform transition-transform duration-300 ease-in-out",
    styles.cards
    )}
    >
    <div ref={cardsRef} id="cards" className="flex flex-wrap gap-[8px] justify-center mx-auto">
        {projects.map((project: ProjectType, i: number) => (
            <Card
                key={i}
                project={project}
                parentMouseX={mouseX}
                parentMouseY={mouseY}
            />
        ))}
    </div>
    </div>
);
}

function Card({ project, parentMouseX, parentMouseY }: CardProps) {
const [mouseX, setMouseX] = useState<number>(0);
const [mouseY, setMouseY] = useState<number>(0);
const [isHovered, setIsHovered] = useState(false);
const cardsRef = useRef<HTMLDivElement>(null);
const { ref, inView } = useInView({ threshold: 0.9 });

useEffect(() => {
    const handleMouseMove = (e: MouseEvent) => {
    const rect = cardsRef.current?.getBoundingClientRect();
    if (!rect?.left || !rect?.top) {
        return;
    }
    const x = e.clientX - rect.left;
    const y = e.clientY - rect.top;
    setMouseX(x);
    setMouseY(y);
    };

    cardsRef.current?.addEventListener('mousemove', handleMouseMove);
    cardsRef.current?.addEventListener('mouseenter', () => setIsHovered(true));
    cardsRef.current?.addEventListener('mouseleave', () => setIsHovered(false));

    setMouseX(mouseX);
    setMouseY(mouseY);

    return () => {
    cardsRef.current?.removeEventListener('mousemove', handleMouseMove);
    };
}, [cardsRef, parentMouseX, parentMouseY, inView]);

const gradientOpacity = isHovered ? 0.1 : 0;

const hsl = window.getComputedStyle(document.documentElement).getPropertyValue('--foreground').split(/\s+/);
// console.log(hsl);

return (
    <div
        ref={ref}
        className={`bg-[rgba(255,255,255,0.1)] group rounded-lg`}
        style={{ background: `radial-gradient(800px circle at ${mouseX}px ${mouseY}px, hsla(${hsl[0]}, ${hsl[1]}, ${hsl[2]}, ${gradientOpacity * 5}), transparent 40%)` }}
    >
    <div
        className="bg-muted rounded-lg h-[calc(100%-2px)] w-[calc(100%-2px)] m-[1px]"
    >
        <div
        ref={cardsRef}
        className="rounded-lg cursor-pointer h-[360px] relative w-[400px] z-10 overflow-hidden"
        style={{ background: `radial-gradient(600px circle at ${mouseX}px ${mouseY}px, hsla(${hsl[0]}, ${hsl[1]}, ${hsl[2]}, ${gradientOpacity}), transparent 40%)` }}
        >
        <div className="overflow-hidden">
            <img
            className="w-full transform transition-transform duration-300 ease-in-out group-hover:scale-105"
            src={project.image}
            style={{
                aspectRatio: "450/200",
                objectFit: "cover",
            }}
            />
        </div>
        <div className="p-4">
        <h3 className="text-lg font-bold">{project.title}</h3>
        <p className="text-sm">{project.description}</p>
        <div className="flex space-x-2 mt-4">
            <Button className="block" variant="default">
                Explore demo
            </Button>
            <Button className="block" variant="default">
                View code
            </Button>
        </div>
        </div>
        </div>
    </div>
    </div>
);
}