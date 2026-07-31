import { Outlet } from "react-router"
import Navbar from "./Navbar"
import Sidebar from "./Sidebar"

function AppLayout() {
    return (
        <div className="flex flex-col min-h-screen">
            <Navbar />
            <div className="flex flex-1">
                <Sidebar />
                <main className="flex-1 p-6 overflow-auto">
                    <Outlet />
                </main>
            </div>
        </div>
    )
}

export default AppLayout