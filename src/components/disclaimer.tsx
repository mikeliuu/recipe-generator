import { CURRENT_LMM_MODEL } from '@/constants';
import { cn } from '@/lib/utils';

export function Disclaimer({
  className,
  ...props
}: React.HTMLAttributes<HTMLDivElement>) {
  return (
    <div
      {...props}
      className={cn(
        'text-center text-sm text-gray-600 dark:text-gray-400',
        className,
      )}
    >
      <p>
        Disclaimer: Recipes generated by the model {CURRENT_LMM_MODEL} may need
        adjustments and might include allergens. Please review and modify
        recipes for your safety and enjoyment.
      </p>
    </div>
  );
}
