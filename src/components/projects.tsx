import { Cards } from '@/components/cards';
import { projects, Project as ProjectType } from '@/constants/projects';

export const Projects = () => {
    return <div>
        <Cards projects={projects.filter((p: ProjectType) => p.featured)} />
    </div>;
};