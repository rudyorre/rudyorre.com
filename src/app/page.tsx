'use client'
import { Projects } from '@/components/projects';
import { Experience } from '@/components/experience';
import Hero from '@/components/hero';
import { Timeline } from '@/components/timeline';
import { Button } from '@/components/ui/button';
import Link from 'next/link';
import { Hobbies } from '@/components/hobbies';

export default function Home() {
  return (
    <div className="mx-2">
      <Hero />
      <div className="text-secondary-foreground/50 mt-20">rudyorre/</div>
      <h1 id="Experience" className="scroll-my-24 text-4xl sm:text-5xl md:text-6xl font-bold tracking-tight text-primary mb-10">Experience</h1>
      <Experience />
      <div className="text-secondary-foreground/50 mt-20">rudyorre/</div>
      <h1 id="Projects" className="scroll-my-24 text-4xl sm:text-5xl md:text-6xl font-bold tracking-tight text-primary mb-10">Projects</h1>
      <Projects onlyFeatured />
      <div className="flex justify-center items-center mt-5">
        <Link href="/projects">
          <Button>See more</Button>
        </Link>
      </div>
      <div className="text-secondary-foreground/50 mt-20">rudyorre/</div>
      <h1 id="Hobbies" className="scroll-my-24 text-4xl sm:text-5xl md:text-6xl font-bold tracking-tight text-primary mb-10">Hobbies</h1>
      <Hobbies />
    </div>
  )
}
