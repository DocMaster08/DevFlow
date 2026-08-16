import { Fragment } from "react"
import {
    Breadcrumb,
    BreadcrumbItem,
    BreadcrumbLink,
    BreadcrumbList,
    BreadcrumbPage,
    BreadcrumbSeparator,
} from "@/components/ui/breadcrumb"
import { useProject } from "@/features/projects/hooks/useProject";

import { Link, useLocation } from "react-router";
import { Spinner } from "../ui/spinner";
import { useTask } from "@/features/tasks/hooks/useTask";

interface Link {
    name: string
    url: string
}

export function AppBreadcrumb() {
    const location = useLocation();

    const items = location.pathname.split('/')
    items.shift()

    const projectId = items[0] === "projects" ? items[1] : undefined;
    const taskId = items[2] === "tasks" ? items[3] : undefined;

    const { data: project, isLoading: isProjectLoading } = useProject(projectId);
    const { data: task, isLoading: isTaskLoading } = useTask(taskId);

    if (isProjectLoading || isTaskLoading) {
        return <Spinner />
    }

    let links: Link[] = []
    let page = items[0] || "dashboard";

    if (projectId && project) {
        links.push({ name: page, url: "/projects" })
        page = project.name
    }

    if (taskId && task) {
        links.push({ name: page, url: `/projects/${projectId}` })
        page = task.title
    }
    console.log(links, page)
    return (
        <Breadcrumb>
            <BreadcrumbList>
                {
                    links.map((link, i) => <Fragment key={i}>
                        <BreadcrumbItem>
                            <BreadcrumbLink asChild>
                                <Link to={link.url}>{link.name}</Link>
                            </BreadcrumbLink>
                        </BreadcrumbItem>
                        <BreadcrumbSeparator />
                    </Fragment>)
                }

                <BreadcrumbItem>
                    <BreadcrumbPage>{page}</BreadcrumbPage>
                </BreadcrumbItem>
            </BreadcrumbList>
        </Breadcrumb>
    )
}
