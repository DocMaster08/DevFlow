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
import { Link } from "react-router"
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card"

interface ProjectCardProps {
    project: Project
}

function ProjectCard({ project }: ProjectCardProps) {

    return (
        <Link to={`/projects/${project.id}`} className="p-4 h-full">
          <Card size="sm" className="text-center h-full justify-center hover:bg-accent hover:text-accent-foreground">
            <DynamicIcon name={project.icon} className="self-center"/>
            <CardHeader>
                <CardTitle>
                    {project.name}
                </CardTitle>
                {project.description&&<CardDescription>
                    {project.description}
                </CardDescription>}
            </CardHeader>
          </Card>
        </Link >
    )
}

export default ProjectCard

/*
  <Item variant="outline" >
                <ItemMedia variant="image">
                    <DynamicIcon name={project.icon} />
                </ItemMedia>
                <ItemContent className="">

                    <ItemTitle>{project.name}</ItemTitle>
                    {project.description && <ItemDescription>{project.description}</ItemDescription>}

                </ItemContent>

                <ItemActions>
                    <Button variant="secondary" className="group-hover:bg-accent">More</Button>
                </ItemActions>
            </Item>

            */