import {
    LayoutDashboard,
    CheckSquare,
    NotebookPen,
    Settings,
} from "lucide-react";

export const navigation = [
    {
        label: "Dashboard",
        href: "/",
        icon: LayoutDashboard,
    },
    {
        label: "Tasks",
        href: "/tasks",
        icon: CheckSquare
    },
    {
        label: "Notes",
        href: "/notes",
        icon: NotebookPen
    },
    {
        label: "Settings",
        href: "/settings",
        icon: Settings
    }
    
];