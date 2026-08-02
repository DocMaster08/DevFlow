import { icons, type LucideProps } from 'lucide-react';

interface DynamicIconProps extends LucideProps {
    name: string; // e.g., "user", "heart", "settings"
}

export function DynamicIcon({ name, ...props }: DynamicIconProps) {
    // Convert kebab-case or snake_case to PascalCase
    const pascalName = name
        .split(/[-_]/)
        .map(word => word.charAt(0).toUpperCase() + word.slice(1))
        .join('');

    // Grab the icon component from the icons object
    const IconComponent = icons[pascalName as keyof typeof icons];

    if (!IconComponent) {
        // Fallback icon if the requested one doesn't exist
        return <icons.Info {...props} />;
    }

    return <IconComponent {...props} />;
}
