"use client"

import { usePathname } from 'next/navigation'
import { Slash } from "lucide-react" 
import {
  Breadcrumb,
  BreadcrumbItem,
  BreadcrumbLink,
  BreadcrumbList,
  BreadcrumbPage,
  BreadcrumbSeparator,
} from "@/components/ui/breadcrumb"
import { cn, capitalize } from '@/lib/utils'
import React from 'react'

/**
 * Renders a breadcrumb component that displays the navigation path.
 * 
 * Note: This component will return `null` for the root path.
 *
 * @param className - The optional CSS class name for the breadcrumb component.
 * @returns The rendered breadcrumb component.
 */
export const BreadCrumb = ({ className }: { className?: string }) => {
    const pathname: string = usePathname();
    const pathList: string[] = pathname.split("/").filter(Boolean);

    if (pathList.length === 0) return null;

    /**
     * Renders a single breadcrumb item.
     *
     * @param path - The path of the breadcrumb item.
     * @param i - The index of the breadcrumb item.
     * @returns The rendered breadcrumb item.
     */
    const renderBreadCrumbItem = (path: string, i: number) => (
        <React.Fragment key={path + i}>
            <BreadcrumbSeparator>
                <Slash />
            </BreadcrumbSeparator>
            <BreadcrumbItem>
                <BreadcrumbLink href={`/${pathList.slice(0, i + 1).join('/')}`}>
                    {capitalize(path)}
                </BreadcrumbLink>
            </BreadcrumbItem>
        </React.Fragment> 
    );

    return (
        <Breadcrumb className={cn("px-8", className)}>
            <BreadcrumbList>
                <BreadcrumbItem>
                    <BreadcrumbLink href="/">Home</BreadcrumbLink>
                </BreadcrumbItem>
                {pathList.map(renderBreadCrumbItem)}
            </BreadcrumbList>
        </Breadcrumb>
    );
};
