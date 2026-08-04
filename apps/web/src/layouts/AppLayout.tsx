import { Outlet } from "react-router"
import Navbar from "./Navbar"
import AppSidebar from "./AppSidebar"
import { SidebarProvider } from "@/components/ui/sidebar"

function AppLayout() {
    return (
        <SidebarProvider>
            <div className="flex flex-1">
                <AppSidebar />
                <div className="flex-1">
                    <Navbar/>
                    <main className=" p-6 overflow-auto">
                        <Outlet />
                    </main>
                </div>
            </div>
        </SidebarProvider>
    )
}

export default AppLayout