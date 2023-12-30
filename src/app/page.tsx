import { Cards } from '@/components/cards';
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
      rudyorre/<h1 className="text-6xl font-bold tracking-tight">Projects</h1>
      <br />
      <Cards />
    </div>
  )
}
