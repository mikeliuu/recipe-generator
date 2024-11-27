import { Icon } from '@/components/icon';
import { Skeleton } from '@/components/ui/skeleton';
import { cn } from '@/lib/utils';

export function GenerationLoading({
  className,
  ...props
}: React.HTMLAttributes<HTMLDivElement>) {
  return (
    <div
      {...props}
      className={cn('flex flex-row justify-start items-start gap-2', className)}
    >
      <Icon
        className="motion-safe:animate-spin-slow text-teal-900"
        name="Sparkles"
      />

      <div className="w-full flex flex-col space-y-4">
        <Skeleton className="w-[80%] h-6 bg-gray-300" />
        <Skeleton className="w-[80%] h-6 bg-gray-300" />
        <Skeleton className="w-[50%] h-6 bg-gray-300" />
      </div>
    </div>
  );
}
