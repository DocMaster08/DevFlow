import type { LucideIcon } from "lucide-react"
import type { ReactNode } from "react"

interface MetadataItemProps {
    label: string
    icon?: LucideIcon
    children: ReactNode
}

function MetadataItem({ label, icon: Icon, children }: MetadataItemProps) {
    return (
        <div className="flex gap-4 items-center">
            <div className="flex gap-2 items-center ">
                {Icon && <Icon size={16} />}
                <p>{label}</p>
            </div>

            {children}
        </div>
    )
}

export default MetadataItem