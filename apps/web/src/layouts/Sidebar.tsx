import { navigation } from "@/app/navigation"
import { Link } from "react-router"

function Sidebar() {
  return (
    <aside className="w-64 bg-gray-300 border-r p-4">
        {navigation.map(item => <Link className="flex p-2" to={item.href}>{<item.icon/>}{item.label}</Link>)}
    </aside>
  )
}

export default Sidebar