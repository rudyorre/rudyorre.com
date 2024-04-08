import { Projects } from '@/components/projects';
import Link from 'next/link';

export default function ProjectsPage() {
  return <div className="max-w-5xl mx-auto px-8">
    <section className="">
      <div className="py-8 px-4 mx-auto max-w-screen-xl sm:py-16 lg:px-6">
        <div className="max-w-screen-md mb-8 lg:mb-16">
            <h2 className="mb-4 text-4xl tracking-tight font-extrabold text-primary">Projects</h2>
            <p className="text-foreground/50 sm:text-xl">A collection of projects I've done over the years. I'll be adding more pretty soon :-).</p>
        </div>
        <Projects className="mt-10" />
      </div>
    </section>
  </div>
};
