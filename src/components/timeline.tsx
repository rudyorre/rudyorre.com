import {
    Accordion,
    AccordionContent,
    AccordionItem,
    AccordionTrigger,
} from '@/components/ui/minimal-accordion';
import { Job } from '@/constants/jobs';

interface TimelineProps {
    jobs: Job[],
};

export const Timeline = ({jobs}: TimelineProps) => {
    return (
        <div className="mx-20">
            <ol className="relative border-s border-gray-200 dark:border-gray-700">       
                {jobs.map((job: Job) => (
                    <li className="ms-6 mb-5">            
                        <Accordion key={job.role + job.company} type="single" collapsible>
                            <AccordionItem value="item-1">
                                <AccordionTrigger>
                                <span className="absolute flex items-center justify-center w-6 h-6 bg-blue-100 rounded-full -start-3 ring-8 ring-white dark:ring-gray-900 dark:bg-blue-900">
                                <svg className="w-2.5 h-2.5 text-blue-800 dark:text-blue-300" aria-hidden="true" xmlns="http://www.w3.org/2000/svg" fill="currentColor" viewBox="0 0 20 20">
                                    <path d="M20 4a2 2 0 0 0-2-2h-2V1a1 1 0 0 0-2 0v1h-3V1a1 1 0 0 0-2 0v1H6V1a1 1 0 0 0-2 0v1H2a2 2 0 0 0-2 2v2h20V4ZM0 18a2 2 0 0 0 2 2h16a2 2 0 0 0 2-2V8H0v10Zm5-8h10a1 1 0 0 1 0 2H5a1 1 0 0 1 0-2Z"/>
                                </svg>
                                </span>
                                <h3 className="flex items-center mb-1 text-lg font-semibold text-gray-900 dark:text-white">{job.role} <span className="bg-blue-100 text-blue-800 text-sm font-medium me-2 px-2.5 py-0.5 rounded dark:bg-blue-900 dark:text-blue-300 ms-3">{job.company}</span></h3>
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
                                <img key={job.role + job.company + 'tags' + i} src={tag} />
                            ))}
                        </div>
                    </li>
                ))}
            </ol>
        </div>
    );
};