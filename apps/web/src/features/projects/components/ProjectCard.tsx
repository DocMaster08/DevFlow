import type { Project } from "@/types/project"
import {
    Item,
    ItemActions,
    ItemContent,
    ItemDescription,
    ItemMedia,
    ItemTitle,
} from "@/components/ui/item"
import { Button } from "@/components/ui/button"
import { DynamicIcon } from "@/components/common/DynamicIcon"

interface ProjectCardProps {
    project: Project
}

function ProjectCard({ project }: ProjectCardProps) {

    return (
        <Item variant="outline">
            <ItemMedia variant="image">
                <DynamicIcon name={project.icon} />
            </ItemMedia>
            <ItemContent>
                <ItemTitle>{project.name}</ItemTitle>
                {project.description&&<ItemDescription>{project.description}</ItemDescription>}
            </ItemContent>
            <ItemActions>
                <Button>Action</Button>
            </ItemActions>
        </Item>
    )
}

export default ProjectCard