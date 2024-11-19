'use client';

import { Icon } from '@/components/icon';
import { Badge, BadgeProps } from '@/components/ui/badge';
import { cn } from '@/lib/utils';

interface ClosableBadgeProps extends BadgeProps {
  onClose: () => void;
}

export function ClosableBadge({
  onClose,
  className,
  children,
  ...props
}: ClosableBadgeProps) {
  return (
    <div className="relative">
      <div
        className="cursor-pointer bg-gray-200 rounded-[50%] absolute -top-2 -right-2"
        onClick={onClose}
      >
        <Icon name="X" className="w-6 h-6 p-0.5" />
      </div>

      <Badge className={cn('hover:bg-unset', className)} {...props}>
        {children}
      </Badge>
    </div>
  );
}
