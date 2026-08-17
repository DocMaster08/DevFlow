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
import { Link, useMatches } from "react-router";
import { useTask } from "@/features/tasks/hooks/useTask";

interface BreadcrumbHandle {
    breadcrumb: string
}

export function AppBreadcrumb() {
    const matches = useMatches()

    function getBreadcrumbName(type: string) {
        switch (type) {
            case "project":
                return project?.name ?? "Project";

            case "task":
                return task?.title ?? "Task";

            default:
                return type
        }
    }

    const breadcrumbMatches = matches.filter(
        match => (match.handle as BreadcrumbHandle)?.breadcrumb
    );

    const params = matches[matches.length - 1]?.params;

    const projectId = params?.projectId;
    const taskId = params?.taskId

    const { data: project, isLoading: isProjectLoading } = useProject(projectId);
    const { data: task, isLoading: isTaskLoading } = useTask(taskId);


    if (isProjectLoading || isTaskLoading) {
        return null
    }

    const breadcrumbItems = breadcrumbMatches.map((match) => {
        const type = (match.handle as BreadcrumbHandle)?.breadcrumb;

        return {
            name: getBreadcrumbName(type),
            url: match.pathname
        };
    });

    return (
        <Breadcrumb>
            <BreadcrumbList>
                {
                    breadcrumbItems.map((item, i) => {
                        const isLast = i === breadcrumbItems.length - 1;

                        return <Fragment key={i} >
                            <BreadcrumbItem>
                                {isLast ? (
                                    <BreadcrumbPage>
                                        {item.name}
                                    </BreadcrumbPage>
                                ) : (
                                    <BreadcrumbLink asChild>
                                        <Link to={item.url}>
                                            {item.name}
                                        </Link>
                                    </BreadcrumbLink>
                                )}
                            </BreadcrumbItem>
                            {!isLast && <BreadcrumbSeparator />}
                        </Fragment>
                    })
                }
            </BreadcrumbList>
        </Breadcrumb >
    )
}
