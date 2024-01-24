import { Cards } from '@/components/cards';
import { projects, Project as ProjectType } from '@/constants/projects';

interface ProjectsProps {
    className?: string,
    onlyFeatured?: boolean,
};

export const Projects = ({ className, onlyFeatured }: ProjectsProps) => {
    return <div className={className}>
        <Cards
            projects={projects.filter(
                (p: ProjectType) => p.featured || !onlyFeatured
            )}
        />
    </div>;
};
