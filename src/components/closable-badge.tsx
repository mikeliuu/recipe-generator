'use client';

import { Icon } from '@/components/icon';
import { Badge, BadgeProps } from '@/components/ui/badge';
import { cn } from '@/lib/utils';

interface ClosableBadgeProps extends BadgeProps {
  disabled?: boolean;
  onClose: () => void;
}

export function ClosableBadge({
  disabled,
  onClose,
  className,
  children,
  ...props
}: ClosableBadgeProps) {
  return (
    <div className="relative mt-2 mr-2">
      <div
        className={cn(
          'cursor-pointer bg-gray-200 dark:bg-gray-600 rounded-[50%] absolute -top-2 -right-2',
          { 'cursor-not-allowed pointer-events-none': disabled },
        )}
        onClick={onClose}
      >
        <Icon name="X" className="w-6 h-6 p-0.5" />
      </div>

      <Badge active className={cn(className)} {...props}>
        {children}
      </Badge>
    </div>
  );
}
