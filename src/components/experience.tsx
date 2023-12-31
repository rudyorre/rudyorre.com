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
                    <Button onClick={() => setIsOpen(!isOpen)}>{(isOpen) ? 'Close' : 'See More'}</Button>
                </AccordionTrigger>
            </AccordionItem>
        </Accordion>
    </div>;
};