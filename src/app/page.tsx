'use client'
import { Projects } from '@/components/projects';
import { Experience } from '@/components/experience';
import Hero from '@/components/hero';
import { Timeline } from '@/components/timeline';
import { Button } from '@/components/ui/button';
import Link from 'next/link';
import { Hobbies } from '@/components/hobbies';
import { Contact } from '@/components/contact';

export default function Home() {
  return (
    <div className="mx-2">
      <Hero />
      <h1 id="Experience" className="scroll-my-24 text-2xl sm:text-3xl md:text-4xl font-bold tracking-tight text-primary my-10">Experience</h1>
      <Experience />
      <h1 id="Projects" className="scroll-my-24 text-2xl sm:text-3xl md:text-4xl font-bold tracking-tight text-primary my-10">Projects</h1>
      <Projects onlyFeatured />
      <div className="flex justify-center items-center mt-5">
        <Link href="/projects">
          <Button>See more</Button>
        </Link>
      </div>
      <h1 id="Hobbies" className="scroll-my-24 text-2xl sm:text-3xl md:text-4xl font-bold tracking-tight text-primary my-10">Hobbies</h1>
      <Hobbies />
      <h1 id="Contact" className="scroll-my-24 text-2xl sm:text-3xl md:text-4xl font-bold tracking-tight text-primary my-10">Contact</h1>
      <Contact />
    </div>
  )
}
