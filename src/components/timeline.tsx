import {
    Accordion,
    AccordionContent,
    AccordionItem,
    AccordionTrigger,
} from '@/components/ui/minimal-accordion';
import { Job } from '@/constants/jobs';
import { generate } from '@/lib/badge-generator';

import { cn } from '@/lib/utils';

interface TimelineProps {
    jobs: Job[],
    primary?: boolean,
};

export const Timeline = ({jobs, primary}: TimelineProps) => {
    return (
        <div className="mx-20">
            <ol className={cn(
                "relative border-s",
                primary ? "border-border" : "border-background"
            )}>       
                {jobs.map((job: Job, i: number) => (
                    <li key={"jobs" + i} className="ms-6 mb-5">            
                        <Accordion key={job.role + job.company} type="single" collapsible>
                            <AccordionItem value="item-1">
                                <AccordionTrigger>
                                <span className={cn(
                                    "absolute flex items-center justify-center w-6 h-6 rounded-full -start-3 ring-8",
                                    primary ? "bg-secondary ring-background" : "bg-background ring-muted"
                                )}>
                                    <svg className="w-2.5 h-2.5 text-secondary-foreground" aria-hidden="true" xmlns="http://www.w3.org/2000/svg" fill="currentColor" viewBox="0 0 20 20">
                                        <path d="M20 4a2 2 0 0 0-2-2h-2V1a1 1 0 0 0-2 0v1h-3V1a1 1 0 0 0-2 0v1H6V1a1 1 0 0 0-2 0v1H2a2 2 0 0 0-2 2v2h20V4ZM0 18a2 2 0 0 0 2 2h16a2 2 0 0 0 2-2V8H0v10Zm5-8h10a1 1 0 0 1 0 2H5a1 1 0 0 1 0-2Z"/>
                                    </svg>
                                </span>
                                <h3 className="flex items-center mb-1 text-lg font-semibold">{job.role} <span className="hidden sm:block bg-blue-100 bg-primary-foreground/40 text-primary text-sm font-medium me-2 px-2.5 py-0.5 rounded ms-3">{job.company}</span></h3>
                                <time className="block mb-2 text-sm font-normal leading-none text-muted-foreground">{job.dates}</time>
                                </AccordionTrigger>
                                <AccordionContent className="mb-4 text-base font-normal text-muted-foreground">
                                    {job.description.map((bullet: string, i: number) => (
                                        <p key={job.role + job.company + 'desc' + i}>
                                            {(job.description.length > 1 ? "• " : "") + bullet}
                                        </p>
                                    ))}
                                </AccordionContent>
                            </AccordionItem>
                        </Accordion>
                        <div className="mt-1 flex gap-1">
                            {job.tags.map((tag: string, i: number) => (
                                <img key={job.role + job.company + 'tags' + i} src={generate(tag)} />
                            ))}
                        </div>
                    </li>
                ))}
            </ol>
        </div>
    );
};