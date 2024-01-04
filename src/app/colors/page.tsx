
import { Projects } from '@/components/projects';
import { Experience } from '@/components/experience';
import Hero from '@/components/hero';
import { Timeline } from '@/components/timeline';

export default function Test() {
  return (<>
    <div className="h-4"></div>
    <div className="text-muted-foreground">rudyorre/</div><h1 className="text-6xl font-bold tracking-tight text-primary">Colors</h1>
    All of the colors on this site are derived from these colors.
    <div className="grid grid-cols-2 gap-4">
      <div className="rounded-lg h-20 text-center py-2 bg-background text-foreground">--background</div>
      <div className="rounded-lg h-20 text-center py-2 bg-card text-card-foreground">--card</div>
      <div className="rounded-lg h-20 text-center py-2 bg-popover text-popover-foreground">--popover</div>
      <div className="rounded-lg h-20 text-center py-2 bg-primary text-primary-foreground">--primary</div>
      <div className="rounded-lg h-20 text-center py-2 bg-secondary text-secondary-foreground">--secondary</div>
      <div className="rounded-lg h-20 text-center py-2 bg-muted text-muted-foreground">--muted</div>
      <div className="rounded-lg h-20 text-center py-2 bg-accent text-accent-foreground">--accent</div>
      <div className="rounded-lg h-20 text-center py-2 bg-destructive text-destructive-foreground">--destructive</div>
      <div className="rounded-lg h-20 text-center py-2 bg-border">--border</div>
      <div className="rounded-lg h-20 text-center py-2 bg-input text-background">--input</div>
      <div className="rounded-lg h-20 text-center py-2 bg-ring text-background">--ring</div>
    </div>
    </>)
}
