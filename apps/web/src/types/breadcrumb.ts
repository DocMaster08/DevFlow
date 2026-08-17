import type { UIMatch } from "react-router";

export type BreadcrumbType =
    | "Dashboard"
    | "Settings"
    | "Projects"
    | "project"
    | "task"

export interface BreadcrumbHandle {
    breadcrumb: BreadcrumbType;
}

export type BreadcrumbMatch = UIMatch<unknown, BreadcrumbHandle>;

export function isBreadcrumbMatch(
    match: UIMatch
): match is BreadcrumbMatch {
    return (
        typeof match.handle === "object" &&
        match.handle !== null &&
        "breadcrumb" in match.handle
    );
}