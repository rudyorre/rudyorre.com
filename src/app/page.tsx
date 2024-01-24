
import { Projects } from '@/components/projects';
import { Experience } from '@/components/experience';
import Hero from '@/components/hero';
import { Timeline } from '@/components/timeline';
import { Button } from '@/components/ui/button';
import Link from 'next/link';

export default function Home() {
  return (
    <div>
      <br />
      <Hero />
      <br />
      <div id="experience" />
      <div className="text-secondary-foreground/50">rudyorre/</div><h1 className="text-6xl font-bold tracking-tight text-primary">Experience</h1>
      <br />
      <Experience />
      <br />
      <br />
      <br />
      <div id="projects" />
      <div className="text-secondary-foreground/50">rudyorre/</div><h1 className="text-6xl font-bold tracking-tight text-primary">Projects</h1>
      <br />
      <Projects onlyFeatured />
      <div className="flex justify-center items-center mt-5"><Link href="/projects"><Button>See more</Button></Link></div>
    </div>
  )
}
