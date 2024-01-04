
import { Projects } from '@/components/projects';
import { Experience } from '@/components/experience';
import Hero from '@/components/hero';
import { Timeline } from '@/components/timeline';

export default function Test() {
  return (
    <div className="grid grid-cols-3 gap-4">
      <div className="rounded-lg h-20 text-center py-2 bg-background">--background</div>
      <div className="rounded-lg h-20 text-center py-2 bg-foreground text-secondary">--foreground</div>
      <div className="rounded-lg h-20 text-center py-2 bg-card">--card</div>
      <div className="rounded-lg h-20 text-center py-2 bg-card-foreground text-secondary">--card-foreground</div>
      <div className="rounded-lg h-20 text-center py-2 bg-popover">--popover</div>
      <div className="rounded-lg h-20 text-center py-2 bg-popover-foreground text-secondary">--popover-foreground</div>
      <div className="rounded-lg h-20 text-center py-2 bg-primary text-secondary">--primary</div>
      <div className="rounded-lg h-20 text-center py-2 bg-primary-foreground">--primary-foreground</div>
      <div className="rounded-lg h-20 text-center py-2 bg-secondary">--secondary</div>
      <div className="rounded-lg h-20 text-center py-2 bg-secondary-foreground text-secondary">--secondary-foreground</div>
      <div className="rounded-lg h-20 text-center py-2 bg-muted">--muted</div>
      <div className="rounded-lg h-20 text-center py-2 bg-muted-foreground">--muted-foreground</div>
      <div className="rounded-lg h-20 text-center py-2 bg-accent">--accent</div>
      <div className="rounded-lg h-20 text-center py-2 bg-accent-foreground text-secondary">--accent-foreground</div>
      <div className="rounded-lg h-20 text-center py-2 bg-destructive">--destructive</div>
      <div className="rounded-lg h-20 text-center py-2 bg-destructive-foreground">--destructive-foreground</div>
      <div className="rounded-lg h-20 text-center py-2 bg-border">--border</div>
      <div className="rounded-lg h-20 text-center py-2 bg-input">--input</div>
      <div className="rounded-lg h-20 text-center py-2 bg-ring text-secondary">--ring</div>
    </div>
  )
}
