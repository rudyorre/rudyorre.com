'use client';

import { useState } from 'react';
import {
    Accordion,
    AccordionContent,
    AccordionItem,
    AccordionTrigger,
} from '@/components/ui/minimal-accordion';
import { Timeline } from "@/components/timeline";
import { Job, jobs, Job as JobType } from '@/constants/jobs';
import { Button } from '@/components/ui/button';

export const Experience = () => {
    const [isOpen, setIsOpen] = useState<boolean>(false);

    return <div>
        <Timeline jobs={jobs.filter((job: Job) => job.featured)} />
        <Accordion type="single" collapsible className="w-full">
            <AccordionItem value="item-1">
                <AccordionContent className="bg-muted pt-4 rounded-lg">
                    <Timeline jobs={jobs.filter((job: Job) => !job.featured)} />
                </AccordionContent>
                <AccordionTrigger className="mx-20">
                    <div className="inline-flex items-center justify-center whitespace-nowrap rounded-md text-sm font-medium ring-offset-background transition-colors focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-ring focus-visible:ring-offset-2 disabled:pointer-events-none disabled:opacity-50 bg-primary text-primary-foreground hover:bg-primary/90 h-8 w-24"
                    onClick={() => setIsOpen(!isOpen)}>{(isOpen) ? 'Close' : 'See More'}</div>
                </AccordionTrigger>
            </AccordionItem>
        </Accordion>
    </div>;
};