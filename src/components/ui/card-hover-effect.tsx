"use client";

import { cn } from "@/lib/utils";
import { AnimatePresence, motion } from "framer-motion";
import Link from "next/link";
import { useState, useEffect } from "react";
import { Project as ProjectType } from '@/constants/projects';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faArrowUpRightFromSquare } from '@fortawesome/free-solid-svg-icons';
import { faGithub } from '@fortawesome/free-brands-svg-icons';

export const HoverEffect = ({
  projects,
  className,
}: {
  projects: ProjectType[];
  className?: string;
}) => {
  let [hoveredIndex, setHoveredIndex] = useState<number | null>(null);
  const [isClient, setIsClient] = useState(false);

  useEffect(() => {
    setIsClient(true);
  }, []);

  return (
    <div
      className={cn(
        "grid grid-cols-1 md:grid-cols-2  lg:grid-cols-3  py-10",
        className
      )}
    >
      {projects.map((project, idx) => (
        <Link
          href={project.source}
          key={project.source}
          className="relative group  block p-2 h-full w-full"
          onMouseEnter={() => setHoveredIndex(idx)}
          onMouseLeave={() => setHoveredIndex(null)}
        >
          <AnimatePresence>
            {hoveredIndex === idx && (
              <motion.span
                className="absolute inset-0 h-full w-full bg-foreground block rounded-3xl"
                layoutId="hoverBackground"
                initial={{ opacity: 0 }}
                animate={{
                  opacity: 1,
                  transition: { duration: 0.15 },
                }}
                exit={{
                  opacity: 0,
                  transition: { duration: 0.15, delay: 0.2 },
                }}
              />
            )}
          </AnimatePresence>
          <Card>
            <div className="overflow-hidden">
                <img
                className="w-full transform transition-transform duration-300 ease-in-out group-hover:scale-105"
                src={project.image}
                style={{
                    aspectRatio: "450/200",
                    objectFit: "cover",
                }}
                />
            </div>
            <div className="p-4">
                <CardTitle>{project.title}</CardTitle>
                <CardDescription>{project.description}</CardDescription>
                <div className="flex space-x-2 mt-4">
                    {isClient && project.source && (
                        <Link className="block group/link" href={project.source} target="_blank">
                            View code <FontAwesomeIcon icon={faGithub} className="transform transition-transform duration-300 ease-in-out group-hover/link:translate-x-1"/>
                        </Link>
                    )}
                    {isClient && project.visit && (
                        <Link className="block group/link" href={project.visit} target="_blank" onClick={(e) => e.stopPropagation()}>
                            Explore demo <FontAwesomeIcon icon={faArrowUpRightFromSquare} className="transform transition-transform duration-300 ease-in-out group-hover/link:translate-x-1" />
                        </Link>
                    )}
                </div>
            </div>
          </Card>
        </Link>
      ))}
    </div>
  );
};

export const Card = ({
  className,
  children,
}: {
  className?: string;
  children: React.ReactNode;
}) => {
  return (
    <div
      className={cn(
        "rounded-2xl h-full w-full overflow-hidden bg-muted border border-transparent group-hover:border-slate-700 relative z-20",
        className
      )}
    >
      <div className="relative z-50">
        <div className="">{children}</div>
      </div>
    </div>
  );
};
export const CardTitle = ({
  className,
  children,
}: {
  className?: string;
  children: React.ReactNode;
}) => {
  return (
    <h4 className={cn("font-bold tracking-wide mt-4", className)}>
      {children}
    </h4>
  );
};
export const CardDescription = ({
  className,
  children,
}: {
  className?: string;
  children: React.ReactNode;
}) => {
  return (
    <p
      className={cn(
        "mt-8 text-ring/85 tracking-wide leading-relaxed text-sm",
        className
      )}
    >
      {children}
    </p>
  );
};
