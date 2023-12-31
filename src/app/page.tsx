
import { Projects } from '@/components/projects';
import { Experience } from '@/components/experience';
import Hero from '@/components/hero';
import { Timeline } from '@/components/timeline';

export default function Home() {
  return (
    <div className="bg-bg-color mx-20">
      <br />
      <Hero />
      <br />
      rudyorre/<h1 className="text-6xl font-bold tracking-tight">Experience</h1>
      <br />
      <Experience />
      <br />
      <br />
      <br />
      rudyorre/<h1 className="text-6xl font-bold tracking-tight">Projects</h1>
      <br />
      <Projects />
    </div>
  )
}
