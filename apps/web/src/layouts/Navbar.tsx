import { AppBreadcrumb } from "@/components/common/AppBreadcrumb"
import { AvatarDropdown } from "@/components/common/AvatarDropdown"
import { ModeToggle } from "@/components/common/ModeToggle"
import { SidebarTrigger } from "@/components/ui/sidebar"

function Navbar() {
  
  return (
    <nav className="flex justify-between items-center h-16 px-6 border-b">
      <div className="flex gap-4 items-center">
        <SidebarTrigger />
        <AppBreadcrumb />
      </div>

      <div className="flex gap-4 items-center">
        <ModeToggle />
        <AvatarDropdown/>
      </div>
    </nav>
  )
}

export default Navbar