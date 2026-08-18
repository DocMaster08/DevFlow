import { AppBreadcrumb } from "@/components/common/AppBreadcrumb"
import { AvatarDropdown } from "@/components/common/AvatarDropdown"
import { ModeToggle } from "@/components/common/ModeToggle"
import { SidebarTrigger } from "@/components/ui/sidebar"
import { useCurrentUser } from "@/features/auth/hooks/useCurrentUser"

function Navbar() {

  const { data: user } = useCurrentUser()

  return (
    <nav className="flex justify-between items-center h-16 px-6 border-b">
      <div className="flex gap-4 items-center">
        <SidebarTrigger />
        <AppBreadcrumb />
      </div>

      {
        user &&
        <div className="flex gap-4">
          <p>{user.name}</p>
          <p>{user.email}</p>
        </div>
      }

      <div className="flex gap-4 items-center">
        <ModeToggle />
        <AvatarDropdown />
      </div>
    </nav>
  )
}

export default Navbar