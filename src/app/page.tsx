'use client';

import { ModeToggle } from '@/components/mode-toggle'
import Image from 'next/image'
import React, { useState, useEffect, useRef } from 'react';
import { cn } from '@/lib/utils';
import styles from '@/components/styles/cards.module.css';

export default function Home() {
  return (
    <>
      <br />
      <Cards />
    </>
  )
}

interface CardProps {
  icon: string;
  title: string;
  subtitle: string;
  parentMouseX: number;
  parentMouseY: number;
}

function Cards() {
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
      styles.cards
    )}
    >
      <div ref={cardsRef} id="cards" className="flex flex-wrap gap-[4px] max-w-[916px] mx-auto">
        <Card icon="fa-duotone fa-apartment" title="Apartments" subtitle="Places to be apart. Wait, what?" parentMouseX={mouseX} parentMouseY={mouseY} />
        <Card icon="fa-duotone fa-unicorn" title="Unicorns" subtitle="A single corn. Er, I mean horn." parentMouseX={mouseX} parentMouseY={mouseY} />
        <Card icon="fa-duotone fa-apartment" title="Apartments" subtitle="Places to be apart. Wait, what?" parentMouseX={mouseX} parentMouseY={mouseY} />
        <Card icon="fa-duotone fa-unicorn" title="Unicorns" subtitle="A single corn. Er, I mean horn." parentMouseX={mouseX} parentMouseY={mouseY} />
        <Card icon="fa-duotone fa-apartment" title="Apartments" subtitle="Places to be apart. Wait, what?" parentMouseX={mouseX} parentMouseY={mouseY} />
        <Card icon="fa-duotone fa-unicorn" title="Unicorns" subtitle="A single corn. Er, I mean horn." parentMouseX={mouseX} parentMouseY={mouseY} />
      </div>
    </div>
  );
}

function Card({ icon, title, subtitle, parentMouseX, parentMouseY }: CardProps) {
  const [mouseX, setMouseX] = useState<number>(0);
  const [mouseY, setMouseY] = useState<number>(0);
  const [isHovered, setIsHovered] = useState(false);
  const cardsRef = useRef<HTMLDivElement>(null);

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
  }, [cardsRef, parentMouseX, parentMouseY]);

  const gradientOpacity = isHovered ? 0.06 : 0;

  return (
    <div
      className="bg-[rgba(255,255,255,0.1)] rounded-lg"
      style={{ background: `radial-gradient(800px circle at ${mouseX}px ${mouseY}px, rgba(255, 255, 255, ${gradientOpacity * 5}), transparent 40%)` }}
    >
      <div
        className="bg-[rgba(0,0,0,1)] rounded-lg h-[calc(100%-2px)] w-[calc(100%-2px)] m-[1px]"
      >
        <div
          ref={cardsRef}
          className="rounded-lg cursor-pointer h-[260px] relative w-[300px] z-10"
          style={{ background: `radial-gradient(800px circle at ${mouseX}px ${mouseY}px, rgba(255, 255, 255, ${gradientOpacity}), transparent 40%)` }}
        >
          something
        </div>
      </div>
    </div>
  );
}