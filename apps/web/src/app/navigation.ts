import {
    LayoutDashboard,
    Settings,
    Folders,
} from "lucide-react";

export const navigation = [
    {
        label: "Dashboard",
        href: "/",
        icon: LayoutDashboard,
    },
    {
        label: "Projects",
        href: "/projects",
        icon: Folders
    },
    {
        label: "Settings",
        href: "/settings",
        icon: Settings
    }
    
];