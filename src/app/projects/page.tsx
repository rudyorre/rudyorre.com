import { Projects } from '@/components/projects';

export default function ProjectsPage() {
  return <>
    <div className="h-4"></div>
    <div className="text-secondary-foreground/50">rudyorre/</div><h1 className="text-6xl font-bold tracking-tight text-primary">Projects</h1>
    <Projects className="mt-10" />
  </>
};
