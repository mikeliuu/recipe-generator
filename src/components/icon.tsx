import { cn } from '@/lib/utils';
import { LucideProps, icons } from 'lucide-react';

export type IconName = keyof typeof icons;

interface IconProps extends LucideProps {
  name: IconName;
  strokeWidth?: number;
}

export function Icon({
  name,
  strokeWidth = 1.5,
  className,
  ...props
}: IconProps) {
  const LucideIcon = icons[name];

  return (
    <LucideIcon
      strokeWidth={strokeWidth}
      className={cn(className)}
      {...props}
    />
  );
}
